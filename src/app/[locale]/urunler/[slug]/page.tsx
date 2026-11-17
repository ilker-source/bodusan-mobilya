import { db } from "@/lib/db";
import Link from "next/link";
import Galeri from "./galeri";
function duzelt(url: string){ return encodeURI(url.replace("/public","")); }
function sanatli(ad: string, en: boolean){
  if(en) return `${ad} carries the discipline of Derince factory into an artistic form: selected wood panels, metal frames and fabric meet precise cutting, edge banding and assembly. From raw material supply around Kocaeli to drying, pressing, welding, painting and final control, each step adds durability and elegance. Designed for offices, schools and hospitals, it balances ergonomics, long life and quiet beauty, produced since 1990 with careful craftsmanship for B2B projects.`;
  return `${ad} Derince fabrikasinin disiplinini sanatsal bir forma donusturur: secilmis ahsap panel, metal iskelet ve kumas; hassas kesim, kenar bandi ve montajla bulusur. Kocaeli cevresinden hammadde temininden kurutmaya, preslemeye, kaynak, boya ve son kontrole kadar her adim dayaniklilik ve zarafet katar. Ofis, okul ve hastane kullanimina uygun, ergonomi, uzun omur ve sessiz guzellik dengesi 1990 dan beri B2B projelere ozenli iscilikle uretilir.`;
}
export default async function UrunDetay({params:{locale,slug}}:{params:{locale:string; slug:string}}) {
  const en = locale==='en';
  const u = await db.product.findFirst({ where:{OR:[{slugTr:slug},{slugEn:slug}]}, include:{category:true, images:{orderBy:{order:"asc"}}} });
  if(!u) return (<div style={{padding:20}}><p>{en?"Product not found.":"Urun bulunamadi."}</p><Link href={`/${locale}/urunler`}>{en?"Back":"Geri"}</Link></div>);
  const imgs = u.images.map(i=>duzelt(i.url));
  const ad = en?u.titleEn:u.titleTr;
  return (<div style={{padding:20,maxWidth:1000,margin:"0 auto"}}><h1 style={{background:"#24466E",color:"#fff",padding:16,borderRadius:16}}>{ad}</h1><p>{en?u.category?.titleEn:u.category?.titleTr}</p>
  <div style={{display:"flex",gap:16,flexWrap:"wrap",alignItems:"flex-start"}}><div style={{flex:"1 1 420px",minWidth:280}}><Galeri imgs={imgs} ad={ad} /></div><div style={{flex:"1 1 280px",minWidth:260,border:"1px solid #e2e8f0",borderRadius:16,padding:12,background:"#fff"}}><div><b>{en?"Dimensions":"Ölçü"}:</b> {en?u.olcuEn:u.olcuTr || "-"}</div><div><b>{en?"Color":"Renk"}:</b> {en?u.renkEn:u.renkTr || "-"}</div><div><b>{en?"Material":"Malzeme"}:</b> {en?u.malzemeEn:u.malzemeTr || "-"}</div></div></div>
  <p style={{marginTop:12}}>{en?u.descEn:u.descTr}</p>
  <div style={{marginTop:12,background:"rgba(180,210,235,0.35)",borderRadius:16,padding:16}}><p>{sanatli(ad,en)}</p></div>
  <p style={{marginTop:12}}><Link href={`/${locale}/urunler`}>{en?"Back":"Geri"}</Link> | <Link href={`/${locale}/teklif-al`}>{en?"Get a Quote":"Teklif Al"}</Link></p></div>);
}
