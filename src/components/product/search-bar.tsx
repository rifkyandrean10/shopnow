"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();

  const [keyword, setKeyword] =
    useState("");

  function handleSearch(
    e: React.FormEvent
  ) {
    e.preventDefault();

    router.push(
      `/products?search=${keyword}`
    );
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex gap-3"
    >
      <input
        value={keyword}
        onChange={(e) =>
          setKeyword(e.target.value)
        }
        placeholder="Search products..."
        className="w-full rounded-xl border px-4 py-3"
      />

      <button
        type="submit"
        className="rounded-xl bg-blue-600 px-6 text-white"
      >
        Search
      </button>
    </form>
  );
}