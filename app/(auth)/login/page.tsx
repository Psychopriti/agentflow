import Link from "next/link";
import { redirect } from "next/navigation";

import { signInAction } from "@/app/actions/auth";
import { AuthShell } from "@/components/auth/auth-shell";
import { getCurrentUser } from "@/lib/auth";

type LoginPageProps = {
  searchParams?: Promise<{
    message?: string;
  }>;
};

// ── Shared field classes (contrast-compliant) ─────────────────────────────────
// Labels: text-zinc-400 on glass-card dark bg → ~5.7:1 ✅
// Inputs: text-zinc-50 on zinc-900/50 → ~12:1 ✅
// Placeholder: text-zinc-600 on dark → ~3:1 (decorative, acceptable) ✅
const LABEL_CLS = "mb-1.5 block font-sans text-xs font-medium uppercase tracking-[0.2em] text-zinc-400";
const INPUT_CLS =
  "w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 font-sans text-sm text-zinc-50 outline-none transition-all duration-200 placeholder:text-zinc-600 focus:border-[#858BE3] focus:ring-2 focus:ring-[#858BE3]/20 hover:border-zinc-600";

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  const params = searchParams ? await searchParams : undefined;

  return (
    <AuthShell
      currentPage="login"
      eyebrow="Acceso seguro"
      title="Entra a tu cuenta y continúa tu flujo"
      description="Inicia sesión con tu correo y contraseña. Si tu cuenta ya existe, entrarás directo al dashboard."
      message={params?.message}
    >
      <form action={signInAction} className="mt-6 space-y-5">

        <label className="block">
          <span className={LABEL_CLS}>Correo electrónico</span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className={INPUT_CLS}
            placeholder="tu@correo.com"
          />
        </label>

        <label className="block">
          <span className={LABEL_CLS}>Contraseña</span>
          <input
            required
            type="password"
            name="password"
            autoComplete="current-password"
            className={INPUT_CLS}
            placeholder="Tu contraseña"
          />
        </label>

        {/* CTA: neon bg, zinc-950 text → contrast ~14:1 ✅ */}
        <button
          type="submit"
          className="
            mt-2 w-full rounded-full
            bg-[#d7f209] px-5 py-3
            font-sans text-sm font-semibold text-[#09090b]
            transition-all duration-200
            hover:bg-[#e5ff3a] hover:shadow-[0_0_24px_rgba(215,242,9,0.4)]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7f209]/60
            disabled:opacity-50
          "
        >
          Entrar al dashboard
        </button>
      </form>

      <p className="mt-6 font-sans text-sm text-zinc-400">
        ¿No tienes cuenta?{" "}
        <Link
          href="/register"
          className="font-medium text-[#858BE3] transition-colors hover:text-[#a8abf0] focus-visible:underline"
        >
          Crea una aquí
        </Link>
      </p>
    </AuthShell>
  );
}
