import { NextResponse } from "next/server";
import { db } from "@/lib/db";
export async function POST(req: Request) {
  const f = await req.formData();
  const id = String(f.get("id") || "");
  if (id) await db.product.delete({ where: { id } });
  return NextResponse.redirect(new URL("/admin/urunler", req.url));
}
