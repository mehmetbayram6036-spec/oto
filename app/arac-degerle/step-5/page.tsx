'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Car, Mail, MessageSquare, CheckCircle, Clock, User, Phone, MapPin } from 'lucide-react';

// Araç değerleme hesaplama fonksiyonu
function calculateCarValue(
  baseValue: number,
  hasarData: any,
  tramerDurumu: string,
  tramerTutari: string
): number {
  let finalValue = baseValue;
  
  // Kasko değerinin %5 altından başla
  finalValue = baseValue * 0.95;
  
  // Tramer kaydı varsa ekstra düşüş yok (sadece %5 düşüş uygulanır)
  
  // Hasar bilgilerini kontrol et
  if (hasarData && Object.keys(hasarData).length > 0) {
    Object.entries(hasarData).forEach(([part, damage]) => {
      if (damage === 'Boyalı') {
        // Her boyalı parça için %0.10 düşüş
        finalValue = finalValue * (1 - 0.001);
      } else if (damage === 'Değişen') {
        // Her değişen parça için %0.50 düşüş
        finalValue = finalValue * (1 - 0.005);
      }
    });
  }
  
  return Math.round(finalValue);
}

// Araç fiyatını year-based-car-data.json'dan bul
async function findCarPrice(brand: string, model: string, year: string): Promise<number | null> {
  try {
    const response = await fetch('/year-based-car-data.json');
    const data = await response.json();
    
    // Yıla göre araç verilerini bul
    const yearData = data[year];
    if (!yearData) return null;
    
    // Marka ve modele göre araç fiyatını bul
    for (const car of yearData) {
      if (car.marka.toLowerCase() === brand.toLowerCase() && 
          car.model.toLowerCase() === model.toLowerCase()) {
        return car.fiyat || null;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Araç fiyatı bulunamadı:', error);
    return null;
  }
}

function Step5Content() {
  const searchParams = useSearchParams();
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

  const [isLoading, setIsLoading] = useState(true);
  const [emailSent, setEmailSent] = useState(false);
  const [carValue, setCarValue] = useState<number | null>(null);
  const [calculationDetails, setCalculationDetails] = useState<any>(null);

  // Hasar bilgilerini parse et
  const hasarData = hasar ? JSON.parse(decodeURIComponent(hasar)) : {};

  useEffect(() => {
    const calculateValue = async () => {
      try {
        // Gerçek araç fiyatını bul
        const carPrice = await findCarPrice(brand, model, year);
        
        // Eğer araç fiyatı bulunamazsa varsayılan değer kullan
        const baseValue = carPrice || 200000;
        
        // Değerleme hesaplaması
        const calculatedValue = calculateCarValue(baseValue, hasarData, tramerDurumu, tramerTutari);
        
        // Hesaplama detayları
        const details = {
          baseValue,
          kaskoDiscount: baseValue * 0.05,
          paintedParts: Object.values(hasarData).filter(damage => damage === 'Boyalı').length,
          replacedParts: Object.values(hasarData).filter(damage => damage === 'Değişen').length,
          paintedDiscount: Object.values(hasarData).filter(damage => damage === 'Boyalı').length * 0.001 * baseValue,
          replacedDiscount: Object.values(hasarData).filter(damage => damage === 'Değişen').length * 0.005 * baseValue,
          finalValue: calculatedValue,
          carPriceFound: carPrice !== null
        };
        
        setCarValue(calculatedValue);
        setCalculationDetails(details);
        setIsLoading(false);
      } catch (error) {
        console.error('Değerleme hesaplama hatası:', error);
        setIsLoading(false);
      }
    };

    // 2 saniye bekle ve hesapla
    setTimeout(calculateValue, 2000);
  }, [brand, model, year, hasarData, tramerDurumu, tramerTutari]);

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
              Adım 6 / 7
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
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  6
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">Sonuç</div>
                  <div className="text-xs text-gray-500">Değerleme</div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm font-semibold">
                  7
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-500">İletişim</div>
                  <div className="text-xs text-gray-400">Bilgileriniz</div>
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
            </p>

            {/* Estimated Value */}
            {carValue && (
              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Tahmini Değer
                </h2>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {carValue.toLocaleString('tr-TR')} TL
                  </div>
                </div>
              </div>
            )}

            {/* Calculation Details */}
            {calculationDetails && (
              <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Hesaplama Detayları
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Temel Değer:</span>
                      <span className="font-medium">{calculationDetails.baseValue.toLocaleString('tr-TR')} TL</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Kasko İndirimi (%5):</span>
                      <span className="font-medium text-red-600">-{calculationDetails.kaskoDiscount.toLocaleString('tr-TR')} TL</span>
                    </div>
                    {calculationDetails.paintedParts > 0 && (
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Boyalı Parça ({calculationDetails.paintedParts} adet):</span>
                        <span className="font-medium text-red-600">-{calculationDetails.paintedDiscount.toLocaleString('tr-TR')} TL</span>
                      </div>
                    )}
                    {calculationDetails.replacedParts > 0 && (
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Değişen Parça ({calculationDetails.replacedParts} adet):</span>
                        <span className="font-medium text-red-600">-{calculationDetails.replacedDiscount.toLocaleString('tr-TR')} TL</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Tramer Durumu:</span>
                      <span className="font-medium">{tramerDurumu}</span>
                    </div>
                    {tramerDurumu === 'Var' && tramerTutari && (
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Tramer Tutarı:</span>
                        <span className="font-medium">{tramerTutari} TL</span>
                      </div>
                    )}
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Toplam İndirim:</span>
                      <span className="font-medium text-red-600">
                        -{(calculationDetails.baseValue - calculationDetails.finalValue).toLocaleString('tr-TR')} TL
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t pt-2">
                      <span className="text-gray-900">Final Değer:</span>
                      <span className="text-blue-600">{calculationDetails.finalValue.toLocaleString('tr-TR')} TL</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/arac-degerle/step-7?brand=${encodeURIComponent(brand)}&model=${encodeURIComponent(model)}&year=${year}&hasar=${encodeURIComponent(hasar)}&agirHasar=${encodeURIComponent(agirHasar)}&tramerDurumu=${encodeURIComponent(tramerDurumu)}&tramerTutari=${encodeURIComponent(tramerTutari)}&kompleOrijinal=${encodeURIComponent(kompleOrijinal)}&kilometer=${kilometer}&licensePlate=${encodeURIComponent(licensePlate)}&carPackage=${encodeURIComponent(carPackage)}&fuelType=${encodeURIComponent(fuelType)}&transmission=${encodeURIComponent(transmission)}&condition=${encodeURIComponent(condition)}&sunroof=${encodeURIComponent(sunroof)}&panoramicRoof=${encodeURIComponent(panoramicRoof)}&carValue=${carValue}`}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Fiyatı Kabul Ediyorum ve İletişim Sayfasına Geçin
              </Link>
              <Link
                href="/arac-degerle"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Yeni Değerleme
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Step5() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Yükleniyor...</h1>
        </div>
      </div>
    }>
      <Step5Content />
    </Suspense>
  );
}
