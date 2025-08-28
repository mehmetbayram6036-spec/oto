'use client';

import Link from 'next/link';
import { Car, Phone, Mail, Instagram, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function Iletisim() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <Car className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-text-primary">aracteklifi.com</h1>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-text-secondary hover:text-blue-600 font-medium">
                Ana Sayfa
              </Link>
              <Link href="/arac-degerle" className="text-text-secondary hover:text-blue-600 font-medium">
                Araç Değerle
              </Link>
              <Link href="/hakkimizda" className="text-text-secondary hover:text-blue-600 font-medium">
                Hakkımızda
              </Link>
              <Link href="/iletisim" className="text-blue-600 font-medium">
                İletişim
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-text-primary mb-4">
            İletişim
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            aracteklifi.com ile iletişime geçin. Araç değerleme konusunda uzman ekibimiz size yardımcı olmaya hazır.
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Phone */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Telefon
              </h3>
              <p className="text-lg text-gray-600 mb-4">
                0544 380 15 45
              </p>
              <a 
                href="https://wa.me/905443801545"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp'tan Yaz
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                E-posta
              </h3>
              <p className="text-lg text-gray-600 mb-4">
                aracteklifi.com@gmail.com
              </p>
              <a 
                                  href="mailto:aracteklifi.com@gmail.com"
                className="inline-flex items-center bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
              >
                <Mail className="h-5 w-5 mr-2" />
                E-posta Gönder
              </a>
            </div>
          </div>

          {/* Instagram */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Instagram className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Instagram
              </h3>
              <p className="text-lg text-gray-600 mb-4">
                                  @aracteklificom
              </p>
              <a 
                                  href="https://www.instagram.com/aracteklificom/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
              >
                <Instagram className="h-5 w-5 mr-2" />
                Takip Et
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Bize Ulaşın
          </h2>
          <form className="max-w-2xl mx-auto space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Adınız ve soyadınız"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Telefon numaranız"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-posta
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="E-posta adresiniz"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Konu
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Konu seçin</option>
                <option value="arac-degerleme">Araç Değerleme</option>
                <option value="arac-satis">Araç Satış</option>
                <option value="genel-bilgi">Genel Bilgi</option>
                <option value="sikayet">Şikayet/Öneri</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mesaj
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Mesajınızı yazın..."
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Mesaj Gönder
              </button>
            </div>
          </form>
        </div>

        {/* Working Hours */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Çalışma Saatleri
            </h3>
            <div className="space-y-3 max-w-md mx-auto">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Pazartesi - Cuma:</span>
                <span className="font-medium">09:00 - 18:00</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Cumartesi:</span>
                <span className="font-medium">09:00 - 16:00</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Pazar:</span>
                <span className="font-medium">Kapalı</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Acil Durumlar:</span>
                <span className="font-medium text-green-600">7/24</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                      <p>&copy; 2024 aracteklifi.com. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}
