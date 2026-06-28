"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteProduct(
  id: string
) {
  await prisma.product.delete({
    where: {
      id,
    },
  });

  revalidatePath("/seller/products");
}

export async function checkout(formData: FormData) {
  const customerName = String(formData.get("customerName") || "").trim();
  const customerEmail = String(formData.get("customerEmail") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const paymentMethod = String(formData.get("paymentMethod") || "COD");

  if (!customerName || !customerEmail || !phone || !address) {
    throw new Error("Lengkapi semua data checkout.");
  }

  const items = await prisma.cartItem.findMany({
    include: {
      product: true,
    },
  });

  if (items.length === 0) {
    throw new Error("Keranjang masih kosong.");
  }

  const outOfStockItem = items.find((item) => item.quantity > item.product.stock);

  if (outOfStockItem) {
    throw new Error(`${outOfStockItem.product.name} tidak memiliki stok yang cukup.`);
  }

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const order = await prisma.$transaction(async (tx) => {
    const user = await tx.user.upsert({
      where: {
        email: customerEmail,
      },
      update: {
        name: customerName,
      },
      create: {
        name: customerName,
        email: customerEmail,
      },
    });

    const createdOrder = await tx.order.create({
      data: {
        total,
        userId: user.id,
        customerName,
        customerEmail,
        phone,
        address,
        paymentMethod,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
    });

    for (const item of items) {
      await tx.product.update({
        where: {
          id: item.productId,
        },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    await tx.cartItem.deleteMany();

    return createdOrder;
  });

  revalidatePath("/cart");
  revalidatePath("/products");
  revalidatePath("/seller");
  redirect(`/checkout/success?orderId=${order.id}`);
}
