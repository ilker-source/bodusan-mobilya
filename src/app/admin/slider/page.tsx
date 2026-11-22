import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function SliderPage({
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
    const imageUrl = String(formData.get("imageUrl") || "").trim();
    const link = String(formData.get("link") || "").trim();
    const parsedOrder = Number.parseInt(String(formData.get("order") || "0"), 10);

    if (!titleTr || !titleEn || !imageUrl) redirect("/admin/slider?durum=eksik");
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      redirect("/admin/slider?durum=yerel-gorsel-yolu-kullan");
    }

    await db.slider.create({
      data: {
        titleTr,
        titleEn,
        imageUrl,
        link,
        order: Number.isFinite(parsedOrder) ? parsedOrder : 0,
        active: formData.get("active") === "1",
      },
    });

    revalidatePath("/admin/slider");
    redirect("/admin/slider?durum=eklendi");
  }

  async function guncelle(formData: FormData) {
    "use server";
    const session = await getServerSession(authOptions);
    if (!session) redirect("/admin/giris");

    const id = String(formData.get("id") || "");
    const titleTr = String(formData.get("titleTr") || "").trim();
    const titleEn = String(formData.get("titleEn") || "").trim();
    const imageUrl = String(formData.get("imageUrl") || "").trim();
    const link = String(formData.get("link") || "").trim();
    const parsedOrder = Number.parseInt(String(formData.get("order") || "0"), 10);

    if (!id || !titleTr || !titleEn || !imageUrl) redirect("/admin/slider?durum=eksik");
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      redirect("/admin/slider?durum=yerel-gorsel-yolu-kullan");
    }

    await db.slider.update({
      where: { id },
      data: {
        titleTr,
        titleEn,
        imageUrl,
        link,
        order: Number.isFinite(parsedOrder) ? parsedOrder : 0,
        active: formData.get("active") === "1",
      },
    });

    revalidatePath("/admin/slider");
    redirect("/admin/slider?durum=guncellendi");
  }

  const sliders = await db.slider.findMany({
    orderBy: [{ order: "asc" }, { titleTr: "asc" }],
  });

  const mesajlar: Record<string, string> = {
    eklendi: "Slider kaydı eklendi.",
    guncellendi: "Slider kaydı güncellendi.",
    eksik: "Türkçe başlık, İngilizce başlık ve görsel yolu zorunludur.",
    "yerel-gorsel-yolu-kullan": "Görsel için public içindeki yerel yolu yaz; örnek: /hero-fabrika.png",
  };

  return (
    <main style={{ maxWidth: 900, margin: "32px auto", padding: 20 }}>
      <h1>Slider Yönetimi</h1>
      <p><a href="/admin">Admin ana sayfasına dön</a></p>

      {searchParams?.durum && mesajlar[searchParams.durum] && (
        <p role="status" style={{ padding: 12, borderRadius: 10, background: "#eef3f8" }}>
          {mesajlar[searchParams.durum]}
        </p>
      )}

      <section style={{ padding: 18, border: "1px solid #ddd", borderRadius: 14, margin: "20px 0" }}>
        <h2>Yeni slider ekle</h2>
        <form action={olustur} style={{ display: "grid", gap: 10 }}>
          <label>Başlık (TR)<input name="titleTr" required style={inputStyle} /></label>
          <label>Başlık (EN)<input name="titleEn" required style={inputStyle} /></label>
          <label>Görsel yolu<input name="imageUrl" required placeholder="/hero-fabrika.png" style={inputStyle} /></label>
          <label>Bağlantı (isteğe bağlı)<input name="link" placeholder="/tr/urunler" style={inputStyle} /></label>
          <label>Sıra<input name="order" type="number" defaultValue="0" style={inputStyle} /></label>
          <label>Durum
            <select name="active" defaultValue="1" style={inputStyle}>
              <option value="1">Aktif</option>
              <option value="0">Pasif</option>
            </select>
          </label>
          <button type="submit" style={buttonStyle}>Slider ekle</button>
        </form>
      </section>

      <h2>Mevcut slider kayıtları ({sliders.length})</h2>
      {sliders.length === 0 ? (
        <p>Henüz slider kaydı yok.</p>
      ) : (
        <div style={{ display: "grid", gap: 16 }}>
          {sliders.map((item) => (
            <section key={item.id} style={{ padding: 18, border: "1px solid #ddd", borderRadius: 14 }}>
              <form action={guncelle} style={{ display: "grid", gap: 10 }}>
                <input type="hidden" name="id" value={item.id} />
                <label>Başlık (TR)<input name="titleTr" required defaultValue={item.titleTr} style={inputStyle} /></label>
                <label>Başlık (EN)<input name="titleEn" required defaultValue={item.titleEn} style={inputStyle} /></label>
                <label>Görsel yolu<input name="imageUrl" required defaultValue={item.imageUrl} style={inputStyle} /></label>
                <label>Bağlantı<input name="link" defaultValue={item.link} style={inputStyle} /></label>
                <label>Sıra<input name="order" type="number" defaultValue={item.order} style={inputStyle} /></label>
                <label>Durum
                  <select name="active" defaultValue={item.active ? "1" : "0"} style={inputStyle}>
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
