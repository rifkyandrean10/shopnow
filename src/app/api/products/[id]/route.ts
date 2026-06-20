import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  context: any
) {
  const { id } = await context.params;

  await prisma.product.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}