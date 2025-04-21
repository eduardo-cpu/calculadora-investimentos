import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { SpeedInsights } from '@vercel/speed-insights/next';

const Layout = ({ children, onNavigate }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header onNavigate={onNavigate} />
      <main className="flex-grow bg-gray-50">
        {children}
      </main>
      <Footer />
      <SpeedInsights />
    </div>
  );
};

export default Layout;