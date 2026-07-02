/**
 * Single source of truth for all portfolio content.
 * Every fact here comes from Muntjirkhan Pathan's resume — do not add
 * companies, projects, metrics, or links that are not on the resume.
 */

export const siteConfig = {
  // TODO: set your production domain once deployed (also see NEXT_PUBLIC_SITE_URL).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  name: "Muntjirkhan Pathan",
  initials: "MP",
  role: "Backend Software Developer",
  headline: "Backend Software Developer specializing in Magento 2, Laravel & PHP",
  location: "Ahmedabad, Gujarat, India",
  email: "montukhanpathan007@gmail.com",
  phone: "+91 90167 19183",
  links: {
    github: "https://github.com/Montukhan786",
    // TODO: verify this slug matches your public LinkedIn profile URL.
    linkedin: "https://www.linkedin.com/in/muntjirkhan-pathan",
    resume: "/resume.pdf",
  },
  description:
    "Backend-focused Software Developer with 2.5+ years of experience building scalable web and e-commerce applications with PHP, Laravel, and Magento 2 — B2B modules, GraphQL & REST APIs, ERP integrations, and order processing workflows.",
  keywords: [
    "Magento 2 Developer",
    "Laravel Developer",
    "PHP Developer",
    "Backend Developer",
    "Magento 2 B2B",
    "GraphQL",
    "REST API",
    "ERP Integration",
    "Ahmedabad",
    "Muntjirkhan Pathan",
  ],
} as const;

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
] as const;

export const hero = {
  eyebrow: "Backend Developer — Ahmedabad, IN",
  intro:
    "2.5+ years building and maintaining scalable e-commerce and SaaS backends. I design custom Magento 2 B2B modules, GraphQL & REST APIs, ERP integrations, and Laravel services that serve thousands of monthly users.",
  // Content of the signature GraphQL panel. Facts only.
  graphql: {
    endpoint: "POST /graphql",
    status: "200 OK",
    query: [
      "query {",
      '  developer(id: "muntjirkhan") {',
      "    name role stack focus",
      "  }",
      "}",
    ],
    response: [
      { key: "name", value: "Muntjirkhan Pathan", type: "string" as const },
      { key: "role", value: "Backend Developer", type: "string" as const },
      { key: "stack", value: ["Magento 2", "Laravel", "PHP"], type: "array" as const },
      { key: "focus", value: "B2B e-commerce", type: "string" as const },
      { key: "experience", value: "2.5+ years", type: "string" as const },
      { key: "location", value: "Ahmedabad, IN", type: "string" as const },
    ],
  },
};

export const about = {
  paragraphs: [
    "I'm a backend-focused software developer at Cinovic Technologies LLP, where I build and maintain scalable modules for Magento 2 and Laravel applications — e-commerce and SaaS products serving thousands of monthly users.",
    "My core specialty is Magento 2 B2B commerce: company management, GT/MT customer-group pricing, multi-MRP pricing, custom inventory reservation, order merging, and ERP (Vinculum) integrations — exposed through GraphQL and REST APIs and wired into real order processing workflows.",
    "On the Laravel side, I build REST APIs, Eloquent-based modules, queues, and scheduled jobs that power asynchronous workflows like bulk imports, notifications, and report generation. I care about clean, testable backend code — SOLID principles, code reviews, and debugging production issues down to the slow query.",
  ],
  specialties: [
    "Magento 2 B2B & company management",
    "GraphQL & REST API design",
    "GT/MT customer-group & multi-MRP pricing",
    "Custom inventory reservation (MSI)",
    "ERP (Vinculum) integration",
    "Order merging & processing workflows",
    "Checkout customization",
    "Query optimization & caching",
  ],
};

export type SkillGroup = {
  key: string;
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    key: "languages",
    label: "Languages",
    items: ["PHP", "JavaScript", "SQL", "HTML5", "CSS3", "jQuery"],
  },
  {
    key: "frameworks",
    label: "Frameworks & CMS",
    items: ["Magento 2", "Laravel", "Spring Boot (basic)"],
  },
  {
    key: "databases",
    label: "Databases",
    items: ["MySQL", "MariaDB", "Query optimization", "Joins"],
  },
  {
    key: "backend",
    label: "APIs & Backend",
    items: ["REST APIs", "GraphQL", "AJAX", "JSON", "Third-party integrations", "Postman"],
  },
  {
    key: "magento",
    label: "Magento Expertise",
    items: [
      "Custom module development",
      "B2B development",
      "Company accounts",
      "Checkout customization",
      "EAV model",
      "MSI",
      "Multi-MRP pricing",
      "Inventory management",
      "GraphQL APIs",
      "Dependency injection",
      "Plugins",
      "Observers",
    ],
  },
  {
    key: "tools",
    label: "Tools & DevOps",
    items: [
      "Git",
      "GitHub",
      "GitLab",
      "Bitbucket",
      "Composer",
      "Docker (basics)",
      "Linux CLI",
      "VS Code",
      "Postman",
    ],
  },
];

export type ProjectLink = {
  label: "Live Demo" | "GitHub" | "Case Study";
  href: string | null; // null → render an honest "coming soon" placeholder
};

export type Project = {
  slug: string;
  title: string;
  featured?: boolean;
  description: string;
  tech: string[];
  links: ProjectLink[];
  metrics?: { value: string; label: string }[];
};

