import React, { useState } from 'react';
import { Bot, Plus, Key, MessageSquare, Play, Pause, ExternalLink, ShieldCheck, Zap } from 'lucide-react';
import { TelegramBot } from '../../types/neverlose';

interface BotsViewProps {
  bots: TelegramBot[];
  onOpenNewBotModal: () => void;
}

export const BotsView: React.FC<BotsViewProps> = ({ bots, onOpenNewBotModal }) => {
  return (
    <div className="space-y-6">
      {/* Top Banner Robôs */}
      <div className="bg-[#111111] p-6 rounded-2xl border border-[#292929] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#EF233C] tracking-widest block">
            Telegram Bot API Engine
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
            Meus Robôs Telegram
          </h1>
          <p className="text-xs text-neutral-400">
            Conecte novos bots pelo token do @BotFather e gerencie fluxos de venda automáticos.
          </p>
        </div>

        <button
          onClick={onOpenNewBotModal}
          className="bg-[#EF233C] hover:bg-[#C1122F] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-glow-red transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Criar / Conectar Novo Robô</span>
        </button>
      </div>

      {/* Grid de Robôs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bots.map((bot) => (
          <div
            key={bot.id}
            className="bg-[#111111] p-6 rounded-2xl border border-[#292929] hover:border-[#EF233C]/50 transition-all flex flex-col justify-between space-y-5 group"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#EF233C]/20 to-transparent border border-[#EF233C]/40 flex items-center justify-center text-[#EF233C] group-hover:scale-105 transition-transform">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Operando
                </span>
              </div>

              <div className="mt-4">
                <h3 className="font-bold text-base text-white">{bot.name}</h3>
                <a
                  href={`https://t.me/${bot.username.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[#EF233C] font-mono hover:underline flex items-center gap-1 mt-0.5"
                >
                  <span>{bot.username}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Informações Técnicas */}
              <div className="mt-4 p-3 rounded-xl bg-[#090909] border border-[#292929] space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Token:</span>
                  <span className="font-mono text-neutral-300">{bot.tokenMasked}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Fluxo Ativo:</span>
                  <span className="text-white font-medium truncate max-w-[140px]">{bot.activeFlow}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Assinantes:</span>
                  <span className="text-white font-bold">{bot.subscribers}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#292929] flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-bold text-neutral-500">Faturamento</p>
                <p className="font-mono text-sm font-bold text-emerald-400">
                  R$ {bot.revenue.toFixed(2).replace('.', ',')}
                </p>
              </div>

              <button
                className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-semibold rounded-lg border border-[#292929] transition-colors"
              >
                Configurações
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};