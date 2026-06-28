"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface SearchBarProps {
  category?: string;
  defaultValue?: string;
}

export default function SearchBar({
  category,
  defaultValue = "",
}: SearchBarProps) {
  const router = useRouter();

  const [keyword, setKeyword] =
    useState(defaultValue);

  function handleSearch(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const params = new URLSearchParams();

    if (keyword.trim()) {
      params.set("search", keyword.trim());
    }

    if (category) {
      params.set("category", category);
    }

    const query = params.toString();

    router.push(query ? `/products?${query}` : "/products");
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
