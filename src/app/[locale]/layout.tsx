import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import Link from "next/link";
export default async function LocaleLayout({children, params:{locale}}:{children:React.ReactNode; params:{locale:string}}) {
  const messages = await getMessages();
  const en = locale==='en';
  return (<>
  <nav style={{display:"flex",gap:14,padding:"14px 20px",background:"#0A1F44",color:"#fff",alignItems:"center"}}>
  <Link href={`/${locale}`} style={{color:"#fff"}}><b>Bodusan</b></Link>
  <Link href={`/${locale}/kurumsal`} style={{color:"#fff"}}>{en?"Corporate":"Kurumsal"}</Link>
  <Link href={`/${locale}/urunler`} style={{color:"#fff"}}>{en?"Products":"Urunler"}</Link>
  <Link href={`/${locale}/projeler`} style={{color:"#fff"}}>{en?"Projects":"Projeler"}</Link>
  <Link href={`/${locale}/uretim`} style={{color:"#fff"}}>{en?"Factory":"Uretim"}</Link>
  <Link href={`/${locale}/haberler`} style={{color:"#fff"}}>{en?"News":"Haberler"}</Link>
  <Link href={`/${locale}/iletisim`} style={{color:"#fff"}}>{en?"Contact":"Iletisim"}</Link>
  <Link href={`/${locale}/teklif-al`} style={{background:"#A67C52",color:"#fff",padding:"6px 12px",borderRadius:6}}>{en?"Get a Quote":"Teklif Al"}</Link>
  <a href="/admin" style={{color:"#ddd"}}>Admin</a>
  <span style={{marginLeft:"auto"}}><Link href="/tr" style={{color:"#fff"}}>TR</Link> | <Link href="/en" style={{color:"#fff"}}>EN</Link></span>
  </nav>
  <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
  <footer style={{background:"#0A1F44",color:"#fff",padding:20,marginTop:30}}><p>Bodusan Mobilya - info@bodusan.com - 0850 XXX XX XX</p></footer>
  </>);
}
