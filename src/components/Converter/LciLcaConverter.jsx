import React, { useState, useEffect } from 'react';
import Card from '../UI/Card';
import Input from '../UI/Input';
import Button from '../UI/Button';

const LciLcaConverter = () => {
  const [formData, setFormData] = useState({
    lciLcaRate: 90, // Taxa LCI/LCA em percentual do CDI (exemplo: 90%)
    cdbRate: 110,   // Taxa CDB em percentual do CDI (exemplo: 110%)
  });

  const [results, setResults] = useState(null);

  // Taxa IR para diferentes tipos de investimentos por prazo
  const taxRates = {
    upTo180Days: 22.5,    // Até 6 meses
    upTo360Days: 20,      // De 6 meses a 1 ano
    upTo720Days: 17.5,    // De 1 a 2 anos
    over720Days: 15       // Acima de 2 anos
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  const calculateNetRates = () => {
    const { lciLcaRate, cdbRate } = formData;
    
    // Para LCI/LCA, não há imposto, então o rendimento líquido é o mesmo do bruto
    const lciLcaNetRate = lciLcaRate;
    
    // Para CDB, calculamos o rendimento líquido após IR para cada prazo
    const cdbNetRates = {
      upTo180Days: cdbRate * (1 - taxRates.upTo180Days / 100),
      upTo360Days: cdbRate * (1 - taxRates.upTo360Days / 100),
      upTo720Days: cdbRate * (1 - taxRates.upTo720Days / 100),
      over720Days: cdbRate * (1 - taxRates.over720Days / 100)
    };
    
    // Determinar qual é melhor em cada período
    const comparison = {
      upTo180Days: lciLcaNetRate > cdbNetRates.upTo180Days ? 'lci' : 'cdb',
      upTo360Days: lciLcaNetRate > cdbNetRates.upTo360Days ? 'lci' : 'cdb',
      upTo720Days: lciLcaNetRate > cdbNetRates.upTo720Days ? 'lci' : 'cdb',
      over720Days: lciLcaNetRate > cdbNetRates.over720Days ? 'lci' : 'cdb',
    };
    
    setResults({
      lciLcaRate,
      cdbRate,
      lciLcaNetRate,
      cdbNetRates,
      comparison
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateNetRates();
  };

  // Calcular resultados ao carregar pela primeira vez
  useEffect(() => {
    calculateNetRates();
  }, []);

  return (
    <div className="space-y-8">
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Comparador de Rentabilidade LCI/LCA vs CDB</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <p className="text-gray-700 mb-4">
              LCI e LCA são <span className="font-semibold text-green-600">isentos de imposto de renda</span>, 
              enquanto CDBs são <span className="font-semibold text-red-600">tributados</span> de acordo com o prazo do investimento.
            </p>
            <p className="text-gray-700">
              Compare os rendimentos líquidos considerando os diferentes prazos e alíquotas.
            </p>
          </div>
          <div className="flex-1 bg-white p-4 rounded-lg shadow-inner">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">IR até 6 meses:</span>
              <span className="text-sm font-semibold text-red-600">22,5%</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">IR 6m a 1 ano:</span>
              <span className="text-sm font-semibold text-red-600">20,0%</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">IR 1 a 2 anos:</span>
              <span className="text-sm font-semibold text-red-600">17,5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">IR acima de 2 anos:</span>
              <span className="text-sm font-semibold text-red-600">15,0%</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="bg-white shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-3">
                  LCI
                </div>
                <h3 className="text-lg font-semibold text-blue-800">LCI / LCA</h3>
                <div className="ml-auto bg-green-100 px-2 py-1 rounded text-xs font-semibold text-green-800">
                  Isento de IR
                </div>
              </div>
              <label className="block text-sm font-medium text-blue-700 mb-1">
                Rendimento (% do CDI)
              </label>
              <div className="flex">
                <Input
                  type="number"
                  name="lciLcaRate"
                  value={formData.lciLcaRate}
                  onChange={handleChange}
                  min="0"
                  step="0.1"
                  required
                  className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <span className="flex items-center px-4 bg-blue-100 text-blue-800 font-semibold rounded-r-md">%</span>
              </div>
            </div>
            
            <div className="bg-green-50 p-5 rounded-lg border border-green-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold mr-3">
                  CDB
                </div>
                <h3 className="text-lg font-semibold text-green-800">CDB</h3>
                <div className="ml-auto bg-red-100 px-2 py-1 rounded text-xs font-semibold text-red-800">
                  Tributado (IR)
                </div>
              </div>
              <label className="block text-sm font-medium text-green-700 mb-1">
                Rendimento (% do CDI)
              </label>
              <div className="flex">
                <Input
                  type="number"
                  name="cdbRate"
                  value={formData.cdbRate}
                  onChange={handleChange}
                  min="0"
                  step="0.1"
                  required
                  className="border-green-300 focus:border-green-500 focus:ring-green-500"
                />
                <span className="flex items-center px-4 bg-green-100 text-green-800 font-semibold rounded-r-md">%</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button 
              type="submit" 
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
            >
              Calcular Rentabilidade
            </Button>
          </div>
        </form>
      </Card>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cartão para prazo até 6 meses */}
          <Card className={`border-t-4 ${results.comparison.upTo180Days === 'lci' ? 'border-blue-500' : 'border-green-500'} shadow-lg transition-all hover:shadow-xl`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">Até 6 meses</h3>
              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">180 dias</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className={`rounded-lg p-4 text-center ${results.comparison.upTo180Days === 'lci' ? 'bg-blue-100 ring-2 ring-blue-400' : 'bg-blue-50'}`}>
                <p className="font-bold text-blue-800">LCI/LCA</p>
                <p className="text-3xl font-bold text-blue-600">{results.lciLcaNetRate.toFixed(2)}%</p>
                {results.comparison.upTo180Days === 'lci' && (
                  <div className="mt-2 bg-blue-600 text-white text-xs py-1 px-2 rounded-full">
                    Melhor opção
                  </div>
                )}
              </div>
              <div className={`rounded-lg p-4 text-center ${results.comparison.upTo180Days === 'cdb' ? 'bg-green-100 ring-2 ring-green-400' : 'bg-green-50'}`}>
                <p className="font-bold text-green-800">CDB</p>
                <p className="text-3xl font-bold text-green-600">{results.cdbNetRates.upTo180Days.toFixed(2)}%</p>
                <p className="text-xs text-red-600 mt-1">IR: 22,5%</p>
                {results.comparison.upTo180Days === 'cdb' && (
                  <div className="mt-2 bg-green-600 text-white text-xs py-1 px-2 rounded-full">
                    Melhor opção
                  </div>
                )}
              </div>
            </div>
          </Card>
          
          {/* Cartão para prazo de 6 meses a 1 ano */}
          <Card className={`border-t-4 ${results.comparison.upTo360Days === 'lci' ? 'border-blue-500' : 'border-green-500'} shadow-lg transition-all hover:shadow-xl`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">De 6 meses a 1 ano</h3>
              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">181 a 360 dias</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className={`rounded-lg p-4 text-center ${results.comparison.upTo360Days === 'lci' ? 'bg-blue-100 ring-2 ring-blue-400' : 'bg-blue-50'}`}>
                <p className="font-bold text-blue-800">LCI/LCA</p>
                <p className="text-3xl font-bold text-blue-600">{results.lciLcaNetRate.toFixed(2)}%</p>
                {results.comparison.upTo360Days === 'lci' && (
                  <div className="mt-2 bg-blue-600 text-white text-xs py-1 px-2 rounded-full">
                    Melhor opção
                  </div>
                )}
              </div>
              <div className={`rounded-lg p-4 text-center ${results.comparison.upTo360Days === 'cdb' ? 'bg-green-100 ring-2 ring-green-400' : 'bg-green-50'}`}>
                <p className="font-bold text-green-800">CDB</p>
                <p className="text-3xl font-bold text-green-600">{results.cdbNetRates.upTo360Days.toFixed(2)}%</p>
                <p className="text-xs text-red-600 mt-1">IR: 20,0%</p>
                {results.comparison.upTo360Days === 'cdb' && (
                  <div className="mt-2 bg-green-600 text-white text-xs py-1 px-2 rounded-full">
                    Melhor opção
                  </div>
                )}
              </div>
            </div>
          </Card>
          
          {/* Cartão para prazo de 1 a 2 anos */}
          <Card className={`border-t-4 ${results.comparison.upTo720Days === 'lci' ? 'border-blue-500' : 'border-green-500'} shadow-lg transition-all hover:shadow-xl`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">De 1 a 2 anos</h3>
              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">361 a 720 dias</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className={`rounded-lg p-4 text-center ${results.comparison.upTo720Days === 'lci' ? 'bg-blue-100 ring-2 ring-blue-400' : 'bg-blue-50'}`}>
                <p className="font-bold text-blue-800">LCI/LCA</p>
                <p className="text-3xl font-bold text-blue-600">{results.lciLcaNetRate.toFixed(2)}%</p>
                {results.comparison.upTo720Days === 'lci' && (
                  <div className="mt-2 bg-blue-600 text-white text-xs py-1 px-2 rounded-full">
                    Melhor opção
                  </div>
                )}
              </div>
              <div className={`rounded-lg p-4 text-center ${results.comparison.upTo720Days === 'cdb' ? 'bg-green-100 ring-2 ring-green-400' : 'bg-green-50'}`}>
                <p className="font-bold text-green-800">CDB</p>
                <p className="text-3xl font-bold text-green-600">{results.cdbNetRates.upTo720Days.toFixed(2)}%</p>
                <p className="text-xs text-red-600 mt-1">IR: 17,5%</p>
                {results.comparison.upTo720Days === 'cdb' && (
                  <div className="mt-2 bg-green-600 text-white text-xs py-1 px-2 rounded-full">
                    Melhor opção
                  </div>
                )}
              </div>
            </div>
          </Card>
          
          {/* Cartão para prazo acima de 2 anos */}
          <Card className={`border-t-4 ${results.comparison.over720Days === 'lci' ? 'border-blue-500' : 'border-green-500'} shadow-lg transition-all hover:shadow-xl`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">Acima de 2 anos</h3>
              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">> 720 dias</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className={`rounded-lg p-4 text-center ${results.comparison.over720Days === 'lci' ? 'bg-blue-100 ring-2 ring-blue-400' : 'bg-blue-50'}`}>
                <p className="font-bold text-blue-800">LCI/LCA</p>
                <p className="text-3xl font-bold text-blue-600">{results.lciLcaNetRate.toFixed(2)}%</p>
                {results.comparison.over720Days === 'lci' && (
                  <div className="mt-2 bg-blue-600 text-white text-xs py-1 px-2 rounded-full">
                    Melhor opção
                  </div>
                )}
              </div>
              <div className={`rounded-lg p-4 text-center ${results.comparison.over720Days === 'cdb' ? 'bg-green-100 ring-2 ring-green-400' : 'bg-green-50'}`}>
                <p className="font-bold text-green-800">CDB</p>
                <p className="text-3xl font-bold text-green-600">{results.cdbNetRates.over720Days.toFixed(2)}%</p>
                <p className="text-xs text-red-600 mt-1">IR: 15,0%</p>
                {results.comparison.over720Days === 'cdb' && (
                  <div className="mt-2 bg-green-600 text-white text-xs py-1 px-2 rounded-full">
                    Melhor opção
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}

      <Card className="bg-gradient-to-r from-gray-50 to-gray-100 shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Entenda a comparação</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-700">
              LCI e LCA são <span className="font-semibold">investimentos de renda fixa isentos de Imposto de Renda</span> para pessoa física. 
              Essa isenção pode torná-los mais vantajosos mesmo quando oferecem percentuais do CDI menores 
              que os CDBs tributados.
            </p>
          </div>
          
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-700">
              Em prazos mais <span className="font-semibold">curtos</span>, a alíquota de IR é maior (22,5% para até 6 meses), 
              o que favorece mais os LCI/LCA isentos. Em prazos <span className="font-semibold">longos</span>, 
              a alíquota diminui (15% para mais de 2 anos), reduzindo a vantagem da isenção.
            </p>
          </div>
          
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mr-3 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-700">
              O destaque em <span className="font-semibold">verde ou azul</span> indica qual investimento oferece 
              melhor rentabilidade líquida para cada prazo, com base nos percentuais do CDI informados.
            </p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
          <h4 className="font-semibold text-yellow-800 mb-2">
            Exemplo do mercado financeiro
          </h4>
          <p className="text-sm text-yellow-800 mb-2">
            No cenário típico onde LCI/LCA paga 90% do CDI e CDB paga 110% do CDI:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-yellow-100">
                <tr>
                  <th className="py-2 px-3 text-left text-yellow-800">Prazo</th>
                  <th className="py-2 px-3 text-center text-yellow-800">LCI/LCA</th>
                  <th className="py-2 px-3 text-center text-yellow-800">CDB (após IR)</th>
                  <th className="py-2 px-3 text-center text-yellow-800">Vantagem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-yellow-200">
                <tr className="bg-yellow-50">
                  <td className="py-2 px-3 font-medium">Até 6 meses</td>
                  <td className="py-2 px-3 text-center text-blue-600 font-semibold">90,00%</td>
                  <td className="py-2 px-3 text-center">85,25%</td>
                  <td className="py-2 px-3 text-center text-blue-600 font-semibold">LCI/LCA</td>
                </tr>
                <tr className="bg-yellow-50">
                  <td className="py-2 px-3 font-medium">6 meses a 1 ano</td>
                  <td className="py-2 px-3 text-center text-blue-600 font-semibold">90,00%</td>
                  <td className="py-2 px-3 text-center">88,00%</td>
                  <td className="py-2 px-3 text-center text-blue-600 font-semibold">LCI/LCA</td>
                </tr>
                <tr className="bg-yellow-50">
                  <td className="py-2 px-3 font-medium">1 a 2 anos</td>
                  <td className="py-2 px-3 text-center">90,00%</td>
                  <td className="py-2 px-3 text-center text-green-600 font-semibold">90,75%</td>
                  <td className="py-2 px-3 text-center text-green-600 font-semibold">CDB</td>
                </tr>
                <tr className="bg-yellow-50">
                  <td className="py-2 px-3 font-medium">Acima de 2 anos</td>
                  <td className="py-2 px-3 text-center">90,00%</td>
                  <td className="py-2 px-3 text-center text-green-600 font-semibold">93,50%</td>
                  <td className="py-2 px-3 text-center text-green-600 font-semibold">CDB</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LciLcaConverter;