import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.productId) {
    return NextResponse.json(
      {
        message: "Product ID is required",
      },
      {
        status: 400,
      }
    );
  }

  const product = await prisma.product.findUnique({
    where: {
      id: body.productId,
    },
  });

  if (!product) {
    return NextResponse.json(
      {
        message: "Product not found",
      },
      {
        status: 404,
      }
    );
  }

  const exist = await prisma.wishlist.findFirst({
    where: {
      productId: body.productId,
    },
  });

  if (exist) {
    return NextResponse.json(exist);
  }

  const wishlist = await prisma.wishlist.create({
    data: {
      productId: body.productId,
    },
  });

  return NextResponse.json(wishlist);
}

export async function GET() {
  const items = await prisma.wishlist.findMany({
    include: {
      product: true,
    },
  });

  return NextResponse.json(items);
}
