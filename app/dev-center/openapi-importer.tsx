"use client";

import { useState, useTransition } from "react";

type OpenApiImporterProps = {
  targetTextareaId: string;
};

type ImportResponse = {
  success: boolean;
  import?: {
    title: string;
    version: string | null;
    sourceUrl: string;
    toolDefinitions: unknown[];
  };
  error?: string;
};

export function OpenApiImporter({ targetTextareaId }: OpenApiImporterProps) {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleImport() {
    startTransition(async () => {
      setMessage(null);
      setIsError(false);

      try {
        const response = await fetch("/api/dev-center/openapi-import", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        });
        const payload = (await response.json()) as ImportResponse;

        if (!response.ok || !payload.success || !payload.import) {
          throw new Error(payload.error || "No se pudo importar el OpenAPI.");
        }

        const textarea = document.getElementById(
          targetTextareaId,
        ) as HTMLTextAreaElement | null;

        if (!textarea) {
          throw new Error("No se encontro el campo de tool definitions.");
        }

        textarea.value = JSON.stringify(payload.import.toolDefinitions, null, 2);
        textarea.dispatchEvent(new Event("input", { bubbles: true }));
        setMessage(
          `Importadas ${payload.import.toolDefinitions.length} tools desde ${payload.import.title}.`,
        );
      } catch (error) {
        setIsError(true);
        setMessage(
          error instanceof Error
            ? error.message
            : "No se pudo importar el OpenAPI.",
        );
      }
    });
  }

  return (
    <div className="rounded-[1rem] border border-white/10 bg-white/[0.03] p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
        <label className="block flex-1">
          <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-white/45">
            Importar OpenAPI por URL
          </span>
          <input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            type="url"
            placeholder="https://api.tuservicio.com/openapi.json"
            className="w-full rounded-[1rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-[#8f90ff]"
          />
        </label>

        <button
          type="button"
          onClick={handleImport}
          disabled={isPending || !url.trim()}
          className="rounded-full border border-white/14 px-4 py-3 text-sm text-white/82 transition hover:border-white/24 hover:bg-white/6 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Importando..." : "Importar"}
        </button>
      </div>

      <p className="mt-3 text-xs leading-5 text-white/48">
        Soporta specs OpenAPI en JSON con `https` y genera las operations como
        tool definitions listas para editar.
      </p>

      {message ? (
        <div
          className={`mt-3 rounded-[0.9rem] border px-3 py-2 text-sm ${
            isError
              ? "border-[#ff7a7a]/30 bg-[#3a1111] text-[#ffd0d0]"
              : "border-[#d9ff00]/20 bg-[#11190a] text-[#e9ff9a]"
          }`}
        >
          {message}
        </div>
      ) : null}
    </div>
  );
}
