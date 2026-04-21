import Link from "next/link";
import { redirect } from "next/navigation";

import { signUpAction } from "@/app/actions/auth";
import { AuthShell } from "@/components/auth/auth-shell";
import { getCurrentUser } from "@/lib/auth";

type RegisterPageProps = {
  searchParams?: Promise<{
    message?: string;
  }>;
};

// ── Shared field classes (contrast-compliant) ─────────────────────────────────
const LABEL_CLS =
  "mb-1.5 block font-sans text-xs font-medium uppercase tracking-[0.2em] text-zinc-400";
const INPUT_CLS =
  "w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 font-sans text-sm text-zinc-50 outline-none transition-all duration-200 placeholder:text-zinc-600 focus:border-[#858BE3] focus:ring-2 focus:ring-[#858BE3]/20 hover:border-zinc-600";

export default async function RegisterPage({
  searchParams,
}: RegisterPageProps) {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  const params = searchParams ? await searchParams : undefined;

  return (
    <AuthShell
      currentPage="register"
      eyebrow="Cuenta nueva"
      title="Crea tu cuenta y activa tu primer agente"
      description="Regístrate con tu nombre, correo y contraseña. En minutos tendrás acceso al marketplace y tus primeros agentes listos."
      message={params?.message}
    >
      <form action={signUpAction} className="mt-6 space-y-5">

        <label className="block">
          <span className={LABEL_CLS}>Nombre completo</span>
          <input
            required
            type="text"
            name="fullName"
            autoComplete="name"
            className={INPUT_CLS}
            placeholder="Tu nombre"
          />
        </label>

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
          <span className={LABEL_CLS}>Tipo de cuenta</span>
          <select
            name="role"
            defaultValue="user"
            className={`${INPUT_CLS} cursor-pointer`}
          >
            <option value="user" className="bg-zinc-900 text-zinc-50">
              Usuario — accede al marketplace
            </option>
            <option value="developer" className="bg-zinc-900 text-zinc-50">
              Developer — publica tus propios agentes
            </option>
          </select>
        </label>

        <label className="block">
          <span className={LABEL_CLS}>Contraseña</span>
          <input
            required
            minLength={6}
            type="password"
            name="password"
            autoComplete="new-password"
            className={INPUT_CLS}
            placeholder="Mínimo 6 caracteres"
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
          Crear cuenta
        </button>
      </form>

      <p className="mt-6 font-sans text-sm text-zinc-400">
        ¿Ya tienes cuenta?{" "}
        <Link
          href="/login"
          className="font-medium text-[#858BE3] transition-colors hover:text-[#a8abf0] focus-visible:underline"
        >
          Inicia sesión aquí
        </Link>
      </p>
    </AuthShell>
  );
}
