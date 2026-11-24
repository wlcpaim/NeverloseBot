import React from 'react';
import { Webhook, Plus, CheckCircle, RefreshCw, Send } from 'lucide-react';
import { WebhookConfig } from '../../types/neverlose';

interface WebhooksViewProps {
  webhooks: WebhookConfig[];
}

export const WebhooksView: React.FC<WebhooksViewProps> = ({ webhooks }) => {
  return (
    <div className="space-y-6">
      <div className="bg-[#111111] p-6 rounded-2xl border border-[#292929] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#EF233C] tracking-widest block">
            Endpoints & Eventos
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
            Webhooks de Confirmação
          </h1>
          <p className="text-xs text-neutral-400">
            Receba eventos de pagamentos PIX aprovados e dispare entregas no Telegram.
          </p>
        </div>

        <button className="bg-[#EF233C] hover:bg-[#C1122F] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-glow-red">
          <Plus className="w-4 h-4" />
          <span>Cadastrar Webhook</span>
        </button>
      </div>

      <div className="space-y-4">
        {webhooks.map((wh) => (
          <div
            key={wh.id}
            className="bg-[#111111] p-5 rounded-2xl border border-[#292929] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-sm text-white">{wh.name}</h3>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                  HTTP {wh.lastStatus} OK
                </span>
              </div>
              <p className="font-mono text-xs text-[#EF233C] mt-1 truncate max-w-md">
                {wh.url}
              </p>
              <div className="flex items-center gap-3 text-[11px] text-neutral-500 mt-2">
                <span>{wh.totalDeliveries} entregas registradas</span>
                <span>•</span>
                <span>Eventos: {wh.events.join(', ')}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg border border-[#292929]">
                Testar Payload
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};