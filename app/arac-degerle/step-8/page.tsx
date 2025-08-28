'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Car, CheckCircle } from 'lucide-react';

function Step8Content() {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const brand = searchParams.get('brand') || '';
  const model = searchParams.get('model') || '';
  const year = searchParams.get('year') || '';
  const hasar = searchParams.get('hasar') || '';
  const agirHasar = searchParams.get('agirHasar') || '';
  const tramerDurumu = searchParams.get('tramerDurumu') || '';
  const tramerTutari = searchParams.get('tramerTutari') || '';
  const kompleOrijinal = searchParams.get('kompleOrijinal') || '';
  const kilometer = searchParams.get('kilometer') || '';
  const licensePlate = searchParams.get('licensePlate') || '';
  const carPackage = searchParams.get('carPackage') || '';
  const fuelType = searchParams.get('fuelType') || '';
  const transmission = searchParams.get('transmission') || '';
  const condition = searchParams.get('condition') || '';
  const sunroof = searchParams.get('sunroof') || '';
  const panoramicRoof = searchParams.get('panoramicRoof') || '';
  const firstName = searchParams.get('firstName') || '';
  const lastName = searchParams.get('lastName') || '';
  const phone = searchParams.get('phone') || '';
  const city = searchParams.get('city') || '';
  const district = searchParams.get('district') || '';
  const carValue = searchParams.get('carValue') || '';

  // Hasar verilerini parse et
  let hasarData = {};
  try {
    hasarData = JSON.parse(hasar);
  } catch (e) {
    hasarData = {};
  }

  // Veritabanına kaydet
  useEffect(() => {
    const saveToDatabase = async () => {
      if (!brand || !model || !year) return;
      
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/car-submissions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            brand,
            model,
            year,
            hasar: JSON.stringify(hasarData),
            agirHasar,
            tramerDurumu,
            tramerTutari,
            kompleOrijinal,
            kilometer,
            licensePlate,
            carPackage,
            fuelType,
            transmission,
            condition,
            sunroof,
            panoramicRoof,
            firstName,
            lastName,
            phone,
            city,
            district,
            carValue: parseInt(carValue) || 0
          })
        });

        if (response.ok) {
          setSubmitMessage('Değerleme talebiniz başarıyla kaydedildi!');
        } else {
          setSubmitMessage('Değerleme talebi kaydedilirken bir hata oluştu.');
        }
      } catch (error) {
        console.error('Veritabanına kaydetme hatası:', error);
        setSubmitMessage('Değerleme talebi kaydedilirken bir hata oluştu.');
      } finally {
        setIsSubmitting(false);
      }
    };

    saveToDatabase();
  }, [brand, model, year, hasar, agirHasar, tramerDurumu, tramerTutari, kompleOrijinal, kilometer, licensePlate, carPackage, fuelType, transmission, condition, sunroof, panoramicRoof, firstName, lastName, phone, city, district, carValue]);

  if (!brand || !model || !year) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Eksik bilgi</h1>
          <Link href="/arac-degerle" className="text-blue-600 hover:underline">
            Baştan başla
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <Car className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">aracteklifi.com</h1>
            </Link>
            <div className="text-sm text-gray-500">
              Adım 8 / 8
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <div className="flex-1">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  ✓
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">Tamamlandı</div>
                  <div className="text-xs text-gray-500">Değerleme talebi</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="text-4xl font-bold text-green-600 mb-4">
            ✅ Teklifiniz alındı
          </div>
          <div className="text-2xl text-green-700">
            En kısa sürede sizinle iletişime geçilecektir
          </div>
          {isSubmitting && (
            <div className="mt-4 text-blue-600">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
              Veritabanına kaydediliyor...
            </div>
          )}
          {submitMessage && (
            <div className={`mt-4 text-sm ${submitMessage.includes('başarıyla') ? 'text-green-600' : 'text-red-600'}`}>
              {submitMessage}
            </div>
          )}
        </div>

        {/* Değerleme Talebi Özeti */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
            Değerleme Talebi Özeti
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Araç Bilgileri */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Araç Bilgileri</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Marka:</span>
                  <span className="font-medium">{brand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Model:</span>
                  <span className="font-medium">{model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Yıl:</span>
                  <span className="font-medium">{year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Paket:</span>
                  <span className="font-medium">{carPackage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Kilometre:</span>
                  <span className="font-medium">{kilometer} km</span>
                </div>
                {licensePlate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plaka:</span>
                    <span className="font-medium">{licensePlate}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Yakıt Tipi:</span>
                  <span className="font-medium">{fuelType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Vites:</span>
                  <span className="font-medium">{transmission}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Durum:</span>
                  <span className="font-medium">{condition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunroof:</span>
                  <span className="font-medium">{sunroof}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cam Tavan:</span>
                  <span className="font-medium">{panoramicRoof}</span>
                </div>
                {carValue && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tahmini Değer:</span>
                    <span className="font-medium text-blue-600 font-semibold">{parseInt(carValue).toLocaleString('tr-TR')} TL</span>
                  </div>
                )}
              </div>
            </div>

            {/* Hasar ve İletişim Bilgileri */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Hasar ve İletişim Bilgileri</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ağır Hasar:</span>
                  <span className="font-medium">{agirHasar}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tramer Durumu:</span>
                  <span className="font-medium">{tramerDurumu}</span>
                </div>
                {tramerDurumu === 'Var' && tramerTutari && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tramer Tutarı:</span>
                    <span className="font-medium">{tramerTutari} TL</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Komple Orijinal:</span>
                  <span className="font-medium">{kompleOrijinal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ad Soyad:</span>
                  <span className="font-medium">{firstName} {lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Telefon:</span>
                  <span className="font-medium">{phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">İl:</span>
                  <span className="font-medium">{city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">İlçe:</span>
                  <span className="font-medium">{district}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hasar Bilgileri */}
          {Object.keys(hasarData).length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Hasar Bilgileri</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                {Object.entries(hasarData).map(([part, damage]) => (
                  <div key={part} className="flex justify-between">
                    <span className="text-gray-600">{part.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</span>
                    <span className="font-medium">{damage as string}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center mt-8">
          <Link
            href="/arac-degerle"
            className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-lg"
          >
            Bitti 😊
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Step8() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Yükleniyor...</h1>
        </div>
      </div>
    }>
      <Step8Content />
    </Suspense>
  );
}
