import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { revalidatePath } from "next/cache"

export default async function AdminEventsPage() {
  const session = await auth()
  if (!session) redirect("/admin/login")

  const events = await prisma.event.findMany({ orderBy: { date: "asc" } })

  async function deleteEvent(formData: FormData) {
    "use server"
    const id = formData.get("id") as string
    await prisma.event.delete({ where: { id } })
    revalidatePath("/admin/events")
  }

  async function createEvent(formData: FormData) {
    "use server"
    await prisma.event.create({
      data: {
        titleTr: formData.get("titleTr") as string,
        titleEn: formData.get("titleEn") as string,
        titleFr: formData.get("titleFr") as string,
        titleEo: formData.get("titleEo") as string,
        descTr: formData.get("descTr") as string,
        descEn: formData.get("descEn") as string,
        descFr: formData.get("descFr") as string,
        descEo: formData.get("descEo") as string,
        date: new Date(formData.get("date") as string),
        location: (formData.get("location") as string) || null,
      },
    })
    revalidatePath("/admin/events")
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/admin/dashboard" className="text-sm text-gray-400 hover:text-gray-600">
            ← Dashboard
          </Link>
          <span className="text-gray-300">/</span>
          <span className="font-semibold text-gray-800">Etkinlikler</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Add form */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-gray-800 mb-5">Yeni Etkinlik Ekle</h2>
          <form action={createEvent} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Başlık (TR)</label>
                <input name="titleTr" required className="input" placeholder="Türkçe başlık" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Başlık (EN)</label>
                <input name="titleEn" required className="input" placeholder="English title" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Başlık (FR)</label>
                <input name="titleFr" required className="input" placeholder="Titre français" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Başlık (EO)</label>
                <input name="titleEo" required className="input" placeholder="Esperanta titolo" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Açıklama (TR)</label>
                <textarea name="descTr" required className="input resize-none h-20" placeholder="Türkçe açıklama" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Açıklama (EN)</label>
                <textarea name="descEn" required className="input resize-none h-20" placeholder="English description" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Açıklama (FR)</label>
                <textarea name="descFr" required className="input resize-none h-20" placeholder="Description française" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Açıklama (EO)</label>
                <textarea name="descEo" required className="input resize-none h-20" placeholder="Esperanta priskribo" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Tarih & Saat</label>
                <input type="datetime-local" name="date" required className="input" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Konum (opsiyonel)</label>
                <input name="location" className="input" placeholder="GS Üniversitesi, B-101" />
              </div>
            </div>

            <button
              type="submit"
              className="self-start px-5 py-2 rounded-lg text-white text-sm font-semibold"
              style={{ backgroundColor: "#009a44" }}
            >
              Etkinlik Ekle
            </button>
          </form>
        </div>

        {/* Events list */}
        <h2 className="font-bold text-gray-800 mb-4">Mevcut Etkinlikler ({events.length})</h2>
        <div className="flex flex-col gap-3">
          {events.map((event) => (
            <div key={event.id} className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between gap-4">
              <div>
                <div className="font-medium text-gray-800">{event.titleTr}</div>
                <div className="text-xs text-gray-400 mt-0.5">
                  {new Date(event.date).toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {event.location && ` — ${event.location}`}
                </div>
              </div>
              <form action={deleteEvent}>
                <input type="hidden" name="id" value={event.id} />
                <button
                  type="submit"
                  className="text-xs text-red-400 hover:text-red-600 transition-colors px-3 py-1.5 border border-red-100 rounded-lg hover:border-red-300"
                >
                  Sil
                </button>
              </form>
            </div>
          ))}
          {events.length === 0 && (
            <p className="text-gray-400 text-sm">Henüz etkinlik yok.</p>
          )}
        </div>
      </div>
    </div>
  )
}
