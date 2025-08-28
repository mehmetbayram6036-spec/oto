'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Car, Mail, MessageSquare, CheckCircle, Clock, User, Phone, MapPin } from 'lucide-react';

function Step6Content() {
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand') || '';
  const model = searchParams.get('model') || '';
  const year = searchParams.get('year') || '';
  const hasar = searchParams.get('hasar') || '';
  const kilometer = searchParams.get('kilometer') || '';
  const licensePlate = searchParams.get('licensePlate') || '';
  const carPackage = searchParams.get('carPackage') || '';
  const tramerAmount = searchParams.get('tramerAmount') || '';
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

  const [isLoading, setIsLoading] = useState(true);
  const [emailSent, setEmailSent] = useState(false);

  // Hasar bilgilerini parse et
  const hasarData = hasar ? JSON.parse(decodeURIComponent(hasar)) : {};

  useEffect(() => {
    const sendEmail = async () => {
      try {
        // Simüle edilmiş işlem süresi
        setTimeout(async () => {
          setIsLoading(false);
          
          // E-posta gönder
          const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              brand,
              model,
              year,
              hasar: hasarData,
              kilometer,
              licensePlate,
              tramerAmount,
              fuelType,
              transmission,
              condition,
              sunroof,
              panoramicRoof,
              carPackage,
              firstName,
              lastName,
              phone,
              city,
              district
            }),
          });

          const result = await response.json();
          
          if (result.success) {
            setEmailSent(true);
          }
        }, 2000);
      } catch (error) {
        console.error('E-posta gönderme hatası:', error);
      }
    };

    sendEmail();
  }, [brand, model, year, hasar, kilometer, licensePlate, fuelType, transmission, condition, sunroof, panoramicRoof, firstName, lastName, phone, city, district, carPackage]);

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <Car className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">aracteklifi.com</h1>
            </Link>
            <div className="text-sm text-gray-500">
              Adım 7 / 7
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <div className="flex-1">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  ✓
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">Araç Markası</div>
                  <div className="text-xs text-gray-500">{brand}</div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  ✓
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">Model</div>
                  <div className="text-xs text-gray-500">{model}</div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  ✓
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">Yıl</div>
                  <div className="text-xs text-gray-500">{year}</div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  ✓
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">Hasar Bilgileri</div>
                  <div className="text-xs text-gray-500">Tamamlandı</div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  ✓
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">Detaylar</div>
                  <div className="text-xs text-gray-500">Tamamlandı</div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  ✓
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">İletişim</div>
                  <div className="text-xs text-gray-500">Tamamlandı</div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  6
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">Sonuç</div>
                  <div className="text-xs text-gray-500">Değerleme raporu</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Değerleme bilgileriniz işleniyor...</p>
          </div>
        ) : (
          <div className="text-center">
            {/* Success Icon */}
            <div className="mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            </div>

            {/* Main Message */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Değerleme Talebiniz Alındı!
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              {brand} {model} ({year}) aracınızın değerleme raporu hazırlanıyor. 
              Tahmini değer en kısa sürede hesaplanıp size mail ve SMS ile iletilecektir.
            </p>

            {/* Email Status */}
            {emailSent && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
                <div className="flex items-center justify-center">
                  <Mail className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-green-800 font-medium">
                    Bilgileriniz mehmetbayram@gmail.com adresine başarıyla gönderildi
                  </span>
                </div>
              </div>
            )}

            {/* Notification Methods */}
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Bildirim Yöntemleri
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                  <Mail className="h-8 w-8 text-blue-600 mr-4" />
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900">E-posta</h3>
                    <p className="text-sm text-gray-600">Detaylı değerleme raporu</p>
                  </div>
                </div>
                <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                  <MessageSquare className="h-8 w-8 text-green-600 mr-4" />
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900">SMS</h3>
                    <p className="text-sm text-gray-600">Hızlı değerleme sonucu</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Car Details Summary */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Değerleme Talebi Özeti
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Araç Bilgileri</h3>
                  <div className="space-y-2 text-sm">
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
                    {carPackage && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Paket:</span>
                        <span className="font-medium">{carPackage}</span>
                      </div>
                    )}
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
                    {tramerAmount && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tramer Bilgisi:</span>
                        <span className="font-medium">{tramerAmount} TL</span>
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
                  </div>
                </div>

                {/* Hasar Bilgileri Summary */}
                {Object.keys(hasarData).length > 0 && (
                  <div className="bg-yellow-50 rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                      Hasar Bilgileri
                    </h2>
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

                {/* Contact Details Summary */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    İletişim Bilgileri
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
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
            </div>

            {/* Processing Time Info */}
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-blue-800 font-medium">İşlem Süresi</span>
              </div>
              <p className="text-blue-700 text-sm">
                Değerleme raporunuz genellikle 2-4 saat içinde hazırlanır ve size ulaştırılır.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/arac-degerle"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Yeni Değerleme
              </Link>
              <Link
                href="/"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Ana Sayfaya Dön
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Step6() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Yükleniyor...</h1>
        </div>
      </div>
    }>
      <Step6Content />
    </Suspense>
  );
}
