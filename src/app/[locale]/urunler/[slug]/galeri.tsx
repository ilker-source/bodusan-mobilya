"use client";
import { useState } from "react";
import Image from "next/image";
export default function Galeri({imgs, ad}:{imgs:string[]; ad:string}){
  const [i,setI] = useState(0);
  if(!imgs.length) return null;
  return (<div><Image src={imgs[i]} alt={ad} width={800} height={600} style={{width:"100%",maxWidth:600,height:"auto",objectFit:"cover",borderRadius:16}} priority />
  <div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"}}>{imgs.slice(0,12).map((s,n)=>(<button key={n} onClick={()=>setI(n)} style={{border:i===n?"2px solid #24466E":"1px solid #ccc",borderRadius:12,padding:2}}><Image src={s} alt={ad} width={120} height={90} style={{width:90,height:65,objectFit:"cover",borderRadius:8}} /></button>))}</div></div>);
}
