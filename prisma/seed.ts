import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const seller = await prisma.user.create({
    data: {
      name: "ShopNow Seller",
      email: "seller@shopnow.com",
    },
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Nike Air Max",
        description: "Premium running shoes",
        price: 1200000,
        stock: 120,
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
        sellerId: seller.id,
      },
      {
        name: "Smart Watch",
        description: "Modern smartwatch",
        price: 1599000,
        stock: 80,
        image:
          "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800",
        sellerId: seller.id,
      },
      {
        name: "Gaming Mouse",
        description: "Precision gaming mouse",
        price: 499000,
        stock: 40,
        image:
          "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800",
        sellerId: seller.id,
      },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });