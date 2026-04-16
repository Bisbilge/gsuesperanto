import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { revalidatePath } from "next/cache"

export default async function AdminNewsPage() {
  const session = await auth()
  if (!session) redirect("/admin/login")

  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } })

  async function deletePost(formData: FormData) {
    "use server"
    const id = formData.get("id") as string
    await prisma.post.delete({ where: { id } })
    revalidatePath("/admin/news")
  }

  async function createPost(formData: FormData) {
    "use server"
    await prisma.post.create({
      data: {
        titleTr: formData.get("titleTr") as string,
        titleEn: formData.get("titleEn") as string,
        titleFr: formData.get("titleFr") as string,
        titleEo: formData.get("titleEo") as string,
        contentTr: formData.get("contentTr") as string,
        contentEn: formData.get("contentEn") as string,
        contentFr: formData.get("contentFr") as string,
        contentEo: formData.get("contentEo") as string,
      },
    })
    revalidatePath("/admin/news")
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/admin/dashboard" className="text-sm text-gray-400 hover:text-gray-600">
            ← Dashboard
          </Link>
          <span className="text-gray-300">/</span>
          <span className="font-semibold text-gray-800">Haberler</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Add form */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-gray-800 mb-5">Yeni Haber Ekle</h2>
          <form action={createPost} className="flex flex-col gap-4">
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
                <label className="block text-xs text-gray-500 mb-1">İçerik (TR)</label>
                <textarea name="contentTr" required className="input resize-none h-24" placeholder="Türkçe içerik" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">İçerik (EN)</label>
                <textarea name="contentEn" required className="input resize-none h-24" placeholder="English content" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">İçerik (FR)</label>
                <textarea name="contentFr" required className="input resize-none h-24" placeholder="Contenu français" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">İçerik (EO)</label>
                <textarea name="contentEo" required className="input resize-none h-24" placeholder="Esperanta enhavo" />
              </div>
            </div>

            <button
              type="submit"
              className="self-start px-5 py-2 rounded-lg text-white text-sm font-semibold"
              style={{ backgroundColor: "#009a44" }}
            >
              Haber Ekle
            </button>
          </form>
        </div>

        {/* News list */}
        <h2 className="font-bold text-gray-800 mb-4">Mevcut Haberler ({posts.length})</h2>
        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <div key={post.id} className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between gap-4">
              <div>
                <div className="font-medium text-gray-800">{post.titleTr}</div>
                <div className="text-xs text-gray-400 mt-0.5 line-clamp-1">{post.contentTr}</div>
              </div>
              <form action={deletePost}>
                <input type="hidden" name="id" value={post.id} />
                <button
                  type="submit"
                  className="text-xs text-red-400 hover:text-red-600 transition-colors px-3 py-1.5 border border-red-100 rounded-lg hover:border-red-300"
                >
                  Sil
                </button>
              </form>
            </div>
          ))}
          {posts.length === 0 && (
            <p className="text-gray-400 text-sm">Henüz haber yok.</p>
          )}
        </div>
      </div>
    </div>
  )
}
