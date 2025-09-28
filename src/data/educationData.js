"use client";

// Constants for responsibilities
const RESPONSIBILITIES = {
  READER: "Grading assignments and providing feedback to students",
  TA: "Leading discussion sections, holding office hours, and grading assignments",
  TEST_SCRIPT_DEV:
    "Developing and maintaining test scripts for course assignments",
  WEB_DEV: "Developing and maintaining course web infrastructure",
};

// Helper function to validate teaching experience data
const validateTeachingExperience = (exp) => {
  const requiredFields = ["course", "role", "period", "responsibilities"];
  return requiredFields.every((field) => exp[field] !== undefined);
};

export const educationData = [
  {
    degree: "M.S. in Computer Science",
    period: "09/2024 - 03/2026",
    gpa: "4.00/4.00",
    courses: [
      "CS 201 - Computer Science Seminar",
      "CS 214 - Big Data Systems",
      "CS 215 - Internet of Things",
      "CS 230 - Software Engineering (Graduate)",
      "CS 245 - Big Data Analytics",
      "CS 251A - Advanced Computer Architecture",
      "CS 269 - Deformable Models in Computer Vision",
      "CS 596 - Directed Individual Study",
      "EC ENGR 219 - Large-Scale Data Mining",
      "EC ENGR 232E - Large Scale Networks",
    ],
  },
  {
    degree: "B.S. in Computer Science",
    period: "09/2019 - 03/2024",
    gpa: "3.91/4.00",
    courses: [
      "CS 31 - Intro to Computer Science I - C++",
      "CS 32 - Intro to Computer Science II - Data Structures",
      "CS 33 – Introduction to Computer Organization",
      "CS 35L - Software Construction - Linux and Git",
      "CS 111 - Operating Systems Principles",
      "CS 130 - Software Engineering",
      "CS 143 - Database Systems",
      "CS 144 - Web Applications",
      "CS 180 - Introduction to Algorithms and Complexity",
      "CS 181 - Introduction to Formal Languages and Automata",
      "CS 161 - Fundamentals of Artificial Intelligence",
      "CS 118 - Computer Network Fundamentals",
      "CS 134 - Distributed Systems",
      "CS M151B/EE M116C - Computer Systems Architecture",
      "CS M152A - Introductory Digital Design Laboratory",
      "CS 174A - Computer Graphics",
      "CS 188 - Software Security",
      {
        name: "CS 130 - Software Engineering",
        achievement:
          "The only student who achieved an A+ grade among 110+ students",
      },
      "CS 199 - Directed Research",
      "CS 131 - Programming Languages",
    ],
    nonCSClasses: [
      "ANTHRO 7 - Human Evolution",
      "CHIN 50 - Chinese Civilization",
      "DGT HUM 101 - Digital Humanities",
      "DGT HUM 140 - Coding for the Humanities",
      "DGT HUM 150 - Topics in Digital Humanities",
      "ENGR 110 - Technology Management & Economics",
      "ENGR 183EW - Engineering & Society",
      "ETHNOMUS 25 - Global Jazz Studies / Intro to Jazz",
      "MATH 31A - Differential & Integral Calculus",
      "MATH 31B - Integration & Infinite Series",
      "MATH 32A - Multivariable Calculus",
      "MATH 33A - Linear Algebra & Applications",
      "MATH 33B - Differential Equations",
      "MATH 61 - Discrete Structures",
      "MGMT 108 - Business Law",
      "MGMT 180 - Business Interpersonal Communication",
      "MGMT 182 - Leadership Principles & Practice",
      "MUSCLG 188 - Special Courses in Music History",
      "PHYSICS 1A - Mechanics",
      "PHYSICS 1B - Oscillations, Waves, Electric & Magnetic Fields",
      "PHYSICS 1C - Electrodynamics, Optics, Special Relativity",
      "POL SCI 40 - Intro to American Politics",
      "PSYCH 10 - Intro to Psychology",
      "PSYCH 115 - Developmental Psychology – Life Span",
      "PSYCH 150 - Introduction to Health Psychology",
      "THEATER 10 - Introduction to Theater",
      "JAPAN 50 - Japanese Civilization",
    ],
    researchExperience: [
      {
        title: "Research Assistant - Software Security Lab",
        supervisor: "Prof. Yuan Tian",
        period: "10/2023 - 04/2024",
        description: [
          "Conducted research on binary program analysis and decompilation using machine learning approaches",
          "Developed models for automated vulnerability detection and binary code analysis",
          "Created training datasets and implemented binary code similarity analysis",
          "Delivered monthly paper review presentations on latest advancements in software security and ML",
        ],
        technologies: {
          "Reverse Engineering": ["IDA Pro", "Ghidra"],
          Development: ["LLVM", "Python"],
          "Machine Learning": ["TensorFlow"],
        },
      },
    ],
    teachingExperience: [
      {
        course: "CS 144 - Web Applications",
        role: "Reader",
        period: "Spring 2025",
        responsibilities: RESPONSIBILITIES.READER,
      },
      {
        course: "CS 111 - Operating Systems Principles",
        role: "Teaching Assistant",
        period: "Winter 2025",
        responsibilities: RESPONSIBILITIES.TA,
      },
      {
        course: "CS 131 - Programming Languages",
        role: "Reader",
        period: "Fall 2024",
        responsibilities: RESPONSIBILITIES.READER,
      },
      {
        course: "CS 130 - Software Engineering",
        role: "Reader",
        period: "Fall 2024",
        responsibilities: RESPONSIBILITIES.READER,
      },
      {
        course: "CS 118 - Computer Network Fundamentals",
        role: "Reader",
        period: "Winter 2024",
        responsibilities: RESPONSIBILITIES.READER,
      },
      {
        course: "CS 35L - Software Construction",
        role: "Test Script Developer",
        period: "Fall 2023",
        responsibilities: RESPONSIBILITIES.TEST_SCRIPT_DEV,
      },
      {
        course: "CS 246 - Web Information Management",
        role: "Web Developer",
        period: "Spring 2021",
        responsibilities: RESPONSIBILITIES.WEB_DEV,
      },
    ].map((exp) => {
      if (!validateTeachingExperience(exp)) {
        console.warn(
          `Invalid teaching experience data: ${JSON.stringify(exp)}`
        );
      }
      return exp;
    }),
  },
];
