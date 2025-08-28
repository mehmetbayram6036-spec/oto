import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // E-posta transporter'ı oluştur
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // E-posta içeriği
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'mehmetbayram@gmail.com',
      subject: `Yeni İletişim Formu - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            📧 Yeni İletişim Formu
          </h2>

          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">👤 İletişim Bilgileri</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Ad Soyad:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">E-mail:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Telefon:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${phone}</td>
              </tr>
            </table>
          </div>

          <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">💬 Mesaj</h3>
            <div style="background-color: white; padding: 15px; border-radius: 6px; border-left: 4px solid #3b82f6;">
              <p style="margin: 0; color: #1e293b; line-height: 1.6;">${message}</p>
            </div>
          </div>

          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              <strong>⏰ Gönderim Tarihi:</strong> ${new Date().toLocaleString('tr-TR')}
            </p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 12px;">
              Bu e-posta aracteklifi.com iletişim formundan otomatik olarak gönderilmiştir.
            </p>
          </div>
        </div>
      `
    };

    // E-postayı gönder
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: 'Mesajınız başarıyla gönderildi'
    });

  } catch (error) {
    console.error('İletişim formu gönderme hatası:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Mesaj gönderilirken bir hata oluştu'
      },
      { status: 500 }
    );
  }
}
