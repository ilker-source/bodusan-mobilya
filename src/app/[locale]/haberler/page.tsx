import { db } from "@/lib/db";
import { getSeoMetadata } from "@/lib/seo-metadata";
import Link from "next/link";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { locale: string } }) {
  return getSeoMetadata("news", params.locale);
}

export default async function Haberler({
  params,
}: {
  params: { locale: string };
}) {
  const en = params.locale === "en";
  const haberler = await db.post.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main style={{ maxWidth: 1000, margin: "0 auto", padding: 20 }}>
      <h1
        style={{
          background: "#24466E",
          color: "#fff",
          padding: 16,
          borderRadius: 16,
        }}
      >
        {en ? "News" : "Haberler"}
      </h1>

      {haberler.length === 0 ? (
        <section
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: 16,
            padding: 18,
            background: "#fff",
            marginTop: 16,
          }}
        >
          <p>
            {en
              ? "News from our Derince factory will be published here."
              : "Derince fabrikamızdan haberler burada yayınlanacak."}
          </p>
        </section>
      ) : (
        <section
          aria-label={en ? "News articles" : "Haber yazıları"}
          style={{ display: "grid", gap: 16, marginTop: 20 }}
        >
          {haberler.map((haber) => {
            const title = en ? haber.titleEn : haber.titleTr;
            const slug = en ? haber.slugEn : haber.slugTr;
            const body = en ? haber.bodyEn : haber.bodyTr;
            const excerpt = body.replace(/\s+/g, " ").trim().slice(0, 220);

            return (
              <article
                key={haber.id}
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: 16,
                  padding: 20,
                  background: "#fff",
                  boxShadow: "0 1px 4px rgba(36,70,110,0.08)",
                }}
              >
                <time
                  dateTime={haber.createdAt.toISOString()}
                  style={{ color: "#68717b", fontSize: 14 }}
                >
                  {haber.createdAt.toLocaleDateString(en ? "en-US" : "tr-TR")}
                </time>
                <h2 style={{ color: "#292d32", margin: "8px 0" }}>{title}</h2>
                {excerpt && <p style={{ color: "#505860", lineHeight: 1.7 }}>{excerpt}{body.length > 220 ? "…" : ""}</p>}
                <Link
                  href={`/${params.locale}/haberler/${slug}`}
                  style={{ color: "#24466E", fontWeight: 700 }}
                >
                  {en ? "Read more →" : "Devamını oku →"}
                </Link>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}
