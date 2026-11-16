import Link from "next/link";
export default function Uretim({params:{locale}}:{params:{locale:string}}){
const en=locale==='en';
const adres="Sırrıpaşa, Vatan Cd. No:137, 41900 Derince/Kocaeli";
return (<div style={{padding:20,maxWidth:1000}}>
<h1 style={{background:"#24466E",color:"#fff",padding:16,borderRadius:16}}>{en?"Factory":"Uretim Tesisi"}</h1>
{en?(<p>Our factory in Derince, Kocaeli works on 4500 m2 closed area with state-of-the-art machines.</p>):(<p>Kocaeli Derince fabrika 4500 m2 kapali alanda son teknoloji makineler ile calisiyor.</p>)}
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:12,marginTop:12}}>
<div style={{border:"1px solid #ccc",borderRadius:12,padding:16}}><b>{en?"CNC cutting and edge banding":"CNC kesim ve kenar bantlama"}</b></div>
<div style={{border:"1px solid #ccc",borderRadius:12,padding:16}}><b>{en?"Metal works and paint shop":"Metal isleri ve boyahane"}</b></div>
<div style={{border:"1px solid #ccc",borderRadius:12,padding:16}}><b>{en?"Assembly and quality control":"Montaj ve kalite kontrol"}</b></div>
</div>
<div style={{marginTop:16,border:"1px solid #ccc",borderRadius:16,padding:16}}><b>{en?"Production Advantage Next to the Port":"Liman Yaninda Uretim Avantaji"}</b>{en?(<p>Our factory in Derince, Kocaeli is only minutes away from Derince Port. This proximity gives speed and cost advantage for domestic distribution and export projects. Office, educational and hospital furniture moves quickly to container and truck shipment. In the heart of Istanbul Gebze Dilovasi Gulf zone we secure fast supply and smooth planning. With highway, D-100 and railway we deliver to Ankara, Bursa, Izmir and all cities. Port proximity reduces deadline risk in bulk tenders and chain projects. Turkiye strategic position between Europe, Middle East, Africa and Central Asia makes Bodusan a natural export base. Access to Ambarli, Haydarpasa and Gulf ports gives sea freight flexibility, road reaches Balkan and southern markets fast. Kocaeli side industry ensures continuity in metal, panel, fabric supply. Even custom sizes get short lead times, from sample to mass production fast. For B2B this lowers stock cost and protects schedules. Produce in Derince, ship everywhere. Since 1990 Bodusan grows with this advantage.</p>):(<p>Kocaeli Derince fabrika Derince Limanina birkac dakika mesafede. Bu yakinlik yurt ici dagitim ve ihracat projelerinde hiz ve maliyet avantaji saglar. Ofis, egitim ve hastane mobilyalari hizla konteyner ve tir sevkiyatina aktarilir. Istanbul Gebze Dilovasi Korfez havzasinin ortasinda hizli tedarik ve rahat planlama saglanir. Otoyol, D-100 ve demiryolu ile Ankara, Bursa, Izmir ve tum illere duzenli sevkiyat yapilir. Liman yakinligi toplu ihalelerde termin riskini dusurur, montaj ekipleri sahaya erken ulasir. Turkiye Avrupa, Orta Dogu, Afrika ve Orta Asya arasinda stratejik konumda, Bodusan icin dogal ihracat ussu olur. Ambarli, Haydarpasa ve Korfez limanlarina erisim deniz tasimada esneklik saglar, karayolu ile Balkan ve guney pazarlarina hizli ulasim mumkundur. Kocaeli yan sanayisi metal, panel, kumas tedarikinde sureklilik saglar. Ozel olculerde bile kisa teslim suresi verilir, numuneden seri uretime hizla gecilir. B2B musterilerde stok maliyeti duser, proje takvimi korunur. Derince uretip her yere gondermek lojistik ve uretim gucu demektir. Bodusan 1990 beri bu avantajla buyur.</p>)}</div>
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
