
const SUPABASE_URL = "https://wnululhsotwjfwhrtzwj.supabase.co";
const SUPABASE_KEY = "sb_publishable_epHhCf6NdasScFDBIcSaOg_TKOjjjkO";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

async function loadProperties() {
  const grid = document.getElementById("listingGrid");
  if (!grid) return;

  grid.innerHTML = "<p>İlanlar yükleniyor...</p>";

  const { data, error } = await supabaseClient
    .from("properties")
    .select("id, title, description, price, location, property_type");

  if (error) {
    console.error("Supabase hatası:", error.message);
    grid.innerHTML = `
      <p>İlanlar şu anda yüklenemedi.
      Lütfen daha sonra tekrar deneyin.</p>`;
    return;
  }

  if (!data || data.length === 0) {
    grid.innerHTML = `
      <article class="empty-state">
        <span>DA</span>
        <h3>Yeni ilanlarımız hazırlanıyor.</h3>
        <p>Size en uygun gayrimenkulü bulmak için
        bizimle iletişime geçin.</p>
      </article>`;
    return;
  }

  grid.innerHTML = data.map(property => {
    const title = escapeHTML(property.title || "Gayrimenkul");
    const description = escapeHTML(property.description || "");
    const location = escapeHTML(property.location || "");
    const type = escapeHTML(property.property_type || "Gayrimenkul");

    const price = property.price
      ? Number(property.price).toLocaleString("tr-TR") + " ₺"
      : "Fiyat için iletişime geçiniz";

    const message = encodeURIComponent(
      `Merhaba, ${title} hakkında bilgi almak istiyorum.`
    );

    return `
      <article class="property-card">
        <div class="property-card-content">
          <span class="property-type">${type}</span>
          <h3>${title}</h3>
          <p class="property-location">${location}</p>
          <p class="property-description">${description}</p>
          <div class="property-card-bottom">
            <strong>${price}</strong>
            <a
              href="https://wa.me/905321202199?text=${message}"
              target="_blank"
              rel="noopener noreferrer">
              Bilgi Al →
            </a>
          </div>
        </div>
      </article>`;
  }).join("");
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

loadProperties();
