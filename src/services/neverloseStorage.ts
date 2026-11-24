import { 
  TelegramBot, Transaction, CustomerLead, AutomationFlow, 
  CommunityRankUser, GatewayConfig, WebhookConfig, PeriodFilter, SupportTicket 
} from '../types/neverlose';

const STORAGE_KEYS = {
  BOTS: 'nl_bots_v1',
  TX: 'nl_transactions_v1',
  CUSTOMERS: 'nl_customers_v1',
  FLOWS: 'nl_flows_v1',
  GATEWAYS: 'nl_gateways_v1',
  WEBHOOKS: 'nl_webhooks_v1',
  TICKETS: 'nl_tickets_v1',
};

function notifyChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('neverlose:update'));
  }
}

// Initial Demo Telegram Bots
const SEED_BOTS: TelegramBot[] = [
  {
    id: 'bot-1',
    name: 'Neverlose VIP Club',
    username: '@neverlose_vip_bot',
    tokenMasked: '7192847291:AAH...kL9',
    status: 'active',
    totalSales: 342,
    revenue: 48920.00,
    activeFlow: 'Fluxo Funil Principal V2',
    subscribers: 2840,
    lastPing: '2s atrás',
  },
  {
    id: 'bot-2',
    name: 'Neverlose Mentoria PRO',
    username: '@neverlose_mentoria_bot',
    tokenMasked: '6284918204:BGF...mX1',
    status: 'active',
    totalSales: 118,
    revenue: 29500.00,
    activeFlow: 'Fluxo High Ticket Checkout',
    subscribers: 890,
    lastPing: '5s atrás',
  },
  {
    id: 'bot-3',
    name: 'Neverlose Conteúdos Secret',
    username: '@neverlose_secret_bot',
    tokenMasked: '5928104820:CJK...qZ8',
    status: 'active',
    totalSales: 560,
    revenue: 26880.00,
    activeFlow: 'Fluxo Recuperação Rápida',
    subscribers: 5410,
    lastPing: '12s atrás',
  }
];

// Initial Transactions
const SEED_TX: Transaction[] = [
  {
    id: 'tx-1',
    txId: 'PIX-982142',
    botName: 'Neverlose VIP Club',
    customerName: 'Lucas Meneses',
    customerTelegram: '@lucas_m',
    amount: 147.00,
    netAmount: 144.06,
    status: 'pago',
    paymentMethod: 'pix',
    gateway: 'PushinPay',
    productName: 'Acesso Mensal VIP',
    createdAt: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
  },
  {
    id: 'tx-2',
    txId: 'PIX-982141',
    botName: 'Neverlose Mentoria PRO',
    customerName: 'Rafael Guimarães',
    customerTelegram: '@rafael_pro',
    amount: 297.00,
    netAmount: 291.06,
    status: 'pago',
    paymentMethod: 'pix',
    gateway: 'PushinPay',
    productName: 'Mentoria Semanal Vitalícia',
    createdAt: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
  },
  {
    id: 'tx-3',
    txId: 'PIX-982140',
    botName: 'Neverlose Conteúdos Secret',
    customerName: 'Amanda Castro',
    customerTelegram: '@amanda_c',
    amount: 47.90,
    netAmount: 46.94,
    status: 'pendente',
    paymentMethod: 'pix',
    gateway: 'MercadoPago',
    productName: 'Pack Imersivo 2026',
    createdAt: new Date(Date.now() - 32 * 60 * 1000).toISOString(),
  },
  {
    id: 'tx-4',
    txId: 'PIX-982139',
    botName: 'Neverlose VIP Club',
    customerName: 'Gabriel Siqueira',
    customerTelegram: '@gabriel_sq',
    amount: 147.00,
    netAmount: 144.06,
    status: 'pago',
    paymentMethod: 'pix',
    gateway: 'PushinPay',
    productName: 'Acesso Mensal VIP',
    createdAt: new Date(Date.now() - 55 * 60 * 1000).toISOString(),
  },
  {
    id: 'tx-5',
    txId: 'PIX-982138',
    botName: 'Neverlose VIP Club',
    customerName: 'Rodrigo Paiva',
    customerTelegram: '@rodrigo_paiva',
    amount: 147.00,
    netAmount: 144.06,
    status: 'pago',
    paymentMethod: 'pix',
    gateway: 'PushinPay',
    productName: 'Acesso Mensal VIP',
    createdAt: new Date(Date.now() - 80 * 60 * 1000).toISOString(),
  }
];

