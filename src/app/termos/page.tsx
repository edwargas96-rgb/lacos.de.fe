import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { site } from '@/config/site';

export const metadata: Metadata = { title: `Termos de Uso — ${site.brand}` };

export default function Termos() {
  return (
    <LegalPage title="Termos de Uso">
      {/* TODO: revisão jurídica antes de publicar. */}
      <h2>O que é</h2>
      <p>O {site.brand} é um conteúdo devocional e educativo com roteiros para conversas de fé em família. Não substitui acompanhamento pastoral ou profissional.</p>
      <h2>Resultados</h2>
      <p>Cada família é única e os resultados variam. Não prometemos mudanças de comportamento.</p>
      <h2>Acesso e uso</h2>
      <p>O acesso é pessoal e destinado ao uso da sua família. Não é permitido revender ou redistribuir o conteúdo. {/* TODO: revisar cláusulas de licença de uso. */}</p>
      <h2>Garantia</h2>
      <p>Você tem {site.guaranteeDays} dias, a partir da compra, para pedir o reembolso integral, sem precisar justificar. {/* TODO: descrever o procedimento de pedido de reembolso e o canal de contato. */}</p>
      <h2>Links de indicação</h2>
      <p>Algumas pessoas divulgam o produto por links de indicação (afiliados) e podem receber comissão pela venda, sem custo adicional para você.</p>
    </LegalPage>
  );
}
