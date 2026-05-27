"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { createBooking } from "@/app/actions/booking";
import type { PaymentMethod } from "@/types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BookingCar {
  id:              string;
  ownerId:         string;
  brand:           string;
  model:           string;
  pricePerDay:     number;
  deposit:         number;
  address:         string | null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function calcDays(start: string, end: string): number {
  if (!start || !end) return 0;
  const ms = new Date(end).getTime() - new Date(start).getTime();
  return ms > 0 ? Math.ceil(ms / (1000 * 60 * 60 * 24)) : 0;
}

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

function addDays(dateStr: string, n: number) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
}

const PAYMENT_VALUES: PaymentMethod[] = ["CASH", "CLICK", "PAYME", "CARD"];
const PAYMENT_LABEL_KEYS: Record<PaymentMethod, string> = {
  CASH:  "paymentCash",
  CLICK: "paymentClick",
  PAYME: "paymentPayme",
  CARD:  "paymentCard",
};

// ─── Icon close ──────────────────────────────────────────────────────────────

function IconX({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ─── Success screen ───────────────────────────────────────────────────────────

function SuccessScreen({ car, onClose }: { car: BookingCar; onClose: () => void }) {
  const t = useTranslations("booking");
  return (
    <div className="flex flex-col items-center text-center py-6 px-2 gap-5">
      <div className="w-20 h-20 rounded-full bg-[#F97316]/10 flex items-center justify-center">
        <svg className="w-10 h-10 text-[#F97316]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <h3 className="text-xl font-black text-[#201F1D] mb-2">{t("successTitle")}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          {t.rich("successText", {
            car: `${car.brand} ${car.model}`,
            strong: (chunks) => (
              <span className="font-semibold text-[#201F1D]">{chunks}</span>
            ),
          })}
        </p>
      </div>
      <button
        onClick={onClose}
        className="w-full bg-[#F97316] text-white font-bold py-3.5 rounded-xl hover:bg-[#EA580C] transition-colors"
      >
        {t("successClose")}
      </button>
    </div>
  );
}

// ─── Booking Form ─────────────────────────────────────────────────────────────

