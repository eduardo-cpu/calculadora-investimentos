import React from 'react';

const Terms = () => {
  return (
    <article className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Termos de Serviço</h2>
      <p>
        Ao utilizar o InvestCalc, você concorda com os termos e condições descritos neste documento.
      </p>
      <h3 className="text-xl font-semibold mt-6">1. Aceitação dos Termos</h3>
      <p>Este serviço está disponível sob reserva de direitos, sujeita aos termos aqui descritos.</p>
      <h3 className="text-xl font-semibold mt-6">2. Uso do Serviço</h3>
      <p>Você deve utilizar a calculadora apenas para fins lícitos e não comerciais.</p>
      <h3 className="text-xl font-semibold mt-6">3. Propriedade Intelectual</h3>
      <p>Todo conteúdo e código-fonte do InvestCalc são protegidos por direitos autorais.</p>
      <h3 className="text-xl font-semibold mt-6">4. Modificações</h3>
      <p>Podemos alterar estes termos a qualquer momento; atualizações serão publicadas nesta página.</p>
      <h3 className="text-xl font-semibold mt-6">5. Contato</h3>
      <p>Para dúvidas, envie email para contato@investcalc.com.</p>
    </article>
  );
};

export default Terms;