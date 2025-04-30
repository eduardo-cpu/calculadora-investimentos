import React, { useEffect, useState } from 'react';

const AdBanner = ({ adSlot, format = 'auto', style = {} }) => {
  const [hasEnoughContent, setHasEnoughContent] = useState(false);

  useEffect(() => {
    // Verificar se há conteúdo suficiente na página antes de mostrar anúncios
    const checkContentAmount = () => {
      // Obter o conteúdo principal da página (excluindo cabeçalho, rodapé e os próprios anúncios)
      const contentElements = document.querySelectorAll('main p, main h1, main h2, main h3, main li, main table, main .content-element');
      
      // Considerar suficiente se houver pelo menos 3 elementos de conteúdo ou texto com mais de 300 caracteres
      let totalTextLength = 0;
      contentElements.forEach(el => {
        totalTextLength += el.textContent.trim().length;
      });
      
      setHasEnoughContent(contentElements.length >= 3 || totalTextLength > 300);
    };
    
    // Verificar após o carregamento completo da página
    setTimeout(checkContentAmount, 500);
  }, []);

  useEffect(() => {
    // Carregar script do AdSense e inicializar anúncio somente se houver conteúdo suficiente
    if (hasEnoughContent) {
      const initAd = () => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.error('Erro ao renderizar anúncio:', e);
        }
      };

      const existingScript = document.querySelector('script[src*="googlesyndication"]');
      if (existingScript) {
        initAd();
      } else {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
        script.setAttribute('data-ad-client', 'ca-pub-1059432615504954');
        script.onload = initAd;
        document.head.appendChild(script);
      }
    }
  }, [hasEnoughContent]);

  // Não exibir o anúncio se não houver conteúdo suficiente
  if (!hasEnoughContent) {
    return null;
  }

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