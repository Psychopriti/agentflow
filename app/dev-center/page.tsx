import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Cable, ShieldCheck, Sparkles, TestTubeDiagonal } from "lucide-react";

import {
  createDeveloperAgentAction,
  submitDeveloperAgentForReviewAction,
} from "@/app/actions/dev-center";
import { SiteHeader } from "@/components/layout/site-header";
import { getCurrentProfile } from "@/lib/auth";
import { ensureDeveloperProfile, listDeveloperAgents } from "@/lib/dev-center";
import { SUPPORTED_DEV_MODELS } from "@/lib/dev-tools";
import { OpenApiImporter } from "./openapi-importer";
import { PricingFields } from "./pricing-fields";

export const metadata: Metadata = {
  title: "Dev Center",
  description: "Panel privado para developers que suben agentes con tools.",
};

type DevCenterPageProps = {
  searchParams?: Promise<{
    message?: string;
    type?: "success" | "error";
  }>;
};

const capabilityCards = [
  {
    icon: Sparkles,
    title: "Tools conectadas",
    description:
      "Configura tools estructuradas para que el agente use APIs externas sin backend custom.",
  },
  {
    icon: Cable,
    title: "REST, OpenAPI y webhooks",
    description:
      "Empieza con integraciones claras y trazables. El flujo queda listo para crecer despues.",
  },
  {
    icon: ShieldCheck,
    title: "Secrets protegidos",
    description:
      "Las credenciales viven separadas del prompt y se guardan cifradas.",
  },
  {
    icon: TestTubeDiagonal,
    title: "Checklist previo",
    description:
      "Antes de revision hay validacion de schemas y chequeos basicos de seguridad.",
  },
];

const toolJsonExample = `[
  {
    "tool_name": "crm_lookup",
    "description": "Consulta contactos en el CRM externo",
    "source_type": "rest",
    "base_url": "https://api.example.com",
    "method": "GET",
    "path_template": "/v1/contacts/{email}",
    "headers_template": {
      "Accept": "application/json"
    },
    "auth_type": "bearer",
    "auth_header_name": null,
    "auth_prefix": null,
    "input_schema": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string"
        }
      },
      "required": ["email"]
    },
    "output_schema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "company": {
          "type": "string"
        }
      }
    },
    "rate_limit_per_minute": 30,
    "timeout_ms": 10000,
    "openapi_spec_url": null,
    "webhook_url": null
  }
]`;

const toolSecretsExample = `{
  "crm_lookup": "sk_live_xxx"
}`;

function getReviewStatusLabel(reviewStatus: string) {
  if (reviewStatus === "ready_for_review") {
    return "Esperando revision del superuser";
  }

  if (reviewStatus === "in_review") {
    return "En revision";
  }

  if (reviewStatus === "approved") {
    return "Aprobado y publicado";
  }

  return reviewStatus.replaceAll("_", " ");
}

