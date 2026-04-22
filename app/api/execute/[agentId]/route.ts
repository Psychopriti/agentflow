import { executeAgent } from "@/ai/agent-runner";
import {
  handleRouteError,
  jsonError,
  jsonSuccess,
  parseJsonBody,
  requireAuthenticatedProfile,
} from "@/lib/api";
import { enforceRateLimit } from "@/lib/security";

const MAX_AGENT_INPUT_LENGTH = 2500;

export async function POST(
  request: Request,
  context: RouteContext<"/api/execute/[agentId]">,
) {
  try {
    const rateLimitResponse = enforceRateLimit(request, {
      keyPrefix: "execute-agent",
      limit: 30,
      windowMs: 60 * 60 * 1000,
    });

    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const { agentId } = await context.params;
    const auth = await requireAuthenticatedProfile();

    if (auth.errorResponse || !auth.profile) {
      return auth.errorResponse ?? jsonError({ error: "Unauthorized", status: 401 });
    }

    const parsedBody = await parseJsonBody<{
      input?: unknown;
      conversationId?: unknown;
    }>(request);

    if (parsedBody.errorResponse || !parsedBody.data) {
      return parsedBody.errorResponse ?? jsonError({ error: "Invalid JSON", status: 400 });
    }

    const body = parsedBody.data;
    const conversationId =
      typeof body.conversationId === "string"
        ? body.conversationId.trim()
        : "";
    const input = typeof body.input === "string" ? body.input : "";

    if (!input.trim()) {
      return jsonError({
        error: "input is required.",
        status: 400,
      });
    }

    if (input.length > MAX_AGENT_INPUT_LENGTH) {
      return jsonError({
        error: `input must be ${MAX_AGENT_INPUT_LENGTH} characters or fewer.`,
        status: 400,
      });
    }

    const result = await executeAgent({
      profileId: auth.profile.id,
      agentId,
      conversationId: conversationId || undefined,
      input,
    });

    return jsonSuccess({
      executionId: result.execution.id,
      conversationId: result.conversationId,
      agent: result.agent,
      execution: result.execution,
      output: result.output,
    });
  } catch (error) {
    return handleRouteError(error);
  }
}
