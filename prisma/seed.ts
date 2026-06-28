import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const seller = await prisma.user.upsert({
    where: {
      email: "seller@shopnow.com",
    },
    update: {
      name: "ShopNow Seller",
    },
    create: {
      name: "ShopNow Seller",
      email: "seller@shopnow.com",
    },
  });

  const products = [
    {
      name: "Nike Air Max",
      description: "Premium running shoes with lightweight comfort.",
      price: 1200000,
      stock: 120,
      category: "Fashion",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    },
    {
      name: "Smart Watch",
      description: "Modern smartwatch for fitness tracking and notifications.",
      price: 1599000,
      stock: 80,
      category: "Electronics",
      image:
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800",
    },
    {
      name: "Gaming Mouse",
      description: "Precision gaming mouse with responsive tracking.",
      price: 499000,
      stock: 40,
      category: "Gaming",
      image:
        "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800",
    },
    {
      name: "Wireless Headphone",
      description: "Comfortable wireless headphones with immersive sound.",
      price: 899000,
      stock: 65,
      category: "Electronics",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    },
    {
      name: "Mechanical Keyboard",
      description: "Tactile mechanical keyboard for work and gaming setups.",
      price: 749000,
      stock: 55,
      category: "Gaming",
      image:
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800",
    },
    {
      name: "Leather Backpack",
      description: "Minimal backpack with spacious compartments for daily use.",
      price: 650000,
      stock: 35,
      category: "Fashion",
      image:
        "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800",
    },
    {
      name: "Ceramic Coffee Mug",
      description: "Simple ceramic mug with a clean matte finish.",
      price: 129000,
      stock: 90,
      category: "Home",
      image:
        "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800",
    },
    {
      name: "Desk Lamp",
      description: "Adjustable LED desk lamp for focused study and work.",
      price: 329000,
      stock: 45,
      category: "Home",
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800",
    },
    {
      name: "Running Jacket",
      description: "Lightweight jacket designed for outdoor runs.",
      price: 580000,
      stock: 42,
      category: "Fashion",
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
    },
  ];

  for (const product of products) {
    const existingProduct = await prisma.product.findFirst({
      where: {
        name: product.name,
      },
    });

    if (existingProduct) {
      await prisma.product.update({
        where: {
          id: existingProduct.id,
        },
        data: {
          ...product,
          sellerId: seller.id,
        },
      });
    } else {
      await prisma.product.create({
        data: {
          ...product,
          sellerId: seller.id,
        },
      });
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
