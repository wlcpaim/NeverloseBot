# Neverlose Bot — Plataforma de Automação & Vendas Telegram

Uma plataforma completa para gestão, automação e conversão de vendas no Telegram com integração nativa a gateways PIX, controle de funis, remarketing e gamificação em tema Dark Red (#EF233C).

---

## 🔴 Identidade Visual Premium
- **Fundo principal:** `#090909`
- **Fundo dos cards:** `#111111`
- **Vermelho principal:** `#EF233C`
- **Vermelho secundário:** `#C1122F`
- **Vermelho claro:** `#FF5364`
- **Bordas sutis:** `#292929`
- **Textos:** `#FFFFFF`
- **Textos secundários:** `#999999`

---

## ⚡ Estrutura e Módulos Implementados

### 1. Principal
- **Dashboard:** Métricas completas (faturamento total, vendas aprovadas, taxa de conversão PIX, leads capturados, ticket médio, gráfico de receita, atividades ao vivo e ranking de premiações).
- **Financeiro:** Receita bruta e líquida, taxas de gateway, exportação CSV e histórico de transações.
- **Equipe & Suporte:** Chamados de atendimento e membros operadores.
- **Comunidade:** Liga Diamante, ranking dos maiores faturamentos e premiações.

### 2. Operações
- **Meus Robôs:** Conexão de bots Telegram via token @BotFather, monitoramento de status, vendas por bot e assinantes.
- **Automações & Fluxos:** Funis de boas-vindas, downsell e recuperação rápida.
- **Clientes & Remarketing:** Gestão de compradores e recuperação ativa de PIX pendentes.

### 3. Ferramentas
- **Gateways PIX:** Configuração de PushinPay, MercadoPago, Asaas, Efí e EzzePay.
- **Webhooks:** Endpoints de entrega e confirmação em tempo real.
- **Roleta Hot:** Gamificação com cupons de desconto para engajar usuários no Telegram.

---

## 💾 Persistência
- Schema relacional SQL completo em `database/schema.sql` com políticas RLS.
- Armazenamento reativo em `src/services/neverloseStorage.ts` sincronizado em tempo real.