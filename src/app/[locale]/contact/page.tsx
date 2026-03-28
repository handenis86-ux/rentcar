import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";

/* ─── Meta ─────────────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: `Контакты — ${t("siteName")}`,
    description: "Свяжитесь с нами по телефону, email или через форму обратной связи. Мы всегда рады помочь.",
  };
}

/* ─── Inline SVG Icons ─────────────────────────────────────────────────── */

function IconPhone({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconMail({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function IconMapPin({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconClock({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconChevronRight({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

/* ─── Static contact info ───────────────────────────────────────────────── */

const CONTACT_CARDS = [
  {
    icon:    IconPhone,
    label:   "Телефон",
    value:   "+998 71 123-45-67",
    href:    "tel:+998711234567",
    isLink:  true,
  },
  {
    icon:    IconMail,
    label:   "Email",
    value:   "info@rentcar.uz",
    href:    "mailto:info@rentcar.uz",
    isLink:  true,
  },
  {
    icon:    IconMapPin,
    label:   "Адрес",
    value:   "Ташкент, Узбекистан",
    href:    null,
    isLink:  false,
  },
  {
    icon:    IconClock,
    label:   "Режим работы",
    value:   "Пн–Вс, 09:00–21:00",
    href:    null,
    isLink:  false,
  },
];

/* ─── Input component ──────────────────────────────────────────────────── */

function Field({
  label,
  id,
  type = "text",
  placeholder,
  textarea = false,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
}) {
  const sharedClass =
    "w-full border border-gray-200 rounded-lg bg-[#f5f5f5] py-3 px-4 text-sm text-[#2F2F2F] placeholder:text-gray-400 outline-none focus:border-[#FFA633] transition-colors";

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-[#201F1D]">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={id}
          placeholder={placeholder}
          rows={5}
          className={`${sharedClass} resize-none`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          className={sharedClass}
        />
      )}
    </div>
  );
}

/* ─── Page Component ───────────────────────────────────────────────────── */

export default function ContactPage() {
  const tCommon = useTranslations("common");

  return (
    <>
      {/* ── 1. HERO BANNER ─────────────────────────────────────────────── */}
      <section className="bg-[#f5f5f5] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#FFA633] transition-colors">
              Главная
            </Link>
            <IconChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-[#2F2F2F] font-medium">Контакты</span>
          </nav>

          {/* Title */}
          <h1 className="text-3xl font-bold text-[#201F1D] mb-3">
            Контакты
          </h1>
          <p className="text-gray-500 max-w-xl">
            Свяжитесь с нами удобным способом — мы на связи ежедневно с 09:00 до 21:00.
          </p>

        </div>
      </section>

      {/* ── 2. FORM + CONTACTS ─────────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

            {/* LEFT — Contact form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-bold text-[#201F1D] mb-6">
                Написать нам
              </h2>

              {/* NOTE: no onSubmit handler — form is a server component */}
              <form action="#" method="POST" className="space-y-4">
                <Field
                  label="Имя"
                  id="name"
                  placeholder="Ваше имя"
                />
                <Field
                  label={tCommon("email")}
                  id="email"
                  type="email"
                  placeholder="example@mail.com"
                />
                <Field
                  label={tCommon("phone")}
                  id="phone"
                  type="tel"
                  placeholder="+998 90 000-00-00"
                />
                <Field
                  label="Сообщение"
                  id="message"
                  placeholder="Опишите ваш вопрос..."
                  textarea
                />

                <button
                  type="submit"
                  className="w-full bg-[#FFA633] hover:bg-[#e8952d] text-white font-semibold rounded-full py-3.5 px-8 transition text-sm"
                >
                  Отправить
                </button>
              </form>
            </div>

            {/* RIGHT — Contact info cards */}
            <div className="flex flex-col gap-4">
              {CONTACT_CARDS.map(({ icon: Icon, label, value, href, isLink }) => (
                <div
                  key={label}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-start gap-4"
                >
                  {/* Orange icon */}
                  <div className="h-10 w-10 rounded-full bg-[#FFF3E0] flex items-center justify-center text-[#FFA633] flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 font-medium mb-0.5">{label}</p>
                    {isLink && href ? (
                      <a
                        href={href}
                        className="text-[#201F1D] font-semibold hover:text-[#FFA633] transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-[#201F1D] font-semibold">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. MAP PLACEHOLDER ─────────────────────────────────────────── */}
      <section className="bg-white pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-200 rounded-xl h-[300px] flex items-center justify-center">
            <span className="text-gray-400 text-sm font-medium">Карта</span>
          </div>
        </div>
      </section>
    </>
  );
}
