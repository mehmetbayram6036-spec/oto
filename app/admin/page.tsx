'use client';

import { useState, useEffect } from 'react';
import { Car, Settings, Palette, Users, BarChart3, Mail, Database } from 'lucide-react';

interface ThemeData {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  isActive: boolean;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [themes, setThemes] = useState<ThemeData[]>([
    {
      id: 'dark-corporate',
      name: 'Koyu Kurumsal',
      description: 'Profesyonel koyu tema',
      colors: { primary: '#1e40af', secondary: '#475569', accent: '#60a5fa' },
      isActive: true
    },
    {
      id: 'blue-corporate',
      name: 'Mavi Kurumsal',
      description: 'Klasik mavi kurumsal tema',
      colors: { primary: '#1e40af', secondary: '#475569', accent: '#60a5fa' },
      isActive: false
    },
    {
      id: 'green-corporate',
      name: 'Yeşil Kurumsal',
      description: 'Doğal yeşil kurumsal tema',
      colors: { primary: '#059669', secondary: '#475569', accent: '#34d399' },
      isActive: false
    },
    {
      id: 'purple-corporate',
      name: 'Mor Kurumsal',
      description: 'Modern mor kurumsal tema',
      colors: { primary: '#7c3aed', secondary: '#475569', accent: '#a78bfa' },
      isActive: false
    }
  ]);

  const [stats, setStats] = useState({
    totalValuations: 0,
    totalUsers: 0,
    totalEmails: 0,
    successRate: 0
  });

  useEffect(() => {
    // Load stats from localStorage or API
    const savedStats = localStorage.getItem('adminStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }

    // Load active theme
    const activeTheme = localStorage.getItem('activeTheme') || 'dark-corporate';
    setThemes(prev => prev.map(theme => ({
      ...theme,
      isActive: theme.id === activeTheme
    })));
  }, []);

  const activateTheme = (themeId: string) => {
    setThemes(prev => prev.map(theme => ({
      ...theme,
      isActive: theme.id === themeId
    })));
    
    // Save to localStorage
    localStorage.setItem('activeTheme', themeId);
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', themeId);
    
    // Show success message
    alert(`${themes.find(t => t.id === themeId)?.name} teması aktif edildi!`);
  };

  const saveStats = () => {
    localStorage.setItem('adminStats', JSON.stringify(stats));
    alert('İstatistikler kaydedildi!');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Car className="h-8 w-8 text-blue-400" />
              <div>
                <h1 className="text-2xl font-bold">Admin Panel</h1>
                <p className="text-slate-400">aracteklifi.com Yönetim Paneli</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-slate-400">Hoş geldiniz, Admin</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
              { id: 'themes', name: 'Tema Ayarları', icon: Palette },
              { id: 'users', name: 'Kullanıcılar', icon: Users },
              { id: 'emails', name: 'E-mail Ayarları', icon: Mail },
              { id: 'data', name: 'Veri Yönetimi', icon: Database }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-300'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Dashboard</h2>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400">Toplam Değerleme</p>
                    <p className="text-3xl font-bold text-blue-400">{stats.totalValuations}</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400">Toplam Kullanıcı</p>
                    <p className="text-3xl font-bold text-green-400">{stats.totalUsers}</p>
                  </div>
                  <Users className="h-8 w-8 text-green-400" />
                </div>
              </div>
              
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400">Gönderilen E-mail</p>
                    <p className="text-3xl font-bold text-purple-400">{stats.totalEmails}</p>
                  </div>
                  <Mail className="h-8 w-8 text-purple-400" />
                </div>
              </div>
              
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400">Başarı Oranı</p>
                    <p className="text-3xl font-bold text-yellow-400">%{stats.successRate}</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-yellow-400" />
                </div>
              </div>
            </div>

            {/* Stats Editor */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-xl font-bold mb-4">İstatistik Düzenle</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Toplam Değerleme
                  </label>
                  <input
                    type="number"
                    value={stats.totalValuations}
                    onChange={(e) => setStats(prev => ({ ...prev, totalValuations: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Toplam Kullanıcı
                  </label>
                  <input
                    type="number"
                    value={stats.totalUsers}
                    onChange={(e) => setStats(prev => ({ ...prev, totalUsers: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Gönderilen E-mail
                  </label>
                  <input
                    type="number"
                    value={stats.totalEmails}
                    onChange={(e) => setStats(prev => ({ ...prev, totalEmails: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Başarı Oranı (%)
                  </label>
                  <input
                    type="number"
                    value={stats.successRate}
                    onChange={(e) => setStats(prev => ({ ...prev, successRate: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  />
                </div>
              </div>
              <button
                onClick={saveStats}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Kaydet
              </button>
            </div>
          </div>
        )}

        {activeTab === 'themes' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Tema Ayarları</h2>
            <p className="text-slate-400">Sitenin görsel temasını değiştirin</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {themes.map((theme) => (
                <div
                  key={theme.id}
                  className={`bg-slate-800 rounded-lg p-6 border-2 transition-all ${
                    theme.isActive
                      ? 'border-blue-500 bg-slate-700/50'
                      : 'border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{theme.name}</h3>
                      <p className="text-slate-400">{theme.description}</p>
                    </div>
                    {theme.isActive && (
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">
                        Aktif
                      </span>
                    )}
                  </div>
                  
                  <div className="flex space-x-2 mb-4">
                    <div
                      className="w-8 h-8 rounded"
                      style={{ backgroundColor: theme.colors.primary }}
                    />
                    <div
                      className="w-8 h-8 rounded"
                      style={{ backgroundColor: theme.colors.secondary }}
                    />
                    <div
                      className="w-8 h-8 rounded"
                      style={{ backgroundColor: theme.colors.accent }}
                    />
                  </div>
                  
                  <button
                    onClick={() => activateTheme(theme.id)}
                    disabled={theme.isActive}
                    className={`w-full py-2 px-4 rounded-lg transition-colors ${
                      theme.isActive
                        ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {theme.isActive ? 'Aktif Tema' : 'Temayı Aktif Et'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Kullanıcı Yönetimi</h2>
            <p className="text-slate-400">Kullanıcı verilerini görüntüleyin ve yönetin</p>
            
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <p className="text-slate-400">Kullanıcı yönetimi özellikleri burada olacak...</p>
            </div>
          </div>
        )}

        {activeTab === 'emails' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">E-mail Ayarları</h2>
            <p className="text-slate-400">E-mail gönderme ayarlarını yapılandırın</p>
            
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    SMTP Sunucu
                  </label>
                  <input
                    type="text"
                    placeholder="smtp.gmail.com"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Port
                  </label>
                  <input
                    type="number"
                    placeholder="587"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    E-mail Adresi
                  </label>
                  <input
                    type="email"
                    placeholder="admin@aracteklifi.com"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Şifre
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  />
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  E-mail Ayarlarını Kaydet
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'data' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Veri Yönetimi</h2>
            <p className="text-slate-400">Sistem verilerini yönetin ve yedekleyin</p>
            
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="space-y-4">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors mr-4">
                  Veri Yedekle
                </button>
                <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors mr-4">
                  Veri Geri Yükle
                </button>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                  Tüm Verileri Temizle
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
