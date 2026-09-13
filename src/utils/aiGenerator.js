/**
 * AI Resume Generator Engine
 * Transforms user's raw inputs, details, notes, or pasted draft text into a 
 * highly structured, ATS-optimized, action-oriented resume object.
 */

export const AI_PRESETS = [
  {
    title: "Full-Stack Web Developer",
    role: "Full-Stack Software Engineer",
    ideas: "I love building web applications with React, Node.js, Express, and PostgreSQL. Built a full-stack e-commerce project with user authentication and Stripe payment integration. Handled API optimization and database indexing. Interested in modern web tech and microservices.",
    skills: ["JavaScript (ES6+)", "TypeScript", "React", "Node.js", "Express.js", "PostgreSQL", "MongoDB", "Tailwind CSS", "REST APIs", "Git", "Docker"],
    degree: "Bachelor of Science in Computer Science",
    institution: "University of Technology"
  },
  {
    title: "Data Analyst & AI Engineer",
    role: "Data Analyst / Machine Learning Engineer",
    ideas: "Studied Computer Science and statistics. Created a Python data pipeline to clean and visualize 100k records using Pandas, NumPy, and Matplotlib. Trained a machine learning classification model with Scikit-Learn achieving 92% accuracy. Interested in AI, data analytics, and cloud pipelines.",
    skills: ["Python", "SQL", "Pandas", "NumPy", "Scikit-Learn", "TensorFlow", "Tableau", "PostgreSQL", "Git", "Jupyter Notebooks", "Data Visualization"],
    degree: "Bachelor of Science in Data Science / CS",
    institution: "State University"
  },
  {
    title: "Frontend Developer & UI Engineer",
    role: "Frontend Engineer / UI Developer",
    ideas: "Passionate about creating responsive, interactive web interfaces. Developed a real-time collaborative task dashboard using React, Redux, and WebSockets. Optimized bundle size by 40% using code splitting. Interested in micro-animations, web performance, and accessibility.",
    skills: ["JavaScript", "TypeScript", "React.js", "Next.js", "HTML5", "CSS3/Sass", "Tailwind CSS", "Redux Toolkit", "Jest", "Vite", "Figma"],
    degree: "Bachelor of Science in Information Technology",
    institution: "Institute of Technology"
  },
  {
    title: "Backend & Systems Developer",
    role: "Backend Software Engineer",
    ideas: "Proficient in Python, C++, and Java. Architected scalable microservices using Express and Docker. Reduced database query latency by 35% through caching with Redis. Interested in distributed systems, backend performance, and cloud infrastructure.",
    skills: ["Python", "C++", "Java", "Node.js", "Express.js", "PostgreSQL", "Redis", "Docker", "Kubernetes", "AWS", "REST & gRPC APIs"],
    degree: "Bachelor of Science in Computer Engineering",
    institution: "Tech University"
  },
  {
    title: "Product Manager & Tech Lead",
    role: "Associate Product Manager / Tech Lead",
    ideas: "Led cross-functional teams of 6 developers and designers. Defined product roadmaps, user stories, and feature specs. Conducted user research and A/B testing that increased conversion rate by 22%. Managed Agile sprints and stakeholder communication.",
    skills: ["Agile/Scrum", "Product Roadmap", "User Research", "A/B Testing", "Jira", "SQL", "Figma", "Data Analytics", "Wireframing"],
    degree: "Bachelor of Science in Business & CS",
    institution: "Metropolitan University"
  }
];

const ACTION_VERBS = [
  "Architected", "Built", "Collaborated", "Created", "Deployed", 
  "Designed", "Developed", "Engineered", "Enhanced", "Implemented", 
  "Integrated", "Launched", "Led", "Optimized", "Orchestrated", 
  "Refactored", "Resolved", "Spearheaded", "Streamlined", "Transformed"
];

function getRandomVerb(index) {
  return ACTION_VERBS[index % ACTION_VERBS.length];
}

/**
 * Main AI function: Generates resume object from structured user inputs
 */
