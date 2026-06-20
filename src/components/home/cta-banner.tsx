import { Button } from "@/components/ui/button";

export default function CtaBanner() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="rounded-[32px] bg-gradient-to-r from-blue-600 to-indigo-600 p-16 text-center text-white">

          <h2 className="mb-4 text-5xl font-bold">
            Ready To Start Shopping?
          </h2>

          <p className="mb-8 text-lg">
            Discover thousands of amazing products.
          </p>

          <Button
            variant="secondary"
            size="lg"
          >
            Shop Now
          </Button>

        </div>

      </div>
    </section>
  );
}