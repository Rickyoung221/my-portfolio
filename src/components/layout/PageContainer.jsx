"use client";

const PageContainer = ({ children }) => {
  return (
    <div className="min-h-screen pt-[calc(var(--navbar-height)+2rem)] sm:pt-[calc(var(--navbar-height)+3rem)] pb-24 sm:pb-32">
      {children}
    </div>
  );
};

export default PageContainer; 