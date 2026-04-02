create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete cascade,
  full_name text,
  email text unique,
  role text not null default 'user',
  created_at timestamptz not null default now(),
  constraint profiles_role_check check (role in ('user', 'developer', 'admin'))
);

create table if not exists public.agents (
  id uuid primary key default gen_random_uuid(),
  owner_profile_id uuid references public.profiles(id) on delete cascade,
  owner_type text not null,
  name text not null,
  slug text not null unique,
  description text,
  short_description text,
  prompt_template text,
  is_active boolean not null default true,
  is_published boolean not null default false,
  status text not null default 'draft',
  price numeric(10,2) not null default 0,
  currency text not null default 'USD',
  pricing_type text not null default 'free',
  published_at timestamptz,
  cover_image_url text,
  average_rating numeric(3,2) not null default 0,
  total_reviews integer not null default 0,
  total_runs integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint agents_owner_type_check check (owner_type in ('platform', 'developer')),
  constraint agents_owner_consistency_check check (
    (owner_type = 'platform' and owner_profile_id is null)
    or
    (owner_type = 'developer' and owner_profile_id is not null)
  ),
  constraint agents_status_check check (status in ('draft', 'published', 'archived')),
  constraint agents_pricing_type_check check (pricing_type in ('free', 'one_time')),
  constraint agents_price_logic_check check (
    (pricing_type = 'free' and price >= 0)
    or
    (pricing_type = 'one_time' and price > 0)
  ),
  constraint agents_publish_compatibility_check check (
    (status = 'published' and is_published = true)
    or
    (status = 'draft' and is_published = false)
    or
    (status = 'archived')
  )
);

create table if not exists public.agent_executions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  agent_id uuid not null references public.agents(id) on delete cascade,
  input_data jsonb not null default '{}'::jsonb,
  output_data jsonb,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  constraint agent_executions_status_check check (
    status in ('pending', 'completed', 'failed')
  )
);

create table if not exists public.agent_purchases (
  id uuid primary key default gen_random_uuid(),
  buyer_profile_id uuid not null references public.profiles(id) on delete cascade,
  agent_id uuid not null references public.agents(id) on delete cascade,
  purchase_price numeric(10,2) not null,
  currency text not null default 'USD',
  payment_status text not null default 'completed',
  purchased_at timestamptz not null default now(),
  constraint agent_purchases_payment_status_check check (
    payment_status in ('pending', 'completed', 'failed', 'refunded')
  )
);

create table if not exists public.agent_reviews (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  agent_id uuid not null references public.agents(id) on delete cascade,
  rating integer not null,
  review_text text,
  created_at timestamptz not null default now(),
  constraint agent_reviews_rating_check check (rating between 1 and 5),
  constraint agent_reviews_unique_profile_agent unique (profile_id, agent_id)
);

drop trigger if exists set_agents_updated_at on public.agents;
create trigger set_agents_updated_at
before update on public.agents
for each row
execute function public.set_updated_at();

create index if not exists idx_profiles_user_id on public.profiles(user_id);
create index if not exists idx_profiles_role on public.profiles(role);

create index if not exists idx_agents_slug on public.agents(slug);
create index if not exists idx_agents_owner_profile_id on public.agents(owner_profile_id);
create index if not exists idx_agents_owner_type on public.agents(owner_type);
create index if not exists idx_agents_status on public.agents(status);
create index if not exists idx_agents_is_published on public.agents(is_published);
create index if not exists idx_agents_marketplace on public.agents(status, is_active, is_published);
create index if not exists idx_agents_pricing_type on public.agents(pricing_type);

create index if not exists idx_agent_executions_profile_id on public.agent_executions(profile_id);
create index if not exists idx_agent_executions_agent_id on public.agent_executions(agent_id);
create index if not exists idx_agent_executions_created_at on public.agent_executions(created_at desc);

create index if not exists idx_agent_purchases_buyer_profile_id on public.agent_purchases(buyer_profile_id);
create index if not exists idx_agent_purchases_agent_id on public.agent_purchases(agent_id);
create index if not exists idx_agent_purchases_purchased_at on public.agent_purchases(purchased_at desc);

create index if not exists idx_agent_reviews_profile_id on public.agent_reviews(profile_id);
create index if not exists idx_agent_reviews_agent_id on public.agent_reviews(agent_id);
create index if not exists idx_agent_reviews_created_at on public.agent_reviews(created_at desc);
