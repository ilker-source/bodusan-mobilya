import { db } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
function duzelt(url: string){ return encodeURI(url.replace("/public","")); }
export default async function UrunDetay({params:{locale,slug}}:{params:{locale:string; slug:string}}) {
  const en = locale==='en';
  const u = await db.product.findFirst({ where:{OR:[{slugTr:slug},{slugEn:slug}]}, include:{category:true, images:{orderBy:{order:"asc"}}} });
  if(!u) return (<div style={{padding:20}}><p>{en?"Product not found.":"Urun bulunamadi."}</p><Link href={`/${locale}/urunler`}>{en?"Back":"Geri"}</Link></div>);
  const kapak = u.images[0];
  return (<div style={{padding:20}}><h1>{en?u.titleEn:u.titleTr}</h1><p>{en?u.category?.titleEn:u.category?.titleTr}</p><p>{en?u.descEn:u.descTr}</p>
  {kapak && <Image src={duzelt(kapak.url)} alt={en?u.titleEn:u.titleTr} width={800} height={600} style={{width:"100%",maxWidth:600,height:"auto",objectFit:"cover"}} priority />}
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:10,marginTop:12}}>{u.images.slice(1,9).map((im)=>(<Image key={im.id} src={duzelt(im.url)} alt={en?u.titleEn:u.titleTr} width={300} height={220} style={{width:"100%",height:110,objectFit:"cover"}} loading="lazy" />))}</div>
  <p style={{marginTop:12}}><Link href={`/${locale}/urunler`}>{en?"Back":"Geri"}</Link> | <Link href={`/${locale}/teklif-al`}>{en?"Get a Quote":"Teklif Al"}</Link></p></div>);
}
