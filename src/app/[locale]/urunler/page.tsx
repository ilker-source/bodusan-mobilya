// src/app/[locale]/urunler/page.tsx
import { db } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";

function duzelt(url: string) {
  return encodeURI(url.replace("/public", ""));
}

export default async function Urunler({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: { kategori?: string; sayfa?: string };
}) {
  const en = locale === "en";
  const k = searchParams?.kategori;
  const parsedPage = Number.parseInt(searchParams?.sayfa || "1", 10);
  const sayfa = Number.isFinite(parsedPage) ? Math.max(1, parsedPage) : 1;
  const adet = 24;

  const cats = await db.category.findMany({
    orderBy: { order: "asc" },
  });

  const where = k
    ? {
        active: true,
        category: {
          OR: [{ key: k }, { slugTr: k }, { slugEn: k }],
        },
      }
    : { active: true };

  const toplam = await db.product.count({ where });
  const urunler = await db.product.findMany({
    include: {
      category: true,
      images: {
        orderBy: { order: "asc" },
        take: 1,
      },
    },
    where,
    orderBy: { order: "asc" },
    skip: (sayfa - 1) * adet,
    take: adet,
  });

  const toplamSayfa = Math.max(1, Math.ceil(toplam / adet));
  const seciliKategori = cats.find(
    (c) => c.key === k || c.slugTr === k || c.slugEn === k
  );
  const kategoriBasligi = k
    ? seciliKategori
      ? en
        ? seciliKategori.titleEn
        : seciliKategori.titleTr
      : k
    : en
      ? "All Categories"
      : "Tüm Kategoriler";

  const sayfaLinki = (s: number) =>
    `/${locale}/urunler?${k ? `kategori=${encodeURIComponent(k)}&` : ""}sayfa=${s}`;

  return (
    <main
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "32px 20px 48px",
        color: "#30343b",
      }}
    >
      <header style={{ marginBottom: 24 }}>
        <p
          style={{
            margin: "0 0 8px",
            color: "#746b5f",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          {en ? "Bodusan Furniture" : "Bodüsan Mobilya"}
        </p>

        <h1
          style={{
            margin: "0 0 12px",
            color: "#292d32",
            fontSize: "clamp(28px, 4vw, 38px)",
            lineHeight: 1.2,
          }}
        >
          {en ? "Our Products" : "Ürünlerimiz"}
        </h1>

        <p
          style={{
            maxWidth: 820,
            margin: 0,
            color: "#5e6268",
            fontSize: 16,
            lineHeight: 1.7,
          }}
        >
          {en
            ? "Explore Bodusan’s office, education and hospital furniture. Since 1990, our Derince-based production has supported projects with practical, carefully made furniture. Choose a category to find the products suited to your needs."
            : "Bodüsan Mobilya’nın ofis, eğitim ve hastane mobilyalarını ürün gruplarına göre inceleyin. 1990’dan bu yana Derince’deki üretimimizle farklı projelere mobilya çözümleri sunuyoruz. İhtiyacınıza uygun ürünleri bulmak için kategorileri kullanabilirsiniz."}
        </p>
      </header>

      <details
        style={{
          width: "min(100%, 340px)",
          marginBottom: 22,
          padding: "12px 14px",
          border: "1px solid #ddd8cf",
          borderRadius: 14,
          background: "#f5f3ef",
        }}
      >
        <summary
          style={{
            cursor: "pointer",
            color: "#30343b",
            fontWeight: 600,
          }}
        >
          {kategoriBasligi} <span aria-hidden="true">▾</span>
        </summary>

        <nav
          aria-label={en ? "Product categories" : "Ürün kategorileri"}
          style={{
            display: "grid",
            gap: 4,
            marginTop: 12,
            paddingTop: 10,
            borderTop: "1px solid #e2ded7",
          }}
        >
          <Link
            href={`/${locale}/urunler`}
            style={{ padding: "7px 2px", color: "#45494f", textDecoration: "none" }}
          >
            {en ? "All Products" : "Tüm Ürünler"}
          </Link>

          {cats.map((c) => (
            <Link
              key={c.id}
              href={`/${locale}/urunler?kategori=${encodeURIComponent(c.key)}`}
              style={{ padding: "7px 2px", color: "#45494f", textDecoration: "none" }}
            >
              {en ? c.titleEn : c.titleTr}
            </Link>
          ))}
        </nav>
      </details>

      {urunler.length === 0 ? (
        <p style={{ color: "#5e6268" }}>
          {en ? "No products found in this category." : "Bu kategoride ürün bulunamadı."}
        </p>
      ) : (
        <section
          aria-label={en ? "Product gallery" : "Ürün galerisi"}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 230px), 1fr))",
            gap: 18,
          }}
        >
          {urunler.map((u) => {
            const kapak = u.images[0];

            return (
              <article
                key={u.id}
                style={{
                  overflow: "hidden",
                  padding: 10,
                  border: "1px solid #e5e1da",
                  borderRadius: 18,
                  background: "#f5f3ef",
                  boxShadow: "0 3px 12px rgba(38, 35, 30, 0.06)",
                }}
              >
                <Link
                  href={`/${locale}/urunler/${en ? u.slugEn : u.slugTr}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      height: 190,
                      borderRadius: 12,
                      background: "#e9e6df",
                    }}
                  >
                    {kapak ? (
                      <Image
                        src={duzelt(kapak.url)}
                        alt={en ? u.titleEn : u.titleTr}
                        width={640}
                        height={480}
                        sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        loading="lazy"
                      />
                    ) : (
                      <span style={{ color: "#77736c", fontSize: 14 }}>
                        {en ? "Image coming soon" : "Görsel yakında eklenecek"}
                      </span>
                    )}
                  </div>

                  <div style={{ padding: "13px 5px 5px" }}>
                    {u.category && (
                      <p
                        style={{
                          margin: "0 0 5px",
                          color: "#77736c",
                          fontSize: 12,
                        }}
                      >
                        {en ? u.category.titleEn : u.category.titleTr}
                      </p>
                    )}

                    <h2
                      style={{
                        margin: 0,
                        color: "#292d32",
                        fontSize: 17,
                        lineHeight: 1.45,
                      }}
                    >
                      {en ? u.titleEn : u.titleTr}
                    </h2>
                  </div>
                </Link>
              </article>
            );
          })}
        </section>
      )}

      {toplamSayfa > 1 && (
        <nav
          aria-label={en ? "Product pages" : "Ürün sayfaları"}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 18,
            marginTop: 30,
            color: "#45494f",
          }}
        >
          {sayfa > 1 && (
            <Link
              href={sayfaLinki(sayfa - 1)}
              style={{ color: "#45494f", textDecoration: "none" }}
            >
              {en ? "← Previous" : "← Önceki"}
            </Link>
          )}

          <span>
            {sayfa} / {toplamSayfa}
          </span>

          {sayfa < toplamSayfa && (
            <Link
              href={sayfaLinki(sayfa + 1)}
              style={{ color: "#45494f", textDecoration: "none" }}
            >
              {en ? "Next →" : "Sonraki →"}
            </Link>
          )}
        </nav>
      )}
    </main>
  );
}
