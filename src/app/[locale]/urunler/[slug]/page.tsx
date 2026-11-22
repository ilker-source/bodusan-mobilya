// src/app/[locale]/urunler/[slug]/page.tsx
import { db } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import Galeri from "./galeri";

function duzelt(url: string) {
  return encodeURI(url.replace("/public", ""));
}

export default async function UrunDetay({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const en = locale === "en";

  const u = await db.product.findFirst({
    where: { OR: [{ slugTr: slug }, { slugEn: slug }] },
    include: {
      category: true,
      images: { orderBy: { order: "asc" } },
    },
  });

  if (!u) {
    return (
      <main className="detail-page">
        <p>{en ? "Product not found." : "Ürün bulunamadı."}</p>
        <Link href={`/${locale}/urunler`}>
          {en ? "Back to products" : "Ürünlere dön"}
        </Link>
      </main>
    );
  }

  const benzerUrunler = await db.product.findMany({
    where: {
      active: true,
      categoryId: u.categoryId,
      id: { not: u.id },
    },
    orderBy: { order: "asc" },
    take: 4,
    include: {
      category: true,
      images: { orderBy: { order: "asc" }, take: 1 },
    },
  });

  const baslik = en ? u.titleEn : u.titleTr;
  const kategori = en ? u.category?.titleEn : u.category?.titleTr;

  return (
    <main className="detail-page">
      <style>{`
        .detail-page{max-width:1200px;margin:0 auto;padding:28px 20px 52px;color:#292d32}
        .detail-breadcrumb{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px;color:#69717a;font-size:14px}
        .detail-breadcrumb a{color:#24466E;text-decoration:none}
        .detail-hero{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(300px,.85fr);gap:28px;align-items:start}
        .detail-gallery{padding:14px;background:#f5f3ef;border:1px solid #e5e1da;border-radius:20px;min-width:0}
        .detail-info{padding:clamp(20px,3vw,34px);background:#f1f3f5;border:1px solid #e3e7eb;border-radius:20px}
        .detail-category{display:inline-block;margin:0 0 12px;padding:7px 11px;background:#e2e9f0;color:#24466E;border-radius:999px;font-size:13px;font-weight:700}
        .detail-info h1{margin:0 0 16px;color:#292d32;font-size:clamp(28px,4vw,42px);line-height:1.15}
        .detail-description{color:#555d65;line-height:1.8;white-space:pre-line}
        .detail-specs{display:grid;gap:0;margin:22px 0 24px;border:1px solid #dfe3e7;border-radius:14px;background:#fff;overflow:hidden}
        .detail-spec{display:grid;grid-template-columns:120px 1fr;gap:12px;padding:13px 15px;border-bottom:1px solid #e8ebee}
        .detail-spec:last-child{border-bottom:0}
        .detail-spec strong{color:#24466E}
        .detail-actions{display:flex;flex-wrap:wrap;gap:12px}
        .detail-button{display:inline-block;padding:12px 18px;border-radius:12px;background:#24466E;color:#fff;text-decoration:none;font-weight:700}
        .detail-secondary{display:inline-block;padding:11px 16px;border:1px solid #b9c3cd;border-radius:12px;color:#24466E;text-decoration:none;font-weight:600}
        .detail-related{margin-top:58px}
        .detail-related h2{margin:0 0 18px;font-size:clamp(23px,3vw,32px)}
        .detail-related-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
        .detail-related-card{overflow:hidden;border:1px solid #e5e1da;border-radius:16px;background:#f5f3ef;color:#292d32;text-decoration:none}
        .detail-related-photo{position:relative;height:170px;background:#e9e6df}
        .detail-related-copy{padding:12px}
        .detail-related-copy small{display:block;margin-bottom:5px;color:#77736c}
        .detail-related-copy strong{line-height:1.4}
        @media(max-width:800px){.detail-hero{grid-template-columns:1fr}.detail-related-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media(max-width:480px){.detail-page{padding:20px 12px 40px}.detail-spec{grid-template-columns:95px 1fr}.detail-related-grid{gap:10px}.detail-related-photo{height:135px}.detail-related-copy{padding:10px}.detail-gallery{padding:8px}}
      `}</style>

      <nav className="detail-breadcrumb" aria-label={en ? "Breadcrumb" : "Sayfa yolu"}>
        <Link href={`/${locale}`}>{en ? "Home" : "Ana Sayfa"}</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/${locale}/urunler`}>{en ? "Products" : "Ürünler"}</Link>
        {kategori && (
          <>
            <span aria-hidden="true">/</span>
            <span>{kategori}</span>
          </>
        )}
      </nav>

      <section className="detail-hero">
        <div className="detail-gallery">
          {u.images.length > 0 ? (
            <Galeri
              imgs={u.images.map((image) => duzelt(image.url))}
              ad={baslik}
            />
          ) : (
            <div
              style={{
                minHeight: 280,
                display: "grid",
                placeItems: "center",
                borderRadius: 14,
                background: "#e9e6df",
                color: "#77736c",
              }}
            >
              {en ? "Product images coming soon" : "Ürün görselleri yakında eklenecek"}
            </div>
          )}
        </div>

        <div className="detail-info">
          {kategori && <p className="detail-category">{kategori}</p>}
          <h1>{baslik}</h1>
          <div className="detail-description">
            {en ? u.descEn : u.descTr}
          </div>

          <div className="detail-specs">
            <div className="detail-spec">
              <strong>{en ? "Dimensions" : "Ölçü"}</strong>
              <span>{(en ? u.olcuEn : u.olcuTr) || "—"}</span>
            </div>
            <div className="detail-spec">
              <strong>{en ? "Color" : "Renk"}</strong>
              <span>{(en ? u.renkEn : u.renkTr) || "—"}</span>
            </div>
            <div className="detail-spec">
              <strong>{en ? "Material" : "Malzeme"}</strong>
              <span>{(en ? u.malzemeEn : u.malzemeTr) || "—"}</span>
            </div>
          </div>

          <div className="detail-actions">
            <Link className="detail-button" href={`/${locale}/teklif-al`}>
              {en ? "Request a Quote" : "Teklif Al"}
            </Link>
            <Link className="detail-secondary" href={`/${locale}/iletisim`}>
              {en ? "Contact Us" : "İletişime Geçin"}
            </Link>
          </div>
        </div>
      </section>

      {benzerUrunler.length > 0 && (
        <section className="detail-related">
          <h2>{en ? "Related products" : "Benzer ürünler"}</h2>
          <div className="detail-related-grid">
            {benzerUrunler.map((urun) => (
              <Link
                className="detail-related-card"
                href={`/${locale}/urunler/${en ? urun.slugEn : urun.slugTr}`}
                key={urun.id}
              >
                <div className="detail-related-photo">
                  {urun.images[0] && (
                    <Image
                      src={duzelt(urun.images[0].url)}
                      alt={en ? urun.titleEn : urun.titleTr}
                      fill
                      sizes="(max-width:480px) 50vw, (max-width:800px) 50vw, 25vw"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </div>
                <div className="detail-related-copy">
                  {urun.category && (
                    <small>
                      {en ? urun.category.titleEn : urun.category.titleTr}
                    </small>
                  )}
                  <strong>{en ? urun.titleEn : urun.titleTr}</strong>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
