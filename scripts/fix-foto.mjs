import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
const imgs = await db.productImage.findMany({});
let n=0;
for (const im of imgs) {
  if (im.url.startsWith("/public/")) {
    await db.productImage.update({ where:{id:im.id}, data:{ url: im.url.replace("/public","") } });
    n++;
  }
}
console.log("duzeltildi:"+n);
await db.$disconnect();
