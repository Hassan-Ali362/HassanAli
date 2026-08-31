import {
  Brain,
  FileMagnifyingGlass,
  FlowArrow,
  Infinity as InfinityGlyph,
  OpenAiLogo,
  PlugsConnected,
  Queue,
  Robot,
  Cloud,
  Tree,
  ArrowsLeftRight,
  ChartLineUp,
  Cpu,
  Sparkle,
  Graph,
} from "@phosphor-icons/react/dist/ssr";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiVuetify,
  SiRedux,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiFastify,
  SiFastapi,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiLangchain,
  SiLanggraph,
  SiGooglemaps,
  SiPython,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiLinux,
  SiPinia,
  SiMysql,
  SiScikitlearn,
  SiFlutter,
  SiFirebase,
} from "react-icons/si";

type GlyphComponent = React.ComponentType<{ className?: string; size?: number }>;

type PhosphorGlyph = React.ComponentType<{
  className?: string;
  size?: number;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
}>;

/**
 * Wraps a Phosphor icon at bold weight so it carries the same visual weight as
 * the solid brand marks it sits beside. Left at the default regular weight these
 * read as thin outlines next to a filled logo, and the grid looks like two
 * different icon sets.
 *
 * Each wrapper is created once at module scope, never inside a render, so React
 * sees a stable component type and does not remount the icon.
 */
function concept(Icon: PhosphorGlyph, name: string): GlyphComponent {
  function ConceptGlyph({ className, size }: { className?: string; size?: number }) {
    return <Icon className={className} size={size} weight="bold" />;
  }
  ConceptGlyph.displayName = `Concept(${name})`;
  return ConceptGlyph;
}

/**
 * Marks keyed by the slug used in lib/data.ts. Every slug has one, in two kinds.
 *
 * Brand logos come from Simple Icons, except OpenAI, which Simple Icons does not
 * carry on trademark grounds and which uses the Phosphor mark instead.
 *
 * The rest are concepts with no logo in existence: LLMs, RAG, agents,
 * automations, REST APIs, DevOps, and BullMQ, which is a real project that
 * Simple Icons does not carry. Each takes a Phosphor glyph through concept()
 * rather than a drawn-by-hand SVG.
 */
export const brandGlyph: Record<string, GlyphComponent> = {
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: SiReact,
  nextdotjs: SiNextdotjs,
  vuedotjs: SiVuedotjs,
  vuetify: SiVuetify,
  redux: SiRedux,
  tailwindcss: SiTailwindcss,
  pinia: SiPinia,
  nodedotjs: SiNodedotjs,
  express: SiExpress,
  fastify: SiFastify,
  fastapi: SiFastapi,
  python: SiPython,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  mysql: SiMysql,
  redis: SiRedis,
  docker: SiDocker,
  git: SiGit,
  github: SiGithub,
  githubactions: SiGithubactions,
  linux: SiLinux,
  langchain: SiLangchain,
  langgraph: SiLanggraph,
  googlemaps: SiGooglemaps,
  scikitlearn: SiScikitlearn,
  flutter: SiFlutter,
  firebase: SiFirebase,
  reactnative: SiReact, // uses React icon
  openai: OpenAiLogo as unknown as GlyphComponent,

  /* Concepts — no brand logo available */
  llms: concept(Brain, "Brain"),
  rag: concept(FileMagnifyingGlass, "FileMagnifyingGlass"),
  agents: concept(Robot, "Robot"),
  automations: concept(FlowArrow, "FlowArrow"),
  restapi: concept(PlugsConnected, "PlugsConnected"),
  bullmq: concept(Queue, "Queue"),
  devops: concept(InfinityGlyph, "Infinity"),
  aws: concept(Cloud, "Cloud"),
  ast: concept(Tree, "Tree"),
  ml: concept(ChartLineUp, "ChartLineUp"),
  dl: concept(Cpu, "Cpu"),
  genai: concept(Sparkle, "Sparkle"),
  multiagent: concept(Graph, "Graph"),
};

/* -------------------------------------------------------------------------- */
/*  Domains                                                                   */
/* -------------------------------------------------------------------------- */
/**
 * Which area of the stack each technology belongs to. This is what drives colour
 * across the site: a mark wears its domain's hue everywhere it appears, so the
 * same tool is never two different colours and two tools sharing a colour are
 * always doing the same kind of job.
 *
 * A slug missing from this map falls back to neutral rather than to an arbitrary
 * hue, so an unmapped addition looks unfinished instead of looking wrong.
 */
export type Domain = "frontend" | "backend" | "data" | "ai";

export const brandDomain: Record<string, Domain> = {
  javascript: "frontend",
  typescript: "frontend",
  react: "frontend",
  nextdotjs: "frontend",
  vuedotjs: "frontend",
  vuetify: "frontend",
  redux: "frontend",
  tailwindcss: "frontend",
  pinia: "frontend",

  nodedotjs: "backend",
  express: "backend",
  fastify: "backend",
  fastapi: "backend",
  restapi: "backend",
  python: "backend",
  googlemaps: "backend",
  ast: "backend",

  postgresql: "data",
  mongodb: "data",
  mysql: "data",
  redis: "data",
  bullmq: "data",
  docker: "data",
  devops: "data",
  git: "data",
  github: "data",
  githubactions: "data",
  aws: "data",
  linux: "data",

  llms: "ai",
  langchain: "ai",
  langgraph: "ai",
  openai: "ai",
  rag: "ai",
  agents: "ai",
  automations: "ai",
  scikitlearn: "ai",
  ml: "ai",
  dl: "ai",
  genai: "ai",
  multiagent: "ai",
  flutter: "frontend",
  reactnative: "frontend",
  firebase: "data",
};

/**
 * Tailwind cannot generate a class it never sees written out, so the domain
 * classes are literals here rather than built from the domain name.
 */
export const domainText: Record<Domain, string> = {
  frontend: "text-domain-frontend",
  backend: "text-domain-backend",
  data: "text-domain-data",
  ai: "text-domain-ai",
};

/** The corner wash on a stack panel, tinted to that panel's domain. */
export const domainWash: Record<Domain, string> = {
  frontend: "from-domain-frontend/[0.10]",
  backend: "from-domain-backend/[0.10]",
  data: "from-domain-data/[0.10]",
  ai: "from-domain-ai/[0.10]",
};

export const brandLabel: Record<string, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  react: "React",
  nextdotjs: "Next.js",
  vuedotjs: "Vue",
  vuetify: "Vuetify",
  redux: "Redux",
  tailwindcss: "Tailwind",
  pinia: "Pinia",
  nodedotjs: "Node.js",
  express: "Express",
  fastify: "Fastify",
  fastapi: "FastAPI",
  restapi: "REST APIs",
  python: "Python",
  postgresql: "Postgres",
  mongodb: "MongoDB",
  mysql: "SQL",
  redis: "Redis",
  bullmq: "BullMQ",
  docker: "Docker",
  devops: "CI/CD",
  git: "Git",
  github: "GitHub",
  githubactions: "GitHub Actions",
  aws: "AWS",
  linux: "Linux",
  llms: "LLMs",
  langchain: "LangChain",
  langgraph: "LangGraph",
  openai: "OpenAI",
  googlemaps: "Maps",
  rag: "RAG",
  agents: "AI Agents",
  automations: "Automations",
  ast: "AST / Static Analysis",
  scikitlearn: "Scikit-Learn",
  ml: "Machine Learning",
  dl: "Deep Learning",
  genai: "Generative AI",
  multiagent: "Multi-Agent Systems",
  flutter: "Flutter",
  reactnative: "React Native",
  firebase: "Firebase",
};
