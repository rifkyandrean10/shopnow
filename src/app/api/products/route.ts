import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();

  const seller =
    await prisma.user.findFirst();

  const product =
    await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        category: body.category,
        price: Number(body.price),
        stock: Number(body.stock),
        image: body.image,
        sellerId: seller!.id,
      },
    });

  return NextResponse.json(product);
}