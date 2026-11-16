import Link from "next/link";
export default function Projeler({params:{locale}}:{params:{locale:string}}){
const en=locale==='en';
const gruplar = en ? [
{baslik:"Public Institutions", aciklama:"State tenders and DMO catalogue experience.", isler:["Reference list coming soon"]},
{baslik:"Education", aciklama:"Schools and educational equipment projects.", isler:["Reference list coming soon"]},
{baslik:"Healthcare", aciklama:"Hospitals and waiting areas.", isler:["Reference list coming soon"]},
{baslik:"B2B / Private Sector", aciklama:"Office and bulk production projects.", isler:["Reference list coming soon"]},
] : [
{baslik:"Kamu Kurumlari", aciklama:"Devlet ihaleleri ve DMO katalog tecrubesi.", isler:["Liste yarin eklenecek"]},
{baslik:"Egitim", aciklama:"Okullar ve egitim donatim projeleri.", isler:["Liste yarin eklenecek"]},
{baslik:"Saglik", aciklama:"Hastaneler ve bekleme alanlari.", isler:["Liste yarin eklenecek"]},
{baslik:"B2B / Ozel Sektor", aciklama:"Ofis ve toplu uretim projeleri.", isler:["Liste yarin eklenecek"]},
];
return (<div style={{padding:20,maxWidth:1000}}><h1>{en?"References":"Referanslarimiz"}</h1><p>{en?"References from public institutions and B2B projects across Turkiye. Since 1990.":"Turkiye genelinde kamu kurumlari ve B2B projelerden referanslarimiz. 1990'dan beri."}</p><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:12,marginTop:16}}>{gruplar.map((g)=>(<div key={g.baslik} style={{border:"1px solid #ccc",borderRadius:12,padding:16}}><b>{g.baslik}</b><p>{g.aciklama}</p><ul>{g.isler.map((i)=>(<li key={i}>{i}</li>))}</ul></div>))}</div><p style={{marginTop:16}}><Link href={`/${locale}/teklif-al`}>{en?"Get a Quote":"Teklif Al"}</Link> | <Link href={`/${locale}/iletisim`}>{en?"Contact":"Iletisim"}</Link></p></div>);}
