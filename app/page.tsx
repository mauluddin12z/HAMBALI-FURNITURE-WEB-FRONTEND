"use client";
import React from "react";
import OpeningSection from "./LandingPage/section/OpeningSection";
import CategoriesSection from "./LandingPage/section/CategoriesSection";
import ProductsSection from "./LandingPage/section/ProductsSection";
import BlogsSection from "./LandingPage/section/BlogsSection";
import BenefitsSection from "./LandingPage/section/BenefitsSection";
import MainLayout from "./components/MainLayout";

export default function page() {
  return (
    <MainLayout>
      <section className="lg:mb-28 mb-16">
        <OpeningSection />
      </section>
      <section className="lg:mb-28 mb-16">
        <BenefitsSection />
      </section>
      <section className="lg:mb-28 mb-16">
        <CategoriesSection />
      </section>
      <section className="lg:mb-28 mb-16">
        <ProductsSection />
      </section>
      <section className="lg:mb-28 mb-16">
        <BlogsSection />
      </section>
    </MainLayout>
  );
}
