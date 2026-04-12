alter table public.agent_tool_secrets enable row level security;
alter table public.agent_test_runs enable row level security;

drop policy if exists "Owners can view own tool secrets" on public.agent_tool_secrets;
create policy "Owners can view own tool secrets"
on public.agent_tool_secrets
for select
using (
  exists (
    select 1
    from public.agents
    join public.profiles on profiles.id = agents.owner_profile_id
    where agents.id = agent_tool_secrets.agent_id
      and profiles.user_id = auth.uid()
  )
);

drop policy if exists "Owners can manage own tool secrets" on public.agent_tool_secrets;
create policy "Owners can manage own tool secrets"
on public.agent_tool_secrets
for all
using (
  exists (
    select 1
    from public.agents
    join public.profiles on profiles.id = agents.owner_profile_id
    where agents.id = agent_tool_secrets.agent_id
      and profiles.user_id = auth.uid()
      and profiles.role in ('developer', 'admin')
  )
)
with check (
  exists (
    select 1
    from public.agents
    join public.profiles on profiles.id = agents.owner_profile_id
    where agents.id = agent_tool_secrets.agent_id
      and profiles.user_id = auth.uid()
      and profiles.role in ('developer', 'admin')
  )
);

drop policy if exists "Owners can view own test runs" on public.agent_test_runs;
create policy "Owners can view own test runs"
on public.agent_test_runs
for select
using (
  exists (
    select 1
    from public.profiles
    where profiles.id = agent_test_runs.profile_id
      and profiles.user_id = auth.uid()
  )
);

drop policy if exists "Owners can create own test runs" on public.agent_test_runs;
create policy "Owners can create own test runs"
on public.agent_test_runs
for insert
with check (
  exists (
    select 1
    from public.profiles
    join public.agents on agents.id = agent_test_runs.agent_id
    where profiles.id = agent_test_runs.profile_id
      and profiles.user_id = auth.uid()
      and agents.owner_profile_id = profiles.id
      and agents.owner_type = 'developer'
  )
);
