"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LOCALES = ["ru", "en", "uz"] as const;

export function LangSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname() ?? "/";
  const rest = pathname.replace(/^\/(ru|en|uz)(?=\/|$)/, "") || "/";

  return (
    <div className="hidden sm:flex items-center gap-1 text-[13px] font-medium">
      {LOCALES.map((code, i) => (
        <span key={code} className="flex items-center gap-1">
          {i > 0 && <span className="text-[#D1D5DB]">·</span>}
          <Link
            href={`/${code}${rest === "/" ? "" : rest}`}
            className={
              code === locale
                ? "text-[#F97316] font-semibold"
                : "text-[#9CA3AF] hover:text-[#F97316] transition-colors"
            }
          >
            {code.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}
