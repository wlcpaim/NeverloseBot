import React from 'react';
import { 
  LayoutDashboard, Flame, BarChart3, Wallet, Users2, HelpCircle, 
  GraduationCap, Trophy, Share2, Zap, Bot, GitFork, Boxes, 
  ArrowRightLeft, UserCheck, MessageSquareShare, Users, Puzzle, 
  CreditCard, Compass, Disc, ShoppingBag, Link2, Webhook, X
} from 'lucide-react';
import { NavigationModule } from '../../types/neverlose';

interface SidebarProps {
  currentModule: NavigationModule;
  onSelectModule: (module: NavigationModule) => void;
  isOpen: boolean;
  onClose: () => void;
}

interface NavSection {
  title: string;
  items: {
    id: NavigationModule;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: 'Principal',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'stories', label: 'Stories', icon: Flame, badge: 'Novo' },
      { id: 'analytics', label: 'Análises', icon: BarChart3 },
      { id: 'finance', label: 'Financeiro', icon: Wallet },
      { id: 'team', label: 'Equipe', icon: Users2 },
      { id: 'support', label: 'Suporte', icon: HelpCircle },
      { id: 'classes', label: 'Aulas', icon: GraduationCap },
      { id: 'community', label: 'Comunidade', icon: Trophy, badge: 'Rank' },
      { id: 'affiliates', label: 'Afiliados', icon: Share2 },
    ]
  },
  {
    title: 'Operações',
    items: [
      { id: 'automations', label: 'Automações', icon: Zap },
      { id: 'bots', label: 'Meus Robôs', icon: Bot },
      { id: 'flows', label: 'Meus Fluxos', icon: GitFork },
      { id: 'stock', label: 'Estoque', icon: Boxes },
      { id: 'redirects', label: 'Redirecionadores', icon: ArrowRightLeft },
      { id: 'customers', label: 'Clientes', icon: UserCheck },
      { id: 'remarketing', label: 'Remarketing', icon: MessageSquareShare },
      { id: 'groups', label: 'Meus Grupos', icon: Users },
    ]
  },
  {
    title: 'Ferramentas',
    items: [
      { id: 'integrations', label: 'Integrações', icon: Puzzle },
      { id: 'gateways', label: 'Gateways PIX', icon: CreditCard },
      { id: 'tracking', label: 'Trackeamento', icon: Compass },
      { id: 'roulette', label: 'Roleta Hot', icon: Disc },
      { id: 'checkout', label: 'Checkout', icon: ShoppingBag },
      { id: 'biolink', label: 'Bio Link', icon: Link2 },
      { id: 'webhooks', label: 'Webhooks', icon: Webhook },
    ]
  }
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentModule,
  onSelectModule,
  isOpen,
  onClose,
}) => {
  return (
    <>
      {/* Backdrop Mobile */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#090909] border-r border-[#292929] flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Topo Logo Neverlose */}
        <div>
          <div className="h-16 flex items-center justify-between px-5 border-b border-[#292929]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#EF233C] to-[#C1122F] flex items-center justify-center shadow-glow-red">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-base tracking-wider text-white uppercase block leading-none">
                  Neverlose
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#EF233C] font-bold uppercase block mt-1">
                  Bot Engine
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white rounded-lg lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links de Navegação */}
          <div className="overflow-y-auto max-h-[calc(100vh-140px)] py-4 px-3 space-y-6">
            {NAV_SECTIONS.map((section) => (
              <div key={section.title} className="space-y-1">
                <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2">
                  {section.title}
                </p>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentModule === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectModule(item.id);
                        onClose();
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-[#EF233C]/20 to-transparent text-[#EF233C] border-l-2 border-[#EF233C]'
                          : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#EF233C]' : 'text-neutral-400'}`} />
                        <span>{item.label}</span>
                      </div>

                      {item.badge && (
                        <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                          item.badge === 'Rank'
                            ? 'bg-[#EF233C]/20 text-[#EF233C] border border-[#EF233C]/40'
                            : 'bg-neutral-800 text-neutral-300'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Rodapé do Usuário */}
        <div className="p-4 border-t border-[#292929] bg-[#0c0c0c] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-neutral-800 border border-[#EF233C]/40 flex items-center justify-center font-bold text-xs text-[#EF233C]">
              NL
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">Operação Master</p>
              <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Online no Telegram
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};