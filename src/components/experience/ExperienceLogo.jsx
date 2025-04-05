"use client";
import Image from "next/image";
import { useState } from "react";

const ExperienceLogo = ({ src, alt, className = "" }) => {
  const [error, setError] = useState(false);
  
  const fallbackImage = "/images/experience/default-company.svg";
  
  const handleError = () => {
    console.log(`Image load error for: ${src}`);
    setError(true);
  };

  return (
    <div className={`relative w-12 h-12 overflow-hidden rounded-lg ${className}`}>
      <Image
        src={error ? fallbackImage : src}
        alt={alt || "Company logo"}
        fill
        sizes="(max-width: 768px) 48px, 96px"
        className="object-contain p-1"
        onError={handleError}
        priority={false}
        loading="lazy"
      />
    </div>
  );
};

export default ExperienceLogo; 