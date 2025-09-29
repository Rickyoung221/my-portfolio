"use client";
import { useState } from "react";
import Image from "next/image";
import TimelineDynamics from "@/components/experience/TimelineDynamics";
import { useTheme } from "@/context/ThemeContext";
import SkillCircle from "@/components/skills/SkillCircle";
import { educationData } from "@/data/educationData";
import {
  FaGraduationCap,
  FaCalendarAlt,
  FaBook,
  FaChevronDown,
  FaChevronRight,
  FaFlask,
  FaBriefcase,
  FaLaptopCode,
  FaPalette,
  FaCode,
  FaServer,
  FaDatabase,
  FaBrain,
  FaShieldAlt,
  FaChartLine,
  FaSearch,
} from "react-icons/fa";
import {
  BsAward,
  BsSearch,
  BsFileText,
  BsQuote,
  BsInfoCircle,
} from "react-icons/bs";
import { GiAchievement } from "react-icons/gi";
import { MdRecommend, MdVerified } from "react-icons/md";

const cardStyle = (isDarkMode) => `
  p-4 rounded-lg
  ${
    isDarkMode
      ? "bg-[#1a1f24] hover:bg-[#1f252c]"
      : "bg-[#f0f0f0] hover:bg-[#e6e6e6]"
  }
  ${
    isDarkMode
      ? "shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
      : "shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
  }
`;

