"use client";
import AboutSection from "@/components/about/AboutSection";
import PageTitle from "@/components/ui/PageTitle";
import PageContainer from "@/components/layout/PageContainer";

export default function AboutPage() {
  return (
    <PageContainer>
      <PageTitle title="About Me" />
      <div className="container mx-auto px-4">
        <AboutSection />
      </div>
    </PageContainer>
  );
}
