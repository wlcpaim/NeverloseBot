import React from 'react';
import { Menu, Plus, Bell, ShieldCheck, ChevronDown, Flame } from 'lucide-react';
import { TelegramBot } from '../../types/neverlose';

interface HeaderProps {
  onOpenMobileSidebar: () => void;
  bots: TelegramBot[];
  selectedBotId: string;
  onSelectBot: (botId: string) => void;
  onOpenNewBotModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileSidebar,
  bots,
  selectedBotId,
  onSelectBot,
  onOpenNewBotModal,
}) => {
  return (
    <header className="sticky top-0 z-30 h-16 bg-[#090909]/95 backdrop-blur-md border-b border-[#292929] px-4 sm:px-6 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 text-neutral-400 hover:text-white rounded-lg lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Seletor de Robô Ativo */}
        <div className="relative flex items-center gap-2 bg-[#111111] border border-[#292929] rounded-xl px-3 py-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <select
            value={selectedBotId}
            onChange={(e) => onSelectBot(e.target.value)}
            className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer pr-4"
          >
            <option value="all" className="bg-[#111111]">Todos os Robôs (Visão Geral)</option>
            {bots.map((b) => (
              <option key={b.id} value={b.id} className="bg-[#111111]">
                {b.name} ({b.username})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="flex items-center gap-3">
        {/* Botão Novo Robô */}
        <button
          onClick={onOpenNewBotModal}
          className="bg-[#EF233C] hover:bg-[#C1122F] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-glow-red transition-all active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Conectar Robô</span>
        </button>

        {/* Indicador de Status PIX */}
        <div className="hidden md:flex items-center gap-2 bg-[#111111] border border-[#292929] px-3 py-1.5 rounded-xl text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-[11px] text-neutral-300">PushinPay: <strong>Ativo</strong></span>
        </div>

        {/* Notificações */}
        <button
          className="relative p-2 rounded-xl bg-[#111111] border border-[#292929] text-neutral-400 hover:text-white transition-colors"
          title="Notificações"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#EF233C]" />
        </button>
      </div>
    </header>
  );
};