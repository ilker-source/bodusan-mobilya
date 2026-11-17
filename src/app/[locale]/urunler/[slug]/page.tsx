import { db } from "@/lib/db";
import Link from "next/link";
import Galeri from "./galeri";
function duzelt(url: string){ return encodeURI(url.replace("/public","")); }
function hash(s: string){ let h=0; for(let i=0;i<s.length;i++) h=(h*31+s.charCodeAt(i))>>>0; return h; }
function sanatli(ad: string, en: boolean){
  const h = hash(ad);
  if(en){
    const a=["carries Derince factory discipline into an artistic form","turns precise manufacturing into quiet sculpture","blends industrial strength with fine hand finishing","brings workshop patience together with modern design","transforms raw panels and metal into elegant furniture"];
    const b=["Selected wood panels, steel frames and quality fabric pass through cutting, edge banding, welding, painting and assembly","From raw material supply around Kocaeli, drying, pressing, CNC cutting, sanding and lacquering shape every part","Metal skeleton, wooden surfaces and upholstery meet precise measurement, jointing, polishing and final control","Cutting, drilling, edge tape, powder coating and careful packaging follow each other step by step","Panels are rested, cut to size, edged, painted and mounted with ergonomic details"];
    const c=["Designed for offices, schools and hospitals, it balances ergonomics, durability and timeless beauty for B2B projects since 1990","Made for intensive daily use, it offers long life, easy cleaning and calm aesthetics for public and private projects","With solid joints and balanced proportions, it serves meeting rooms, classrooms and waiting areas for many years","Its form supports posture, order and comfort while keeping maintenance simple for facility teams","Each detail reflects careful craftsmanship from Derince to Turkiye and export markets"];
    return `${ad} ${a[h%5]}: ${b[(h>>3)%5]}. ${c[(h>>5)%5]}.`;
  }
  const g1=["Derince mobilyaci arayanlar icin sanatsal bir cevap uretir","Derince mobilya ureticisi olarak ince iscilikle sekillenir","Derince mobilya imalatcisi titizligiyle sanata donusur","Derince fabrikasinin disiplinini zarif bir forma tasir","Atolye sabrini modern tasarimla birlestirir"];
  const g2=["Secilmis ahsap panel, celik iskelet ve kumas; kesim, kenar bandi, kaynak, boya ve montajdan gecer","Kocaeli cevresinden hammadde temini, kurutma, pres, CNC kesim, zimpara ve lake ile her parca olgunlasir","Metal karkas, ahsap yuzey ve doseme; hassas olcu, birlestirme, parlatma ve son kontrolle bulusur","Kesim, delme, kenar bantlama, toz boya ve ozenli paketleme adim adim birbirini izler","Paneller dinlendirilir, olcude kesilir, bantlanir, boyanir ve ergonomik detaylarla monte edilir"];
  const g3=["Ofis, okul ve hastane kullanimi icin ergonomi, dayaniklilik ve sessiz guzellik sunar, 1990 dan beri B2B projelere uretilir","Yogun gunluk kullanim icin uzun omur, kolay temizlik ve sakin estetik saglar, kamu ve ozel projelere uygundur","Saglam birlesimleri ve dengeli oranlariyla toplanti, sinif ve bekleme alanlarinda yillarca hizmet eder","Formu durus, duzen ve konforu desteklerken bakimi kolay tutar, tesis ekiplerine rahatlik verir","Her detay Derince den Turkiye ye ve ihracata uzanan ozenli uretimin izini tasir"];
  return `${ad} ${g1[h%5]}: ${g2[(h>>3)%5]}. ${g3[(h>>5)%5]}.`;
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
