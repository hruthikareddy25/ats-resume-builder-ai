/**
 * ATS Analyzer & Scoring Utility
 * Evaluates completeness, action verbs, quantified results, contact info,
 * structure, and keyword optimization to calculate an overall ATS score (0-100).
 */

const ACTION_VERBS = [
  "architected", "accelerated", "analyzed", "automated", "built", "calculated",
  "collaborated", "constructed", "created", "debugged", "delivered", "deployed",
  "designed", "developed", "diagnosed", "directed", "engineered", "enhanced",
  "established", "expanded", "formulated", "implemented", "improved", "increased",
  "integrated", "introduced", "launched", "led", "managed", "migrated",
  "modernized", "optimized", "orchestrated", "overhauled", "pioneered", "produced",
  "reduced", "refactored", "remodeled", "resolved", "revamped", "scaled",
  "solved", "spearheaded", "standardized", "streamlined", "strengthened", "transformed",
  "upgraded"
];

const PRONOUNS = ["i", "me", "my", "myself", "we", "our", "us"];

export function analyzeResume(data) {
  let score = 0;
  const checks = [];
  const suggestions = [];

  // 1. Header Contact Info Check (Max 20 pts)
  let contactScore = 0;
  if (data.header.fullName?.trim()) contactScore += 4;
  if (data.header.email?.trim() && data.header.email.includes("@")) contactScore += 4;
  if (data.header.phone?.trim()) contactScore += 4;
  if (data.header.location?.trim()) contactScore += 4;
  if (data.header.linkedin?.trim() || data.header.github?.trim()) contactScore += 4;

  checks.push({
    title: "Contact Details Completeness",
    score: contactScore,
    maxScore: 20,
    status: contactScore === 20 ? "pass" : contactScore >= 12 ? "warning" : "fail"
  });

  if (contactScore < 20) {
    suggestions.push("Ensure Email, Phone, Location, and LinkedIn/GitHub links are fully provided.");
  }

  // 2. Professional Summary Analysis (Max 15 pts)
  let summaryScore = 0;
  const summaryText = data.summary?.trim() || "";
  const wordCount = summaryText ? summaryText.split(/\s+/).length : 0;
  
  if (wordCount >= 25 && wordCount <= 80) {
    summaryScore += 10;
  } else if (wordCount > 0) {
    summaryScore += 5;
  }

  // Check for key skills in summary
  const summaryLower = summaryText.toLowerCase();
  const techMatches = (summaryLower.match(/(javascript|python|c\+\+|sql|react|node|java|html|css|aws|git|api)/g) || []).length;
  if (techMatches >= 2) summaryScore += 5;

  checks.push({
    title: "Professional Summary Quality",
    score: summaryScore,
    maxScore: 15,
    status: summaryScore >= 12 ? "pass" : summaryScore >= 6 ? "warning" : "fail"
  });

  if (wordCount < 25) {
    suggestions.push("Expand Summary to 2-3 lines (25-70 words) highlighting core technical strengths.");
  }

  // 3. Experience & Project Bullets (Max 35 pts)
  let expScore = 0;
  const experiences = data.experience || [];
  let totalBullets = 0;
  let actionVerbCount = 0;
  let quantifiedCount = 0;
  let pronounCount = 0;

  experiences.forEach(exp => {
    (exp.bullets || []).forEach(bullet => {
      if (!bullet.trim()) return;
      totalBullets++;

      const firstWord = bullet.trim().split(/\s+/)[0].toLowerCase().replace(/[^a-z]/g, "");
      if (ACTION_VERBS.includes(firstWord)) {
        actionVerbCount++;
      }

      // Check for quantified metrics (percentages, numbers, dollar amounts, time savings)
      if (/(\d+%\s*|\d+\+\s*|\$\d+|\d+\s*ms|\d+\s*users|\d+\s*seconds|reduced by|increased by|improved by)/i.test(bullet)) {
        quantifiedCount++;
      }

      // Check for first-person pronouns
      const words = bullet.toLowerCase().split(/\s+/);
      words.forEach(w => {
        if (PRONOUNS.includes(w.replace(/[^a-z]/g, ""))) pronounCount++;
      });
    });
  });

  if (experiences.length >= 2) expScore += 10;
  else if (experiences.length === 1) expScore += 5;

  if (totalBullets >= 4) expScore += 10;
  else if (totalBullets > 0) expScore += 5;

  if (actionVerbCount >= Math.min(3, totalBullets)) expScore += 10;
  else if (actionVerbCount > 0) expScore += 5;

  if (quantifiedCount >= 2) expScore += 5;

  checks.push({
    title: "Achievements & Impact Bullets",
    score: expScore,
    maxScore: 35,
    status: expScore >= 28 ? "pass" : expScore >= 18 ? "warning" : "fail"
  });

  if (actionVerbCount < totalBullets) {
    suggestions.push("Start every experience/project bullet point with a strong action verb (e.g. Architected, Developed, Optimized).");
  }
  if (quantifiedCount < 2) {
    suggestions.push("Quantify your achievements with concrete metrics (e.g. 'Improved speed by 35%', 'Served 500+ users').");
  }
  if (pronounCount > 0) {
    suggestions.push("Remove personal pronouns ('I', 'me', 'my') to follow professional ATS resume standards.");
  }

  // 4. Skills Organization (Max 15 pts)
  let skillsScore = 0;
  const skillsObj = data.skills || {};
  const totalSkills = (skillsObj.languages?.length || 0) +
                      (skillsObj.frameworks?.length || 0) +
                      (skillsObj.tools?.length || 0) +
                      (skillsObj.coreCompetencies?.length || 0);

  if (totalSkills >= 10) skillsScore = 15;
  else if (totalSkills >= 5) skillsScore = 10;
  else if (totalSkills > 0) skillsScore = 5;

  checks.push({
    title: "Skills & Technical Stack",
    score: skillsScore,
    maxScore: 15,
    status: skillsScore >= 12 ? "pass" : skillsScore >= 6 ? "warning" : "fail"
  });

  if (totalSkills < 10) {
    suggestions.push("Add more relevant technical skills (languages, frameworks, databases, tools).");
  }

  // 5. Education & Certifications (Max 15 pts)
  let eduScore = 0;
  const education = data.education || [];
  if (education.length > 0 && education[0].degree && education[0].institution) {
    eduScore += 10;
  }
  if (data.certifications?.length > 0) {
    eduScore += 5;
  }

  checks.push({
    title: "Education & Certifications",
    score: eduScore,
    maxScore: 15,
    status: eduScore >= 10 ? "pass" : "warning"
  });

  if (education.length === 0) {
    suggestions.push("Include your highest degree, institution name, and graduation date.");
  }

  // Calculate Overall Score
  score = contactScore + summaryScore + expScore + skillsScore + eduScore;

  return {
    score: Math.min(100, score),
    checks,
    suggestions,
    stats: {
      totalBullets,
      actionVerbCount,
      quantifiedCount,
      totalSkills,
      pronounCount
    }
  };
}
