import React, { useState } from 'react';
import { X, Bot, Key, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { saveBot } from '../../services/neverloseStorage';

interface NewBotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBotCreated: () => void;
}

export const NewBotModal: React.FC<NewBotModalProps> = ({ isOpen, onClose, onBotCreated }) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('Olá! Seja muito bem-vindo ao nosso robô oficial. Escolha seu plano abaixo:');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !username || !token) {
      alert('Preencha os campos obrigatórios.');
      return;
    }
    setLoading(true);

    saveBot({
      name,
      username,
      tokenMasked: `${token.slice(0, 10)}...${token.slice(-4)}`,
      status: 'active',
      activeFlow: 'Fluxo Funil Principal',
    });

    setLoading(false);
    onBotCreated();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#111111] rounded-3xl max-w-lg w-full shadow-2xl border border-[#292929] relative p-6 sm:p-8 space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-900"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#EF233C] to-[#C1122F] flex items-center justify-center shadow-glow-red">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Conectar Robô Telegram</h2>
            <p className="text-xs text-neutral-400">Insira as credenciais geradas pelo @BotFather</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-neutral-300 font-semibold block mb-1">Nome do Robô *</label>
            <input
              type="text"
              required
              placeholder="Ex: Neverlose VIP Club"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#292929] bg-[#090909] text-white focus:outline-none focus:border-[#EF233C]"
            />
          </div>

          <div>
            <label className="text-neutral-300 font-semibold block mb-1">Username do Bot (@) *</label>
            <input
              type="text"
              required
              placeholder="@meu_robo_bot"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#292929] bg-[#090909] text-white focus:outline-none focus:border-[#EF233C]"
            />
          </div>

          <div>
            <label className="text-neutral-300 font-semibold block mb-1">API Token Telegram *</label>
            <input
              type="password"
              required
              placeholder="7192847291:AAHkL9..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#292929] bg-[#090909] text-white focus:outline-none focus:border-[#EF233C] font-mono text-[11px]"
            />
          </div>

          <div>
            <label className="text-neutral-300 font-semibold block mb-1">Mensagem de Boas-Vindas (/start)</label>
            <textarea
              rows={3}
              value={welcomeMessage}
              onChange={(e) => setWelcomeMessage(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#292929] bg-[#090909] text-white focus:outline-none focus:border-[#EF233C]"
            />
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-[#EF233C] hover:bg-[#C1122F] text-white font-bold text-xs shadow-glow-red flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Conectando...' : 'Ativar e Iniciar Operação'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-neutral-900 text-neutral-300 font-semibold hover:bg-neutral-800"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};