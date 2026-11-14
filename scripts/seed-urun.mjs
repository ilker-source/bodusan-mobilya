import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
const ofis = await db.category.findFirst({ where: { key: "ofis" } });
await db.product.create({ data: {
titleTr: "Ergonomik Ofis Masası", titleEn: "Ergonomic Office Desk",
slugTr: "ergonomik-ofis-masasi", slugEn: "ergonomic-office-desk",
descTr: "Test ürünü", descEn: "Test product",
categoryId: ofis.id, featured: true, order: 1 } });
console.log("Ürün hazır");
await db.$disconnect();
