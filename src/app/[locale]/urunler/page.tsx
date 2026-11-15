import { db } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
function duzelt(url: string){ return encodeURI(url.replace("/public","")); }
export default async function Urunler({params:{locale}, searchParams}:{params:{locale:string}; searchParams:{kategori?:string; sayfa?:string}}) {
  const en = locale==='en';
  const k = searchParams?.kategori;
  const sayfa = Math.max(1, parseInt(searchParams?.sayfa || "1"));
  const adet = 24;
  const cats = await db.category.findMany({ orderBy: { order: "asc" } });
  const where = k ? { active:true, category:{OR:[{key:k},{slugTr:k},{slugEn:k}]}} : { active:true };
  const toplam = await db.product.count({ where });
  const urunler = await db.product.findMany({ include:{category:true, images:{orderBy:{order:"asc"}, take:1}}, where, orderBy:{order:"asc"}, skip:(sayfa-1)*adet, take:adet });
  const toplamSayfa = Math.max(1, Math.ceil(toplam/adet));
  const link = (s:number)=>`/${locale}/urunler?`+(k?`kategori=${k}&`:"")+`sayfa=${s}`;
  return (<div style={{padding:20}}><h1>{en?"Products":"Urunlerimiz"}</h1>
  <div style={{display:"flex",gap:10,margin:"10px 0"}}><Link href={`/${locale}/urunler`}>{en?"All":"Tumu"}</Link>{cats.map((c)=>(<Link key={c.id} href={`/${locale}/urunler?kategori=`+c.key}>{en?c.titleEn:c.titleTr}</Link>))}</div>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:12}}>{urunler.map((u)=>{
    const kapak = u.images[0];
    return (<div key={u.id} style={{border:"1px solid #ccc",padding:8}}>{kapak && <Image src={duzelt(kapak.url)} alt={en?u.titleEn:u.titleTr} width={300} height={220} style={{width:"100%",height:140,objectFit:"cover"}} loading="lazy" />}<div><Link href={`/${locale}/urunler/`+(en?u.slugEn:u.slugTr)}><b>{en?u.titleEn:u.titleTr}</b></Link></div></div>);})}</div>
  <div style={{display:"flex",gap:10,marginTop:16}}>{sayfa>1 && <Link href={link(sayfa-1)}>{"< "+(en?"Prev":"Onceki")}</Link>}<span>{sayfa} / {toplamSayfa}</span>{sayfa<toplamSayfa && <Link href={link(sayfa+1)}>{(en?"Next":"Sonraki")+" >"}</Link>}</div></div>);
}
