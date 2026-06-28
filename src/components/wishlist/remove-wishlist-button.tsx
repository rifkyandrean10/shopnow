"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RemoveWishlistButton({
  id,
}: {
  id: string;
}) {
  const router = useRouter();
  const [isRemoving, setIsRemoving] = useState(false);

  async function removeWishlist() {
    setIsRemoving(true);

    await fetch(`/api/wishlist/${id}`, {
      method: "DELETE",
    });

    router.refresh();
    setIsRemoving(false);
  }

  return (
    <button
      type="button"
      onClick={removeWishlist}
      disabled={isRemoving}
      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Trash2 size={16} />
      {isRemoving ? "Removing..." : "Remove"}
    </button>
  );
}
