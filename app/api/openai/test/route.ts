import { OPENAI_DEFAULT_MODEL, openai } from "@/lib/openai";
import { jsonError, jsonSuccess } from "@/lib/api";
import { enforceRateLimit } from "@/lib/security";

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return jsonError({
      error: "OpenAI test endpoint is disabled in production.",
      status: 404,
    });
  }

  const rateLimitResponse = enforceRateLimit(request, {
    keyPrefix: "openai-test",
    limit: 3,
    windowMs: 60 * 60 * 1000,
  });

  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const startedAt = Date.now();

  try {
    const response = await openai.chat.completions.create({
      model: OPENAI_DEFAULT_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are a connection test. Reply in Spanish with a very short confirmation.",
        },
        {
          role: "user",
          content:
            "Confirma que la conexion con OpenAI funciona. Incluye la palabra OK.",
        },
      ],
    });

    const content = response.choices[0]?.message?.content?.trim();

    return jsonSuccess({
      model: response.model,
      message: content || "Conexion exitosa con OpenAI. OK",
      latencyMs: Date.now() - startedAt,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "OpenAI connection test failed.";

    return jsonError({
      error: message,
      status: 500,
    });
  }
}
