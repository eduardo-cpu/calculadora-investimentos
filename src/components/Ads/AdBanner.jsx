import React, { useEffect } from 'react';

const AdBanner = ({ adSlot, format = 'auto', style = {} }) => {
  useEffect(() => {
    try {
      // Verifica se AdSense já foi inicializado
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error('Erro ao renderizar anúncio:', e);
    }
  }, []);

  return (
    <div className="ad-container my-6 border border-gray-200 rounded-lg p-1 bg-gray-50">
      <div className="flex justify-center items-center py-1 bg-gray-100 rounded-t-lg">
        <span className="text-gray-500 text-xs font-medium">PUBLICIDADE</span>
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '150px', ...style }}
        data-ad-client="ca-pub-1059432615504954" // Seu ID de editor real
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdBanner;