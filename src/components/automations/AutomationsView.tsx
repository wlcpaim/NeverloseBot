import React from 'react';
import { GitFork, Zap, Plus, Play, Clock, ArrowRight, MessageSquare, CheckCircle } from 'lucide-react';
import { AutomationFlow } from '../../types/neverlose';

interface AutomationsViewProps {
  flows: AutomationFlow[];
}

export const AutomationsView: React.FC<AutomationsViewProps> = ({ flows }) => {
  return (
    <div className="space-y-6">
      <div className="bg-[#111111] p-6 rounded-2xl border border-[#292929] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#EF233C] tracking-widest block">
            Automações & Funis
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
            Fluxos de Conversão Automática
          </h1>
          <p className="text-xs text-neutral-400">
            Configure gatilhos, mensagens automáticas, recuperação de PIX e upsell direto no Telegram.
          </p>
        </div>

        <button className="bg-[#EF233C] hover:bg-[#C1122F] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-glow-red">
          <Plus className="w-4 h-4" />
          <span>Criar Novo Fluxo</span>
        </button>
      </div>

      <div className="space-y-4">
        {flows.map((flow) => (
          <div
            key={flow.id}
            className="bg-[#111111] p-5 rounded-2xl border border-[#292929] hover:border-[#EF233C]/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#EF233C]/10 text-[#EF233C] flex items-center justify-center shrink-0">
                <GitFork className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">{flow.name}</h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Gatilho: <strong className="text-neutral-200">{flow.trigger}</strong>
                </p>
                <div className="flex items-center gap-3 text-[11px] text-neutral-500 mt-2">
                  <span>{flow.stepsCount} etapas no funil</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-semibold">{flow.conversions} vendas convertidas</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">
                Ativo
              </span>
              <button className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-semibold rounded-lg border border-[#292929]">
                Editar Funil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};