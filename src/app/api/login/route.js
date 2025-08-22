// app/api/login/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "../../../lib/dbConnect";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    const usersCollection = await dbConnect("users");
    const user = await usersCollection.findOne({ email });
    
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }

    const { password: _, ...userWithoutPassword } = user;

    // Set user data in cookie
    const cookieStore = cookies();
    cookieStore.set('user', JSON.stringify(userWithoutPassword), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return NextResponse.json(
      { 
        message: "Login successful", 
        user: userWithoutPassword 
      }, 
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}