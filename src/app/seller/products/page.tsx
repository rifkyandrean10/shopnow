import AddProductModal from "@/components/dashboard/add-product-modal";
import { prisma } from "@/lib/prisma";
import EditProductModal from "@/components/dashboard/edit-product-modal";


export default async function SellerProducts() {
  const products =
    await prisma.product.findMany();

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
              <tr key={product.id}>
                <td>{product.name}</td>

                <td>
                  Rp {product.price.toLocaleString()}
                </td>

                <td>{product.stock}</td>

                <td>
                  <EditProductModal
                    product={product}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}