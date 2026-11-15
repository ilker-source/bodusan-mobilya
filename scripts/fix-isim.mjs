import fs from "fs"; import path from "path"; import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
function tara(dir){ let o=[]; for(const f of fs.readdirSync(dir,{withFileTypes:true})){ const p=path.join(dir,f.name); if(f.isDirectory()) o.push(...tara(p)); else o.push(p); } return o; }
for(const full of tara("public/products")){
  if(full.includes(" ") || full.includes("copy")){
    let y=full.replaceAll(" ","-").replaceAll("copy","").replaceAll("--","-");
    fs.renameSync(full,y);
    const eski="/"+full.replace(/\\/g,"/"); const yeni="/"+y.replace(/\\/g,"/");
    await db.productImage.updateMany({ where:{url:eski}, data:{url:yeni} });
    console.log(eski+" -> "+yeni);
  }
}
await db.$disconnect();
