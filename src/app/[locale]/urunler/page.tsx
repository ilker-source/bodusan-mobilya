import { db } from "@/lib/db";
import Link from "next/link";
function duzelt(url: string){ return encodeURI(url.replace("/public","")); }
export default async function Urunler({params:{locale}, searchParams}:{params:{locale:string}; searchParams:{kategori?:string}}) {
  const en = locale==='en';
  const k = searchParams?.kategori;
  const cats = await db.category.findMany({ orderBy: { order: "asc" } });
  const where = k ? { active:true, category:{OR:[{key:k},{slugTr:k},{slugEn:k}]}} : { active:true };
  const urunler = await db.product.findMany({ include:{category:true, images:{orderBy:{order:"asc"}}}, where, orderBy:{order:"asc"} });
  return (<div style={{padding:20}}><h1>{en?"Products":"Urunlerimiz"}</h1>
  <div style={{display:"flex",gap:10,margin:"10px 0"}}><Link href={`/${locale}/urunler`}>{en?"All":"Tumu"}</Link>{cats.map((c)=>(<Link key={c.id} href={`/${locale}/urunler?kategori=`+c.key}>{en?c.titleEn:c.titleTr}</Link>))}</div>
  {urunler.length===0?<p>{en?"No products in this category.":"Bu kategoride urun yok."}</p>:urunler.map((u)=>{
    const kapak = u.images.find(i=>i.isCover) || u.images[0];
    return (<div key={u.id} style={{border:"1px solid #ccc",margin:"10px 0",padding:10,display:"flex",gap:10,alignItems:"center"}}>
    {kapak && <img src={duzelt(kapak.url)} alt={en?u.titleEn:u.titleTr} width={120} height={90} style={{objectFit:"cover"}} />}
    <div><Link href={`/${locale}/urunler/`+(en?u.slugEn:u.slugTr)}><b>{en?u.titleEn:u.titleTr}</b></Link><br/>- {en?u.category?.titleEn:u.category?.titleTr}</div>
    </div>);})}</div>);
}
