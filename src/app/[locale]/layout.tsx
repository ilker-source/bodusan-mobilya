import { db } from "@/lib/db";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Link from "next/link";
export default async function LocaleLayout({children, params:{locale}}:{children:React.ReactNode; params:{locale:string}}) {
  const messages = await getMessages();
  const en = locale==='en';
  let cats: Awaited<ReturnType<typeof db.category.findMany>> = [];
  try { cats = await db.category.findMany({ orderBy:{ titleTr:"asc" } }); } catch { cats = []; }
  return (<>
  <style>{`.urun-wrap{position:relative}.urun-drop{display:none;position:absolute;top:100%;left:0;background:#fff;border:1px solid #ddd;border-radius:12px;min-width:220px;box-shadow:0 8px 24px rgba(0,0,0,.12);z-index:50;padding:6px}.urun-wrap:hover .urun-drop{display:block}.urun-drop a{display:block;padding:8px 10px;border-radius:8px;color:#222;text-decoration:none;white-space:nowrap}.urun-drop a:hover{background:#eef3f8}`}</style>
  <nav style={{display:"flex",gap:12,padding:12,borderBottom:"1px solid #ccc",alignItems:"center"}}>
  <Link href={`/${locale}`}><b>Bodusan</b></Link>
  <Link href={`/${locale}/kurumsal`}>{en?"Corporate":"Kurumsal"}</Link>
  <div className="urun-wrap"><Link href={`/${locale}/urunler`}>{en?"Products":"Urunler"} ▾</Link><div className="urun-drop">{cats.map((c)=>(<Link key={c.id} href={`/${locale}/urunler?kategori=`+c.key}>{en?c.titleEn:c.titleTr}</Link>))}</div></div>
  <Link href={`/${locale}/projeler`}>{en?"Projects":"Projeler"}</Link>
  <Link href={`/${locale}/uretim`}>{en?"Factory":"Uretim"}</Link>
  <Link href={`/${locale}/haberler`}>{en?"News":"Haberler"}</Link>
  <Link href={`/${locale}/iletisim`}>{en?"Contact":"Iletisim"}</Link>
  <Link href={`/${locale}/teklif-al`}>{en?"Get a Quote":"Teklif Al"}</Link>
  <a href="/admin">Admin</a>
  <span style={{marginLeft:"auto"}}><Link href="/tr">TR</Link> | <Link href="/en">EN</Link></span>
  </nav>
  <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
  </>);
}
