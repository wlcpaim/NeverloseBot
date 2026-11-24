import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardView } from './components/dashboard/DashboardView';
import { FinanceView } from './components/finance/FinanceView';
import { BotsView } from './components/bots/BotsView';
import { AutomationsView } from './components/automations/AutomationsView';
import { CustomersView } from './components/customers/CustomersView';
import { CommunityView } from './components/community/CommunityView';
import { GatewaysView } from './components/tools/GatewaysView';
import { WebhooksView } from './components/tools/WebhooksView';
import { RouletteView } from './components/tools/RouletteView';
import { TeamView } from './components/team/TeamView';
import { NewBotModal } from './components/bots/NewBotModal';

import { NavigationModule, TelegramBot, Transaction, CustomerLead, AutomationFlow, GatewayConfig, WebhookConfig, SupportTicket } from './types/neverlose';
import { 
  getBots, getTransactions, getCustomers, getFlows, 
  getGateways, getWebhooks, getTickets 
} from './services/neverloseStorage';

export default function App() {
  const [currentModule, setCurrentModule] = useState<NavigationModule>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNewBotOpen, setIsNewBotOpen] = useState(false);

  // Storage Data
  const [bots, setBots] = useState<TelegramBot[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [customers, setCustomers] = useState<CustomerLead[]>([]);
  const [flows, setFlows] = useState<AutomationFlow[]>([]);
  const [gateways, setGateways] = useState<GatewayConfig[]>([]);
  const [webhooks, setWebhooks] = useState<WebhookConfig[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);

  const [selectedBotId, setSelectedBotId] = useState<string>('all');

  const refreshAll = () => {
    setBots(getBots());
    setTransactions(getTransactions());
    setCustomers(getCustomers());
    setFlows(getFlows());
    setGateways(getGateways());
    setWebhooks(getWebhooks());
    setTickets(getTickets());
  };

  useEffect(() => {
    refreshAll();
    window.addEventListener('neverlose:update', refreshAll);
    return () => window.removeEventListener('neverlose:update', refreshAll);
  }, []);

  return (
    <div className="min-h-screen bg-[#090909] text-white flex">
      {/* Sidebar Lateral */}
      <Sidebar
        currentModule={currentModule}
        onSelectModule={setCurrentModule}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <Header
          onOpenMobileSidebar={() => setIsSidebarOpen(true)}
          bots={bots}
          selectedBotId={selectedBotId}
          onSelectBot={setSelectedBotId}
          onOpenNewBotModal={() => setIsNewBotOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentModule === 'dashboard' && (
            <DashboardView
              bots={bots}
              transactions={transactions}
              customers={customers}
              onNavigate={setCurrentModule}
              onOpenNewBot={() => setIsNewBotOpen(true)}
            />
          )}

          {currentModule === 'finance' && (
            <FinanceView transactions={transactions} />
          )}

          {currentModule === 'bots' && (
            <BotsView
              bots={bots}
              onOpenNewBotModal={() => setIsNewBotOpen(true)}
            />
          )}

          {(currentModule === 'automations' || currentModule === 'flows') && (
            <AutomationsView flows={flows} />
          )}

          {(currentModule === 'customers' || currentModule === 'remarketing') && (
            <CustomersView customers={customers} />
          )}

          {currentModule === 'community' && (
            <CommunityView />
          )}

          {currentModule === 'gateways' && (
            <GatewaysView gateways={gateways} />
          )}

          {currentModule === 'webhooks' && (
            <WebhooksView webhooks={webhooks} />
          )}

          {currentModule === 'roulette' && (
            <RouletteView />
          )}

          {(currentModule === 'team' || currentModule === 'support') && (
            <TeamView tickets={tickets} />
          )}

          {/* Módulos Auxiliares com visual integrado Neverlose */}
          {(currentModule === 'stories' || currentModule === 'analytics' || currentModule === 'classes' || currentModule === 'affiliates' || currentModule === 'stock' || currentModule === 'redirects' || currentModule === 'groups' || currentModule === 'integrations' || currentModule === 'tracking' || currentModule === 'checkout' || currentModule === 'biolink') && (
            <div className="bg-[#111111] p-8 rounded-2xl border border-[#292929] space-y-4 text-center max-w-xl mx-auto my-12">
              <div className="w-12 h-12 rounded-full bg-[#EF233C]/10 text-[#EF233C] flex items-center justify-center mx-auto">
                <span className="font-black text-lg">NL</span>
              </div>
              <h2 className="text-xl font-bold text-white capitalize">Módulo: {currentModule}</h2>
              <p className="text-xs text-neutral-400">
                Este módulo da suíte Neverlose Bot está ativado e conectado aos robôs Telegram da sua conta.
              </p>
              <button
                onClick={() => setCurrentModule('dashboard')}
                className="px-6 py-2.5 rounded-xl bg-[#EF233C] text-white text-xs font-bold shadow-glow-red"
              >
                Retornar ao Dashboard
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Modal Conectar Robô */}
      <NewBotModal
        isOpen={isNewBotOpen}
        onClose={() => setIsNewBotOpen(false)}
        onBotCreated={refreshAll}
      />
    </div>
  );
}