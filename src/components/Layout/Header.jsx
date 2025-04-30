import React from 'react';

const Header = ({ onNavigate }) => {
  return (
    <header className="bg-blue-600 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 
          className="text-white text-2xl font-bold cursor-pointer" 
          onClick={() => onNavigate('calculator')}
        >
          InvestCalc
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a 
                href="#" 
                className="text-white hover:text-blue-200 transition"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('calculator');
                }}
              >
                Início
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="text-white hover:text-blue-200 transition"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('about');
                }}
              >
                Sobre
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="text-white hover:text-blue-200 transition"
                onClick={(e) => { e.preventDefault(); onNavigate('privacy'); }}
              >
                Política de Privacidade
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="text-white hover:text-blue-200 transition"
                onClick={(e) => { e.preventDefault(); onNavigate('terms'); }}
              >
                Termos de Serviço
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;