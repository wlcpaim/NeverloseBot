import React from 'react';
import { Trophy, Award, Flame, Target, Star, Users } from 'lucide-react';
import { SEED_RANKING } from '../../services/neverloseStorage';

export const CommunityView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-[#111111] p-6 rounded-2xl border border-[#292929] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#EF233C] tracking-widest block">
            Gamificação & Corrida de Faturamento
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
            Ranking da Comunidade Neverlose
          </h1>
          <p className="text-xs text-neutral-400">
            Dispute a liderança com as maiores operações de automação no Telegram do Brasil.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#090909] px-4 py-2 rounded-xl border border-[#292929]">
          <Trophy className="w-5 h-5 text-[#EF233C]" />
          <div>
            <p className="text-[10px] text-neutral-500 uppercase font-bold">Sua Posição</p>
            <p className="text-sm font-bold text-white">#2 Geral (Liga Diamante)</p>
          </div>
        </div>
      </div>

      {/* Tabela de Ranking */}
      <div className="bg-[#111111] p-6 rounded-2xl border border-[#292929] space-y-4">
        <h2 className="text-base font-bold text-white">Top Faturamento do Mês</h2>

        <div className="space-y-3">
          {SEED_RANKING.map((u) => (
            <div
              key={u.position}
              className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                u.isCurrentUser
                  ? 'bg-gradient-to-r from-[#EF233C]/20 to-[#111111] border-[#EF233C] shadow-glow-red'
                  : 'bg-[#090909] border-[#292929]'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs ${
                  u.position === 1 ? 'bg-amber-400 text-black' :
                  u.position === 2 ? 'bg-[#EF233C] text-white' :
                  u.position === 3 ? 'bg-neutral-300 text-black' :
                  'bg-neutral-800 text-neutral-400'
                }`}>
                  {u.position}
                </span>

                <span className="text-xl">{u.avatar}</span>

                <div>
                  <p className="font-bold text-sm text-white flex items-center gap-2">
                    <span>{u.name}</span>
                    {u.isCurrentUser && (
                      <span className="text-[9px] bg-[#EF233C] text-white font-bold px-1.5 py-0.2 rounded">
                        Você
                      </span>
                    )}
                  </p>
                  <p className="text-[11px] text-[#EF233C] font-semibold">{u.badge}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-mono text-base font-black text-emerald-400">
                  R$ {u.revenue.toFixed(2).replace('.', ',')}
                </p>
                <span className="text-[10px] text-neutral-500 uppercase font-bold">
                  {u.league}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};