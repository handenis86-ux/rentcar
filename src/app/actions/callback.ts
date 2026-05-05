"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const CallbackSchema = z.object({
  name:       z.string().trim().min(2, "Введите имя"),
  phone:      z.string().trim().min(7, "Введите номер телефона"),
  preferTime: z.string().trim().max(120).optional(),
  message:    z.string().trim().max(500).optional(),
  source:     z.string().trim().max(120).optional(),
});

export type CallbackInput = z.infer<typeof CallbackSchema>;

export interface CallbackResult {
  success: boolean;
  leadId?: string;
  error?: string;
  fieldErrors?: Record<string, string>;
}

export async function createLead(raw: CallbackInput): Promise<CallbackResult> {
  const parsed = CallbackSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const [field, msgs] of Object.entries(parsed.error.flatten().fieldErrors)) {
      fieldErrors[field] = msgs?.[0] ?? "Ошибка";
    }
    return { success: false, fieldErrors };
  }

  const data = parsed.data;
  const phone = data.phone.replace(/\s/g, "").replace(/-/g, "");

  try {
    const lead = await prisma.lead.create({
      data: {
        kind:       "CALLBACK",
        name:       data.name,
        phone,
        preferTime: data.preferTime || null,
        message:    data.message || null,
        source:     data.source || null,
        status:     "NEW",
      },
    });
    return { success: true, leadId: lead.id };
  } catch (err) {
    console.error("[createLead]", err);
    return { success: false, error: "Не удалось отправить заявку. Попробуйте снова." };
  }
}
