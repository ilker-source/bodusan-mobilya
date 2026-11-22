// src/app/[locale]/page.tsx
import { db } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

function duzelt(url: string) {
  return encodeURI(url.replace("/public", ""));
}

function karistir<T>(liste: T[]): T[] {
  const sonuc = [...liste];
  for (let i = sonuc.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sonuc[i], sonuc[j]] = [sonuc[j], sonuc[i]];
  }
  return sonuc;
}

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const en = locale === "en";

  const [urunler, cats] = await Promise.all([
    db.product.findMany({
      where: { active: true },
      include: {
        category: true,
        images: { orderBy: { order: "asc" }, take: 1 },
      },
    }),
    db.category.findMany({ orderBy: { order: "asc" } }),
  ]);

  const vitrin = karistir(urunler).slice(0, 21);

  const kategoriTanimlari = [
    {
      key: "ofis",
      terms: ["ofis", "office"],
      tr: "Ofis Mobilyaları",
      en: "Office Furniture",
      textTr: "Çalışma alanları ve kurumsal ofisler için mobilya çözümleri.",
      textEn: "Furniture solutions for offices and professional workspaces.",
    },
    {
      key: "egitim",
      terms: ["eğitim", "egitim", "education", "school"],
      tr: "Eğitim Mobilyaları",
      en: "Education Furniture",
      textTr: "Okullar ve eğitim kurumları için kullanışlı, dayanıklı ürünler.",
      textEn: "Practical, durable furniture for schools and educational spaces.",
    },
    {
      key: "hastane",
      terms: ["hastane", "sağlık", "saglik", "hospital", "health"],
      tr: "Hastane Mobilyaları",
      en: "Hospital Furniture",
      textTr: "Sağlık kurumlarının ihtiyaçlarına yönelik mobilya grupları.",
      textEn: "Furniture groups designed for healthcare environments.",
    },
  ];

  const kategoriler = kategoriTanimlari.map((t) => {
    const bulunan = cats.find((c) => {
      const key = c.key.toLocaleLowerCase("tr-TR");
      const baslik = c.titleTr.toLocaleLowerCase("tr-TR");
      return t.terms.some((term) => key.includes(term) || baslik.includes(term));
    });

    const urun = urunler.find((u) => {
      const baslik = u.category?.titleTr.toLocaleLowerCase("tr-TR") || "";
      return (
        u.images[0] &&
        t.terms.some((term) => baslik.includes(term))
      );
    });

    return {
      ...t,
      href: `/${locale}/urunler?kategori=${encodeURIComponent(bulunan?.key || t.key)}`,
      image: urun?.images[0] ? duzelt(urun.images[0].url) : null,
    };
  });

  const basliklar = en
    ? [
        "Craft Like Art",
        "Fine Details",
        "Patience in Production",
        "Wood Meets Soul",
        "Measure Twice, Cut Once",
        "Furniture That Lives",
      ]
    : [
        "Sanat Gibi Zanaat",
        "İnce Detaylar",
        "Üretimde Sabır",
        "Ahşapta Ruh Var",
        "Ölçmek Sanattır",
        "Yaşayan Mobilya",
      ];

  const metinler = en
    ? [
        "For us furniture making is like sculpting. Every edge is sanded thinly, every joint is worked patiently until the piece stands like an artwork.",
        "We work thin and precise like an artist. Wood, metal and fabric meet in our hands, and a desk turns into a balanced composition.",
        "Mass production never means rough work. Each piece passes the same careful eye, the same hand touch, the same love for detail.",
        "Wood has a soul and we listen to it. Grain direction, texture and color guide our hands like a painter guided by canvas.",
        "We measure thin, we cut clean, we assemble slowly. That is why our office sets stand straight for decades in busy buildings.",
        "A chair is not wood only, it carries mornings, meetings and tired evenings. We build it to live long and to age beautifully.",
      ]
    : [
        "Bizim icin mobilya uretmek heykel yapmak gibidir. Her kenar ince ince zimparalanir, her birlesim sabirla calisilir, sonunda odada duran bir sanat eserine donusur.",
        "Bir sanatci gibi ince calisiriz. Ahsap, metal ve kumas elimizde bulusur, bir calisma masasi isik ve golgenin dengeli kompozisyonuna donusur.",
        "Seri uretim bizim icin kaba is demek degildir. Yuzlerce parcanin her biri ayni dikkatli gozden, ayni el dokunusundan, ayni detay sevgisinden gecer.",
        "Ahsabin ruhu vardir, biz onu dinleriz. Damar yonu, doku ve renk, tipki ressami yonlendiren tuval gibi elimize yol gosterir.",
        "Ince olceriz, temiz keseriz, yavas birlestiririz. Bu yuzden ofis takimlarimiz yogun binalarda yillarca dimdik durur.",
        "Bir sandalye sadece ahsap degildir, sabah mesaileri, toplantilar ve yorgun aksamlar tasir. Uzun yasasin ve guzel eskisin diye uretiriz.",
      ];

  const referanslar = [
    "Aile ve Sosyal Hizmetler Bakanlığı",
    "Gençlik ve Spor Bakanlığı",
    "Kocaeli Üniversitesi",
    "Sakarya Üniversitesi",
    "Kocaeli Büyükşehir Belediyesi",
    "Millî Eğitim Bakanlığı",
  ];

  return (
    <main className="home-page">
      <style>{`
        .home-page{max-width:1500px;margin:0 auto;padding:20px;color:#292d32}
        .home-hero{display:grid;grid-template-columns:1.1fr .9fr;gap:28px;align-items:center;background:linear-gradient(135deg,rgba(36,70,110,.10),rgba(166,124,82,.12));color:#292d32;padding:clamp(24px,5vw,64px);border-radius:24px;overflow:hidden}
        .home-hero h1{font-size:clamp(34px,5vw,62px);line-height:1.08;margin:0 0 18px}
        .home-hero p{font-size:clamp(16px,2vw,20px);line-height:1.7;color:#555d65;max-width:650px}
        .hero-image{position:relative;min-height:330px;border-radius:18px;overflow:hidden;background:#dfe5eb}
        .home-button{display:inline-block;background:#A67C52;color:#fff;padding:13px 22px;border-radius:14px;text-decoration:none;font-weight:700}
        .home-section{margin:64px 0}
        .section-heading{text-align:center;max-width:800px;margin:0 auto 26px}
        .section-heading h2{font-size:clamp(25px,3vw,38px);margin:0 0 10px;color:#292d32}
        .section-heading p{color:#626970;line-height:1.7;margin:0}
        .category-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
        .category-card{display:block;position:relative;overflow:hidden;min-height:270px;border-radius:20px;background:#e9edf1;color:#fff;text-decoration:none}
        .category-photo{position:absolute;inset:0}
        .category-shade{position:absolute;inset:0;background:linear-gradient(0deg,rgba(12,28,48,.88),rgba(12,28,48,.03) 78%)}
        .category-copy{position:absolute;left:20px;right:20px;bottom:18px}
        .category-copy h3{font-size:22px;margin:0 0 7px}
        .category-copy p{font-size:14px;line-height:1.5;margin:0;color:#f0f3f6}
        .stats-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
        .stat-card{padding:24px;text-align:center;background:#f1f3f5;border:1px solid #e4e7ea;border-radius:18px}
        .stat-card strong{display:block;color:#24466E;font-size:clamp(25px,4vw,38px);margin-bottom:6px}
        .stat-card span{color:#555d65}
        .home-products{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:14px}
        .product-card{overflow:hidden;background:#f5f3ef;border:1px solid #e5e1da;border-radius:16px;color:#292d32;text-decoration:none}
        .product-photo{position:relative;height:170px;background:#e9e6df}
        .product-copy{padding:12px}
        .product-copy small{display:block;color:#77736c;margin-bottom:5px}
        .product-copy strong{display:block;font-size:15px;line-height:1.4}
        .craft-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
        .craft-card{padding:22px;border-radius:18px;background:rgba(180,210,235,.25)}
        .craft-card h3{margin:0 0 10px;color:#24466E}
        .craft-card p{margin:0;line-height:1.7;color:#454b52}
        .factory-panel{display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:center;background:#eef2f5;border-radius:22px;padding:clamp(22px,4vw,42px)}
        .factory-panel h2{margin:0 0 12px;color:#24466E;font-size:clamp(25px,3vw,36px)}
        .factory-panel p{line-height:1.8;color:#454b52}
        .reference-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
        .reference-item{padding:18px;background:#f5f3ef;border:1px solid #e5e1da;border-radius:14px;text-align:center;font-weight:600;color:#454b52}
        .home-cta{text-align:center;background:#24466E;color:#fff;padding:38px 20px;border-radius:22px}
        .home-cta h2{margin:0 0 10px;font-size:clamp(25px,3vw,36px)}
        .home-cta p{line-height:1.7;color:#e7edf4}
        @media(max-width:1150px){.home-products{grid-template-columns:repeat(4,minmax(0,1fr))}.product-photo{height:190px}}
        @media(max-width:760px){.home-page{padding:12px}.home-hero{grid-template-columns:1fr}.hero-image{min-height:240px}.category-grid{grid-template-columns:1fr}.category-card{min-height:230px}.stats-grid{grid-template-columns:1fr}.home-products{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.product-photo{height:150px}.craft-grid{grid-template-columns:1fr}.factory-panel{grid-template-columns:1fr}.reference-grid{grid-template-columns:1fr 1fr}.home-section{margin:42px 0}}
        @media(max-width:390px){.home-products{grid-template-columns:1fr}.product-photo{height:210px}.reference-grid{grid-template-columns:1fr}}
      `}</style>

      <section className="home-hero">
        <div>
          <p>{en ? "BODUSAN FURNITURE · DERİNCE, KOCAELİ" : "BODÜSAN MOBİLYA · DERİNCE, KOCAELİ"}</p>
          <h1>{en ? "Furniture made with care, built for projects." : "Özenle üretilen, projeler için tasarlanan mobilyalar."}</h1>
          <p>
            {en
              ? "Office, education and hospital furniture from a manufacturer producing in Derince since 1990."
              : "1990’dan bu yana Derince’de üretim yapan Bodüsan’dan ofis, eğitim ve hastane mobilyaları."}
          </p>
          <Link className="home-button" href={`/${locale}/teklif-al`}>
            {en ? "Request a Quote" : "Teklif Al"}
          </Link>
        </div>

        <div className="hero-image" style={{minHeight:420}}>
          <Image src="/hero-fabrika.png" alt="Bodusan Derince fabrikası" fill priority sizes="(max-width:760px) 100vw, 45vw" style={{objectFit:"cover"}} />
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <h2>{en ? "Furniture for every project" : "Her projeye uygun mobilya grupları"}</h2>
          <p>
            {en
              ? "Explore our main product groups and find the right direction for your project."
              : "Ana ürün gruplarımızı inceleyerek projenize uygun çözümleri keşfedin."}
          </p>
        </div>

        <div className="category-grid">
          {kategoriler.map((c) => (
            <Link className="category-card" href={c.href} key={c.key}>
              {c.image && (
                <div className="category-photo">
                  <Image
                    src={c.image}
                    alt={en ? c.en : c.tr}
                    fill
                    sizes="(max-width:760px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
              <div className="category-shade" />
              <div className="category-copy">
                <h3>{en ? c.en : c.tr}</h3>
                <p>{en ? c.textEn : c.textTr}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section stats-grid" aria-label={en ? "Bodusan in numbers" : "Rakamlarla Bodüsan"}>
        <div className="stat-card">
          <strong>1990</strong>
          <span>{en ? "Established" : "Kuruluş yılı"}</span>
        </div>
        <div className="stat-card">
          <strong>4.500 m²</strong>
          <span>{en ? "Closed production area" : "Kapalı üretim alanı"}</span>
        </div>
        <div className="stat-card">
          <strong>3</strong>
          <span>{en ? "Main furniture groups" : "Ana mobilya grubu"}</span>
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <h2>{en ? "Explore our products" : "Ürünlerimizi keşfedin"}</h2>
          <p>
            {en
              ? "A changing selection from our active product range. Open the page again to see a refreshed selection and order."
              : "Aktif ürünlerimizden seçilen vitrin, her yeni sayfa açılışında farklı ürünlerle ve farklı sırayla yenilenir."}
          </p>
        </div>

        <div className="home-products">
          {vitrin.map((u, index) => (
            <Link
              className="product-card"
              href={`/${locale}/urunler/${en ? u.slugEn : u.slugTr}`}
              key={u.id}
            >
              <div className="product-photo">
                {u.images[0] ? (
                  <Image
                    src={duzelt(u.images[0].url)}
                    alt={en ? u.titleEn : u.titleTr}
                    fill
                    sizes="(max-width:390px) 100vw, (max-width:760px) 50vw, (max-width:1150px) 25vw, 14vw"
                    priority={index < 2}
                    style={{ objectFit: "cover" }}
                  />
                ) : null}
              </div>
              <div className="product-copy">
                {u.category && (
                  <small>{en ? u.category.titleEn : u.category.titleTr}</small>
                )}
                <strong>{en ? u.titleEn : u.titleTr}</strong>
              </div>
            </Link>
          ))}
        </div>

        <p style={{ textAlign: "center", marginTop: 24 }}>
          <Link href={`/${locale}/urunler`} style={{ color: "#24466E", fontWeight: 700 }}>
            {en ? "View all products →" : "Tüm ürünleri görüntüle →"}
          </Link>
        </p>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <h2>{en ? "Care in every detail" : "Her ayrıntıda özenli üretim"}</h2>
          <p>
            {en
              ? "A thoughtful approach to materials, detail and the way furniture is made."
              : "Malzemeden ayrıntıya, mobilyanın üretim biçimine kadar uzanan yaklaşımımız."}
          </p>
        </div>
        <div className="craft-grid">
          {basliklar.map((baslik, i) => (
            <article className="craft-card" key={baslik}>
              <h3>{baslik}</h3>
              <p>{metinler[i]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section factory-panel">
        <div>
          <h2>{en ? "Produced in Derince" : "Derince’de üretiyoruz"}</h2>
          <p>
            {en
              ? "Our factory is located in Derince, Kocaeli, close to Derince Port and the region’s road, rail and industrial connections. This location supports production planning and domestic and export project logistics."
              : "Fabrikamız Kocaeli’nin Derince ilçesinde, Derince Limanı’na ve bölgenin kara yolu, demir yolu ve sanayi bağlantılarına yakın konumdadır. Bu konum üretim planlamasını ve yurt içi ile ihracat projelerinin lojistiğini destekler."}
          </p>
          <Link href={`/${locale}/uretim`} style={{ color: "#24466E", fontWeight: 700 }}>
            {en ? "Discover our production facility →" : "Üretim tesisimizi keşfedin →"}
          </Link>
        </div>
        <div>
          <h3>{en ? "From production to project delivery" : "Üretimden proje teslimine"}</h3>
          <p>
            {en
              ? "Office, education and hospital furniture is produced for institutional and business projects, with product details and quote requests available through the site."
              : "Ofis, eğitim ve hastane mobilyaları kurum ve işletme projeleri için üretilir. Ürün detaylarını inceleyebilir, projeniz için teklif talebi gönderebilirsiniz."}
          </p>
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <h2>{en ? "Selected references" : "Referanslarımızdan"}</h2>
          <p>
            {en
              ? "Organizations and institutions included in Bodusan’s project references."
              : "Bodüsan’ın proje referanslarında yer alan kurum ve kuruluşlardan bazıları."}
          </p>
        </div>
        <div className="reference-grid">
          {referanslar.map((ad) => (
            <div className="reference-item" key={ad}>{ad}</div>
          ))}
        </div>
        <p style={{ textAlign: "center", marginTop: 22 }}>
          <Link href={`/${locale}/projeler`} style={{ color: "#24466E", fontWeight: 700 }}>
            {en ? "See all references →" : "Tüm referansları inceleyin →"}
          </Link>
        </p>
      </section>

      <section className="home-section home-cta">
        <h2>{en ? "Let’s discuss your project" : "Projenizi birlikte değerlendirelim"}</h2>
        <p>
          {en
            ? "Tell us what your project needs and request a quote from Bodusan."
            : "Projenizin ihtiyaçlarını paylaşın, Bodüsan’dan teklif talep edin."}
        </p>
        <Link className="home-button" href={`/${locale}/teklif-al`}>
          {en ? "Request a Quote" : "Teklif Al"}
        </Link>
      </section>
    </main>
  );
}
