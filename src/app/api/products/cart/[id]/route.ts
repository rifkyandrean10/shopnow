import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const item = await prisma.cartItem.update({
    where: {
      id,
    },
    data: {
      quantity: body.quantity,
    },
    include: {
      product: true,
    },
  });

  return NextResponse.json(item);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.cartItem.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}