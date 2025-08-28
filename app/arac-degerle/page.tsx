'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Car, CheckCircle, ArrowLeft } from 'lucide-react';
import { getCarBrands } from '@/lib/car-valuation';

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
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Check if brand is provided from homepage form
  useEffect(() => {
    const brandFromHomepage = searchParams.get('brand');
    if (brandFromHomepage) {
      setSelectedBrand(brandFromHomepage);
    }
  }, [searchParams]);

  // Load brands from API
  useEffect(() => {
    const loadBrands = async () => {
      try {
        const brandsData = await getCarBrands();
        setBrands(brandsData.length > 0 ? brandsData : carBrands);
      } catch (error) {
        console.error('Markalar yüklenirken hata:', error);
        setBrands(carBrands);
      } finally {
        setLoading(false);
      }
    };

    loadBrands();
  }, []);

  const filteredBrands = brands.filter(brand =>
    brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const steps = [
    { number: 1, title: 'Marka', subtitle: 'Araç markası', active: true },
    { number: 2, title: 'Model', subtitle: 'Model seçimi', active: false },
    { number: 3, title: 'Yıl', subtitle: 'Üretim yılı', active: false },
    { number: 4, title: 'Hasar', subtitle: 'Araç durumu', active: false },
    { number: 5, title: 'Detaylar', subtitle: 'Kilometre, yakıt', active: false },
    { number: 6, title: 'İletişim', subtitle: 'Bilgileriniz', active: false },
    { number: 7, title: 'Sonuç', subtitle: 'Değerleme', active: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  aracteklifi.com
                </h1>
                <div className="text-xs text-slate-300 font-medium">Araç Değerleme</div>
              </div>
            </Link>
            <div className="text-sm text-slate-300">
              Adım 1 / 7
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4 overflow-x-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center min-w-0 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step.active 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-600 text-slate-300'
                }`}>
                  {step.number}
                </div>
                <div className="ml-3 min-w-0">
                  <div className={`text-sm font-medium ${
                    step.active ? 'text-white' : 'text-slate-400'
                  }`}>
                    {step.title}
                  </div>
                  <div className={`text-xs ${
                    step.active ? 'text-slate-300' : 'text-slate-500'
                  }`}>
                    {step.subtitle}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="ml-3 w-8 h-px bg-slate-600 flex-shrink-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            Aracınızın Markasını Seçin
          </h1>
          <p className="text-lg text-slate-300">
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
              className="w-full px-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700/50 text-white placeholder-slate-400"
            />
          </div>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="p-4 border border-slate-600 rounded-lg bg-slate-700/50 animate-pulse">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-600 rounded"></div>
                  <div className="h-4 bg-slate-600 rounded flex-1"></div>
                </div>
              </div>
            ))
          ) : (
            filteredBrands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`p-4 border rounded-lg text-left hover:border-blue-500 hover:bg-slate-700/50 transition-colors ${
                  selectedBrand === brand
                    ? 'border-blue-500 bg-slate-700/50'
                    : 'border-slate-600 bg-slate-800/50'
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
                          const target = e.currentTarget as HTMLImageElement;
                          target.style.display = 'none';
                          const nextElement = target.nextElementSibling as HTMLElement;
                          if (nextElement) {
                            nextElement.style.display = 'block';
                          }
                        }}
                      />
                      <span className="text-xs font-bold text-slate-400 hidden">{brand.charAt(0)}</span>
                    </div>
                    <span className="font-medium text-white">{brand}</span>
                  </div>
                  {selectedBrand === brand && (
                    <CheckCircle className="h-5 w-5 text-blue-400" />
                  )}
                </div>
              </button>
            ))
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="px-6 py-3 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700/50 transition-colors flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Geri
          </Link>
          
          <Link
            href={selectedBrand ? `/arac-degerle/step-2?brand=${encodeURIComponent(selectedBrand)}` : '#'}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center ${
              selectedBrand
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-slate-600 text-slate-400 cursor-not-allowed'
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
