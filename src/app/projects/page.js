"use client";
import ProjectsSection from "@/components/projects/ProjectsSection";
import PageTitle from "@/components/ui/PageTitle";
import PageContainer from "@/components/layout/PageContainer";

export default function ProjectPage() {
  return (
    <PageContainer>
      <PageTitle title="My Projects" />
      <div className="container mx-auto px-4">
        <ProjectsSection />
      </div>
    </PageContainer>
  );
}
