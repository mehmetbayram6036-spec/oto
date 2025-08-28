'use client';

import { useState, useEffect } from 'react';
import { 
  Settings, 
  Palette, 
  Users, 
  BarChart3, 
  Mail, 
  Database,
  Trash2,
  Download,
  Upload,
  Save,
  Eye,
  Edit
} from 'lucide-react';

interface Theme {
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

interface CarSubmission {
  id: string;
  brand: string;
  model: string;
  year: string;
  firstName: string;
  lastName: string;
  phone: string;
  carValue: number;
  created_at: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
}

interface JsonData {
  id: string;
  name: string;
  data: string;
  description: string;
  updated_at: string;
}

interface AdminStats {
  id: string;
  totalValuations: number;
  totalUsers: number;
  totalEmails: number;
  successRate: number;
  updated_at: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [themes, setThemes] = useState<Theme[]>([
    {
      id: 'dark-corporate',
      name: 'Koyu Kurumsal',
      description: 'Profesyonel koyu tema',
      colors: { primary: '#1e293b', secondary: '#334155', accent: '#3b82f6' },
      isActive: true
    },
    {
      id: 'blue-corporate',
      name: 'Mavi Kurumsal',
      description: 'Mavi tonlarında kurumsal tema',
      colors: { primary: '#1e40af', secondary: '#3b82f6', accent: '#60a5fa' },
      isActive: false
    },
    {
      id: 'green-corporate',
      name: 'Yeşil Kurumsal',
      description: 'Yeşil tonlarında kurumsal tema',
      colors: { primary: '#059669', secondary: '#10b981', accent: '#34d399' },
      isActive: false
    },
    {
      id: 'purple-corporate',
      name: 'Mor Kurumsal',
      description: 'Mor tonlarında kurumsal tema',
      colors: { primary: '#7c3aed', secondary: '#8b5cf6', accent: '#a78bfa' },
      isActive: false
    }
  ]);

  const [stats, setStats] = useState<AdminStats>({
    id: '1',
    totalValuations: 1250,
    totalUsers: 890,
    totalEmails: 2340,
    successRate: 95,
    updated_at: new Date().toISOString()
  });

  const [carSubmissions, setCarSubmissions] = useState<CarSubmission[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [jsonData, setJsonData] = useState<JsonData[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // JSON yönetimi için state'ler
  const [selectedJsonName, setSelectedJsonName] = useState('');
  const [jsonContent, setJsonContent] = useState('');
  const [jsonDescription, setJsonDescription] = useState('');
  const [showJsonEditor, setShowJsonEditor] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Admin istatistiklerini yükle
      const statsResponse = await fetch('/api/admin-stats');
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        if (statsData.data) {
          setStats(statsData.data);
        }
      }

      // Araç değerleme taleplerini yükle
      const submissionsResponse = await fetch('/api/car-submissions');
      if (submissionsResponse.ok) {
        const submissionsData = await submissionsResponse.json();
        setCarSubmissions(submissionsData.data || []);
      }

      // İletişim mesajlarını yükle
      const messagesResponse = await fetch('/api/contact-messages');
      if (messagesResponse.ok) {
        const messagesData = await messagesResponse.json();
        setContactMessages(messagesData.data || []);
      }

      // JSON verilerini yükle
      const jsonResponse = await fetch('/api/json-data');
      if (jsonResponse.ok) {
        const jsonData = await jsonResponse.json();
        setJsonData(jsonData.data || []);
      }

    } catch (error) {
      console.error('Veri yüklenirken hata:', error);
      setMessage('Veri yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const activateTheme = async (themeId: string) => {
    try {
      const updatedThemes = themes.map(theme => ({
        ...theme,
        isActive: theme.id === themeId
      }));
      setThemes(updatedThemes);

      // Tema ayarını veritabanına kaydet
      await fetch('/api/system-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'active_theme',
          value: themeId,
          description: 'Aktif site teması'
        })
      });

      // DOM'a tema uygula
      document.documentElement.setAttribute('data-theme', themeId);
      
      // LocalStorage'a kaydet
      localStorage.setItem('active_theme', themeId);
      
      setMessage('Tema başarıyla değiştirildi');
      
