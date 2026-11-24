import React, { useState } from 'react';
import { Disc, Sparkles, Gift, Play } from 'lucide-react';

export const RouletteView: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSpin = () => {
    setSpinning(true);
    setResult(null);
    setTimeout(() => {
      setSpinning(false);
      setResult('50% DE DESCONTO VIP');
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#111111] p-6 rounded-2xl border border-[#292929]">
        <span className="text-[10px] uppercase font-bold text-[#EF233C] tracking-widest block">
          Ferramenta de Engajamento
        </span>
        <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
          Roleta Hot & Gamificação
        </h1>
        <p className="text-xs text-neutral-400">
          Dispare a roleta dentro dos seus robôs do Telegram para aumentar a retenção e gerar conversões imediatas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-6 bg-[#111111] p-8 rounded-2xl border border-[#292929] text-center space-y-6">
          <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
            <div className={`w-44 h-44 rounded-full border-4 border-[#EF233C] bg-gradient-to-tr from-[#C1122F] via-[#EF233C] to-[#FF5364] shadow-glow-red flex items-center justify-center text-white ${
              spinning ? 'animate-spin' : ''
            }`}>
              <Disc className="w-24 h-24" />
            </div>
            <div className="absolute w-4 h-4 bg-white rounded-full border-2 border-[#EF233C]" />
          </div>

          <div>
            <button
              onClick={handleSpin}
              disabled={spinning}
              className="px-8 py-3 rounded-full bg-[#EF233C] hover:bg-[#C1122F] text-white font-black text-xs uppercase shadow-glow-red transition-all active:scale-95 disabled:opacity-50"
            >
              {spinning ? 'Girando a Roleta...' : 'Testar Roleta no Telegram'}
            </button>
          </div>

          {result && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-bold animate-in fade-in">
              🎉 Prêmio Sorteado: {result}
            </div>
          )}
        </div>

        <div className="md:col-span-6 bg-[#111111] p-6 rounded-2xl border border-[#292929] space-y-4 text-xs text-neutral-300">
          <h3 className="font-bold text-sm text-white">Configurações de Prêmios da Roleta</h3>
          <div className="space-y-2">
            <div className="p-3 bg-[#090909] rounded-xl border border-[#292929] flex justify-between">
              <span>50% Desconto VIP</span>
              <span className="text-[#EF233C] font-bold">15% de chance</span>
            </div>
            <div className="p-3 bg-[#090909] rounded-xl border border-[#292929] flex justify-between">
              <span>Cupom R$ 20 OFF</span>
              <span className="text-[#EF233C] font-bold">35% de chance</span>
            </div>
            <div className="p-3 bg-[#090909] rounded-xl border border-[#292929] flex justify-between">
              <span>Tente Novamente</span>
              <span className="text-neutral-500 font-bold">50% de chance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};