import { useTranslations } from "next-intl"
import { prisma } from "@/lib/prisma"

function getLocalizedField(obj: Record<string, unknown>, field: string, locale: string): string {
  const key = field + locale.charAt(0).toUpperCase() + locale.slice(1)
  return (obj[key] as string) ?? (obj[field + "En"] as string) ?? ""
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const events = await prisma.event.findMany({
    where: { published: true },
    orderBy: { date: "asc" },
  })

  return <EventsContent locale={locale} events={events} />
}

function EventsContent({
  locale,
  events,
}: {
  locale: string
  events: Awaited<ReturnType<typeof prisma.event.findMany>>
}) {
  const t = useTranslations("events")

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">{t("title")}</h1>
      {events.length === 0 ? (
        <p className="text-gray-400">{t("noEvents")}</p>
      ) : (
        <div className="flex flex-col gap-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="border border-gray-100 rounded-xl p-6 hover:border-[var(--green)] transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {getLocalizedField(event as unknown as Record<string, unknown>, "title", locale)}
                  </h2>
                  {event.location && (
                    <p className="text-sm text-gray-400 mt-1">📍 {event.location}</p>
                  )}
                  <p className="text-sm text-gray-600 mt-3">
                    {getLocalizedField(event as unknown as Record<string, unknown>, "desc", locale)}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <span className="inline-block bg-[var(--green-light)] text-[var(--green)] text-xs font-semibold px-3 py-1 rounded-full">
                    {new Date(event.date).toLocaleDateString(locale, {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
