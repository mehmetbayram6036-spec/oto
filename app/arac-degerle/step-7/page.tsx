'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Car, User, Phone, MapPin } from 'lucide-react';

export default function Step7() {
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand') || '';
  const model = searchParams.get('model') || '';
  const year = searchParams.get('year') || '';
  const hasar = searchParams.get('hasar') || '';
  const agirHasar = searchParams.get('agirHasar') || '';
  const tramerDurumu = searchParams.get('tramerDurumu') || '';
  const tramerTutari = searchParams.get('tramerTutari') || '';
  const kompleOrijinal = searchParams.get('kompleOrijinal') || '';
  const kilometer = searchParams.get('kilometer') || '';
  const licensePlate = searchParams.get('licensePlate') || '';
  const carPackage = searchParams.get('carPackage') || '';
  const tramerAmount = searchParams.get('tramerAmount') || '';
  const fuelType = searchParams.get('fuelType') || '';
  const transmission = searchParams.get('transmission') || '';
  const condition = searchParams.get('condition') || '';
  const sunroof = searchParams.get('sunroof') || '';
  const panoramicRoof = searchParams.get('panoramicRoof') || '';
  const carValue = searchParams.get('carValue') || '';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');

  // Türkiye illeri
  const cities = [
    'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin', 'Aydın', 'Balıkesir',
    'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale', 'Çankırı', 'Çorum', 'Denizli',
    'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari',
    'Hatay', 'Isparta', 'Mersin', 'İstanbul', 'İzmir', 'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir',
    'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir',
    'Niğde', 'Ordu', 'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Tekirdağ', 'Tokat',
    'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak', 'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman',
    'Kırıkkale', 'Batman', 'Şırnak', 'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye', 'Düzce'
  ];

  // Türkiye'nin tüm illerinin ilçeleri
  const districts = {
    'Adana': ['Aladağ', 'Ceyhan', 'Çukurova', 'Feke', 'İmamoğlu', 'Karaisalı', 'Karataş', 'Kozan', 'Pozantı', 'Saimbeyli', 'Sarıçam', 'Seyhan', 'Tufanbeyli', 'Yumurtalık', 'Yüreğir'],
    'Adıyaman': ['Besni', 'Çelikhan', 'Gerger', 'Gölbaşı', 'Kahta', 'Merkez', 'Samsat', 'Sincik', 'Tut'],
    'Afyonkarahisar': ['Başmakçı', 'Bayat', 'Bolvadin', 'Çay', 'Çobanlar', 'Dazkırı', 'Dinar', 'Emirdağ', 'Evciler', 'Hocalar', 'İhsaniye', 'İscehisar', 'Kızılören', 'Merkez', 'Sandıklı', 'Sinanpaşa', 'Sultandağı', 'Şuhut'],
    'Ağrı': ['Diyadin', 'Doğubayazıt', 'Eleşkirt', 'Hamur', 'Merkez', 'Patnos', 'Taşlıçay', 'Tutak'],
    'Amasya': ['Göynücek', 'Gümüşhacıköy', 'Hamamözü', 'Merkez', 'Merzifon', 'Suluova', 'Taşova'],
    'Ankara': ['Akyurt', 'Altındağ', 'Ayaş', 'Bala', 'Beypazarı', 'Çamlıdere', 'Çankaya', 'Çubuk', 'Elmadağ', 'Etimesgut', 'Evren', 'Gölbaşı', 'Güdül', 'Haymana', 'Kalecik', 'Kazan', 'Keçiören', 'Kızılcahamam', 'Mamak', 'Nallıhan', 'Polatlı', 'Pursaklar', 'Sincan', 'Şereflikoçhisar', 'Yenimahalle'],
    'Antalya': ['Akseki', 'Aksu', 'Alanya', 'Demre', 'Döşemealtı', 'Elmalı', 'Finike', 'Gazipaşa', 'Gündoğmuş', 'İbradı', 'Kaş', 'Kemer', 'Kepez', 'Konyaaltı', 'Korkuteli', 'Kumluca', 'Manavgat', 'Muratpaşa', 'Serik'],
    'Artvin': ['Ardanuç', 'Arhavi', 'Merkez', 'Borçka', 'Hopa', 'Murgul', 'Şavşat', 'Yusufeli'],
    'Aydın': ['Bozdoğan', 'Çine', 'Germencik', 'Karacasu', 'Karpuzlu', 'Koçarlı', 'Köşk', 'Kuşadası', 'Kuyucak', 'Merkez', 'Nazilli', 'Söke', 'Sultanhisar', 'Yenipazar'],
    'Balıkesir': ['Altıeylül', 'Ayvalık', 'Balya', 'Bandırma', 'Bigadiç', 'Burhaniye', 'Dursunbey', 'Edremit', 'Erdek', 'Gönen', 'Havran', 'İvrindi', 'Karesi', 'Kepsut', 'Manyas', 'Savaştepe', 'Sındırgı', 'Gömeç', 'Susurluk', 'Marmara'],
    'Bilecik': ['Bozüyük', 'Gölpazarı', 'Merkez', 'Osmaneli', 'Pazaryeri', 'Söğüt', 'Yenipazar', 'İnhisar'],
    'Bingöl': ['Genç', 'Karlıova', 'Kiğı', 'Merkez', 'Solhan', 'Adaklı', 'Yayladere', 'Yedisu'],
    'Bitlis': ['Adilcevaz', 'Ahlat', 'Hizan', 'Merkez', 'Mutki', 'Tatvan', 'Güroymak'],
    'Bolu': ['Gerede', 'Göynük', 'Kıbrıscık', 'Mengen', 'Merkez', 'Mudurnu', 'Seben', 'Dörtdivan', 'Yeniçağa'],
    'Burdur': ['Ağlasun', 'Bucak', 'Gölhisar', 'Tefenni', 'Yeşilova', 'Merkez', 'Kemer', 'Altınyayla', 'Çavdır', 'Çeltikçi'],
    'Bursa': ['Gemlik', 'İnegöl', 'İznik', 'Karacabey', 'Keles', 'Mudanya', 'Mustafakemalpaşa', 'Orhaneli', 'Orhangazi', 'Yenişehir', 'Büyükorhan', 'Harmancık', 'Nilüfer', 'Osmangazi', 'Yıldırım', 'Gürsu', 'Kestel'],
    'Çanakkale': ['Ayvacık', 'Bayramiç', 'Biga', 'Bozcaada', 'Çan', 'Eceabat', 'Ezine', 'Gelibolu', 'Gökçeada', 'Lapseki', 'Merkez', 'Yenice'],
    'Çankırı': ['Çerkeş', 'Eldivan', 'Ilgaz', 'Kurşunlu', 'Orta', 'Şabanözü', 'Atkaracalar', 'Kızılırmak', 'Bayramören', 'Korgun', 'Yapraklı'],
    'Çorum': ['Alaca', 'Bayat', 'İskilip', 'Kargı', 'Mecitözü', 'Merkez', 'Ortaköy', 'Osmancık', 'Sungurlu', 'Boğazkale', 'Uğurludağ', 'Dodurga', 'Laçin', 'Oğuzlar'],
    'Denizli': ['Acıpayam', 'Buldan', 'Çal', 'Çameli', 'Çardak', 'Çivril', 'Güney', 'Kale', 'Merkez', 'Sarayköy', 'Tavas', 'Babadağ', 'Bekilli', 'Honaz', 'Serinhisar', 'Pamukkale', 'Baklan', 'Beyağaç', 'Bozkurt'],
    'Diyarbakır': ['Bismil', 'Çermik', 'Çınar', 'Ergani', 'Hani', 'Hazro', 'Kulp', 'Lice', 'Silvan', 'Merkez', 'Eğil', 'Kocaköy', 'Bağlar', 'Kayapınar', 'Sur', 'Yenişehir'],
    'Edirne': ['Enez', 'Havsa', 'İpsala', 'Keşan', 'Lalapaşa', 'Meriç', 'Uzunköprü', 'Merkez'],
    'Elazığ': ['Ağın', 'Baskil', 'Karakoçan', 'Keban', 'Maden', 'Merkez', 'Palu', 'Sivrice', 'Arıcak', 'Kovancılar', 'Alacakaya'],
    'Erzincan': ['Çayırlı', 'İliç', 'Kemaliye', 'Kemah', 'Merkez', 'Refahiye', 'Tercan', 'Üzümlü', 'Otlukbeli'],
    'Erzurum': ['Aşkale', 'Çat', 'Hınıs', 'Horasan', 'İspir', 'Karayazı', 'Narman', 'Oltu', 'Olur', 'Pasinler', 'Şenkaya', 'Tekman', 'Tortum', 'Karaçoban', 'Uzundere', 'Pazaryolu', 'Köprüköy', 'Hınıs', 'Aziziye', 'Palandöken', 'Yakutiye'],
    'Eskişehir': ['Çifteler', 'Mahmudiye', 'Mihalıççık', 'Sarıcakaya', 'Seyitgazi', 'Sivrihisar', 'Merkez', 'Günyüzü', 'Han', 'Mihalgazi', 'İnönü', 'Alpu', 'Beylikova', 'Odunpazarı', 'Tepebaşı'],
    'Gaziantep': ['Araban', 'İslahiye', 'Nizip', 'Oğuzeli', 'Yavuzeli', 'Şahinbey', 'Şehitkamil', 'Karkamış', 'Nurdağı'],
    'Giresun': ['Alucra', 'Bulancak', 'Dereli', 'Espiye', 'Eynesil', 'Görele', 'Keşap', 'Merkez', 'Şebinkarahisar', 'Tirebolu', 'Piraziz', 'Yağlıdere', 'Çamoluk', 'Çanakçı', 'Doğankent', 'Güce'],
    'Gümüşhane': ['Kelkit', 'Şiran', 'Torul', 'Merkez', 'Köse', 'Kürtün'],
    'Hakkari': ['Çukurca', 'Şemdinli', 'Yüksekova', 'Merkez'],
    'Hatay': ['Altınözü', 'Dörtyol', 'Hassa', 'İskenderun', 'Kırıkhan', 'Reyhanlı', 'Samandağ', 'Yayladağı', 'Erzin', 'Belen', 'Kumlu', 'Antakya', 'Defne', 'Payas', 'Arsuz'],
    'Isparta': ['Atabey', 'Eğirdir', 'Gelendost', 'Keçiborlu', 'Senirkent', 'Sütçüler', 'Şarkikaraağaç', 'Uluborlu', 'Yalvaç', 'Aksu', 'Gönen', 'Yenişarbademli'],
    'Mersin': ['Anamur', 'Erdemli', 'Gülnar', 'Mut', 'Silifke', 'Tarsus', 'Merkez', 'Çamlıyayla', 'Aydıncık', 'Bozyazı', 'Akdeniz', 'Mezitli', 'Toroslar', 'Yenişehir'],
    'İstanbul': ['Adalar', 'Bakırköy', 'Beşiktaş', 'Beykoz', 'Beyoğlu', 'Çatalca', 'Eyüp', 'Fatih', 'Gaziosmanpaşa', 'Kadıköy', 'Kartal', 'Sarıyer', 'Silivri', 'Şile', 'Şişli', 'Üsküdar', 'Zeytinburnu', 'Büyükçekmece', 'Kağıthane', 'Küçükçekmece', 'Pendik', 'Ümraniye', 'Bayrampaşa', 'Avcılar', 'Bağcılar', 'Bahçelievler', 'Güngören', 'Maltepe', 'Sultanbeyli', 'Tuzla', 'Esenler', 'Başakşehir', 'Sancaktepe', 'Sultangazi', 'Esenyurt', 'Aliağa', 'Arnavutköy', 'Ataşehir', 'Beylikdüzü', 'Çekmeköy', 'Eyüpsultan', 'Sarıyer', 'Sultanbeyli', 'Şile', 'Şişli', 'Tuzla', 'Ümraniye', 'Üsküdar', 'Zeytinburnu'],
    'İzmir': ['Aliağa', 'Bayındır', 'Bergama', 'Bornova', 'Çeşme', 'Dikili', 'Foça', 'Karaburun', 'Karşıyaka', 'Kemalpaşa', 'Kınık', 'Kiraz', 'Menemen', 'Ödemiş', 'Seferihisar', 'Selçuk', 'Tire', 'Torbalı', 'Urla', 'Beydağ', 'Çiğli', 'Güzelbahçe', 'Konak', 'Menderes', 'Balçova', 'Çeşme', 'Gaziemir', 'Güzelbahçe', 'Karabağlar', 'Narlıdere', 'Bayraklı', 'Buca', 'Konak', 'Bornova', 'Karşıyaka'],
    'Kars': ['Arpaçay', 'Digor', 'Kağızman', 'Merkez', 'Sarıkamış', 'Selim', 'Susuz', 'Akyaka'],
    'Kastamonu': ['Araç', 'Cide', 'İnebolu', 'Küre', 'Taşköprü', 'Tosya', 'Merkez', 'Devrekani', 'Bozkurt', 'Çatalzeytin', 'Daday', 'İhsangazi', 'Seydiler', 'Şenpazar', 'Pınarbaşı', 'Doğanyurt', 'Hanönü', 'Seydiler'],
    'Kayseri': ['Bünyan', 'Develi', 'Felahiye', 'İncesu', 'Pınarbaşı', 'Sarıoğlan', 'Sarız', 'Tomarza', 'Yahyalı', 'Yeşilhisar', 'Akkışla', 'Talas', 'Kocasinan', 'Melikgazi', 'Hacılar', 'Özvatan', 'Felahiye'],
    'Kırklareli': ['Babaeski', 'Demirköy', 'Merkez', 'Pehlivanköy', 'Pınarhisar', 'Vize', 'Kofçaz', 'Lüleburgaz'],
    'Kırşehir': ['Çiçekdağı', 'Kaman', 'Mucur', 'Merkez', 'Akpınar', 'Akçakent', 'Boztepe'],
    'Kocaeli': ['Gebze', 'Gölcük', 'Kandıra', 'Karamürsel', 'Körfez', 'Derince', 'Başiskele', 'Çayırova', 'Darıca', 'Dilovası', 'İzmit', 'Kartepe'],
    'Konya': ['Akşehir', 'Beyşehir', 'Bozkır', 'Cihanbeyli', 'Çumra', 'Doğanhisar', 'Ereğli', 'Hadim', 'Ilgın', 'Kadınhanı', 'Karapınar', 'Kulu', 'Sarayönü', 'Seydişehir', 'Yunak', 'Akören', 'Altınekin', 'Derebucak', 'Hüyük', 'Karatay', 'Meram', 'Selçuklu', 'Taşkent', 'Ahırlı', 'Çeltik', 'Derbent', 'Emirgazi', 'Güneysınır', 'Halkapınar', 'Tuzlukçu', 'Yalıhüyük'],
    'Kütahya': ['Altıntaş', 'Domaniç', 'Emet', 'Gediz', 'Merkez', 'Simav', 'Tavşanlı', 'Aslanapa', 'Dumlupınar', 'Hisarcık', 'Şaphane', 'Çavdarhisar', 'Pazarlar'],
    'Malatya': ['Akçadağ', 'Arapgir', 'Arguvan', 'Darende', 'Doğanşehir', 'Hekimhan', 'Pütürge', 'Yeşilyurt', 'Battalgazi', 'Kale', 'Kuluncak', 'Yazıhan'],
    'Manisa': ['Akhisar', 'Alaşehir', 'Demirci', 'Gördes', 'Kırkağaç', 'Kula', 'Salihli', 'Sarıgöl', 'Saruhanlı', 'Selendi', 'Soma', 'Turgutlu', 'Ahmetli', 'Gölmarmara', 'Köprübaşı', 'Şehzadeler', 'Yunusemre'],
    'Kahramanmaraş': ['Afşin', 'Andırın', 'Elbistan', 'Göksun', 'Merkez', 'Pazarcık', 'Türkoğlu', 'Çağlayancerit', 'Ekinözü', 'Nurhak'],
    'Mardin': ['Derik', 'Kızıltepe', 'Mazıdağı', 'Midyat', 'Nusaybin', 'Ömerli', 'Savur', 'Yeşilli', 'Merkez', 'Dargeçit'],
    'Muğla': ['Bodrum', 'Datça', 'Fethiye', 'Köyceğiz', 'Marmaris', 'Menteşe', 'Milas', 'Ula', 'Yatağan', 'Dalaman', 'Ortaca', 'Kavaklıdere', 'Seydikemer'],
    'Muş': ['Bulanık', 'Malazgirt', 'Merkez', 'Varto', 'Hasköy', 'Korkut'],
    'Nevşehir': ['Avanos', 'Derinkuyu', 'Gülşehir', 'Hacıbektaş', 'Kozaklı', 'Merkez', 'Ürgüp', 'Acıgöl'],
    'Niğde': ['Aksaray', 'Bor', 'Çamardı', 'Merkez', 'Ulukışla', 'Altunhisar', 'Çiftlik'],
    'Ordu': ['Akkuş', 'Aybastı', 'Fatsa', 'Gölköy', 'Korgan', 'Kumru', 'Mesudiye', 'Perşembe', 'Ulubey', 'Ünye', 'Gürgentepe', 'Çamaş', 'Çatalpınar', 'Çaybaşı', 'İkizce', 'Kabadüz', 'Kabataş', 'Gülyalı'],
    'Rize': ['Ardeşen', 'Çamlıhemşin', 'Çayeli', 'Fındıklı', 'İkizdere', 'Kalkandere', 'Merkez', 'Pazar', 'Güneysu', 'Derepazarı', 'Hemşin', 'İyidere'],
    'Sakarya': ['Akyazı', 'Geyve', 'Hendek', 'Karasu', 'Kaynarca', 'Sapanca', 'Kocaali', 'Pamukova', 'Taraklı', 'Ferizli', 'Karapürçek', 'Söğütlü', 'Adapazarı', 'Arifiye', 'Erenler', 'Serdivan'],
    'Samsun': ['Alaçam', 'Bafra', 'Çarşamba', 'Havza', 'Kavak', 'Ladik', 'Terme', 'Vezirköprü', 'Asarcık', 'Ondokuzmayıs', 'Salıpazarı', 'Tekkeköy', 'Ayvacık', 'Yakakent', 'Atakum', 'Canik', 'İlkadım'],
    'Siirt': ['Baykan', 'Eruh', 'Kurtalan', 'Pervari', 'Merkez', 'Şirvan', 'Tillo'],
    'Sinop': ['Ayancık', 'Boyabat', 'Durağan', 'Erfelek', 'Gerze', 'Merkez', 'Türkeli', 'Dikmen', 'Saraydüzü'],
    'Sivas': ['Divriği', 'Gemerek', 'Hafik', 'İmranlı', 'Kangal', 'Koyulhisar', 'Merkez', 'Suşehri', 'Şarkışla', 'Yıldızeli', 'Gürün', 'Akıncılar', 'Altınyayla', 'Doğanşar', 'Gölova', 'Hafik', 'Ulaş'],
    'Tekirdağ': ['Çerkezköy', 'Çorlu', 'Ergene', 'Hayrabolu', 'Malkara', 'Muratlı', 'Saray', 'Süleymanpaşa', 'Kapaklı', 'Marmaraereğlisi', 'Şarköy'],
    'Tokat': ['Almus', 'Artova', 'Erbaa', 'Niksar', 'Reşadiye', 'Turhal', 'Zile', 'Merkez', 'Başçiftlik', 'Sulusaray', 'Pazar', 'Yeşilyurt'],
    'Trabzon': ['Akçaabat', 'Araklı', 'Arsin', 'Çaykara', 'Maçka', 'Of', 'Sürmene', 'Tonya', 'Vakfıkebir', 'Yomra', 'Beşikdüzü', 'Şalpazarı', 'Çarşıbaşı', 'Dernekpazarı', 'Düzköy', 'Hayrat', 'Köprübaşı', 'Ortahisar'],
    'Tunceli': ['Çemişgezek', 'Hozat', 'Mazgirt', 'Nazımiye', 'Ovacık', 'Pertek', 'Pülümür', 'Merkez'],
    'Şanlıurfa': ['Akçakale', 'Birecik', 'Bozova', 'Ceylanpınar', 'Halfeti', 'Hilvan', 'Siverek', 'Suruç', 'Viranşehir', 'Harran', 'Eyyübiye', 'Haliliye', 'Karaköprü'],
    'Uşak': ['Banaz', 'Eşme', 'Karahallı', 'Sivaslı', 'Ulubey', 'Merkez'],
    'Van': ['Başkale', 'Çatak', 'Erciş', 'Gevaş', 'Gürpınar', 'Muradiye', 'Özalp', 'Bahçesaray', 'Çaldıran', 'Edremit', 'Saray', 'Tuşba', 'İpekyolu'],
    'Yozgat': ['Akdağmadeni', 'Boğazlıyan', 'Sarıkaya', 'Şefaatli', 'Sorgun', 'Merkez', 'Aydıncık', 'Çandır', 'Çayıralan', 'Kadışehri', 'Saraykent', 'Yenifakılı', 'Çekerek', 'Şefaatli'],
    'Zonguldak': ['Çaycuma', 'Devrek', 'Ereğli', 'Merkez', 'Alaplı', 'Gökçebey', 'Kilimli', 'Kozlu'],
    'Aksaray': ['Merkez', 'Ortaköy', 'Ağaçören', 'Güzelyurt', 'Sarıyahşi', 'Eskil', 'Gülağaç'],
    'Bayburt': ['Merkez', 'Aydıntepe', 'Demirözü'],
    'Karaman': ['Ermenek', 'Merkez', 'Ayrancı', 'Kazımkarabekir', 'Başyayla', 'Sarıveliler'],
    'Kırıkkale': ['Delice', 'Keskin', 'Merkez', 'Sulakyurt', 'Bahşılı', 'Balışeyh', 'Çelebi', 'Karakeçili', 'Yahşihan'],
    'Batman': ['Beşiri', 'Gercüş', 'Kozluk', 'Merkez', 'Hasankeyf', 'Sason'],
    'Şırnak': ['Cizre', 'İdil', 'Silopi', 'Merkez', 'Uludere', 'Beytüşşebap', 'Güçlükonak'],
    'Bartın': ['Merkez', 'Kurucaşile', 'Ulus', 'Amasra'],
    'Ardahan': ['Göle', 'Hanak', 'Merkez', 'Posof', 'Damal', 'Çıldır'],
    'Iğdır': ['Aralık', 'Merkez', 'Tuzluca', 'Karakoyunlu'],
    'Yalova': ['Merkez', 'Altınova', 'Armutlu', 'Çınarcık', 'Termal', 'Çiftlikköy'],
    'Karabük': ['Eflani', 'Eskipazar', 'Merkez', 'Ovacık', 'Safranbolu', 'Yenice'],
    'Kilis': ['Merkez', 'Elbeyli', 'Musabeyli', 'Polateli'],
    'Osmaniye': ['Bahçe', 'Kadirli', 'Merkez', 'Düziçi', 'Hasanbeyli', 'Sumbas', 'Toprakkale'],
    'Düzce': ['Akçakoca', 'Merkez', 'Yığılca', 'Cumayeri', 'Gölyaka', 'Çilimli', 'Gümüşova', 'Kaynaşlı']
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

  const isFormValid = firstName && lastName && phone && city && district;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <Car className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">aracteklifi.com</h1>
            </Link>
            <div className="text-sm text-gray-500">
              Adım 7 / 7
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
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  ✓
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">Hasar Bilgileri</div>
                  <div className="text-xs text-gray-500">Tamamlandı</div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  ✓
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">Detaylar</div>
                  <div className="text-xs text-gray-500">Tamamlandı</div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  7
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">İletişim</div>
                  <div className="text-xs text-gray-500">Bilgileriniz</div>
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
            İletişim Bilgilerinizi Girin
          </h1>
          <p className="text-lg text-gray-600">
            Değerleme sonucunuzu size ulaştırmak için iletişim bilgilerinizi belirtin
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          {/* Name Fields */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ad *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Adınız"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Soyad *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Soyadınız"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cep Telefonu *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="05XX XXX XX XX"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Değerleme sonucunuz SMS ile gönderilecektir
            </p>
          </div>

          {/* City and District */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İl *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setDistrict(''); // İl değişince ilçeyi sıfırla
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">İl seçiniz</option>
                  {cities.map((cityName) => (
                    <option key={cityName} value={cityName}>
                      {cityName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İlçe *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  disabled={!city}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">İlçe seçiniz</option>
                  {city && districts[city as keyof typeof districts]?.map((districtName) => (
                    <option key={districtName} value={districtName}>
                      {districtName}
                    </option>
                  ))}
                </select>
              </div>
              {!city && (
                <p className="text-xs text-gray-500 mt-1">
                  Önce il seçiniz
                </p>
              )}
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Gizlilik:</strong> İletişim bilgileriniz sadece değerleme sonucunuzu size ulaştırmak için kullanılacaktır. 
              Üçüncü taraflarla paylaşılmayacaktır.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center">
          <Link
            href={isFormValid ? `/arac-degerle/step-8?brand=${encodeURIComponent(brand)}&model=${encodeURIComponent(model)}&year=${year}&hasar=${encodeURIComponent(hasar)}&agirHasar=${encodeURIComponent(agirHasar)}&tramerDurumu=${encodeURIComponent(tramerDurumu)}&tramerTutari=${encodeURIComponent(tramerTutari)}&kompleOrijinal=${encodeURIComponent(kompleOrijinal)}&kilometer=${kilometer}&licensePlate=${encodeURIComponent(licensePlate)}&carPackage=${encodeURIComponent(carPackage)}&fuelType=${encodeURIComponent(fuelType)}&transmission=${encodeURIComponent(transmission)}&condition=${encodeURIComponent(condition)}&sunroof=${encodeURIComponent(sunroof)}&panoramicRoof=${encodeURIComponent(panoramicRoof)}&firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}&phone=${encodeURIComponent(phone)}&city=${encodeURIComponent(city)}&district=${encodeURIComponent(district)}&carValue=${carValue}` : '#'}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center ${
              isFormValid
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Bitti
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
