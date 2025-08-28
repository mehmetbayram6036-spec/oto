'use client';

import { useState, useEffect } from 'react';
import { Car, LogOut, Eye, Trash2 } from 'lucide-react';

interface CarData {
  id: string;
  brand: string;
  model: string;
  year: string;
  kilometer: string;
  fuelType: string;
  transmission: string;
  condition: string;
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  district: string;
  timestamp: string;
  estimatedValue?: number;
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [carData, setCarData] = useState<CarData[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCar, setSelectedCar] = useState<CarData | null>(null);

  // Admin bilgileri
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = '123Tema456';

  useEffect(() => {
    // Local storage'dan authentication durumunu kontrol et
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      loadCarData();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      loadCarData();
    } else {
      setError('Kullanıcı adı veya şifre hatalı!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    setCarData([]);
    setSelectedCar(null);
  };

  const loadCarData = async () => {
    setLoading(true);
    try {
      // Local storage'dan araç verilerini al
      const storedData = localStorage.getItem('carSubmissions');
      if (storedData) {
        const data = JSON.parse(storedData);
        setCarData(data);
      }
    } catch (error) {
      console.error('Veri yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };



  const deleteCarData = (id: string) => {
    const updatedData = carData.filter(car => car.id !== id);
    setCarData(updatedData);
    localStorage.setItem('carSubmissions', JSON.stringify(updatedData));
    if (selectedCar?.id === id) {
      setSelectedCar(null);
    }
  };

  const viewCarDetails = (car: CarData) => {
    setSelectedCar(car);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Car className="h-8 w-8 text-white" />
            </div>
                    <h1 className="text-2xl font-bold text-text-primary">Admin Paneli</h1>
        <p className="text-text-secondary">Giriş yaparak devam edin</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
                              <label className="block text-sm font-medium text-text-primary mb-2">
                  Kullanıcı Adı
                </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
                              <label className="block text-sm font-medium text-text-primary mb-2">
                  Şifre
                </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Car className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Paneli</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Çıkış Yap
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Araç Listesi */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Araç Değerleme Talepleri</h2>
              </div>
              
              {loading ? (
                <div className="p-6 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Yükleniyor...</p>
                </div>
              ) : carData.length === 0 ? (
                <div className="p-6 text-center">
                  <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Henüz araç değerleme talebi bulunmuyor.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {carData.map((car) => (
                    <div key={car.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Car className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">
                                {car.brand} {car.model}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {car.year} • {car.kilometer} km • {car.fuelType}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => viewCarDetails(car)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Detayları Görüntüle"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteCarData(car.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Sil"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                                             <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                         <span>{car.firstName} {car.lastName}</span>
                         <span>{new Date(car.timestamp).toLocaleString('tr-TR', {
                           year: 'numeric',
                           month: '2-digit',
                           day: '2-digit',
                           hour: '2-digit',
                           minute: '2-digit'
                         })}</span>
                       </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Detay Paneli */}
          <div className="lg:col-span-1">
            {selectedCar ? (
              <div className="bg-white rounded-lg shadow sticky top-8">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Araç Detayları</h3>
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {selectedCar.brand} {selectedCar.model}
                    </h4>
                    <p className="text-gray-600">{selectedCar.year} Model</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Kilometre</p>
                      <p className="text-gray-900">{selectedCar.kilometer} km</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Yakıt Tipi</p>
                      <p className="text-gray-900">{selectedCar.fuelType}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Vites</p>
                      <p className="text-gray-900">{selectedCar.transmission}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Durum</p>
                      <p className="text-gray-900">{selectedCar.condition}</p>
                    </div>
                  </div>

                  {selectedCar.estimatedValue && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-blue-600">Tahmini Değer</p>
                      <p className="text-2xl font-bold text-blue-900">
                        ₺{selectedCar.estimatedValue.toLocaleString()}
                      </p>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <h5 className="font-medium text-gray-900 mb-3">İletişim Bilgileri</h5>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">Ad Soyad:</span> {selectedCar.firstName} {selectedCar.lastName}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Telefon:</span> {selectedCar.phone}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Şehir:</span> {selectedCar.city}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">İlçe:</span> {selectedCar.district}
                      </p>
                    </div>
                  </div>

                                     <div className="text-xs text-gray-500">
                     Talep Tarihi: {new Date(selectedCar.timestamp).toLocaleString('tr-TR', {
                       year: 'numeric',
                       month: '2-digit',
                       day: '2-digit',
                       hour: '2-digit',
                       minute: '2-digit',
                       second: '2-digit'
                     })}
                   </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Detayları görüntülemek için bir araç seçin.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
