import { db } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
function duzelt(u:string){ return encodeURI(u.replace("/public","")); }
export default async function Home({params:{locale}}:{params:{locale:string}}){
const en=locale==='en';
const urns=await db.product.findMany({where:{active:true},orderBy:{order:"asc"},take:12,include:{images:{orderBy:{order:"asc"},take:1}}});
const bg="rgba(180,210,235,0.25)";
const card={background:bg,borderRadius:20,padding:20};
const baslik={background:"#24466E",color:"#fff",padding:"24px 20px",borderRadius:20,textAlign:"center" as const,maxWidth:1000,margin:"20px auto"};
const satir={display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16,alignItems:"center" as const,maxWidth:1000,margin:"16px auto"};
const basliklar = en ? ["Craft Like Art","Thin Details","Patience in Production","Wood Meets Soul","Measure Twice Cut Once","Furniture That Lives"] : ["Sanat Gibi Zanaat","Ince Detaylar","Uretimde Sabir","Ahsapta Ruh Var","Olcmek Sanattir","Yasayan Mobilya"];
const metinler = en ? [
"For us furniture making is like sculpting. Every edge is sanded thinly, every joint is worked patiently until the piece stands like an artwork.",
"We work thin and precise like an artist. Wood, metal and fabric meet in our hands, and a desk turns into a balanced composition.",
"Mass production never means rough work. Each piece passes the same careful eye, the same hand touch, the same love for detail.",
"Wood has a soul and we listen to it. Grain direction, texture and color guide our hands like a painter guided by canvas.",
"We measure thin, we cut clean, we assemble slowly. That is why our office sets stand straight for decades in busy buildings.",
"A chair is not wood only, it carries mornings, meetings and tired evenings. We build it to live long and to age beautifully."
] : [
"Bizim icin mobilya uretmek heykel yapmak gibidir. Her kenar ince ince zimparalanir, her birlesim sabirla calisilir, sonunda odada duran bir sanat eserine donusur.",
"Bir sanatci gibi ince calisiriz. Ahsap, metal ve kumas elimizde bulusur, bir calisma masasi isik ve golgenin dengeli kompozisyonuna donusur.",
"Seri uretim bizim icin kaba is demek degildir. Yuzlerce parcanin her biri ayni dikkatli gozden, ayni el dokunusundan, ayni detay sevgisinden gecer.",
"Ahsabin ruhu vardir, biz onu dinleriz. Damar yonu, doku ve renk, tipki ressami yonlendiren tuval gibi elimize yol gosterir.",
"Ince olceriz, temiz keseriz, yavas birlestiririz. Bu yuzden ofis takimlarimiz yogun binalarda yillarca dimdik durur.",
"Bir sandalye sadece ahsap degildir, sabah mesaileri, toplantilar ve yorgun aksamlar tasir. Uzun yasasin ve guzel eskisin diye uretiriz."];
return (<div style={{padding:20}}>
<div style={baslik}><h1 style={{margin:0}}>Bodusan Mobilya</h1><p>{en?"Office, Educational, Hospital Furniture":"Ofis, Egitim, Hastane Mobilyalari"}</p><Link href={`/${locale}/teklif-al`} style={{background:"#A67C52",color:"#fff",padding:"10px 20px",borderRadius:14,textDecoration:"none"}}>{en?"Get a Quote":"Teklif Al"}</Link></div>
{[0,1,2,3,4,5].map((i)=>{
const u=urns[i*2]; const u2=urns[i*2+1];
const img=u?.images[0] ? <Image src={duzelt(u.images[0].url)} alt={en?u.titleEn:u.titleTr} width={500} height={350} style={{width:"100%",height:260,objectFit:"cover",borderRadius:16}} /> : null;
const img2=u2?.images[0] ? <Image src={duzelt(u2.images[0].url)} alt={en?u2.titleEn:u2.titleTr} width={500} height={350} style={{width:"100%",height:260,objectFit:"cover",borderRadius:16}} /> : null;
const txt=<div style={card}><h2>{basliklar[i]}</h2><p style={{lineHeight:1.7}}>{metinler[i]}</p>{u && <Link href={`/${locale}/urunler/`+(en?u.slugEn:u.slugTr)}>{en?u.titleEn:u.titleTr} →</Link>}</div>;
const gor=<div style={card}>{img}{img2 && <div style={{marginTop:10}}>{img2}</div>}</div>;
return (<div key={i} style={satir}>{i%2===0 ? <>{gor}{txt}</> : <>{txt}{gor}</>}</div>);
})}
<div style={{textAlign:"center",marginTop:16}}><Link href={`/${locale}/urunler`}>{en?"All Products":"Tum Urunler"}</Link></div>
</div>);}
