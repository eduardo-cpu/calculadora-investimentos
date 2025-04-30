import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import AdBanner from '../Ads/AdBanner';

const Layout = ({ children, onNavigate }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header onNavigate={onNavigate} />
      <main className="flex-grow bg-gray-50">
        {children}
        <AdBanner adSlot="1234567890" />
      </main>
      <Footer />
      <SpeedInsights />
      <Analytics />
    </div>
  );
};

export default Layout;