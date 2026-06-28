import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const testProducts = await prisma.product.findMany({
    where: {
      name: {
        contains: "Updated",
        mode: "insensitive",
      },
    },
    include: {
      _count: {
        select: {
          cartItems: true,
          wishlistItems: true,
          orderItems: true,
        },
      },
    },
  });

  const removableTestProductIds = testProducts
    .filter((product) => product._count.orderItems === 0)
    .map((product) => product.id);

  if (removableTestProductIds.length > 0) {
    await prisma.cartItem.deleteMany({
      where: {
        productId: {
          in: removableTestProductIds,
        },
      },
    });

    await prisma.wishlist.deleteMany({
      where: {
        productId: {
          in: removableTestProductIds,
        },
      },
    });

    await prisma.product.deleteMany({
      where: {
        id: {
          in: removableTestProductIds,
        },
      },
    });

    console.log(`Deleted ${removableTestProductIds.length} test product(s).`);
  }

  const products = await prisma.product.findMany({
    include: {
      _count: {
        select: {
          cartItems: true,
          wishlistItems: true,
          orderItems: true,
        },
      },
    },
    orderBy: [
      {
        name: "asc",
      },
      {
        createdAt: "asc",
      },
    ],
  });

  const productsByName = new Map<string, typeof products>();

  for (const product of products) {
    const normalizedName = product.name.replace(/(\s+Updated)+$/gi, "");
    const group = productsByName.get(normalizedName) || [];
    group.push(product);
    productsByName.set(normalizedName, group);
  }

  const duplicateIds: string[] = [];

  for (const [name, group] of productsByName.entries()) {
    if (group.length < 2) {
      continue;
    }

    const sortedGroup = [...group].sort((a, b) => {
      const aUsage = a._count.cartItems + a._count.wishlistItems + a._count.orderItems;
      const bUsage = b._count.cartItems + b._count.wishlistItems + b._count.orderItems;

      if (aUsage !== bUsage) {
        return bUsage - aUsage;
      }

      return a.createdAt.getTime() - b.createdAt.getTime();
    });

    const [keptProduct, ...duplicates] = sortedGroup;

    console.log(`Keep "${name}" -> ${keptProduct.id}`);

    for (const duplicate of duplicates) {
      duplicateIds.push(duplicate.id);
      console.log(`Delete duplicate "${name}" -> ${duplicate.id}`);
    }
  }

  if (duplicateIds.length === 0) {
    console.log("No duplicate products found.");
    return;
  }

  await prisma.cartItem.deleteMany({
    where: {
      productId: {
        in: duplicateIds,
      },
    },
  });

  await prisma.wishlist.deleteMany({
    where: {
      productId: {
        in: duplicateIds,
      },
    },
  });

  await prisma.product.deleteMany({
    where: {
      id: {
        in: duplicateIds,
      },
    },
  });

  console.log(`Deleted ${duplicateIds.length} duplicate product(s).`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
