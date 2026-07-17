import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyCallbackSign, type CallbackPayload } from "@/lib/multicard";
import { notifyAdmin, escapeHtml } from "@/lib/telegram";

/**
 * Multicard payment callback handler.
 *
 * Multicard POSTs here after a successful payment.
 * We verify the signature, update booking status, and return { success: true }.
 * If we don't return success, the payment gets reversed.
 */
export async function POST(request: Request) {
  try {
    const data: CallbackPayload = await request.json();

    console.log("[payment/callback] received:", {
      invoice_id: data.invoice_id,
      amount: data.amount,
      uuid: data.uuid,
      store_id: data.store_id,
    });

    // 1. Verify signature
    if (!verifyCallbackSign(data)) {
      console.error("[payment/callback] invalid sign for invoice:", data.invoice_id);
      return NextResponse.json(
        { success: false, error: "Invalid signature" },
        { status: 400 },
      );
    }

    // 2. Idempotency check — if we already processed this UUID, just return success
    const existing = await prisma.booking.findFirst({
      where: { paymentUuid: data.uuid },
      select: { id: true },
    });

    if (existing) {
      console.log("[payment/callback] already processed uuid:", data.uuid);
      return NextResponse.json({ success: true });
    }

    // 3. Find booking by invoice_id (= booking id)
    const booking = await prisma.booking.findUnique({
      where: { id: data.invoice_id },
      select: { id: true, paymentStatus: true },
    });

    if (!booking) {
      console.error("[payment/callback] booking not found:", data.invoice_id);
      // Still return success to avoid reversal — log for manual review
      return NextResponse.json({ success: true });
    }

    // 4. Update booking status
    const updated = await prisma.booking.update({
      where: { id: booking.id },
      data: {
        paymentStatus: "PAID",
        status: "CONFIRMED",
        paymentUuid: data.uuid,
      },
      include: {
        car: { select: { brand: true, model: true, year: true } },
        renter: { select: { name: true, phone: true } },
      },
    });

    // 5. Notify admin via Telegram
    await notifyAdmin(
      [
        "✅ <b>Оплата получена</b>",
        `${escapeHtml(updated.car.brand)} ${escapeHtml(updated.car.model)} ${updated.car.year}`,
        "",
        `<b>Клиент:</b> ${escapeHtml(updated.renter.name)}`,
        `<b>Телефон:</b> <code>${escapeHtml(updated.renter.phone)}</code>`,
        `<b>Сумма:</b> ${(data.amount / 100).toLocaleString("ru-RU")} сум`,
        `<b>Карта:</b> ${escapeHtml(data.card_pan)} (${escapeHtml(data.ps)})`,
        `<b>Квитанция:</b> ${escapeHtml(data.receipt_url ?? "")}`,
        "",
        `<i>booking: ${booking.id}</i>`,
        `<i>uuid: ${data.uuid}</i>`,
      ]
        .filter(Boolean)
        .join("\n"),
    );

    console.log("[payment/callback] booking confirmed:", booking.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[payment/callback] error:", err);
    // Return 200 + success:false to avoid repeated retries that we can't handle
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
