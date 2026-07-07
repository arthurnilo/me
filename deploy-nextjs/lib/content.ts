export type Lang = "pt" | "en";

export const COPY = {
  pt: {
    navProjects: "Projetos",
    navAbout: "Sobre",
    navJourney: "Trajetória",
    navContact: "Contato",
    introTag1: "desenvolvedor com",
    introTagEm: "olhar de designer",
    scrollHint: "role para descobrir",
    heroBadge: "disponível para novos projetos — 2026",
    hero1: "Design que",
    heroEm1: "encanta.",
    hero2: "Código que",
    heroEm2: "dura.",
    heroSub:
      "Sou Arthur Nilo, desenvolvedor full-stack. Crio experiências digitais claras e bonitas — com arquitetura sólida e segurança pensada desde o início.",
    film1H: "desenho",
    film1P:
      "Interfaces limpas, tipografia intencional e detalhes que fazem toda a diferença.",
    film2H: "construo",
    film2P:
      "React, Next.js e TypeScript — arquitetura sólida do banco de dados ao pixel.",
    film3H: "protejo",
    film3P:
      "Segurança desde o primeiro commit — não como remendo depois do lançamento.",
    projectsH1: "Trabalhos",
    projectsH2: "selecionados",
    projectsSub:
      "Projetos reais, entregues em produção — de plataformas web a sistemas de IA.",
    visitLive: "ver ao vivo",
    shotPlaceholder: "screenshot do projeto",
    photoBadge: "👋 Prazer, Arthur",
    aboutH1: "Entre o design e a",
    aboutHEm: "engenharia",
    aboutP1:
      "Há mais de 3 anos crio produtos digitais de ponta a ponta: entendo o problema, desenho a experiência, escrevo o código e coloco no ar funcionando.",
    aboutP2:
      "Minha base em infraestrutura e segurança da informação me faz enxergar além da tela — sei onde o código roda, e como protegê-lo. É essa combinação que dá aos meus projetos acabamento por fora e solidez por dentro.",
    journeyH: "Uma trajetória em",
    journeyHEm: "construção",
    eduH: "Formação",
    certsH: "Certificações",
    eduNote: "Cursando as duas em paralelo — engenharia de software + segurança.",
    contactH1: "Vamos criar algo",
    contactHEm: "juntos?",
    contactSub:
      "Aberto a projetos, colaborações e boas conversas sobre design e tecnologia.",
    footerNote: "desenhado e desenvolvido por mim",
  },
  en: {
    navProjects: "Projects",
    navAbout: "About",
    navJourney: "Journey",
    navContact: "Contact",
    introTag1: "developer with a",
    introTagEm: "designer's eye",
    scrollHint: "scroll to discover",
    heroBadge: "available for new projects — 2026",
    hero1: "Design that",
    heroEm1: "delights.",
    hero2: "Code that",
    heroEm2: "lasts.",
    heroSub:
      "I'm Arthur Nilo, a full-stack developer. I craft clear, beautiful digital experiences — with solid architecture and security baked in from the start.",
    film1H: "design",
    film1P:
      "Clean interfaces, intentional typography and details that make all the difference.",
    film2H: "build",
    film2P:
      "React, Next.js and TypeScript — solid architecture from database to pixel.",
    film3H: "secure",
    film3P: "Security from the very first commit — not as a patch after launch.",
    projectsH1: "Selected",
    projectsH2: "work",
    projectsSub:
      "Real projects, shipped to production — from web platforms to AI systems.",
    visitLive: "view live",
    shotPlaceholder: "project screenshot",
    photoBadge: "👋 Hi, I'm Arthur",
    aboutH1: "Between design and",
    aboutHEm: "engineering",
    aboutP1:
      "For 3+ years I've built digital products end to end: I understand the problem, design the experience, write the code and ship it working.",
    aboutP2:
      "My background in infrastructure and information security lets me see beyond the screen — I know where code runs and how to protect it. That mix gives my projects polish on the outside and solidity on the inside.",
    journeyH: "A journey under",
    journeyHEm: "construction",
    eduH: "Education",
    certsH: "Certifications",
    eduNote: "Pursuing both in parallel — software engineering + security.",
    contactH1: "Let's create something",
    contactHEm: "together?",
    contactSub:
      "Open to projects, collaborations and good conversations about design and technology.",
    footerNote: "designed & built by me",
  },
} as const;

