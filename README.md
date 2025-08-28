# aracteklifi.com - Araç Değerleme Platformu

Bu proje, araç değerleme ve satış platformu olan aracteklifi.com'un web uygulamasıdır.

## Özellikler

- 6 adımlı araç değerleme süreci
- Türkçe arayüz
- Responsive tasarım
- E-posta bildirimleri
- Modern ve kullanıcı dostu arayüz

## Kurulum

1. Projeyi klonlayın
2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. E-posta ayarlarını yapılandırın:
   - `.env.local` dosyası oluşturun
   - Aşağıdaki değişkenleri ekleyin:
   ```
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-gmail-app-password
   ```

4. Gmail App Password oluşturma:
   - Gmail hesabınızda 2FA'yı etkinleştirin
   - Google Hesap ayarlarına gidin
   - Güvenlik > 2 Adımlı Doğrulama > Uygulama Şifreleri
   - "Diğer" seçeneğini seçin ve bir şifre oluşturun
   - Bu şifreyi `EMAIL_PASS` olarak kullanın

5. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

## Kullanım

1. Ana sayfada "Aracını Sat" butonuna tıklayın
2. 6 adımlı süreci takip edin:
   - Araç markası seçimi
   - Model seçimi
   - Yıl seçimi
   - Detay bilgileri (kilometre, yakıt, vites, durum)
   - İletişim bilgileri (ad, soyad, telefon, il, ilçe)
   - Sonuç sayfası

3. Form tamamlandığında bilgiler otomatik olarak `mehmetbayram@gmail.com` adresine gönderilir

## Teknolojiler

- Next.js 15
- TypeScript
- Tailwind CSS
- Lucide React (ikonlar)
- Nodemailer (e-posta gönderimi)

## Proje Yapısı

```
app/
├── api/
│   └── send-email/
│       └── route.ts          # E-posta gönderme API'si
├── arac-degerle/
│   ├── step-1/               # Marka seçimi
│   ├── step-2/               # Model seçimi
│   ├── step-3/               # Yıl seçimi
│   ├── step-4/               # Detay bilgileri
│   ├── step-5/               # İletişim bilgileri
│   └── step-6/               # Sonuç sayfası
├── layout.tsx                # Ana layout
└── page.tsx                  # Ana sayfa
```

## E-posta Gönderimi

Sistem, değerleme taleplerini otomatik olarak e-posta ile gönderir. E-posta içeriği:

- Araç bilgileri (marka, model, yıl, kilometre, yakıt, vites, durum)
- İletişim bilgileri (ad, soyad, telefon, il, ilçe)
- Talep tarihi
- Profesyonel HTML formatında

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
