// Site settings: WhatsApp number must be entered in international format without + or spaces.
const SITE_WHATSAPP = "905XXXXXXXXX"; // Replace with the office's real number.
const listings = [
  {id:1,type:"Satılık",category:"Konut",title:"Modern yaşam için ferah daire",location:"Mardin",price:"Fiyat için iletişime geçin",beds:"3+1",area:"— m²",image:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80"},
  {id:2,type:"Satılık",category:"Arsa",title:"Geleceğe değer katacak arsa",location:"Kızıltepe, Mardin",price:"Fiyat için iletişime geçin",beds:"—",area:"— m²",image:"https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80"},
  {id:3,type:"Kiralık",category:"İş yeri",title:"İşiniz için doğru konum",location:"Mardin",price:"Fiyat için iletişime geçin",beds:"—",area:"— m²",image:"https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=80"}
];
const grid=document.getElementById("listingGrid");
function renderListings(items){
  grid.innerHTML="";
  if(!items.length){grid.innerHTML='<p>Aramanıza uygun ilan bulunamadı. <a href="#iletisim">Bize ulaşın →</a></p>';return;}
  items.forEach(item=>{
    const card=document.createElement("article");card.className="listing-card";
    card.innerHTML=`<div class="listing-image" style="background-image:url('${item.image}')"><span class="listing-badge">${item.type.toLocaleUpperCase("tr-TR")}</span><span class="listing-favorite" aria-hidden="true">◇</span></div>
    <div class="listing-info"><div class="listing-meta"><span>${item.category}</span><span>${item.location}</span></div><h3>${item.title}</h3><p>${item.location}</p><div class="listing-bottom"><strong class="listing-price">${item.price}</strong><span class="listing-details">${item.beds} &nbsp;·&nbsp; ${item.area}</span></div><a class="listing-link" href="#iletisim">İlan hakkında bilgi alın ↗</a></div>`;
    grid.appendChild(card);
  });
}
function filterListings(){
  const type=document.getElementById("typeFilter").value;
  const category=document.getElementById("categoryFilter").value;
  const location=document.getElementById("locationFilter").value.trim().toLocaleLowerCase("tr-TR");
  renderListings(listings.filter(x=>(type==="all"||x.type===type)&&(category==="all"||x.category===category)&&(!location||x.location.toLocaleLowerCase("tr-TR").includes(location))));
}
document.getElementById("searchBtn").addEventListener("click",()=>{filterListings();document.getElementById("portfoy").scrollIntoView({behavior:"smooth"});});
["typeFilter","categoryFilter"].forEach(id=>document.getElementById(id).addEventListener("change",filterListings));
document.getElementById("locationFilter").addEventListener("keydown",e=>{if(e.key==="Enter")filterListings();});
const wa=document.getElementById("whatsappLink");
if(!SITE_WHATSAPP.includes("X")) wa.href=`https://wa.me/${SITE_WHATSAPP}?text=${encodeURIComponent("Merhaba, gayrimenkul portföyünüz hakkında bilgi almak istiyorum.")}`;
else wa.href="#iletisim";
document.getElementById("year").textContent=new Date().getFullYear();
const toggle=document.getElementById("menuToggle"),nav=document.getElementById("nav");
toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");toggle.setAttribute("aria-expanded","false");}));
renderListings(listings);
