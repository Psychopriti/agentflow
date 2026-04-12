"use server";

import { redirect } from "next/navigation";

import { AgentExecutionError } from "@/ai/agent-runner";
import { requireAuthenticatedProfile, requireTrimmedString } from "@/lib/api";
import {
  createDeveloperAgent,
  ensureDeveloperProfile,
  getDeveloperAgentById,
  updateDeveloperAgent,
  upsertToolSecrets,
} from "@/lib/dev-center";
import {
  getDeveloperPricingGuidance,
  parseToolDefinitions,
  parseToolSecrets,
  SUPPORTED_DEV_MODELS,
  validateDeveloperAgentSubmission,
} from "@/lib/dev-tools";
import { encryptSecretValue, maskSecretValue } from "@/lib/tool-secrets";
import type { OpenAIModelId } from "@/types/openai";

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildRedirect(message: string, type: "success" | "error" = "success") {
  return `/dev-center?type=${type}&message=${encodeURIComponent(message)}`;
}

function parsePositivePrice(value: FormDataEntryValue | null, pricingType: string) {
  const rawValue = String(value ?? "0").trim();
  const parsedValue = Number.parseFloat(rawValue || "0");

  if (Number.isNaN(parsedValue) || parsedValue < 0) {
    throw new AgentExecutionError("price must be a valid positive amount.", 400);
  }

  if (pricingType === "one_time" && parsedValue <= 0) {
    throw new AgentExecutionError(
      "Los agentes de pago deben tener un precio mayor que cero.",
      400,
    );
  }

  return parsedValue.toFixed(2);
}

async function getDeveloperContext() {
  const { errorResponse, profile } = await requireAuthenticatedProfile();

  if (errorResponse || !profile) {
    redirect(buildRedirect("Necesitas iniciar sesion para usar el Dev Center.", "error"));
  }

  return ensureDeveloperProfile(profile);
}

export async function createDeveloperAgentAction(formData: FormData) {
  const profile = await getDeveloperContext();

  try {
    const name =
      requireTrimmedString(formData.get("name"), "name", {
        maxLength: 80,
      }) ?? "";
    const shortDescription =
      requireTrimmedString(formData.get("shortDescription"), "shortDescription", {
        maxLength: 160,
      }) ?? "";
    const description =
      requireTrimmedString(formData.get("description"), "description", {
        maxLength: 1200,
      }) ?? "";
    const promptTemplate =
      requireTrimmedString(formData.get("promptTemplate"), "promptTemplate", {
        maxLength: 12000,
      }) ?? "";
    const model = requireTrimmedString(formData.get("model"), "model") ?? "";
    const pricingType =
      formData.get("pricingType") === "one_time" ? "one_time" : "free";
    const price = parsePositivePrice(formData.get("price"), pricingType);
    const toolDefinitionsJson =
      requireTrimmedString(formData.get("toolDefinitionsJson"), "toolDefinitionsJson") ??
      "";
    const toolSecretsJson =
      requireTrimmedString(formData.get("toolSecretsJson"), "toolSecretsJson") ?? "";
    const toolDefinitions = parseToolDefinitions(
      toolDefinitionsJson,
    );
    const pricingGuidance = getDeveloperPricingGuidance({
      model,
      toolCount: toolDefinitions.length,
    });
    const toolSecrets = parseToolSecrets(toolSecretsJson, toolDefinitions);
    const validationReport = validateDeveloperAgentSubmission({
      name,
      shortDescription,
      description,
      promptTemplate,
      model,
      toolDefinitions,
    });

    if (!SUPPORTED_DEV_MODELS.includes(model as OpenAIModelId)) {
      throw new AgentExecutionError("El modelo seleccionado no es valido.", 400);
    }

    if (
      pricingType === "one_time" &&
      Number(price) < pricingGuidance.minimumPriceUsd
    ) {
      throw new AgentExecutionError(
        `Para el modelo ${model} el precio minimo es $${pricingGuidance.minimumPriceUsd.toFixed(2)}.`,
        400,
      );
    }

    const slugBase = slugify(name);

    if (!slugBase) {
      throw new AgentExecutionError("slug could not be generated from name.", 400);
    }

    const createdAgent = await createDeveloperAgent({
      owner_profile_id: profile.id,
      owner_type: "developer",
      name,
      slug: `${slugBase}-${profile.id.slice(0, 8)}`,
      description,
      short_description: shortDescription,
      prompt_template: promptTemplate,
      model,
      tool_definitions: toolDefinitions,
      validation_report: validationReport,
      review_status: "draft",
      last_test_run_status: "not_run",
      is_active: true,
      is_published: false,
      status: "draft",
      pricing_type: pricingType,
      price,
      currency: "USD",
    });

    await upsertToolSecrets(
      toolDefinitions.flatMap((toolDefinition) => {
        const secretValue = toolSecrets.get(toolDefinition.tool_name);

        if (!secretValue) {
          return [];
        }

        return [
          {
            agent_id: createdAgent.id,
            tool_name: toolDefinition.tool_name,
            secret_key: "auth_secret",
            encrypted_value: encryptSecretValue(secretValue),
            masked_value: maskSecretValue(secretValue),
          },
        ];
      }),
    );

    redirect(buildRedirect("Agente nivel 2 creado como borrador."));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "No se pudo crear el agente.";
    redirect(buildRedirect(message, "error"));
  }
}

export async function submitDeveloperAgentForReviewAction(formData: FormData) {
  const profile = await getDeveloperContext();

  try {
    const agentId =
      requireTrimmedString(formData.get("agentId"), "agentId") ?? "";
    const agent = await getDeveloperAgentById(agentId, profile.id);

    if (!agent) {
      throw new AgentExecutionError("Agent not found.", 404);
    }

    const validationReport = validateDeveloperAgentSubmission({
      name: agent.name,
      shortDescription: agent.short_description ?? "",
      description: agent.description ?? "",
      promptTemplate: agent.prompt_template ?? "",
      model: agent.model,
      toolDefinitions: Array.isArray(agent.tool_definitions)
        ? parseToolDefinitions(JSON.stringify(agent.tool_definitions))
        : [],
    });

    if (validationReport.issues.length > 0) {
      throw new AgentExecutionError(
        "La submission no paso los checks automaticos de seguridad y contenido.",
        400,
      );
    }

    await updateDeveloperAgent(agent.id, profile.id, {
      review_status: "ready_for_review",
      validation_report: validationReport,
    });

    redirect(buildRedirect("Agente enviado a revision."));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "No se pudo enviar a revision.";
    redirect(buildRedirect(message, "error"));
  }
}