export const projects: Project[] = [
  {
    slug: "magento-b2b-platform",
    title: "Magento 2 B2B E-commerce Platform",
    featured: true,
    description:
      "A suite of custom Magento 2 modules for B2B commerce: customer-group pricing with GT/MT allocation, multi-MRP pricing, custom inventory reservation, GraphQL APIs, ERP (Vinculum) integration, checkout customization, admin grids, and order workflows including order merging.",
    tech: ["Magento 2", "PHP", "MySQL", "GraphQL", "REST API", "MSI", "JavaScript"],
    links: [
      { label: "Live Demo", href: null },
      { label: "GitHub", href: null },
      { label: "Case Study", href: null },
    ],
    metrics: [
      { value: "10+", label: "Custom modules" },
      { value: "1000s", label: "Monthly users served" },
      { value: "↓", label: "Manual operations reduced" },
      { value: "↑", label: "Backend performance optimized" },
    ],
  },
  {
    slug: "laravel-admin-api",
    title: "Laravel Admin & REST API Backend",
    description:
      "Internal admin panel backend with role-based access control, JWT authentication, REST APIs, request validation, Eloquent relationships, queue-driven email notifications, and scheduled jobs.",
    tech: ["Laravel", "PHP", "MySQL", "AJAX", "jQuery"],
    links: [
      { label: "GitHub", href: null },
      { label: "Case Study", href: null },
    ],
  },
  {
    slug: "spring-boot-booking",
    title: "Spring Boot Movie Booking Backend",
    description:
      "Self-learning project: a layered Spring Boot REST application with 13+ APIs for movie show booking, JPA/Hibernate persistence, and a clean controller / service / repository architecture.",
    tech: ["Java", "Spring Boot", "MySQL"],
    links: [
      { label: "GitHub", href: null },
      { label: "Case Study", href: null },
    ],
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary?: string;
  bullets: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    company: "Cinovic Technologies LLP",
    role: "Backend Developer (PHP / Magento / Laravel)",
    period: "Jun 2023 — Present",
    location: "Ahmedabad, India",
    summary:
      "Building scalable backend modules for e-commerce and SaaS products serving thousands of monthly users.",
    bullets: [
      "Built 10+ custom Magento 2 modules and admin extensions across catalog, checkout, customer account, and order workflows — reducing manual operations for the client team.",
      "Implemented company management, GT/MT customer-group pricing, multi-MRP pricing, custom inventory reservation, order merging, and ERP (Vinculum) integration.",
      "Developed GraphQL APIs and improved response times on key pages through query optimization and caching.",
      "Implemented Laravel REST APIs, Eloquent relationships, queues, and scheduled jobs for bulk imports, notifications, and report generation.",
      "Followed feature → develop → main Git branching with peer code reviews and CI checks; debugged production incidents via Magento logs, Laravel Telescope, and MySQL slow query logs.",
      "Collaborated in Agile sprints with frontend developers, QA, and project managers.",
    ],
    tags: ["Magento 2", "Laravel", "PHP", "GraphQL", "MySQL", "ERP"],
  },
  {
    company: "Adopt Nettech",
    role: "Java Developer Intern",
    period: "Apr 2023 — Jun 2023",
    location: "Ahmedabad, India",
    bullets: [
      "Trained in Spring Boot, microservices, Docker, and Git; contributed to a networking-domain product integrating with a TACACS authentication server.",
      "Implemented REST endpoints and bug fixes under senior guidance, following code review and version control discipline.",
    ],
    tags: ["Spring Boot", "Docker", "REST APIs", "Git", "TACACS"],
  },
];

export type Stat = {
  value: number;
  decimals?: number;
  suffix: string;
  label: string;
};

export const stats: Stat[] = [
  { value: 2.5, decimals: 1, suffix: "+", label: "Years of experience" },
  { value: 10, suffix: "+", label: "Magento modules built" },
  { value: 30, suffix: "+", label: "APIs developed" },
  { value: 100, suffix: "+", label: "Bugs fixed" },
];

export const statsFootnote = "…and multiple B2B features delivered end to end.";

export type BlogPost = {
  title: string;
  description: string;
  tag: string;
};

// Placeholder cards — writing in progress, no fabricated publish dates.
export const blogPosts: BlogPost[] = [
  {
    title: "Magento 2 Module Development, the Practical Way",
    description:
      "Routing, dependency injection, plugins vs observers — how a production module actually comes together.",
    tag: "Magento 2",
  },
  {
    title: "GraphQL in Magento 2",
    description:
      "Designing custom GraphQL endpoints for B2B storefronts: resolvers, batching, and caching.",
    tag: "GraphQL",
  },
  {
    title: "Laravel Queue Processing in Production",
    description:
      "Queues, scheduled jobs, and failure handling for bulk imports and notifications.",
    tag: "Laravel",
  },
  {
    title: "Magento MSI Deep Dive",
    description:
      "How Multi-Source Inventory reservations really work — and how to customize them safely.",
    tag: "Magento 2",
  },
  {
    title: "ERP Integration with Magento",
    description:
      "Lessons from wiring Vinculum ERP into Magento order flows: syncing, retries, and reconciliation.",
    tag: "Integration",
  },
  {
    title: "PHP Performance Optimization",
    description:
      "Finding and fixing slow paths: profiling, query optimization, and caching strategies.",
    tag: "PHP",
  },
];

export const education = {
  degree: "Bachelor of Computer Applications (BCA)",
  school: "Tarkesh and Niranjana Commerce College, Boriavi",
  period: "Jul 2017 — Sep 2020",
  detail: "CGPA 7.88",
  certifications: [
    "HackerRank — Java (Basic)",
    "HackerRank — Problem Solving (Basic)",
    "Oasis Infobyte — Java Development Virtual Internship (2023)",
  ],
};
