"use client";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Nike Air Max",
    price: "Rp 1.200.000",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
  },
  {
    id: 2,
    name: "Wireless Headphone",
    price: "Rp 899.000",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: "Rp 499.000",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800",
  },
  {
    id: 4,
    name: "Smart Watch",
    price: "Rp 1.599.000",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex items-center justify-between">
          <div>
            <h2 className="text-5xl font-bold">
              Featured Products
            </h2>

            <p className="mt-3 text-muted-foreground">
              Most loved products this month
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.id}
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
                  className="absolute right-4 top-4 rounded-full bg-white p-2 shadow-md"
                  onClick={(e) => e.preventDefault()}
                >
                  <Heart size={18} />
                </button>
              </div>

              <div className="p-5">
                <div className="mb-3 flex items-center gap-1">
                  <Star
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  <span className="text-sm font-medium">
                    {product.rating}
                  </span>
                </div>

                <h3 className="text-lg font-semibold">
                  {product.name}
                </h3>

                <p className="mt-3 text-xl font-bold text-blue-600">
                  {product.price}
                </p>

                <Button
                  className="mt-5 w-full"
                  onClick={(e) => e.preventDefault()}
                >
                  Add To Cart
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}