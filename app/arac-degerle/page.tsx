'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Car, CheckCircle } from 'lucide-react';

const carBrands = [
  'acura', 'alfa romeo', 'aston martin', 'audi', 'bentley', 'bmw', 'buick', 'cadillac',
  'chevrolet', 'chrysler', 'citroën', 'dodge', 'ferrari', 'fiat', 'ford', 'genesis',
  'gmc', 'honda', 'hyundai', 'infiniti', 'jaguar', 'jeep', 'kia', 'lamborghini',
  'land rover', 'lexus', 'lincoln', 'lotus', 'maserati', 'mazda', 'mclaren', 'mercedes-benz',
  'mini', 'mitsubishi', 'nissan', 'oldsmobile', 'peugeot', 'pontiac', 'porsche', 'ram',
  'renault', 'rolls-royce', 'saab', 'saturn', 'scion', 'seat', 'škoda', 'smart',
  'subaru', 'suzuki', 'tesla', 'toyota', 'volkswagen', 'volvo'
];

function AracDegerleContent() {
  const searchParams = useSearchParams();
  const [selectedBrand, setSelectedBrand] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Check if brand is provided from homepage form
  useEffect(() => {
    const brandFromHomepage = searchParams.get('brand');
    if (brandFromHomepage) {
      setSelectedBrand(brandFromHomepage);
    }
  }, [searchParams]);

  const filteredBrands = carBrands.filter(brand =>
    brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  aracteklifi.com
                </h1>
                <div className="text-xs text-text-secondary font-medium">Araç Değerleme</div>
              </div>
            </Link>
            <div className="text-sm text-text-secondary">
              Adım 1 / 7
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
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  1
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">Araç Markası</div>
                  <div className="text-xs text-gray-500">Aracınızın markasını seçin</div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm font-semibold">
                  2
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-500">Model</div>
                  <div className="text-xs text-gray-400">Model seçimi</div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm font-semibold">
                  3
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-500">Yıl</div>
                  <div className="text-xs text-gray-400">Üretim yılı</div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm font-semibold">
                  4
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-500">Hasar Bilgileri</div>
                  <div className="text-xs text-gray-400">Araç durumu</div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm font-semibold">
                  5
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-500">Detaylar</div>
                  <div className="text-xs text-gray-400">Kilometre, yakıt, vites</div>
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
            Aracınızın Markasını Seçin
          </h1>
          <p className="text-lg text-gray-600">
            Aracınızın markasını seçerek değerleme sürecine başlayın
          </p>
        </div>

        {/* Search Box */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Marka ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

                 {/* Brand Grid */}
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
           {filteredBrands.map((brand) => (
             <button
               key={brand}
               onClick={() => setSelectedBrand(brand)}
               className={`p-4 border rounded-lg text-left hover:border-blue-500 hover:bg-blue-50 transition-colors ${
                 selectedBrand === brand
                   ? 'border-blue-500 bg-blue-50'
                   : 'border-gray-200 bg-white'
               }`}
             >
               <div className="flex items-center justify-between">
                 <div className="flex items-center space-x-3">
                   <div className="w-8 h-8 flex items-center justify-center">
                     <img
                       src={`https://logo.clearbit.com/${brand.toLowerCase().replace(/\s+/g, '')}.com`}
                       alt={`${brand} logo`}
                       className="w-6 h-6 object-contain"
                       onError={(e) => {
                         // Fallback to text if image fails to load
                         const target = e.currentTarget as HTMLImageElement;
                         target.style.display = 'none';
                         const nextElement = target.nextElementSibling as HTMLElement;
                         if (nextElement) {
                           nextElement.style.display = 'block';
                         }
                       }}
                     />
                     <span className="text-xs font-bold text-gray-500 hidden">{brand.charAt(0)}</span>
                   </div>
                   <span className="font-medium text-gray-900">{brand}</span>
                 </div>
                 {selectedBrand === brand && (
                   <CheckCircle className="h-5 w-5 text-blue-600" />
                 )}
               </div>
             </button>
           ))}
         </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Geri
          </Link>
          
          <Link
            href={selectedBrand ? `/arac-degerle/step-2?brand=${encodeURIComponent(selectedBrand)}` : '#'}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center ${
              selectedBrand
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

export default function AracDegerle() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AracDegerleContent />
    </Suspense>
  );
}
