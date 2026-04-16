import { useTranslations } from "next-intl"

export default function AboutPage() {
  return <AboutContent />
}

function AboutContent() {
  const t = useTranslations("about")

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">{t("title")}</h1>
      <div className="flex justify-center mb-8">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#009a44" }}
        >
          <span className="text-white font-bold text-4xl">★</span>
        </div>
      </div>
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 leading-relaxed mb-4">{t("p1")}</p>
        <p className="text-gray-600 leading-relaxed">{t("p2")}</p>
      </div>
    </div>
  )
}
