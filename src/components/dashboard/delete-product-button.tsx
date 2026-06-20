"use client";

import { useRouter } from "next/navigation";

export default function DeleteProductButton({
  id,
}: {
  id: string;
}) {
  const router = useRouter();

  async function handleDelete() {
    const confirmDelete = confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-xl bg-red-500 px-4 py-2 text-white"
    >
      Delete
    </button>
  );
}