import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";

function slugOlustur(text: string) {
  return text
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default async function HaberlerPage({
  searchParams,
}: {
  searchParams: { durum?: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/giris");

  async function olustur(formData: FormData) {
    "use server";
    const session = await getServerSession(authOptions);
    if (!session) redirect("/admin/giris");

    const titleTr = String(formData.get("titleTr") || "").trim();
    const titleEn = String(formData.get("titleEn") || "").trim();
    const slugTr = slugOlustur(String(formData.get("slugTr") || "").trim() || titleTr);
    const slugEn = slugOlustur(String(formData.get("slugEn") || "").trim() || titleEn);
    const bodyTr = String(formData.get("bodyTr") || "").trim();
    const bodyEn = String(formData.get("bodyEn") || "").trim();

    if (!titleTr || !titleEn || !slugTr || !slugEn) {
      redirect("/admin/haberler?durum=eksik");
    }

    try {
      await db.post.create({
        data: {
          titleTr,
          titleEn,
          slugTr,
          slugEn,
          bodyTr,
          bodyEn,
          active: formData.get("active") === "1",
        },
      });
    } catch {
      redirect("/admin/haberler?durum=slug");
    }

    revalidatePath("/admin/haberler");
    revalidatePath("/tr/haberler");
    revalidatePath("/en/haberler");
    redirect("/admin/haberler?durum=eklendi");
  }

  async function guncelle(formData: FormData) {
    "use server";
    const session = await getServerSession(authOptions);
    if (!session) redirect("/admin/giris");

    const id = String(formData.get("id") || "");
    const titleTr = String(formData.get("titleTr") || "").trim();
    const titleEn = String(formData.get("titleEn") || "").trim();
    const slugTr = slugOlustur(String(formData.get("slugTr") || "").trim() || titleTr);
    const slugEn = slugOlustur(String(formData.get("slugEn") || "").trim() || titleEn);
    const bodyTr = String(formData.get("bodyTr") || "").trim();
    const bodyEn = String(formData.get("bodyEn") || "").trim();

    if (!id || !titleTr || !titleEn || !slugTr || !slugEn) {
      redirect("/admin/haberler?durum=eksik");
    }

    try {
      await db.post.update({
        where: { id },
        data: {
          titleTr,
          titleEn,
          slugTr,
          slugEn,
          bodyTr,
          bodyEn,
          active: formData.get("active") === "1",
        },
      });
    } catch {
      redirect("/admin/haberler?durum=slug");
    }

    revalidatePath("/admin/haberler");
    revalidatePath("/tr/haberler");
    revalidatePath("/en/haberler");
    redirect("/admin/haberler?durum=guncellendi");
  }

  const haberler = await db.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  const mesajlar: Record<string, string> = {
    eklendi: "Haber eklendi.",
    guncellendi: "Haber güncellendi.",
    eksik: "Türkçe ve İngilizce başlıklar zorunludur.",
    slug: "Kayıt yapılamadı. Türkçe veya İngilizce slug başka bir haberde kullanılıyor olabilir.",
  };

  return (
    <main style={{ maxWidth: 900, margin: "32px auto", padding: 20 }}>
      <h1>Haberler Yönetimi</h1>
      <p><Link href="/admin">Admin ana sayfasına dön</Link></p>

      {searchParams?.durum && mesajlar[searchParams.durum] && (
        <p role="status" style={messageStyle}>{mesajlar[searchParams.durum]}</p>
      )}

      <section style={cardStyle}>
        <h2>Yeni haber ekle</h2>
        <form action={olustur} style={formStyle}>
          <label>Başlık (TR)<input name="titleTr" required style={inputStyle} /></label>
          <label>Başlık (EN)<input name="titleEn" required style={inputStyle} /></label>
          <label>Slug (TR, boşsa başlıktan oluşturulur)<input name="slugTr" placeholder="ornek-haber" style={inputStyle} /></label>
          <label>Slug (EN, boşsa başlıktan oluşturulur)<input name="slugEn" placeholder="sample-news" style={inputStyle} /></label>
          <label>İçerik (TR)<textarea name="bodyTr" rows={8} style={inputStyle} /></label>
          <label>İçerik (EN)<textarea name="bodyEn" rows={8} style={inputStyle} /></label>
          <label>Durum
            <select name="active" defaultValue="1" style={inputStyle}>
              <option value="1">Aktif</option>
              <option value="0">Pasif</option>
            </select>
          </label>
          <button type="submit" style={buttonStyle}>Haber ekle</button>
        </form>
      </section>

      <h2>Mevcut haberler ({haberler.length})</h2>
      {haberler.length === 0 ? (
        <p>Henüz haber eklenmemiş.</p>
      ) : (
        <div style={{ display: "grid", gap: 16 }}>
          {haberler.map((haber) => (
            <section key={haber.id} style={cardStyle}>
              <form action={guncelle} style={formStyle}>
                <input type="hidden" name="id" value={haber.id} />
                <label>Başlık (TR)<input name="titleTr" required defaultValue={haber.titleTr} style={inputStyle} /></label>
                <label>Başlık (EN)<input name="titleEn" required defaultValue={haber.titleEn} style={inputStyle} /></label>
                <label>Slug (TR)<input name="slugTr" defaultValue={haber.slugTr} style={inputStyle} /></label>
                <label>Slug (EN)<input name="slugEn" defaultValue={haber.slugEn} style={inputStyle} /></label>
                <label>İçerik (TR)<textarea name="bodyTr" rows={8} defaultValue={haber.bodyTr} style={inputStyle} /></label>
                <label>İçerik (EN)<textarea name="bodyEn" rows={8} defaultValue={haber.bodyEn} style={inputStyle} /></label>
                <label>Durum
                  <select name="active" defaultValue={haber.active ? "1" : "0"} style={inputStyle}>
                    <option value="1">Aktif</option>
                    <option value="0">Pasif</option>
                  </select>
                </label>
                <button type="submit" style={buttonStyle}>Değişiklikleri kaydet</button>
              </form>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}

const cardStyle = {
  padding: 18,
  border: "1px solid #ddd",
  borderRadius: 14,
  margin: "20px 0",
};

const formStyle = {
  display: "grid",
  gap: 12,
};

const inputStyle = {
  display: "block",
  width: "100%",
  boxSizing: "border-box" as const,
  padding: 9,
  marginTop: 4,
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
