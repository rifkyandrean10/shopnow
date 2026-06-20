"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-purple-50" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        {/* Left */}
        <div>
          <div className="mb-6 inline-flex items-center rounded-full border bg-white px-4 py-2 text-sm shadow-sm">
            ✨ New Collection 2026
          </div>

          <h1 className="mb-6 text-6xl font-bold tracking-tight lg:text-8xl">
            Shop Smarter.
            <br />
            Live Better.
          </h1>

          <p className="mb-8 max-w-xl text-lg text-muted-foreground">
            Discover premium products from trusted sellers with
            lightning-fast delivery and a seamless shopping experience.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button size="lg">
              Shop Now
            </Button>

            <Button
              variant="outline"
              size="lg"
            >
              Explore
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-12 flex gap-8">
            <div>
              <h3 className="text-3xl font-bold">
                10K+
              </h3>

              <p className="text-muted-foreground">
                Products
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">
                5K+
              </h3>

              <p className="text-muted-foreground">
                Customers
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">
                99%
              </h3>

              <p className="text-muted-foreground">
                Satisfaction
              </p>
            </div>
          </div>
        </div>

        {/* Right */}
        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          className="relative"
        >
          <div className="overflow-hidden rounded-[40px] border bg-white p-5 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
              alt="Nike Shoe"
              className="h-full w-full rounded-[30px] object-cover"
            />
          </div>

          {/* Floating Card 1 */}
          <div className="absolute -left-8 top-10 rounded-2xl bg-white p-4 shadow-xl">
            <p className="text-sm text-muted-foreground">
              Best Seller
            </p>

            <h4 className="font-semibold">
              Nike Air Max
            </h4>
          </div>

          {/* Floating Card 2 */}
          <div className="absolute -bottom-5 right-5 rounded-2xl bg-white p-4 shadow-xl">
            <p className="text-sm text-muted-foreground">
              Starting From
            </p>

            <h4 className="font-bold text-blue-600">
              Rp 1.2M
            </h4>
          </div>
        </motion.div>
      </div>
    </section>
  );
}