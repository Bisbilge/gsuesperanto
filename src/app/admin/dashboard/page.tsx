import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { signOut } from "@/lib/auth"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect("/admin/login")

  const [eventCount, postCount] = await Promise.all([
    prisma.event.count({ where: { published: true } }),
    prisma.post.count({ where: { published: true } }),
  ])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#009a44" }}
            >
              <span className="text-white font-bold text-xs">★</span>
            </div>
            <span className="font-bold text-gray-800">Admin Panel</span>
          </div>
          <form
            action={async () => {
              "use server"
              await signOut({ redirectTo: "/admin/login" })
            }}
          >
            <button
              type="submit"
              className="text-sm text-gray-500 hover:text-red-500 transition-colors"
            >
              Çıkış Yap
            </button>
          </form>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-xl font-bold text-gray-800 mb-2">Hoş Geldiniz</h1>
        <p className="text-sm text-gray-400 mb-8">{session.user?.email}</p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <div className="text-3xl font-bold text-[var(--green)]">{eventCount}</div>
            <div className="text-sm text-gray-400 mt-1">Etkinlik</div>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <div className="text-3xl font-bold text-[var(--green)]">{postCount}</div>
            <div className="text-sm text-gray-400 mt-1">Haber</div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/admin/events"
            className="bg-white border border-gray-100 rounded-xl p-5 hover:border-[var(--green)] transition-colors"
          >
            <div className="font-semibold text-gray-800 mb-1">Etkinlikler</div>
            <div className="text-sm text-gray-400">Etkinlik ekle, düzenle veya sil</div>
          </Link>
          <Link
            href="/admin/news"
            className="bg-white border border-gray-100 rounded-xl p-5 hover:border-[var(--green)] transition-colors"
          >
            <div className="font-semibold text-gray-800 mb-1">Haberler</div>
            <div className="text-sm text-gray-400">Haber ekle, düzenle veya sil</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
