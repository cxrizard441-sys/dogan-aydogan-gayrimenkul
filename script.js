// Doğan Aydoğan Gayrimenkul — site etkileşimleri
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));
document.getElementById('year').textContent = new Date().getFullYear();

// İlanlar Supabase veya yönetim paneline bağlandığında bu filtre gerçek kayıtları süzecek.
// Şimdilik kullanıcıya iletişim bölümünü gösteren güvenli bir demo davranışı vardır.
document.getElementById('searchForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const location = document.getElementById('location').value.trim();
  const grid = document.getElementById('listingGrid');
  grid.innerHTML = `
    <article class="empty-state">
      <span>DA</span>
      <h3>${location ? `${escapeHTML(location)} için` : 'Aramanız için'} portföyümüzü birlikte değerlendirelim.</h3>
      <p>Güncel ilanlar ve size özel fırsatlar için danışmanımızla iletişime geçin.</p>
      <a href="#iletisim">Danışmanımıza ulaşın ↗</a>
    </article>`;
});
function escapeHTML(value) {
  return value.replace(/[&<>"']/g, char => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
  }[char]));
}
