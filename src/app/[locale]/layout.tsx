import { db } from "@/lib/db";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Link from "next/link";
export default async function LocaleLayout({children, params:{locale}}:{children:React.ReactNode; params:{locale:string}}) {
  const messages = await getMessages();
  const en = locale==='en';
  let cats: Awaited<ReturnType<typeof db.category.findMany>> = [];
  try { cats = await db.category.findMany({ orderBy:{ titleTr:"asc" } }); } catch { cats = []; }
  const beyaz = {color:"#fff",textDecoration:"none"};
  return (<>
  <style>{`.urun-wrap{position:relative}.urun-drop{display:none;position:absolute;top:100%;left:0;background:#fff;border:1px solid #ddd;border-radius:12px;min-width:220px;box-shadow:0 8px 24px rgba(0,0,0,.12);z-index:50;padding:6px}.urun-wrap:hover .urun-drop{display:block}.urun-drop a{display:block;padding:8px 10px;border-radius:8px;color:#222;text-decoration:none;white-space:nowrap}.urun-drop a:hover{background:#eef3f8}`}</style>
  <div style={{padding:12}}>
  <nav style={{display:"flex",gap:14,padding:"12px 16px",background:"#24466E",color:"#fff",alignItems:"center",borderRadius:16}}>
  <Link href={`/${locale}`} style={beyaz}><img src="/logo.png" alt="Bodusan Mobilya" style={{height:64,width:"auto",borderRadius:12,background:"#fff",padding:4}} /></Link>
  <Link href={`/${locale}/kurumsal`} style={beyaz}>{en?"Corporate":"Kurumsal"}</Link>
  <div className="urun-wrap"><Link href={`/${locale}/urunler`} style={beyaz}>{en?"Products":"Urunler"} ▾</Link><div className="urun-drop">{cats.map((c)=>(<Link key={c.id} href={`/${locale}/urunler?kategori=`+c.key}>{en?c.titleEn:c.titleTr}</Link>))}</div></div>
  <Link href={`/${locale}/projeler`} style={beyaz}>{en?"Projects":"Projeler"}</Link>
  <Link href={`/${locale}/uretim`} style={beyaz}>{en?"Factory":"Uretim"}</Link>
  <Link href={`/${locale}/haberler`} style={beyaz}>{en?"News":"Haberler"}</Link>
  <Link href={`/${locale}/iletisim`} style={beyaz}>{en?"Contact":"Iletisim"}</Link>
  <Link href={`/${locale}/teklif-al`} style={beyaz}>{en?"Get a Quote":"Teklif Al"}</Link>
  <a href="/admin" style={beyaz}></a>
  <span style={{marginLeft:"auto"}}><Link href="/tr" style={beyaz}>TR</Link><span> | </span><Link href="/en" style={beyaz}>EN</Link></span>
  </nav>
  </div>
  <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
  <div style={{padding:12}}>
  <footer style={{background:"#1a3454",color:"#fff",borderRadius:16,padding:20,display:"flex",gap:20,flexWrap:"wrap"}}>
  <div><b>Bodusan Mobilya</b><div>{en?"Derince / Kocaeli production":"Derince / Kocaeli uretim"}</div><div>info@bodusan.com.tr</div></div>
  <div style={{display:"flex",gap:12}}><Link href={`/${locale}/kurumsal`} style={beyaz}>{en?"Corporate":"Kurumsal"}</Link><Link href={`/${locale}/urunler`} style={beyaz}>{en?"Products":"Urunler"}</Link><Link href={`/${locale}/iletisim`} style={beyaz}>{en?"Contact":"Iletisim"}</Link><Link href={`/${locale}/teklif-al`} style={beyaz}>{en?"Get a Quote":"Teklif Al"}</Link></div>
  </footer>
  </div>
  </>);
}