const TabDataContent = () => {
  const { isDarkMode } = useTheme();
  const [expandedNonCS, setExpandedNonCS] = useState({});
  const [expandedTeaching, setExpandedTeaching] = useState({});

  const toggleNonCS = (index) => {
    setExpandedNonCS((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleTeaching = (eduIndex, expIndex) => {
    const key = `${eduIndex}-${expIndex}`;
    setExpandedTeaching((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const TAB_DATA = [
    {
      title: "Experience",
      id: "experience",
      content: (
        <div className="flex flex-col items-center justify-center w-full overflow-visible min-h-[500px]">
          <TimelineDynamics />
        </div>
      ),
    },
    {
      title: "Skills",
      id: "skills",
      content: (
        <div className="flex justify-center items-center w-full">
          <SkillCircle />
        </div>
      ),
    },
    {
      title: "Education",
      id: "education",
      content: (
        <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-4 sm:px-6">
          <div className="relative group w-full flex justify-center mb-8">
            <Image
              src={
                isDarkMode
                  ? "/images/UCLA_Samueli_CS_block_cmyk_rev.svg"
                  : "/images/UCLA_Samueli_CS_block_cmyk.svg"
              }
              alt="UCLA School of Engineering"
              width={300}
              height={300}
              className="rounded-lg w-full max-w-[250px] sm:max-w-[300px] transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
              priority
            />
          </div>

          <div className="w-full space-y-2" role="list">
            {educationData.map((edu, index) => (
              <div
                key={index}
                className={`${cardStyle(
                  isDarkMode
                )} transform transition-all duration-300 hover:translate-x-2 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:transform-none`}
                role="listitem"
              >
                <div className="flex items-center gap-2 mb-2">
                  <FaGraduationCap
                    className={`text-xl ${
                      isDarkMode ? "text-[#58a6ff]" : "text-[#2075c7]"
                    }`}
                  />
                  <h3
                    className={`text-lg font-bold
                    ${isDarkMode ? "text-white" : "text-[#002b36]"}`}
                    id={`degree-${index}`}
                  >
                    {edu.degree}
                  </h3>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <FaCalendarAlt
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-[#93a1a1]"
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-[#93a1a1]"
                    }`}
                    aria-label="Study period"
                  >
                    {edu.period}
                  </span>
                  <GiAchievement
                    className={`text-base ${
                      isDarkMode ? "text-[#58a6ff]" : "text-[#2075c7]"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium
                    ${isDarkMode ? "text-[#58a6ff]" : "text-[#2075c7]"}`}
                    aria-label="Grade Point Average"
                  >
                    GPA: {edu.gpa}
                  </span>
                </div>

                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FaBook
                      className={`text-sm ${
                        isDarkMode ? "text-gray-300" : "text-[#586e75]"
                      }`}
                    />
                    <h4
                      className={`text-sm font-semibold
                      ${isDarkMode ? "text-gray-300" : "text-[#586e75]"}`}
                      id={`courses-${index}`}
                    >
                      Key Courses
                    </h4>
                  </div>
                  <div
                    className="pl-6 space-y-1.5"
                    role="list"
                    aria-labelledby={`courses-${index}`}
                  >
                    {Object.entries(edu.courses).map(
                      ([category, courses], categoryIdx) => (
                        <div key={categoryIdx} className="space-y-0.5">
                          <h4
                            className={`text-xs font-semibold uppercase tracking-wide mb-0.5 flex items-center gap-1 ${
                              isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {category ===
                              "Core Programming & Software Engineering" && (
                              <FaCode className="text-xs" />
                            )}
                            {category === "Systems & Architecture" && (
                              <FaServer className="text-xs" />
                            )}
                            {category === "Data & Web Technologies" && (
                              <FaDatabase className="text-xs" />
                            )}
                            {category === "Algorithms & Theory" && (
                              <FaChartLine className="text-xs" />
                            )}
                            {category === "AI & Machine Learning" && (
                              <FaBrain className="text-xs" />
                            )}
                            {category === "Networking & Security" && (
                              <FaShieldAlt className="text-xs" />
                            )}
                            {category === "Graphics & Visualization" && (
                              <FaPalette className="text-xs" />
                            )}
                            {category === "Research & Special Projects" && (
                              <FaSearch className="text-xs" />
                            )}
                            {category === "Graphics & Research" && (
                              <FaPalette className="text-xs" />
                            )}
                            {category === "Big Data & Analytics" && (
                              <FaDatabase className="text-xs" />
                            )}
                            {category === "Computer Vision & AI" && (
                              <FaBrain className="text-xs" />
                            )}
                            {category === "Machine Learning & AI" && (
                              <FaBrain className="text-xs" />
                            )}
                            {category === "IoT & Emerging Technologies" && (
                              <FaLaptopCode className="text-xs" />
                            )}
                            {category === "Research & Seminars" && (
                              <FaSearch className="text-xs" />
                            )}
                            {category === "Software Engineering" && (
                              <FaCode className="text-xs" />
                            )}
                            {category}
                          </h4>
                          <div className="grid grid-cols-1 gap-0">
                            {courses.map((course, courseIdx) => (
                              <div
                                key={courseIdx}
                                className={`text-xs py-0 px-2 rounded relative
                                ${
                                  isDarkMode
                                    ? "bg-[#232930] text-gray-300"
                                    : "bg-[#e6e6e6] text-[#586e75]"
                                }
                                before:content-[''] before:absolute before:left-[-0.5rem] before:top-1/2 before:-translate-y-1/2
                                before:w-1 before:h-1 before:rounded-full
                                ${
                                  isDarkMode
                                    ? "before:bg-gray-500"
                                    : "before:bg-[#93a1a1]"
                                }`}
                                role="listitem"
                              >
                                {typeof course === "string" ? (
                                  course
                                ) : (
                                  <div>
                                    <div className="flex justify-between items-center">
                                      <span>{course.name}</span>
                                      <span
                                        className={`text-xs font-medium ml-2 px-2 py-0.5 rounded
                                      ${
                                        isDarkMode
                                          ? "bg-[#58a6ff]/20 text-[#58a6ff]"
                                          : "bg-[#2075c7]/20 text-[#2075c7]"
                                      }`}
                                        aria-label="Course achievement"
                                      >
                                        {course.achievement}
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {edu.nonCSClasses && (
                  <div className="mt-4">
                    <button
                      onClick={() => toggleNonCS(index)}
                      className="flex items-center gap-2 mb-2 w-full text-left hover:opacity-80 transition-opacity"
                      aria-expanded={expandedNonCS[index] || false}
                      aria-controls={`non-cs-${index}`}
                    >
                      <FaBook
                        className={`text-sm ${
                          isDarkMode ? "text-gray-300" : "text-[#586e75]"
                        }`}
                      />
                      <h4
                        className={`text-sm font-semibold
                        ${isDarkMode ? "text-gray-300" : "text-[#586e75]"}`}
                      >
                        Non CS Courses
                      </h4>
                      {expandedNonCS[index] ? (
                        <FaChevronDown
                          className={`text-xs ${
                            isDarkMode ? "text-gray-400" : "text-[#93a1a1]"
                          }`}
                        />
                      ) : (
                        <FaChevronRight
                          className={`text-xs ${
                            isDarkMode ? "text-gray-400" : "text-[#93a1a1]"
                          }`}
                        />
                      )}
                    </button>
                    {expandedNonCS[index] && (
                      <div
                        id={`non-cs-${index}`}
                        className="pl-6 mb-4 space-y-1.5"
                        role="list"
                        aria-labelledby={`non-cs-${index}`}
                      >
                        {Object.entries(edu.nonCSClasses).map(
                          ([category, courses], categoryIdx) => (
                            <div key={categoryIdx} className="space-y-0.5">
                              <h4
                                className={`text-xs font-semibold uppercase tracking-wide mb-0.5 flex items-center gap-1 ${
                                  isDarkMode ? "text-gray-400" : "text-gray-600"
                                }`}
                              >
                                {category === "Mathematics & Sciences" && (
                                  <FaFlask className="text-xs" />
                                )}
                                {category === "Business & Management" && (
                                  <FaBriefcase className="text-xs" />
                                )}
                                {category ===
                                  "Humanities & Social Sciences" && (
                                  <FaBook className="text-xs" />
                                )}
                                {category ===
                                  "Digital Humanities & Technology" && (
                                  <FaLaptopCode className="text-xs" />
                                )}
                                {category === "Arts & Culture" && (
                                  <FaPalette className="text-xs" />
                                )}
                                {category}
                              </h4>
                              <div className="grid grid-cols-1 gap-0">
                                {courses.map((course, courseIdx) => (
                                  <div
                                    key={courseIdx}
                                    className={`text-xs py-0 px-2 rounded relative
                                    ${
                                      isDarkMode
                                        ? "bg-[#232930] text-gray-300"
                                        : "bg-[#e6e6e6] text-[#586e75]"
                                    }
                                    before:content-[''] before:absolute before:left-[-0.5rem] before:top-1/2 before:-translate-y-1/2
                                    before:w-1 before:h-1 before:rounded-full
                                    ${
                                      isDarkMode
                                        ? "before:bg-gray-500"
                                        : "before:bg-[#93a1a1]"
                                    }`}
                                    role="listitem"
                                  >
                                    {course}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                )}

                {edu.teachingExperience && (
                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <GiAchievement
                        className={`text-sm ${
                          isDarkMode ? "text-gray-300" : "text-[#586e75]"
                        }`}
                      />
                      <h4
                        className={`text-sm font-semibold
                        ${isDarkMode ? "text-gray-300" : "text-[#586e75]"}`}
                        id={`teaching-${index}`}
                      >
                        Teaching Experience
                      </h4>
                    </div>
                    <div
                      className="grid grid-cols-1 gap-0.5 pl-6"
                      role="list"
                      aria-labelledby={`teaching-${index}`}
                    >
                      {edu.teachingExperience.map((exp, idx) => {
                        const isExpanded = expandedTeaching[`${index}-${idx}`];
                        return (
                          <div key={idx}>
                            <div
                              className={`text-sm py-1 px-2 rounded relative mb-0.5 cursor-pointer hover:opacity-80 hover:bg-opacity-90 transition-all group
                                ${
                                  isDarkMode
                                    ? "bg-[#232930] text-gray-300"
                                    : "bg-[#e6e6e6] text-[#586e75]"
                                }
                                before:content-[''] before:absolute before:left-[-0.75rem] before:top-1/2 before:-translate-y-1/2
                                before:w-1.5 before:h-1.5 before:rounded-full
                                ${
                                  isDarkMode
                                    ? "before:bg-gray-500"
                                    : "before:bg-[#93a1a1]"
                                }`}
                              role="listitem"
                              onClick={() => toggleTeaching(index, idx)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="text-xs font-semibold flex items-center gap-1">
                                  {exp.course}
                                  {exp.details && (
                                    <BsInfoCircle className="text-xs text-blue-500 opacity-60" />
                                  )}
                                  {exp.recommendation && (
                                    <MdVerified
                                      className="text-xs text-green-500"
                                      title="有教授推荐信"
                                    />
                                  )}
                                </div>
                                {exp.details && (
                                  <div
                                    className="flex items-center gap-1"
                                    title="点击查看详细信息"
                                  >
                                    {isExpanded ? (
                                      <FaChevronDown className="text-xs text-blue-500 group-hover:scale-110 transition-transform" />
                                    ) : (
                                      <FaChevronRight className="text-xs text-blue-500 group-hover:scale-110 transition-transform" />
                                    )}
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mb-0">
                                <span
                                  className={`text-xs ${
                                    isDarkMode
                                      ? "text-gray-400"
                                      : "text-[#93a1a1]"
                                  }`}
                                >
                                  {exp.period}
                                </span>
                                <span className="text-gray-400">•</span>
                                <span
                                  className={`text-xs font-medium px-2 py-0.5 rounded
                                  ${
                                    isDarkMode
                                      ? "bg-[#58a6ff]/20 text-[#58a6ff]"
                                      : "bg-[#2075c7]/20 text-[#2075c7]"
                                  }`}
                                >
                                  {exp.role}
                                </span>
                              </div>
                              <div
                                className={`text-xs ${
                                  isDarkMode
                                    ? "text-gray-400"
                                    : "text-[#93a1a1]"
                                }`}
                              >
                                Supervised by {exp.professor}
                              </div>
                            </div>
                            {exp.details && isExpanded && (
                              <div className="ml-6 mt-1 mb-2">
                                <ul className="text-xs space-y-1">
                                  {exp.details.map((detail, detailIdx) => (
                                    <li
                                      key={detailIdx}
                                      className={`flex items-start gap-2 ${
                                        isDarkMode
                                          ? "text-gray-400"
                                          : "text-[#93a1a1]"
                                      }`}
                                    >
                                      <span className="text-gray-500 mt-0.5 flex-shrink-0">
                                        •
                                      </span>
                                      <span className="flex-1">{detail}</span>
                                    </li>
                                  ))}
                                </ul>
                                {exp.recommendation && (
                                  <div
                                    className={`mt-3 p-4 rounded-lg border shadow-md transition-all duration-300 hover:shadow-lg
                                     ${
                                       isDarkMode
                                         ? "bg-[#0d1117] border-[#30363d] hover:bg-[#161b22]"
                                         : "bg-white border-[#d0d7de] hover:bg-[#f6f8fa]"
                                     }`}
                                  >
                                    <div
                                      className={`text-sm font-semibold mb-3 flex items-center gap-2
                                      ${
                                        isDarkMode
                                          ? "text-[#58a6ff]"
                                          : "text-[#0969da]"
                                      }
                                    `}
                                    >
                                      <MdRecommend className="text-lg" />
                                      Professor Recommendation
                                    </div>
                                    <div
                                      className={`text-sm leading-relaxed mb-3
                                      ${
                                        isDarkMode
                                          ? "text-[#e6edf3]"
                                          : "text-[#24292f]"
                                      }
                                    `}
                                    >
                                      {exp.recommendation.text}
                                    </div>
                                    {exp.recommendation.summary && (
                                      <div
                                        className={`text-sm italic mb-3 p-2 rounded border-l-4
                                         ${
                                           isDarkMode
                                             ? "text-[#8b949e] bg-[#21262d] border-[#58a6ff]"
                                             : "text-[#57606a] bg-[#f1f3f4] border-[#0969da]"
                                         }
                                       `}
                                      >
                                        {exp.recommendation.summary}
                                      </div>
                                    )}
                                    <div className="mt-3">
                                      <Image
                                        src={exp.recommendation.image}
                                        alt="Professor Recommendation"
                                        width={400}
                                        height={300}
                                        className={`rounded-lg border-2 max-w-full h-auto shadow-sm
                                          ${
                                            isDarkMode
                                              ? "border-[#30363d] hover:border-[#58a6ff]"
                                              : "border-[#d0d7de] hover:border-[#0969da]"
                                          }
                                        `}
                                        onError={(e) => {
                                          e.target.style.display = "none";
                                        }}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {edu.researchExperience && (
                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BsSearch
                        className={`text-sm ${
                          isDarkMode ? "text-gray-300" : "text-[#586e75]"
                        }`}
                      />
                      <h4
                        className={`text-sm font-semibold
                        ${isDarkMode ? "text-gray-300" : "text-[#586e75]"}`}
                        id={`research-${index}`}
                      >
                        Research Experience
                      </h4>
                    </div>
                    <div
                      className="grid grid-cols-1 gap-[0.5rem] pl-6"
                      role="list"
                      aria-labelledby={`research-${index}`}
                    >
                      {edu.researchExperience.map((exp, idx) => (
                        <div
                          key={idx}
                          className={`text-sm py-[0.4rem] px-2 rounded relative
                            ${
                              isDarkMode
                                ? "bg-[#232930] text-gray-300"
                                : "bg-[#e6e6e6] text-[#586e75]"
                            }
                            before:content-[''] before:absolute before:left-[-0.75rem] before:top-1/2 before:-translate-y-1/2
                            before:w-1.5 before:h-1.5 before:rounded-full
                            ${
                              isDarkMode
                                ? "before:bg-gray-500"
                                : "before:bg-[#93a1a1]"
                            }`}
                          role="listitem"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{exp.title}</span>
                            <span
                              className={`text-xs font-medium ml-2 px-2 py-0.5 rounded
                              ${
                                isDarkMode
                                  ? "bg-[#58a6ff]/20 text-[#58a6ff]"
                                  : "bg-[#2075c7]/20 text-[#2075c7]"
                              }`}
                            >
                              {exp.period}
                            </span>
                          </div>
                          <div
                            className={`text-xs mt-1 mb-2
                            ${
                              isDarkMode ? "text-[#58a6ff]" : "text-[#2075c7]"
                            }`}
                          >
                            {exp.supervisor}
                          </div>
                          <div className="space-y-2">
                            <div className="text-xs space-y-1">
                              {exp.description.map((desc, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <span className="min-w-[6px]">•</span>
                                  <span>{desc}</span>
                                </div>
                              ))}
                            </div>
                            <div className="mt-2">
                              <div className="flex items-center text-xs">
                                <span
                                  className={`font-medium
                                  ${
                                    isDarkMode
                                      ? "text-gray-400"
                                      : "text-[#93a1a1]"
                                  }`}
                                >
                                  Tools:&nbsp;
                                </span>
                                <span
                                  className={`
                                  ${
                                    isDarkMode
                                      ? "text-[#58a6ff]"
                                      : "text-[#2075c7]"
                                  }`}
                                >
                                  {Object.values(exp.technologies)
                                    .flat()
                                    .join(" | ")}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Certifications",
      id: "certifications",
      content: (
        <div className="flex justify-center items-center">
          <ul
            className={`list-disc pl-4 flex flex-col items-start leading-tight
                         ${isDarkMode ? "text-[#ADB7BE]" : "text-[#586e75]"}`}
          >
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
          <Image src="/images/sce.webp" alt="sce" width={150} height={150} />
          <ul
            className={`list-disc pl-4 text-center mt-4
                         ${isDarkMode ? "text-[#ADB7BE]" : "text-[#586e75]"}`}
          >
            <li>Southern California Edison Scholar</li>
          </ul>
        </div>
      ),
    },
  ];

  return TAB_DATA;
};

export default TabDataContent;