export function generateResumeFromIdeas({
  fullName,
  title,
  email,
  phone,
  location,
  linkedin,
  github,
  portfolio,
  targetRole,
  userIdeas,
  userInterests,
  userSkillsInput,
  degree,
  institution,
  gradDate,
  gpa
}) {
  const role = targetRole?.trim() || title?.trim() || "Software Engineer";
  const name = fullName?.trim() || "ALEX MORGAN";
  const userEmailVal = email?.trim() || "alex.morgan@email.com";
  const userPhoneVal = phone?.trim() || "(555) 019-2834";
  const userLocVal = location?.trim() || "San Francisco, CA";
  const ideasText = userIdeas?.trim() || "";
  const interestsText = userInterests?.trim() || "Open Source Contributing, Software Engineering, Emerging Technologies";

  // Parse skill tags if provided as comma-separated or raw input
  let customSkillsList = [];
  if (userSkillsInput) {
    customSkillsList = userSkillsInput.split(/[,;\n]/).map(s => s.trim()).filter(Boolean);
  }

  // Common technical skills library for keyword extraction
  const lowerIdeas = (ideasText + " " + userSkillsInput).toLowerCase();
  
  const languagesSet = new Set(["JavaScript (ES6+)", "Python", "SQL", "HTML5", "CSS3"]);
  const frameworksSet = new Set(["React", "Node.js", "Express.js", "Tailwind CSS", "REST APIs"]);
  const toolsSet = new Set(["PostgreSQL", "MongoDB", "Git", "GitHub", "Docker", "Postman"]);

  if (lowerIdeas.includes("typescript")) languagesSet.add("TypeScript");
  if (lowerIdeas.includes("python")) languagesSet.add("Python");
  if (lowerIdeas.includes("c++") || lowerIdeas.includes("cpp")) languagesSet.add("C++");
  if (lowerIdeas.includes("java")) languagesSet.add("Java");
  
  if (lowerIdeas.includes("react")) frameworksSet.add("React");
  if (lowerIdeas.includes("next")) frameworksSet.add("Next.js");
  if (lowerIdeas.includes("node")) frameworksSet.add("Node.js");
  if (lowerIdeas.includes("express")) frameworksSet.add("Express.js");
  if (lowerIdeas.includes("redux")) frameworksSet.add("Redux");
  
  if (lowerIdeas.includes("docker")) toolsSet.add("Docker");
  if (lowerIdeas.includes("aws")) toolsSet.add("AWS");
  if (lowerIdeas.includes("kubernetes")) toolsSet.add("Kubernetes");
  if (lowerIdeas.includes("redis")) toolsSet.add("Redis");
  if (lowerIdeas.includes("postgres") || lowerIdeas.includes("sql")) toolsSet.add("PostgreSQL");

  // Add custom skills into framework/tools
  customSkillsList.forEach(skill => {
    if (skill.length > 1) {
      if (skill.toLowerCase().includes("js") || skill.toLowerCase().includes("py") || skill.toLowerCase().includes("c++")) {
        languagesSet.add(skill);
      } else {
        frameworksSet.add(skill);
      }
    }
  });

  // Synthesize tailored ATS professional summary
  const summary = `Driven and results-oriented ${role} with hands-on experience in modern software architectures, responsive development, and scalable systems. ${
    ideasText
      ? `Proven track record of success in ${ideasText.slice(0, 150)}...`
      : `Proficient in building high-performance web applications, designing efficient database schemas, and writing clean, maintainable code.`
  } Recognized for strong analytical problem solving, quick adaptability to emerging tech stacks, and effective team collaboration.`;

  // Parse raw user ideas into action-verb bullet points
  let bullets = [];
  if (ideasText.length > 20) {
    const rawSentences = ideasText.split(/(?<=[.!?])\s+|\n+/).map(s => s.trim()).filter(s => s.length > 10);
    bullets = rawSentences.map((sentence, idx) => {
      // Check if starts with verb
      const firstWord = sentence.split(' ')[0];
      const hasVerb = ACTION_VERBS.some(v => v.toLowerCase() === firstWord.toLowerCase());
      if (hasVerb) return sentence;
      return `${getRandomVerb(idx)} ${sentence.charAt(0).toLowerCase() + sentence.slice(1)}`;
    });
  }

  // Fallback high-impact experience bullets if user notes were sparse
  if (bullets.length === 0) {
    bullets = [
      `Architected and deployed responsive full-stack applications using ${Array.from(frameworksSet).slice(0, 3).join(", ")}, improving user engagement and application performance.`,
      `Optimized database queries and API endpoint performance, reducing request latency by 35% under peak traffic conditions.`,
      `Implemented automated test suites and continuous integration protocols, ensuring 90%+ code coverage across core system features.`
    ];
  }

  const generatedExperience = [
    {
      id: `exp-${Date.now()}-1`,
      role: role,
      organization: "Full-Stack Software Platform & Projects",
      dates: "Jan 2025 – Present",
      bullets: bullets.slice(0, 4)
    },
    {
      id: `exp-${Date.now()}-2`,
      role: "Software Engineering Intern / Developer",
      organization: "Tech Solutions & Academic Projects",
      dates: "Sep 2024 – Dec 2024",
      bullets: [
        `Engineered interactive UI dashboards leveraging ${Array.from(languagesSet)[0] || 'JavaScript'} and ${Array.from(frameworksSet)[0] || 'React'} to process over 50,000 active data records.`,
        `Streamlined multi-user workflow synchronization and state management, improving rendering speed by 28%.`,
        `Collaborated with cross-functional development teams utilizing Agile methodologies, version control (Git), and code reviews.`
      ]
    }
  ];

  return {
    header: {
      fullName: name,
      title: role,
      email: userEmailVal,
      phone: userPhoneVal,
      location: userLocVal,
      linkedin: linkedin?.trim() || "linkedin.com/in/alexmorgan-dev",
      github: github?.trim() || "github.com/alexmorgan-dev",
      portfolio: portfolio?.trim() || "alexmorgan.dev"
    },
    summary,
    education: [
      {
        id: `edu-${Date.now()}`,
        degree: degree?.trim() || "Bachelor of Science in Computer Science",
        institution: institution?.trim() || "University of Technology",
        location: userLocVal,
        graduationDate: gradDate?.trim() || "May 2025",
        gpa: gpa?.trim() || "3.8/4.0",
        highlights: "Dean's List, Computer Science Honor Society, Tech Club Lead"
      }
    ],
    skills: {
      languages: Array.from(languagesSet),
      frameworks: Array.from(frameworksSet),
      tools: Array.from(toolsSet),
      coreCompetencies: ["Object-Oriented Programming (OOP)", "Data Structures & Algorithms", "Agile Software Development"],
      softSkills: ["Problem Solving", "Technical Communication", "Team Collaboration", "Critical Thinking", "Adaptability"]
    },
    experience: generatedExperience,
    certifications: [
      {
        id: `cert-${Date.now()}-1`,
        name: `${role.split(" ")[0]} Developer Certification`,
        issuer: "AWS / Meta Professional Certificate",
        date: "2024"
      }
    ],
    additional: {
      languages: "English (Native), Spanish (Conversational)",
      interests: interestsText
    }
  };
}

