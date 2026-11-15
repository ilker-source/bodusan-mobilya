import fs from "fs"; import path from "path";
function temiz(s){ return s.toLowerCase().replaceAll("ı","i").replaceAll("ş","s").replaceAll("ğ","g").replaceAll("ü","u").replaceAll("ö","o").replaceAll("ç","c").replaceAll("İ","i").replace(/[^a-z0-9.\-]+/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,""); }
function tara(dir){ for(const f of fs.readdirSync(dir,{withFileTypes:true})){ const p=path.join(dir,f.name); if(f.isDirectory()){ tara(p); } else { const t=temiz(f.name); if(t!==f.name){ fs.renameSync(p, path.join(dir,t)); console.log(f.name+" -> "+t); } } } }
tara("public/products/ofis"); tara("public/products/egitim"); tara("public/products/hastane");
console.log("bitti");
