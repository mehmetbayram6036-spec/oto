import { NextRequest, NextResponse } from 'next/server';
import { addContactMessage, getAllContactMessages, deleteContactMessage } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await addContactMessage(body);
    
    return NextResponse.json({
      success: true,
      data: result,
      message: 'İletişim mesajı başarıyla kaydedildi'
    });
  } catch (error) {
    console.error('İletişim mesajı eklenirken hata:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'İletişim mesajı eklenirken bir hata oluştu'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const messages = await getAllContactMessages();
    
    return NextResponse.json({
      success: true,
      data: messages
    });
  } catch (error) {
    console.error('İletişim mesajları getirilirken hata:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'İletişim mesajları getirilirken bir hata oluştu'
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
    
    await deleteContactMessage(id);
    
    return NextResponse.json({
      success: true,
      message: 'İletişim mesajı başarıyla silindi'
    });
  } catch (error) {
    console.error('İletişim mesajı silinirken hata:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'İletişim mesajı silinirken bir hata oluştu'
      },
      { status: 500 }
    );
  }
}
