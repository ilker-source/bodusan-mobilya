import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const db = new PrismaClient();
const hash = await bcrypt.hash("Bodusan123!", 10);
await db.user.upsert({
  where: { email: "admin@bodusan.com" },
  update: { password: hash },
  create: { email: "admin@bodusan.com", password: hash, role: "admin" },
});
console.log("Admin hazır: admin@bodusan.com / Bodusan123!");
await db.$disconnect();
