import { db } from "@/lib/db";
import Link from "next/link";
export default async function UrunDetay({params:{locale,slug}}:{params:{locale:string; slug:string}}) {
  const en = locale==='en';
  const u = await db.product.findFirst({ where:{OR:[{slugTr:slug},{slugEn:slug}]}, include:{category:true} });
  if(!u) return (<div style={{padding:20}}><p>{en?"Product not found.":"Urun bulunamadi."}</p><Link href={`/${locale}/urunler`}>{en?"Back":"Geri"}</Link></div>);
  return (<div style={{padding:20}}><h1>{en?u.titleEn:u.titleTr}</h1><p>{en?u.category?.titleEn:u.category?.titleTr}</p><p>{en?u.descEn:u.descTr}</p><Link href={`/${locale}/urunler`}>{en?"Back":"Geri"}</Link></div>);
}
