import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

import Hero from "@/components/home/hero";
import Categories from "@/components/home/categories";
import FeaturedProducts from "@/components/home/featured-products";
import WhyShopNow from "@/components/home/why-shopnow";
import CtaBanner from "@/components/home/cta-banner";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <WhyShopNow />
      <CtaBanner />
      <Footer />
    </>
  );
}