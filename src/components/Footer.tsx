import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"

export default function Footer() {
  const t = useTranslations("footer")
  const locale = useLocale()

  return (
    <footer className="border-t border-gray-100 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-400">
        <span>
          © {new Date().getFullYear()} GSU Esperanto Klubo. {t("rights")}
        </span>
        <div className="flex items-center gap-1">
          <div
            className="w-4 h-4 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#009a44" }}
          >
            <span className="text-white font-bold text-[8px]">★</span>
          </div>
          <span className="text-[var(--green)] font-medium">Esperanto</span>
        </div>
      </div>
    </footer>
  )
}
