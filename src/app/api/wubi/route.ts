import { NextRequest, NextResponse } from 'next/server';
import { getCharacterInfo } from '@/services/wubiService';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const char = searchParams.get('char');
  
  if (!char) {
    return NextResponse.json(
      { error: '请提供要查询的汉字' },
      { status: 400 }
    );
  }
  
  try {
    const info = await getCharacterInfo(char);
    
    if (!info) {
      return NextResponse.json(
        { error: '未找到该汉字的五笔编码信息' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(info);
  } catch (error) {
    console.error('查询五笔编码时出错:', error);
    return NextResponse.json(
      { error: '查询过程中发生错误' },
      { status: 500 }
    );
  }
} 