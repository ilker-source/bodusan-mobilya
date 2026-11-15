import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
const im = await db.productImage.findFirst({});
console.log(im.url);
await db.$disconnect();
