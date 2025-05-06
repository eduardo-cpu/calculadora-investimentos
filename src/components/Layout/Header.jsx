import React, { useState } from 'react';

const Header = ({ onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-blue-600 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 
            className="text-white text-2xl font-bold cursor-pointer" 
            onClick={() => {
              onNavigate('calculator');
              setMenuOpen(false);
            }}
          >
            InvestCalc
          </h1>

          {/* Botão de menu para dispositivos móveis */}
          <button 
            className="md:hidden text-white focus:outline-none" 
            onClick={toggleMenu}
            aria-label="Menu"
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Menu para desktop - visível apenas em telas médias e grandes */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
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
                    onNavigate('lci-lca-converter');
                  }}
                >
                  Conversor LCI/LCA
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

        {/* Menu mobile - visível apenas quando menuOpen for true */}
        {menuOpen && (
          <nav className="md:hidden mt-4 pb-2">
            <ul className="flex flex-col space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-white hover:text-blue-200 transition block"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('calculator');
                    setMenuOpen(false);
                  }}
                >
                  Início
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-white hover:text-blue-200 transition block"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('lci-lca-converter');
                    setMenuOpen(false);
                  }}
                >
                  Conversor LCI/LCA
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-white hover:text-blue-200 transition block"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('about');
                    setMenuOpen(false);
                  }}
                >
                  Sobre
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-white hover:text-blue-200 transition block"
                  onClick={(e) => { 
                    e.preventDefault(); 
                    onNavigate('privacy'); 
                    setMenuOpen(false);
                  }}
                >
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-white hover:text-blue-200 transition block"
                  onClick={(e) => { 
                    e.preventDefault(); 
                    onNavigate('terms'); 
                    setMenuOpen(false);
                  }}
                >
                  Termos de Serviço
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;