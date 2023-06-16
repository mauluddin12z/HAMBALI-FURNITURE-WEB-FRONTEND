import React from "react";
import HeaderSection from "./section/LandingPage/HeaderSection";
import OpeningSection from "./section/LandingPage/OpeningSection";
import ProductsSection from "./section/LandingPage/ProductsSection";

export default function page() {
  return (
    <>
      <section>
        <HeaderSection />
      </section>
      <section id="opening" className="opening-background h-screen mb-[150px]">
        <OpeningSection />
      </section>
      <section className="mb-44 scroll-mt-28" id="products">
        <ProductsSection />
      </section>
    </>
  );
}
