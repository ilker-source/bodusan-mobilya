"use client";
import Link from "next/link";
import { useState } from "react";
export default function Menu({locale, en}:{locale:string; en:boolean}) {
  const [acik, setAcik] = useState(false);
  return (<nav style={{display:"flex",padding:"14px 20px",background:"#24466E",color:"#fff",alignItems:"center",borderRadius:16,position:"relative"}}>
  <Link href={`/${locale}`} style={{color:"#fff"}}><b>Bodusan</b></Link>
  <div className="desktop-links" style={{display:"flex",gap:12,marginLeft:16,alignItems:"center"}}>
  <Link href={`/${locale}/kurumsal`} style={{color:"#fff"}}>{en?"Corporate":"Kurumsal"}</Link>
  <Link href={`/${locale}/urunler`} style={{color:"#fff"}}>{en?"Products":"Urunler"}</Link>
  <Link href={`/${locale}/projeler`} style={{color:"#fff"}}>{en?"Projects":"Projeler"}</Link>
  <Link href={`/${locale}/uretim`} style={{color:"#fff"}}>{en?"Factory":"Uretim"}</Link>
  <Link href={`/${locale}/haberler`} style={{color:"#fff"}}>{en?"News":"Haberler"}</Link>
  <Link href={`/${locale}/iletisim`} style={{color:"#fff"}}>{en?"Contact":"Iletisim"}</Link>
  <Link href={`/${locale}/teklif-al`} style={{background:"#A67C52",color:"#fff",padding:"8px 16px",borderRadius:20}}>{en?"Get a Quote":"Teklif Al"}</Link>
  </div>
  <span className="desktop-links" style={{marginLeft:"auto"}}><Link href="/tr" style={{color:"#fff"}}>TR</Link> | <Link href="/en" style={{color:"#fff"}}>EN</Link></span>
  <button className="mobil-btn" onClick={()=>setAcik(!acik)} style={{display:"none",background:"#fff",color:"#24466E",border:"none",borderRadius:10,padding:"8px 12px",fontSize:18,marginLeft:"auto"}}>☰</button>
  {acik && <div onClick={()=>setAcik(false)} style={{position:"absolute",top:"100%",left:0,background:"#fff",borderRadius:12,boxShadow:"0 8px 24px rgba(0,0,0,0.2)",padding:12,display:"flex",flexDirection:"column",gap:10,minWidth:200,zIndex:50}}>
  <Link href={`/${locale}/kurumsal`} style={{color:"#24466E"}}>{en?"Corporate":"Kurumsal"}</Link>
  <Link href={`/${locale}/urunler`} style={{color:"#24466E"}}>{en?"Products":"Urunler"}</Link>
  <Link href={`/${locale}/projeler`} style={{color:"#24466E"}}>{en?"Projects":"Projeler"}</Link>
  <Link href={`/${locale}/uretim`} style={{color:"#24466E"}}>{en?"Factory":"Uretim"}</Link>
  <Link href={`/${locale}/haberler`} style={{color:"#24466E"}}>{en?"News":"Haberler"}</Link>
  <Link href={`/${locale}/iletisim`} style={{color:"#24466E"}}>{en?"Contact":"Iletisim"}</Link>
  <Link href={`/${locale}/teklif-al`} style={{background:"#A67C52",color:"#fff",padding:"8px 16px",borderRadius:20,textAlign:"center"}}>{en?"Get a Quote":"Teklif Al"}</Link>
  </div>}
  <style>{`@media(max-width:640px){.desktop-links{display:none !important;}.mobil-btn{display:block !important;}}`}</style>
  </nav>);
}
