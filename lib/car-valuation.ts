// ===== CAR VALUATION SYSTEM =====

export interface CarData {
  tipAdi: string;
  deger: number;
}

export interface CarValuationResult {
  baseValue: number;
  kaskoDiscount: number;
  paintedParts: number;
  replacedParts: number;
  paintedDiscount: number;
  replacedDiscount: number;
  totalDiscount: number;
  finalValue: number;
  carFound: boolean;
  calculationDetails: string[];
}

export interface CarSearchParams {
  brand: string;
  model: string;
  year: string;
  tipAdi?: string;
}

// Araç fiyatını year-based-car-data.json'dan bul
export async function findCarPrice(params: CarSearchParams): Promise<number | null> {
  try {
    const response = await fetch('/year-based-car-data.json');
    const data = await response.json();
    
    // Yıla göre araç verilerini bul
    const yearData = data[params.year];
    if (!yearData) return null;
    
    // Marka ve modele göre araç fiyatını bul
    const brandData = yearData[params.brand.toUpperCase()];
    if (!brandData) return null;
    
    // Eğer tipAdi belirtilmişse, o tipe göre ara
    if (params.tipAdi) {
      const carData = brandData[params.tipAdi];
      if (carData && carData.length > 0) {
        return carData[0].deger;
      }
    }
    
    // Tip belirtilmemişse, ilk bulunan aracın değerini döndür
    const firstModel = Object.values(brandData)[0] as CarData[];
    if (firstModel && firstModel.length > 0) {
      return firstModel[0].deger;
    }
    
    return null;
  } catch (error) {
    console.error('Araç fiyatı bulunamadı:', error);
    return null;
  }
}

// Araç değerleme hesaplama fonksiyonu
export function calculateCarValue(
  baseValue: number,
  hasarData: Record<string, string>,
  tramerDurumu: string,
  tramerTutari: string
): CarValuationResult {
  let finalValue = baseValue;
  const calculationDetails: string[] = [];
  
  // Başlangıç değeri
  calculationDetails.push(`Başlangıç Kasko Değeri: ₺${baseValue.toLocaleString()}`);
  
  // Kasko değerinin %5 altından başla
  const kaskoDiscount = baseValue * 0.05;
  finalValue = baseValue - kaskoDiscount;
  calculationDetails.push(`Kasko Değeri %5 Düşüş: -₺${kaskoDiscount.toLocaleString()}`);
  
  // Hasar bilgilerini kontrol et
  const paintedParts: string[] = [];
  const replacedParts: string[] = [];
  
  if (hasarData && Object.keys(hasarData).length > 0) {
    Object.entries(hasarData).forEach(([part, damage]) => {
      if (damage === 'Boyalı') {
        paintedParts.push(part);
        // Her boyalı parça için %0.10 düşüş
        const partDiscount = finalValue * 0.001;
        finalValue = finalValue - partDiscount;
        calculationDetails.push(`${part} (Boyalı): -₺${partDiscount.toLocaleString()}`);
      } else if (damage === 'Değişen') {
        replacedParts.push(part);
        // Her değişen parça için %0.20 düşüş
        const partDiscount = finalValue * 0.002;
        finalValue = finalValue - partDiscount;
        calculationDetails.push(`${part} (Değişen): -₺${partDiscount.toLocaleString()}`);
      }
    });
  }
  
  // Toplam düşüşleri hesapla
  const paintedDiscount = paintedParts.length * (baseValue * 0.001);
  const replacedDiscount = replacedParts.length * (baseValue * 0.002);
  const totalDiscount = kaskoDiscount + paintedDiscount + replacedDiscount;
  
  // Sonuç
  calculationDetails.push(`Toplam Düşüş: -₺${totalDiscount.toLocaleString()}`);
  calculationDetails.push(`Final Değer: ₺${Math.round(finalValue).toLocaleString()}`);
  
  return {
    baseValue,
    kaskoDiscount,
    paintedParts: paintedParts.length,
    replacedParts: replacedParts.length,
    paintedDiscount,
    replacedDiscount,
    totalDiscount,
    finalValue: Math.round(finalValue),
    carFound: true,
    calculationDetails
  };
}

// Araç markalarını getir
export async function getCarBrands(): Promise<string[]> {
  try {
    const response = await fetch('/year-based-car-data.json');
    const data = await response.json();
    
    // İlk yıldan markaları al
    const firstYear = Object.keys(data)[0];
    if (!firstYear) return [];
    
    return Object.keys(data[firstYear]);
  } catch (error) {
    console.error('Markalar yüklenemedi:', error);
    return [];
  }
}

