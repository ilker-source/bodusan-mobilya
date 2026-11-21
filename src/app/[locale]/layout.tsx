// src/app/[locale]/layout.tsx
import { db } from "@/lib/db";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Link from "next/link";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  const en = locale === "en";

  let cats: Awaited<ReturnType<typeof db.category.findMany>> = [];
  try {
    cats = await db.category.findMany({ orderBy: { titleTr: "asc" } });
  } catch {
    cats = [];
  }

  const beyaz = { color: "#fff", textDecoration: "none" };

  return (
    <>
      <style>{`
        .urun-wrap{position:relative}
        .urun-drop{
          display:none;
          position:absolute;
          top:100%;
          left:0;
          background:#fff;
          border:1px solid #ddd;
          border-radius:12px;
          min-width:220px;
          box-shadow:0 8px 24px rgba(0,0,0,.12);
          z-index:50;
          padding:6px
        }
        .urun-wrap:hover .urun-drop{display:block}
        .urun-drop a{
          display:block;
          padding:8px 10px;
          border-radius:8px;
          color:#222;
          text-decoration:none;
          white-space:nowrap
        }
        .urun-drop a:hover{background:#eef3f8}
        .mobil-menu{display:none}

        @media(max-width:768px){
          .desktop-links{display:none !important}
          .site-nav{justify-content:center;min-height:88px}.site-nav>a:first-child{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}.site-nav>a:first-child img{width:min(256px,calc(100vw - 100px)) !important;height:64px !important}
          .mobil-menu{
            display:block !important;
            position:fixed;
            top:12px;
            left:12px;
            margin:0 !important;
            z-index:1000
          }
          .mobil-menu summary{
            list-style:none;
            cursor:pointer;
            background:#fff;
            color:#24466E;
            border-radius:10px;
            padding:8px 12px;
            font-size:20px;
            box-shadow:0 4px 14px rgba(0,0,0,.18)
          }
          .mobil-menu summary::-webkit-details-marker{display:none}
          .mobil-menu div{
            position:absolute;
            top:calc(100% + 8px);
            left:0;
            display:flex;
            flex-direction:column;
            gap:10px;
            background:#fff;
            border:1px solid #ddd;
            border-radius:12px;
            padding:12px;
            min-width:220px;
            max-width:calc(100vw - 24px);
            max-height:calc(100vh - 80px);
            overflow-y:auto;
            box-shadow:0 8px 24px rgba(0,0,0,.2)
          }
          .mobil-menu div a{
            color:#24466E;
            text-decoration:none
          }
        }
      `}</style>

      <div style={{ padding: 12 }}>
        <nav
          className="site-nav"
          style={{
            display: "flex",
            gap: 14,
            padding: "12px 16px",
            background: "#24466E",
            color: "#fff",
            alignItems: "center",
            borderRadius: 16,
            position: "relative",
          }}
        >
          <Link href={`/${locale}`} style={beyaz}>
            <img
              src="/logo-trimmed.png"
              alt="Bodusan Mobilya"
              style={{
                width: 256,
                height: 64,
                objectFit: "contain",
                background: "transparent",
                padding: 0,
              }}
            />
          </Link>

          <div
            className="desktop-links"
            style={{ display: "flex", gap: 14, alignItems: "center" }}
          >
            <Link href={`/${locale}/kurumsal`} style={beyaz}>
              {en ? "Corporate" : "Kurumsal"}
            </Link>

            <div className="urun-wrap">
              <Link href={`/${locale}/urunler`} style={beyaz}>
                {en ? "Products" : "Urunler"} ▾
              </Link>
              <div className="urun-drop">
                {cats.map((c) => (
                  <Link
                    key={c.id}
                    href={`/${locale}/urunler?kategori=${c.key}`}
                  >
                    {en ? c.titleEn : c.titleTr}
                  </Link>
                ))}
              </div>
            </div>

            <Link href={`/${locale}/projeler`} style={beyaz}>
              {en ? "Projects" : "Projeler"}
            </Link>
            <Link href={`/${locale}/uretim`} style={beyaz}>
              {en ? "Factory" : "Uretim"}
            </Link>
            <Link href={`/${locale}/haberler`} style={beyaz}>
              {en ? "News" : "Haberler"}
            </Link>
            <Link href={`/${locale}/iletisim`} style={beyaz}>
              {en ? "Contact" : "Iletisim"}
            </Link>
            <Link href={`/${locale}/teklif-al`} style={beyaz}>
              {en ? "Get a Quote" : "Teklif Al"}
            </Link>
          </div>

          <details className="mobil-menu">
            <summary aria-label={en ? "Open menu" : "Menüyü aç"}>☰</summary>
            <div>
              <Link href={`/${locale}/kurumsal`}>
                {en ? "Corporate" : "Kurumsal"}
              </Link>
              <Link href={`/${locale}/urunler`}>
                {en ? "Products" : "Urunler"}
              </Link>
              <Link href={`/${locale}/projeler`}>
                {en ? "Projects" : "Projeler"}
              </Link>
              <Link href={`/${locale}/uretim`}>
                {en ? "Factory" : "Uretim"}
              </Link>
              <Link href={`/${locale}/haberler`}>
                {en ? "News" : "Haberler"}
              </Link>
              <Link href={`/${locale}/iletisim`}>
                {en ? "Contact" : "Iletisim"}
              </Link>
              <Link href={`/${locale}/teklif-al`}>
                {en ? "Get a Quote" : "Teklif Al"}
              </Link>
            </div>
          </details>

          <span className="desktop-links" style={{ marginLeft: "auto" }}>
            <Link href="/tr" style={beyaz}>
              TR
            </Link>
            <span> | </span>
            <Link href="/en" style={beyaz}>
              EN
            </Link>
          </span>
        </nav>
      </div>

      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>

      <div style={{ padding: 12 }}>
        <footer
          style={{
            background: "#1a3454",
            color: "#fff",
            borderRadius: 16,
            padding: 20,
            display: "flex",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <div>
            <b>Bodusan Mobilya</b>
            <div>
              {en ? "Derince / Kocaeli production" : "Derince / Kocaeli uretim"}
            </div>
            <div>info@bodusan.com.tr</div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <Link href={`/${locale}/kurumsal`} style={beyaz}>
              {en ? "Corporate" : "Kurumsal"}
            </Link>
            <Link href={`/${locale}/urunler`} style={beyaz}>
              {en ? "Products" : "Urunler"}
            </Link>
            <Link href={`/${locale}/iletisim`} style={beyaz}>
              {en ? "Contact" : "Iletisim"}
            </Link>
            <Link href={`/${locale}/teklif-al`} style={beyaz}>
              {en ? "Get a Quote" : "Teklif Al"}
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
}