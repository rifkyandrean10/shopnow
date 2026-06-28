import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log("===== CART API HIT =====");

  const body = await request.json();

  console.log(body);

  const existing = await prisma.cartItem.findFirst({
    where: {
      productId: body.productId,
    },
  });

  console.log(existing);

  if (existing) {
    const updated = await prisma.cartItem.update({
      where: {
        id: existing.id,
      },
      data: {
        quantity: existing.quantity + 1,
      },
    });

    console.log(updated);

    return NextResponse.json(updated);
  }

  const item = await prisma.cartItem.create({
    data: {
      productId: body.productId,
      quantity: 1,
    },
  });

  console.log(item);

  return NextResponse.json(item);
}