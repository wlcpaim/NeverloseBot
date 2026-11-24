-- ==========================================================
-- NEVERLOSE BOT — SCHEMA POSTGRESQL / SUPABASE
-- Plataforma de Automação, Vendas Telegram & PIX
-- ==========================================================

-- 1. Robôs Telegram
CREATE TABLE IF NOT EXISTS public.nl_bots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  username TEXT NOT NULL,
  token_encrypted TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  total_sales INT DEFAULT 0,
  revenue NUMERIC(12, 2) DEFAULT 0,
  active_flow TEXT DEFAULT 'Fluxo Principal',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Transações e Pagamentos PIX
CREATE TABLE IF NOT EXISTS public.nl_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bot_id UUID REFERENCES public.nl_bots(id) ON DELETE CASCADE,
  tx_id TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_telegram TEXT,
  amount NUMERIC(10, 2) NOT NULL,
  net_amount NUMERIC(10, 2) NOT NULL,
  status TEXT DEFAULT 'pendente',
  payment_method TEXT DEFAULT 'pix',
  gateway TEXT NOT NULL,
  product_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Leads e Clientes Telegram
CREATE TABLE IF NOT EXISTS public.nl_customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  telegram_username TEXT,
  telegram_id TEXT NOT NULL,
  total_spent NUMERIC(12, 2) DEFAULT 0,
  purchases_count INT DEFAULT 0,
  last_bot_id UUID REFERENCES public.nl_bots(id),
  status TEXT DEFAULT 'lead',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Fluxos de Automação
CREATE TABLE IF NOT EXISTS public.nl_flows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bot_id UUID REFERENCES public.nl_bots(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  trigger_type TEXT NOT NULL,
  steps JSONB DEFAULT '[]',
  active BOOLEAN DEFAULT true,
  conversions_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Webhooks de Notificação
CREATE TABLE IF NOT EXISTS public.nl_webhooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  events TEXT[] DEFAULT '{}',
  secret_token TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE public.nl_bots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nl_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nl_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nl_flows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nl_webhooks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuário gerencia seus bots" ON public.nl_bots FOR ALL TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Usuário gerencia suas transações" ON public.nl_transactions FOR ALL TO authenticated USING (true);
CREATE POLICY "Usuário gerencia seus clientes" ON public.nl_customers FOR ALL TO authenticated USING (auth.uid() = user_id);