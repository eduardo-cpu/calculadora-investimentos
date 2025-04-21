import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} InvestCalc. Todos os direitos reservados.</p>
        <p className="mt-2 text-sm text-gray-400">Esta é uma ferramenta educacional. Não constitui conselho financeiro.</p>
      </div>
    </footer>
  );
};

export default Footer;