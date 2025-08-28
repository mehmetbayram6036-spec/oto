import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Vercel runtime ayarı
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      brand,
      model,
      year,
      hasar,
      kilometer,
      licensePlate,
      tramerAmount,
      fuelType,
      transmission,
      condition,
      carPackage,
      firstName,
      lastName,
      phone,
      city,
      district
    } = body;

    // E-posta transporter'ı oluştur
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Gmail kullanıcı adı
        pass: process.env.EMAIL_PASS  // Gmail uygulama şifresi
      }
    });

    // Hasar bilgilerini HTML formatında hazırla
    const hasarHTML = hasar && Object.keys(hasar).length > 0 ? `
      <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
        <h3 style="color: #1e293b; margin-top: 0;">🔧 Hasar Bilgileri</h3>
        <table style="width: 100%; border-collapse: collapse;">
          ${Object.entries(hasar).map(([part, damage]) => `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #fde68a; font-weight: bold; color: #92400e;">${part.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #fde68a; color: #92400e;">${damage}</td>
            </tr>
          `).join('')}
        </table>
      </div>
    ` : '';

    // E-posta içeriği
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'mehmetbayram@gmail.com',
      subject: `Yeni Araç Değerleme Talebi - ${brand} ${model}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            🚗 Yeni Araç Değerleme Talebi
          </h2>

          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">📋 Araç Bilgileri</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Marka:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${brand}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Model:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${model}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Yıl:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${year}</td>
              </tr>
              ${carPackage ? `
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Paket:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${carPackage}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Kilometre:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${kilometer} km</td>
              </tr>
              ${licensePlate ? `
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Plaka:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${licensePlate}</td>
              </tr>
              ` : ''}
              ${tramerAmount ? `
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Tramer Bilgisi:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${tramerAmount} ₺</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Yakıt Tipi:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${fuelType}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Vites:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${transmission}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Durum:</td>
                <td style="padding: 8px 0; color: #1e293b;">${condition}</td>
              </tr>
            </table>
          </div>

          ${hasarHTML}

          <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">👤 İletişim Bilgileri</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #dbeafe; font-weight: bold; color: #64748b;">Ad Soyad:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #dbeafe; color: #1e293b;">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #dbeafe; font-weight: bold; color: #64748b;">Telefon:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #dbeafe; color: #1e293b;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #dbeafe; font-weight: bold; color: #64748b;">İl:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #dbeafe; color: #1e293b;">${city}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">İlçe:</td>
                <td style="padding: 8px 0; color: #1e293b;">${district}</td>
              </tr>
            </table>
          </div>

          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              <strong>⏰ Talep Tarihi:</strong> ${new Date().toLocaleString('tr-TR')}
            </p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 12px;">
              Bu e-posta aracteklifi.com araç değerleme platformundan otomatik olarak gönderilmiştir.
            </p>
          </div>
        </div>
      `
    };

    // E-postayı gönder
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: 'E-posta başarıyla gönderildi'
    });

  } catch (error) {
    console.error('E-posta gönderme hatası:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'E-posta gönderilirken bir hata oluştu'
      },
      { status: 500 }
    );
  }
}
