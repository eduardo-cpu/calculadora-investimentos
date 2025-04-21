import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, onNavigate }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header onNavigate={onNavigate} />
      <main className="flex-grow bg-gray-50">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;