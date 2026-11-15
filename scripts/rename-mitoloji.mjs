import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
const isimler = ["Zeus","Apollo","Ares","Artemis","Athena","Hera","Poseidon","Hermes","Afrodit","Demeter","Hades","Hestia","Dionysos","Hephaistos","Perseus","Herakles","Odysseus","Achilles","Hektor","Paris","Helen","Agamemnon","Menelaos","Ajax","Diomedes","Patroklos","Nestor","Theseus","Minos","Ikarus","Daidalus","Orpheus","Persephone","Demeter","Gaia","Uranos","Kronos","Rhea","Prometheus","Epimetheus","Atlas","Helios","Selene","Eos","Nyx","Erebus","Hypnos","Thanatos","Morpheus","Pan","Narcissus","Echo","Medusa","Pegasus","Chimera","Hydra","Cerberus","Minotor","Sfenks","Griffon","Phoenix","Siren","Kentaur","Faun","Satyr","Nymph","Dryad","Oread","Nereid","Triton","Okeanos","Tethys","Hyperion","Theia","Koios","Krios","Iapetos","Mnemosyne","Phoebe","Themis","Loki","Odin","Thor","Freya","Balder","Tyr","Heimdall","Frigg","Vidar","Bragi","Idun","Sif","Njord","Skadi","Ullr","Mimir","Fenrir","Jormungandr","Valkyrie","Atlas","Orion","Andromeda","Kassiopeia","Perseus","Elektra","Antigone","Oedipus"];
function slugla(s){ return s.toLowerCase().replaceAll("ı","i").replaceAll("ş","s").replaceAll("ğ","g").replaceAll("ü","u").replaceAll("ö","o").replaceAll("ç","c").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,""); }
const urunler = await db.product.findMany({ orderBy:{ createdAt:"asc" } });
let i=0;
for(const u of urunler){
  const ad = isimler[i % isimler.length] + (i >= isimler.length ? " "+(Math.floor(i/isimler.length)+1) : "");
  const slug = slugla(ad)+"-"+u.id.slice(-4).toLowerCase();
  await db.product.update({ where:{id:u.id}, data:{ titleTr:ad, titleEn:ad, slugTr:slug, slugEn:slug } });
  console.log(ad);
  i++;
}
console.log("toplam:"+urunler.length);
await db.$disconnect();
