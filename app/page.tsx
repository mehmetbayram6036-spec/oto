'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Car, Calculator, Shield, Clock, Users, Star, TrendingUp, DollarSign, Award, MessageCircle } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [modelYear, setModelYear] = useState('');
  const [brand, setBrand] = useState('');

  // Car brands list
  const carBrands = [
    'acura', 'alfa romeo', 'aston martin', 'audi', 'bentley', 'bmw', 'buick', 'cadillac',
    'chevrolet', 'chrysler', 'citroën', 'dodge', 'ferrari', 'fiat', 'ford', 'genesis',
    'gmc', 'honda', 'hyundai', 'infiniti', 'jaguar', 'jeep', 'kia', 'lamborghini',
    'land rover', 'lexus', 'lincoln', 'lotus', 'maserati', 'mazda', 'mclaren', 'mercedes-benz',
    'mini', 'mitsubishi', 'nissan', 'oldsmobile', 'peugeot', 'pontiac', 'porsche', 'ram',
    'renault', 'rolls-royce', 'saab', 'saturn', 'scion', 'seat', 'škoda', 'smart',
    'subaru', 'suzuki', 'tesla', 'toyota', 'volkswagen', 'volvo'
  ];

  // Generate years from 1990 to current year
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i <= currentYear - 1990; i++) {
    years.push(currentYear - i);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modelYear && brand) {
      router.push(`/arac-degerle?brand=${encodeURIComponent(brand)}&modelYear=${encodeURIComponent(modelYear)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  aracteklifi.com
                </h1>
                <div className="text-lg text-gray-500 font-medium">Araç Değerleme</div>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Ana Sayfa
              </Link>
              <Link href="/arac-degerle" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Araç Değerle
              </Link>
              <Link href="/iletisim" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                İletişim
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
              <Link 
                href="/arac-degerle"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Aracını Sat
              </Link>
              <a 
                href="https://wa.me/905443801545"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
                title="WhatsApp ile iletişim"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Car Image and Content */}
            <div className="text-center lg:text-left">
              {/* Car Image */}
              <div className="mb-8 flex justify-center lg:justify-start">
                <img 
                  src="/arac.png" 
                  alt="Araç Değerleme" 
                  className="w-64 h-48 object-contain"
                />
              </div>
              
              {/* Text Content Below Car Image */}
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Aracınızın Gerçek Değerini
                <span className="text-blue-600 block">Öğrenin</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl lg:max-w-none">
                aracteklifi.com ile aracınızın piyasa değerini dakikalar içinde öğrenin. 
                Güvenilir ve şeffaf değerleme sistemi ile aracınızı en iyi fiyata satın.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  href="/arac-degerle"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
                >
                  Hemen Değerle
                </Link>
              </div>
            </div>

            {/* Right Side - Car Valuation Form */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
              {/* Logo and Branding */}
              <div className="flex items-center mb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <Car className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600">B</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-900">aracteklifi.com</h2>
                  <p className="text-base text-gray-600">Araç Değerleme Platformu</p>
                </div>
              </div>

              {/* Main Call to Action */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Aracını aracteklifi.com güvencesi ile hemen sat,
                </h3>
                <p className="text-lg font-semibold text-blue-600">
                  Aracınıza kapınızda bakalım
                </p>
              </div>

              {/* Form Fields */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Model Year Select */}
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Car className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    value={modelYear}
                    onChange={(e) => setModelYear(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 backdrop-blur-sm appearance-none cursor-pointer text-gray-900"
                    required
                  >
                    <option value="">Model Yılı Seçin</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Brand Select */}
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-5 h-5 bg-gray-400 rounded-sm"></div>
                  </div>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 backdrop-blur-sm appearance-none cursor-pointer text-gray-900"
                    required
                  >
                    <option value="">Marka Seçin</option>
                    {carBrands.map((brandName) => (
                      <option key={brandName} value={brandName}>
                        {brandName}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                {/* Selected Brand Display */}
                {brand && (
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
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
                      <span className="text-xs font-bold text-gray-500 hidden">{brand.charAt(0)}</span>
                    </div>
                    <span className="font-medium text-gray-900">{brand}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={!modelYear || !brand}
                  className={`w-full py-4 rounded-lg font-bold text-lg transition-colors ${
                    modelYear && brand 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  ÜCRETSİZ TEKLİF AL
                </button>
              </form>

              {/* Background Note */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  Güvenli ve hızlı değerleme süreci
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sliders Section - Removed car image background */}
      <section className="py-16 bg-blue-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Değerleme Sürecinizi Keşfedin
            </h2>
            <p className="text-lg text-blue-100">
              Aracınızın değerini belirleyen faktörleri interaktif olarak inceleyin
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Slider 1: Kilometre Etkisi */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Kilometre Etkisi</h3>
                <p className="text-gray-600 text-sm">Aracınızın kilometresi değerini nasıl etkiler?</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">0 km</span>
                  <span className="text-sm font-medium text-gray-700">500.000 km</span>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 h-3 rounded-full transition-all duration-500" style={{width: '35%'}}></div>
                  </div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium">
                    175.000 km
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">₺285.000</div>
                  <div className="text-sm text-gray-600">Tahmini Değer</div>
                </div>
              </div>
            </div>

            {/* Slider 2: Yaş Etkisi */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Yaş Etkisi</h3>
                <p className="text-gray-600 text-sm">Aracınızın yaşı değerini nasıl etkiler?</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">2024</span>
                  <span className="text-sm font-medium text-gray-700">1990</span>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 h-3 rounded-full transition-all duration-500" style={{width: '60%'}}></div>
                  </div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium">
                    2018
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">₺320.000</div>
                  <div className="text-sm text-gray-600">Tahmini Değer</div>
                </div>
              </div>
            </div>

            {/* Slider 3: Durum Etkisi */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Durum Etkisi</h3>
                <p className="text-gray-600 text-sm">Aracınızın durumu değerini nasıl etkiler?</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Mükemmel</span>
                  <span className="text-sm font-medium text-gray-700">Kötü</span>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 h-3 rounded-full transition-all duration-500" style={{width: '75%'}}></div>
                  </div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-3 py-1 rounded-lg text-sm font-medium">
                    Çok İyi
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">₺295.000</div>
                  <div className="text-sm text-gray-600">Tahmini Değer</div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Demo */}
          <div className="mt-12 bg-white rounded-2xl p-8 text-gray-900 text-center shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Gerçek Zamanlı Değerleme</h3>
            <p className="text-gray-600 mb-6">
              Yukarıdaki sliders'ları kullanarak farklı senaryoları test edin ve aracınızın değerinin nasıl değiştiğini görün
            </p>
            <Link 
              href="/arac-degerle"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
            >
              Gerçek Değerleme Yapın
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Neden aracteklifi.com?
            </h2>
            <p className="text-lg text-gray-600">
              Binlerce kullanıcının güvendiği araç değerleme platformu
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Hızlı Değerleme
              </h3>
              <p className="text-gray-600">
                5 dakika içinde aracınızın detaylı değerleme raporunu alın
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Güvenilir Sonuçlar
              </h3>
              <p className="text-gray-600">
                Piyasa verilerine dayalı %95 doğruluk oranı ile değerleme
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                7/24 Hizmet
              </h3>
              <p className="text-gray-600">
                İstediğiniz zaman araç değerleme hizmetimizden yararlanın
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nasıl Çalışır?
            </h2>
            <p className="text-lg text-gray-600">
              3 basit adımda aracınızın değerini öğrenin
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Araç Bilgilerini Girin
              </h3>
              <p className="text-gray-600">
                Marka, model, yıl ve diğer detayları kolayca girin
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Anında Değerleme
              </h3>
              <p className="text-gray-600">
                Yapay zeka destekli sistem ile anında değerleme yapılır
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Detaylı Rapor Alın
              </h3>
              <p className="text-gray-600">
                Piyasa analizi ve satış önerileri ile birlikte raporunuzu alın
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">50,000+</div>
              <div className="text-blue-100">Değerlenen Araç</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Müşteri Memnuniyeti</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Destek Hizmeti</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">₺2M+</div>
              <div className="text-blue-100">Toplam İşlem Hacmi</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Aracınızın Değerini Öğrenmeye Hazır mısınız?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Ücretsiz değerleme hizmetimizden yararlanın ve aracınızı en iyi fiyata satın
          </p>
          <Link 
            href="/arac-degerle"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors inline-block"
          >
            Hemen Başlayın
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Car className="h-6 w-6 text-blue-400 mr-2" />
                <span className="text-4xl font-bold">aracteklifi.com</span>
              </div>
              <p className="text-gray-400">
                Türkiye'nin en güvenilir araç değerleme ve alış platformu
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Hizmetler</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/arac-degerle" className="hover:text-white">Araç Değerleme</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Şirket</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/iletisim" className="hover:text-white">İletişim</Link></li>
                <li><Link href="/gizlilik" className="hover:text-white">Gizlilik Politikası</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">İletişim</h3>
              <div className="space-y-2 text-gray-400">
                <p>aracteklifi.com@gmail.com</p>
                <p>0544 380 15 45</p>
                <p>İstanbul, Türkiye</p>
                <div className="flex space-x-3 mt-3">
                  <a 
                    href="https://wa.me/905443801545"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
                    title="WhatsApp"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.instagram.com/aracteklificom/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
                    title="Instagram"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 aracteklifi.com. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
