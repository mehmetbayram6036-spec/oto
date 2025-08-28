'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Car } from 'lucide-react';

function Step4Content() {
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand') || '';
  const model = searchParams.get('model') || '';
  const year = searchParams.get('year') || '';
  const hasar = searchParams.get('hasar') || '';
  const agirHasar = searchParams.get('agirHasar') || '';
  const tramerDurumu = searchParams.get('tramerDurumu') || '';
  const tramerTutari = searchParams.get('tramerTutari') || '';
  const kompleOrijinal = searchParams.get('kompleOrijinal') || '';

  const [kilometer, setKilometer] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [carPackage, setCarPackage] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [transmission, setTransmission] = useState('');
  const [condition, setCondition] = useState('');
  const [sunroof, setSunroof] = useState('');
  const [panoramicRoof, setPanoramicRoof] = useState('');
  const [carPackages, setCarPackages] = useState<Record<string, any>>({});
  const [filteredPackages, setFilteredPackages] = useState<string[]>([]);
  const [isLoadingPackages, setIsLoadingPackages] = useState(false);
  const [kilometerError, setKilometerError] = useState('');

  const fuelTypes = ['Benzin', 'Dizel', 'LPG', 'Elektrik', 'Hibrit', 'Benzin & LPG'];
  const transmissionTypes = ['Manuel', 'Otomatik', 'Yarı Otomatik'];
  const conditions = ['Mükemmel', 'Çok İyi', 'İyi', 'Orta', 'Kötü'];

  // Araç paketlerini yükle
  useEffect(() => {
    const loadCarPackages = async () => {
      try {
        setIsLoadingPackages(true);
        const response = await fetch('/car-packages.json');
        const data = await response.json();
        setCarPackages(data);
      } catch (error) {
        console.error('Araç paketleri yüklenirken hata:', error);
      } finally {
        setIsLoadingPackages(false);
      }
    };

    loadCarPackages();
  }, []);

  // Marka, model ve yıla göre paketleri filtrele
  useEffect(() => {
    console.log('Filtreleme çalışıyor:', { brand, model, year, carPackagesKeys: Object.keys(carPackages) });
    
    if (carPackages[brand] && carPackages[brand][year]) {
      const yearPackages = carPackages[brand][year];
            const filtered = yearPackages.filter((packageName: string) =>
        packageName.toLowerCase().includes(model.toLowerCase())
      );
      console.log('Filtrelenmiş sonuçlar:', filtered.length, filtered.slice(0, 5));
      setFilteredPackages(filtered);
    } else {
      console.log('Filtreleme koşulları sağlanmadı');
      setFilteredPackages([]);
    }
  }, [brand, model, year, carPackages]);

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

  const isFormValid = kilometer && fuelType && transmission && condition && sunroof && panoramicRoof && carPackage && !kilometerError;

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
              Adım 5 / 7
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
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  5
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">Detaylar</div>
                  <div className="text-xs text-gray-500">Kilometre, yakıt, vites</div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm font-semibold">
                  6
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-500">İletişim</div>
                  <div className="text-xs text-gray-400">Bilgileriniz</div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm font-semibold">
                  7
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-500">Sonuç</div>
                  <div className="text-xs text-gray-400">Değerleme</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Araç Detaylarını Girin
          </h1>
          <p className="text-lg text-gray-600">
            {brand} {model} ({year}) aracınızın detay bilgilerini belirtin
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          {/* Kilometer */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Kilometre *
            </label>
            <input
              type="number"
              value={kilometer}
              onChange={(e) => {
                const value = e.target.value;
                setKilometer(value);
                
                // Kilometre kontrolü
                if (value && parseInt(value) > 250000) {
                  setKilometerError('250.000 km üstü araç alımı yapılmamaktadır.');
                } else {
                  setKilometerError('');
                }
              }}
              placeholder="Örn: 150000"
              min="0"
              max="250000"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                kilometerError ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {kilometerError ? (
              <p className="text-xs text-red-600 mt-2">
                {kilometerError}
              </p>
            ) : (
              <p className="text-xs text-gray-500 mt-2">
                0 ile 250.000 km arası bir değer girin. Bu alan zorunludur.
              </p>
            )}
          </div>

                     {/* License Plate */}
           <div className="mb-8">
             <label className="block text-sm font-medium text-gray-700 mb-4">
               Plaka
             </label>
             <input
               type="text"
               value={licensePlate}
               onChange={(e) => setLicensePlate(e.target.value)}
               placeholder="Örn: 34 ABC 123"
               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
               maxLength={10}
             />
             <p className="text-xs text-gray-500 mt-2">
               Aracınızın plaka numarasını girin. Bu alan opsiyoneldir.
             </p>
           </div>

           {/* Car Package */}
           <div className="mb-8">
             <label className="block text-sm font-medium text-gray-700 mb-4">
               Arabanızın Paketi *
             </label>
             
             {isLoadingPackages ? (
               <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
                 <div className="flex items-center">
                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                   <span className="text-gray-500">Araç paketleri yükleniyor...</span>
                 </div>
               </div>
             ) : filteredPackages.length > 0 ? (
               <div className="space-y-2">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto border border-gray-300 rounded-lg p-3">
                   {filteredPackages.slice(0, 20).map((packageName, index) => (
                     <button
                       key={index}
                       onClick={() => setCarPackage(packageName)}
                       className={`p-2 text-left rounded text-sm transition-colors ${
                         carPackage === packageName
                           ? 'bg-blue-100 border border-blue-300 text-blue-700'
                           : 'hover:bg-gray-50 border border-transparent'
                       }`}
                     >
                       {packageName}
                     </button>
                   ))}
                 </div>
                 {filteredPackages.length > 20 && (
                   <p className="text-xs text-gray-500">
                     {filteredPackages.length - 20} paket daha var. Yukarıdaki listeden seçim yapabilirsiniz.
                   </p>
                 )}
               </div>
             ) : (
               <div className="space-y-2">
                 <input
                   type="text"
                   value={carPackage}
                   onChange={(e) => setCarPackage(e.target.value)}
                   placeholder="Araç paket adınızı girin..."
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                 />
                 <p className="text-xs text-orange-600">
                   Seçilen marka, model ve yıl için paket bulunamadı. Lütfen kendi paket adınızı yazın.
                 </p>
               </div>
             )}
             
             <p className="text-xs text-gray-500 mt-2">
               {filteredPackages.length > 0 
                 ? `${brand} ${model} (${year}) için ${filteredPackages.length} farklı paket bulundu. Yukarıdaki listeden seçim yapabilir veya kendi paket adınızı yazabilirsiniz.`
                 : 'Aracınızın paket adını girin. Bu alan zorunludur.'
               }
             </p>
           </div>



          {/* Fuel Type */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Yakıt Tipi *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {fuelTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setFuelType(type)}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    fuelType === type
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Transmission */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Vites Tipi *
            </label>
            <div className="grid grid-cols-3 gap-3">
              {transmissionTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setTransmission(type)}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    transmission === type
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Condition */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Genel Durum *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {conditions.map((cond) => (
                <button
                  key={cond}
                  onClick={() => setCondition(cond)}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    condition === cond
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>
          </div>

          {/* Sunroof */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Sunroof *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSunroof('Var')}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  sunroof === 'Var'
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                Var
              </button>
              <button
                onClick={() => setSunroof('Yok')}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  sunroof === 'Yok'
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                Yok
              </button>
            </div>
          </div>

          {/* Panoramic Roof */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Cam Tavan *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPanoramicRoof('Var')}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  panoramicRoof === 'Var'
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                Var
              </button>
              <button
                onClick={() => setPanoramicRoof('Yok')}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  panoramicRoof === 'Yok'
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                Yok
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link
            href={`/arac-degerle/step-3-hasar?brand=${encodeURIComponent(brand)}&model=${encodeURIComponent(model)}&year=${year}`}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Geri
          </Link>
          
                     <Link
             href={isFormValid ? `/arac-degerle/step-5?brand=${encodeURIComponent(brand)}&model=${encodeURIComponent(model)}&year=${year}&hasar=${encodeURIComponent(hasar)}&agirHasar=${encodeURIComponent(agirHasar)}&tramerDurumu=${encodeURIComponent(tramerDurumu)}&tramerTutari=${encodeURIComponent(tramerTutari)}&kompleOrijinal=${encodeURIComponent(kompleOrijinal)}&kilometer=${kilometer}&licensePlate=${encodeURIComponent(licensePlate)}&carPackage=${encodeURIComponent(carPackage)}&fuelType=${encodeURIComponent(fuelType)}&transmission=${encodeURIComponent(transmission)}&condition=${encodeURIComponent(condition)}&sunroof=${encodeURIComponent(sunroof)}&panoramicRoof=${encodeURIComponent(panoramicRoof)}` : '#'}
             className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center ${
               isFormValid
                 ? 'bg-blue-600 text-white hover:bg-blue-700'
                 : 'bg-gray-300 text-gray-500 cursor-not-allowed'
             }`}
           >
             Devam Et
             <ArrowRight className="ml-2 h-4 w-4" />
           </Link>
        </div>
      </div>
    </div>
  );
}

export default function Step4() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Yükleniyor...</h1>
        </div>
      </div>
    }>
      <Step4Content />
    </Suspense>
  );
}
