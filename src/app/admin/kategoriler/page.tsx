import { db } from "@/lib/db";
import Link from "next/link";

export default async function KategorilerPage() {
  const cats = await db.category.findMany({ orderBy: { order: "asc" } });
  return (
    <div style={{maxWidth: 800, margin: "40px auto"}}>
      <h1>Kategoriler</h1>
      <Link href="/admin">Geri dön</Link>
      <ul>
        {cats.map((c) => (
          <li key={c.id}>{c.titleTr} / {c.titleEn} - {c.key}</li>
        ))}
      </ul>
      {cats.length === 0 && <p>Henüz kategori yok.</p>}
    </div>
  );
}
