import React, { useState } from 'react';
import { 
  DollarSign, ArrowUpRight, ArrowDownLeft, Download, Filter, 
  Calendar, CheckCircle2, Clock, AlertCircle, ShieldCheck
} from 'lucide-react';
import { Transaction } from '../../types/neverlose';

interface FinanceViewProps {
  transactions: Transaction[];
}

export const FinanceView: React.FC<FinanceViewProps> = ({ transactions }) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'pago' | 'pendente'>('all');

  const filtered = transactions.filter((t) => {
    if (filterStatus === 'all') return true;
    return t.status === filterStatus;
  });

  const totalGross = transactions.filter((t) => t.status === 'pago').reduce((s, t) => s + t.amount, 0);
  const totalNet = transactions.filter((t) => t.status === 'pago').reduce((s, t) => s + t.netAmount, 0);
  const totalFees = totalGross - totalNet;
  const approvalRate = transactions.length > 0 ? (transactions.filter((t) => t.status === 'pago').length / transactions.length) * 100 : 0;

  const handleExportCSV = () => {
    const header = 'ID,Data,Robô,Cliente,Telegram,Bruto,Líquido,Gateway,Status\n';
    const rows = transactions
      .map((t) => `"${t.txId}","${t.createdAt}","${t.botName}","${t.customerName}","${t.customerTelegram}",${t.amount},${t.netAmount},"${t.gateway}","${t.status}"`)
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `extrato-neverlose-${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Financeiro */}
      <div className="bg-[#111111] p-6 rounded-2xl border border-[#292929] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#EF233C] tracking-widest block">
            Gestão Financeira & PIX
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
            Caixa & Relatórios de Vendas
          </h1>
          <p className="text-xs text-neutral-400">
            Acompanhe receitas brutas, líquidas, taxas de gateway e histórico detalhado.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 border border-[#292929] transition-colors"
        >
          <Download className="w-4 h-4 text-[#EF233C]" />
          <span>Exportar Relatório CSV</span>
        </button>
      </div>

      {/* Cards de Métricas Financeiras */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111111] p-5 rounded-2xl border border-[#292929]">
          <span className="text-xs font-bold uppercase text-neutral-400">Receita Bruta</span>
          <p className="text-2xl font-black text-white mt-1">
            R$ {totalGross.toFixed(2).replace('.', ',')}
          </p>
          <p className="text-[11px] text-emerald-400 font-semibold mt-1">100% via PIX Instantâneo</p>
        </div>

        <div className="bg-[#111111] p-5 rounded-2xl border border-[#292929]">
          <span className="text-xs font-bold uppercase text-neutral-400">Receita Líquida</span>
          <p className="text-2xl font-black text-emerald-400 mt-1">
            R$ {totalNet.toFixed(2).replace('.', ',')}
          </p>
          <p className="text-[11px] text-neutral-400 mt-1">Disponível para saque D+0</p>
        </div>

        <div className="bg-[#111111] p-5 rounded-2xl border border-[#292929]">
          <span className="text-xs font-bold uppercase text-neutral-400">Taxas Retidas</span>
          <p className="text-2xl font-black text-neutral-300 mt-1">
            R$ {totalFees.toFixed(2).replace('.', ',')}
          </p>
          <p className="text-[11px] text-neutral-500 mt-1">Média de 1.99% por PIX</p>
        </div>

        <div className="bg-[#111111] p-5 rounded-2xl border border-[#292929]">
          <span className="text-xs font-bold uppercase text-neutral-400">Taxa de Aprovação</span>
          <p className="text-2xl font-black text-[#EF233C] mt-1">{approvalRate.toFixed(1)}%</p>
          <p className="text-[11px] text-neutral-400 mt-1">Conversão de pagamentos</p>
        </div>
      </div>

      {/* Tabela de Transações */}
      <div className="bg-[#111111] p-6 rounded-2xl border border-[#292929] space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-base font-bold text-white">Extrato de Transações PIX</h2>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                filterStatus === 'all' ? 'bg-[#EF233C] text-white' : 'bg-neutral-900 text-neutral-400'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterStatus('pago')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                filterStatus === 'pago' ? 'bg-emerald-600 text-white' : 'bg-neutral-900 text-neutral-400'
              }`}
            >
              Aprovados
            </button>
            <button
              onClick={() => setFilterStatus('pendente')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                filterStatus === 'pendente' ? 'bg-amber-600 text-white' : 'bg-neutral-900 text-neutral-400'
              }`}
            >
              Pendentes
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#292929] text-neutral-500">
                <th className="pb-3">Transação</th>
                <th className="pb-3">Cliente</th>
                <th className="pb-3">Robô / Produto</th>
                <th className="pb-3">Gateway</th>
                <th className="pb-3">Valor Bruto</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#292929]">
              {filtered.map((tx) => (
                <tr key={tx.id} className="hover:bg-neutral-900/40">
                  <td className="py-3 font-mono font-bold text-[#EF233C]">{tx.txId}</td>
                  <td className="py-3">
                    <p className="font-semibold text-white">{tx.customerName}</p>
                    <p className="text-[10px] text-neutral-500">{tx.customerTelegram}</p>
                  </td>
                  <td className="py-3">
                    <p className="font-semibold text-white">{tx.productName}</p>
                    <p className="text-[10px] text-neutral-500">{tx.botName}</p>
                  </td>
                  <td className="py-3 text-neutral-400">{tx.gateway}</td>
                  <td className="py-3 font-mono font-bold text-white">
                    R$ {tx.amount.toFixed(2).replace('.', ',')}
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      tx.status === 'pago' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                      'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}>
                      {tx.status}
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