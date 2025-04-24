import React, { useState } from 'react';
import InvestmentForm from './InvestmentForm';
import ResultsSummary from './ResultsSummary';
import GrowthChart from '../Charts/GrowthChart';
import InflationChart from '../Charts/InflationChart';
import InvestmentBreakdownChart from '../Charts/InvestmentBreakdownChart';
import MonthlyReturnChart from '../Charts/MonthlyReturnChart';
import AdBanner from '../Ads/AdBanner';
import { calculateInvestment } from '../../utils/calculateInvestment';
import { calculateInflationImpact } from '../../utils/calculateInflationImpact';
import Card from '../UI/Card';

const Calculator = () => {
  const [results, setResults] = useState(null);

  const handleCalculate = (formData) => {
    // Calcular investimento
    const investmentResults = calculateInvestment(
      parseFloat(formData.initialAmount),
      parseFloat(formData.monthlyContribution),
      parseFloat(formData.interestRate) / 100,
      parseInt(formData.timeInYears)
    );

    // Calcular impacto da inflação
    const inflationImpact = calculateInflationImpact(
      investmentResults.totalAmount,
      parseFloat(formData.estimatedInflation) / 100,
      parseInt(formData.timeInYears)
    );

    setResults({
      ...investmentResults,
      ...inflationImpact,
      formData
    });
  };

  return (
    <div className="space-y-8">
      {/* Conteúdo educacional adicionado antes da calculadora */}
      <Card>
        <h2 className="text-xl font-bold mb-4">Planeje seu Futuro Financeiro</h2>
        <p className="text-gray-700 mb-4">
          Os juros compostos são frequentemente chamados de "oitava maravilha do mundo". Pequenas 
          quantias investidas regularmente podem se transformar em um patrimônio significativo ao longo do tempo.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-700 mb-2">Você sabia?</h3>
          <p className="text-gray-700">
            Um investimento de R$1.000 com rendimento de 10% ao ano pode se transformar em R$7.328 em 20 anos 
            graças ao poder dos juros compostos. Se você adicionar R$200 mensais, esse valor pode chegar a 
            R$151.874!
          </p>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card>
          <InvestmentForm onCalculate={handleCalculate} />
        </Card>

        {results ? (
          <Card>
            <ResultsSummary results={results} />
          </Card>
        ) : (
          <Card>
            <h3 className="text-lg font-semibold mb-4">Como interpretar os resultados</h3>
            <p className="text-gray-700 mb-3">
              Após preencher o formulário ao lado e clicar em "Calcular", você verá:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>O valor total acumulado ao final do período</li>
              <li>Quanto desse valor veio dos seus aportes e quanto são rendimentos</li>
              <li>O valor do rendimento mensal que seu patrimônio gerará</li>
              <li>Como a inflação afetará seu poder de compra futuro</li>
              <li>Gráficos detalhados mostrando a evolução do seu investimento</li>
            </ul>
          </Card>
        )}
      </div>

      {/* Banner de anúncio exibido apenas quando houver resultados */}
      {results && <AdBanner adSlot="1234567890" />}

      {/* Conteúdo educacional adicional que aparece sempre - independente se há resultados */}
      <Card>
        <h2 className="text-xl font-bold mb-4">Conceitos Importantes de Investimentos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Juros Compostos</h3>
            <p className="text-gray-700">
              É o fenômeno onde os juros gerados são reinvestidos, gerando mais juros sobre juros 
              ao longo do tempo. Este é o principal fator de crescimento de investimentos de longo prazo.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Inflação</h3>
            <p className="text-gray-700">
              Representa a perda de poder de compra da moeda ao longo do tempo. Para um investimento ser 
              realmente lucrativo, seu rendimento deve superar a taxa de inflação do período.
            </p>
          </div>
        </div>
      </Card>

      {results && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card>
              <h3 className="text-lg font-semibold mb-4">Crescimento do Investimento</h3>
              <GrowthChart results={results} />
            </Card>
            
            <Card>
              <h3 className="text-lg font-semibold mb-4">Rendimento Mensal</h3>
              <MonthlyReturnChart results={results} />
            </Card>
          </div>
          
          {/* Banner de anúncio entre os gráficos - também condicionado à existência de resultados */}
          {results && <AdBanner adSlot="0987654321" />}
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card>
              <h3 className="text-lg font-semibold mb-4">Impacto da Inflação</h3>
              <InflationChart results={results} />
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-4">Composição do Investimento</h3>
              <InvestmentBreakdownChart results={results} />
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;