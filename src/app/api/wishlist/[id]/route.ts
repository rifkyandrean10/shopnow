import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const wishlist = await prisma.wishlist.findUnique({
    where: {
      id,
    },
  });

  if (!wishlist) {
    return NextResponse.json(
      {
        message: "Wishlist item not found",
      },
      {
        status: 404,
      }
    );
  }

  await prisma.wishlist.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}
