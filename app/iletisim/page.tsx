'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Car, Phone, Mail, Instagram, MapPin, Clock, MessageCircle, ArrowLeft } from 'lucide-react';

export default function Iletisim() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitMessage('Lütfen tüm gerekli alanları doldurun.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact-messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitMessage('Mesajınız başarıyla gönderildi!');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitMessage('Mesaj gönderilirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Mesaj gönderme hatası:', error);
      setSubmitMessage('Mesaj gönderilirken bir hata oluştu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Telefon',
      value: '0544 380 15 45',
      action: 'WhatsApp\'tan Yaz',
      actionIcon: MessageCircle,
      actionHref: 'https://wa.me/905443801545',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      actionColor: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: Mail,
      title: 'E-posta',
      value: 'aracteklifi.com@gmail.com',
      action: 'E-posta Gönder',
      actionIcon: Mail,
      actionHref: 'mailto:aracteklifi.com@gmail.com',
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600',
      actionColor: 'bg-red-500 hover:bg-red-600'
    },
    {
      icon: Instagram,
      title: 'Instagram',
      value: '@aracteklificom',
      action: 'Takip Et',
      actionIcon: Instagram,
      actionHref: 'https://www.instagram.com/aracteklificom/',
      bgColor: 'bg-gradient-to-r from-purple-100 to-pink-100',
      iconColor: 'text-purple-600',
      actionColor: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
    }
  ];

  const workingHours = [
    { day: 'Pazartesi - Cuma', hours: '09:00 - 18:00' },
    { day: 'Cumartesi', hours: '09:00 - 16:00' },
    { day: 'Pazar', hours: 'Kapalı' },
    { day: 'Acil Durumlar', hours: '7/24', special: true }
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
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-slate-300 hover:text-blue-400 font-medium transition-colors">
                Ana Sayfa
              </Link>
              <Link href="/arac-degerle" className="text-slate-300 hover:text-blue-400 font-medium transition-colors">
                Araç Değerle
              </Link>
              <Link href="/iletisim" className="text-blue-400 font-medium">
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
          <h1 className="text-4xl font-bold text-white mb-4">
            İletişim
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            aracteklifi.com ile iletişime geçin. Araç değerleme konusunda uzman ekibimiz size yardımcı olmaya hazır.
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {contactMethods.map((method, index) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-slate-600/30 hover:shadow-xl transition-all duration-300">
              <div className="text-center">
                <div className={`${method.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <method.icon className={`h-8 w-8 ${method.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {method.title}
                </h3>
                <p className="text-lg text-slate-300 mb-4">
                  {method.value}
                </p>
                <a 
                  href={method.actionHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center ${method.actionColor} text-white px-6 py-3 rounded-lg transition-colors`}
                >
                  <method.actionIcon className="h-5 w-5 mr-2" />
                  {method.action}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-slate-600/30 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Bize Ulaşın
          </h2>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700/50 text-white placeholder-slate-400"
                  placeholder="Adınız ve soyadınız"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700/50 text-white placeholder-slate-400"
                  placeholder="Telefon numaranız"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                E-posta *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700/50 text-white placeholder-slate-400"
                placeholder="E-posta adresiniz"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Mesaj *
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="w-full px-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700/50 text-white placeholder-slate-400"
                placeholder="Mesajınızı yazın..."
                required
              ></textarea>
            </div>
            {submitMessage && (
              <div className={`text-center p-3 rounded-lg ${
                submitMessage.includes('başarıyla') 
                  ? 'bg-green-900/50 text-green-300 border border-green-600/30' 
                  : 'bg-red-900/50 text-red-300 border border-red-600/30'
              }`}>
                {submitMessage}
              </div>
            )}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                  isSubmitting
                    ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? 'Gönderiliyor...' : 'Mesaj Gönder'}
              </button>
            </div>
          </form>
        </div>

        {/* Working Hours */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-slate-600/30">
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Çalışma Saatleri
            </h3>
            <div className="space-y-3 max-w-md mx-auto">
              {workingHours.map((schedule, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-slate-600/30 last:border-b-0">
                  <span className="text-slate-300">{schedule.day}:</span>
                  <span className={`font-medium ${schedule.special ? 'text-green-400' : 'text-white'}`}>
                    {schedule.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-16 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400">© 2024 aracteklifi.com. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}
