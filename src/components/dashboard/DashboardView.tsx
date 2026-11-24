import React, { useState } from 'react';
import { 
  DollarSign, CheckCircle2, TrendingUp, QrCode, Users, 
  Flame, Award, ArrowUpRight, Clock, Zap, Target
} from 'lucide-react';
import { TelegramBot, Transaction, PeriodFilter, CustomerLead } from '../../types/neverlose';

interface DashboardViewProps {
  bots: TelegramBot[];
  transactions: Transaction[];
  customers: CustomerLead[];
  onNavigate: (module: any) => void;
  onOpenNewBot: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  bots,
  transactions,
  customers,
  onNavigate,
  onOpenNewBot,
}) => {
  const [period, setPeriod] = useState<PeriodFilter>('30d');

  // Cálculos dinâmicos
  const paidTxs = transactions.filter((t) => t.status === 'pago');
  const pendingTxs = transactions.filter((t) => t.status === 'pendente');

  const totalRevenue = paidTxs.reduce((sum, t) => sum + t.amount, 0);
  const totalApprovedSales = paidTxs.length;
  const totalPixGenerated = transactions.length;
  const conversionRate = totalPixGenerated > 0 ? (totalApprovedSales / totalPixGenerated) * 100 : 0;
  const avgTicket = totalApprovedSales > 0 ? totalRevenue / totalApprovedSales : 0;
  const totalLeads = customers.length;

  return (
    <div className="space-y-6">
      {/* Top Banner & Filtros de Período */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#111111] p-5 rounded-2xl border border-[#292929] shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#EF233C] animate-ping" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#EF233C]">
              Painel Operacional Ativo
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            Visão Geral Neverlose Bot
          </h1>
          <p className="text-xs text-neutral-400">
            Acompanhamento em tempo real de vendas Telegram, robôs ativos e conversão PIX.
          </p>
        </div>

        {/* Filtros de Período */}
        <div className="flex items-center gap-1 bg-[#090909] p-1 rounded-xl border border-[#292929]">
          {(['hoje', 'ontem', '7d', '30d', 'total'] as PeriodFilter[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                period === p
                  ? 'bg-[#EF233C] text-white shadow-glow-red'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {p === '7d' ? '7 dias' : p === '30d' ? '30 dias' : p}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Métricas Principais (Cards Dark/Red) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Faturamento Total */}
        <div className="bg-[#111111] p-5 rounded-2xl border border-[#292929] relative overflow-hidden group hover:border-[#EF233C]/50 transition-all">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Faturamento Total</span>
            <div className="w-8 h-8 rounded-lg bg-[#EF233C]/10 text-[#EF233C] flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white">
            R$ {totalRevenue.toFixed(2).replace('.', ',')}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold mt-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% vs período anterior</span>
          </div>
        </div>

        {/* Vendas Aprovadas */}
        <div className="bg-[#111111] p-5 rounded-2xl border border-[#292929] relative overflow-hidden group hover:border-[#EF233C]/50 transition-all">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Vendas Aprovadas</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white">{totalApprovedSales}</p>
          <p className="text-[11px] text-neutral-400 mt-2">
            Ticket Médio: <strong className="text-white">R$ {avgTicket.toFixed(2).replace('.', ',')}</strong>
          </p>
        </div>

        {/* Taxa de Conversão PIX */}
        <div className="bg-[#111111] p-5 rounded-2xl border border-[#292929] relative overflow-hidden group hover:border-[#EF233C]/50 transition-all">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Taxa de Conversão</span>
            <div className="w-8 h-8 rounded-lg bg-[#EF233C]/10 text-[#EF233C] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-[#EF233C]">{conversionRate.toFixed(1)}%</p>
          <p className="text-[11px] text-neutral-400 mt-2">
            {paidTxs.length} pagos de {totalPixGenerated} gerados
          </p>
        </div>

        {/* Leads Capturados */}
        <div className="bg-[#111111] p-5 rounded-2xl border border-[#292929] relative overflow-hidden group hover:border-[#EF233C]/50 transition-all">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Leads no Telegram</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white">{totalLeads}</p>
          <p className="text-[11px] text-neutral-400 mt-2">
            {bots.length} robôs em operação contínua
          </p>
        </div>
      </div>

      {/* Seção Gráfica e Feed em Tempo Real */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Desempenho Visual de Faturamento */}
        <div className="lg:col-span-8 bg-[#111111] p-6 rounded-2xl border border-[#292929] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Desempenho de Receita Diária</h2>
              <p className="text-xs text-neutral-400">Curva de faturamento dos robôs conectados</p>
            </div>
            <span className="text-xs font-bold text-[#EF233C] bg-[#EF233C]/10 px-2.5 py-1 rounded-lg border border-[#EF233C]/30">
              PIX Instantâneo
            </span>
          </div>

          {/* Gráfico Simulado de Barras com Efeito Glow Vermelho */}
          <div className="h-48 flex items-end gap-2 pt-6 pb-2 border-b border-[#292929]">
            {[45, 62, 38, 85, 92, 54, 78, 110, 95, 120, 140, 160].map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                <div
                  className="w-full bg-gradient-to-t from-[#C1122F] to-[#EF233C] rounded-t-md group-hover:brightness-125 transition-all shadow-glow-red"
                  style={{ height: `${(val / 160) * 100}%` }}
                />
                <span className="text-[9px] text-neutral-500">{idx + 1}h</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 pt-2 text-center text-xs">
            <div>
              <p className="text-neutral-500 text-[10px] uppercase font-bold">PIX Gerados</p>
              <p className="font-mono font-bold text-white text-sm">{totalPixGenerated}</p>
            </div>
            <div className="border-x border-[#292929]">
              <p className="text-neutral-500 text-[10px] uppercase font-bold">Aprovados</p>
              <p className="font-mono font-bold text-emerald-400 text-sm">{totalApprovedSales}</p>
            </div>
            <div>
              <p className="text-neutral-500 text-[10px] uppercase font-bold">Pendentes / Abandonos</p>
              <p className="font-mono font-bold text-amber-400 text-sm">{pendingTxs.length}</p>
            </div>
          </div>
        </div>

        {/* Log de Atividades / Vendas em Tempo Real */}
        <div className="lg:col-span-4 bg-[#111111] p-6 rounded-2xl border border-[#292929] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#EF233C]" />
                <span>Vendas Recentes</span>
              </h2>
              <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Ao vivo
              </span>
            </div>

            <div className="space-y-3 overflow-y-auto max-h-64 pr-1">
              {transactions.slice(0, 5).map((tx) => (
                <div
                  key={tx.id}
                  className="p-3 rounded-xl bg-[#090909] border border-[#292929] flex items-center justify-between"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">{tx.customerName}</p>
                    <p className="text-[10px] text-neutral-400 truncate">{tx.productName}</p>
                    <span className="text-[9px] text-[#EF233C] font-mono">{tx.botName}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold font-mono text-white">
                      R$ {tx.amount.toFixed(2).replace('.', ',')}
                    </p>
                    <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${
                      tx.status === 'pago' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate('finance')}
            className="w-full py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <span>Ver Extrato Financeiro Completo</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Robôs Ativos & Metas de Gamificação */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Meus Robôs em Destaque */}
        <div className="lg:col-span-8 bg-[#111111] p-6 rounded-2xl border border-[#292929]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white">Robôs Telegram em Operação</h2>
              <p className="text-xs text-neutral-400">Desempenho por bot conectado à API</p>
            </div>
            <button
              onClick={onOpenNewBot}
              className="text-xs font-bold text-[#EF233C] hover:underline"
            >
              + Adicionar Robô
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#292929] text-neutral-500">
                  <th className="pb-3">Robô</th>
                  <th className="pb-3">Username</th>
                  <th className="pb-3">Vendas</th>
                  <th className="pb-3">Receita</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#292929]">
                {bots.map((b) => (
                  <tr key={b.id} className="hover:bg-neutral-900/40">
                    <td className="py-3 font-semibold text-white">{b.name}</td>
                    <td className="py-3 font-mono text-neutral-400">{b.username}</td>
                    <td className="py-3 font-bold">{b.totalSales} un</td>
                    <td className="py-3 font-mono font-bold text-emerald-400">
                      R$ {b.revenue.toFixed(2).replace('.', ',')}
                    </td>
                    <td className="py-3">
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
                        Ativo
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Metas e Ranking do Mês */}
        <div className="lg:col-span-4 bg-[#111111] p-6 rounded-2xl border border-[#292929] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-[#EF233C]" />
              <span>Liga Neverlose</span>
            </h2>
            <span className="text-[10px] font-bold text-[#EF233C] uppercase bg-[#EF233C]/10 px-2 py-0.5 rounded border border-[#EF233C]/30">
              Diamante
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#090909] border border-[#292929] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-400 font-medium">Meta R$ 150.000 / mês</span>
              <span className="font-bold text-white">70%</span>
            </div>
            <div className="w-full bg-neutral-900 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#C1122F] to-[#EF233C] h-full rounded-full shadow-glow-red"
                style={{ width: '70%' }}
              />
            </div>
            <p className="text-[10px] text-neutral-500">
              Faltam R$ 44.700 para a placa física Neverlose Master 🏆
            </p>
          </div>

          <button
            onClick={() => onNavigate('community')}
            className="w-full py-2.5 rounded-xl bg-[#EF233C] hover:bg-[#C1122F] text-white text-xs font-bold shadow-glow-red transition-all"
          >
            Ver Ranking da Comunidade
          </button>
        </div>
      </div>
    </div>
  );
};