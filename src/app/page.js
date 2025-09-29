"use client";
import dynamic from "next/dynamic";
import HeroSection from "@/components/home/hero/HeroSection";
import SectionTitle from "@/components/ui/SectionTitle";
import { useTheme } from "@/context/ThemeContext";

// 动态导入非关键组件
const ProjectsSection = dynamic(
  () => import("@/components/projects/ProjectsSection"),
  {
    loading: () => <div>Loading...</div>,
    ssr: false,
  }
);

const AboutSection = dynamic(() => import("@/components/about/AboutSection"), {
  loading: () => <div>Loading...</div>,
});

const EmailSection = dynamic(
  () => import("@/components/contact/EmailSection"),
  {
    loading: () => <div>Loading...</div>,
  }
);

export default function Home() {
  const { isDarkMode } = useTheme();

  return (
    <main
      className={`flex min-h-screen flex-col ${
        isDarkMode ? "bg-[#002b36]" : "bg-[#fdf6e3]"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-4 mt-16 sm:mt-20 md:mt-24">
        <HeroSection />
        <div className="mt-16 sm:mt-20">
          <SectionTitle title=" " />
          <AboutSection />
        </div>
        <div className="mt-16 sm:mt-20">
          <SectionTitle title="My Projects" />
          <ProjectsSection />
        </div>
        <div className="mt-16 sm:mt-20 mb-16 sm:mb-24">
          <SectionTitle title="Contact Me" />
          <EmailSection />
        </div>
      </div>
    </main>
  );
}
