import fs from "fs"; import path from "path"; import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
function fotolar(dir){ let out=[]; for(const f of fs.readdirSync(dir,{withFileTypes:true})){ const p=path.join(dir,f.name); if(f.isDirectory()) out.push(...fotolar(p)); else if(/\.(jpg|jpeg|png|webp)$/i.test(f.name)) out.push(p); } return out; }
function slugla(s){ return s.toLowerCase().replaceAll("ı","i").replaceAll("ş","s").replaceAll("ğ","g").replaceAll("ü","u").replaceAll("ö","o").replaceAll("ç","c").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60) || "urun"; }
function temizle(s){ return s.replace(/\.[^.]+$/,"").replace(/ copy|kopya/gi,"").trim(); }
await db.productImage.deleteMany({});
await db.product.deleteMany({});
console.log("eski urunler temizlendi");
const map = { ofis:"ofis", egitim:"egitim", hastane:"hastane" };
for (const [klasor, key] of Object.entries(map)) {
  const dir = path.join("public/products", klasor);
  if (!fs.existsSync(dir)) continue;
  const cat = await db.category.findFirst({ where:{key} });
  if (!cat) { console.log(key+": kategori yok"); continue; }
  for (const e of fs.readdirSync(dir, {withFileTypes:true})) {
    if (e.name === ".DS_Store") continue;
    const tam = path.join(dir, e.name);
    if (e.isFile()) {
      if (!/\.(jpg|jpeg|png|webp)$/i.test(e.name)) continue;
      const ham = temizle(e.name) || key;
      const slug = slugla(ham) + "-" + Date.now().toString(36) + Math.floor(Math.random()*99);
      const u = await db.product.create({ data:{ titleTr:ham, titleEn:ham, descTr:ham, descEn:ham, slugTr:slug, slugEn:slug, categoryId:cat.id } });
      await db.productImage.create({ data:{ url:"/"+tam.replace(/\\/g,"/"), productId:u.id, isCover:true } });
      console.log("tekli urun: "+ham);
    } else if (e.isDirectory()) {
      const ham = e.name.trim();
      const slug = slugla(ham) + "-" + Date.now().toString(36) + Math.floor(Math.random()*99);
      const u = await db.product.create({ data:{ titleTr:ham, titleEn:ham, descTr:ham, descEn:ham, slugTr:slug, slugEn:slug, categoryId:cat.id } });
      const files = fotolar(tam);
      let i = 0;
      for (const f of files) {
        await db.productImage.create({ data:{ url:"/"+f.replace(/\\/g,"/"), productId:u.id, isCover:i===0, order:i } });
        i++;
      }
      console.log("klasor urun: "+ham+" ("+files.length+" foto)");
    }
  }
}
await db.$disconnect();
