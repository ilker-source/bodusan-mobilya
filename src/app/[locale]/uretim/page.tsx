import Link from "next/link";
export default function Uretim({params:{locale}}:{params:{locale:string}}){
const en=locale==='en';
const adres="Sırrıpaşa, Vatan Cd. No:137, 41900 Derince/Kocaeli";
return (<div style={{padding:20,maxWidth:1000}}>
<h1 style={{background:"#24466E",color:"#fff",padding:16,borderRadius:16}}>{en?"Factory":"Uretim Tesisi"}</h1>
{en?(<p>Our factory in Derince, Kocaeli works on 4500 m2 closed area with state-of-the-art machines.</p>):(<p>Kocaeli Derince&apos;deki fabrikamiz 4500 m2 kapali alanda son teknoloji makineler ile calismaktadir.</p>)}
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:12,marginTop:12}}>
<div style={{border:"1px solid #ccc",borderRadius:12,padding:16}}><b>{en?"CNC cutting and edge banding":"CNC kesim ve kenar bantlama"}</b></div>
<div style={{border:"1px solid #ccc",borderRadius:12,padding:16}}><b>{en?"Metal works and paint shop":"Metal isleri ve boyahane"}</b></div>
<div style={{border:"1px solid #ccc",borderRadius:12,padding:16}}><b>{en?"Assembly and quality control":"Montaj ve kalite kontrol"}</b></div>
</div>
<div style={{marginTop:16,border:"1px solid #ccc",borderRadius:16,padding:16}}>
<b>{en?"Factory Address":"Fabrika Adresi"}</b>
<p>{adres}</p>
<div style={{borderRadius:12,overflow:"hidden",marginTop:8}}>
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.805238142622!2d29.81616349999999!3d40.76630819999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cb4782f4ed0383%3A0x68c7107bc40ba6dd!2zQk9Ew5xTQU4gTU9CxLBMWUE!5e0!3m2!1sen!2str!4v1794838487610!5m2!1sen!2str" width="100%" height="380" style={{border:0}} loading="lazy"></iframe>
</div>
<p style={{marginTop:8}}><a href="https://www.google.com/maps/search/?api=1&query=Bodusan+Mobilya+Vatan+Cd+137+Derince+Kocaeli" target="_blank">{en?"Get Directions":"Yol Tarifi Al"}</a></p>
</div>
<p style={{marginTop:16}}><Link href={`/${locale}/projeler`}>{en?"References":"Referanslar"}</Link> | <Link href={`/${locale}/teklif-al`}>{en?"Get a Quote":"Teklif Al"}</Link></p>
</div>);}
