import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";

type HaberParams = {
  locale: string;
  slug: string;
};

async function haberiBul(params: HaberParams) {
  return db.post.findFirst({
    where: {
      active: true,
      OR: [{ slugTr: params.slug }, { slugEn: params.slug }],
    },
  });
}

export async function generateMetadata({ params }: { params: HaberParams }) {
  const en = params.locale === "en";
  const haber = await haberiBul(params);

  if (!haber) {
    return {
      title: en ? "News | Bodusan Furniture" : "Haberler | Bodüsan Mobilya",
    };
  }

  const title = en ? haber.titleEn : haber.titleTr;
  const body = en ? haber.bodyEn : haber.bodyTr;
  const fallback = en
    ? `News and updates from Bodusan Furniture: ${title}.`
    : `Bodüsan Mobilya’dan haberler: ${title}.`;

  return {
    title: `${title} | ${en ? "Bodusan Furniture" : "Bodüsan Mobilya"}`,
    description: (body.trim() || fallback).replace(/\s+/g, " ").slice(0, 160),
  };
}

export default async function HaberDetay({ params }: { params: HaberParams }) {
  const en = params.locale === "en";
  const haber = await haberiBul(params);

  if (!haber) notFound();

  const title = en ? haber.titleEn : haber.titleTr;
  const body = en ? haber.bodyEn : haber.bodyTr;
  const paragraphs = body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <main style={{ maxWidth: 850, margin: "0 auto", padding: 20 }}>
      <Link
        href={`/${params.locale}/haberler`}
        style={{ color: "#24466E", fontWeight: 600 }}
      >
        {en ? "← All news" : "← Tüm haberler"}
      </Link>

      <article
        style={{
          marginTop: 18,
          padding: "clamp(20px, 5vw, 42px)",
          border: "1px solid #e2e8f0",
          borderRadius: 18,
          background: "#fff",
        }}
      >
        <time
          dateTime={haber.createdAt.toISOString()}
          style={{ color: "#68717b", fontSize: 14 }}
        >
          {haber.createdAt.toLocaleDateString(en ? "en-US" : "tr-TR")}
        </time>
        <h1
          style={{
            color: "#24466E",
            fontSize: "clamp(28px, 5vw, 42px)",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>
        <div style={{ color: "#454b52", lineHeight: 1.85, fontSize: 17 }}>
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
