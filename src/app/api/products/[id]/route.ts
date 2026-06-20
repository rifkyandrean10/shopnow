import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const product =
      await prisma.product.update({
        where: {
          id,
        },
        data: {
          name: body.name,
          description: body.description,
          price: Number(body.price),
          stock: Number(body.stock),
          image: body.image,
          category: body.category,
        },
      });

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}