// Initial Customers / Leads
const SEED_CUSTOMERS: CustomerLead[] = [
  {
    id: 'c-1',
    name: 'Lucas Meneses',
    telegramUsername: '@lucas_m',
    telegramId: '98412847',
    totalSpent: 441.00,
    purchasesCount: 3,
    lastBot: 'Neverlose VIP Club',
    status: 'comprador',
    joinedAt: '2026-01-14',
  },
  {
    id: 'c-2',
    name: 'Rafael Guimarães',
    telegramUsername: '@rafael_pro',
    telegramId: '76129841',
    totalSpent: 297.00,
    purchasesCount: 1,
    lastBot: 'Neverlose Mentoria PRO',
    status: 'comprador',
    joinedAt: '2026-02-02',
  },
  {
    id: 'c-3',
    name: 'Amanda Castro',
    telegramUsername: '@amanda_c',
    telegramId: '82194812',
    totalSpent: 0,
    purchasesCount: 0,
    lastBot: 'Neverlose Conteúdos Secret',
    status: 'recuperar_pix',
    joinedAt: '2026-02-23',
  },
  {
    id: 'c-4',
    name: 'Bruno Mattos',
    telegramUsername: '@brunomattos',
    telegramId: '61298412',
    totalSpent: 147.00,
    purchasesCount: 1,
    lastBot: 'Neverlose VIP Club',
    status: 'comprador',
    joinedAt: '2026-02-10',
  }
];

// Initial Flows
const SEED_FLOWS: AutomationFlow[] = [
  {
    id: 'flow-1',
    name: 'Funil Boas-Vindas + Oferta Relâmpago',
    trigger: '/start ou clique no canal',
    stepsCount: 6,
    active: true,
    conversions: 284,
  },
  {
    id: 'flow-2',
    name: 'Recuperação PIX Gerado Não Pago (5m / 30m / 2h)',
    trigger: 'Status PIX Pendente',
    stepsCount: 4,
    active: true,
    conversions: 142,
  },
  {
    id: 'flow-3',
    name: 'Downsell Automático após 24h',
    trigger: 'Lead abandonou no checkout',
    stepsCount: 3,
    active: true,
    conversions: 78,
  }
];

// Community Ranking
export const SEED_RANKING: CommunityRankUser[] = [
  { position: 1, name: 'Operação Neverlose Alpha', avatar: '🦁', revenue: 148920.00, league: 'Diamante', badge: 'Top 1 Faturamento' },
  { position: 2, name: 'Sua Operação (Você)', avatar: '🔥', revenue: 105300.00, league: 'Diamante', badge: 'Top 2 Geral', isCurrentUser: true },
  { position: 3, name: 'Tubarão Bot Club', avatar: '🦈', revenue: 98400.00, league: 'Mestre', badge: 'Top 3 Faturamento' },
  { position: 4, name: 'Vendas Automáticas 24h', avatar: '⚡', revenue: 76500.00, league: 'Mestre', badge: 'Destaque Mês' },
  { position: 5, name: 'Clube Black VIP', avatar: '👑', revenue: 54200.00, league: 'Platina', badge: 'Alta Escala' },
];

// Gateways
const SEED_GATEWAYS: GatewayConfig[] = [
  { id: 'gw-1', provider: 'PushinPay', apiKey: 'pushin_live_98129481249812', active: true, pixFeePercentage: 1.99, fixedFee: 0.50 },
  { id: 'gw-2', provider: 'MercadoPago', apiKey: 'APP_USR-78219481294-098', active: true, pixFeePercentage: 0.99, fixedFee: 0.00 },
  { id: 'gw-3', provider: 'Asaas', apiKey: 'asaas_key_91824981294', active: false, pixFeePercentage: 1.89, fixedFee: 0.90 },
];

// Webhooks
const SEED_WEBHOOKS: WebhookConfig[] = [
  {
    id: 'wh-1',
    name: 'Webhook Confirmação Telegram',
    url: 'https://api.neverlosebot.com/webhook/telegram',
    events: ['pix.paid', 'bot.lead_created'],
    secretToken: 'whsec_98124981294812',
    status: 'active',
    totalDeliveries: 1420,
    lastStatus: 200,
  },
  {
    id: 'wh-2',
    name: 'Integração CRM Externo',
    url: 'https://webhook.site/neverlose-crm-sync',
    events: ['pix.paid'],
    secretToken: 'whsec_77192847129',
    status: 'active',
    totalDeliveries: 512,
    lastStatus: 200,
  }
];

// Tickets
const SEED_TICKETS: SupportTicket[] = [
  { id: 'tk-1', ticketNumber: '#NL-401', subject: 'Dúvida sobre webhook de entrega de canal privado', customer: 'Lucas Meneses', status: 'resolvido', priority: 'media', createdAt: '2026-02-22' },
  { id: 'tk-2', ticketNumber: '#NL-402', subject: 'Como conectar segundo bot no mesmo gateway PIX?', customer: 'Amanda Castro', status: 'em_andamento', priority: 'alta', createdAt: '2026-02-23' },
];

