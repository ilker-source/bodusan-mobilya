import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
console.log("urun:" + await db.product.count() + " fotograf:" + await db.productImage.count());
await db.$disconnect();
