import { NextRequest, NextResponse } from 'next/server';
import { addCarSubmission, getAllCarSubmissions, deleteCarSubmission } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await addCarSubmission(body);
    
    return NextResponse.json({
      success: true,
      data: result,
      message: 'Araç değerleme talebi başarıyla kaydedildi'
    });
  } catch (error) {
    console.error('Araç değerleme talebi eklenirken hata:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Araç değerleme talebi eklenirken bir hata oluştu'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const submissions = await getAllCarSubmissions();
    
    return NextResponse.json({
      success: true,
      data: submissions
    });
  } catch (error) {
    console.error('Araç değerleme talepleri getirilirken hata:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Araç değerleme talepleri getirilirken bir hata oluştu'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: 'ID parametresi gerekli'
        },
        { status: 400 }
      );
    }
    
    await deleteCarSubmission(id);
    
    return NextResponse.json({
      success: true,
      message: 'Araç değerleme talebi başarıyla silindi'
    });
  } catch (error) {
    console.error('Araç değerleme talebi silinirken hata:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Araç değerleme talebi silinirken bir hata oluştu'
      },
      { status: 500 }
    );
  }
}
