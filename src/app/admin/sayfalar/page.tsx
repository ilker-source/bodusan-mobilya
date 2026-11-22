import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default async function SayfalarPage({
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

    const slugTr = String(formData.get("slugTr") || "").trim();
    const slugEn = String(formData.get("slugEn") || "").trim();
    const titleTr = String(formData.get("titleTr") || "").trim();
    const titleEn = String(formData.get("titleEn") || "").trim();
    const bodyTr = String(formData.get("bodyTr") || "").trim();
    const bodyEn = String(formData.get("bodyEn") || "").trim();

    if (!slugTr || !slugEn || !titleTr || !titleEn) {
      redirect("/admin/sayfalar?durum=eksik");
    }

    try {
      await db.page.create({
        data: { slugTr, slugEn, titleTr, titleEn, bodyTr, bodyEn },
      });
    } catch {
      redirect("/admin/sayfalar?durum=slug");
    }

    revalidatePath("/admin/sayfalar");
    redirect("/admin/sayfalar?durum=eklendi");
  }

  async function guncelle(formData: FormData) {
    "use server";
    const session = await getServerSession(authOptions);
    if (!session) redirect("/admin/giris");

    const id = String(formData.get("id") || "");
    const slugTr = String(formData.get("slugTr") || "").trim();
    const slugEn = String(formData.get("slugEn") || "").trim();
    const titleTr = String(formData.get("titleTr") || "").trim();
    const titleEn = String(formData.get("titleEn") || "").trim();
    const bodyTr = String(formData.get("bodyTr") || "").trim();
    const bodyEn = String(formData.get("bodyEn") || "").trim();

    if (!id || !slugTr || !slugEn || !titleTr || !titleEn) {
      redirect("/admin/sayfalar?durum=eksik");
    }

    try {
      await db.page.update({
        where: { id },
        data: { slugTr, slugEn, titleTr, titleEn, bodyTr, bodyEn },
      });
    } catch {
      redirect("/admin/sayfalar?durum=slug");
    }

    revalidatePath("/admin/sayfalar");
    redirect("/admin/sayfalar?durum=guncellendi");
  }

  const sayfalar = await db.page.findMany({ orderBy: { titleTr: "asc" } });
  const durumMesajlari: Record<string, string> = {
    eklendi: "Sayfa içeriği eklendi.",
    guncellendi: "Sayfa içeriği güncellendi.",
    eksik: "Türkçe ve İngilizce slug ile başlık alanları zorunludur.",
    slug: "Kayıt yapılamadı. Slug başka bir sayfada kullanılıyor olabilir.",
  };

  return (
    <main style={{ maxWidth: 900, margin: "32px auto", padding: 20 }}>
      <h1>Sayfa İçerikleri</h1>
      <p><Link href="/admin">Admin ana sayfasına dön</Link></p>

      {searchParams?.durum && durumMesajlari[searchParams.durum] && (
        <p role="status" style={mesajStyle}>{durumMesajlari[searchParams.durum]}</p>
      )}

      <section style={kartStyle}>
        <h2>Yeni sayfa içeriği ekle</h2>
        <form action={olustur} style={formStyle}>
          <label>Türkçe slug<input name="slugTr" required placeholder="kurumsal" style={alanStyle} /></label>
          <label>İngilizce slug<input name="slugEn" required placeholder="corporate" style={alanStyle} /></label>
          <label>Türkçe başlık<input name="titleTr" required style={alanStyle} /></label>
          <label>İngilizce başlık<input name="titleEn" required style={alanStyle} /></label>
          <label>Türkçe içerik<textarea name="bodyTr" rows={8} style={alanStyle} /></label>
          <label>İngilizce içerik<textarea name="bodyEn" rows={8} style={alanStyle} /></label>
          <button type="submit" style={butonStyle}>Sayfa ekle</button>
        </form>
      </section>

      <h2>Mevcut sayfalar ({sayfalar.length})</h2>
      {sayfalar.length === 0 ? (
        <p>Henüz sayfa içeriği eklenmemiş.</p>
      ) : (
        <div style={{ display: "grid", gap: 16 }}>
          {sayfalar.map((sayfa) => (
            <section key={sayfa.id} style={kartStyle}>
              <form action={guncelle} style={formStyle}>
                <input type="hidden" name="id" value={sayfa.id} />
                <label>Türkçe slug<input name="slugTr" required defaultValue={sayfa.slugTr} style={alanStyle} /></label>
                <label>İngilizce slug<input name="slugEn" required defaultValue={sayfa.slugEn} style={alanStyle} /></label>
                <label>Türkçe başlık<input name="titleTr" required defaultValue={sayfa.titleTr} style={alanStyle} /></label>
                <label>İngilizce başlık<input name="titleEn" required defaultValue={sayfa.titleEn} style={alanStyle} /></label>
                <label>Türkçe içerik<textarea name="bodyTr" rows={8} defaultValue={sayfa.bodyTr} style={alanStyle} /></label>
                <label>İngilizce içerik<textarea name="bodyEn" rows={8} defaultValue={sayfa.bodyEn} style={alanStyle} /></label>
                <button type="submit" style={butonStyle}>Değişiklikleri kaydet</button>
              </form>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}

const kartStyle = {
  padding: 18,
  border: "1px solid #ddd",
  borderRadius: 14,
  margin: "20px 0",
};

const formStyle = {
  display: "grid",
  gap: 12,
};

const alanStyle = {
  display: "block",
  width: "100%",
  boxSizing: "border-box" as const,
  padding: 9,
  marginTop: 4,
  border: "1px solid #bbb",
  borderRadius: 8,
};

const butonStyle = {
  width: "fit-content",
  padding: "10px 16px",
  border: 0,
  borderRadius: 9,
  background: "#24466E",
  color: "#fff",
  cursor: "pointer",
};

const mesajStyle = {
  padding: 12,
  borderRadius: 10,
  background: "#eef3f8",
};
