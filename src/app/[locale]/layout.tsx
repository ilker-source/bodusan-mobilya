import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import Link from "next/link";
export default async function LocaleLayout({children, params:{locale}}:{children:React.ReactNode; params:{locale:string}}) {
  const messages = await getMessages();
  const en = locale==='en';
  return (<>
  <nav style={{display:"flex",gap:12,padding:12,borderBottom:"1px solid #ccc"}}>
  <Link href={`/${locale}`}><b>Bodusan</b></Link>
  <Link href={`/${locale}/kurumsal`}>{en?"Corporate":"Kurumsal"}</Link>
  <Link href={`/${locale}/urunler`}>{en?"Products":"Urunler"}</Link>
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
