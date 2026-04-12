"use server";

import { redirect } from "next/navigation";

import { runAgent } from "@/ai/agent-runner";
import { requireAuthenticatedProfile, requireTrimmedString } from "@/lib/api";
import {
  deleteApprovedDeveloperAgentByAdmin,
  createAgentTestRun,
  ensureAdminProfile,
  getReviewQueueAgentById,
  updateAgentReviewByAdmin,
} from "@/lib/dev-center";
import {
  parseToolDefinitions,
  validateDeveloperAgentSubmission,
} from "@/lib/dev-tools";
import type { AgentReviewStatus } from "@/types/database";

function buildRedirect(message: string, type: "success" | "error" = "success") {
  return `/review-center?type=${type}&message=${encodeURIComponent(message)}`;
}

async function getAdminContext() {
  const { errorResponse, profile } = await requireAuthenticatedProfile();

  if (errorResponse || !profile) {
    redirect(buildRedirect("Necesitas iniciar sesion para revisar agentes.", "error"));
  }

  return ensureAdminProfile(profile);
}

export async function runReviewTestAction(formData: FormData) {
  const profile = await getAdminContext();
  const agentId = requireTrimmedString(formData.get("agentId"), "agentId") ?? "";
  const sampleInput =
    requireTrimmedString(formData.get("sampleInput"), "sampleInput", {
      maxLength: 4000,
    }) ?? "";

  try {
    const agent = await getReviewQueueAgentById(agentId);

    if (!agent) {
      throw new Error("Agent not found.");
    }

    const toolDefinitions = Array.isArray(agent.tool_definitions)
      ? parseToolDefinitions(JSON.stringify(agent.tool_definitions))
      : [];
    const validationReport = validateDeveloperAgentSubmission({
      name: agent.name,
      shortDescription: agent.short_description ?? "",
      description: agent.description ?? "",
      promptTemplate: agent.prompt_template ?? "",
      model: agent.model,
      toolDefinitions,
    });

    if (validationReport.issues.length > 0) {
      await createAgentTestRun({
        agent_id: agent.id,
        profile_id: profile.id,
        status: "failed",
        input_data: {
          sample_input: sampleInput,
        },
        output_data: {
          validation_report: validationReport,
          note: "La submission fallo validaciones previas.",
        },
      });

      await updateAgentReviewByAdmin(agent.id, {
        last_test_run_status: "failed",
        last_test_run_at: new Date().toISOString(),
        validation_report: validationReport,
      });

      redirect(buildRedirect("La prueba fallo por validaciones previas.", "error"));
    }

    const runResult = await runAgent(agent, sampleInput);

    await createAgentTestRun({
      agent_id: agent.id,
      profile_id: profile.id,
      status: "passed",
      input_data: {
        sample_input: sampleInput,
      },
      output_data: {
        text: runResult.output,
        ...(runResult.metadata ?? {}),
      },
    });

    await updateAgentReviewByAdmin(agent.id, {
      last_test_run_status: "passed",
      last_test_run_at: new Date().toISOString(),
      validation_report: validationReport,
      review_status:
        agent.review_status === "ready_for_review"
          ? "in_review"
          : agent.review_status,
    });

    redirect(buildRedirect("Prueba ejecutada correctamente."));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "No se pudo probar el agente.";

    if (agentId && sampleInput) {
      const existingAgent = await getReviewQueueAgentById(agentId);

      if (existingAgent) {
        await createAgentTestRun({
          agent_id: agentId,
          profile_id: profile.id,
          status: "failed",
          input_data: {
            sample_input: sampleInput,
          },
          output_data: {
            error: message,
          },
        });

        await updateAgentReviewByAdmin(agentId, {
          last_test_run_status: "failed",
          last_test_run_at: new Date().toISOString(),
        });
      }
    }

    redirect(buildRedirect(message, "error"));
  }
}

export async function updateReviewStatusAction(formData: FormData) {
  await getAdminContext();

  try {
    const agentId = requireTrimmedString(formData.get("agentId"), "agentId") ?? "";
    const nextStatus =
      requireTrimmedString(formData.get("status"), "status") ?? "";
    const allowedStatuses: AgentReviewStatus[] = [
      "ready_for_review",
      "in_review",
      "changes_requested",
      "approved",
    ];

    if (!allowedStatuses.includes(nextStatus as AgentReviewStatus)) {
      throw new Error("Estado de revision no valido.");
    }

    if (nextStatus === "approved") {
      const agent = await getReviewQueueAgentById(agentId);

      if (!agent) {
        throw new Error("Agent not found.");
      }

      if (agent.last_test_run_status !== "passed") {
        throw new Error("Antes de aprobar debes ejecutar una prueba exitosa en revision.");
      }
    }

    if (nextStatus === "approved") {
      await updateAgentReviewByAdmin(agentId, {
        review_status: "approved",
        status: "published",
        is_published: true,
        is_active: true,
        published_at: new Date().toISOString(),
      });

      redirect(buildRedirect("Agente aprobado y publicado en el marketplace."));
    }

    if (nextStatus === "changes_requested") {
      await updateAgentReviewByAdmin(agentId, {
        review_status: "changes_requested",
        status: "draft",
        is_published: false,
        published_at: null,
      });

      redirect(buildRedirect("Se solicitaron cambios al developer."));
    }

    await updateAgentReviewByAdmin(agentId, {
      review_status: nextStatus as AgentReviewStatus,
      is_published: false,
    });

    redirect(buildRedirect("Estado de revision actualizado."));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "No se pudo actualizar la revision.";
    redirect(buildRedirect(message, "error"));
  }
}

export async function deleteApprovedAgentAction(formData: FormData) {
  await getAdminContext();

  try {
    const agentId = requireTrimmedString(formData.get("agentId"), "agentId") ?? "";

    await deleteApprovedDeveloperAgentByAdmin(agentId);

    redirect(buildRedirect("Agente eliminado del catalogo."));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "No se pudo eliminar el agente.";
    redirect(buildRedirect(message, "error"));
  }
}
