# 🌸 SUARA - Sistem Unggah Aspirasi Rakyat

Sebuah sistem aspirasi rakyat modern dengan tema anime/jejepangan yang menarik dan user-friendly.

![AnimeDesk](https://img.shields.io/badge/Theme-Anime%20Style-pink)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

## 📖 Tentang

SUARA adalah sistem aspirasi rakyat yang menggabungkan fungsionalitas yang powerful dengan desain anime yang menarik. Website ini dirancang untuk memudahkan masyarakat menyampaikan aspirasi, keluhan dan pengaduan kepada pihak berwenang dengan interface yang menyenangkan dan mudah digunakan.

## ✨ Fitur Utama

### 🎯 Core Features
- **Form Pengaduan Lengkap** - Form interaktif dengan validasi real-time
- **Pelacakan Status** - Lacak pengaduan dengan nomor tiket unik
- **Kategori Beragam** - Pilih kategori pengaduan yang sesuai
- **Upload Lampiran** - Lampirkan foto atau dokumen pendukung

### 🎨 Anime Theme Features
- **Desain Anime Modern** - Gradient colors dengan tema pink, purple, dan gold
- **Animasi Interaktif** - Floating sakura petals dan efek hover yang smooth
- **Typing Effect** - Hero title dengan animasi typing
- **Particle Effects** - Emoji anime yang jatuh secara periodik
- **Easter Egg** - Konami code untuk unlock secret mode!

### 📱 Responsive Design
- **Mobile Friendly** - Tampilan optimal di semua perangkat
- **Touch Optimized** - Interface yang mudah digunakan di smartphone
- **Smooth Scrolling** - Navigasi yang halus antar section

## 🚀 Cara Penggunaan

### 1. **Buat Pengaduan**
1. Scroll ke section "Buat Pengaduan"
2. Isi form dengan data lengkap:
   - Nama lengkap
   - Email aktif
   - Nomor telepon
   - Kategori pengaduan
   - Judul dan deskripsi detail
3. Upload lampiran jika diperlukan
4. Klik "Kirim Pengaduan"
5. Simpan nomor tiket yang diberikan

### 2. **Lacak Pengaduan**
1. Scroll ke section "Lacak Pengaduan"
2. Masukkan nomor tiket Anda
3. Klik "Lacak" untuk melihat status

### 3. **Hubungi Kami**
- Gunakan form kontak untuk pertanyaan umum
- Kontak langsung via info yang tersedia

## 🛠️ Teknologi

### Frontend
- **HTML5** - Semantic markup yang clean dan terstruktur
- **CSS3** - Modern CSS dengan animasi dan gradient effects
- **Vanilla JavaScript** - Pure JS tanpa dependencies
- **Responsive Design** - Mobile-first approach

### Features Implementation
- **LocalStorage** - Simpan data pengaduan (demo mode)
- **Form Validation** - Real-time validation dengan user feedback
- **Intersection Observer** - Scroll animations yang performant
- **CSS Animations** - Smooth transitions dan micro-interactions

## 📁 Struktur Proyek

```
ujikom/
├── index.html              # Halaman utama
├── assets/
│   ├── css/
│   │   └── style.css      # Stylesheet utama
│   ├── js/
│   │   └── script.js      # JavaScript functionality
│   ├── images/            # Assets gambar
│   └── fonts/             # Custom fonts
├── README.md              # Dokumentasi ini
└── .github/
    └── workflows/
        └── deploy.yml     # GitHub Pages deployment
```

## 🎨 Design System

### Color Palette
- **Primary**: `#FF6B9D` (Pink)
- **Secondary**: `#C44569` (Deep Pink)
- **Accent**: `#FFC75F` (Golden)
- **Gradient**: Linear combination dengan theme anime

### Typography
- **Font Family**: Quicksand (Google Fonts)
- **Weights**: 400, 500, 600, 700
- **Character**: Friendly dan rounded

### Animations
- **Duration**: 0.3s - 0.5s untuk smooth transitions
- **Easing**: Cubic-bezier untuk natural movement
- **Effects**: Float, fade, slide, scale transforms

## 🚀 Deployment

### GitHub Pages Setup
1. Fork/clone repository ini
2. Push ke GitHub repository Anda
3. Aktifkan GitHub Pages di repository settings
4. Pilih branch `main` sebagai source
5. Website akan live di `https://username.github.io/repository-name`

### Manual Deployment
1. Upload semua file ke web server
2. Pastikan struktur folder tetap sama
3. Akses `index.html` sebagai entry point

## 🔧 Konfigurasi

### Environment Variables
Website ini menggunakan browser localStorage untuk demo. Untuk production:

```javascript
// Ganti dengan API endpoint yang sebenarnya
const API_ENDPOINT = 'https://your-api-domain.com/api';
```

### Customization
- **Colors**: Edit CSS variables di `assets/css/style.css`
- **Text**: Edit konten di `index.html`
- **Animations**: Modifikasi keyframes di CSS
- **Functionality**: Extend logic di `assets/js/script.js`

## 🌟 Easter Eggs

### Konami Code
Klik: ↑↑↓↓←→←→BA
- Akan mengaktifkan rainbow mode
- Menampilkan notifikasi khusus

### Hidden Features
- Particle effects muncul setiap 3 detik
- Hover effects pada semua interactive elements
- Typing animation pada hero title
- Scroll animations untuk section transitions

## 📊 Demo Data

Website ini menggunakan localStorage untuk menyimpan data demo. Untuk melihat sample data:

1. Buka browser developer tools
2. Tab Application → Local Storage
3. Lihat key `complaints` untuk data pengaduan

## 🤝 Kontribusi

Contributions are welcome! Silakan:

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 To-Do

- [ ] Backend integration dengan real API
- [ ] User authentication system
- [ ] Admin dashboard untuk manage complaints
- [ ] Email notifications
- [ ] File upload ke cloud storage
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Advanced search & filter

## 🐛 Bugs & Issues

Jika menemukan bugs atau memiliki saran:

1. Check existing issues terlebih dahulu
2. Create new issue dengan detail:
   - Description yang jelas
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshot jika ada

## 📄 License

Project ini dilisensikan under MIT License - lihat [LICENSE](LICENSE) file untuk details.

## 🙏 Credits

- **Fonts**: [Quicksand by Google Fonts](https://fonts.google.com/specimen/Quicksand)
- **Icons**: [Font Awesome](https://fontawesome.com/)
- **Inspiration**: Anime culture dan Japanese aesthetics
- **Colors**: Gradient inspiration dari anime aesthetics

## 📞 Contact

- **Email**: info@suara.id
- **Website**: https://your-domain.com
- **GitHub Issues**: [Create Issue](https://github.com/username/repository/issues)

---

<div align="center">
  <p>Made with 💜 and 🌸</p>
  <p>© 2024 SUARA - Sistem Unggah Aspirasi Rakyat dengan Sentuhan Anime</p>
</div>