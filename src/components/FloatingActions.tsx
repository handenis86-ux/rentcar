"use client";

import { useEffect, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { createLead } from "@/app/actions/callback";

const I_PHONE     = "M6.62 10.79a15 15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.04-.24c1.12.37 2.33.57 3.55.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.22.2 2.43.57 3.55a1 1 0 0 1-.24 1.04l-2.21 2.2z";
const I_WHATSAPP  = "M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.043v-.564zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.521.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z";
const I_TELEGRAM  = "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z";
const I_CHEVRON   = "M7 14l5-5 5 5z";
const I_X         = "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z";
const I_CHECK     = "m9 16.17-3.88-3.88a.996.996 0 1 0-1.41 1.41l4.59 4.59c.39.39 1.02.39 1.41 0L21.7 7.21a.996.996 0 1 0-1.41-1.41L9 16.17z";

const WA_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "";
const TG_USER  = process.env.NEXT_PUBLIC_TELEGRAM_USERNAME ?? "";

export function FloatingActions() {
  const t = useTranslations("fab");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);

  // Close menu when navigating
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 print:hidden">
        {open && (
          <div className="flex flex-col items-end gap-2.5 animate-fade-in">
            {WA_PHONE && (
              <a
                href={`https://wa.me/${WA_PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("whatsapp")}
                className="group flex items-center gap-3 bg-[#25D366] hover:bg-[#1FB854] rounded-full pl-4 pr-2 h-12 shadow-[0_8px_24px_rgba(37,211,102,0.35)] transition-colors"
              >
                <span className="text-white text-[14px] font-semibold whitespace-nowrap">{t("whatsapp")}</span>
                <span className="h-9 w-9 rounded-full bg-white/15 flex items-center justify-center text-white">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d={I_WHATSAPP} /></svg>
                </span>
              </a>
            )}
            {TG_USER && (
              <a
                href={`https://t.me/${TG_USER}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("telegram")}
                className="flex items-center gap-3 bg-[#229ED9] hover:bg-[#1d8bbf] rounded-full pl-4 pr-2 h-12 shadow-[0_8px_24px_rgba(34,158,217,0.35)] transition-colors"
              >
                <span className="text-white text-[14px] font-semibold whitespace-nowrap">{t("telegram")}</span>
                <span className="h-9 w-9 rounded-full bg-white/15 flex items-center justify-center text-white">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d={I_TELEGRAM} /></svg>
                </span>
              </a>
            )}
            <button
              type="button"
              onClick={() => { setCallbackOpen(true); setOpen(false); }}
              aria-label={t("callback")}
              className="flex items-center gap-3 bg-[#1A1A2E] hover:bg-black rounded-full pl-4 pr-2 h-12 shadow-[0_8px_24px_rgba(26,26,46,0.35)] transition-colors"
            >
              <span className="text-white text-[14px] font-semibold whitespace-nowrap">{t("callback")}</span>
              <span className="h-9 w-9 rounded-full bg-white/15 flex items-center justify-center text-white">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d={I_PHONE} /></svg>
              </span>
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={t("menuLabel")}
          aria-expanded={open}
          className="h-14 w-14 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white shadow-[0_8px_24px_rgba(249,115,22,0.45)] flex items-center justify-center transition-colors"
        >
          <svg
            className={`h-6 w-6 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d={open ? I_X : I_CHEVRON} />
          </svg>
        </button>
      </div>

      {callbackOpen && (
        <CallbackModal
          source={pathname ?? ""}
          onClose={() => setCallbackOpen(false)}
        />
      )}
    </>
  );
}

function CallbackModal({ source, onClose }: { source: string; onClose: () => void }) {
  const t  = useTranslations("callback");
  const tFab = useTranslations("fab");

  const [name,       setName]       = useState("");
  const [phone,      setPhone]      = useState("");
  const [preferTime, setPreferTime] = useState("");
  const [message,    setMessage]    = useState("");
  const [loading,    setLoading]    = useState(false);
  const [done,       setDone]       = useState(false);
  const [error,      setError]      = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({});

    const result = await createLead({
      name,
      phone,
      preferTime: preferTime || undefined,
      message:    message || undefined,
      source,
    });

    setLoading(false);

    if (result.success) setDone(true);
    else if (result.fieldErrors) setFieldErrors(result.fieldErrors);
    else setError(result.error ?? t("errorRetry"));
  }

  const inputCls = (id: string) =>
    `w-full border rounded-xl px-4 py-3 text-[14px] text-[#1A1A2E] focus:outline-none focus:border-[#F97316] transition-colors ${
      fieldErrors[id] ? "border-red-400" : "border-gray-200"
    }`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl flex flex-col max-h-[92dvh] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="font-bold text-[#1A1A2E] text-[18px] leading-tight">{t("title")}</h2>
            {!done && <p className="text-[12px] text-gray-500 mt-1">{t("subtitle")}</p>}
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors flex-shrink-0"
            aria-label={tFab("close")}
          >
            <svg className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d={I_X} /></svg>
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-5">
          {done ? (
            <div className="flex flex-col items-center text-center py-4 gap-5">
              <div className="w-16 h-16 rounded-full bg-[#16A34A]/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#16A34A]" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d={I_CHECK} /></svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1A1A2E] mb-2">{t("successTitle")}</h3>
                <p className="text-[14px] text-gray-500 leading-relaxed">{t("successText")}</p>
              </div>
              <button
                onClick={onClose}
                className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white font-bold py-3.5 rounded-xl transition-colors"
              >
                {t("successClose")}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Field id="name" label={t("name")} err={fieldErrors.name}>
                <input id="name" type="text" required placeholder={t("namePh")} value={name} onChange={(e) => setName(e.target.value)} className={inputCls("name")} />
              </Field>
              <Field id="phone" label={t("phone")} err={fieldErrors.phone}>
                <input id="phone" type="tel" required placeholder={t("phonePh")} value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls("phone")} />
              </Field>
              <Field id="preferTime" label={t("preferTime")} err={fieldErrors.preferTime}>
                <input id="preferTime" type="text" placeholder={t("preferTimePh")} value={preferTime} onChange={(e) => setPreferTime(e.target.value)} className={inputCls("preferTime")} />
              </Field>
              <Field id="message" label={t("message")} err={fieldErrors.message}>
                <textarea id="message" rows={2} placeholder={t("messagePh")} value={message} onChange={(e) => setMessage(e.target.value)} className={`${inputCls("message")} resize-none`} />
              </Field>

              {error && (
                <p className="text-[13px] text-red-500 bg-red-50 rounded-xl px-4 py-3">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white font-bold py-3.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? t("sending") : t("submit")}
              </button>
              <p className="text-[11px] text-gray-400 text-center leading-snug">{t("consent")}</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  err,
  children,
}: {
  id: string;
  label: string;
  err?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
        {label}
      </label>
      {children}
      {err && <p className="text-[11px] text-red-500">{err}</p>}
    </div>
  );
}
