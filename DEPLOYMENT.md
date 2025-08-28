# Vercel Deployment Guide

Bu proje Vercel'de yayınlanmaya hazır hale getirilmiştir.

## Gerekli Ortam Değişkenleri

Vercel'de aşağıdaki ortam değişkenlerini ayarlamanız gerekiyor:

### E-posta Gönderimi için:
- `EMAIL_USER`: Gmail kullanıcı adınız
- `EMAIL_PASS`: Gmail uygulama şifresi

## Deployment Adımları

1. **Vercel CLI ile deploy:**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **GitHub entegrasyonu ile deploy:**
   - Projeyi GitHub'a push edin
   - Vercel Dashboard'da "New Project" seçin
   - GitHub repository'nizi bağlayın
   - Ortam değişkenlerini ayarlayın
   - Deploy edin

## Yapılan Değişiklikler

### Package.json Güncellemeleri:
- Next.js 14.0.4'e downgrade edildi
- React 18.2.0'a downgrade edildi
- Tüm bağımlılıklar uyumlu versiyonlara güncellendi
- Tailwind CSS v3.4.0 kullanılıyor

### Konfigürasyon Dosyaları:
- `next.config.js`: JavaScript formatına çevrildi
- `vercel.json`: Vercel deployment konfigürasyonu eklendi
- `tailwind.config.js`: Tailwind CSS konfigürasyonu oluşturuldu
- `postcss.config.mjs`: PostCSS konfigürasyonu güncellendi

### Font Güncellemeleri:
- Geist fontları Inter fontu ile değiştirildi
- CSS dosyası Tailwind CSS v3 syntax'ına güncellendi

## API Route

`/api/send-email` endpoint'i Node.js 18.x runtime'ında çalışacak şekilde konfigüre edildi.

## Build Komutları

```bash
npm install    # Bağımlılıkları yükle
npm run build  # Production build
npm run dev    # Development server
```

## Notlar

- Proje artık static export yerine serverless functions kullanıyor
- API route'ları Vercel'de çalışacak şekilde optimize edildi
- Tüm runtime paketleri uyumlu versiyonlara güncellendi
