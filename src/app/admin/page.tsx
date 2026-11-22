import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
export default async function AdminHome(){const s=await getServerSession(authOptions);if(!s)redirect("/admin/giris");return (<div style={{maxWidth:600,margin:"40px auto"}}><h1>Bodusan Admin Panel</h1><ul><li><Link href="/admin/urunler">Urunler</Link></li><li><Link href="/admin/kategoriler">Kategoriler</Link></li><li><Link href="/admin/mesajlar">Gelen Kutusu</Link></li><li><Link href="/admin/slider">Slider Yönetimi</Link></li><li><Link href="/admin/sayfalar">Sayfa İçerikleri</Link></li><li><Link href="/admin/projeler">Projeler / Referanslar</Link></li><li><Link href="/admin/haberler">Haberler Yönetimi</Link></li></ul></div>);}
