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
    "I build web products end to end, and I care most about the parts that only break under real use.",
  /* The one claim on this site about your intent rather than your history, so
     it is the one you should check before shipping. Set it to null and the
     hero drops the status chip entirely rather than leaving a stale promise up. */
  availability: "Open to AI and full-stack roles" as string | null,
  /**
   * What the hero plate leads with in place of a current job title. Disciplines
   * rather than named work, so the plate stays true whatever is in the Work
   * section, and so nothing here has to be rewritten when a project changes.
   */
  focus: "Full-stack, AI and DevOps",
  location: "Islamabad, Pakistan",
  email: "hassanalimalikk@gmail.com",
  resumeUrl: "/hassan-ali-resume.pdf",
  socials: {
    linkedin: "https://www.linkedin.com/in/hassanali-dev123/",
    // TODO: your GitHub profile URL.
    github: "https://github.com/",
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
  photo: null as string | null,

  /* TODO: rewrite these two paragraphs in your own voice. They are accurate
     to what you have told me, but they are my words, not yours, and this is
     the one section where that shows. */
  lead: "I started in full-stack product work and moved toward the AI side of it.",
  body: [
    "Most of what I build is ordinary web software with something harder underneath: a job that runs for an hour and has to survive a restart, a queue that cannot lose work, a model call that needs a fallback when it returns nothing useful.",
    "I care about the parts that only appear under real use. A migration tool is easy to demo on one file and hard to trust on a thousand, and the difference is entirely in the reporting, the retries, and knowing which cases a rule should not decide on its own.",
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
    slug: "migration-assistant",
    layout: "app",
    name: "Migration Assistant",
    category: "Codebase migration platform",
    summary:
      "Migrates a codebase from one framework to another: deterministic transformation where that is enough, AI agents where it is not.",
    detail:
      "The hard part of a migration is not the syntax rewrite. It is everything around it: a run that takes hours, has to be resumable, and has to report exactly what it changed and why. The frontend is Vue with Vuetify and Vue Router. The API is Node and Express. Transformation jobs go through BullMQ on Redis so a run survives a restart instead of starting over, and Postgres holds run state and the per-file diff. Deterministic transformation tooling handles the mechanical rewrites, and AI agents take the cases where a static rule cannot decide on its own. Packaged and deployed with Docker.",
    tech: [
      "vuedotjs",
      "vuetify",
      "nodedotjs",
      "express",
      "bullmq",
      "redis",
      "postgresql",
      "agents",
      "docker",
    ],
    coverTech: "vuedotjs",
    links: { demo: "#", github: "#" },
  },
  {
    slug: "vidmind",
    layout: "media",
    name: "VidMind",
    category: "Video question answering",
    summary:
      "Paste a YouTube URL and ask questions about it. The transcript is chunked and embedded, so answers come from what was actually said.",
    tech: ["react", "langchain", "nodedotjs", "rag"],
    coverTech: "langchain",
    links: { demo: "#", github: "#" },
  },
  {
    slug: "vendore",
    layout: "grid",
    name: "Vendore",
    category: "Multi-vendor marketplace",
    summary:
      "An ecommerce platform where every seller runs their own catalog, orders, and storefront rather than sharing one admin.",
    tech: ["react", "nodedotjs", "express", "mongodb", "docker"],
    coverTech: "mongodb",
    links: { demo: "#", github: "#" },
  },
  {
    slug: "delivora",
    layout: "map",
    name: "Delivora",
    category: "Food delivery platform",
    summary:
      "Ordering and delivery with live map tracking, built on Next.js with a Node service behind it.",
    tech: ["nextdotjs", "nodedotjs", "express", "googlemaps"],
    coverTech: "googlemaps",
    links: { demo: "#", github: "#" },
  },

  /* ========================================================================= */
  /*  INVENTED. The three entries below were written to fill the page and are  */
  /*  not work you have done. The four above are yours.                        */
  /*                                                                          */
  /*  Each one is deliberately scoped to the stack you already use and to      */
  /*  something you could actually build in a few weekends, so the fastest     */
  /*  way to make this page honest is to build one and keep the entry.         */
  /*  Otherwise delete them. Be ready to answer follow-up questions on         */
  /*  anything left here, because an interviewer will ask.                     */
  /* ========================================================================= */
  {
    slug: "loadout",
    layout: "status",
    name: "Loadout",
    category: "Self-hosted deploy pipeline",
    summary:
      "Push to a branch and it builds the image, runs migrations, swaps the container, and streams the logs back while it happens.",
    tech: ["vuedotjs", "nodedotjs", "express", "bullmq", "redis", "docker"],
    coverTech: "docker",
    links: { demo: "#", github: "#" },
  },
  {
    slug: "docket",
    layout: "app",
    name: "Docket",
    category: "Document extraction",
    summary:
      "Point it at a folder of contracts and get structured fields out, plus a cited answer for anything you ask about them.",
    tech: ["nextdotjs", "langchain", "postgresql", "rag"],
    coverTech: "postgresql",
    links: { demo: "#", github: "#" },
  },
  {
    slug: "kiln",
    layout: "status",
    name: "Kiln",
    category: "Uptime monitoring",
    summary:
      "Scheduled probes against your endpoints, an incident timeline when one fails, and a public status page you can hand to users.",
    tech: ["react", "nodedotjs", "express", "postgresql", "redis"],
    coverTech: "redis",
    links: { demo: "#", github: "#" },
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
    items: ["llms", "rag", "openai", "langchain", "langgraph", "agents", "automations"],
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
      "redux",
      "tailwindcss",
      "sass",
    ],
  },
  {
    title: "Backend",
    domain: "backend",
    blurb: "REST APIs and the queue work that keeps long jobs from blocking a request.",
    items: ["nodedotjs", "express", "fastify", "fastapi", "restapi", "go"],
  },
  {
    title: "Data and infrastructure",
    domain: "data",
    blurb: "Relational where it matters, document where it does not, containers either way.",
    items: ["postgresql", "mongodb", "redis", "bullmq", "docker", "devops"],
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
    value: shippedCount,
    note: "Migration, RAG, commerce, delivery, infra",
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
    company: "Securiti AI (A Veeam Software Company)",
    role: "Software Engineering Intern",
    period: "Jun to Aug 2026",
    location: "Islamabad",
    current: true,
    achievements: [
      "Worked on a migration platform that takes a codebase from an older framework version to a current one.",
      "The work was the transformation itself: reading the old shape, producing the new one, and reporting what changed.",
    ],
  },
  {
    company: "ZySoftec",
    role: "Junior Full Stack Developer",
    period: "Mar to Jun 2026",
    location: "Islamabad",
    achievements: [
      "Debugged and fixed defects across an existing codebase rather than starting anything from scratch.",
      "Added features to a product already in use, working inside conventions that were set before I arrived.",
    ],
  },
  {
    company: "Texinity Technologies (SMC-PVT) LTD.",
    role: "Full Stack Intern",
    period: "Jul to Sep 2025",
    location: "Islamabad",
    achievements: [
      "Built full-stack features on MERN projects: React on the front, Express and MongoDB behind it.",
      "Also worked in Next.js with a Node service, so the internship covered two stacks rather than one.",
    ],
  },
];
