"use client";

import { Link } from "@/i18n/navigation";

export default function LoginPage() {
  return (
    <div className="bg-[#f5f5f5] min-h-screen flex items-center justify-center py-16 px-4">
      <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-6">
          <a href="/" className="inline-block select-none" aria-label="RentCar — home">
            <span className="font-bold text-2xl text-[#201F1D]">Rent</span>
            <span className="font-bold text-2xl text-[#FFA633]">Car</span>
          </a>
        </div>

        {/* Title */}
        <h1 className="text-xl font-bold text-[#201F1D] text-center mb-8">
          Вход в аккаунт
        </h1>

        {/* Form */}
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>

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
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-lg bg-[#f5f5f5] py-3 px-4 text-sm text-[#201F1D] placeholder-gray-400 outline-none focus:border-[#FFA633] transition-colors"
            />
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-[#FFA633] hover:underline"
            >
              Забыли пароль?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-[#FFA633] hover:bg-[#e8952d] rounded-full w-full py-3 font-semibold text-white transition-colors"
          >
            Войти
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-400">или</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Register link */}
        <p className="text-center text-sm text-gray-500">
          Нет аккаунта?{" "}
          <Link
            href="/register"
            className="text-[#FFA633] font-semibold hover:underline"
          >
            Зарегистрироваться
          </Link>
        </p>

      </div>
    </div>
  );
}
