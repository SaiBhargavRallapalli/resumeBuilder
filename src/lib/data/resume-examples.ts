import type { ResumeDocument, TemplateId } from "@/lib/types/resume";
import { createEmptyResume } from "@/lib/types/resume";
import { applyTemplateDefaults } from "@/lib/data/templates";

export interface ResumeExample {
  id: string;
  title: string;
  role: string;
  industry: string;
  templateId: TemplateId;
  description: string;
}

export const RESUME_EXAMPLES: ResumeExample[] = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    role: "Senior Software Engineer",
    industry: "Technology",
    templateId: "modern",
    description: "Full-stack engineer with cloud and leadership experience",
  },
  {
    id: "product-manager",
    title: "Product Manager",
    role: "Product Manager",
    industry: "Technology",
    templateId: "professional",
    description: "B2B SaaS product leader with growth metrics",
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    role: "Data Analyst",
    industry: "Analytics",
    templateId: "double-column",
    description: "SQL, Python, and visualization expertise",
  },
  {
    id: "marketing-manager",
    title: "Marketing Manager",
    role: "Marketing Manager",
    industry: "Marketing",
    templateId: "contemporary",
    description: "Digital marketing and campaign performance",
  },
  {
    id: "nurse",
    title: "Registered Nurse",
    role: "Registered Nurse",
    industry: "Healthcare",
    templateId: "classic",
    description: "Clinical experience and patient care",
  },
  {
    id: "student-intern",
    title: "Student / Intern",
    role: "Computer Science Student",
    industry: "Education",
    templateId: "single-column",
    description: "Entry-level with projects and coursework",
  },
  {
    id: "project-manager",
    title: "Project Manager",
    role: "Project Manager",
    industry: "Business",
    templateId: "timeline",
    description: "Agile delivery and stakeholder management",
  },
  {
    id: "sales-representative",
    title: "Sales Representative",
    role: "Account Executive",
    industry: "Sales",
    templateId: "polished",
    description: "Quota attainment and enterprise deals",
  },
];

function baseDoc(
  example: ResumeExample,
  sections: ResumeDocument["sections"],
  visibility?: Partial<ResumeDocument["visibility"]>
): ResumeDocument {
  const doc = createEmptyResume(example.title);
  doc.templateId = example.templateId;
  doc.style = applyTemplateDefaults(example.templateId, doc.style);
  doc.sections = sections;
  if (visibility) doc.visibility = { ...doc.visibility, ...visibility };
  return doc;
}