export function BookingForm({
  car,
  initialPickup,
  initialReturn,
}: {
  car: BookingCar;
  initialPickup?: string;
  initialReturn?: string;
}) {
  const t = useTranslations("booking");

  const [open, setOpen]     = useState(false);
  const [done, setDone]     = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Form fields
  const today = todayStr();
  const defaultStart = initialPickup && initialPickup >= today ? initialPickup : today;
  const defaultEnd   = initialReturn && initialReturn > defaultStart ? initialReturn : addDays(defaultStart, 1);
  const [name,            setName]           = useState("");
  const [phone,           setPhone]          = useState("");
  const [startDate,       setStartDate]      = useState(defaultStart);
  const [endDate,         setEndDate]        = useState(defaultEnd);
  const [pickupLocation,  setPickup]         = useState(car.address ?? "");
  const [dropoffLocation, setDropoff]        = useState(car.address ?? "");
  const [paymentMethod,   setPaymentMethod]  = useState<PaymentMethod>("CASH");
  const [notes,           setNotes]          = useState("");

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const days  = calcDays(startDate, endDate);
  const subtotal = days * car.pricePerDay;
  const isCardPayment = paymentMethod !== "CASH";
  const vatRate = 0.12;
  const bankFeeRate = 0.025;
  const vatAmount = isCardPayment ? Math.round(subtotal * vatRate) : 0;
  const bankFee = isCardPayment ? Math.round(subtotal * bankFeeRate) : 0;
  const total = subtotal + vatAmount + bankFee;

  function handleClose() {
    setOpen(false);
    setDone(false);
    setError(null);
    setFieldErrors({});
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setLoading(true);

    const result = await createBooking({
      carId:           car.id,
      ownerId:         car.ownerId,
      name,
      phone,
      startDate,
      endDate,
      pickupLocation,
      dropoffLocation,
      paymentMethod,
      notes: notes || undefined,
      pricePerDay:     car.pricePerDay,
      deposit:         car.deposit,
    });

    setLoading(false);

    if (result.success) {
      setDone(true);
    } else if (result.fieldErrors) {
      setFieldErrors(result.fieldErrors);
    } else {
      setError(result.error ?? t("errorRetry"));
    }
  }

  // ── Field helpers ──────────────────────────────────────────────────────────

  function field(
    id: string,
    label: string,
    input: React.ReactNode,
  ) {
    const err = fieldErrors[id];
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={id} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {label}
        </label>
        {input}
        {err && <p className="text-xs text-red-500">{err}</p>}
      </div>
    );
  }

  const inputCls = (id: string) =>
    `w-full border rounded-xl px-4 py-3 text-sm text-[#201F1D] focus:outline-none focus:border-[#F97316] transition-colors ${
      fieldErrors[id] ? "border-red-400" : "border-gray-200"
    }`;

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="w-full bg-[#FFA633] text-white font-bold py-4 rounded-xl hover:bg-[#e8952d] transition-colors text-base"
      >
        {t("triggerCta")}
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <div className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl flex flex-col max-h-[92dvh] sm:max-h-[90vh] overflow-hidden shadow-2xl">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
              <div>
                <h2 className="font-black text-[#201F1D] text-lg leading-tight">
                  {t("title")}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {car.brand} {car.model} · {car.pricePerDay.toLocaleString("ru-RU")} {t("perDay")}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors flex-shrink-0"
                aria-label={t("close")}
              >
                <IconX className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-1">
              <div className="px-6 py-5">
                {done ? (
                  <SuccessScreen car={car} onClose={handleClose} />
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* Name + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {field("name", t("name"),
                        <input
                          id="name"
                          type="text"
                          placeholder={t("namePh")}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={inputCls("name")}
                          required
                        />
                      )}
                      {field("phone", t("phone"),
                        <input
                          id="phone"
                          type="tel"
                          placeholder={t("phonePh")}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className={inputCls("phone")}
                          required
                        />
                      )}
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4">
                      {field("startDate", t("startDate"),
                        <input
                          id="startDate"
                          type="date"
                          min={today}
                          value={startDate}
                          onChange={(e) => {
                            setStartDate(e.target.value);
                            if (endDate <= e.target.value) {
                              setEndDate(addDays(e.target.value, 1));
                            }
                          }}
                          className={inputCls("startDate")}
                          required
                        />
                      )}
                      {field("endDate", t("endDate"),
                        <input
                          id="endDate"
                          type="date"
                          min={addDays(startDate, 1)}
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className={inputCls("endDate")}
                          required
                        />
                      )}
                    </div>

                    {/* Payment method — before price so fees update live */}
                    {field("paymentMethod", t("paymentMethod"),
                      <div className="grid grid-cols-2 gap-2">
                        {PAYMENT_VALUES.map((value) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setPaymentMethod(value)}
                            className={`py-2.5 px-4 rounded-xl text-sm font-medium border transition-colors text-left ${
                              paymentMethod === value
                                ? "bg-[#F97316] text-white border-[#F97316]"
                                : "bg-white text-gray-600 border-gray-200 hover:border-[#F97316]"
                            }`}
                          >
                            {t(PAYMENT_LABEL_KEYS[value])}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Price summary */}
                    {days > 0 && (
                      <div className="bg-[#f7f7f7] rounded-xl p-4 flex flex-col gap-2 text-sm">
                        <div className="flex justify-between text-gray-500">
                          <span>{car.pricePerDay.toLocaleString("ru-RU")} × {days} {t("days", { count: days })}</span>
                          <span className="font-semibold text-[#201F1D]">{subtotal.toLocaleString("ru-RU")} {t("uzs")}</span>
                        </div>
                        {isCardPayment && (
                          <>
                            <div className="flex justify-between text-gray-400">
                              <span>{t("vat")} (12%)</span>
                              <span>+{vatAmount.toLocaleString("ru-RU")} {t("uzs")}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                              <span>{t("bankFee")} (2.5%)</span>
                              <span>+{bankFee.toLocaleString("ru-RU")} {t("uzs")}</span>
                            </div>
                          </>
                        )}
                        {car.deposit > 0 && (
                          <div className="flex justify-between text-gray-400">
                            <span>{t("depositRefundable")}</span>
                            <span>{car.deposit.toLocaleString("ru-RU")} {t("uzs")}</span>
                          </div>
                        )}
                        <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-[#201F1D]">
                          <span>{t("totalLabel")}</span>
                          <span>{total.toLocaleString("ru-RU")} {t("uzs")}</span>
                        </div>
                        {isCardPayment && (
                          <p className="text-xs text-gray-400 mt-1">{t("cashDiscount")}</p>
                        )}
                      </div>
                    )}

                    {/* Pickup / Dropoff */}
                    {field("pickupLocation", t("pickupLocation"),
                      <input
                        id="pickupLocation"
                        type="text"
                        placeholder={t("locationPh")}
                        value={pickupLocation}
                        onChange={(e) => setPickup(e.target.value)}
                        className={inputCls("pickupLocation")}
                        required
                      />
                    )}
                    {field("dropoffLocation", t("dropoffLocation"),
                      <input
                        id="dropoffLocation"
                        type="text"
                        placeholder={t("locationPh")}
                        value={dropoffLocation}
                        onChange={(e) => setDropoff(e.target.value)}
                        className={inputCls("dropoffLocation")}
                        required
                      />
                    )}

                    {/* Notes */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="notes" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {t("notes")} <span className="font-normal normal-case text-gray-400">{t("optional")}</span>
                      </label>
                      <textarea
                        id="notes"
                        rows={2}
                        placeholder={t("notesPh")}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#201F1D] focus:outline-none focus:border-[#F97316] resize-none transition-colors"
                      />
                    </div>

                    {/* Global error */}
                    {error && (
                      <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">
                        {error}
                      </p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading || days === 0}
                      className="w-full bg-[#FFA633] text-white font-bold py-4 rounded-xl hover:bg-[#e8952d] transition-colors text-base disabled:opacity-50 disabled:cursor-not-allowed mt-1"
                    >
                      {loading
                        ? t("submitting")
                        : days > 0
                        ? t("submitWithTotal", { total: `${total.toLocaleString("ru-RU")} ${t("uzs")}` })
                        : t("submitPickDates")}
                    </button>

                    <p className="text-xs text-gray-400 text-center">
                      {t("consent")}
                    </p>

                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
