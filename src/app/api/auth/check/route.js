// app/api/auth/check/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = cookies();
    const userData = cookieStore.get('user');
    
    if (!userData) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const user = JSON.parse(userData.value);
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}