export function buildResumeExample(exampleId: string): ResumeDocument | null {
  const example = RESUME_EXAMPLES.find((e) => e.id === exampleId);
  if (!example) return null;

  switch (exampleId) {
    case "software-engineer":
      return baseDoc(example, {
        contact: {
          fullName: "Alex Morgan",
          jobTitle: "Senior Software Engineer",
          email: "alex.morgan@email.com",
          phone: "+1 (415) 555-0142",
          location: "San Francisco, CA",
          website: "alexmorgan.dev",
          linkedin: "linkedin.com/in/alexmorgan",
        },
        summary:
          "Results-driven Senior Software Engineer with 8+ years building scalable web applications. Expert in React, TypeScript, Node.js, and AWS. Led teams of 5+ engineers and delivered systems serving 50K+ daily users with 99.9% uptime.",
        experience: [
          {
            id: crypto.randomUUID(),
            company: "Stripe",
            position: "Senior Software Engineer",
            location: "San Francisco, CA",
            startDate: "2021-03",
            endDate: "",
            current: true,
            bullets: [
              "Architected payment processing microservices handling $2B+ annual volume with 99.99% reliability",
              "Reduced API latency by 45% through query optimization and Redis caching layer",
              "Mentored 5 engineers; established code review standards improving deployment frequency 3x",
            ],
          },
          {
            id: crypto.randomUUID(),
            company: "Airbnb",
            position: "Software Engineer",
            location: "San Francisco, CA",
            startDate: "2018-06",
            endDate: "2021-02",
            current: false,
            bullets: [
              "Built host dashboard features used by 4M+ hosts, increasing engagement 22%",
              "Implemented feature flags and A/B testing framework adopted by 12 product teams",
            ],
          },
        ],
        education: [
          {
            id: crypto.randomUUID(),
            institution: "UC Berkeley",
            degree: "B.S.",
            field: "Computer Science",
            location: "Berkeley, CA",
            startDate: "2014",
            endDate: "2018",
            gpa: "3.8",
            bullets: [],
          },
        ],
        skills: [
          "TypeScript", "React", "Next.js", "Node.js", "Python", "AWS",
          "PostgreSQL", "Redis", "Docker", "Kubernetes", "GraphQL", "CI/CD",
        ],
        projects: [
          {
            id: crypto.randomUUID(),
            name: "Open Source CLI Toolkit",
            url: "github.com/alexmorgan/cli-toolkit",
            description: "",
            bullets: ["2,500+ GitHub stars", "Featured in JavaScript Weekly"],
          },
        ],
        certifications: [
          { id: crypto.randomUUID(), name: "AWS Solutions Architect", issuer: "Amazon", date: "2023" },
        ],
        awards: [],
        languages: [],
      }, { projects: true, certifications: true });

    case "product-manager":
      return baseDoc(example, {
        contact: {
          fullName: "Jordan Lee",
          jobTitle: "Product Manager",
          email: "jordan.lee@email.com",
          phone: "+1 (212) 555-0198",
          location: "New York, NY",
          website: "",
          linkedin: "linkedin.com/in/jordanlee",
        },
        summary:
          "Strategic Product Manager with 6+ years launching B2B SaaS products from concept to $10M ARR. Expert in user research, roadmap prioritization, and cross-functional leadership. Increased activation 35% and reduced churn 18%.",
        experience: [
          {
            id: crypto.randomUUID(),
            company: "HubSpot",
            position: "Senior Product Manager",
            location: "Boston, MA (Remote)",
            startDate: "2020-01",
            endDate: "",
            current: true,
            bullets: [
              "Owned CRM integrations roadmap generating $4.2M incremental ARR in 18 months",
              "Led discovery with 40+ enterprise customers; shipped 3 features with 92% satisfaction",
              "Partnered with engineering to reduce time-to-market from 12 weeks to 6 weeks",
            ],
          },
        ],
        education: [
          {
            id: crypto.randomUUID(),
            institution: "NYU Stern",
            degree: "MBA",
            field: "Strategy",
            location: "New York, NY",
            startDate: "2016",
            endDate: "2018",
            gpa: "",
            bullets: [],
          },
        ],
        skills: [
          "Product Strategy", "Roadmapping", "User Research", "SQL", "Jira",
          "A/B Testing", "OKRs", "Agile", "Stakeholder Management", "Figma",
        ],
        projects: [],
        certifications: [],
        awards: [],
        languages: [],
      });

    case "data-analyst":
      return baseDoc(example, {
        contact: {
          fullName: "Priya Sharma",
          jobTitle: "Data Analyst",
          email: "priya.sharma@email.com",
          phone: "+1 (469) 555-0167",
          location: "Austin, TX",
          website: "",
          linkedin: "linkedin.com/in/priyasharma",
        },
        summary:
          "Detail-oriented Data Analyst transforming complex datasets into actionable business insights. 4+ years with SQL, Python, Tableau, and statistical modeling. Influenced $2M+ in cost-saving decisions.",
        experience: [
          {
            id: crypto.randomUUID(),
            company: "Dell Technologies",
            position: "Data Analyst",
            location: "Round Rock, TX",
            startDate: "2021-08",
            endDate: "",
            current: true,
            bullets: [
              "Built executive dashboards tracking 15 KPIs, adopted by C-suite for quarterly reviews",
              "Automated reporting pipeline saving 20 hours/week across finance team",
              "Identified supply chain inefficiency leading to $800K annual savings",
            ],
          },
        ],
        education: [
          {
            id: crypto.randomUUID(),
            institution: "UT Austin",
            degree: "B.S.",
            field: "Statistics",
            location: "Austin, TX",
            startDate: "2017",
            endDate: "2021",
            gpa: "3.7",
            bullets: [],
          },
        ],
        skills: ["SQL", "Python", "R", "Tableau", "Power BI", "Excel", "Snowflake", "dbt", "A/B Testing"],
        projects: [],
        certifications: [
          { id: crypto.randomUUID(), name: "Google Data Analytics", issuer: "Google", date: "2022" },
        ],
        awards: [],
        languages: [{ id: crypto.randomUUID(), name: "Hindi", proficiency: "Native" }],
      }, { languages: true, certifications: true });

    case "marketing-manager":
      return baseDoc(example, {
        contact: {
          fullName: "Sam Taylor",
          jobTitle: "Marketing Manager",
          email: "sam.taylor@email.com",
          phone: "+1 (310) 555-0134",
          location: "Los Angeles, CA",
          website: "samtaylor.marketing",
          linkedin: "linkedin.com/in/samtaylor",
        },
        summary:
          "Growth-focused Marketing Manager with 7+ years driving demand gen and brand campaigns. Managed $1.5M annual budget with 4.2x ROAS. Expert in SEO, paid social, and marketing automation.",
        experience: [
          {
            id: crypto.randomUUID(),
            company: "Canva",
            position: "Marketing Manager",
            location: "Sydney / Remote",
            startDate: "2019-05",
            endDate: "",
            current: true,
            bullets: [
              "Grew organic traffic 120% YoY through content strategy and technical SEO",
              "Launched paid campaigns with $1.5M budget achieving 4.2x ROAS",
              "Led rebrand initiative increasing brand awareness scores 28%",
            ],
          },
        ],
        education: [
          {
            id: crypto.randomUUID(),
            institution: "UCLA",
            degree: "B.A.",
            field: "Communications",
            location: "Los Angeles, CA",
            startDate: "2012",
            endDate: "2016",
            gpa: "",
            bullets: [],
          },
        ],
        skills: ["SEO", "Google Analytics", "HubSpot", "Meta Ads", "Content Strategy", "Email Marketing"],
        projects: [],
        certifications: [],
        awards: [],
        languages: [],
      });

    case "nurse":
      return baseDoc(example, {
        contact: {
          fullName: "Maria Garcia, RN",
          jobTitle: "Registered Nurse",
          email: "maria.garcia@email.com",
          phone: "+1 (713) 555-0189",
          location: "Houston, TX",
          website: "",
          linkedin: "linkedin.com/in/mariagarcia-rn",
        },
        summary:
          "Compassionate Registered Nurse with 5+ years in acute care and emergency departments. BLS and ACLS certified. Recognized for patient advocacy and interdisciplinary collaboration.",
        experience: [
          {
            id: crypto.randomUUID(),
            company: "Houston Methodist Hospital",
            position: "Registered Nurse — ICU",
            location: "Houston, TX",
            startDate: "2020-03",
            endDate: "",
            current: true,
            bullets: [
              "Managed care for 4–6 critical patients per shift in 30-bed ICU unit",
              "Trained 8 new nurses on protocols; reduced medication errors 15%",
              "Collaborated with physicians on care plans improving patient satisfaction 20%",
            ],
          },
        ],
        education: [
          {
            id: crypto.randomUUID(),
            institution: "Texas Woman's University",
            degree: "BSN",
            field: "Nursing",
            location: "Houston, TX",
            startDate: "2016",
            endDate: "2020",
            gpa: "3.6",
            bullets: [],
          },
        ],
        skills: ["Patient Care", "ACLS", "BLS", "Epic EMR", "IV Therapy", "Triage", "Care Planning"],
        projects: [],
        certifications: [
          { id: crypto.randomUUID(), name: "RN License", issuer: "Texas BON", date: "2020" },
          { id: crypto.randomUUID(), name: "ACLS", issuer: "AHA", date: "2024" },
        ],
        awards: [],
        languages: [{ id: crypto.randomUUID(), name: "Spanish", proficiency: "Fluent" }],
      }, { certifications: true, languages: true });

    case "student-intern":
      return baseDoc(example, {
        contact: {
          fullName: "Chris Nguyen",
          jobTitle: "Computer Science Student",
          email: "chris.nguyen@university.edu",
          phone: "+1 (617) 555-0176",
          location: "Boston, MA",
          website: "github.com/chrisnguyen",
          linkedin: "linkedin.com/in/chrisnguyen",
        },
        summary:
          "Motivated CS student seeking software engineering internship. Strong foundation in algorithms, web development, and collaborative projects. Dean's List 3 semesters.",
        experience: [
          {
            id: crypto.randomUUID(),
            company: "MIT CSAIL",
            position: "Research Assistant",
            location: "Cambridge, MA",
            startDate: "2024-09",
            endDate: "",
            current: true,
            bullets: [
              "Assisted ML research on NLP models; contributed to paper submitted to ACL 2026",
              "Implemented data pipeline processing 50K documents using Python and pandas",
            ],
          },
        ],
        education: [
          {
            id: crypto.randomUUID(),
            institution: "MIT",
            degree: "B.S.",
            field: "Computer Science",
            location: "Cambridge, MA",
            startDate: "2022",
            endDate: "2026",
            gpa: "3.9",
            bullets: ["Dean's List", "HackMIT 2024 Winner"],
          },
        ],
        skills: ["Python", "Java", "React", "Git", "Algorithms", "Machine Learning"],
        projects: [
          {
            id: crypto.randomUUID(),
            name: "Campus Events App",
            url: "github.com/chrisnguyen/campus-events",
            description: "Full-stack app for 2,000+ students",
            bullets: ["React + Node.js", "Deployed on AWS"],
          },
        ],
        certifications: [],
        awards: [],
        languages: [],
      }, { projects: true });

    case "project-manager":
      return baseDoc(example, {
        contact: {
          fullName: "David Chen",
          jobTitle: "Project Manager",
          email: "david.chen@email.com",
          phone: "+1 (312) 555-0155",
          location: "Chicago, IL",
          website: "",
          linkedin: "linkedin.com/in/davidchen-pm",
        },
        summary:
          "PMP-certified Project Manager delivering enterprise software on time and under budget. 9+ years in Agile environments managing cross-functional teams of 15+.",
        experience: [
          {
            id: crypto.randomUUID(),
            company: "Accenture",
            position: "Senior Project Manager",
            location: "Chicago, IL",
            startDate: "2019-01",
            endDate: "",
            current: true,
            bullets: [
              "Delivered $5M digital transformation 2 weeks ahead of schedule for Fortune 500 client",
              "Managed portfolio of 4 concurrent projects with combined budget of $12M",
              "Improved sprint velocity 30% through process optimization and retrospectives",
            ],
          },
          {
            id: crypto.randomUUID(),
            company: "IBM",
            position: "Project Manager",
            location: "Chicago, IL",
            startDate: "2015-06",
            endDate: "2018-12",
            current: false,
            bullets: [
              "Led migration of legacy systems for 200+ users with zero downtime go-live",
            ],
          },
        ],
        education: [
          {
            id: crypto.randomUUID(),
            institution: "Northwestern University",
            degree: "M.S.",
            field: "Project Management",
            location: "Evanston, IL",
            startDate: "2013",
            endDate: "2015",
            gpa: "",
            bullets: [],
          },
        ],
        skills: ["Agile", "Scrum", "Jira", "MS Project", "Risk Management", "Stakeholder Management", "PMP"],
        projects: [],
        certifications: [
          { id: crypto.randomUUID(), name: "PMP", issuer: "PMI", date: "2018" },
        ],
        awards: [],
        languages: [],
      }, { certifications: true });

    case "sales-representative":
      return baseDoc(example, {
        contact: {
          fullName: "Rachel Kim",
          jobTitle: "Account Executive",
          email: "rachel.kim@email.com",
          phone: "+1 (206) 555-0123",
          location: "Seattle, WA",
          website: "",
          linkedin: "linkedin.com/in/rachelkim",
        },
        summary:
          "Top-performing Account Executive with 6+ years closing enterprise SaaS deals. Exceeded quota 4 consecutive years. Average deal size $150K with 35% close rate.",
        experience: [
          {
            id: crypto.randomUUID(),
            company: "Salesforce",
            position: "Senior Account Executive",
            location: "Seattle, WA",
            startDate: "2020-02",
            endDate: "",
            current: true,
            bullets: [
              "Exceeded annual quota by 142%, ranking #3 of 45 reps in region",
              "Closed $2.8M in new ARR including 3 enterprise accounts ($500K+ each)",
              "Built pipeline of $8M through outbound prospecting and partner referrals",
            ],
          },
        ],
        education: [
          {
            id: crypto.randomUUID(),
            institution: "University of Washington",
            degree: "B.A.",
            field: "Business Administration",
            location: "Seattle, WA",
            startDate: "2014",
            endDate: "2018",
            gpa: "",
            bullets: [],
          },
        ],
        skills: ["Enterprise Sales", "Salesforce CRM", "Negotiation", "Pipeline Management", "SaaS"],
        projects: [],
        certifications: [],
        awards: [
          { id: crypto.randomUUID(), title: "President's Club", issuer: "Salesforce", date: "2024" },
        ],
        languages: [],
      }, { awards: true });

    default:
      return null;
  }
}
