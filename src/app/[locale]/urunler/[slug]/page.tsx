import { db } from "@/lib/db";
import Link from "next/link";
import Galeri from "./galeri";
function duzelt(url: string){ return encodeURI(url.replace("/public","")); }
export default async function UrunDetay({params:{locale,slug}}:{params:{locale:string; slug:string}}) {
  const en = locale==='en';
  const u = await db.product.findFirst({ where:{OR:[{slugTr:slug},{slugEn:slug}]}, include:{category:true, images:{orderBy:{order:"asc"}}} });
  if(!u) return (<div style={{padding:20}}><p>{en?"Product not found.":"Urun bulunamadi."}</p><Link href={`/${locale}/urunler`}>{en?"Back":"Geri"}</Link></div>);
  const imgs = u.images.map(i=>duzelt(i.url));
  return (<div style={{padding:20,maxWidth:900}}><h1>{en?u.titleEn:u.titleTr}</h1><p>{en?u.category?.titleEn:u.category?.titleTr}</p>
  <Galeri imgs={imgs} ad={en?u.titleEn:u.titleTr} />
  <p style={{marginTop:12}}>{en?u.descEn:u.descTr}</p>
  <div style={{marginTop:12,border:"1px solid #ddd",borderRadius:16,padding:12}}>
  <div><b>{en?"Dimensions":"Ölçü"}:</b> {en?u.olcuEn:u.olcuTr || "-"}</div>
  <div><b>{en?"Color":"Renk"}:</b> {en?u.renkEn:u.renkTr || "-"}</div>
  <div><b>{en?"Material":"Malzeme"}:</b> {en?u.malzemeEn:u.malzemeTr || "-"}</div>
  </div>
  <p style={{marginTop:12}}><Link href={`/${locale}/urunler`}>{en?"Back":"Geri"}</Link> | <Link href={`/${locale}/teklif-al`}>{en?"Get a Quote":"Teklif Al"}</Link></p></div>);
}