      // Sayfayı yenile (tema değişikliğinin tam olarak uygulanması için)
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Tema değiştirilirken hata:', error);
      setMessage('Tema değiştirilirken bir hata oluştu');
    }
  };

  const saveStats = async () => {
    try {
      const response = await fetch('/api/admin-stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stats)
      });

      if (response.ok) {
        setMessage('İstatistikler başarıyla güncellendi');
      } else {
        setMessage('İstatistikler güncellenirken bir hata oluştu');
      }
    } catch (error) {
      console.error('İstatistikler kaydedilirken hata:', error);
      setMessage('İstatistikler kaydedilirken bir hata oluştu');
    }
  };

  const deleteCarSubmission = async (id: string) => {
    if (!confirm('Bu araç değerleme talebini silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/car-submissions?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setCarSubmissions(prev => prev.filter(sub => sub.id !== id));
        setMessage('Araç değerleme talebi başarıyla silindi');
      } else {
        setMessage('Araç değerleme talebi silinirken bir hata oluştu');
      }
    } catch (error) {
      console.error('Araç değerleme talebi silinirken hata:', error);
      setMessage('Araç değerleme talebi silinirken bir hata oluştu');
    }
  };

  const deleteContactMessage = async (id: string) => {
    if (!confirm('Bu iletişim mesajını silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/contact-messages?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setContactMessages(prev => prev.filter(msg => msg.id !== id));
        setMessage('İletişim mesajı başarıyla silindi');
      } else {
        setMessage('İletişim mesajı silinirken bir hata oluştu');
      }
    } catch (error) {
      console.error('İletişim mesajı silinirken hata:', error);
      setMessage('İletişim mesajı silinirken bir hata oluştu');
    }
  };

  const loadJsonData = async (name: string) => {
    try {
      const response = await fetch(`/api/json-data?name=${name}`);
      if (response.ok) {
        const data = await response.json();
        if (data.data) {
          setSelectedJsonName(data.data.name);
          setJsonContent(data.data.data);
          setJsonDescription(data.data.description || '');
          setShowJsonEditor(true);
        }
      }
    } catch (error) {
      console.error('JSON veri yüklenirken hata:', error);
      setMessage('JSON veri yüklenirken bir hata oluştu');
    }
  };

  const saveJsonData = async () => {
    if (!selectedJsonName || !jsonContent) {
      setMessage('JSON adı ve içeriği gerekli');
      return;
    }

    try {
      // JSON formatını kontrol et
      JSON.parse(jsonContent);

      const response = await fetch('/api/json-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: selectedJsonName,
          data: jsonContent,
          description: jsonDescription
        })
      });

      if (response.ok) {
        setMessage('JSON veri başarıyla kaydedildi');
        setShowJsonEditor(false);
        loadData(); // Listeyi yenile
      } else {
        setMessage('JSON veri kaydedilirken bir hata oluştu');
      }
    } catch (error) {
      setMessage('Geçersiz JSON formatı');
    }
  };

  const deleteJsonData = async (name: string) => {
    if (!confirm('Bu JSON veriyi silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/json-data?name=${name}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setJsonData(prev => prev.filter(item => item.name !== name));
        setMessage('JSON veri başarıyla silindi');
      } else {
        setMessage('JSON veri silinirken bir hata oluştu');
      }
    } catch (error) {
      console.error('JSON veri silinirken hata:', error);
      setMessage('JSON veri silinirken bir hata oluştu');
    }
  };

  const exportData = (data: any[], filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold">Admin Panel</h1>
              <p className="text-slate-400">aracteklifi.com Yönetim Paneli</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400">Hoş geldiniz</p>
              <p className="text-lg font-semibold">Yönetici</p>
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
              { id: 'emails', name: 'E-posta Ayarları', icon: Mail },
              { id: 'data', name: 'Veri Yönetimi', icon: Database }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-slate-400 hover:text-slate-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Message */}
      {message && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-blue-600 text-white px-4 py-3 rounded-lg">
            {message}
          </div>
        </div>
      )}

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-slate-400">Yükleniyor...</p>
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && !loading && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-slate-800 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-slate-400">Toplam Değerleme</p>
                    <p className="text-2xl font-bold">{stats.totalValuations}</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-600 rounded-lg">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-slate-400">Toplam Kullanıcı</p>
                    <p className="text-2xl font-bold">{stats.totalUsers}</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-600 rounded-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-slate-400">Gönderilen E-posta</p>
                    <p className="text-2xl font-bold">{stats.totalEmails}</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-600 rounded-lg">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-slate-400">Başarı Oranı</p>
                    <p className="text-2xl font-bold">%{stats.successRate}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">İstatistik Düzenle</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Toplam Değerleme
                  </label>
                  <input
                    type="number"
                    value={stats.totalValuations}
                    onChange={(e) => setStats(prev => ({ ...prev, totalValuations: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Gönderilen E-posta
                  </label>
                  <input
                    type="number"
                    value={stats.totalEmails}
                    onChange={(e) => setStats(prev => ({ ...prev, totalEmails: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

        {/* Theme Settings Tab */}
        {activeTab === 'themes' && !loading && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Tema Ayarları</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {themes.map((theme) => (
                <div
                  key={theme.id}
                  className={`bg-slate-800 rounded-lg p-6 border-2 ${
                    theme.isActive ? 'border-blue-500' : 'border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{theme.name}</h3>
                    {theme.isActive && (
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">
                        Aktif
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 mb-4">{theme.description}</p>
                  <div className="flex space-x-2 mb-4">
                    <div
                      className="w-8 h-8 rounded"
                      style={{ backgroundColor: theme.colors.primary }}
                    ></div>
                    <div
                      className="w-8 h-8 rounded"
                      style={{ backgroundColor: theme.colors.secondary }}
                    ></div>
                    <div
                      className="w-8 h-8 rounded"
                      style={{ backgroundColor: theme.colors.accent }}
                    ></div>
                  </div>
                  {!theme.isActive && (
                    <button
                      onClick={() => activateTheme(theme.id)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Aktif Et
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && !loading && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Araç Değerleme Talepleri</h2>
              <button
                onClick={() => exportData(carSubmissions, 'car-submissions.json')}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Dışa Aktar</span>
              </button>
            </div>
            <div className="bg-slate-800 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                        Araç Bilgileri
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                        Kişi Bilgileri
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                        Değer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                        Tarih
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                        İşlemler
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {carSubmissions.map((submission) => (
                      <tr key={submission.id}>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium">{submission.brand} {submission.model}</p>
                            <p className="text-slate-400">{submission.year}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium">{submission.firstName} {submission.lastName}</p>
                            <p className="text-slate-400">{submission.phone}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-green-400 font-semibold">
                            ₺{submission.carValue?.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-400">
                          {new Date(submission.created_at).toLocaleDateString('tr-TR')}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => deleteCarSubmission(submission.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Email Settings Tab */}
        {activeTab === 'emails' && !loading && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">İletişim Mesajları</h2>
              <button
                onClick={() => exportData(contactMessages, 'contact-messages.json')}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Dışa Aktar</span>
              </button>
            </div>
            <div className="bg-slate-800 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                        Kişi Bilgileri
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                        Mesaj
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                        Tarih
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                        İşlemler
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {contactMessages.map((message) => (
                      <tr key={message.id}>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium">{message.name}</p>
                            <p className="text-slate-400">{message.email}</p>
                            <p className="text-slate-400">{message.phone}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm max-w-xs truncate">{message.message}</p>
                        </td>
                        <td className="px-6 py-4 text-slate-400">
                          {new Date(message.created_at).toLocaleDateString('tr-TR')}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => deleteContactMessage(message.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Data Management Tab */}
        {activeTab === 'data' && !loading && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">JSON Veri Yönetimi</h2>
              <button
                onClick={() => setShowJsonEditor(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Upload className="h-4 w-4" />
                <span>Yeni JSON Ekle</span>
              </button>
            </div>

            {/* JSON Editor Modal */}
            {showJsonEditor && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-slate-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                  <h3 className="text-xl font-bold mb-4">JSON Veri Düzenle</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">
                        JSON Adı
                      </label>
                      <input
                        type="text"
                        value={selectedJsonName}
                        onChange={(e) => setSelectedJsonName(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="örn: car-models"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">
                        Açıklama
                      </label>
                      <input
                        type="text"
                        value={jsonDescription}
                        onChange={(e) => setJsonDescription(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="JSON verinin açıklaması"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">
                        JSON İçeriği
                      </label>
                      <textarea
                        value={jsonContent}
                        onChange={(e) => setJsonContent(e.target.value)}
                        rows={15}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                        placeholder='{"key": "value"}'
                      />
                    </div>
                  </div>
                  <div className="flex space-x-4 mt-6">
                    <button
                      onClick={saveJsonData}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>Kaydet</span>
                    </button>
                    <button
                      onClick={() => setShowJsonEditor(false)}
                      className="bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      İptal
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jsonData.map((item) => (
                <div key={item.id} className="bg-slate-800 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => loadJsonData(item.name)}
                        className="text-blue-400 hover:text-blue-300"
                        title="Düzenle"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteJsonData(item.name)}
                        className="text-red-400 hover:text-red-300"
                        title="Sil"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  {item.description && (
                    <p className="text-slate-400 text-sm mb-4">{item.description}</p>
                  )}
                  <div className="text-xs text-slate-500">
                    Son güncelleme: {new Date(item.updated_at).toLocaleDateString('tr-TR')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
