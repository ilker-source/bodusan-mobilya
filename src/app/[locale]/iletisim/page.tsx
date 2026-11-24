import { getSeoMetadata } from "@/lib/seo-metadata";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
export function generateMetadata({ params }: { params: { locale: string } }) {
  return getSeoMetadata("contact", params.locale);
}

export default function Iletisim({params:{locale}, searchParams}:{params:{locale:string}; searchParams:{ok?:string}}) {
const en=locale==='en';
async function gonder(formData: FormData){
"use server";
const { cookies } = await import("next/headers");
const c = await cookies();
const loc = c.get("NEXT_LOCALE")?.value || "tr";
await db.message.create({ data:{ type:"contact", name:String(formData.get("name")||""), email:String(formData.get("email")||""), content:String(formData.get("content")||"") } });
redirect(`/${loc}/iletisim?ok=1`);
}
const bg="rgba(180,210,235,0.35)";
return (<div style={{padding:20,maxWidth:1000,margin:"0 auto"}}>
<h1 style={{background:"#24466E",color:"#fff",padding:16,borderRadius:16}}>{en?"Contact":"Iletisim"}</h1>
{searchParams?.ok && <p style={{background:"#d4edda",padding:10,borderRadius:12}}>{en?"Sent successfully":"Gonderildi, tesekkurler"}</p>}
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16,marginTop:16}}>
<div style={{background:bg,padding:20,borderRadius:16,display:"flex",flexDirection:"column"}}>
<b>{en?"Contact Form":"Iletisim Formu"}</b>
<form action={gonder} style={{display:"flex",flexDirection:"column",gap:10,marginTop:10}}>
<input name="name" placeholder={en?"Name":"Adiniz"} required style={{padding:10,borderRadius:12,border:"1px solid #ccc"}} />
<input name="email" placeholder="E-posta" required style={{padding:10,borderRadius:12,border:"1px solid #ccc"}} />
<textarea name="content" placeholder={en?"Message":"Mesajiniz"} required rows={6} style={{padding:10,borderRadius:12,border:"1px solid #ccc",minHeight:150}} />
<button style={{background:"#24466E",color:"#fff",padding:12,borderRadius:12,border:0}}>{en?"Send":"Gonder"}</button>
</form>
<p style={{marginTop:10}}>Sırrıpaşa, Vatan Cd. No:137, 41900 Derince/Kocaeli<br/><a href="tel:+902622236810">+90 262 223 68 10</a></p>
</div>
<div style={{background:bg,padding:12,borderRadius:16,display:"flex",flexDirection:"column"}}>
<b style={{padding:"8px 8px 0"}}>{en?"Map":"Harita"}</b>
<div style={{borderRadius:12,overflow:"hidden",marginTop:8,flex:1,minHeight:380,display:"flex"}}>
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.805238142622!2d29.81616349999999!3d40.76630819999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cb4782f4ed0383%3A0x68c7107bc40ba6dd!2zQk9Ew5xTQU4gTU9CxLBMWUE!5e0!3m2!1sen!2str!4v1794838487610!5m2!1sen!2str" width="100%" height="100%" style={{border:0,minHeight:380,flex:1}} loading="lazy"></iframe>
</div>
</div>
</div>
</div>);}
