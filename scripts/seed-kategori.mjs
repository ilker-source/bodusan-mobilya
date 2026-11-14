import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
await db.category.createMany({ data: [
{ key: "ofis", titleTr: "Ofis Mobilyaları", titleEn: "Office Furniture", slugTr: "ofis-mobilyalari", slugEn: "office-furniture", order: 1 },
{ key: "egitim", titleTr: "Eğitim Mobilyaları", titleEn: "Educational Furniture", slugTr: "egitim-mobilyalari", slugEn: "educational-furniture", order: 2 },
{ key: "hastane", titleTr: "Hastane Mobilyaları", titleEn: "Hospital Furniture", slugTr: "hastane-mobilyalari", slugEn: "hospital-furniture", order: 3 },
] });
console.log("Kategoriler hazır");
await db.$disconnect();
