import { db } from "@/lib/db";
import Link from "next/link";
export default async function Home({params:{locale}}:{params:{locale:string}}) {
  const en = locale==='en';
  const cats = await db.category.findMany({ orderBy: { order: "asc" } });
  const one = await db.product.findMany({ where: { active: true }, take: 6, orderBy: { order: "asc" }, include:{images:{take:1,orderBy:{order:"asc"}},category:true} });
  return (<div>
  <div style={{background:"#2E4A6B",color:"#fff",padding:"60px 20px",textAlign:"center",borderRadius:"0 0 20px 20px"}}>
  <h1 style={{fontSize:36}}>Bodusan Mobilya</h1>
  <p>{en?"Office, Educational, Hospital Furniture - Since 1990":"Ofis, Egitim, Hastane Mobilyalari - 1990'dan beri"}</p>
  <Link href={`/${locale}/teklif-al`} style={{background:"#A67C52",color:"#fff",padding:"10px 22px",borderRadius:24,display:"inline-block",marginTop:12}}>{en?"Get a Quote":"Teklif Al"}</Link>
  </div>
  <div style={{padding:20}}>
  <div style={{display:"flex",gap:10}}>{cats.map((c) => (<Link key={c.id} href={`/${locale}/urunler?kategori=`+c.key} style={{border:"1px solid #ddd",padding:20,flex:1,borderRadius:16}}><b>{en?c.titleEn:c.titleTr}</b></Link>))}</div>
  <h2>{en?"Featured Products":"One Cikan Urunler"}</h2>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:12}}>{one.map((u) => {const img=u.images[0]?.url?.replace("/public","");return (<div key={u.id} style={{border:"1px solid #ddd",borderRadius:16,overflow:"hidden"}}>{img&&<img src={encodeURI(img)} style={{width:"100%",height:140,objectFit:"cover"}} />}<div style={{padding:10}}><Link href={`/${locale}/urunler/`+(en?u.slugEn:u.slugTr)}><b>{en?u.titleEn:u.titleTr}</b></Link></div></div>);})}</div>
  </div>
  </div>);
}
