export const SUMMARY_SUGGESTIONS: Record<string, string[]> = {
  "Software Engineer": [
    "Results-driven software engineer with {X}+ years building scalable applications. Expert in {skills}. Proven track record of delivering high-impact features that improve performance and user experience.",
    "Full-stack developer passionate about clean code and system design. Experienced in agile environments with a focus on mentoring junior developers and driving technical excellence.",
  ],
  "Product Manager": [
    "Strategic product manager with {X}+ years launching products from concept to market. Skilled at cross-functional leadership, data-driven decision making, and delivering measurable business outcomes.",
  ],
  "Data Analyst": [
    "Detail-oriented data analyst transforming complex datasets into actionable insights. Proficient in SQL, Python, and visualization tools with a track record of influencing key business decisions.",
  ],
  default: [
    "Motivated professional with proven expertise in delivering results. Strong communicator and problem-solver committed to continuous improvement and team success.",
    "Dedicated professional bringing {X}+ years of experience and a passion for excellence. Known for reliability, attention to detail, and exceeding expectations.",
  ],
};

export const BULLET_SUGGESTIONS: Record<string, string[]> = {
  leadership: [
    "Led cross-functional team of {N} members to deliver project {X}% ahead of schedule",
    "Mentored {N} junior team members, improving team productivity by {X}%",
    "Spearheaded initiative that reduced costs by ${X} annually",
  ],
  technical: [
    "Architected and deployed scalable solution handling {X}K+ daily requests with 99.9% uptime",
    "Optimized system performance, reducing latency by {X}% and improving user satisfaction",
    "Implemented automated testing pipeline, increasing code coverage from {X}% to {Y}%",
  ],
  business: [
    "Increased revenue by {X}% through strategic initiatives and process improvements",
    "Managed ${X}M budget while delivering all milestones on time and under budget",
    "Negotiated vendor contracts saving ${X}K annually",
  ],
  general: [
    "Collaborated with stakeholders to define requirements and deliver solutions exceeding expectations",
    "Streamlined workflows reducing processing time by {X}%",
    "Received recognition for outstanding performance and dedication to quality",
  ],
};

export const SKILL_SUGGESTIONS: Record<string, string[]> = {
  "Software Engineer": [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
    "PostgreSQL",
    "Git",
    "CI/CD",
    "Agile",
    "System Design",
  ],
  "Product Manager": [
    "Product Strategy",
    "Roadmapping",
    "User Research",
    "A/B Testing",
    "Jira",
    "SQL",
    "Stakeholder Management",
    "Agile",
    "OKRs",
    "Data Analysis",
  ],
  "Marketing": [
    "SEO",
    "Google Analytics",
    "Content Strategy",
    "Social Media",
    "Email Marketing",
    "HubSpot",
    "A/B Testing",
    "Brand Management",
  ],
};

export const JOB_ROLES = [
  "Software Engineer",
  "Product Manager",
  "Data Analyst",
  "Marketing Manager",
  "Project Manager",
  "Designer",
  "Sales Representative",
  "Nurse",
  "Teacher",
  "Accountant",
  "Student / Intern",
];
