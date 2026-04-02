import type { ReactNode } from "react";

export type AgentBenefit = {
  icon: string;
  title: string;
  description: string;
};

export type AgentEntry = {
  slug: string;
  title: string;
  shortDescription: string;
  heroDescription: string;
  priceLabel: string;
  conversationsLabel: string;
  icon: ReactNode;
  benefits: AgentBenefit[];
};

export const featuredAgents: AgentEntry[] = [
  {
    slug: "investigador-industria",
    title: "Investigador de Industria",
    shortDescription:
      "Nuevo cliente, nuevo mercado, nuevo lanzamiento? Obtenga una vision informativa completa sobre el mercado en menos de 2 minutos.",
    heroDescription:
      "Investiga tu industria a nivel local e internacional en un informe claro y estructurado para que puedas participar en cualquier conversacion completamente informado.",
    priceLabel: "Suscripcion por $10/mes",
    conversationsLabel: "3 conversaciones diarias",
    icon: (
      <div className="relative h-10 w-10">
        <div className="absolute left-0 top-1 h-8 w-4 bg-[linear-gradient(180deg,#3bc7dd,#173580)]" />
        <div className="absolute left-4 top-3 h-5 w-5 border border-white/60 bg-transparent" />
        <div className="absolute left-1 top-5 h-2 w-8 bg-[linear-gradient(90deg,#072b30,#6ee0bf)]" />
      </div>
    ),
    benefits: [
      {
        icon: "ϟ",
        title: "Un informe completo del mercado en menos de 2 minutos.",
        description:
          "Investiga tu industria a nivel local e internacional en un informe claro y estructurado para que puedas participar en cualquier conversacion completamente informado.",
      },
      {
        icon: "◌",
        title: "Datos siempre actualizados, nunca obsoletos.",
        description:
          "Cada informe se genera a partir de fuentes actuales en el momento de su ejecucion. No recibis un resumen desactualizado ni repetido, sino un relevamiento en sintonia con la industria.",
      },
      {
        icon: "⬡",
        title: "Personalizado para tu negocio.",
        description:
          "Anade los datos de tu negocio una sola vez y cada informe incluira un seccion de implicaciones para tu negocio que relaciona los resultados del mercado con tus canales especificos: tu producto, tu cliente, tus competidores.",
      },
    ],
  },
  {
    slug: "content-creation",
    title: "Content Creation",
    shortDescription:
      "Crea campanas publicitarias listas para ser lanzadas que intentan tu marca a la perfeccion.",
    heroDescription:
      "Genera conceptos, copys y variaciones visuales para tus campanas en cuestion de minutos con una voz alineada a tu marca.",
    priceLabel: "Suscripcion por $12/mes",
    conversationsLabel: "5 conversaciones diarias",
    icon: (
      <div className="relative h-10 w-10">
        <div className="absolute inset-x-1 top-1 h-4 rotate-[1deg] bg-[linear-gradient(180deg,#f3dd8c,#689a84)] [clip-path:polygon(50%_0%,100%_52%,50%_100%,0%_52%)]" />
        <div className="absolute inset-x-1 top-4 h-4 bg-[linear-gradient(180deg,#24494b,#7dd5b2)] [clip-path:polygon(50%_0%,100%_52%,50%_100%,0%_52%)] opacity-90" />
        <div className="absolute inset-x-2 top-7 h-2 border border-white/50 [clip-path:polygon(50%_0%,100%_52%,50%_100%,0%_52%)]" />
      </div>
    ),
    benefits: [
      {
        icon: "✎",
        title: "Campanas listas para activar.",
        description:
          "Recibe una estructura completa de campana con concepto, titulares, copies y llamadas a la accion listas para probar.",
      },
      {
        icon: "◎",
        title: "Coherencia total con la marca.",
        description:
          "El agente aprende tu tono, posicionamiento y referencias para proponer piezas consistentes en todos los canales.",
      },
      {
        icon: "▣",
        title: "Iteracion rapida para tu equipo.",
        description:
          "Pide variaciones, adapta mensajes por audiencia y genera nuevas versiones sin reiniciar el briefing cada vez.",
      },
    ],
  },
  {
    slug: "investigador-tendencias",
    title: "Investigador de Tendencias",
    shortDescription:
      "Que tendencias dominan la industria esta semana? Obten los resultados semanales gracias a analisis exhaustivos sin un solo clic.",
    heroDescription:
      "Detecta senales, movimientos de categoria y nuevos comportamientos antes de que se vuelvan obvios para el resto del mercado.",
    priceLabel: "Suscripcion por $14/mes",
    conversationsLabel: "4 conversaciones diarias",
    icon: (
      <div className="relative h-10 w-10">
        <div className="absolute left-2 top-0 h-6 w-6 rotate-45 border border-white/80" />
        <div className="absolute bottom-1 left-0 h-4 w-5 bg-[#f04e37]" />
        <div className="absolute bottom-1 right-0 h-4 w-5 bg-[linear-gradient(90deg,#0f6d63,#1fd7bd)]" />
      </div>
    ),
    benefits: [
      {
        icon: "↗",
        title: "Senales tempranas en tu categoria.",
        description:
          "Analiza conversaciones, cambios de oferta y patrones de consumo para detectar oportunidades antes que tu competencia.",
      },
      {
        icon: "◍",
        title: "Panorama semanal resumido.",
        description:
          "Recibe hallazgos accionables con foco en lo que realmente cambia la toma de decisiones, sin ruido innecesario.",
      },
      {
        icon: "▢",
        title: "Recomendaciones listas para actuar.",
        description:
          "Cada reporte termina con ideas concretas para contenido, producto o growth segun lo que este ocurriendo en el mercado.",
      },
    ],
  },
];

export function getAgentBySlug(slug: string) {
  return featuredAgents.find((agent) => agent.slug === slug);
}
