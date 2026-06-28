// src/app/api/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email dan password wajib diisi" }, 
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email sudah terdaftar. Silakan login." }, 
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "BUYER",
      },
    });

    return NextResponse.json(
      { message: "Registrasi berhasil", user: { id: user.id, email: user.email } }, 
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saat registrasi:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" }, 
      { status: 500 }
    );
  }
}