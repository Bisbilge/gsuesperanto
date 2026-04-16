import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

function getLocalizedField(obj: Record<string, unknown>, field: string, locale: string): string {
  const key = field + locale.charAt(0).toUpperCase() + locale.slice(1)
  return (obj[key] as string) ?? (obj[field + "En"] as string) ?? ""
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const [events, posts] = await Promise.all([
    prisma.event.findMany({
      where: { published: true, date: { gte: new Date() } },
      orderBy: { date: "asc" },
      take: 3,
    }),
    prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
  ])

  return <HomeContent locale={locale} events={events} posts={posts} />
}

function HomeContent({
  locale,
  events,
  posts,
}: {
  locale: string
  events: Awaited<ReturnType<typeof prisma.event.findMany>>
  posts: Awaited<ReturnType<typeof prisma.post.findMany>>
}) {
  const t = useTranslations("home")
  const nav = useTranslations("nav")

  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--green)] text-white">
        <div className="max-w-5xl mx-auto px-4 py-20 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
              <span className="text-[var(--green)] font-bold text-2xl">★</span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t("hero")}</h1>
          <p className="text-lg text-green-100">{t("subtitle")}</p>
        </div>
      </section>

      {/* Events */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">{t("eventsTitle")}</h2>
          <Link href={`/${locale}/events`} className="text-sm text-[var(--green)] hover:underline">
            {t("viewAll")} →
          </Link>
        </div>
        {events.length === 0 ? (
          <p className="text-gray-400 text-sm">{t("noEvents")}</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div key={event.id} className="border border-gray-100 rounded-xl p-5 hover:border-[var(--green)] transition-colors">
                <div className="text-xs text-[var(--green)] font-semibold mb-2">
                  {new Date(event.date).toLocaleDateString(locale, {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  {getLocalizedField(event as unknown as Record<string, unknown>, "title", locale)}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {getLocalizedField(event as unknown as Record<string, unknown>, "desc", locale)}
                </p>
                {event.location && (
                  <p className="text-xs text-gray-400 mt-2">📍 {event.location}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* News */}
      <section className="bg-[var(--green-light)] py-14">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">{t("newsTitle")}</h2>
            <Link href={`/${locale}/news`} className="text-sm text-[var(--green)] hover:underline">
              {t("viewAll")} →
            </Link>
          </div>
          {posts.length === 0 ? (
            <p className="text-gray-400 text-sm">{t("noPosts")}</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl p-5 hover:shadow-sm transition-shadow">
                  <div className="text-xs text-gray-400 mb-2">
                    {new Date(post.createdAt).toLocaleDateString(locale, {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {getLocalizedField(post as unknown as Record<string, unknown>, "title", locale)}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-3">
                    {getLocalizedField(post as unknown as Record<string, unknown>, "content", locale)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
