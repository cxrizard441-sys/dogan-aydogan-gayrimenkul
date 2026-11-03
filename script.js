
const SUPABASE_URL = "https://wnululhsotwjfwhrtzwj.supabase.co";
const SUPABASE_KEY = "sb_publishable_epHhCf6NdasScFDBIcSaOg_TKOjjjkO";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

document.getElementById("year").textContent =
  new Date().getFullYear();

async function loadProperties() {
  const grid = document.getElementById("listingGrid");

  if (!grid) return;

  const { data, error } = await supabaseClient
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("İlanlar yüklenemedi:", error.message);
    return;
  }

  if (!data || data.length === 0) {
    grid.innerHTML = `
      <article class="empty-state">
        <span>DA</span>
        <h3>Henüz ilan bulunmuyor.</h3>
        <p>Yeni ilanlarımız çok yakında burada.</p>
      </article>
    `;
    return;
  }

  grid.innerHTML = data.map(property => `
    <article class="property-card">
      <h3>${escapeHTML(property.title || "")}</h3>
      <p>${escapeHTML(property.description || "")}</p>
    </article>
  `).join("");
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
