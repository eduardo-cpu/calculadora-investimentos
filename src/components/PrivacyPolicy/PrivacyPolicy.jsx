import React from 'react';

const PrivacyPolicy = () => {
  return (
    <article className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Política de Privacidade</h2>
      <p>
        Nós respeitamos sua privacidade. Esta política descreve como coletamos, usamos e protegemos seus dados ao utilizar o InvestCalc.
      </p>
      <h3 className="text-xl font-semibold mt-6">1. Coleta de dados</h3>
      <p>Podemos coletar dados de navegação e cookies para melhorar sua experiência.</p>
      <h3 className="text-xl font-semibold mt-6">2. Uso de cookies</h3>
      <p>Utilizamos cookies para análise de tráfego e personalização de conteúdo.</p>
      <h3 className="text-xl font-semibold mt-6">3. Uso das informações</h3>
      <p>Os dados são usados para estatísticas e para melhorar as funcionalidades do site.</p>
      <h3 className="text-xl font-semibold mt-6">4. Contato</h3>
      <p>Se tiver dúvidas sobre esta política, entre em contato pelo email espaula@inf.ufsm.br.</p>
    </article>
  );
};

export default PrivacyPolicy;
