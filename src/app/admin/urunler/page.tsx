import { db } from "@/lib/db";
export default async function Urunler() {
  const urunler = await db.product.findMany({ include: { category: true }, orderBy: { order: "asc" }, take: 100 });
  return (<div style={{padding:20}}><h1>Ürünler</h1><a href="/admin">Geri dön</a> | <a href="/admin/urunler/yeni"><b>+ Yeni Ürün</b></a>
  {urunler.length===0 ? <p>Henüz ürün yok.</p> : urunler.map(u=>(
  <div key={u.id} style={{border:"1px solid #ccc",margin:"10px 0",padding:10}}>
  <b>{u.titleTr}</b> - {u.category?.titleTr}
  <div style={{marginTop:5,display:"flex",gap:10}}><a href={`/admin/urunler/${u.id}`}>Düzenle</a>
  <form action="/admin/urunler/sil" method="POST"><input type="hidden" name="id" value={u.id} /><button type="submit">Sil</button></form></div></div>))}</div>);
}
