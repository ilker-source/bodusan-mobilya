import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import Link from "next/link";
export default async function LocaleLayout({children, params:{locale}}:{children:React.ReactNode; params:{locale:string}}) {
  const messages = await getMessages();
  const en = locale==='en';
  return (<>
  <div style={{padding:"12px 20px 0",background:"#f1f3f6"}}>
  <nav style={{display:"flex",gap:14,padding:"14px 20px",background:"#24466E",color:"#fff",alignItems:"center",borderRadius:16}}>
  <Link href={`/${locale}`} style={{color:"#fff"}}><b>Bodusan</b></Link>
  <Link href={`/${locale}/kurumsal`} style={{color:"#fff"}}>{en?"Corporate":"Kurumsal"}</Link>
  <Link href={`/${locale}/urunler`} style={{color:"#fff"}}>{en?"Products":"Urunler"}</Link>
  <Link href={`/${locale}/projeler`} style={{color:"#fff"}}>{en?"Projects":"Projeler"}</Link>
  <Link href={`/${locale}/uretim`} style={{color:"#fff"}}>{en?"Factory":"Uretim"}</Link>
  <Link href={`/${locale}/haberler`} style={{color:"#fff"}}>{en?"News":"Haberler"}</Link>
  <Link href={`/${locale}/iletisim`} style={{color:"#fff"}}>{en?"Contact":"Iletisim"}</Link>
  <Link href={`/${locale}/teklif-al`} style={{background:"#A67C52",color:"#fff",padding:"8px 16px",borderRadius:20}}>{en?"Get a Quote":"Teklif Al"}</Link>
  <a href="/admin" style={{color:"#ddd"}}>Admin</a>
  <span style={{marginLeft:"auto"}}><Link href="/tr" style={{color:"#fff"}}>TR</Link> | <Link href="/en" style={{color:"#fff"}}>EN</Link></span>
  </nav>
  </div>
  <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
  <footer style={{background:"#24466E",color:"#fff",padding:20,marginTop:30,borderRadius:"16px 16px 0 0"}}><p>Bodusan Mobilya - info@bodusan.com - 0850 XXX XX XX</p></footer>
  </>);
}
