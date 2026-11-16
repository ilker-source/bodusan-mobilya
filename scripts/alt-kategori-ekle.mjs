import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
function slugla(s){ return s.toLocaleLowerCase('tr').replaceAll('ı','i').replaceAll('ş','s').replaceAll('ğ','g').replaceAll('ü','u').replaceAll('ö','o').replaceAll('ç','c').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,''); }
const yapi = {
"Ofis Mobilyaları": ["Makam Takımları","Yönetici Takımları","Personel Masaları","Toplantı Masaları","Workstationlar","Dolaplar"],
"Ofis Koltukları": ["Makam Koltukları","Yönetici Koltukları","Personel Koltukları","Bekleme Koltukları","Tabureler","Cafe-Bar-Restorant Koltukları","Konferans-Sinema Koltukları","Kanepeler"],
"Eğitim Mobilyaları": ["Kütüphaneler","Öğrenci Sıraları","Anfi Sıralar"],
"Metal Mobilyalar": ["Öğretmen Dolapları","Hasta Revir Ekipmanları","Ranzalar","Proje Dolapları","Korteksler","Soyunma Dolapları","Dosya Dolapları"],
"Aksesuarlar": ["Çöp Kutuları","Küllükler","Portmantolar"],
"Kompakt Arşiv Sistemleri": ["Kompakt Arşiv Dolapları"]
};
for(const [ana, altlar] of Object.entries(yapi)){
  let parent = await db.category.findFirst({where:{titleTr:ana}});
  if(!parent){ parent = await db.category.create({data:{key:slugla(ana),titleTr:ana,titleEn:ana,slugTr:slugla(ana),slugEn:slugla(ana)+'-en'}}); console.log('ana eklendi: '+ana); }
  let i=1;
  for(const alt of altlar){
    const key = slugla(ana)+'-'+slugla(alt);
    const varmi = await db.category.findFirst({where:{key}});
    if(!varmi){ await db.category.create({data:{key,titleTr:alt,titleEn:alt,slugTr:key,slugEn:key+'-en',parentId:parent.id,order:i}}); console.log(' alt: '+alt); }
    i++;
  }
}
await db.$disconnect();
