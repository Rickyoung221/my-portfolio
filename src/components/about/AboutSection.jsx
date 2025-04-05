"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "@/components/ui/TabButton";
import TabDataContent from "@/data/tabData";
import { useTheme } from '@/context/ThemeContext';

const AboutSection = () => {
  const [tab, setTab] = useState("experience");
  const [isPending, startTransition] = useTransition();
  const { isDarkMode } = useTheme();
  const TAB_DATA = TabDataContent();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section
      id="about"
      className={`flex flex-col gap-6 sm:gap-8 relative items-center
                  ${isDarkMode ? 'text-white' : 'text-[#002b36]'}`}
    >
      <div className="flex flex-col items-center justify-center w-full max-w-5xl">
        {/* 图片区域 */}
        {/* 
        <div className="w-full max-w-[500px]">
  
          <Image
            src="https://images.squarespace-cdn.com/content/v1/5ccdb6eeb91449580563d995/1585071507659-79IGQEUKOLMRHVKV3NS8/ComputerCat_06.gif?format=2500w"
            alt="Computer Cat GIF"
            width={500}
            height={500}
            priority
            className="mx-auto"
            unoptimized
          />
        </div>
        Computer Cat GIF */}

        {/* 文本区域 */}
        <div className="w-full">
          <p className={`text-sm sm:text-base lg:text-lg text-left space-y-4 leading-relaxed
                        ${isDarkMode ? 'text-[#ADB7BE]' : 'text-[#586e75]'}`}>
            I am Rick Yang, a passionate Full Stack Developer with a strong
            foundation in Computer Science, holding a B.S. and pursuing an M.S.
            from UCLA. I specialize in creating dynamic, scalable, and
            user-focused web and mobile applications using technologies such as
            React, Redux, Node.js, Express, PostgreSQL, and MongoDB. My
            expertise spans front-end and back-end development, complemented by
            a solid understanding of software architecture and machine learning.
            <br className="hidden sm:block" />
            <br className="hidden sm:block" />
            As a quick learner and problem solver, I excel in refactoring
            complex codebases to improve performance and maintainability. My
            commitment to balancing design and functionality ensures a seamless
            user experience.
            <br className="hidden sm:block" />
            <br className="hidden sm:block" />
            Beyond coding, I have explored 10 countries this year, combining my
            passion for travel with a global perspective. I stay active with
            fitness and enjoy strategic challenges through games like Teamfight
            Tactics (TFT). I am eager to continue growing, collaborate with
            talented teams, and contribute to impactful projects that make a
            difference.
          </p>

          {/* Tab 按钮 */}
          <div className="flex flex-wrap justify-center mt-6 sm:mt-8 gap-2 sm:gap-4">
            <TabButton
              selectTab={() => handleTabChange("experience")}
              active={tab === "experience"}
            >
              Experience
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              Skills
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              Education
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("certifications")}
              active={tab === "certifications"}
            >
              Certifications
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("awards")}
              active={tab === "awards"}
            >
              Awards
            </TabButton>
          </div>

          {/* Tab 内容 */}
          <div className="mt-6 sm:mt-8">
            {TAB_DATA.find((t) => t.id === tab)?.content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
