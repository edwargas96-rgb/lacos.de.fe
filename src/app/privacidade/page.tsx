import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { site } from '@/config/site';

export const metadata: Metadata = { title: `Política de Privacidade — ${site.brand}` };

export default function Privacidade() {
  return (
    <LegalPage title="Política de Privacidade">
      {/* TODO: revisão jurídica (LGPD) antes de publicar. */}
      <p>Esta política explica, de forma simples, como o {site.brand} trata informações. Ela vale para as pessoas adultas responsáveis pela família que usam este site.</p>
      <h2>Quem usa</h2>
      <p>Este site é destinado a pais, mães e responsáveis. Não coletamos dados de crianças e não pedimos nome, idade ou qualquer informação delas.</p>
      <h2>O que fica no seu navegador</h2>
      <p>Usamos o armazenamento local (localStorage) do seu aparelho apenas para:</p>
      <ul>
        <li>lembrar as respostas do quiz e o seu progresso no Encontro 1;</li>
        <li>lembrar de qual link de indicação (afiliado) você veio, por até {site.attributionWindowDays} dias, e os parâmetros de campanha (utm_*) da visita.</li>
      </ul>
      <p>Essas informações ficam no seu aparelho e você pode apagá-las limpando os dados do navegador.</p>
      <h2>Medição de acessos</h2>
      <p>Podemos usar o Cloudflare Web Analytics para medir visitas de forma agregada, sem cookies de rastreamento entre sites. {/* TODO: confirmar texto conforme configuração final. */}</p>
      <h2>Compra e pagamento</h2>
      <p>O pagamento é feito na plataforma de checkout (Cakto), que trata os dados de pagamento sob a própria política. O acesso é enviado por WhatsApp após a compra. {/* TODO: informar controlador, base legal e prazo de retenção. */}</p>
      <h2>Seus direitos</h2>
      <p>Você pode pedir informações, correção ou exclusão dos seus dados. {/* TODO: inserir canal de contato e nome do controlador. */}</p>
    </LegalPage>
  );
}
