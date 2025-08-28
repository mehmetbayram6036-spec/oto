import { sql } from '@vercel/postgres';

export interface CarSubmission {
  id: string;
  brand: string;
  model: string;
  year: string;
  hasar: string;
  agirHasar: string;
  tramerDurumu: string;
  tramerTutari: string;
  kompleOrijinal: string;
  kilometer: string;
  licensePlate: string;
  carPackage: string;
  fuelType: string;
  transmission: string;
  condition: string;
  sunroof: string;
  panoramicRoof: string;
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  district: string;
  carValue: number;
  created_at: Date;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: Date;
}

export interface SystemSettings {
  id: string;
  key: string;
  value: string;
  description: string;
  updated_at: Date;
}

export interface JsonData {
  id: string;
  name: string;
  data: string;
  description: string;
  updated_at: Date;
}

export interface AdminStats {
  id: string;
  totalValuations: number;
  totalUsers: number;
  totalEmails: number;
  successRate: number;
  updated_at: Date;
}

// Veritabanı tablolarını oluştur
export async function createTables() {
  try {
    // Araç değerleme talepleri tablosu
    await sql`
      CREATE TABLE IF NOT EXISTS car_submissions (
        id SERIAL PRIMARY KEY,
        brand VARCHAR(100) NOT NULL,
        model VARCHAR(100) NOT NULL,
        year VARCHAR(4) NOT NULL,
        hasar TEXT,
        agirHasar VARCHAR(50),
        tramerDurumu VARCHAR(50),
        tramerTutari VARCHAR(50),
        kompleOrijinal VARCHAR(50),
        kilometer VARCHAR(20),
        licensePlate VARCHAR(20),
        carPackage VARCHAR(100),
        fuelType VARCHAR(50),
        transmission VARCHAR(50),
        condition VARCHAR(50),
        sunroof VARCHAR(50),
        panoramicRoof VARCHAR(50),
        firstName VARCHAR(100),
        lastName VARCHAR(100),
        phone VARCHAR(20),
        city VARCHAR(100),
        district VARCHAR(100),
        carValue INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // İletişim mesajları tablosu
    await sql`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Sistem ayarları tablosu
    await sql`
      CREATE TABLE IF NOT EXISTS system_settings (
        id SERIAL PRIMARY KEY,
        key VARCHAR(100) UNIQUE NOT NULL,
        value TEXT NOT NULL,
        description TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // JSON veri tablosu
    await sql`
      CREATE TABLE IF NOT EXISTS json_data (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        data TEXT NOT NULL,
        description TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Admin istatistikleri tablosu
    await sql`
      CREATE TABLE IF NOT EXISTS admin_stats (
        id SERIAL PRIMARY KEY,
        totalValuations INTEGER DEFAULT 0,
        totalUsers INTEGER DEFAULT 0,
        totalEmails INTEGER DEFAULT 0,
        successRate INTEGER DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('Veritabanı tabloları başarıyla oluşturuldu');
  } catch (error) {
    console.error('Veritabanı tabloları oluşturulurken hata:', error);
    throw error;
  }
}

// Araç değerleme talebi ekle
export async function addCarSubmission(data: Omit<CarSubmission, 'id' | 'created_at'>) {
  try {
    const result = await sql`
      INSERT INTO car_submissions (
        brand, model, year, hasar, agirHasar, tramerDurumu, tramerTutari,
        kompleOrijinal, kilometer, licensePlate, carPackage, fuelType,
        transmission, condition, sunroof, panoramicRoof, firstName,
        lastName, phone, city, district, carValue
      ) VALUES (
        ${data.brand}, ${data.model}, ${data.year}, ${data.hasar}, ${data.agirHasar},
        ${data.tramerDurumu}, ${data.tramerTutari}, ${data.kompleOrijinal},
        ${data.kilometer}, ${data.licensePlate}, ${data.carPackage}, ${data.fuelType},
        ${data.transmission}, ${data.condition}, ${data.sunroof}, ${data.panoramicRoof},
        ${data.firstName}, ${data.lastName}, ${data.phone}, ${data.city},
        ${data.district}, ${data.carValue}
      ) RETURNING *
    `;
    return {
      ...result.rows[0],
      id: result.rows[0].id.toString(),
      created_at: new Date(result.rows[0].created_at)
    } as CarSubmission;
  } catch (error) {
    console.error('Araç değerleme talebi eklenirken hata:', error);
    throw error;
  }
}

// Tüm araç değerleme taleplerini getir
export async function getAllCarSubmissions(): Promise<CarSubmission[]> {
  try {
    const result = await sql`
      SELECT * FROM car_submissions ORDER BY created_at DESC
    `;
    return result.rows.map(row => ({
      ...row,
      id: row.id.toString(),
      created_at: new Date(row.created_at)
    })) as CarSubmission[];
  } catch (error) {
    console.error('Araç değerleme talepleri getirilirken hata:', error);
    throw error;
  }
}

// İletişim mesajı ekle
export async function addContactMessage(data: Omit<ContactMessage, 'id' | 'created_at'>) {
  try {
    const result = await sql`
      INSERT INTO contact_messages (name, email, phone, message)
      VALUES (${data.name}, ${data.email}, ${data.phone}, ${data.message})
      RETURNING *
    `;
    return {
      ...result.rows[0],
      id: result.rows[0].id.toString(),
      created_at: new Date(result.rows[0].created_at)
    } as ContactMessage;
  } catch (error) {
    console.error('İletişim mesajı eklenirken hata:', error);
    throw error;
  }
}

// Tüm iletişim mesajlarını getir
export async function getAllContactMessages(): Promise<ContactMessage[]> {
  try {
    const result = await sql`
      SELECT * FROM contact_messages ORDER BY created_at DESC
    `;
    return result.rows.map(row => ({
      ...row,
      id: row.id.toString(),
      created_at: new Date(row.created_at)
    })) as ContactMessage[];
  } catch (error) {
    console.error('İletişim mesajları getirilirken hata:', error);
    throw error;
  }
}

// Sistem ayarı getir
export async function getSystemSetting(key: string): Promise<string | null> {
  try {
    const result = await sql`
      SELECT value FROM system_settings WHERE key = ${key}
    `;
    return result.rows[0]?.value || null;
  } catch (error) {
    console.error('Sistem ayarı getirilirken hata:', error);
    throw error;
  }
}

// Sistem ayarı güncelle veya ekle
export async function upsertSystemSetting(key: string, value: string, description?: string) {
  try {
    const result = await sql`
      INSERT INTO system_settings (key, value, description)
      VALUES (${key}, ${value}, ${description})
      ON CONFLICT (key) DO UPDATE SET
        value = EXCLUDED.value,
        description = EXCLUDED.description,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *
    `;
    return {
      ...result.rows[0],
      id: result.rows[0].id.toString(),
      updated_at: new Date(result.rows[0].updated_at)
    } as SystemSettings;
  } catch (error) {
    console.error('Sistem ayarı güncellenirken hata:', error);
    throw error;
  }
}

// JSON veri getir
export async function getJsonData(name: string): Promise<JsonData | null> {
  try {
    const result = await sql`
      SELECT * FROM json_data WHERE name = ${name}
    `;
    if (result.rows[0]) {
      return {
        ...result.rows[0],
        id: result.rows[0].id.toString(),
        updated_at: new Date(result.rows[0].updated_at)
      } as JsonData;
    }
    return null;
  } catch (error) {
    console.error('JSON veri getirilirken hata:', error);
    throw error;
  }
}

// JSON veri güncelle veya ekle
export async function upsertJsonData(name: string, data: string, description?: string) {
  try {
    const result = await sql`
      INSERT INTO json_data (name, data, description)
      VALUES (${name}, ${data}, ${description})
      ON CONFLICT (name) DO UPDATE SET
        data = EXCLUDED.data,
        description = EXCLUDED.description,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *
    `;
    return {
      ...result.rows[0],
      id: result.rows[0].id.toString(),
      updated_at: new Date(result.rows[0].updated_at)
    } as JsonData;
  } catch (error) {
    console.error('JSON veri güncellenirken hata:', error);
    throw error;
  }
}

// Tüm JSON verileri getir
export async function getAllJsonData(): Promise<JsonData[]> {
  try {
    const result = await sql`
      SELECT * FROM json_data ORDER BY updated_at DESC
    `;
    return result.rows.map(row => ({
      ...row,
      id: row.id.toString(),
      updated_at: new Date(row.updated_at)
    })) as JsonData[];
  } catch (error) {
    console.error('JSON veriler getirilirken hata:', error);
    throw error;
  }
}

// Admin istatistiklerini getir
export async function getAdminStats(): Promise<AdminStats | null> {
  try {
    const result = await sql`
      SELECT * FROM admin_stats ORDER BY id DESC LIMIT 1
    `;
    if (result.rows[0]) {
      return {
        ...result.rows[0],
        id: result.rows[0].id.toString(),
        updated_at: new Date(result.rows[0].updated_at)
      } as AdminStats;
    }
    return null;
  } catch (error) {
    console.error('Admin istatistikleri getirilirken hata:', error);
    throw error;
  }
}

// Admin istatistiklerini güncelle
export async function updateAdminStats(stats: Omit<AdminStats, 'id' | 'updated_at'>) {
  try {
    const result = await sql`
      INSERT INTO admin_stats (totalValuations, totalUsers, totalEmails, successRate)
      VALUES (${stats.totalValuations}, ${stats.totalUsers}, ${stats.totalEmails}, ${stats.successRate})
      RETURNING *
    `;
    return {
      ...result.rows[0],
      id: result.rows[0].id.toString(),
      updated_at: new Date(result.rows[0].updated_at)
    } as AdminStats;
  } catch (error) {
    console.error('Admin istatistikleri güncellenirken hata:', error);
    throw error;
  }
}

// Veri silme fonksiyonları
export async function deleteCarSubmission(id: string) {
  try {
    await sql`DELETE FROM car_submissions WHERE id = ${id}`;
  } catch (error) {
    console.error('Araç değerleme talebi silinirken hata:', error);
    throw error;
  }
}

export async function deleteContactMessage(id: string) {
  try {
    await sql`DELETE FROM contact_messages WHERE id = ${id}`;
  } catch (error) {
    console.error('İletişim mesajı silinirken hata:', error);
    throw error;
  }
}

export async function deleteJsonData(name: string) {
  try {
    await sql`DELETE FROM json_data WHERE name = ${name}`;
  } catch (error) {
    console.error('JSON veri silinirken hata:', error);
    throw error;
  }
}
