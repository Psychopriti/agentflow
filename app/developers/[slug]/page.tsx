import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";
import { featuredAgents } from "@/lib/agents";
import { featuredDevelopers, getDeveloperBySlug } from "@/lib/developers";

type DeveloperDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return featuredDevelopers.map((developer) => ({ slug: developer.slug }));
}

export default async function DeveloperDetailPage({
  params,
}: DeveloperDetailPageProps) {
  const { slug } = await params;
  const developer = getDeveloperBySlug(slug);

  if (!developer) {
    notFound();
  }

  const relatedAgents = developer.agentSlugs.flatMap((agentSlug) => {
    const agent = featuredAgents.find((item) => item.slug === agentSlug);
    return agent ? [agent] : [];
  });

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col px-5 py-5 sm:px-8 sm:py-7">
        <div className="flex min-h-[calc(100vh-2.5rem)] flex-1 flex-col rounded-[2rem] border border-white/8 bg-[#080808] px-5 py-5 shadow-[0_30px_120px_rgba(0,0,0,0.55)] sm:px-8 sm:py-7 lg:px-10 lg:py-8">
          <div className="rounded-[1.5rem] border border-[#8f23ff] px-4 py-4 sm:px-6">
            <SiteHeader currentPath="/developers" />
          </div>

          <section className="flex flex-1 flex-col justify-center gap-8 pb-4 pt-9 sm:pt-11">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(90deg,#d8ff17_0%,#edf0d1_44%,#8f90ff_100%)] px-6 py-7 shadow-[0_20px_45px_rgba(0,0,0,0.2)] sm:px-10 sm:py-10">
              <div className="absolute -left-10 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-[#d8ff17]/45 blur-3xl" />
              <div className="absolute right-0 top-0 h-full w-1/3 bg-[radial-gradient(circle_at_60%_40%,rgba(255,255,255,0.35),transparent_38%)]" />

              <div className="flex items-end justify-between gap-6">
                <div className="relative mt-14 flex size-[7.8rem] items-center justify-center overflow-hidden rounded-full border-[5px] border-white bg-[#07282d] shadow-[0_12px_30px_rgba(0,0,0,0.24)] sm:size-[8.8rem]">
                  {developer.avatar}
                </div>
                <Link
                  href="/developers"
                  className="inline-flex items-center gap-2 rounded-full bg-black/18 px-4 py-2 text-xs font-medium text-white/90 backdrop-blur transition hover:bg-black/26"
                >
                  <ArrowLeft className="size-4" />
                  Volver a developers
                </Link>
              </div>
            </div>

            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.7fr] lg:items-start">
              <div>
                <h1 className="max-w-3xl text-balance text-[2.7rem] font-medium leading-[0.95] tracking-[-0.065em] text-white sm:text-[4rem]">
                  {developer.name}
                </h1>
                <p className="mt-5 text-sm uppercase tracking-[0.22em] text-white/42">
                  {developer.role}
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {developer.benefits.map((benefit) => (
                    <article
                      key={benefit.title}
                      className="rounded-[0.45rem] border border-white/10 bg-[linear-gradient(180deg,#1a1d37_0%,#1d2244_100%)] px-5 py-6 shadow-[0_16px_32px_rgba(0,0,0,0.18)]"
                    >
                      <div className="text-center text-lg text-white/85">
                        {benefit.icon}
                      </div>
                      <h2 className="mt-5 text-center text-[0.82rem] font-medium leading-tight text-white">
                        {benefit.title}
                      </h2>
                      <p className="mt-4 text-[0.64rem] leading-[1.5] text-white/75">
                        {benefit.description}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              <aside className="justify-self-center lg:justify-self-end">
                <div className="relative w-full max-w-[19rem]">
                  <div className="overflow-hidden rounded-[45%_45%_36%_36%/32%_32%_18%_18%] border border-[#d8d0bb] bg-[linear-gradient(180deg,#fbf3e7_0%,#d8c4af_55%,#7a4d2e_100%)] shadow-[0_28px_50px_rgba(0,0,0,0.28)]">
                    <div className="relative aspect-[0.8] w-full bg-[radial-gradient(circle_at_32%_18%,rgba(255,255,255,0.48),transparent_18%),linear-gradient(180deg,#e8e0d5_0%,#cab7a6_55%,#815433_100%)]">
                      <div className="absolute inset-x-[18%] top-[12%] bottom-[18%] overflow-hidden rounded-[2rem]">
                        {developer.avatar}
                      </div>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(255,255,255,0.5),transparent_16%),radial-gradient(circle_at_55%_60%,rgba(0,0,0,0.2),transparent_20%)]" />
                    </div>
                  </div>

                  <div className="absolute inset-x-4 -bottom-5">
                    <Link
                      href="/register"
                      className="flex items-center justify-center rounded-full border border-white/12 bg-[#8f90ff] px-5 py-3 text-sm font-medium text-white shadow-[0_14px_30px_rgba(143,144,255,0.35)] transition hover:bg-[#a0a1ff]"
                    >
                      Contactar developer
                    </Link>
                  </div>
                </div>

                <div className="mt-10 space-y-1 text-left">
                  <p className="text-[1.45rem] font-semibold leading-tight text-white">
                    {developer.taglinePrimary}
                  </p>
                  <p className="text-[1.45rem] font-semibold leading-tight text-white">
                    {developer.taglineSecondary}
                  </p>
                  <p className="mt-5 max-w-[18rem] text-sm leading-6 text-white/76">
                    {developer.heroDescription}
                  </p>
                  {relatedAgents.length > 0 ? (
                    <p className="mt-5 text-xs uppercase tracking-[0.2em] text-white/38">
                      Agentes relacionados:{" "}
                      {relatedAgents.map((agent) => agent.title).join(", ")}
                    </p>
                  ) : null}
                </div>
              </aside>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
