import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import Menu from "./menu";
export default async function LocaleLayout({children, params:{locale}}:{children:React.ReactNode; params:{locale:string}}) {
  const messages = await getMessages();
  const en = locale==='en';
  return (<>
  <div style={{padding:"12px 12px 0",background:"#f1f3f6"}}>
  <Menu locale={locale} en={en} />
  </div>
  <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
  <footer style={{background:"#24466E",color:"#fff",padding:20,marginTop:30,borderRadius:"16px 16px 0 0"}}><p>Bodusan Mobilya - Sırrıpaşa, Vatan Cd. No:137, 41900 Derince/Kocaeli - <a href="tel:+902622236810" style={{color:"#fff"}}>+90 262 223 68 10</a></p></footer>
  </>);
}
