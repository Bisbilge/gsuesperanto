import { useTranslations } from "next-intl"
import { prisma } from "@/lib/prisma"

function getLocalizedField(obj: Record<string, unknown>, field: string, locale: string): string {
  const key = field + locale.charAt(0).toUpperCase() + locale.slice(1)
  return (obj[key] as string) ?? (obj[field + "En"] as string) ?? ""
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  })

  return <NewsContent locale={locale} posts={posts} />
}

function NewsContent({
  locale,
  posts,
}: {
  locale: string
  posts: Awaited<ReturnType<typeof prisma.post.findMany>>
}) {
  const t = useTranslations("news")

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">{t("title")}</h1>
      {posts.length === 0 ? (
        <p className="text-gray-400">{t("noPosts")}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border border-gray-100 rounded-xl p-6 hover:border-[var(--green)] transition-colors"
            >
              <div className="text-xs text-gray-400 mb-2">
                {new Date(post.createdAt).toLocaleDateString(locale, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                {getLocalizedField(post as unknown as Record<string, unknown>, "title", locale)}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {getLocalizedField(post as unknown as Record<string, unknown>, "content", locale)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
