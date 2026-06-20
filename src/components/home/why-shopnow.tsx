import {
  Truck,
  ShieldCheck,
  Star,
} from "lucide-react";

const features = [
  {
    title: "Fast Delivery",
    icon: Truck,
  },
  {
    title: "Secure Payment",
    icon: ShieldCheck,
  },
  {
    title: "Premium Quality",
    icon: Star,
  },
];

export default function WhyShopNow() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-12 text-center text-4xl font-bold">
          Why ShopNow?
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-3xl border p-10 text-center"
              >
                <Icon className="mx-auto mb-5 h-12 w-12" />

                <h3 className="font-semibold">
                  {feature.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}