// Araç modellerini getir
export async function getCarModels(brand: string, year: string): Promise<string[]> {
  try {
    const response = await fetch('/year-based-car-data.json');
    const data = await response.json();
    
    const yearData = data[year];
    if (!yearData) return [];
    
    const brandData = yearData[brand.toUpperCase()];
    if (!brandData) return [];
    
    return Object.keys(brandData);
  } catch (error) {
    console.error('Modeller yüklenemedi:', error);
    return [];
  }
}

// Araç tiplerini getir
export async function getCarTypes(brand: string, model: string, year: string): Promise<CarData[]> {
  try {
    const response = await fetch('/year-based-car-data.json');
    const data = await response.json();
    
    const yearData = data[year];
    if (!yearData) return [];
    
    const brandData = yearData[brand.toUpperCase()];
    if (!brandData) return [];
    
    const modelData = brandData[model];
    if (!modelData) return [];
    
    return modelData;
  } catch (error) {
    console.error('Tipler yüklenemedi:', error);
    return [];
  }
}

// Yılları getir
export async function getAvailableYears(): Promise<string[]> {
  try {
    const response = await fetch('/year-based-car-data.json');
    const data = await response.json();
    
    return Object.keys(data).sort((a, b) => parseInt(b) - parseInt(a));
  } catch (error) {
    console.error('Yıllar yüklenemedi:', error);
    return [];
  }
}

// Hasar parçalarını tanımla
export const DAMAGE_PARTS = {
  'Ön Tampon': 'Ön Tampon',
  'Arka Tampon': 'Arka Tampon',
  'Ön Kapı Sol': 'Ön Kapı Sol',
  'Ön Kapı Sağ': 'Ön Kapı Sağ',
  'Arka Kapı Sol': 'Arka Kapı Sol',
  'Arka Kapı Sağ': 'Arka Kapı Sağ',
  'Tavan': 'Tavan',
  'Motor Kaputu': 'Motor Kaputu',
  'Bagaj Kapağı': 'Bagaj Kapağı',
  'Ön Çamurluk Sol': 'Ön Çamurluk Sol',
  'Ön Çamurluk Sağ': 'Ön Çamurluk Sağ',
  'Arka Çamurluk Sol': 'Arka Çamurluk Sol',
  'Arka Çamurluk Sağ': 'Arka Çamurluk Sağ',
  'Ön Panel': 'Ön Panel',
  'Arka Panel': 'Arka Panel',
  'Yan Panel Sol': 'Yan Panel Sol',
  'Yan Panel Sağ': 'Yan Panel Sağ',
  'Ön Farl Sol': 'Ön Farl Sol',
  'Ön Farl Sağ': 'Ön Farl Sağ',
  'Arka Farl Sol': 'Arka Farl Sol',
  'Arka Farl Sağ': 'Arka Farl Sağ',
  'Ön Cam': 'Ön Cam',
  'Arka Cam': 'Arka Cam',
  'Yan Cam Sol': 'Yan Cam Sol',
  'Yan Cam Sağ': 'Yan Cam Sağ',
  'Ayna Sol': 'Ayna Sol',
  'Ayna Sağ': 'Ayna Sağ',
  'Jant Sol Ön': 'Jant Sol Ön',
  'Jant Sağ Ön': 'Jant Sağ Ön',
  'Jant Sol Arka': 'Jant Sol Arka',
  'Jant Sağ Arka': 'Jant Sağ Arka'
};

// Hasar durumları
export const DAMAGE_TYPES = {
  'Boyalı': 'Boyalı',
  'Değişen': 'Değişen'
};

// Tramer durumları
export const TRAMER_STATUS = {
  'Var': 'Var',
  'Yok': 'Yok'
};

// Yakıt tipleri
export const FUEL_TYPES = {
  'Benzin': 'Benzin',
  'Dizel': 'Dizel',
  'LPG': 'LPG',
  'Elektrik': 'Elektrik',
  'Hibrit': 'Hibrit'
};

// Vites tipleri
export const TRANSMISSION_TYPES = {
  'Manuel': 'Manuel',
  'Otomatik': 'Otomatik',
  'Yarı Otomatik': 'Yarı Otomatik'
};

// Durum seviyeleri
export const CONDITION_LEVELS = {
  'Mükemmel': 'Mükemmel',
  'Çok İyi': 'Çok İyi',
  'İyi': 'İyi',
  'Orta': 'Orta',
  'Kötü': 'Kötü'
};