/**
 * Intelligent Raw Text Draft Parser
 * Converts plain text pasted by the user (like resume_draft.txt) into a structured resume object.
 */
export function parseRawTextToResume(rawText) {
  if (!rawText || rawText.trim().length === 0) {
    return null;
  }

  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
  
  // Extract Name (First line if non-header)
  let fullName = "ALEX MORGAN";
  if (lines.length > 0 && !lines[0].includes("=") && !lines[0].includes(":")) {
    fullName = lines[0].replace(/^#\s*/, '').trim();
  }

  // Extract contact info from lines
  let email = "alex.morgan@email.com";
  let phone = "(555) 019-2834";
  let location = "San Francisco, CA";
  let linkedin = "linkedin.com/in/alexmorgan-dev";
  let github = "github.com/alexmorgan-dev";

  const fullText = rawText.toLowerCase();
  
  const emailMatch = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) email = emailMatch[0];

  const phoneMatch = rawText.match(/(\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (phoneMatch) phone = phoneMatch[0];

  const linkedinMatch = rawText.match(/linkedin\.com\/in\/[a-zA-Z0-9_-]+/);
  if (linkedinMatch) linkedin = linkedinMatch[0];

  const githubMatch = rawText.match(/github\.com\/[a-zA-Z0-9_-]+/);
  if (githubMatch) github = githubMatch[0];

  const locMatch = rawText.match(/Location:\s*([^|\n]+)/i);
  if (locMatch) location = locMatch[1].trim();

  // Extract sections
  let summaryText = "";
  let skillsLanguages = [];
  let skillsFrameworks = [];
  let skillsTools = [];
  let experienceList = [];
  let educationList = [];
  let certificationsList = [];

  // Split sections by header separators
  const sectionBlocks = rawText.split(/={3,}|#{1,3}\s+/);
  
  sectionBlocks.forEach(block => {
    const blockUpper = block.toUpperCase();
    if (blockUpper.includes("SUMMARY")) {
      summaryText = block.replace(/SUMMARY/i, '').trim();
    } else if (blockUpper.includes("SKILL")) {
      const langMatch = block.match(/Languages:\s*([^\n]+)/i);
      if (langMatch) skillsLanguages = langMatch[1].split(',').map(s => s.trim());

      const frameMatch = block.match(/Frameworks[^:]*:\s*([^\n]+)/i);
      if (frameMatch) skillsFrameworks = frameMatch[1].split(',').map(s => s.trim());

      const toolsMatch = block.match(/Databases|Tools[^:]*:\s*([^\n]+)/i);
      if (toolsMatch) skillsTools = toolsMatch[1].split(',').map(s => s.trim());
    } else if (blockUpper.includes("EDUCATION")) {
      const eduLines = block.split('\n').filter(l => l.trim().length > 0 && !l.includes("EDUCATION"));
      if (eduLines.length > 0) {
        educationList.push({
          id: `edu-${Date.now()}`,
          degree: eduLines[0] || "Bachelor of Science in Computer Science",
          institution: eduLines[1] || "University of Technology",
          graduationDate: "May 2025",
          gpa: "3.8/4.0"
        });
      }
    } else if (blockUpper.includes("PROJECT") || blockUpper.includes("EXPERIENCE")) {
      const bullets = block.split('\n')
        .map(l => l.trim())
        .filter(l => l.startsWith('•') || l.startsWith('-') || l.startsWith('*'))
        .map(l => l.replace(/^[•\-*]\s*/, ''));

      if (bullets.length > 0) {
        experienceList.push({
          id: `exp-${Date.now()}-${experienceList.length}`,
          role: "Lead Software Developer",
          organization: "Full-Stack Software Platform",
          dates: "Jan 2025 – Present",
          bullets: bullets
        });
      }
    }
  });

  // Fallbacks if section splitting missed anything
  if (skillsLanguages.length === 0) {
    skillsLanguages = ["JavaScript (ES6+)", "Python", "C++", "SQL", "HTML5", "CSS3"];
  }
  if (skillsFrameworks.length === 0) {
    skillsFrameworks = ["React", "Node.js", "Express.js", "Tailwind CSS", "REST APIs"];
  }
  if (skillsTools.length === 0) {
    skillsTools = ["PostgreSQL", "MongoDB", "Git", "GitHub", "Docker"];
  }

  if (summaryText.length === 0) {
    summaryText = `Motivated and detail-oriented Computer Science graduate with strong expertise in full-stack web development and software engineering. Proficient in JavaScript, React, Node.js, Python, C++, and SQL, with a proven track record of building high-performance web applications and scalable APIs.`;
  }

  if (experienceList.length === 0) {
    experienceList = [
      {
        id: `exp-parsed-1`,
        role: "Full-Stack Web Developer",
        organization: "Full-Stack E-Commerce Web Application (Personal Project)",
        dates: "Jan 2025 – Mar 2025",
        bullets: [
          "Architected and deployed a responsive full-stack e-commerce platform using React, Node.js, Express, and PostgreSQL, supporting 500+ active user accounts and seamless checkout workflows.",
          "Optimized database queries and API endpoint performance, reducing page load latency by 35% and improving database response time under load.",
          "Integrated Stripe API for secure payment processing and implemented JWT-based user authentication with role-based access control."
        ]
      }
    ];
  }

  if (educationList.length === 0) {
    educationList = [
      {
        id: "edu-parsed-1",
        degree: "Bachelor of Science in Computer Science",
        institution: "University of Technology",
        location: "Tech City, CA",
        graduationDate: "May 2025",
        gpa: "3.8/4.0"
      }
    ];
  }

  return {
    header: {
      fullName,
      title: "Software Engineer / Web Developer",
      email,
      phone,
      location,
      linkedin,
      github,
      portfolio: "alexmorgan.dev"
    },
    summary: summaryText,
    education: educationList,
    skills: {
      languages: skillsLanguages,
      frameworks: skillsFrameworks,
      tools: skillsTools,
      coreCompetencies: ["Object-Oriented Programming (OOP)", "Data Structures & Algorithms", "Agile Development"],
      softSkills: ["Problem Solving", "Technical Communication", "Team Collaboration", "Adaptability"]
    },
    experience: experienceList,
    certifications: [
      {
        id: "cert-parsed-1",
        name: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services",
        date: "2024"
      }
    ],
    additional: {
      languages: "English (Native), Spanish (Conversational)",
      interests: "Open Source Contributing, Competitive Programming"
    }
  };
}

