"use client";

export default function EditProductModal({
  product,
}: {
  product: any;
}) {
  async function handleSubmit() {
    const res = await fetch(
      `/api/products/${product.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          ...product,
          name: product.name + " Updated",
        }),
      }
    );

    const data = await res.json();

    console.log(data);

    location.reload();
  }

  return (
    <button
      onClick={handleSubmit}
      className="rounded bg-blue-600 px-4 py-2 text-white"
    >
      Quick Edit
    </button>
  );
}