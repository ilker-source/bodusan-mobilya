import fs from "fs"; import path from "path"; import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
function slugla(s){ return s.toLowerCase().replaceAll("ı","i").replaceAll("ş","s").replaceAll("ğ","g").replaceAll("ü","u").replaceAll("ö","o").replaceAll("ç","c").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60) || "urun"; }
function tara(dir){ let o=[]; for(const f of fs.readdirSync(dir,{withFileTypes:true})){ const p=path.join(dir,f.name); if(f.isDirectory()) o.push(...tara(p)); else o.push(p); } return o; }
function temizAd(ad){ return ad.replaceAll(" ","-").replaceAll("copy","").replaceAll("--","-").replaceAll("(","").replaceAll(")",""); }
// 1. once klasor adlarindaki bosluklari duzelt
for(const kat of ["ofis","egitim","hastane"]){
  const base = path.join("public/products", kat);
  if(!fs.existsSync(base)) continue;
  for(const e of fs.readdirSync(base,{withFileTypes:true})){
    if(e.isDirectory() && e.name.includes(" ")){
      const eski = path.join(base, e.name);
      const yeni = path.join(base, e.name.replaceAll(" ","-"));
      if(!fs.existsSync(yeni)) fs.renameSync(eski, yeni);
      console.log("klasor: "+e.name);
    }
  }
}
// 2. dosya adlarini duzelt
for(const full of tara("public/products")){
  const dir = path.dirname(full); const ad = path.basename(full);
  if(ad.includes(" ") || ad.includes("copy") || ad.includes("(")){
    const yeni = path.join(dir, temizAd(ad));
    if(full !== yeni && !fs.existsSync(yeni)) fs.renameSync(full, yeni);
  }
}
// 3. veritabanini sifirlayip dosyalardan yeniden kur
await db.productImage.deleteMany({}); await db.product.deleteMany({});
console.log("eski urunler temizlendi");
const map = { ofis:"ofis", egitim:"egitim", hastane:"hastane" };
function fotolar(dir){ let out=[]; for(const f of fs.readdirSync(dir,{withFileTypes:true})){ const p=path.join(dir,f.name); if(f.isDirectory()) out.push(...fotolar(p)); else if(/\.(jpg|jpeg|png|webp)$/i.test(f.name)) out.push(p); } return out; }
for(const [klasor,key] of Object.entries(map)){
  const dir = path.join("public/products", klasor);
  if(!fs.existsSync(dir)) continue;
  const cat = await db.category.findFirst({ where:{key} });
  if(!cat) continue;
  for(const e of fs.readdirSync(dir,{withFileTypes:true})){
    if(e.name===".DS_Store") continue;
    const tam = path.join(dir,e.name);
    if(e.isFile()){
      if(!/\.(jpg|jpeg|png|webp)$/i.test(e.name)) continue;
      const ham = e.name.replace(/\.[^.]+$/,"").replace(/-/g," ").trim() || key;
      const slug = slugla(ham)+"-"+Date.now().toString(36)+Math.floor(Math.random()*99);
      const u = await db.product.create({ data:{ titleTr:ham,titleEn:ham,descTr:ham,descEn:ham,slugTr:slug,slugEn:slug,categoryId:cat.id } });
      await db.productImage.create({ data:{ url:"/"+tam.replace(/\\/g,"/").replace("/public","").replace("public/",""), productId:u.id, isCover:true } });
    } else if(e.isDirectory()){
      const ham = e.name.replaceAll("-"," ").trim();
      const slug = slugla(ham)+"-"+Date.now().toString(36)+Math.floor(Math.random()*99);
      const u = await db.product.create({ data:{ titleTr:ham,titleEn:ham,descTr:ham,descEn:ham,slugTr:slug,slugEn:slug,categoryId:cat.id } });
      const files = fotolar(tam); let i=0;
      for(const f of files){
        const url = "/"+f.replace(/\\/g,"/").replace("/public","").replace("public/","").replace("//","/");
        await db.productImage.create({ data:{ url, productId:u.id, isCover:i===0, order:i } }); i++;
      }
      console.log("klasor urun: "+ham+" ("+files.length+" foto)");
    }
  }
}
await db.$disconnect();
