import { db } from "@/lib/db";
import { redirect } from "next/navigation";
export default async function Duzenle({params}:{params:{id:string}}){
  const u = await db.product.findUnique({ where:{ id: params.id } });
  if(!u) return <div style={{padding:20}}>Bulunamadı</div>;
  const cats = await db.category.findMany({ orderBy:{ titleTr:"asc" } });
  async function guncelle(f: FormData){
    "use server";
    const id = String(f.get("id")||"");
    await db.product.update({ where:{ id }, data:{
      titleTr:String(f.get("titleTr")||""), titleEn:String(f.get("titleEn")||""),
      descTr:String(f.get("descTr")||""), descEn:String(f.get("descEn")||""),
      olcuTr:String(f.get("olcuTr")||""), olcuEn:String(f.get("olcuEn")||""),
      renkTr:String(f.get("renkTr")||""), renkEn:String(f.get("renkEn")||""),
      malzemeTr:String(f.get("malzemeTr")||""), malzemeEn:String(f.get("malzemeEn")||""),
      categoryId:String(f.get("categoryId")||""), active: f.get("active")==="1"
    }});
    redirect("/admin/urunler");
  }
  return (<div style={{padding:20,maxWidth:700}}><h1>Ürünü Düzenle</h1><a href="/admin/urunler">Geri</a>
  <form action={guncelle} style={{display:"grid",gap:8,marginTop:12}}>
  <input type="hidden" name="id" value={u.id} />
  <label>TR Başlık<input name="titleTr" defaultValue={u.titleTr} style={{border:"1px solid #ccc",padding:8,width:"100%"}}/></label>
  <label>EN Başlık<input name="titleEn" defaultValue={u.titleEn} style={{border:"1px solid #ccc",padding:8,width:"100%"}}/></label>
  <label>Kategori<select name="categoryId" defaultValue={u.categoryId} style={{border:"1px solid #ccc",padding:8}}>{cats.map(c=>(<option key={c.id} value={c.id}>{c.titleTr}</option>))}</select></label>
  <label>TR Açıklama<textarea name="descTr" defaultValue={u.descTr} style={{border:"1px solid #ccc",padding:8}}/></label>
  <label>EN Açıklama<textarea name="descEn" defaultValue={u.descEn} style={{border:"1px solid #ccc",padding:8}}/></label>
  <label>Ölçü TR<input name="olcuTr" defaultValue={u.olcuTr} style={{border:"1px solid #ccc",padding:8,width:"100%"}}/></label>
  <label>Ölçü EN<input name="olcuEn" defaultValue={u.olcuEn} style={{border:"1px solid #ccc",padding:8,width:"100%"}}/></label>
  <label>Renk TR<input name="renkTr" defaultValue={u.renkTr} style={{border:"1px solid #ccc",padding:8,width:"100%"}}/></label>
  <label>Renk EN<input name="renkEn" defaultValue={u.renkEn} style={{border:"1px solid #ccc",padding:8,width:"100%"}}/></label>
  <label>Malzeme TR<input name="malzemeTr" defaultValue={u.malzemeTr} style={{border:"1px solid #ccc",padding:8,width:"100%"}}/></label>
  <label>Malzeme EN<input name="malzemeEn" defaultValue={u.malzemeEn} style={{border:"1px solid #ccc",padding:8,width:"100%"}}/></label>
  <label>Aktif mi<select name="active" defaultValue={u.active?"1":"0"} style={{border:"1px solid #ccc",padding:8}}><option value="1">Aktif</option><option value="0">Pasif</option></select></label>
  <button type="submit" style={{background:"#24466E",color:"#fff",padding:10,borderRadius:12}}>Güncelle</button>
  </form></div>);
}
