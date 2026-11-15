import { db } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
function duzelt(url: string){ return encodeURI(url.replace("/public","")); }
export default async function Home({params:{locale}}:{params:{locale:string}}) {
  const en = locale==='en';
  const cats = await db.category.findMany({ orderBy: { order: "asc" } });
  const one = await db.product.findMany({ where: { active: true }, take: 6, orderBy: { order: "asc" }, include:{category:true, images:{orderBy:{order:"asc"}, take:1}} });
  return (<div style={{padding:20}}><h1>Bodusan Mobilya</h1><p>{en?"Office, Educational, Hospital Furniture":"Ofis, Egitim, Hastane Mobilyalari"}</p>
  <div style={{display:"flex",gap:10}}>{cats.map((c) => (<Link key={c.id} href={`/${locale}/urunler?kategori=`+c.key} style={{border:"1px solid #ccc",padding:20,flex:1}}><b>{en?c.titleEn:c.titleTr}</b></Link>))}</div>
  <h2>{en?"Featured Products":"One Cikan Urunler"}</h2>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:12}}>{one.map((u) => { const kapak=u.images[0]; return (<div key={u.id} style={{border:"1px solid #ccc",padding:8}}>{kapak && <Image src={duzelt(kapak.url)} alt={en?u.titleEn:u.titleTr} width={300} height={220} style={{width:"100%",height:140,objectFit:"cover"}} loading="lazy" />}<Link href={`/${locale}/urunler/`+(en?u.slugEn:u.slugTr)}><b>{en?u.titleEn:u.titleTr}</b></Link></div>);})}</div>
  <p><Link href={`/${locale}/urunler`}>{en?"All Products":"Tum Urunler"}</Link> | <Link href={`/${locale}/teklif-al`}>{en?"Get a Quote":"Teklif Al"}</Link></p>
  <footer style={{marginTop:30,borderTop:"1px solid #ccc",paddingTop:10}}><p>Bodusan Mobilya - info@bodusan.com - 0850 XXX XX XX</p></footer>
  </div>);
}
