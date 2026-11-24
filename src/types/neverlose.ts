export type NavigationModule =
  // Principal
  | 'dashboard'
  | 'stories'
  | 'analytics'
  | 'finance'
  | 'team'
  | 'support'
  | 'classes'
  | 'community'
  | 'affiliates'
  // Operações
  | 'automations'
  | 'bots'
  | 'flows'
  | 'stock'
  | 'redirects'
  | 'customers'
  | 'remarketing'
  | 'groups'
  // Ferramentas
  | 'integrations'
  | 'gateways'
  | 'tracking'
  | 'roulette'
  | 'checkout'
  | 'biolink'
  | 'webhooks';

export type PeriodFilter = 'hoje' | 'ontem' | '7d' | '30d' | 'total';

export interface TelegramBot {
  id: string;
  name: string;
  username: string;
  tokenMasked: string;
  status: 'active' | 'paused' | 'error';
  totalSales: number;
  revenue: number;
  activeFlow: string;
  subscribers: number;
  lastPing: string;
}

export interface Transaction {
  id: string;
  txId: string;
  botName: string;
  customerName: string;
  customerTelegram: string;
  amount: number;
  netAmount: number;
  status: 'pago' | 'pendente' | 'expirado' | 'estornado';
  paymentMethod: 'pix';
  gateway: string;
  productName: string;
  createdAt: string;
}

export interface CustomerLead {
  id: string;
  name: string;
  telegramUsername: string;
  telegramId: string;
  totalSpent: number;
  purchasesCount: number;
  lastBot: string;
  status: 'lead' | 'comprador' | 'recuperar_pix';
  joinedAt: string;
}

export interface AutomationFlow {
  id: string;
  name: string;
  trigger: string;
  stepsCount: number;
  active: boolean;
  conversions: number;
}

export interface CommunityRankUser {
  position: number;
  name: string;
  avatar: string;
  revenue: number;
  league: 'Diamante' | 'Mestre' | 'Platina' | 'Ouro' | 'Prata';
  badge: string;
  isCurrentUser?: boolean;
}

export interface GatewayConfig {
  id: string;
  provider: 'PushinPay' | 'MercadoPago' | 'Asaas' | 'Efí / Gerencianet' | 'EzzePay';
  apiKey: string;
  secretKey?: string;
  active: boolean;
  pixFeePercentage: number;
  fixedFee: number;
}

export interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  events: string[];
  secretToken: string;
  status: 'active' | 'paused';
  totalDeliveries: number;
  lastStatus: number;
}

export interface RouletteItem {
  id: string;
  title: string;
  discount: number;
  probability: number;
  color: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  customer: string;
  status: 'aberto' | 'em_andamento' | 'resolvido';
  priority: 'baixa' | 'media' | 'alta';
  createdAt: string;
}