
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    console.log('hi');
  // 미들웨어 로직
  return NextResponse.next()
}
 
// 특정 경로에만 미들웨어를 적용하고 싶다면:
export const config = {
  matcher: '/api/:path*'
}