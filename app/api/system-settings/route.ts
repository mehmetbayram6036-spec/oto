import { NextRequest, NextResponse } from 'next/server';
import { getSystemSetting, upsertSystemSetting } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');
    
    if (!key) {
      return NextResponse.json(
        {
          success: false,
          message: 'Key parametresi gerekli'
        },
        { status: 400 }
      );
    }
    
    const value = await getSystemSetting(key);
    
    return NextResponse.json({
      success: true,
      data: { key, value }
    });
  } catch (error) {
    console.error('Sistem ayarı getirilirken hata:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Sistem ayarı getirilirken bir hata oluştu'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, value, description } = body;
    
    if (!key || !value) {
      return NextResponse.json(
        {
          success: false,
          message: 'Key ve value parametreleri gerekli'
        },
        { status: 400 }
      );
    }
    
    const result = await upsertSystemSetting(key, value, description);
    
    return NextResponse.json({
      success: true,
      data: result,
      message: 'Sistem ayarı başarıyla güncellendi'
    });
  } catch (error) {
    console.error('Sistem ayarı güncellenirken hata:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Sistem ayarı güncellenirken bir hata oluştu'
      },
      { status: 500 }
    );
  }
}
