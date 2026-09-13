/**
 * Resume Format Builders & Export Tools
 */

export function generatePlainTextResume(data) {
  const lines = [];

  // Header
  const h = data.header || {};
  lines.push((h.fullName || "YOUR NAME").toUpperCase());
  
  const contactRow = [
    h.location,
    h.phone ? `Phone: ${h.phone}` : "",
    h.email ? `Email: ${h.email}` : ""
  ].filter(Boolean).join(" | ");

  if (contactRow) lines.push(contactRow);

  const linksRow = [
    h.linkedin ? `LinkedIn: ${h.linkedin}` : "",
    h.github ? `GitHub: ${h.github}` : "",
    h.portfolio ? `Portfolio: ${h.portfolio}` : ""
  ].filter(Boolean).join(" | ");

  if (linksRow) lines.push(linksRow);

  const divider = "================================================================================";

  // Summary
  if (data.summary?.trim()) {
    lines.push("");
    lines.push(divider);
    lines.push("SUMMARY");
    lines.push(divider);
    lines.push(data.summary.trim());
  }

  // Education
  if (data.education?.length > 0) {
    lines.push("");
    lines.push(divider);
    lines.push("EDUCATION");
    lines.push(divider);
    data.education.forEach(edu => {
      if (!edu.degree && !edu.institution) return;
      lines.push(`${edu.degree || ""}`);
      const instLine = [edu.institution, edu.location].filter(Boolean).join(", ");
      const gradLine = [edu.graduationDate ? `Graduation: ${edu.graduationDate}` : "", edu.gpa ? `GPA: ${edu.gpa}` : ""].filter(Boolean).join(" | ");
      lines.push(`${instLine}${gradLine ? `\n${gradLine}` : ""}`);
      if (edu.highlights) lines.push(`Highlights: ${edu.highlights}`);
      lines.push("");
    });
    // Remove trailing empty line if added
    if (lines[lines.length - 1] === "") lines.pop();
  }

  // Skills
  const s = data.skills || {};
  const hasSkills = (s.languages?.length || 0) + (s.frameworks?.length || 0) + (s.tools?.length || 0) + (s.softSkills?.length || 0) > 0;
  
  if (hasSkills) {
    lines.push("");
    lines.push(divider);
    lines.push("TECHNICAL & SOFT SKILLS");
    lines.push(divider);
    if (s.languages?.length) lines.push(`• Programming Languages: ${s.languages.join(", ")}`);
    if (s.frameworks?.length) lines.push(`• Frameworks & Libraries: ${s.frameworks.join(", ")}`);
    if (s.tools?.length) lines.push(`• Databases & Tools: ${s.tools.join(", ")}`);
    if (s.coreCompetencies?.length) lines.push(`• Core Competencies: ${s.coreCompetencies.join(", ")}`);
    if (s.softSkills?.length) lines.push(`• Soft Skills: ${s.softSkills.join(", ")}`);
  }

  // Experience / Projects
  if (data.experience?.length > 0) {
    lines.push("");
    lines.push(divider);
    lines.push("PROJECT & WORK EXPERIENCE");
    lines.push(divider);
    data.experience.forEach(exp => {
      if (!exp.role && !exp.organization) return;
      const titleLine = [exp.role, exp.organization].filter(Boolean).join(" | ");
      lines.push(titleLine);
      if (exp.dates) lines.push(`Dates: ${exp.dates}`);
      (exp.bullets || []).forEach(b => {
        if (b.trim()) lines.push(`• ${b.trim()}`);
      });
      lines.push("");
    });
    if (lines[lines.length - 1] === "") lines.pop();
  }

  // Certifications
  if (data.certifications?.length > 0) {
    lines.push("");
    lines.push(divider);
    lines.push("CERTIFICATIONS");
    lines.push(divider);
    data.certifications.forEach(cert => {
      if (!cert.name) return;
      const certLine = [cert.name, cert.issuer, cert.date ? `Issued: ${cert.date}` : ""].filter(Boolean).join(" – ");
      lines.push(`• ${certLine}`);
    });
  }

  // Additional
  const add = data.additional || {};
  if (add.languages || add.interests) {
    lines.push("");
    lines.push(divider);
    lines.push("ADDITIONAL INFORMATION");
    lines.push(divider);
    if (add.languages) lines.push(`• Languages: ${add.languages}`);
    if (add.interests) lines.push(`• Interests: ${add.interests}`);
  }

  return lines.join("\n");
}

export function generateMarkdownResume(data) {
  const lines = [];
  const h = data.header || {};

  lines.push(`# ${h.fullName || "YOUR NAME"}`);
  if (h.title) lines.push(`**${h.title}**\n`);

  const contactList = [
    h.location,
    h.phone ? `Phone: ${h.phone}` : "",
    h.email ? `Email: [${h.email}](mailto:${h.email})` : "",
    h.linkedin ? `[LinkedIn](${h.linkedin.startsWith("http") ? h.linkedin : "https://" + h.linkedin})` : "",
    h.github ? `[GitHub](${h.github.startsWith("http") ? h.github : "https://" + h.github})` : ""
  ].filter(Boolean).join(" | ");

  if (contactList) lines.push(`${contactList}\n`);

  if (data.summary?.trim()) {
    lines.push(`## Professional Summary\n${data.summary.trim()}\n`);
  }

  if (data.education?.length > 0) {
    lines.push(`## Education\n`);
    data.education.forEach(edu => {
      lines.push(`### ${edu.degree || ""}`);
      lines.push(`*${[edu.institution, edu.location].filter(Boolean).join(", ")}* | ${edu.graduationDate || ""}`);
      if (edu.gpa) lines.push(`**GPA:** ${edu.gpa}`);
      if (edu.highlights) lines.push(`*${edu.highlights}*`);
      lines.push("");
    });
  }

  const s = data.skills || {};
  if (s.languages?.length || s.frameworks?.length || s.tools?.length) {
    lines.push(`## Technical & Soft Skills\n`);
    if (s.languages?.length) lines.push(`- **Languages:** ${s.languages.join(", ")}`);
    if (s.frameworks?.length) lines.push(`- **Frameworks & Libraries:** ${s.frameworks.join(", ")}`);
    if (s.tools?.length) lines.push(`- **Tools & Databases:** ${s.tools.join(", ")}`);
    if (s.softSkills?.length) lines.push(`- **Soft Skills:** ${s.softSkills.join(", ")}`);
    lines.push("");
  }

  if (data.experience?.length > 0) {
    lines.push(`## Experience & Projects\n`);
    data.experience.forEach(exp => {
      lines.push(`### ${exp.role} - ${exp.organization}`);
      if (exp.dates) lines.push(`*${exp.dates}*\n`);
      (exp.bullets || []).forEach(b => {
        if (b.trim()) lines.push(`- ${b.trim()}`);
      });
      lines.push("");
    });
  }

  if (data.certifications?.length > 0) {
    lines.push(`## Certifications\n`);
    data.certifications.forEach(cert => {
      lines.push(`- **${cert.name}** - ${cert.issuer} (${cert.date || ""})`);
    });
    lines.push("");
  }

  return lines.join("\n");
}

export function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function copyToClipboard(text) {
  return navigator.clipboard.writeText(text);
}
