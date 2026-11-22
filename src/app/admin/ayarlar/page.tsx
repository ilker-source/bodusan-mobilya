import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";

const fields = [
  { key: "phone", label: "Telefon", type: "text" },
  { key: "address", label: "Adres", type: "textarea" },
  { key: "mapEmbedUrl", label: "Harita iframe kaynak adresi", type: "textarea" },
  { key: "socialInstagram", label: "Instagram bağlantısı", type: "url" },
  { key: "socialFacebook", label: "Facebook bağlantısı", type: "url" },
  { key: "socialLinkedin", label: "LinkedIn bağlantısı", type: "url" },
  { key: "logoUrl", label: "Logo dosya yolu (ör. /logo-trimmed.png)", type: "text" },
  { key: "seoTitleTr", label: "SEO başlığı (TR)", type: "text" },
  { key: "seoDescriptionTr", label: "SEO açıklaması (TR)", type: "textarea" },
  { key: "seoTitleEn", label: "SEO title (EN)", type: "text" },
  { key: "seoDescriptionEn", label: "SEO description (EN)", type: "textarea" },
] as const;

export default async function AyarlarPage({
  searchParams,
}: {
  searchParams: { durum?: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/giris");

  async function kaydet(formData: FormData) {
    "use server";
    const session = await getServerSession(authOptions);
    if (!session) redirect("/admin/giris");

    for (const field of fields) {
      const value = String(formData.get(field.key) || "").trim();
      await db.setting.upsert({
        where: { key: field.key },
        update: { value },
        create: { key: field.key, value },
      });
    }

    revalidatePath("/admin/ayarlar");
    redirect("/admin/ayarlar?durum=kaydedildi");
  }

  const records = await db.setting.findMany({
    where: { key: { in: fields.map((field) => field.key) } },
  });
  const values = new Map(records.map((record) => [record.key, record.value]));

  return (
    <main style={{ maxWidth: 850, margin: "32px auto", padding: 20 }}>
      <h1>Site Ayarları</h1>
      <p><Link href="/admin">Admin ana sayfasına dön</Link></p>

      {searchParams?.durum === "kaydedildi" && (
        <p role="status" style={messageStyle}>Ayarlar kaydedildi.</p>
      )}

      <form action={kaydet} style={{ display: "grid", gap: 16 }}>
        {fields.map((field) => (
          <label key={field.key} style={{ display: "grid", gap: 6 }}>
            <span>{field.label}</span>
            {field.type === "textarea" ? (
              <textarea
                name={field.key}
                rows={field.key.startsWith("seoDescription") ? 4 : 3}
                defaultValue={values.get(field.key) || ""}
                style={inputStyle}
              />
            ) : (
              <input
                name={field.key}
                type={field.type}
                defaultValue={values.get(field.key) || ""}
                style={inputStyle}
              />
            )}
          </label>
        ))}
        <button type="submit" style={buttonStyle}>Ayarları kaydet</button>
      </form>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  boxSizing: "border-box" as const,
  padding: 10,
  border: "1px solid #bbb",
  borderRadius: 8,
};

const buttonStyle = {
  width: "fit-content",
  padding: "10px 16px",
  border: 0,
  borderRadius: 9,
  background: "#24466E",
  color: "#fff",
  cursor: "pointer",
};

const messageStyle = {
  padding: 12,
  borderRadius: 10,
  background: "#eef3f8",
};
