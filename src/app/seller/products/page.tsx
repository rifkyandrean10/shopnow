import { prisma } from "@/lib/prisma";

import AddProductModal from "@/components/dashboard/add-product-modal";
import EditProductModal from "@/components/dashboard/edit-product-modal";
import DeleteProductButton from "@/components/dashboard/delete-product-button";

export default async function SellerProducts() {
  const products =
    await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <main className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          Products
        </h1>

        <AddProductModal />
      </div>

      <div className="rounded-3xl border bg-white p-8">
        <table className="w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b"
              >
                <td className="py-4">
                  {product.name}
                </td>

                <td>
                  Rp{" "}
                  {product.price.toLocaleString()}
                </td>

                <td>{product.stock}</td>

                <td>
                  <div className="flex gap-2">
                    <EditProductModal
                      product={product}
                    />

                    <DeleteProductButton
                      id={product.id}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}