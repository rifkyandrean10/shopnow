"use client";

import Link from "next/link";
import { Heart, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  rating?: number;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group overflow-hidden rounded-[32px] border bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <button
          type="button"
          onClick={(e) => e.preventDefault()}
          className="absolute right-4 top-4 rounded-full bg-white p-2 shadow-md"
        >
          <Heart
            size={18}
            className="transition hover:scale-110"
          />
        </button>
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-center gap-2">
          <Star
            size={16}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="text-sm font-medium">
            {product.rating ?? 4.8}
          </span>
        </div>

        <h3 className="line-clamp-1 text-lg font-semibold">
          {product.name}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>

        <p className="mt-4 text-2xl font-bold text-blue-600">
          {formatPrice(product.price)}
        </p>

        <Button className="mt-5 w-full">
          View Product
        </Button>
      </div>
    </Link>
  );
}