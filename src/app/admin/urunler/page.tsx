import { db } from "@/lib/db";
export default async function Urunler() {
  const urunler = await db.product.findMany({ include: { category: true }, orderBy: { order: "asc" } });
  return (<div style={{padding:20}}><h1>Ürünler</h1><a href="/admin">Geri dön</a>
  {urunler.length===0 ? <p>Henüz ürün yok.</p> : urunler.map(u=>(
  <div key={u.id} style={{border:"1px solid #ccc",margin:"10px 0",padding:10}}>
  <b>{u.titleTr}</b> - {u.category?.titleTr}
  <form action="/admin/urunler/sil" method="POST" style={{marginTop:5}}>
  <input type="hidden" name="id" value={u.id} />
  <button type="submit">Sil</button></form></div>))}</div>);
}
