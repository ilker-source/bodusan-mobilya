import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default async function ProjelerPage({
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

    await db.project.create({
      data: {
        titleTr: String(formData.get("titleTr") || "").trim(),
        titleEn: String(formData.get("titleEn") || "").trim(),
        descTr: String(formData.get("descTr") || "").trim(),
        descEn: String(formData.get("descEn") || "").trim(),
        imageUrl: String(formData.get("imageUrl") || "").trim(),
        active: formData.get("active") === "1",
      },
    });

    revalidatePath("/admin/projeler");
    revalidatePath("/tr/projeler");
    revalidatePath("/en/projeler");
    redirect("/admin/projeler?durum=eklendi");
  }

  async function guncelle(formData: FormData) {
    "use server";
    const session = await getServerSession(authOptions);
    if (!session) redirect("/admin/giris");

    const id = String(formData.get("id") || "");
    if (!id) redirect("/admin/projeler?durum=hata");

    await db.project.update({
      where: { id },
      data: {
        titleTr: String(formData.get("titleTr") || "").trim(),
        titleEn: String(formData.get("titleEn") || "").trim(),
        descTr: String(formData.get("descTr") || "").trim(),
        descEn: String(formData.get("descEn") || "").trim(),
        imageUrl: String(formData.get("imageUrl") || "").trim(),
        active: formData.get("active") === "1",
      },
    });

    revalidatePath("/admin/projeler");
    revalidatePath("/tr/projeler");
    revalidatePath("/en/projeler");
    redirect("/admin/projeler?durum=guncellendi");
  }

  const projeler = await db.project.findMany({
    orderBy: [{ active: "desc" }, { titleTr: "asc" }],
  });

  const mesajlar: Record<string, string> = {
    eklendi: "Proje/Referans kaydı eklendi.",
    guncellendi: "Proje/Referans kaydı güncellendi.",
    hata: "Kayıt güncellenemedi; proje kimliği bulunamadı.",
  };

  return (
    <main style={{ maxWidth: 900, margin: "32px auto", padding: 20 }}>
      <h1>Projeler / Referanslar</h1>
      <p><Link href="/admin">Admin ana sayfasına dön</Link></p>

      {searchParams?.durum && mesajlar[searchParams.durum] && (
        <p role="status" style={messageStyle}>{mesajlar[searchParams.durum]}</p>
      )}

      <section style={cardStyle}>
        <h2>Yeni proje ekle</h2>
        <form action={olustur} style={formStyle}>
          <label>Başlık (TR)<input name="titleTr" required style={inputStyle} /></label>
          <label>Başlık (EN)<input name="titleEn" required style={inputStyle} /></label>
          <label>Açıklama (TR)<textarea name="descTr" rows={5} style={inputStyle} /></label>
          <label>Açıklama (EN)<textarea name="descEn" rows={5} style={inputStyle} /></label>
          <label>Görsel yolu<input name="imageUrl" placeholder="/projects/ornek.jpg" style={inputStyle} /></label>
          <label>Durum
            <select name="active" defaultValue="1" style={inputStyle}>
              <option value="1">Aktif</option>
              <option value="0">Pasif</option>
            </select>
          </label>
          <button type="submit" style={buttonStyle}>Proje ekle</button>
        </form>
      </section>

      <h2>Mevcut kayıtlar ({projeler.length})</h2>
      {projeler.length === 0 ? (
        <p>Henüz proje veya referans kaydı yok.</p>
      ) : (
        <div style={{ display: "grid", gap: 16 }}>
          {projeler.map((project) => (
            <section key={project.id} style={cardStyle}>
              <form action={guncelle} style={formStyle}>
                <input type="hidden" name="id" value={project.id} />
                <label>Başlık (TR)<input name="titleTr" required defaultValue={project.titleTr} style={inputStyle} /></label>
                <label>Başlık (EN)<input name="titleEn" required defaultValue={project.titleEn} style={inputStyle} /></label>
                <label>Açıklama (TR)<textarea name="descTr" rows={5} defaultValue={project.descTr} style={inputStyle} /></label>
                <label>Açıklama (EN)<textarea name="descEn" rows={5} defaultValue={project.descEn} style={inputStyle} /></label>
                <label>Görsel yolu<input name="imageUrl" defaultValue={project.imageUrl} style={inputStyle} /></label>
                <label>Durum
                  <select name="active" defaultValue={project.active ? "1" : "0"} style={inputStyle}>
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
