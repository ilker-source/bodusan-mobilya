import fs from "fs"; import path from "path"; import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
const map = { ofis:"ofis", egitim:"egitim", hastane:"hastane" };
for (const [klasor, key] of Object.entries(map)) {
  const dir = path.join("public/products", klasor);
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f=>/\.(jpg|jpeg|png|webp)$/i.test(f));
  if (!files.length) { console.log(key+": klasor bos, atlandi"); continue; }
  const cat = await db.category.findFirst({ where:{key} });
  if (!cat) continue;
  for (const f of files) {
    const url = `/products/${klasor}/${f}`;
    const title = f.replace(/\.[^.]+$/,"").replace(/[-_]+/g," ");
    let u = await db.product.findFirst({ where:{ titleTr: title } });
    if (!u) u = await db.product.create({ data:{ titleTr:title, titleEn:title, descTr:title, descEn:title, slugTr: title.toLowerCase().replace(/[^a-z0-9]+/g,"-")+ "-"+Date.now().toString(36), slugEn: title.toLowerCase().replace(/[^a-z0-9]+/g,"-")+ "-"+Date.now().toString(36), categoryId: cat.id } });
    await db.productImage.create({ data:{ url, productId: u.id } });
    console.log("eklendi: "+url);
  }
}
await db.$disconnect();
