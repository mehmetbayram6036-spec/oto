'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Car, CarFront, CheckCircle, Car as CarIcon } from 'lucide-react';

function Step3HasarContent() {
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand') || '';
  const model = searchParams.get('model') || '';
  const year = searchParams.get('year') || '';

  // Hasar durumu seçenekleri
  const damageOptions = [
    { id: 'orijinal', label: 'Orijinal', color: 'bg-green-500', icon: '✓' },
    { id: 'lokal-boyalı', label: 'Lokal Boyalı', color: 'bg-yellow-500', icon: '⚠' },
    { id: 'değişen', label: 'Değişen', color: 'bg-red-500', icon: '✗' }
  ];

  // Araç parçaları - daha organize gruplar
  const carParts = [
    { 
      id: 'sol-on-camurluk', 
      name: 'Sol Ön Çamurluk',
      icon: CarIcon,
      category: 'Ön',
      position: 'left-front'
    },
    { 
      id: 'sol-on-kapı', 
      name: 'Sol Ön Kapı',
      icon: CarIcon,
      category: 'Ön',
      position: 'left-front-door'
    },
    { 
      id: 'sağ-on-camurluk', 
      name: 'Sağ Ön Çamurluk',
      icon: CarIcon,
      category: 'Ön',
      position: 'right-front'
    },
    { 
      id: 'sağ-on-kapı', 
      name: 'Sağ Ön Kapı',
      icon: CarIcon,
      category: 'Ön',
      position: 'right-front-door'
    },
    { 
      id: 'sol-arka-camurluk', 
      name: 'Sol Arka Çamurluk',
      icon: CarIcon,
      category: 'Arka',
      position: 'left-rear'
    },
    { 
      id: 'sol-arka-kapı', 
      name: 'Sol Arka Kapı',
      icon: CarIcon,
      category: 'Arka',
      position: 'left-rear-door'
    },
    { 
      id: 'sağ-arka-camurluk', 
      name: 'Sağ Arka Çamurluk',
      icon: CarIcon,
      category: 'Arka',
      position: 'right-rear'
    },
    { 
      id: 'sağ-arka-kapı', 
      name: 'Sağ Arka Kapı',
      icon: CarIcon,
      category: 'Arka',
      position: 'right-rear-door'
    },
    { 
      id: 'kaput', 
      name: 'Kaput',
      icon: CarFront,
      category: 'Üst',
      position: 'hood'
    },
    { 
      id: 'tavan', 
      name: 'Tavan',
      icon: CarFront,
      category: 'Üst',
      position: 'roof'
    },
    { 
      id: 'bagaj', 
      name: 'Bagaj',
      icon: CarIcon,
      category: 'Arka',
      position: 'trunk'
    }
  ];

  // Her parça için seçilen durumu sakla
  const [selectedDamages, setSelectedDamages] = useState<Record<string, string>>({});
  
  // Yeni alanlar için state'ler
  const [agirHasar, setAgirHasar] = useState('');
  const [tramerDurumu, setTramerDurumu] = useState('');
  const [tramerTutari, setTramerTutari] = useState('');
  const [kompleOrijinal, setKompleOrijinal] = useState('');

  const handleDamageSelect = (partId: string, damageType: string) => {
    setSelectedDamages(prev => ({
      ...prev,
      [partId]: damageType
    }));
  };

  // Form validasyonu
  const hasAnySelection = Object.keys(selectedDamages).length > 0;
  const isKompleOrijinal = kompleOrijinal === 'Evet';
  
  // Komple orijinal seçilmişse parça durumları zorunlu değil, seçilmemişse zorunlu
  const isFormValid = agirHasar && tramerDurumu && 
    (tramerDurumu === 'Yok' || (tramerDurumu === 'Var' && tramerTutari)) &&
    (isKompleOrijinal || hasAnySelection);
  
  // Ağır hasar kontrolü
  const hasAgirHasar = agirHasar === 'Var';

  // Araç çizimi için hasar durumuna göre renk belirleme
  const getDamageColor = (partId: string) => {
    const damage = selectedDamages[partId];
    if (!damage) return 'bg-gray-300';
    switch (damage) {
      case 'orijinal': return 'bg-green-400';
      case 'lokal-boyalı': return 'bg-yellow-400';
      case 'değişen': return 'bg-red-400';
      default: return 'bg-gray-300';
    }
  };

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
              Adım 4 / 7
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
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  4
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">Hasar Bilgileri</div>
                  <div className="text-xs text-gray-500">Araç durumu</div>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Car className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Hasar Bilgileri
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            {brand} {model} ({year}) aracınızın parça durumlarını belirtin
          </p>
          <p className="text-sm text-gray-500">
            Bu adımı atlayabilir veya sadece bildiğiniz hasarları işaretleyebilirsiniz
          </p>
        </div>

        {/* Damage Options Legend */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            Durum Seçenekleri
          </h2>
          
          {/* Komple Orijinal */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Komple Orijinal
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setKompleOrijinal('Evet')}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  kompleOrijinal === 'Evet'
                    ? 'border-green-600 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                Evet
              </button>
              <button
                onClick={() => setKompleOrijinal('Hayır')}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  kompleOrijinal === 'Hayır'
                    ? 'border-gray-600 bg-gray-50 text-gray-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                Hayır
              </button>
            </div>
            {kompleOrijinal === 'Evet' && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700 font-medium">
                  ✅ Komple orijinal araç seçildi. Parça durumları seçimi zorunlu değildir.
                </p>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {damageOptions.map((option) => (
              <div key={option.id} className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div className={`w-6 h-6 ${option.color} rounded-full mr-4 flex items-center justify-center text-white text-xs font-bold`}>
                  {option.icon}
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-700">{option.label}</span>
                  <p className="text-xs text-gray-500 mt-1">
                    {option.id === 'orijinal' && 'Hiç hasar almamış'}
                    {option.id === 'lokal-boyalı' && 'Küçük hasar, boya yapılmış'}
                    {option.id === 'değişen' && 'Parça değiştirilmiş'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

         {/* Car Diagram and Parts Selection */}
         <div className="grid lg:grid-cols-2 gap-8 mb-8">
                       {/* Car Diagram */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Araç Görünümü</h2>
              <div className="relative w-full h-80 bg-gray-50 rounded-lg flex items-center justify-center">
                {/* Araç resmi */}
                <div className="relative w-80 h-60">
                  <img 
                    src="/arac.png" 
                    alt="Araç görünümü" 
                    className="w-full h-full object-contain rotate-180"
                  />
                  
                  {/* Sol ön çamurluk */}
                  <div 
                    className={`absolute top-8 left-21 w-4 h-11 rounded-lg transition-all duration-300 ${
                      selectedDamages['sol-on-camurluk'] ? `opacity-60 ${getDamageColor('sol-on-camurluk')}` : 'opacity-0'
                    }`}
                    title="Sol Ön Çamurluk"
                  ></div>
                  
                  {/* Sol ön kapı */}
                  <div 
                    className={`absolute top-22 left-22 w-3 h-12 rounded-lg transition-all duration-300 ${
                      selectedDamages['sol-on-kapı'] ? `opacity-60 ${getDamageColor('sol-on-kapı')}` : 'opacity-0'
                    }`}
                    title="Sol Ön Kapı"
                  ></div>
                  
                  {/* Sağ ön çamurluk */}
                  <div 
                    className={`absolute top-8 right-21 w-4 h-11 rounded-lg transition-all duration-300 ${
                      selectedDamages['sağ-on-camurluk'] ? `opacity-60 ${getDamageColor('sağ-on-camurluk')}` : 'opacity-0'
                    }`}
                    title="Sağ Ön Çamurluk"
                  ></div>
                  
                  {/* Sağ ön kapı */}
                  <div 
                    className={`absolute top-21 right-20 w-3 h-12 rounded-lg transition-all duration-300 ${
                      selectedDamages['sağ-on-kapı'] ? `opacity-60 ${getDamageColor('sağ-on-kapı')}` : 'opacity-0'
                    }`}
                    title="Sağ Ön Kapı"
                  ></div>
                  
                  {/* Sol arka çamurluk */}
                  <div 
                    className={`absolute bottom-8 left-23 w-4 h-11 rounded-lg transition-all duration-300 ${
                      selectedDamages['sol-arka-camurluk'] ? `opacity-60 ${getDamageColor('sol-arka-camurluk')}` : 'opacity-0'
                    }`}
                    title="Sol Arka Çamurluk"
                  ></div>
                  
                  {/* Sol arka kapı */}
                  <div 
                    className={`absolute bottom-14 left-26 w-3 h-12 rounded-lg transition-all duration-300 ${
                      selectedDamages['sol-arka-kapı'] ? `opacity-60 ${getDamageColor('sol-arka-kapı')}` : 'opacity-0'
                    }`}
                    title="Sol Arka Kapı"
                  ></div>
                  
                  {/* Sağ arka çamurluk */}
                  <div 
                    className={`absolute bottom-7 right-21 w-4 h-11 rounded-lg transition-all duration-300 ${
                      selectedDamages['sağ-arka-camurluk'] ? `opacity-60 ${getDamageColor('sağ-arka-camurluk')}` : 'opacity-0'
                    }`}
                    title="Sağ Arka Çamurluk"
                  ></div>
                  
                  {/* Sağ arka kapı */}
                  <div 
                    className={`absolute bottom-13 right-22 w-3 h-12 rounded-lg transition-all duration-300 ${
                      selectedDamages['sağ-arka-kapı'] ? `opacity-60 ${getDamageColor('sağ-arka-kapı')}` : 'opacity-0'
                    }`}
                    title="Sağ Arka Kapı"
                  ></div>
                  
                  {/* Tavan (resmin ortası) */}
                  <div 
                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-y-2 w-15 h-7 rounded-lg transition-all duration-300 ${
                      selectedDamages['tavan'] ? `opacity-60 ${getDamageColor('tavan')}` : 'opacity-0'
                    }`}
                    title="Tavan"
                  ></div>
                  
                  {/* Kaput (resmin önü - üst kısım) */}
                  <div 
                    className={`absolute top-13 left-1/2 transform -translate-x-1/2 -translate-x-0.5 w-16 h-8 rounded-lg transition-all duration-300 ${
                      selectedDamages['kaput'] ? `opacity-60 ${getDamageColor('kaput')}` : 'opacity-0'
                    }`}
                    title="Kaput"
                  ></div>
                  
                  {/* Bagaj (resmin arkası - alt kısım) */}
                  <div 
                    className={`absolute bottom-9 left-1/2 transform -translate-x-1/2 -translate-x-3 w-11 h-3 rounded-lg transition-all duration-300 ${
                      selectedDamages['bagaj'] ? `opacity-60 ${getDamageColor('bagaj')}` : 'opacity-0'
                    }`}
                    title="Bagaj"
                  ></div>
                </div>
              </div>
             
             {/* Renk açıklamaları */}
             <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
               <div className="flex items-center">
                 <div className="w-3 h-3 bg-green-400 rounded mr-1"></div>
                 <span>Orijinal</span>
               </div>
               <div className="flex items-center">
                 <div className="w-3 h-3 bg-yellow-400 rounded mr-1"></div>
                 <span>Boyalı</span>
               </div>
               <div className="flex items-center">
                 <div className="w-3 h-3 bg-red-400 rounded mr-1"></div>
                 <span>Değişen</span>
               </div>
             </div>
           </div>
           
           {/* Parts List */}
           <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
             <h2 className="text-xl font-semibold text-gray-900 mb-6">Parça Durumları</h2>
             
             {!isKompleOrijinal && (
               <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                 <p className="text-sm text-blue-700 font-medium">
                   ⚠️ Komple orijinal seçilmedi. Lütfen en az bir parça durumu seçin.
                 </p>
               </div>
             )}
             
             {/* Ön Parçalar */}
             <div className="mb-6">
               <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                 <CarFront className="h-5 w-5 text-blue-500 mr-2" />
                 Ön Parçalar
               </h3>
               <div className="space-y-3">
                 {carParts.filter(part => part.category === 'Ön').map((part) => (
                   <div key={part.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors bg-gray-50">
                     <div className="flex items-center">
                       <part.icon className="h-4 w-4 text-gray-500 mr-3" />
                       <span className="text-sm font-medium text-gray-900">{part.name}</span>
                     </div>
                     <div className="flex gap-2">
                       {damageOptions.map((option) => (
                         <button
                           key={option.id}
                           onClick={() => handleDamageSelect(part.id, option.id)}
                           className={`w-6 h-6 ${option.color} rounded-full flex items-center justify-center text-white text-xs font-bold transition-all hover:scale-110 ${
                             selectedDamages[part.id] === option.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                           }`}
                         >
                           {option.icon}
                         </button>
                       ))}
                     </div>
                   </div>
                 ))}
               </div>
             </div>

             {/* Arka Parçalar */}
             <div className="mb-6">
               <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                 <CarIcon className="h-5 w-5 text-green-500 mr-2" />
                 Arka Parçalar
               </h3>
               <div className="space-y-3">
                 {carParts.filter(part => part.category === 'Arka').map((part) => (
                   <div key={part.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-green-300 transition-colors bg-gray-50">
                     <div className="flex items-center">
                       <part.icon className="h-4 w-4 text-gray-500 mr-3" />
                       <span className="text-sm font-medium text-gray-900">{part.name}</span>
                     </div>
                     <div className="flex gap-2">
                       {damageOptions.map((option) => (
                         <button
                           key={option.id}
                           onClick={() => handleDamageSelect(part.id, option.id)}
                           className={`w-6 h-6 ${option.color} rounded-full flex items-center justify-center text-white text-xs font-bold transition-all hover:scale-110 ${
                             selectedDamages[part.id] === option.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                           }`}
                         >
                           {option.icon}
                         </button>
                       ))}
                     </div>
                   </div>
                 ))}
               </div>
             </div>

             {/* Üst Parçalar */}
             <div>
               <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                 <Car className="h-5 w-5 text-purple-500 mr-2" />
                 Üst Parçalar
               </h3>
               <div className="space-y-3">
                 {carParts.filter(part => part.category === 'Üst').map((part) => (
                   <div key={part.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors bg-gray-50">
                     <div className="flex items-center">
                       <part.icon className="h-4 w-4 text-gray-500 mr-3" />
                       <span className="text-sm font-medium text-gray-900">{part.name}</span>
                     </div>
                     <div className="flex gap-2">
                       {damageOptions.map((option) => (
                         <button
                           key={option.id}
                           onClick={() => handleDamageSelect(part.id, option.id)}
                           className={`w-6 h-6 ${option.color} rounded-full flex items-center justify-center text-white text-xs font-bold transition-all hover:scale-110 ${
                             selectedDamages[part.id] === option.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                           }`}
                         >
                           {option.icon}
                         </button>
                       ))}
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           </div>
         </div>



        {/* Yeni Alanlar */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Genel Hasar Durumu</h2>
          
          {/* Ağır Hasar */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Ağır Hasar *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setAgirHasar('Var')}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  agirHasar === 'Var'
                    ? 'border-red-600 bg-red-50 text-red-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                Var
              </button>
              <button
                onClick={() => setAgirHasar('Yok')}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  agirHasar === 'Yok'
                    ? 'border-green-600 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                Yok
              </button>
            </div>
            {hasAgirHasar && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700 font-medium">
                  ⚠️ Ağır hasarlı araçlar için değerleme yapılmamaktadır.
                </p>
              </div>
            )}
          </div>

          {/* Tramer Durumu */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Tramer Durumu *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setTramerDurumu('Var');
                  setTramerTutari('');
                }}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  tramerDurumu === 'Var'
                    ? 'border-orange-600 bg-orange-50 text-orange-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                Var
              </button>
              <button
                onClick={() => {
                  setTramerDurumu('Yok');
                  setTramerTutari('');
                }}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  tramerDurumu === 'Yok'
                    ? 'border-green-600 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                Yok
              </button>
            </div>
            
            {/* Tramer Tutarı */}
            {tramerDurumu === 'Var' && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tramer Tutarı (TL) *
                </label>
                <input
                  type="number"
                  value={tramerTutari}
                  onChange={(e) => setTramerTutari(e.target.value)}
                  placeholder="Örn: 50000"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link
            href={`/arac-degerle/step-3?brand=${encodeURIComponent(brand)}&model=${encodeURIComponent(model)}&year=${year}`}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Geri
          </Link>
          
          {/* Continue Button */}
          <Link
            href={!hasAgirHasar && isFormValid ? `/arac-degerle/step-4?brand=${encodeURIComponent(brand)}&model=${encodeURIComponent(model)}&year=${year}&hasar=${encodeURIComponent(JSON.stringify(selectedDamages))}&agirHasar=${encodeURIComponent(agirHasar)}&tramerDurumu=${encodeURIComponent(tramerDurumu)}&tramerTutari=${encodeURIComponent(tramerTutari)}&kompleOrijinal=${encodeURIComponent(kompleOrijinal)}` : '#'}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center ${
              !hasAgirHasar && isFormValid
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

export default function Step3Hasar() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Yükleniyor...</h1>
        </div>
      </div>
    }>
      <Step3HasarContent />
    </Suspense>
  );
}
