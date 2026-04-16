import { useTranslations } from "next-intl"

export default function ContactPage() {
  return <ContactContent />
}

function ContactContent() {
  const t = useTranslations("contact")

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">{t("title")}</h1>
      <div className="flex flex-col gap-5">
        <div className="border border-gray-100 rounded-xl p-5">
          <div className="text-sm text-gray-400 mb-1">{t("email")}</div>
          <a
            href="mailto:esperanto@gsu.edu.tr"
            className="text-[var(--green)] hover:underline font-medium"
          >
            esperanto@gsu.edu.tr
          </a>
        </div>
        <div className="border border-gray-100 rounded-xl p-5">
          <div className="text-sm text-gray-400 mb-1">{t("instagram")}</div>
          <a
            href="https://instagram.com/gsuesperanto"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--green)] hover:underline font-medium"
          >
            @gsuesperanto
          </a>
        </div>
        <div className="border border-gray-100 rounded-xl p-5">
          <div className="text-sm text-gray-400 mb-1">{t("address")}</div>
          <p className="text-gray-700">{t("addressValue")}</p>
        </div>
      </div>
    </div>
  )
}
