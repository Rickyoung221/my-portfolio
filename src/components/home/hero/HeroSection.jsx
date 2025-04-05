"use client";
import React from "react";
import HeroTextContent from "./HeroTextContent";
import HeroModel from './HeroModel';

const HeroSection = () => {
  return (
    <section className="py-4 sm:py-8">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 place-items-center max-w-5xl mx-auto px-4">
        <HeroTextContent />
        <HeroModel />
      </div>
    </section>
  );
};

export default HeroSection;
