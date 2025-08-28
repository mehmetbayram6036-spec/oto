import { createTables, upsertJsonData } from '../lib/db';
import fs from 'fs';
import path from 'path';

async function initializeDatabase() {
  try {
    console.log('Veritabanı tabloları oluşturuluyor...');
    await createTables();
    console.log('✅ Veritabanı tabloları başarıyla oluşturuldu');

    // JSON dosyalarını yükle
    const jsonFiles = [
      { name: 'car-models', file: 'car-models.json', description: 'Araç marka ve modelleri' },
      { name: 'car-packages', file: 'car-packages.json', description: 'Araç paketleri' },
      { name: 'car-values', file: 'car-values.json', description: 'Araç değerleri' },
      { name: 'tip-adlari', file: 'tip-adlari.json', description: 'Tip adları' },
      { name: 'year-based-car-data', file: 'year-based-car-data.json', description: 'Yıl bazlı araç verileri' }
    ];

    console.log('JSON dosyaları veritabanına yükleniyor...');
    
    for (const jsonFile of jsonFiles) {
      try {
        const filePath = path.join(process.cwd(), 'public', jsonFile.file);
        if (fs.existsSync(filePath)) {
          const data = fs.readFileSync(filePath, 'utf8');
          await upsertJsonData(jsonFile.name, data, jsonFile.description);
          console.log(`✅ ${jsonFile.name} başarıyla yüklendi`);
        } else {
          console.log(`⚠️ ${jsonFile.file} dosyası bulunamadı`);
        }
      } catch (error) {
        console.error(`❌ ${jsonFile.name} yüklenirken hata:`, error);
      }
    }

    console.log('🎉 Veritabanı başlatma işlemi tamamlandı!');
  } catch (error) {
    console.error('❌ Veritabanı başlatılırken hata:', error);
  }
}

// Script çalıştırılıyorsa
if (require.main === module) {
  initializeDatabase();
}

export { initializeDatabase };
