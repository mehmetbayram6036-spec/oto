import { NextRequest, NextResponse } from 'next/server';
import { getAdminStats, updateAdminStats } from '@/lib/db';

export async function GET() {
  try {
    const stats = await getAdminStats();
    
    return NextResponse.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Admin istatistikleri getirilirken hata:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Admin istatistikleri getirilirken bir hata oluştu'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { totalValuations, totalUsers, totalEmails, successRate } = body;
    
    if (totalValuations === undefined || totalUsers === undefined || 
        totalEmails === undefined || successRate === undefined) {
      return NextResponse.json(
        {
          success: false,
          message: 'Tüm istatistik alanları gerekli'
        },
        { status: 400 }
      );
    }
    
    const result = await updateAdminStats({
      totalValuations,
      totalUsers,
      totalEmails,
      successRate
    });
    
    return NextResponse.json({
      success: true,
      data: result,
      message: 'Admin istatistikleri başarıyla güncellendi'
    });
  } catch (error) {
    console.error('Admin istatistikleri güncellenirken hata:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Admin istatistikleri güncellenirken bir hata oluştu'
      },
      { status: 500 }
    );
  }
}
