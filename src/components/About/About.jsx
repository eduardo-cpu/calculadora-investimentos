import React from 'react';
import Card from '../UI/Card';
import AdBanner from '../Ads/AdBanner';

const About = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Sobre a Calculadora de Investimentos
      </h1>
      
      <Card>
        <h2 className="text-xl font-bold mb-4">O que é o InvestCalc?</h2>
        <p className="text-gray-700 mb-4">
          O InvestCalc é uma ferramenta completa para simulação de investimentos que permite 
          calcular o rendimento de aplicações financeiras considerando juros compostos e inflação.
        </p>
        <p className="text-gray-700 mb-4">
          Desenvolvida com React e Tailwind CSS, esta calculadora ajuda investidores a visualizar 
          o crescimento de seus investimentos ao longo do tempo e entender o impacto real da inflação 
          sobre seu poder de compra futuro.
        </p>
      </Card>

      {/* Banner de anúncio após a introdução */}
      <AdBanner adSlot="3456789012" />

      <Card>
        <h2 className="text-xl font-bold mb-4">Funcionalidades</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Cálculo detalhado de investimentos com aportes mensais</li>
          <li>Visualização gráfica do crescimento do patrimônio</li>
          <li>Análise do rendimento mensal ao longo do tempo</li>
          <li>Cálculo do impacto da inflação no poder de compra</li>
          <li>Detalhamento da composição do investimento (principal vs. rendimentos)</li>
          <li>Interface intuitiva e responsiva para todos os dispositivos</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-xl font-bold mb-4">Como Utilizar</h2>
        <ol className="list-decimal pl-5 space-y-2 text-gray-700">
          <li>Informe o valor inicial do seu investimento</li>
          <li>Defina o valor do aporte mensal (caso planeje fazer aportes regulares)</li>
          <li>Insira a taxa de juros anual esperada para seu investimento</li>
          <li>Escolha o período de tempo em anos</li>
          <li>Defina a taxa de inflação estimada</li>
          <li>Clique em "Calcular Investimento" para ver os resultados</li>
        </ol>
        <p className="mt-4 text-gray-700">
          Os resultados incluem gráficos interativos e uma análise detalhada que mostra quanto 
          você terá acumulado e quanto será o rendimento mensal no final do período.
        </p>
      </Card>

      {/* Banner de anúncio no meio do conteúdo */}
      <AdBanner adSlot="5678901234" />

      <Card>
        <h2 className="text-xl font-bold mb-4">Tecnologias Utilizadas</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-100 p-3 rounded-lg text-center">
            <p className="font-bold">React</p>
            <p className="text-sm text-gray-600">Frontend</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg text-center">
            <p className="font-bold">Tailwind CSS</p>
            <p className="text-sm text-gray-600">Estilização</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg text-center">
            <p className="font-bold">Chart.js</p>
            <p className="text-sm text-gray-600">Visualização de dados</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg text-center">
            <p className="font-bold">Vite</p>
            <p className="text-sm text-gray-600">Build tool</p>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold mb-4">Informações Importantes</h2>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <p className="text-yellow-700">
            Esta calculadora fornece projeções baseadas nos valores informados e serve apenas 
            como uma ferramenta educacional. Decisões de investimentos devem ser tomadas com 
            orientação de profissionais qualificados em finanças.
          </p>
        </div>
        <p className="mt-4 text-gray-700">
          Os cálculos assumem uma taxa de juros constante ao longo do período, o que pode 
          não refletir as condições reais do mercado que variam com o tempo.
        </p>
      </Card>

      <Card>
        <h2 className="text-xl font-bold mb-4">Contato</h2>
        <p className="text-gray-700">
          Para dúvidas, sugestões ou relatórios de problemas, entre em contato através do e-mail:
          <a href="mailto:contato@investcalc.com.br" className="text-blue-600 ml-1 hover:underline">
            contato@investcalc.com.br
          </a>
        </p>
      </Card>

      <div className="text-center text-gray-500 text-sm mt-8">
        <p>Versão 1.0 - Última atualização: Abril 2025</p>
      </div>
    </div>
  );
};

export default About;