export interface Project {
  slug: string;
  tag: { pt: string; en: string };
  title: { pt: string; en: string };
  desc: { pt: string; en: string };
  stack: string[];
  link?: string;
}

/**
 * Screenshots: coloque uma imagem em /public/projects/<slug>.png
 * (ex.: public/projects/proj-ai-ext.png). Enquanto não existir,
 * o site mostra um placeholder elegante.
 */
export const PROJECTS: Project[] = [
  {
    slug: "proj-ai-ext",
    tag: { pt: "Segurança + IA", en: "Security + AI" },
    title: { pt: "Extensão de Segurança para IA", en: "AI Security Extension" },
    desc: {
      pt: "Extensão de navegador que detecta dados sensíveis em prompts antes de chegarem a modelos de IA generativa.",
      en: "Browser extension that detects sensitive data in prompts before they reach generative AI models.",
    },
    stack: ["TypeScript", "Extension API"],
  },
  {
    slug: "proj-phishing",
    tag: { pt: "Plataforma", en: "Platform" },
    title: { pt: "Simulador de Phishing", en: "Phishing Simulator" },
    desc: {
      pt: "Treinamento corporativo que simula ataques e revela padrões de risco em mapas de calor interativos.",
      en: "Corporate training that simulates attacks and reveals risk patterns through interactive heatmaps.",
    },
    stack: ["React", "Node.js", "PostgreSQL"],
  },
  {
    slug: "proj-pricing",
    tag: { pt: "Full-stack", en: "Full-stack" },
    title: { pt: "Precificador de Receita", en: "Recipe Pricer" },
    desc: {
      pt: "Sistema de controle e precificação de receitas, com exportação de orçamento e controle de ingredientes.",
      en: "Recipe control and pricing system, featuring budget export and ingredient tracking.",
    },
    stack: ["React", "Node.js", "SQL"],
  },
  {
    slug: "proj-fin",
    tag: { pt: "Full-stack", en: "Full-stack" },
    title: { pt: "Sistema Financeiro", en: "Finance System" },
    desc: {
      pt: "Gestão financeira completa — fluxo de caixa, relatórios e dashboard — entregue para uma empresa real.",
      en: "Complete financial management — cash flow, reports and dashboard — delivered to a real company.",
    },
    stack: ["React", "Supabase", "JWT"],
  },
  {
    slug: "proj-estoque",
    tag: { pt: "Full-stack", en: "Full-stack" },
    title: { pt: "Gestão de Estoque", en: "Inventory System" },
    desc: {
      pt: "Controle de estoque com relatórios gerenciais e perfis de acesso. Arquitetura modular, React & TypeScript.",
      en: "Inventory control with management reports and access roles. Modular architecture, React & TypeScript.",
    },
    stack: ["TypeScript", "TanStack Query"],
  },
  {
    slug: "proj-brunno",
    tag: { pt: "Em produção", en: "Live" },
    title: { pt: "brunnotosenutricionista", en: "brunnotosenutricionista" },
    desc: {
      pt: "Plataforma para nutricionista — apresentação de serviços, interface responsiva, no ar.",
      en: "Platform for a personal trainer — service showcase, responsive interface, live in production.",
    },
    stack: ["Next.js", "Tailwind", "Vercel"],
    link: "https://brunnotosenutricionista.com.br",
  },
  {
  slug: "proj-saude",
  tag: { pt: "Em desenvolvimento...", en: "Developing..." },
  title: { pt: "HealthCare", en: "HealthCare" },
  desc: {
    pt: "Plataforma para profissionais da saúde — acompanhamento, anamneses, comparação de evolução e muito mais.",
    en: "Platform for healthcare professionals — monitoring, patient histories, progress comparison, and much more.",
  },
  stack: ["Next.js", "Tailwind", "Vercel"],
  },
  {
  slug: "proj-cheeros",
  tag: { pt: "Em desenvolvimento...", en: "Developing..." },
  title: { pt: "Gestão de Ginásio de Cheer", en: "Cheerleading Gym Management" },
  desc: {
    pt: "Plataforma para Donos e treinadores de Cheerleading — gestão de atletas, financeiro, rotinas e etc.",
    en: "Platform for cheerleading gym owners and coaches — athlete management, finances, routines, etc..",
  },
  stack: ["React", "TypeScript", "Node.js"],
  },  
];

