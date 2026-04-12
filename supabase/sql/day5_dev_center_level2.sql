alter table public.agents
  add column if not exists model text not null default 'gpt-4o-mini',
  add column if not exists tool_definitions jsonb not null default '[]'::jsonb,
  add column if not exists review_status text not null default 'draft',
  add column if not exists validation_report jsonb not null default '{}'::jsonb,
  add column if not exists last_test_run_status text not null default 'not_run',
  add column if not exists last_test_run_at timestamptz;

alter table public.agents
  drop constraint if exists agents_review_status_check;

alter table public.agents
  add constraint agents_review_status_check
  check (review_status in ('draft', 'ready_for_review', 'in_review', 'changes_requested', 'approved'));

alter table public.agents
  drop constraint if exists agents_last_test_run_status_check;

alter table public.agents
  add constraint agents_last_test_run_status_check
  check (last_test_run_status in ('not_run', 'passed', 'failed'));

create table if not exists public.agent_tool_secrets (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid not null references public.agents(id) on delete cascade,
  tool_name text not null,
  secret_key text not null default 'auth_secret',
  encrypted_value text not null,
  masked_value text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint agent_tool_secrets_unique unique (agent_id, tool_name, secret_key)
);

create table if not exists public.agent_test_runs (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid not null references public.agents(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'failed',
  input_data jsonb not null default '{}'::jsonb,
  output_data jsonb,
  created_at timestamptz not null default now(),
  constraint agent_test_runs_status_check check (status in ('passed', 'failed'))
);

drop trigger if exists set_agent_tool_secrets_updated_at on public.agent_tool_secrets;
create trigger set_agent_tool_secrets_updated_at
before update on public.agent_tool_secrets
for each row
execute function public.set_updated_at();

create index if not exists idx_agents_review_status on public.agents(review_status);
create index if not exists idx_agents_last_test_run_status on public.agents(last_test_run_status);
create index if not exists idx_agent_tool_secrets_agent_id on public.agent_tool_secrets(agent_id);
create index if not exists idx_agent_test_runs_agent_id on public.agent_test_runs(agent_id);
create index if not exists idx_agent_test_runs_profile_id on public.agent_test_runs(profile_id);
