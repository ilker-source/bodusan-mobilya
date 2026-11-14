"use client";
export const dynamic = "force-dynamic";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Giris() {
  const [email, setEmail] = useState("admin@bodusan.com");
  const [password, setPassword] = useState("");
  const [hata, setHata] = useState("");
  const router = useRouter();
  async function giris(e: React.FormEvent) {
    e.preventDefault();
    setHata("");
    const res = await signIn("credentials", { email, password, redirect: false });
    if (res?.ok) router.push("/admin");
    else setHata("E-posta veya şifre hatalı");
  }
  return (
    <div style={{maxWidth: 360, margin: "80px auto"}}>
      <h1>Bodüsan Admin Giriş</h1>
      <form onSubmit={giris}>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="E-posta" style={{display:"block",width:"100%",margin:"8px 0",padding:8}} />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Şifre" style={{display:"block",width:"100%",margin:"8px 0",padding:8}} />
        <button type="submit" style={{padding: "8px 16px"}}>Giriş Yap</button>
      </form>
      {hata && <p>{hata}</p>}
    </div>
  );
}
