# Doğan Aydoğan Gayrimenkul — web sitesi

Mobil uyumlu, statik HTML/CSS/JavaScript web sitesi. Vercel üzerinde framework seçmeden dağıtılabilir.

## GitHub'a yükleme (iPhone)
1. ZIP'i Dosyalar uygulamasında açın.
2. GitHub deposunda **Add file → Upload files** seçin.
3. ZIP'in içindeki dosyaları ve klasörleri (ZIP dosyasının kendisini değil) yükleme alanına seçin.
4. **Commit changes** ile kaydedin.

## Vercel dağıtımı
1. Vercel → **Add New → Project**.
2. GitHub deposu `dogan-aydogan-gayrimenkul` için **Import**.
3. Framework Preset: **Other**; Build Command boş; Output Directory `.` (veya boş) bırakın.
4. **Deploy**.

## Yayına almadan önce düzenlenecekler
- `script.js` içinde `SITE_WHATSAPP` değerini gerçek ofis numarasıyla değiştirin (ülke kodu dahil, `+` olmadan).
- `index.html` içindeki e-posta adresini gerçek adresle doğrulayın.
- Örnek ilanları gerçek ilanlar, fiyatlar, oda sayısı, metrekare ve fotoğraflarla değiştirin. Şu an örnek portföy yalnızca tasarım önizlemesidir.
- Görseller şu an uzaktaki Unsplash görselleridir; gerçek mülk fotoğraflarıyla değiştirilmesi önerilir.

## Dosyalar
- `index.html` — sayfa içeriği
- `styles.css` — tasarım ve mobil uyumluluk
- `script.js` — örnek portföy, filtreleme, WhatsApp ayarı
