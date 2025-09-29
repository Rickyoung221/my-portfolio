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
    courses: {
      "Big Data & Analytics": [
        "CS 245 - Big Data Analytics ",
        "CS 214 - Big Data Systems ",
        "EC ENGR 219 - Large-Scale Data Mining",
      ],
      "Machine Learning & AI": [
        "CS 269 - Deformable Models in Computer Vision",
        "EC ENGR 232E - Large Scale Social Networks",
      ],
      "Systems & Architecture": ["CS 251A - Advanced Computer Architecture "],
      "Software Engineering": ["CS 230 - Software Engineering (Graduate) "],
      "IoT & Emerging Technologies": ["CS 215 - Internet of Things"],
      "Research & Seminars": [
        "CS 201 - Computer Science Seminar",
        "CS 596 - Directed Individual Study",
      ],
    },
  },
  {
    degree: "B.S. in Computer Science",
    period: "09/2019 - 03/2024",
    gpa: "3.91/4.00",
    courses: {
      "Core Programming & Software Engineering": [
        "CS 31 - Intro to Computer Science I - C++",
        "CS 32 - Intro to Computer Science II - Data Structures",
        "CS 35L - Software Construction - Linux and Git",
        "CS 131 - Programming Languages",
        {
          name: "CS 130 - Software Engineering",
          achievement:
            "⭐️ The only student who achieved an A+ grade among 110+ students",
        },
      ],
      "Systems & Architecture": [
        "CS 111 - Operating Systems Principles ",
        "CS 134 - Distributed Systems ",
        "CS 33 – Introduction to Computer Organization",
        "CS M151B/EE M116C - Computer Systems Architecture",
        "CS M152A - Introductory Digital Design Laboratory",
      ],
      "Data & Web Technologies": [
        "CS 144 - Web Applications ",
        "CS 143 - Database Systems ",
      ],
      "Algorithms & Theory": [
        "CS 180 - Algorithms and Complexity ",
        "CS 181 - Formal Languages and Automata",
      ],
      "AI & Machine Learning": [
        "CS 161 - Fundamentals of Artificial Intelligence ",
        "CS 146 - Introduction to Machine Learning ",
        "CS 148 - Introduction to Data Science - Data Mining",
      ],
      "Networking & Security": [
        "CS 118 - Computer Network Fundamentals ",
        "CS 188 - Software Security ",
      ],
      "Graphics & Research": [
        "CS 174A - Computer Graphics",
        "CS 199 - Directed Research",
      ],
    },
    nonCSClasses: {
      "Mathematics & Sciences": [
        "MATH 31A - Differential & Integral Calculus",
        "MATH 31B - Integration & Infinite Series",
        "MATH 32A - Multivariable Calculus",
        "MATH 33A - Linear Algebra & Applications",
        "MATH 33B - Differential Equations",
        "MATH 61 - Discrete Structures",
        "PHYSICS 1A - Mechanics",
        "PHYSICS 1B - Oscillations, Waves, Electric & Magnetic Fields",
        "PHYSICS 1C - Electrodynamics, Optics, Special Relativity",
      ],
      "Business & Management": [
        "MGMT 108 - Business Law",
        "MGMT 180 - Business Interpersonal Communication",
        "MGMT 182 - Leadership Principles & Practice",
        "ENGR 110 - Technology Management & Economics",
      ],
      "Humanities & Social Sciences": [
        "ANTHRO 7 - Human Evolution",
        "CHIN 50 - Chinese Civilization",
        "JAPAN 50 - Japanese Civilization",
        "POL SCI 40 - Intro to American Politics",
        "PSYCH 10 - Intro to Psychology",
        "PSYCH 115 - Developmental Psychology – Life Span",
        "PSYCH 150 - Introduction to Health Psychology",
      ],
      "Digital Humanities & Technology": [
        "DGT HUM 101 - Digital Humanities",
        "DGT HUM 140 - Coding for the Humanities",
        "DGT HUM 150 - Topics in Digital Humanities",
        "ENGR 183EW - Engineering & Society",
      ],
      "Arts & Culture": [
        "ETHNOMUS 25 - Global Jazz Studies / Intro to Jazz",
        "MUSCLG 188 - Special Courses in Music History",
        "THEATER 10 - Introduction to Theater",
      ],
    },
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
        course: "CS 180 - Algorithms and Complexity",
        role: "Reader",
        period: "Fall2025",
        professor: "Prof. Majid Sarrafzadeh",
        responsibilities: RESPONSIBILITIES.READER,
        details: [
          "Assisted in grading assignments and exams for advanced algorithms course",
          "Provided detailed feedback on algorithm design and complexity analysis",
          "Helped students understand advanced data structures and algorithmic techniques",
          "Collaborated with teaching team to develop comprehensive course materials",
        ],
      },
      {
        course: "CS 144 - Web Applications",
        role: "Reader",
        period: "Spring 2025",
        professor: "Prof. Ryan R. Rosario",
        responsibilities: RESPONSIBILITIES.READER,
      },
      {
        course: "CS 111 - Operating Systems Principles",
        role: "Teaching Assistant",
        period: "Winter 2025",
        professor: "Prof. Peter Reiher",
        responsibilities: RESPONSIBILITIES.TA,
        details: [
          "Served as Teaching Assistant for CS 111 Operating Systems Principles at UCLA",
          "Assisted 180 students with practical OS-related coding exercises",
          "Covered Linux-based exercises including locking, synchronization, and interprocess communications",
          "Developed and implemented test scripts to evaluate student performance",
          "Provided excellent support for file systems and advanced OS concepts",
        ],
        recommendation: {
          text: "Prof. Peter Reiher's LinkedIn Recommendation: 'I was pleased with Rick's performance and would recommend him for other jobs related to testing, coding, and evaluation'",
          image:
            "/images/recommendations/peter-reiher-cs111-recommendation.png",
          date: "April 7, 2025",
        },
      },
      {
        course: "CS 131 - Programming Languages",
        role: "Reader",
        period: "Fall 2024",
        professor: "Prof. Carey Nachenberg",
        responsibilities: RESPONSIBILITIES.READER,
      },
      {
        course: "CS 130 - Software Engineering",
        role: "Reader",
        period: "Fall 2024",
        professor: "Prof. Maged Elaasar",
        responsibilities: RESPONSIBILITIES.READER,
        details: [
          "Received A+ grade in CS 130 Software Engineering class (top 2% of 110+ students)",
          "Developed innovative capstone project: campus driver-passenger matching system with excellent architecture",
          "Served as Reader (grader) for subsequent CS 130 class with outstanding performance",
          "Provided excellent assessment of students' homework and test submissions",
          "Collaborated effectively with both project team and Readers team",
        ],
        recommendation: {
          text: "Prof. Maged Elaasar's LinkedIn Recommendation: 'I highly recommend Rick to join a team'",
          image:
            "/images/recommendations/maged-elaasar-cs130-recommendation.png",
          date: "March 29, 2025",
        },
      },
      {
        course: "CS 118 - Computer Network Fundamentals",
        role: "Reader",
        period: "Winter 2024",
        professor: "Prof. Giovanni Pau",
        responsibilities: RESPONSIBILITIES.READER,
        details: [
          "Assisted in grading assignments and exams for CS 118 Computer Network Fundamentals at UCLA",
          "Provided detailed feedback on networking concepts and problem-solving approaches",
          "Collaborated with the teaching team to ensure consistent and fair grading standards",
          "Helped students understand complex networking protocols and architectures",
        ],
        recommendation: {
          text: "TA Belle Lerdworatawee's LinkedIn Recommendation: 'I'm confident that Rick will be a key player in the teams that he joins due to his pro-activeness and that he'll be an asset to any employer'",
          image: "/images/recommendations/cs118-TA-recommendation.png",
          date: "January 2, 2025",
        },
      },
      {
        course: "CS 35L - Software Construction",
        role: "Test Script Developer & Reader",
        period: "Fall 2023",
        professor: "Prof. Paul Eggert",
        responsibilities: RESPONSIBILITIES.TEST_SCRIPT_DEV,
      },
      {
        course: "CS 246 - Web Information Management",
        role: "Web Developer & Reader",
        period: "Spring 2021",
        professor: "Prof. Junghoo Cho",
        responsibilities: RESPONSIBILITIES.WEB_DEV,
        details: [
          "Developed a dynamic website for CS246 under the guidance of Prof. Junghoo Cho",
          "Created a system to convert Markdown content into automated PowerPoint presentations, reducing manual workload",
          "Implemented a responsive design using modern web technologies to enhance student accessibility",
          "Delivered comprehensive documentation to ensure the project's maintainability and scalability",
        ],
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
