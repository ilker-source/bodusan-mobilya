import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
const toplam = await db.category.count();
console.log("kategori:"+toplam);
const ana = await db.category.findMany({ where:{ parentId:null }, select:{ titleTr:true } });
console.log("ana:"+ana.map(a=>a.titleTr).join(", "));
await db.$disconnect();
