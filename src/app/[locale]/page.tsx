import { db } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
function duzelt(u:string){ return encodeURI(u.replace("/public","")); }
export default async function Home({params:{locale}}:{params:{locale:string}}){
const en=locale==='en';
const urns=await db.product.findMany({where:{active:true},orderBy:{order:"asc"},take:6,include:{images:{orderBy:{order:"asc"},take:1}}});
const bg="rgba(180,210,235,0.25)";
const card={background:bg,borderRadius:20,padding:20};
const baslik={background:"#24466E",color:"#fff",padding:"24px 20px",borderRadius:20,textAlign:"center" as const,maxWidth:1000,margin:"20px auto"};
const satir={display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16,alignItems:"center" as const,maxWidth:1000,margin:"16px auto"};
const metinler = en ? [
"For us furniture making is like sculpting. Every edge is sanded thinly, every joint is worked patiently until the piece stands like an artwork in the room.",
"We work thin and precise like an artist. Wood, metal and fabric meet in our hands, and an office desk turns into a balanced composition of light and shadow.",
"Mass production never means粗 rough work for us. Each of the hundreds of pieces passes the same careful eye, the same hand touch, the same love for detail."
] : [
"Bizim için mobilya üretmek heykel yapmak gibidir. Her kenar ince ince zımparalanır, her birleşim sabırla çalışılır, sonunda oda içinde duran bir sanat eserine dönüşür.",
"Bir sanatçı gibi ince çalışırız. Ahşap, metal ve kumaş elimizde buluşur, bir ofis masası ışık ve gölgenin dengeli bir kompozisyonuna dönüşür.",
"Seri üretim bizim için kaba iş demek değildir. Yüzlerce parçanın her biri aynı dikkatli gözden, aynı el dokunuşundan, aynı detay sevgisinden geçer. İnce çalışırız, çünkü mobilyanın yıllarca yaşayacağına inanırız."];
return (<div style={{padding:20}}>
<div style={baslik}><h1 style={{margin:0}}>Bodusan Mobilya</h1><p>{en?"Office, Educational, Hospital Furniture":"Ofis, Egitim, Hastane Mobilyalari"}</p><Link href={`/${locale}/teklif-al`} style={{background:"#A67C52",color:"#fff",padding:"10px 20px",borderRadius:14,textDecoration:"none"}}>{en?"Get a Quote":"Teklif Al"}</Link></div>
{[0,1,2].map((i)=>{
const u=urns[i*2]; const u2=urns[i*2+1];
const img=u?.images[0] ? <Image src={duzelt(u.images[0].url)} alt={en?u.titleEn:u.titleTr} width={500} height={350} style={{width:"100%",height:260,objectFit:"cover",borderRadius:16}} /> : null;
const img2=u2?.images[0] ? <Image src={duzelt(u2.images[0].url)} alt={en?u2.titleEn:u2.titleTr} width={500} height={350} style={{width:"100%",height:260,objectFit:"cover",borderRadius:16}} /> : null;
const txt=<div style={card}><h2>{en?["Craft Like Art","Thin Details","Patience in Production"][i]:["Sanat Gibi Zanaat","İnce Detaylar","Üretimde Sabır"][i]}</h2><p style={{lineHeight:1.7}}>{metinler[i]}</p>{u && <Link href={`/${locale}/urunler/`+(en?u.slugEn:u.slugTr)}>{en?u.titleEn:u.titleTr} →</Link>}</div>;
const gor=<div style={card}>{img}{img2 && <div style={{marginTop:10}}>{img2}</div>}</div>;
return (<div key={i} style={satir}>{i%2===0 ? <>{gor}{txt}</> : <>{txt}{gor}</>}</div>);
})}
<div style={{textAlign:"center",marginTop:16}}><Link href={`/${locale}/urunler`}>{en?"All Products":"Tum Urunler"}</Link></div>
</div>);}
