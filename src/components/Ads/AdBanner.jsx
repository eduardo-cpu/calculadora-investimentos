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
    <div className="ad-container my-4">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Substitua pelo seu ID de editor
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
      <small className="text-gray-400 text-xs text-center block mt-1">Publicidade</small>
    </div>
  );
};

export default AdBanner;