export default async function DevCenterPage({
  searchParams,
}: DevCenterPageProps) {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/login");
  }

  if (profile.role !== "developer") {
    redirect("/dashboard");
  }

  ensureDeveloperProfile(profile);

  const params = searchParams ? await searchParams : undefined;
  const agents = await listDeveloperAgents(profile.id);

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col px-5 py-5 sm:px-8 sm:py-7">
        <div className="flex min-h-[calc(100vh-2.5rem)] flex-1 flex-col rounded-[2rem] border border-white/8 bg-[#080808] px-5 py-5 shadow-[0_30px_120px_rgba(0,0,0,0.55)] sm:px-8 sm:py-7 lg:px-10 lg:py-8">
          <SiteHeader currentPath="/dev-center" />

          <section className="flex flex-1 flex-col gap-8 pb-6 pt-10 sm:pt-14">
            <div className="grid gap-6 rounded-[1.8rem] border border-white/10 bg-[linear-gradient(120deg,#d9ff00_0%,#dff0ab_30%,#8f90ff_100%)] px-6 py-7 text-black shadow-[0_20px_55px_rgba(0,0,0,0.24)] lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-black/55">
                  Dev Center
                </p>
                <h1 className="mt-3 max-w-3xl text-balance text-[2.4rem] font-medium leading-[0.95] tracking-[-0.06em] sm:text-[3.6rem]">
                  Crea agentes que trabajen con APIs externas
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-black/72 sm:text-base">
                  Define el agente, conecta sus tools y envialo a revision
                  cuando este listo.
                </p>
              </div>

              <div className="grid gap-3">
                {capabilityCards.map(({ icon: Icon, title, description }) => (
                  <article
                    key={title}
                    className="rounded-[1.1rem] border border-black/10 bg-black/8 px-4 py-4 backdrop-blur"
                  >
                    <div className="inline-flex rounded-full bg-black/10 p-2">
                      <Icon className="size-4" />
                    </div>
                    <h2 className="mt-3 text-sm font-semibold">{title}</h2>
                    <p className="mt-2 text-sm leading-5 text-black/65">
                      {description}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            {params?.message ? (
              <div
                className={`rounded-[1rem] border px-4 py-3 text-sm ${
                  params.type === "error"
                    ? "border-[#ff7a7a]/30 bg-[#3a1111] text-[#ffd0d0]"
                    : "border-[#d9ff00]/20 bg-[#11190a] text-[#e9ff9a]"
                }`}
              >
                {params.message}
              </div>
            ) : null}

            <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
              <section className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] px-5 py-5">
                <div className="max-w-xl">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                    Nuevo agente
                  </p>
                  <h2 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-white">
                    Configuracion base
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-white/65">
                    Completa el agente, define sus tools y guarda un borrador
                    listo para revision.
                  </p>
                </div>

                <form action={createDeveloperAgentAction} className="mt-6 space-y-4">
                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/45">
                      Nombre del agente
                    </span>
                    <input
                      required
                      name="name"
                      maxLength={80}
                      className="w-full rounded-[1rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-[#8f90ff]"
                      placeholder="Ej. Revenue Ops Copilot"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/45">
                      Descripcion corta
                    </span>
                    <input
                      required
                      name="shortDescription"
                      maxLength={160}
                      className="w-full rounded-[1rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-[#8f90ff]"
                      placeholder="Que resuelve y para quien sirve"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/45">
                      Descripcion completa
                    </span>
                    <textarea
                      required
                      name="description"
                      rows={5}
                      maxLength={1200}
                      className="w-full rounded-[1rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-[#8f90ff]"
                      placeholder="Explica el caso de uso, la propuesta de valor y el alcance real del agente."
                    />
                  </label>

                  <PricingFields defaultModel={SUPPORTED_DEV_MODELS[0]} />

                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/45">
                      Prompt del agente
                    </span>
                    <textarea
                      required
                      name="promptTemplate"
                      rows={9}
                      maxLength={12000}
                      className="w-full rounded-[1rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-[#8f90ff]"
                      placeholder="Explica como debe pensar, responder y usar sus tools."
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/45">
                      Tool definitions JSON
                    </span>
                    <textarea
                      id="tool-definitions-json"
                      required
                      name="toolDefinitionsJson"
                      rows={14}
                      defaultValue={toolJsonExample}
                      className="w-full rounded-[1rem] border border-white/10 bg-white/5 px-4 py-3 font-mono text-xs text-white outline-none transition placeholder:text-white/28 focus:border-[#8f90ff]"
                    />
                  </label>

                  <OpenApiImporter targetTextareaId="tool-definitions-json" />

                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/45">
                      Tool secrets JSON
                    </span>
                    <textarea
                      required
                      name="toolSecretsJson"
                      rows={4}
                      defaultValue={toolSecretsExample}
                      className="w-full rounded-[1rem] border border-white/10 bg-white/5 px-4 py-3 font-mono text-xs text-white outline-none transition placeholder:text-white/28 focus:border-[#8f90ff]"
                    />
                  </label>

                  <button
                    type="submit"
                    className="w-full rounded-full border border-[#d9ff00]/30 bg-[#d9ff00] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#e5ff45]"
                  >
                    Guardar borrador
                  </button>
                </form>
              </section>

              <section className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] px-5 py-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                      Tus agentes
                    </p>
                    <h2 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-white">
                      Estado actual
                    </h2>
                  </div>
                  <p className="text-sm text-white/55">
                    {agents.length} agente{agents.length === 1 ? "" : "s"}
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  {agents.length === 0 ? (
                    <div className="rounded-[1.2rem] border border-dashed border-white/12 bg-white/[0.02] px-5 py-6 text-sm leading-6 text-white/58">
                      Aun no tienes agentes en este espacio. Crea el primero en
                      el panel de la izquierda.
                    </div>
                  ) : (
                    agents.map((agent) => (
                      <article
                        key={agent.id}
                        className="rounded-[1.2rem] border border-white/10 bg-[#0d0d0d] px-5 py-5 shadow-[0_16px_36px_rgba(0,0,0,0.18)]"
                      >
                        <div className="flex flex-col gap-4">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-lg font-medium text-white">
                                {agent.name}
                              </h3>
                              <span className="rounded-full bg-white/8 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.16em] text-white/65">
                                {agent.review_status.replaceAll("_", " ")}
                              </span>
                              <span
                                className={`rounded-full px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.16em] ${
                                  agent.last_test_run_status === "passed"
                                    ? "bg-[#d9ff00]/14 text-[#d9ff00]"
                                    : agent.last_test_run_status === "failed"
                                      ? "bg-[#ff7a7a]/12 text-[#ffb0b0]"
                                      : "bg-white/8 text-white/60"
                                }`}
                              >
                                test {agent.last_test_run_status}
                              </span>
                            </div>
                            <p className="mt-2 text-sm leading-6 text-white/65">
                              {agent.short_description ??
                                "Agente listo para terminar su configuracion."}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-4 text-xs uppercase tracking-[0.16em] text-white/35">
                              <span>
                                {agent.toolCount} tool
                                {agent.toolCount === 1 ? "" : "s"}
                              </span>
                              <span>{agent.model}</span>
                              <span>
                                {agent.pricing_type === "free"
                                  ? "gratis"
                                  : `$${agent.price}`}
                              </span>
                            </div>
                          </div>

                          {agent.review_status === "draft" ||
                          agent.review_status === "changes_requested" ? (
                            <form action={submitDeveloperAgentForReviewAction}>
                              <input type="hidden" name="agentId" value={agent.id} />
                              <button
                                type="submit"
                                className="rounded-full border border-[#d9ff00]/25 bg-[#d9ff00] px-4 py-2 text-sm font-medium text-black transition hover:bg-[#e5ff45]"
                              >
                                Enviar a revision
                              </button>
                            </form>
                          ) : (
                            <div className="inline-flex w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                              {getReviewStatusLabel(agent.review_status)}
                            </div>
                          )}
                        </div>
                      </article>
                    ))
                  )}
                </div>
              </section>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
