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
  Edit,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  DollarSign
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
    id: '',
    totalValuations: 0,
    totalUsers: 0,
    totalEmails: 0,
    successRate: 0,
    updated_at: ''
  });

  const [carSubmissions, setCarSubmissions] = useState<CarSubmission[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [jsonData, setJsonData] = useState<JsonData[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [selectedJsonName, setSelectedJsonName] = useState('');
  const [jsonContent, setJsonContent] = useState('');
  const [jsonDescription, setJsonDescription] = useState('');
  const [showJsonEditor, setShowJsonEditor] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [statsRes, submissionsRes, messagesRes, jsonRes] = await Promise.all([
        fetch('/api/admin-stats'),
        fetch('/api/car-submissions'),
        fetch('/api/contact-messages'),
        fetch('/api/json-data')
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      if (submissionsRes.ok) {
        const submissionsData = await submissionsRes.json();
        setCarSubmissions(submissionsData);
      }

      if (messagesRes.ok) {
        const messagesData = await messagesRes.json();
        setContactMessages(messagesData);
      }

      if (jsonRes.ok) {
        const jsonData = await jsonRes.json();
        setJsonData(jsonData);
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
      const response = await fetch('/api/system-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'active_theme',
          value: themeId
        })
      });

      if (response.ok) {
        setThemes(themes.map(theme => ({
          ...theme,
          isActive: theme.id === themeId
        })));

        // Apply theme to document
        document.documentElement.setAttribute('data-theme', themeId);
        localStorage.setItem('active_theme', themeId);
        window.location.reload();
      }
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
      }
    } catch (error) {
      console.error('İstatistikler güncellenirken hata:', error);
      setMessage('İstatistikler güncellenirken bir hata oluştu');
    }
  };

  const deleteCarSubmission = async (id: string) => {
    try {
      const response = await fetch(`/api/car-submissions?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setCarSubmissions(carSubmissions.filter(submission => submission.id !== id));
        setMessage('Araç değerleme kaydı silindi');
      }
    } catch (error) {
      console.error('Kayıt silinirken hata:', error);
      setMessage('Kayıt silinirken bir hata oluştu');
    }
  };

  const deleteContactMessage = async (id: string) => {
    try {
      const response = await fetch(`/api/contact-messages?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setContactMessages(contactMessages.filter(message => message.id !== id));
        setMessage('İletişim mesajı silindi');
      }
    } catch (error) {
      console.error('Mesaj silinirken hata:', error);
      setMessage('Mesaj silinirken bir hata oluştu');
    }
  };

  const loadJsonData = async (name: string) => {
    try {
      const response = await fetch(`/api/json-data?name=${name}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedJsonName(name);
        setJsonContent(JSON.stringify(data.data, null, 2));
        setJsonDescription(data.description || '');
        setShowJsonEditor(true);
      }
    } catch (error) {
      console.error('JSON verisi yüklenirken hata:', error);
      setMessage('JSON verisi yüklenirken bir hata oluştu');
    }
  };

  const saveJsonData = async () => {
    try {
      // Validate JSON
      JSON.parse(jsonContent);

      const response = await fetch('/api/json-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: selectedJsonName,
          data: JSON.parse(jsonContent),
          description: jsonDescription
        })
      });

      if (response.ok) {
        setMessage('JSON verisi başarıyla kaydedildi');
        setShowJsonEditor(false);
        loadData();
      }
    } catch (error) {
      console.error('JSON verisi kaydedilirken hata:', error);
      setMessage('JSON verisi kaydedilirken bir hata oluştu');
    }
  };

  const deleteJsonData = async (name: string) => {
    try {
      const response = await fetch(`/api/json-data?name=${name}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setJsonData(jsonData.filter(item => item.name !== name));
        setMessage('JSON verisi silindi');
      }
    } catch (error) {
      console.error('JSON verisi silinirken hata:', error);
      setMessage('JSON verisi silinirken bir hata oluştu');
    }
  };

  const exportData = (data: any, filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const navigationTabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'themes', name: 'Temalar', icon: Palette },
    { id: 'users', name: 'Kullanıcılar', icon: Users },
    { id: 'emails', name: 'E-postalar', icon: Mail },
    { id: 'data', name: 'Veriler', icon: Database }
  ];

  const statsCards = [
    {
      title: 'Toplam Değerleme',
      value: stats.totalValuations,
      icon: TrendingUp,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Toplam Kullanıcı',
      value: stats.totalUsers,
      icon: Users,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
    {
      title: 'Toplam E-posta',
      value: stats.totalEmails,
      icon: Mail,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    },
    {
      title: 'Başarı Oranı',
      value: `${stats.successRate}%`,
      icon: CheckCircle,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <a href="/" className="flex items-center text-slate-300 hover:text-white transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Ana Sayfa
              </a>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Admin Panel
                </h1>
                <div className="text-xs text-slate-300 font-medium">Sistem Yönetimi</div>
              </div>
            </div>
            <div className="text-sm text-slate-300">
              {new Date().toLocaleDateString('tr-TR')}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-2 mb-8">
          <div className="flex space-x-2 overflow-x-auto">
            {navigationTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className="mb-6 p-4 rounded-lg bg-slate-800/50 border border-slate-600/30">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-blue-400 mr-2" />
              <span className="text-slate-300">{message}</span>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && !loading && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsCards.map((card, index) => (
                <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-600/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">{card.title}</p>
                      <p className="text-2xl font-bold text-white">{card.value}</p>
                    </div>
                    <div className={`${card.bgColor} p-3 rounded-lg`}>
                      <card.icon className={`h-6 w-6 ${card.color}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Editor */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-lg font-semibold text-white mb-4">İstatistikleri Düzenle</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Toplam Değerleme</label>
                  <input
                    type="number"
                    value={stats.totalValuations}
                    onChange={(e) => setStats({...stats, totalValuations: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-700/50 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Toplam Kullanıcı</label>
                  <input
                    type="number"
                    value={stats.totalUsers}
                    onChange={(e) => setStats({...stats, totalUsers: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-700/50 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Toplam E-posta</label>
                  <input
                    type="number"
                    value={stats.totalEmails}
                    onChange={(e) => setStats({...stats, totalEmails: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-700/50 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Başarı Oranı (%)</label>
                  <input
                    type="number"
                    value={stats.successRate}
                    onChange={(e) => setStats({...stats, successRate: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-700/50 text-white"
                  />
                </div>
              </div>
              <button
                onClick={saveStats}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                Kaydet
              </button>
            </div>
          </div>
        )}

        {/* Themes Tab */}
        {activeTab === 'themes' && !loading && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {themes.map((theme) => (
                <div
                  key={theme.id}
                  className={`bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 ${
                    theme.isActive 
                      ? 'border-blue-500 bg-blue-500/10' 
                      : 'border-slate-600/30 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">{theme.name}</h3>
                    {theme.isActive && (
                      <div className="flex items-center text-blue-400">
                        <CheckCircle className="h-5 w-5 mr-1" />
                        <span className="text-sm">Aktif</span>
                      </div>
                    )}
                  </div>
                  <p className="text-slate-300 mb-4">{theme.description}</p>
                  <div className="flex space-x-2 mb-4">
                    <div 
                      className="w-8 h-8 rounded border border-slate-600"
                      style={{ backgroundColor: theme.colors.primary }}
                    ></div>
                    <div 
                      className="w-8 h-8 rounded border border-slate-600"
                      style={{ backgroundColor: theme.colors.secondary }}
                    ></div>
                    <div 
                      className="w-8 h-8 rounded border border-slate-600"
                      style={{ backgroundColor: theme.colors.accent }}
                    ></div>
                  </div>
                  <button
                    onClick={() => activateTheme(theme.id)}
                    disabled={theme.isActive}
                    className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                      theme.isActive
                        ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {theme.isActive ? 'Aktif Tema' : 'Temayı Etkinleştir'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && !loading && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Araç Değerleme Kayıtları</h3>
              <button
                onClick={() => exportData(carSubmissions, 'car-submissions.json')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Dışa Aktar
              </button>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-600/30">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Marka</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Model</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Yıl</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">İsim</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Telefon</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Değer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Tarih</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {carSubmissions.map((submission) => (
                      <tr key={submission.id} className="hover:bg-slate-700/30">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{submission.brand}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{submission.model}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{submission.year}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{submission.firstName} {submission.lastName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{submission.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">₺{submission.carValue.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{new Date(submission.created_at).toLocaleDateString('tr-TR')}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => deleteCarSubmission(submission.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
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

        {/* Emails Tab */}
        {activeTab === 'emails' && !loading && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">İletişim Mesajları</h3>
              <button
                onClick={() => exportData(contactMessages, 'contact-messages.json')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Dışa Aktar
              </button>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-600/30">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">İsim</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">E-posta</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Telefon</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Mesaj</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Tarih</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {contactMessages.map((message) => (
                      <tr key={message.id} className="hover:bg-slate-700/30">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{message.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{message.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{message.phone}</td>
                        <td className="px-6 py-4 text-sm text-white max-w-xs truncate">{message.message}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{new Date(message.created_at).toLocaleDateString('tr-TR')}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => deleteContactMessage(message.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
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

        {/* Data Tab */}
        {activeTab === 'data' && !loading && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">JSON Verileri</h3>
              <button
                onClick={() => exportData(jsonData, 'json-data.json')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Dışa Aktar
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jsonData.map((item) => (
                <div key={item.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-600/30">
                  <h4 className="text-lg font-semibold text-white mb-2">{item.name}</h4>
                  <p className="text-slate-300 text-sm mb-4">{item.description}</p>
                  <p className="text-slate-400 text-xs mb-4">
                    Son güncelleme: {new Date(item.updated_at).toLocaleDateString('tr-TR')}
                  </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => loadJsonData(item.name)}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Görüntüle
                    </button>
                    <button
                      onClick={() => deleteJsonData(item.name)}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors flex items-center"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* JSON Editor Modal */}
        {showJsonEditor && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">JSON Düzenleyici - {selectedJsonName}</h3>
                <button
                  onClick={() => setShowJsonEditor(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Açıklama</label>
                  <input
                    type="text"
                    value={jsonDescription}
                    onChange={(e) => setJsonDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-700/50 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">JSON İçeriği</label>
                  <textarea
                    value={jsonContent}
                    onChange={(e) => setJsonContent(e.target.value)}
                    rows={20}
                    className="w-full px-3 py-2 border border-slate-600 rounded-lg bg-slate-700/50 text-white font-mono text-sm"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowJsonEditor(false)}
                    className="px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700/50 transition-colors"
                  >
                    İptal
                  </button>
                  <button
                    onClick={saveJsonData}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Kaydet
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
