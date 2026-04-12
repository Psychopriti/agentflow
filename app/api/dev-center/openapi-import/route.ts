import { importOpenApiFromUrl } from "@/lib/dev-tools";
import {
  handleRouteError,
  jsonError,
  jsonSuccess,
  parseJsonBody,
  requireAuthenticatedProfile,
} from "@/lib/api";
import { ensureDeveloperProfile } from "@/lib/dev-center";

type OpenApiImportRequest = {
  url?: string;
};

export async function POST(request: Request) {
  try {
    const { errorResponse, profile } = await requireAuthenticatedProfile();

    if (errorResponse || !profile) {
      return errorResponse;
    }

    ensureDeveloperProfile(profile);

    const { data, errorResponse: parseError } =
      await parseJsonBody<OpenApiImportRequest>(request);

    if (parseError || !data) {
      return parseError;
    }

    const url = typeof data.url === "string" ? data.url.trim() : "";

    if (!url) {
      return jsonError({
        error: "La URL del OpenAPI es obligatoria.",
        status: 400,
      });
    }

    const imported = await importOpenApiFromUrl(url);

    return jsonSuccess({
      import: imported,
    });
  } catch (error) {
    return handleRouteError(error);
  }
}
