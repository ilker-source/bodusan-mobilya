import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default async function MedyaPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/giris");

  const images = await db.productImage.findMany({
    include: { product: true },
    orderBy: [{ productId: "asc" }, { order: "asc" }],
  });

  return (
    <main style={{ maxWidth: 1200, margin: "32px auto", padding: 20 }}>
      <h1>Medya Kütüphanesi</h1>
      <p><Link href="/admin">Admin ana sayfasına dön</Link></p>
      <p>Ürünlere bağlı görsel sayısı: {images.length}</p>

      {images.length === 0 ? (
        <p>Veritabanında kayıtlı ürün görseli bulunamadı.</p>
      ) : (
        <section
          aria-label="Ürün görselleri"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))",
            gap: 16,
          }}
        >
          {images.map((image) => {
            const src = image.url.startsWith("/")
              ? encodeURI(image.url)
              : `/${encodeURI(image.url)}`;

            return (
              <article
                key={image.id}
                style={{
                  overflow: "hidden",
                  border: "1px solid #ddd",
                  borderRadius: 14,
                  background: "#f5f3ef",
                }}
              >
                <div style={{ position: "relative", height: 180, background: "#e9e6df" }}>
                  <Image
                    src={src}
                    alt={image.product.titleTr}
                    fill
                    sizes="(max-width:600px) 100vw, (max-width:1000px) 50vw, 25vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: 12 }}>
                  <strong>{image.product.titleTr}</strong>
                  <p style={{ margin: "6px 0", fontSize: 13, overflowWrap: "anywhere" }}>
                    {image.url}
                  </p>
                  <p style={{ margin: 0, fontSize: 13, color: "#555" }}>
                    {image.isCover ? "Kapak görseli" : "Ürün görseli"} · Sıra {image.order}
                  </p>
                  <Link
                    href={`/admin/urunler/${image.productId}`}
                    style={{ display: "inline-block", marginTop: 8, color: "#24466E" }}
                  >
                    Ürünü düzenle
                  </Link>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}
