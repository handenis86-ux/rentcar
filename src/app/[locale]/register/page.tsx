"use client";

import { Link } from "@/i18n/navigation";

export default function RegisterPage() {
  return (
    <div className="bg-[#f5f5f5] min-h-screen flex items-center justify-center py-16 px-4">
      <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-6">
          <a href="/" className="inline-block select-none" aria-label="Rentz — home">
            <span className="font-bold text-2xl text-[#201F1D]">Rent</span>
            <span className="font-bold text-2xl text-[#FFA633]">Z</span>
          </a>
        </div>

        {/* Title */}
        <h1 className="text-xl font-bold text-[#201F1D] text-center mb-8">
          Регистрация
        </h1>

        {/* Form */}
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#201F1D] mb-1.5"
            >
              Имя
            </label>
            <input
              id="name"
              type="text"
              autoComplete="given-name"
              placeholder="Иван Иванов"
              className="w-full border border-gray-200 rounded-lg bg-[#f5f5f5] py-3 px-4 text-sm text-[#201F1D] placeholder-gray-400 outline-none focus:border-[#FFA633] transition-colors"
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-[#201F1D] mb-1.5"
            >
              Телефон
            </label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+998 90 000-00-00"
              className="w-full border border-gray-200 rounded-lg bg-[#f5f5f5] py-3 px-4 text-sm text-[#201F1D] placeholder-gray-400 outline-none focus:border-[#FFA633] transition-colors"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#201F1D] mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="example@mail.com"
              className="w-full border border-gray-200 rounded-lg bg-[#f5f5f5] py-3 px-4 text-sm text-[#201F1D] placeholder-gray-400 outline-none focus:border-[#FFA633] transition-colors"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#201F1D] mb-1.5"
            >
              Пароль
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-lg bg-[#f5f5f5] py-3 px-4 text-sm text-[#201F1D] placeholder-gray-400 outline-none focus:border-[#FFA633] transition-colors"
            />
          </div>

          {/* Terms checkbox */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-gray-300 accent-[#FFA633]"
            />
            <span className="text-sm text-gray-500 leading-snug">
              Принимаю{" "}
              <Link
                href="/terms"
                className="text-[#FFA633] hover:underline"
              >
                условия использования
              </Link>{" "}
              и{" "}
              <Link
                href="/privacy"
                className="text-[#FFA633] hover:underline"
              >
                политику конфиденциальности
              </Link>
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="bg-[#FFA633] hover:bg-[#e8952d] rounded-full w-full py-3 font-semibold text-white transition-colors"
          >
            Зарегистрироваться
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Уже есть аккаунт?{" "}
          <Link
            href="/login"
            className="text-[#FFA633] font-semibold hover:underline"
          >
            Войти
          </Link>
        </p>

      </div>
    </div>
  );
}
