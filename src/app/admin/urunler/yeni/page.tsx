import { db } from "@/lib/db";
import { redirect } from "next/navigation";
export default async function YeniUrun(){
  const cats = await db.category.findMany({ orderBy:{ titleTr:"asc" } });
  async function ekle(f: FormData){
    "use server";
    const titleTr = String(f.get("titleTr")||"");
    const titleEn = String(f.get("titleEn")||titleTr);
    const categoryId = String(f.get("categoryId")||"");
    if(!titleTr || !categoryId) return;
    const slugBase = titleTr.toLocaleLowerCase('tr').replaceAll('ı','i').replaceAll('ş','s').replaceAll('ğ','g').replaceAll('ü','u').replaceAll('ö','o').replaceAll('ç','c').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'') || "urun";
    const rnd = Math.random().toString(36).slice(2,6);
    await db.product.create({ data:{ titleTr, titleEn, descTr:String(f.get("descTr")||""), descEn:String(f.get("descEn")||""), olcuTr:String(f.get("olcuTr")||""), olcuEn:String(f.get("olcuEn")||""), renkTr:String(f.get("renkTr")||""), renkEn:String(f.get("renkEn")||""), malzemeTr:String(f.get("malzemeTr")||""), malzemeEn:String(f.get("malzemeEn")||""), slugTr:slugBase+"-"+rnd, slugEn:slugBase+"-"+rnd+"-en", categoryId, active:true } });
    redirect("/admin/urunler");
  }
  return (<div style={{padding:20,maxWidth:700}}><h1>Yeni Ürün</h1><a href="/admin/urunler">Geri</a>
  <form action={ekle} style={{display:"grid",gap:8,marginTop:12}}>
  <label>TR Başlık<input name="titleTr" required style={{border:"1px solid #ccc",padding:8,width:"100%"}}/></label>
  <label>EN Başlık<input name="titleEn" style={{border:"1px solid #ccc",padding:8,width:"100%"}}/></label>
  <label>Kategori<select name="categoryId" style={{border:"1px solid #ccc",padding:8,width:"100%"}}>{cats.map(c=>(<option key={c.id} value={c.id}>{c.titleTr}</option>))}</select></label>
  <label>TR Açıklama<textarea name="descTr" style={{border:"1px solid #ccc",padding:8}}/></label>
  <label>EN Açıklama<textarea name="descEn" style={{border:"1px solid #ccc",padding:8}}/></label>
  <label>Ölçü TR<input name="olcuTr" placeholder="örn: 140x70x75 cm" style={{border:"1px solid #ccc",padding:8,width:"100%"}}/></label>
  <label>Ölçü EN<input name="olcuEn" style={{border:"1px solid #ccc",padding:8,width:"100%"}}/></label>
  <label>Renk TR<input name="renkTr" style={{border:"1px solid #ccc",padding:8,width:"100%"}}/></label>
  <label>Renk EN<input name="renkEn" style={{border:"1px solid #ccc",padding:8,width:"100%"}}/></label>
  <label>Malzeme TR<input name="malzemeTr" style={{border:"1px solid #ccc",padding:8,width:"100%"}}/></label>
  <label>Malzeme EN<input name="malzemeEn" style={{border:"1px solid #ccc",padding:8,width:"100%"}}/></label>
  <button type="submit" style={{background:"#24466E",color:"#fff",padding:10,borderRadius:12}}>Kaydet</button>
  </form></div>);
}
