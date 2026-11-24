import React from 'react';
import { UserCheck, MessageSquareShare, Send, Phone, Search } from 'lucide-react';
import { CustomerLead } from '../../types/neverlose';

interface CustomersViewProps {
  customers: CustomerLead[];
}

export const CustomersView: React.FC<CustomersViewProps> = ({ customers }) => {
  return (
    <div className="space-y-6">
      <div className="bg-[#111111] p-6 rounded-2xl border border-[#292929] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#EF233C] tracking-widest block">
            Base de Contatos & CRM
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
            Clientes & Remarketing Telegram
          </h1>
          <p className="text-xs text-neutral-400">
            Acompanhe histórico de compradores e ative campanhas de recuperação para PIX pendentes.
          </p>
        </div>

        <button className="bg-[#EF233C] hover:bg-[#C1122F] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-glow-red">
          <MessageSquareShare className="w-4 h-4" />
          <span>Disparar Campanha de Remarketing</span>
        </button>
      </div>

      <div className="bg-[#111111] p-6 rounded-2xl border border-[#292929] space-y-4">
        <h2 className="text-base font-bold text-white">Lista de Leads e Clientes</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#292929] text-neutral-500">
                <th className="pb-3">Cliente</th>
                <th className="pb-3">Telegram</th>
                <th className="pb-3">Último Robô</th>
                <th className="pb-3">Total Comprado</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#292929]">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-neutral-900/40">
                  <td className="py-3 font-semibold text-white">{c.name}</td>
                  <td className="py-3 font-mono text-[#EF233C]">{c.telegramUsername}</td>
                  <td className="py-3 text-neutral-400">{c.lastBot}</td>
                  <td className="py-3 font-mono font-bold text-white">
                    R$ {c.totalSpent.toFixed(2).replace('.', ',')}
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      c.status === 'comprador'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}>
                      {c.status === 'comprador' ? 'Comprador Ativo' : 'Recuperar PIX'}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button className="text-xs text-[#EF233C] hover:underline font-bold">
                      Enviar Mensagem
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};