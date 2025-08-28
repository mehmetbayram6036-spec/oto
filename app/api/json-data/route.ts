import { NextRequest, NextResponse } from 'next/server';
import { getJsonData, upsertJsonData, getAllJsonData, deleteJsonData } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    
    if (name) {
      // Belirli bir JSON veriyi getir
      const data = await getJsonData(name);
      
      if (!data) {
        return NextResponse.json(
          {
            success: false,
            message: 'JSON veri bulunamadı'
          },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        success: true,
        data
      });
    } else {
      // Tüm JSON verileri getir
      const allData = await getAllJsonData();
      
      return NextResponse.json({
        success: true,
        data: allData
      });
    }
  } catch (error) {
    console.error('JSON veri getirilirken hata:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'JSON veri getirilirken bir hata oluştu'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, data, description } = body;
    
    if (!name || !data) {
      return NextResponse.json(
        {
          success: false,
          message: 'Name ve data parametreleri gerekli'
        },
        { status: 400 }
      );
    }
    
    // JSON formatını kontrol et
    try {
      JSON.parse(data);
    } catch (e) {
      return NextResponse.json(
        {
          success: false,
          message: 'Geçersiz JSON formatı'
        },
        { status: 400 }
      );
    }
    
    const result = await upsertJsonData(name, data, description);
    
    return NextResponse.json({
      success: true,
      data: result,
      message: 'JSON veri başarıyla güncellendi'
    });
  } catch (error) {
    console.error('JSON veri güncellenirken hata:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'JSON veri güncellenirken bir hata oluştu'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    
    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: 'Name parametresi gerekli'
        },
        { status: 400 }
      );
    }
    
    await deleteJsonData(name);
    
    return NextResponse.json({
      success: true,
      message: 'JSON veri başarıyla silindi'
    });
  } catch (error) {
    console.error('JSON veri silinirken hata:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'JSON veri silinirken bir hata oluştu'
      },
      { status: 500 }
    );
  }
}
