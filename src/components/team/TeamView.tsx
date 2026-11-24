import React from 'react';
import { Users2, HelpCircle, Plus, Mail, Shield, CheckCircle } from 'lucide-react';
import { SupportTicket } from '../../types/neverlose';

interface TeamViewProps {
  tickets: SupportTicket[];
}

export const TeamView: React.FC<TeamViewProps> = ({ tickets }) => {
  return (
    <div className="space-y-6">
      <div className="bg-[#111111] p-6 rounded-2xl border border-[#292929] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#EF233C] tracking-widest block">
            Gestão Interna & Atendimento
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
            Equipe & Chamados de Suporte
          </h1>
          <p className="text-xs text-neutral-400">
            Controle permissões de operadores e responda solicitações de clientes em tempo real.
          </p>
        </div>

        <button className="bg-[#EF233C] hover:bg-[#C1122F] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-glow-red">
          <Plus className="w-4 h-4" />
          <span>Convidar Membro de Equipe</span>
        </button>
      </div>

      <div className="bg-[#111111] p-6 rounded-2xl border border-[#292929] space-y-4">
        <h2 className="text-base font-bold text-white">Chamados Recentes</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#292929] text-neutral-500">
                <th className="pb-3">Ticket</th>
                <th className="pb-3">Assunto</th>
                <th className="pb-3">Cliente</th>
                <th className="pb-3">Prioridade</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#292929]">
              {tickets.map((t) => (
                <tr key={t.id} className="hover:bg-neutral-900/40">
                  <td className="py-3 font-mono font-bold text-[#EF233C]">{t.ticketNumber}</td>
                  <td className="py-3 font-medium text-white">{t.subject}</td>
                  <td className="py-3 text-neutral-400">{t.customer}</td>
                  <td className="py-3">
                    <span className="text-[10px] uppercase font-bold text-amber-400">
                      {t.priority}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      t.status === 'resolvido' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-indigo-500/10 text-indigo-400'
                    }`}>
                      {t.status}
                    </span>
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