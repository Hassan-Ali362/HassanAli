import type { Domain } from "@/components/tech-icons";

/**
 * ============================================================================
 * Content for the site. Real details are filled in. Anything still reading
 * "TODO" is waiting on you and is meant to be obvious, not shipped.
 *
 * Deliberately absent: performance metrics. There are no invented percentages
 * on this site. Add them here only when you can point at where they came from.
 * ============================================================================
 */

export const profile = {
  name: "Hassan Ali",
  initials: "HA",
  role: "AI & Full-Stack Engineer",
  /* Hero subtext: 20 words. Hard cap is 20. Does not restate the headline and
     does not list the stack, which the Stack section already does. */
  tagline:
    "I build software end to end, from web and mobile applications to AI-powered systems and automated workflows, and take them from idea to production.",
  /* The one claim on this site about your intent rather than your history, so
     it is the one you should check before shipping. Set it to null and the
     hero drops the status chip entirely rather than leaving a stale promise up. */
  availability: "Open to AI and full-stack roles" as string | null,
  /**
   * What the hero plate leads with in place of a current job title. Disciplines
   * rather than named work, so the plate stays true whatever is in the Work
   * section, and so nothing here has to be rewritten when a project changes.
   */
  focus: "Full stack Web and App, AI and DevOps",
  location: "Islamabad, Pakistan",
  email: "hassanalimalikk@gmail.com",
  resumeUrl: "/hassan-ali-resume.pdf",
  socials: {
    linkedin: "https://www.linkedin.com/in/hassanali-dev123/",
    // TODO: your GitHub profile URL.
    github: "https://github.com/Hassan-Ali362",
    website: "https://hassanali.dev",
  },
} as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "Experience", href: "#experience" },
] as const;

