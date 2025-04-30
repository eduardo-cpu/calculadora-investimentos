import React, { useState } from 'react';
import Layout from './components/Layout/Layout';
import Calculator from './components/Calculator/Calculator';
import About from './components/About/About';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import Terms from './components/Terms/Terms';

function App() {
  const [currentPage, setCurrentPage] = useState('calculator');

  return (
    <Layout onNavigate={setCurrentPage}>
      <div className="container mx-auto px-4 py-8">
        {currentPage === 'calculator' && (
          <>
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
              Calculadora de Investimentos
            </h1>
            <Calculator />
          </>
        )}
        
        {currentPage === 'about' && <About />}
        {currentPage === 'privacy' && <PrivacyPolicy />}
        {currentPage === 'terms' && <Terms />}
      </div>
    </Layout>
  );
}

export default App;