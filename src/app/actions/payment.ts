"use server";

import { prisma } from "@/lib/prisma";
import { createInvoice } from "@/lib/multicard";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rentz.uz";

/** Approximate UZS per USD rate (sandbox; production should fetch from CBU API) */
const UZS_RATE = 12_800;

export interface PaymentInvoiceResult {
  success: boolean;
  checkoutUrl?: string;
  error?: string;
}

/**
 * Create a Multicard payment invoice for an existing booking.
 *
 * @param bookingId  — our booking cuid
 * @param amountUsd  — total in USD (pricePerDay * days + VAT + bank fee)
 * @param locale     — "ru" | "uz" | "en"
 */
export async function createPaymentInvoice(
  bookingId: string,
  amountUsd: number,
  locale: string,
): Promise<PaymentInvoiceResult> {
  try {
    // Verify booking exists and is PENDING
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      select: { id: true, paymentStatus: true },
    });

    if (!booking) {
      return { success: false, error: "Booking not found" };
    }

    if (booking.paymentStatus === "PAID") {
      return { success: false, error: "Booking already paid" };
    }

    // Convert USD → UZS → tiyin
    const amountTiyin = Math.round(amountUsd * UZS_RATE * 100);

    const result = await createInvoice({
      invoiceId: bookingId,
      amount: amountTiyin,
      lang: locale,
      returnUrl: `${SITE_URL}/${locale}/payment/success?bookingId=${bookingId}`,
      returnErrorUrl: `${SITE_URL}/${locale}/payment/error?bookingId=${bookingId}`,
      callbackUrl: `${SITE_URL}/api/payment/callback`,
    });

    return { success: true, checkoutUrl: result.checkoutUrl };
  } catch (err) {
    console.error("[createPaymentInvoice]", err);
    return {
      success: false,
      error: "Failed to create payment invoice. Please try again.",
    };
  }
}
