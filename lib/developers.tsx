import type { ReactNode } from "react";

export type DeveloperBenefit = {
  icon: string;
  title: string;
  description: string;
};

export type DeveloperReview = {
  id: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type DeveloperEntry = {
  slug: string;
  name: string;
  role: string;
  shortDescription: string;
  heroDescription: string;
  taglinePrimary: string;
  taglineSecondary: string;
  avatar: ReactNode;
  benefits: DeveloperBenefit[];
  agentSlugs: string[];
  reviews: DeveloperReview[];
};

export const featuredDevelopers: DeveloperEntry[] = [
  {
    slug: "john-doe",
    name: "John Doe",
    role: "Co-founder/CTO, HubSpot",
    shortDescription:
      "Escala productos, equipos y sistemas con una mirada fuerte en crecimiento, producto y operaciones.",
    heroDescription:
      "Construye sistemas para startups y scaleups que necesitan lanzar, medir y mejorar con velocidad sin perder claridad operativa.",
    taglinePrimary: "Especialista en growth y producto",
    taglineSecondary: "20 agentes publicados",
    avatar: (
      <div className="relative flex h-full w-full items-center justify-center rounded-full bg-[linear-gradient(180deg,#d9d7d3_0%,#b9c7d0_48%,#617f94_100%)]">
        <span className="text-3xl font-semibold text-white">JD</span>
      </div>
    ),
    benefits: [
      {
        icon: "◉",
        title: "Arquitectura para crecer.",
        description:
          "Define sistemas y procesos listos para escalar sin rehacer el producto cada trimestre.",
      },
      {
        icon: "↗",
        title: "Growth con criterio.",
        description:
          "Cruza producto, datos y ejecucion para priorizar iniciativas con impacto real.",
      },
      {
        icon: "□",
        title: "Mejor operacion.",
        description:
          "Aterriza flujos, ownership y ritmo de entrega para equipos mas consistentes.",
      },
    ],
    agentSlugs: ["lead-generation", "marketing-content", "research"],
    reviews: [
      {
        id: "john-review-1",
        author: "Erick Dane",
        rating: 5,
        comment: "Muy util y facil de usar.",
        createdAt: "2026-03-12",
      },
      {
        id: "john-review-2",
        author: "Jessica Parr",
        rating: 5,
        comment: "De las mejores herramientas para investigacion.",
        createdAt: "2026-03-20",
      },
      {
        id: "john-review-3",
        author: "Craig Leigh",
        rating: 5,
        comment:
          "Utilizo frecuente el agente de investigacion de industrias. Me gustaria sugerir mejoras con respecto al alcance del modelo...",
        createdAt: "2026-04-01",
      },
    ],
  },
  {
    slug: "jane-doe",
    name: "Jane Doe",
    role: "Web Developer",
    shortDescription:
      "Convierte ideas complejas en productos claros, interfaces limpias y experiencias listas para produccion.",
    heroDescription:
      "Trabaja entre producto, frontend y contenido para transformar una idea en una experiencia digital que se entienda y se use mejor.",
    taglinePrimary: "Especialista en producto web",
    taglineSecondary: "20 agentes publicados",
    avatar: (
      <div className="relative flex h-full w-full items-center justify-center rounded-full bg-[linear-gradient(180deg,#827de2_0%,#8ab4ff_45%,#2d315d_100%)]">
        <span className="text-3xl font-semibold text-white">JD</span>
      </div>
    ),
    benefits: [
      {
        icon: "✎",
        title: "Interfaces mas claras.",
        description:
          "Ordena la experiencia para que el producto comunique mejor y se sienta mas usable.",
      },
      {
        icon: "◎",
        title: "Entrega mas rapida.",
        description:
          "Reduce friccion entre diseno y frontend con una implementacion mas consistente.",
      },
      {
        icon: "▣",
        title: "Mas coherencia visual.",
        description:
          "Cuida detalle, estructura y ritmo para que todo el sistema se sienta alineado.",
      },
    ],
    agentSlugs: ["lead-generation", "marketing-content", "research"],
    reviews: [
      {
        id: "jane-review-1",
        author: "Erick Dane",
        rating: 5,
        comment: "Muy util y facil de usar.",
        createdAt: "2026-03-12",
      },
      {
        id: "jane-review-2",
        author: "Jessica Parr",
        rating: 5,
        comment: "De las mejores herramientas para investigacion.",
        createdAt: "2026-03-20",
      },
      {
        id: "jane-review-3",
        author: "Craig Leigh",
        rating: 5,
        comment:
          "Utilizo frecuente el agente de investigacion de industrias. Me gustaria sugerir mejoras con respecto al alcance del modelo...",
        createdAt: "2026-04-01",
      },
    ],
  },
  {
    slug: "jake-doe",
    name: "Jake Doe",
    role: "AI Specialist",
    shortDescription:
      "Disena agentes, automatizaciones y sistemas de IA con foco en utilidad, precision y ejecucion.",
    heroDescription:
      "Aterriza modelos, prompts y flujos de trabajo en soluciones que ayudan a operar mejor y decidir con mas velocidad.",
    taglinePrimary: "Especialista en IA aplicada",
    taglineSecondary: "1 agente publicado",
    avatar: (
      <div className="relative flex h-full w-full items-center justify-center rounded-full bg-[linear-gradient(180deg,#d8e5f1_0%,#9ab7cb_48%,#607489_100%)]">
        <span className="text-3xl font-semibold text-white">JD</span>
      </div>
    ),
    benefits: [
      {
        icon: "◇",
        title: "Implementacion mas practica.",
        description:
          "Baja ideas de IA a workflows mas utiles para negocio, soporte y operaciones.",
      },
      {
        icon: "↺",
        title: "Mejor iteracion.",
        description:
          "Ajusta prompts, contexto y salida para mejorar resultados sin complicar el flujo.",
      },
      {
        icon: "▢",
        title: "Menos friccion manual.",
        description:
          "Encuentra tareas repetitivas que se pueden automatizar con mejor criterio.",
      },
    ],
    agentSlugs: ["research", "lead-generation"],
    reviews: [
      {
        id: "jake-review-1",
        author: "Maria Klein",
        rating: 5,
        comment: "La calidad del analisis es fuerte y se siente muy practica.",
        createdAt: "2026-03-15",
      },
      {
        id: "jake-review-2",
        author: "Oscar Dean",
        rating: 4,
        comment: "Buen punto de partida para automatizacion y flujos internos.",
        createdAt: "2026-03-28",
      },
      {
        id: "jake-review-3",
        author: "Lina Hart",
        rating: 5,
        comment: "Me ayudo a estructurar mejores prompts y pasos de ejecucion.",
        createdAt: "2026-04-05",
      },
    ],
  },
];

export function getDeveloperBySlug(slug: string) {
  return featuredDevelopers.find((developer) => developer.slug === slug);
}
