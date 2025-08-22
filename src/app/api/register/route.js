import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "../../../lib/dbConnect";

export async function POST(req) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // DB connect
    const usersCollection = await dbConnect("users");

    // Already exists?
    const exist = await usersCollection.findOne({ email });
    if (exist) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    await usersCollection.insertOne(newUser);

    return NextResponse.json(
      { message: "User registered", user: { email, firstName, lastName, phone } },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
