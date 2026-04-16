"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations, useLocale } from "next-intl"
import { useState } from "react"

const localeNames: Record<string, string> = {
  tr: "TR",
  en: "EN",
  fr: "FR",
  eo: "EO",
}

export default function Navbar() {
  const t = useTranslations("nav")
  const locale = useLocale()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const localeSegment = `/${locale}`
  const pathWithoutLocale = pathname.startsWith(localeSegment)
    ? pathname.slice(localeSegment.length) || "/"
    : pathname

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/events", label: t("events") },
    { href: "/news", label: t("news") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ]

  return (
    <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <Link href={`/${locale}`} className="font-bold text-[var(--green)] tracking-tight text-lg">
          GSU Esperanto
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={`/${locale}${link.href === "/" ? "" : link.href}`}
              className="hover:text-[var(--green)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Language switcher */}
        <div className="hidden md:flex items-center gap-1">
          {(["tr", "en", "fr", "eo"] as const).map((loc) => (
            <Link
              key={loc}
              href={`/${loc}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`}
              className={`px-2 py-1 rounded text-xs font-semibold transition-colors ${
                locale === loc
                  ? "bg-[var(--green)] text-white"
                  : "text-gray-500 hover:text-[var(--green)]"
              }`}
            >
              {localeNames[loc]}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={`/${locale}${link.href === "/" ? "" : link.href}`}
              className="text-sm font-medium text-gray-600 hover:text-[var(--green)]"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-2 border-t border-gray-100">
            {(["tr", "en", "fr", "eo"] as const).map((loc) => (
              <Link
                key={loc}
                href={`/${loc}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`}
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  locale === loc
                    ? "bg-[var(--green)] text-white"
                    : "text-gray-500"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {localeNames[loc]}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