export const EDU = [
  {
    period: "2024 — 2027",
    title: { pt: "Sistemas de Informação", en: "Information Systems" },
    org: {
      pt: "Bacharelado · Universidade Vila Velha (UVV)",
      en: "Bachelor's · Universidade Vila Velha (UVV)",
    },
  },
  {
    period: "2024 — 2027",
    title: { pt: "Defesa Cibernética", en: "Cyber Defense" },
    org: { pt: "Tecnólogo · Estácio", en: "Associate · Estácio" },
  },
];

export const CERTS = [
  { name: "SOC Member", org: "LetsDefend", date: { pt: "Mai 2026", en: "May 2026" } },
  { name: "Phishing Prevention Specialist", org: "Hack & Fix", date: { pt: "Dez 2025", en: "Dec 2025" } },
  { name: "Know the OS in Ethical Hacking", org: "HackerX", date: { pt: "Nov 2025", en: "Nov 2025" } },
  { name: "AWS Security Fundamentals", org: "AWS", date: { pt: "Set 2025", en: "Sep 2025" } },
  { name: "CS50x", org: "Harvard · edX", date: { pt: "Dez 2024", en: "Dec 2024" } },
  { name: "Database Foundations", org: "Oracle", date: { pt: "Nov 2024", en: "Nov 2024" } },
];

export const PILLARS = {
  pt: ["Full-stack", "UI & Experiência", "Infraestrutura", "Segurança"],
  en: ["Full-stack", "UI & Experience", "Infrastructure", "Security"],
};

/** Troque pelos seus links reais */
export const LINKS = {
  email: "arthurdetassis@gmail.com",
  github: "https://github.com/arthurnilo",
  linkedin: "https://linkedin.com/in/arthurnilo",
};

/** Copy da página /links (link-in-bio) */
export const LINKHUB = {
  pt: {
    backToSite: "voltar ao site",
    featuredLabel: "portfólio — 2026",
    featuredH1: "todo o meu",
    featuredHEm: "trabalho",
    featuredSub:
      "Projetos em produção, trajetória e o que eu faço de melhor — em um só lugar.",
    featuredCta: "explorar o site",
    sectionLabel: "conexões",
    githubDesc: "código, experimentos & projetos abertos",
    linkedinDesc: "trajetória profissional & rede",
    emailDesc: "para propostas e boas conversas",
    copy: "copiar",
    copied: "copiado ✓",
    localLabel: "Vila Velha — Brasil",
  },
  en: {
    backToSite: "back to site",
    featuredLabel: "portfolio — 2026",
    featuredH1: "all of my",
    featuredHEm: "work",
    featuredSub:
      "Production projects, my journey and what I do best — all in one place.",
    featuredCta: "explore the site",
    sectionLabel: "connections",
    githubDesc: "code, experiments & open projects",
    linkedinDesc: "professional journey & network",
    emailDesc: "for proposals and good conversations",
    copy: "copy",
    copied: "copied ✓",
    localLabel: "Vila Velha — Brazil",
  },
} as const;
