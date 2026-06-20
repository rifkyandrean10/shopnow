import {
  Smartphone,
  Shirt,
  Gamepad2,
  BookOpen,
  Dumbbell,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    name: "Electronics",
    icon: Smartphone,
    description: "Latest gadgets",
  },
  {
    name: "Fashion",
    icon: Shirt,
    description: "Trending styles",
  },
  {
    name: "Gaming",
    icon: Gamepad2,
    description: "Gaming gear",
  },
  {
    name: "Books",
    icon: BookOpen,
    description: "Best reads",
  },
  {
    name: "Sports",
    icon: Dumbbell,
    description: "Fitness products",
  },
  {
    name: "Beauty",
    icon: Sparkles,
    description: "Beauty essentials",
  },
];

export default function Categories() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <h2 className="text-5xl font-bold">
            Shop By Category
          </h2>

          <p className="mt-4 text-muted-foreground">
            Explore our most popular collections
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-6">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.name}
                className="group cursor-pointer rounded-3xl border bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                  <Icon size={28} />
                </div>

                <h3 className="font-semibold">
                  {category.name}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {category.description}
                </p>

                <ArrowRight
                  size={18}
                  className="mt-4 transition group-hover:translate-x-1"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}