// Storage Accessors
export function getBots(): TelegramBot[] {
  if (typeof window === 'undefined') return SEED_BOTS;
  const raw = localStorage.getItem(STORAGE_KEYS.BOTS);
  if (!raw) {
    localStorage.setItem(STORAGE_KEYS.BOTS, JSON.stringify(SEED_BOTS));
    return SEED_BOTS;
  }
  try { return JSON.parse(raw); } catch { return SEED_BOTS; }
}

export function saveBot(bot: Partial<TelegramBot> & { name: string; username: string }): TelegramBot {
  const current = getBots();
  const id = bot.id || 'bot-' + Date.now();
  const newBot: TelegramBot = {
    id,
    name: bot.name,
    username: bot.username.startsWith('@') ? bot.username : `@${bot.username}`,
    tokenMasked: bot.tokenMasked || '719284****:AAF****',
    status: bot.status || 'active',
    totalSales: bot.totalSales || 0,
    revenue: bot.revenue || 0,
    activeFlow: bot.activeFlow || 'Fluxo Inicial Padrão',
    subscribers: bot.subscribers || 1,
    lastPing: 'Agora',
  };
  const idx = current.findIndex((b) => b.id === id);
  if (idx >= 0) current[idx] = newBot; else current.unshift(newBot);
  localStorage.setItem(STORAGE_KEYS.BOTS, JSON.stringify(current));
  notifyChange();
  return newBot;
}

export function getTransactions(): Transaction[] {
  if (typeof window === 'undefined') return SEED_TX;
  const raw = localStorage.getItem(STORAGE_KEYS.TX);
  if (!raw) {
    localStorage.setItem(STORAGE_KEYS.TX, JSON.stringify(SEED_TX));
    return SEED_TX;
  }
  try { return JSON.parse(raw); } catch { return SEED_TX; }
}

export function createTransaction(tx: Omit<Transaction, 'id' | 'createdAt'>): Transaction {
  const current = getTransactions();
  const newTx: Transaction = {
    ...tx,
    id: 'tx-' + Date.now(),
    createdAt: new Date().toISOString(),
  };
  current.unshift(newTx);
  localStorage.setItem(STORAGE_KEYS.TX, JSON.stringify(current));
  notifyChange();
  return newTx;
}

export function getCustomers(): CustomerLead[] {
  if (typeof window === 'undefined') return SEED_CUSTOMERS;
  const raw = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
  if (!raw) {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(SEED_CUSTOMERS));
    return SEED_CUSTOMERS;
  }
  try { return JSON.parse(raw); } catch { return SEED_CUSTOMERS; }
}

export function getFlows(): AutomationFlow[] {
  if (typeof window === 'undefined') return SEED_FLOWS;
  const raw = localStorage.getItem(STORAGE_KEYS.FLOWS);
  if (!raw) {
    localStorage.setItem(STORAGE_KEYS.FLOWS, JSON.stringify(SEED_FLOWS));
    return SEED_FLOWS;
  }
  try { return JSON.parse(raw); } catch { return SEED_FLOWS; }
}

export function getGateways(): GatewayConfig[] {
  if (typeof window === 'undefined') return SEED_GATEWAYS;
  const raw = localStorage.getItem(STORAGE_KEYS.GATEWAYS);
  if (!raw) {
    localStorage.setItem(STORAGE_KEYS.GATEWAYS, JSON.stringify(SEED_GATEWAYS));
    return SEED_GATEWAYS;
  }
  try { return JSON.parse(raw); } catch { return SEED_GATEWAYS; }
}

export function updateGateway(id: string, updates: Partial<GatewayConfig>): void {
  const list = getGateways().map((gw) => gw.id === id ? { ...gw, ...updates } : gw);
  localStorage.setItem(STORAGE_KEYS.GATEWAYS, JSON.stringify(list));
  notifyChange();
}

export function getWebhooks(): WebhookConfig[] {
  if (typeof window === 'undefined') return SEED_WEBHOOKS;
  const raw = localStorage.getItem(STORAGE_KEYS.WEBHOOKS);
  if (!raw) {
    localStorage.setItem(STORAGE_KEYS.WEBHOOKS, JSON.stringify(SEED_WEBHOOKS));
    return SEED_WEBHOOKS;
  }
  try { return JSON.parse(raw); } catch { return SEED_WEBHOOKS; }
}

export function getTickets(): SupportTicket[] {
  if (typeof window === 'undefined') return SEED_TICKETS;
  const raw = localStorage.getItem(STORAGE_KEYS.TICKETS);
  if (!raw) {
    localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(SEED_TICKETS));
    return SEED_TICKETS;
  }
  try { return JSON.parse(raw); } catch { return SEED_TICKETS; }
}