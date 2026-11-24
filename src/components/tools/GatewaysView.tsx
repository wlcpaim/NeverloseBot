import React from 'react';
import { CreditCard, CheckCircle2, ShieldAlert, Key, Plus } from 'lucide-react';
import { GatewayConfig } from '../../types/neverlose';

interface GatewaysViewProps {
  gateways: GatewayConfig[];
}

export const GatewaysView: React.FC<GatewaysViewProps> = ({ gateways }) => {
  return (
    <div className="space-y-6">
      <div className="bg-[#111111] p-6 rounded-2xl border border-[#292929] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#EF233C] tracking-widest block">
            Gateways de Pagamento PIX
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
            Integrações Financeiras
          </h1>
          <p className="text-xs text-neutral-400">
            Conecte suas credenciais para geração de QR Code PIX com split e liquidação imediata.
          </p>
        </div>

        <button className="bg-[#EF233C] hover:bg-[#C1122F] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-glow-red">
          <Plus className="w-4 h-4" />
          <span>Conectar Novo Gateway</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {gateways.map((gw) => (
          <div
            key={gw.id}
            className="bg-[#111111] p-6 rounded-2xl border border-[#292929] hover:border-[#EF233C]/40 transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-base text-white">{gw.provider}</h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  gw.active
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-neutral-800 text-neutral-500'
                }`}>
                  {gw.active ? 'Ativo' : 'Desativado'}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-[#090909] rounded-xl border border-[#292929] font-mono text-[11px] text-neutral-300 truncate">
                  API Key: {gw.apiKey.slice(0, 16)}...
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Taxa PIX:</span>
                  <span className="text-white font-bold">{gw.pixFeePercentage}%</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Taxa Fixa:</span>
                  <span className="text-white font-bold">R$ {gw.fixedFee.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
            </div>

            <button className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-semibold rounded-xl border border-[#292929] transition-colors">
              Gerenciar Chaves
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};