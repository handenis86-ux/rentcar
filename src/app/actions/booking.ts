"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { isCarAvailable } from "@/lib/cars";

// ─── Schema ───────────────────────────────────────────────────────────────────

const BookingSchema = z.object({
  carId:            z.string().min(1),
  ownerId:          z.string().min(1),
  name:             z.string().min(2, "Введите имя"),
  phone:            z.string().min(9, "Введите номер телефона"),
  startDate:        z.string().min(1, "Выберите дату начала"),
  endDate:          z.string().min(1, "Выберите дату конца"),
  pickupLocation:   z.string().min(2, "Укажите место выдачи"),
  dropoffLocation:  z.string().min(2, "Укажите место возврата"),
  paymentMethod:    z.enum(["CASH", "CLICK", "PAYME", "CARD"]),
  notes:            z.string().optional(),
  pricePerDay:      z.number().positive(),
  deposit:          z.number().min(0),
});

export type BookingInput = z.infer<typeof BookingSchema>;

export interface BookingResult {
  success: boolean;
  bookingId?: string;
  error?: string;
  fieldErrors?: Record<string, string>;
}

// ─── Action ───────────────────────────────────────────────────────────────────

export async function createBooking(raw: BookingInput): Promise<BookingResult> {
  // Validate
  const parsed = BookingSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const [field, msgs] of Object.entries(parsed.error.flatten().fieldErrors)) {
      fieldErrors[field] = msgs?.[0] ?? "Ошибка";
    }
    return { success: false, fieldErrors };
  }

  const data = parsed.data;

  // Calculate dates and price
  const start = new Date(data.startDate);
  const end   = new Date(data.endDate);
  if (end <= start) {
    return { success: false, error: "Дата возврата должна быть позже даты выдачи" };
  }

  const days        = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const totalPrice  = days * data.pricePerDay;
  const commission  = Math.round(totalPrice * 0.05); // 5%

  if (!(await isCarAvailable(data.carId, start, end))) {
    return { success: false, error: "Авто уже забронировано на выбранные даты. Попробуйте другие даты." };
  }

  try {
    // Find or create a guest user by phone
    const phone = data.phone.replace(/\s/g, "").replace(/-/g, "");
    let user = await prisma.user.findUnique({ where: { phone } });

    if (!user) {
      // Try to find by email pattern (in case of retry with same phone)
      const guestEmail = `${phone.replace(/\D/g, "")}@guest.rentz.uz`;
      user = await prisma.user.upsert({
        where:  { email: guestEmail },
        update: { name: data.name },
        create: {
          phone,
          email:        guestEmail,
          name:         data.name,
          passwordHash: "guest_placeholder",
          role:         "RENTER",
        },
      });
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        carId:           data.carId,
        renterId:        user.id,
        ownerId:         data.ownerId,
        startDate:       start,
        endDate:         end,
        pickupLocation:  data.pickupLocation,
        dropoffLocation: data.dropoffLocation,
        totalPrice,
        depositAmount:   data.deposit,
        commission,
        status:          "PENDING",
        paymentMethod:   data.paymentMethod,
        paymentStatus:   "PENDING",
        notes:           data.notes ?? null,
      },
    });

    return { success: true, bookingId: booking.id };
  } catch (err) {
    console.error("[createBooking]", err);
    return { success: false, error: "Не удалось создать бронь. Попробуйте снова." };
  }
}
