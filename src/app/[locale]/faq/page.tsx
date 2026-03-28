"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/routing";
import { useParams } from "next/navigation";

/* ─── FAQ data ───────────────────────────────────────────────────────────── */

const FAQ_ITEMS = [
  {
    id: 1,
    question: "Какие документы нужны для аренды?",
    answer:
      "Для аренды автомобиля необходимы: паспорт гражданина (или загранпаспорт для иностранцев), действующее водительское удостоверение. Возраст арендатора — от 21 года, водительский стаж — не менее 2 лет.",
  },
  {
    id: 2,
    question: "Какой минимальный срок аренды?",
    answer:
      "Минимальный срок аренды составляет 1 сутки. При долгосрочной аренде от 1 месяца предоставляется скидка 20% от суточной стоимости.",
  },
  {
    id: 3,
    question: "Включена ли страховка?",
    answer:
      "Да, в стоимость аренды включена базовая страховка ОСАГО. Полное КАСКО (покрытие ущерба и угона) доступно как дополнительная опция за отдельную плату.",
  },
  {
    id: 4,
    question: "Можно ли арендовать авто без залога?",
    answer:
      "Залог является обязательным условием аренды и зависит от класса автомобиля: от 1 000 000 сум для эконом-класса до 5 000 000 сум для премиум-сегмента. Залог возвращается в полном объёме при сдаче авто без повреждений.",
  },
  {
    id: 5,
    question: "Как происходит оплата?",
    answer:
      "Принимаем все удобные способы оплаты: наличные, платёжные системы Click и Payme, банковские карты Visa и Mastercard. Оплата производится при получении автомобиля.",
  },
  {
    id: 6,
    question: "Можно ли получить авто в аэропорту?",
    answer:
      "Да, мы предоставляем услугу доставки автомобиля в международный аэропорт Ташкента имени Ислама Каримова. Стоимость доставки — 200 000 сум. Необходимо указать рейс и время прилёта при оформлении заказа.",
  },
  {
    id: 7,
    question: "Есть ли ограничение по пробегу?",
    answer:
      "В каждые сутки аренды включено 300 км пробега. Превышение лимита оплачивается из расчёта 1 500 сум за каждый дополнительный километр. Для длительных поездок доступны тарифы с безлимитным пробегом.",
  },
  {
    id: 8,
    question: "Можно ли выехать за пределы Ташкента?",
    answer:
      "Да, аренда доступна по всему Узбекистану. Вы можете путешествовать в Самарканд, Бухару, Хиву и другие города страны. Въезд на территорию других государств необходимо согласовать заранее.",
  },
] as const;

/* ─── Inline SVG Icons ───────────────────────────────────────────────────── */

function IconChevronRight({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function IconChevronDown({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/* ─── Accordion Item ─────────────────────────────────────────────────────── */

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof FAQ_ITEMS)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`bg-white rounded-xl mb-3 overflow-hidden transition-shadow ${
        isOpen
          ? "shadow-md border-l-4 border-[#FFA633]"
          : "shadow-sm border-l-4 border-transparent"
      }`}
    >
      {/* Header — rendered as a div with role="button" to avoid event handlers on <button> */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
        className="p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
      >
        <span
          className={`font-medium text-[#201F1D] text-sm sm:text-base leading-snug ${
            isOpen ? "text-[#FFA633]" : ""
          }`}
        >
          {item.question}
        </span>
        <span
          className={`flex-shrink-0 text-gray-400 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-[#FFA633]" : ""
          }`}
        >
          <IconChevronDown />
        </span>
      </div>

      {/* Answer */}
      {isOpen && (
        <div className="px-5 pb-5 pt-0">
          <p className="text-sm text-gray-500 leading-relaxed">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function FaqPage() {
  const params = useParams<{ locale: Locale }>();
  const locale = params.locale;

  const [openId, setOpenId] = useState<number | null>(1);

  function toggle(id: number) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <>
      {/* ── Hero banner ──────────────────────────────────────────────────── */}
      <section className="bg-[#f5f5f5] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-1.5 text-sm text-gray-400 mb-6"
            aria-label="Breadcrumb"
          >
            <a
              href={`/${locale}`}
              className="hover:text-[#FFA633] transition-colors"
            >
              Главная
            </a>
            <IconChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-[#2F2F2F] font-medium">FAQ</span>
          </nav>

          {/* Title */}
          <h1 className="text-3xl font-bold text-[#201F1D]">
            Часто задаваемые вопросы
          </h1>
          <p className="mt-2 text-gray-500 text-base">
            Ответы на самые популярные вопросы об аренде автомобилей
          </p>
        </div>
      </section>

      {/* ── Accordion ────────────────────────────────────────────────────── */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {FAQ_ITEMS.map((item) => (
            <AccordionItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => toggle(item.id)}
            />
          ))}

          {/* Still have questions CTA */}
          <div className="mt-10 rounded-xl bg-[#f5f5f5] p-8 text-center">
            <p className="text-[#201F1D] font-semibold text-lg mb-2">
              Не нашли ответ на свой вопрос?
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Свяжитесь с нами — мы ответим в течение нескольких минут
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center bg-[#FFA633] hover:bg-[#e8952d] text-white rounded-full px-7 py-2.5 text-sm font-semibold transition-colors"
              >
                Написать нам
              </a>
              <a
                href="tel:+998711234567"
                className="inline-flex items-center justify-center border-2 border-[#201F1D] text-[#201F1D] hover:bg-[#201F1D] hover:text-white rounded-full px-7 py-2.5 text-sm font-semibold transition-colors"
              >
                +998 71 123-45-67
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