/* -------------------------------------------------------------------------- */
/*  About                                                                     */
/* -------------------------------------------------------------------------- */
export const about = {
  /**
   * Your photo. Drop the file in /public and set the path here, for example
   * "/hassan-ali.jpg". A portrait crop around 800x1000 works best.
   * While this is null the section renders an initials plate instead, so the
   * layout is complete either way.
   */
  photo: "/hassan-ali.jpg" as string | null,

  /* TODO: rewrite these two paragraphs in your own voice. They are accurate
     to what you have told me, but they are my words, not yours, and this is
     the one section where that shows. */
  lead: "I'm a software developer who enjoys turning ideas into real, usable products.",
  body: [
    "I work across the stack, building web and mobile applications, backend systems, APIs, and the infrastructure needed to take them from development to production.",
    "I also work with AI when it adds real value—building AI agents, RAG systems, intelligent workflows, and automation that solve practical problems rather than adding AI for the sake of it.",
    "I enjoy working across different parts of a product, from designing the user experience and writing the backend to integrating AI, automating processes, and deploying reliable systems. I'm always interested in learning new technologies and using the right tools to solve the problem at hand.",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  Facts strip                                                               */
/*  Counts and durations only. Every one of these is checkable.                */
/* -------------------------------------------------------------------------- */
export type Fact = {
  label: string;
  value: number;
  decimals?: number;
  suffix?: string;
  note: string;
};

/* -------------------------------------------------------------------------- */
/*  Work                                                                      */
/* -------------------------------------------------------------------------- */
export type ProjectLayout = "app" | "media" | "grid" | "map" | "status";

export type Project = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  /** Long-form context. Shown in the showcase when this project is open. */
  detail?: string;
  tech: string[];
  /**
   * Which technology mark ghosts into the cover plate. Defaults to tech[0], but
   * set it explicitly so no two consecutive projects show the same glyph.
   */
  coverTech?: string;
  /**
   * The visual bands under a project, in order. Defaults to ["cover"], the
   * designed plate, which is what every project uses.
   *
   * "code" renders the per-file diff in components/ui/code-compare.tsx. No
   * project declares it right now. To put it back under one, set
   * visuals: ["cover", "code"] here.
   */
  visuals?: ("cover" | "code")[];
  /**
   * A real screenshot of the project. When set, it replaces the wireframe.
   * Drop the file in /public and point at it, e.g. "/work/vendore.png".
   *
   * This is the field to fill in as screenshots become available. Until then the
   * cover shows a wireframe of the layout the project uses, which is honest
   * about being a diagram rather than a picture of the running software.
   */
  image?: string;

  /**
   * Which layout archetype the wireframe draws when there is no screenshot yet.
   * Defaults to "app".
   */
  layout?: ProjectLayout;
  links: { demo?: string; github?: string };
  /** An empty slot for you to fill. Excluded from the shipped count. */
  placeholder?: boolean;
};

export const projects: Project[] = [
  {
    slug: "delivora",
    layout: "map",
    name: "Delivora",
    category: "Food delivery platform",
    image: "/delivora.png",
    summary:
      "A full-stack food delivery platform with real-time order tracking, live map integration, restaurant management, and a seamless checkout experience.",
    detail:
      "Delivora connects customers, restaurants, and drivers on one platform with real-time order tracking on a live map. Customers browse menus, place orders, and follow delivery progress live. Restaurants manage menus and incoming orders through a dedicated dashboard, while drivers receive assignments and update delivery status in real time. Built with Next.js, Node/Express, MongoDB, and Google Maps API.",
    tech: ["nextdotjs", "nodedotjs", "express", "mongodb", "googlemaps", "redux", "tailwindcss", "restapi"],
    coverTech: "googlemaps",
    links: { demo: "/", github: "https://github.com/Hassan-Ali362/Delivora" },
  },
  {
    slug: "vendore",
    layout: "grid",
    name: "Vendore",
    category: "Multi-vendor e-commerce platform",
    image: "/vendore.png",
    summary:
      "A full-featured multi-vendor marketplace where every seller manages their own storefront, catalog, and orders independently.",
    detail:
      "Vendore gives each seller a fully isolated dashboard to manage their catalog, pricing, inventory, and orders independently, while customers browse across all vendors and check out through a single unified flow. The platform handles authentication, role-based access control, and the complete order lifecycle from placement to fulfillment. Built on the MERN stack with Redux for state management, Dockerized for deployment.",
    tech: ["react", "nodedotjs", "express", "mongodb", "redux", "tailwindcss", "restapi", "docker"],
    coverTech: "react",
    links: { demo: "/", github: "https://github.com/Hassan-Ali362/Vendora" },
  },
  {
    slug: "zavienta",
    layout: "grid",
    name: "Zavienta",
    category: "Fashion e-commerce storefront",
    image: "/zavienta.png",
    summary:
      "A modern fashion e-commerce platform with a curated storefront, product discovery, cart management, and a smooth checkout experience.",
    detail:
      "Zavienta is a fashion retail platform with category browsing, size and color filtering, a persistent cart and wishlist, and a streamlined checkout flow covering address, payment, and confirmation. An admin panel handles product management, inventory tracking, and order fulfillment. Built with React and Tailwind on the frontend, Node/Express on the backend, and MongoDB for product and order storage.",
    tech: ["react", "nodedotjs", "express", "mongodb", "redux", "tailwindcss", "restapi"],
    coverTech: "react",
    links: { demo: "/", github: "https://github.com/Hassan-Ali362/ZAVO" },
  },
  {
    slug: "carvia",
    layout: "grid",
    name: "Carvia",
    category: "Automotive services platform",
    image: "/carvia.png",
    summary:
      "A car services platform where users browse available services, book appointments, track service status, and manage their vehicle records.",
    detail:
      "Carvia lets users register vehicles, browse service packages, and book appointments at available slots, then track job progress in real time as service providers update statuses. Providers manage their full booking schedule and communicate with customers through the platform. An admin dashboard handles service catalog management and reporting. Built with React, Tailwind, Node/Express, and MongoDB.",
    tech: ["react", "nodedotjs", "express", "mongodb", "tailwindcss", "redux", "restapi"],
    coverTech: "react",
    links: { demo: "/", github: "https://github.com/Hassan-Ali362/Carvia" },
  },
  {
    slug: "hbs-hospital",
    layout: "app",
    name: "HBS Hospital",
    category: "Hospital website and patient portal",
    image: "/hbs.png",
    summary:
      "A professional hospital website with department listings, doctor profiles, appointment booking, and a patient information portal.",
    detail:
      "The HBS Hospital platform is both a public hospital website and a patient portal. Visitors browse departments, read doctor profiles with specializations and availability, and book appointments directly through the site. Registered patients can log in to view their appointment history and upcoming bookings. Admin manages doctor schedules, slots, and department content. Built with Next.js, Node/Express, and MongoDB.",
    tech: ["nextdotjs", "nodedotjs", "express", "mongodb", "tailwindcss", "restapi"],
    coverTech: "nextdotjs",
    links: { demo: "/", github: "https://github.com/Hassan-Ali362/Medsuite" },
  },
  {
    slug: "vidmind",
    layout: "media",
    name: "VidMind",
    category: "AI video question answering",
    image: "/vidmind.png",
    summary:
      "Paste any YouTube URL and ask questions about the video. Answers are grounded in the actual transcript using RAG, not hallucinated summaries.",
    detail:
      "VidMind makes long-form video content instantly queryable. Submit a YouTube URL and the system fetches the transcript, chunks it into overlapping segments, embeds each chunk, and stores them in a vector index. When a question comes in, the most relevant segments are retrieved and passed to an LLM with a strict grounding prompt — so every answer cites what was actually said, not a hallucinated summary. Built with React, Node.js, and LangChain orchestrating the full RAG pipeline.",
    tech: ["react", "nodedotjs", "langchain", "rag", "openai", "postgresql", "tailwindcss"],
    coverTech: "langchain",
    links: { demo: "/", github: "https://github.com/Hassan-Ali362/VidPilot" },
  },
  {
    slug: "migratesense",
    layout: "app",
    name: "MigrateSense",
    category: "AI-powered code migration platform",
    image: "/Migratesense.png",
    summary:
      "An intelligent platform that automates codebase migrations across framework versions using static analysis, AST transformation, and AI agents.",
    detail:
      "MigrateSense automates framework migrations using AST analysis for deterministic rewrites and multi-agent AI workflows for cases a static rule cannot resolve. Every run is resumable, produces a per-file diff report, and includes human-in-the-loop checkpoints so engineers review AI decisions before they land. Built with Vue and Vuetify, Node/Express, BullMQ on Redis for job queuing, Postgres for run state, and Docker for deployment.",
    tech: ["vuedotjs", "vuetify", "nodedotjs", "express", "bullmq", "redis", "postgresql", "langchain", "agents", "ast", "docker"],
    coverTech: "vuedotjs",
    links: { demo: "/", github: "https://github.com/Hassan-Ali362/MigrateSense" },
  },
  {
    slug: "truthlens",
    layout: "app",
    name: "TruthLens",
    category: "AI fake news detection",
    image: "/truthlens.png",
    summary:
      "An AI-powered tool that analyzes news articles and social media content to detect misinformation and rate credibility with explainable results.",
    detail:
      "TruthLens runs news articles through a trained NLP classification pipeline that outputs a credibility score and highlights the specific phrases that drove the verdict — so users understand why content was flagged, not just that it was. The model combines scikit-learn feature extraction with a fine-tuned transformer layer for contextual understanding, trained on labeled datasets of real and fabricated news. Served via a FastAPI backend with a React frontend.",
    tech: ["react", "fastapi", "python", "scikitlearn", "ml", "tailwindcss", "restapi"],
    coverTech: "python",
    links: { demo: "/", github: "/" },
  },
];

const shippedCount = projects.filter((p) => !p.placeholder).length;

/* -------------------------------------------------------------------------- */
/*  Stack                                                                     */
/*  Only what you have actually shipped with. Nothing aspirational: an         */
/*  interviewer will ask about anything listed here.                           */
/* -------------------------------------------------------------------------- */
export type StackGroup = {
  title: string;
  blurb: string;
  /** Drives this panel's colour. Every item inside it wears the same hue. */
  domain: Domain;
  items: string[];
};

export const stack: StackGroup[] = [
  {
    title: "AI",
    domain: "ai",
    blurb:
      "Retrieval over long transcripts, and agents for the decisions a static rule cannot make.",
    items: ["llms", "rag", "ml", "dl", "genai", "langchain", "langgraph", "agents", "multiagent", "automations", "scikitlearn"],
  },
  {
    title: "Frontend",
    domain: "frontend",
    blurb: "Comfortable in both ecosystems, not just the one on my CV this year.",
    items: [
      "javascript",
      "typescript",
      "react",
      "nextdotjs",
      "vuedotjs",
      "vuetify",
      "pinia",
      "redux",
      "tailwindcss",
      "reactnative",
      "flutter",
    ],
  },
  {
    title: "Backend",
    domain: "backend",
    blurb: "REST APIs and the queue work that keeps long jobs from blocking a request.",
    items: ["nodedotjs", "express", "fastify", "fastapi", "python", "restapi", "ast"],
  },
  {
    title: "Data and infrastructure",
    domain: "data",
    blurb: "Relational where it matters, document where it does not, containers either way.",
    items: ["postgresql", "mysql", "mongodb", "redis", "bullmq", "docker", "git", "github", "githubactions", "aws", "linux", "firebase"],
  },
];

export const facts: Fact[] = [
  {
    label: "Years building",
    value: 2.5,
    decimals: 1,
    suffix: "+",
    note: "Full-stack first, then AI",
  },
  {
    label: "Projects shipped",
    value: 13,
    suffix: "+",
    note: "E-commerce, AI, delivery, healthcare, automotive",
  },
  {
    label: "Teams shipped with",
    value: 3,
    note: "Internships through junior engineer",
  },
];

/* -------------------------------------------------------------------------- */
/*  Contact                                                                   */
/* -------------------------------------------------------------------------- */
export const contact = {
  heading: "Building something that has to hold up?",
  intro:
    "I work across AI and full-stack engineering, and I read every message. Use the form, or email me directly.",
} as const;

/* -------------------------------------------------------------------------- */
/*  Experience, most recent first                                             */
/* -------------------------------------------------------------------------- */
export type Role = {
  company: string;
  role: string;
  logo?: string;
  logoBg?: string;
  /**
   * Format: "Jun to Aug 2026", or "Jun 2025 to Aug 2026" when the range crosses
   * a year. Kept short because the rail gives this column 9rem, and a longer
   * form wraps to two lines at 12px mono.
   */
  period: string;
  location?: string;
  current?: boolean;
  /**
   * Two or three things you actually did, concrete. These are your facts in my
   * words, so read them back before you ship: the shape is right, the phrasing
   * is mine.
   */
  achievements: string[];
};

export const experience: Role[] = [
  {
    company: "Veeam Software Company",
    role: "Software Engineering Intern",
    logo: "/veeam.png",
    period: "Jun to Aug 2026",
    location: "Islamabad",
    current: true,
    achievements: [
      "Developed a Migration Assistant product to automate and simplify code migrations across different versions and environments.",
      "Integrated static code analysis, dependency intelligence, automated code transformation, and AI-driven workflows to identify migration risks.",
      "Worked with Generative AI, Agentic AI, and Multi-Agent systems to automate complex migration tasks.",
      "Implemented human-in-the-loop workflows to improve the reliability, efficiency, and scalability of migration processes.",
    ],
  },
  {
    company: "ZySoftec",
    role: "Junior Full Stack Developer",
    logo: "/zysoftec.png",
    period: "Mar to Jun 2026",
    location: "Islamabad",
    achievements: [
      "Debugged and resolved defects across an existing production codebase.",
      "Developed and integrated new features into an established product while following existing architecture and coding conventions.",
      "Worked within an existing development workflow, maintaining and improving the product without disrupting established functionality.",
    ],
  },
  {
    company: "Texinity Technologies (SMC-PVT) LTD.",
    role: "Full Stack Intern",
    logo: "/texinity.png",
    logoBg: "bg-white border border-line-2",
    period: "Jul to Sep 2025",
    location: "Islamabad",
    achievements: [
      "Built full-stack features using the MERN stack, working across React, Express.js, Node.js, and MongoDB.",
      "Developed applications with Next.js and Node.js, gaining experience across multiple full-stack architectures.",
      "Worked on frontend, backend, API integration, database management, and overall application development.",
    ],
  },
];
