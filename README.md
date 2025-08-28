# Aracteklifi.com - Araç Değerleme Platformu

Modern ve kullanıcı dostu araç değerleme platformu. Next.js 15, TypeScript ve Tailwind CSS kullanılarak geliştirilmiştir.

## 🚀 Özellikler

- **Hızlı Değerleme**: Araç marka, model ve yıl bilgileriyle dakikalar içinde değerleme
- **Detaylı Hasar Analizi**: Araç parçalarının hasar durumlarını detaylı şekilde değerlendirme
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- **Modern UI/UX**: Kullanıcı dostu arayüz ve akıcı kullanıcı deneyimi
- **Admin Paneli**: Değerleme taleplerini yönetme
- **E-posta Bildirimleri**: Otomatik e-posta gönderimi

## 🛠️ Teknolojiler

- **Framework**: Next.js 15
- **Dil**: TypeScript
- **Styling**: Tailwind CSS + SCSS
- **Icons**: Lucide React
- **Email**: Nodemailer
- **Deployment**: Vercel

## 📦 Kurulum

1. Projeyi klonlayın:
```bash
git clone <repository-url>
cd oto
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

4. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 🚀 Deployment

### Vercel ile Deployment

1. [Vercel](https://vercel.com) hesabınıza giriş yapın
2. "New Project" butonuna tıklayın
3. GitHub repository'nizi seçin
4. Aşağıdaki ayarları yapın:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `out`
   - **Install Command**: `npm install`

5. "Deploy" butonuna tıklayın

### Environment Variables

Vercel'de aşağıdaki environment variable'ları ayarlayın:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## 📁 Proje Yapısı

```
oto/
├── app/
│   ├── admin/              # Admin paneli
│   ├── api/                # API routes
│   ├── arac-degerle/       # Araç değerleme sayfaları
│   ├── iletisim/           # İletişim sayfası
│   ├── globals.css         # Global stiller
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Ana sayfa
├── public/                 # Statik dosyalar
├── styles.scss             # SCSS stilleri
├── next.config.ts          # Next.js konfigürasyonu
├── package.json            # Bağımlılıklar
└── vercel.json             # Vercel konfigürasyonu
```

## 🎨 Tasarım Sistemi

### Renkler
- **Primary**: #2563eb (Blue)
- **Secondary**: #64748b (Slate)
- **Success**: #10b981 (Emerald)
- **Warning**: #f59e0b (Amber)
- **Error**: #ef4444 (Red)

### Tipografi
- **Font Family**: Inter, system fonts
- **Heading Weights**: 600 (semibold)
- **Body Text**: 400 (normal)

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Geliştirme

### Scripts

```bash
npm run dev          # Geliştirme sunucusu
npm run build        # Production build
npm run start        # Production sunucusu
npm run lint         # ESLint kontrolü
```

### Kod Standartları

- TypeScript strict mode kullanılır
- ESLint kurallarına uyulur
- Component'ler functional component olarak yazılır
- Props için interface'ler tanımlanır

## 📧 E-posta Konfigürasyonu

Gmail SMTP kullanarak e-posta gönderimi yapılır. Gmail'de "App Password" oluşturmanız gerekir:

1. Google Hesabınıza gidin
2. Güvenlik > 2 Adımlı Doğrulama'yı açın
3. Uygulama Şifreleri > Diğer > Özel ad girin
4. Oluşturulan şifreyi `EMAIL_PASS` olarak kullanın

## 🔒 Güvenlik

- Admin paneli için basit authentication
- Form validation
- XSS koruması
- CSRF koruması

## 📈 Performans

- Static generation kullanılır
- Image optimization
- Code splitting
- Bundle optimization

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

- **Website**: [aracteklifi.com](https://aracteklifi.com)
- **Email**: aracteklifi.com@gmail.com
- **Phone**: 0544 380 15 45

---

© 2024 Aracteklifi.com. Tüm hakları saklıdır.
