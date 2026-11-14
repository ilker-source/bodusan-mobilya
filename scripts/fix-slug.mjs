import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
function slugla(s){ return s.toLowerCase().replaceAll("ç","c").replaceAll("ğ","g").replaceAll("ı","i").replaceAll("ö","o").replaceAll("ş","s").replaceAll("ü","u").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""); }
const urunler = await db.product.findMany();
for(const u of urunler){ const yenitr = slugla(u.titleTr)+"-"+u.id.slice(-4); const yenen = slugla(u.titleEn||u.titleTr)+"-"+u.id.slice(-4); await db.product.update({where:{id:u.id}, data:{slugTr:yenitr, slugEn:yenen}}); console.log(u.titleTr+" -> /urunler/"+yenitr); }
await db.$disconnect();
