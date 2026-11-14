import { db } from "@/lib/db";
import { redirect } from "next/navigation";

async function ekle(formData: FormData) {
  "use server";
  const titleTr = String(formData.get("titleTr") || "");
  const categoryId = String(formData.get("categoryId") || "");
  const slugTr = titleTr.toLowerCase().replace(/[^a-z0-9çğıöşü]+/gi, "-") + "-" + Date.now();
  await db.product.create({ data: { titleTr, titleEn: titleTr, slugTr, slugEn: slugTr, descTr: "", descEn: "", categoryId } });
  redirect("/admin/urunler");
}

export default async function YeniUrun() {
  const cats = await db.category.findMany();
  return (<div style={{padding:20}}><h1>Yeni Ürün</h1>
  <form action={ekle}><input name="titleTr" placeholder="Ürün adı" style={{display:"block",margin:"8px 0",padding:8,width:300}} required />
  <select name="categoryId" style={{display:"block",margin:"8px 0",padding:8}}>{cats.map(c=><option key={c.id} value={c.id}>{c.titleTr}</option>)}</select>
  <button type="submit">Kaydet</button></form></div>);
}
