"use client";
import Image from "next/image";
import Timeline from "@/components/experience/Timeline";
import TimelineDynamics from "@/components/experience/TimelineDynamics";
import { useTheme } from '@/context/ThemeContext';

const TabDataContent = () => {
  const { isDarkMode } = useTheme();
  
  const TAB_DATA = [
    {
      title: "Experience",
      id: "experience",
      content: (
        <div className="flex flex-col items-center justify-center">
          <TimelineDynamics />
        </div>
      ),
    },
    {
      title: "Skills",
      id: "skills",
      content: (
        <div className="flex justify-center items-center">
          <ul className={`text-left list-disc grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 pl-4 leading-tight
                         ${isDarkMode ? 'text-[#ADB7BE]' : 'text-[#586e75]'}`}>
            <li>Node.js</li>
            <li>Express</li>
            <li>MongoDB</li>
            <li>PostgreSQL</li>
            <li>React</li>
            <li>Redux</li>
            <li>JavaScript</li>
            <li>TypeScript</li>
            <li>HTML</li>
            <li>CSS</li>
            <li>Python</li>
            <li>Java</li>
            <li>Git</li>
            <li>Docker</li>
            <li>Machine Learning</li>
            <li>RESTful APIs</li>
            <li>CI/CD Pipelines</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Education",
      id: "education",
      content: (
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/images/UCLA_Samueli_CS_block_logo.png"
            alt="ucla"
            width={300}
            height={300}
          />
          <ul className="list-disc pl-4 text-center mt-4">
            <li>
              <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#002b36]'}`}>
                B.S. in Computer Science
              </div>
              <div className={isDarkMode ? 'text-gray-400' : 'text-[#93a1a1]'}>
                09/2019 - 03/2024
              </div>
              <div className={`text-sm mt-1 ${isDarkMode ? 'text-[#ADB7BE]' : 'text-[#586e75]'}`}>
                GPA: 3.91/4.0
              </div>
            </li>
            <li className="mt-4">
              <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#002b36]'}`}>
                M.S. in Computer Science
              </div>
              <div className={isDarkMode ? 'text-gray-400' : 'text-[#93a1a1]'}>
                09/2024 - 01/2026
              </div>
              <div className={`text-sm mt-1 ${isDarkMode ? 'text-[#ADB7BE]' : 'text-[#586e75]'}`}>
                GPA: 4.0/4.0
              </div>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Certifications",
      id: "certifications",
      content: (
        <div className="flex justify-center items-center">
          <ul className={`list-disc pl-4 flex flex-col items-start leading-tight
                         ${isDarkMode ? 'text-[#ADB7BE]' : 'text-[#586e75]'}`}>
            <li>AWS Cloud Practitioner</li>
            <li>Google Professional Cloud Developer</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Awards",
      id: "awards",
      content: (
        <div className="flex flex-col justify-center items-center">
          <Image src="/images/sce.png" alt="sce" width={150} height={150} />
          <ul className={`list-disc pl-4 text-center mt-4
                         ${isDarkMode ? 'text-[#ADB7BE]' : 'text-[#586e75]'}`}>
            <li>Southern California Edison Scholar</li>
          </ul>
        </div>
      ),
    },
  ];

  return TAB_DATA;
};

export default TabDataContent;
