import React from "react";
import OpeningSection from "./section/LandingPage/OpeningSection";
import ProductsSection from "./section/LandingPage/ProductsSection";
import CategoriesSection from "./section/LandingPage/CategoriesSection";

export default function page() {
  return (
    <>
      <section className="opening-background lg:mb-28 mb-16">
        <OpeningSection />
      </section>
      <section className="lg:mb-28 mb-16">
        <CategoriesSection />
      </section>
      <section className="lg:mb-28 mb-16" id="products">
        <ProductsSection />
      </section>
    </>
  );
}
