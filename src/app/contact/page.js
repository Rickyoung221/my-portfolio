"use client";
import EmailSection from "@/components/contact/EmailSection";
import PageTitle from "@/components/ui/PageTitle";
import PageContainer from "@/components/layout/PageContainer";

export default function ContactPage() {
  return (
    <PageContainer>
      <PageTitle title="Contact Me" />
      <div className="container mx-auto px-4">
        <EmailSection />
      </div>
    </PageContainer>
  );
}
