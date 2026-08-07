import React, { useState, useEffect } from 'react';
import defaultLogoImg from '../assets/images/sentollbi_logo_1785927467010.jpg';

interface LogoProps {
  className?: string;
  variant?: 'color' | 'white'; // 'color' for light background, 'white' for dark background
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'color',
  size = 'md',
  showSubtitle = true
}) => {
  const isDarkBg = variant === 'white';
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const [processedLogo, setProcessedLogo] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('sentollbi_custom_logo');
    if (saved) {
      setCustomLogo(saved);
    }

    const handleStorageChange = () => {
      setCustomLogo(localStorage.getItem('sentollbi_custom_logo'));
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('sentollbi_logo_updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('sentollbi_logo_updated', handleStorageChange);
    };
  }, []);

  const logoSrc = customLogo || defaultLogoImg;

  // Process logo image in Canvas to dynamically remove any white/light background
  useEffect(() => {
    let isMounted = true;
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = logoSrc;

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width || 300;
        canvas.height = img.naturalHeight || img.height || 100;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        // Loop through pixels and make white/near-white pixels 100% transparent
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Threshold for removing white / off-white background box
          if (r > 215 && g > 215 && b > 215) {
            data[i + 3] = 0; // Alpha = 0 (Transparent)
          } else if (isDarkBg) {
            // If rendered on a dark background, ensure dark text/shapes become bright gold/white
            if (r < 110 && g < 110 && b < 110) {
              data[i] = 245;     // R
              data[i + 1] = 158; // G
              data[i + 2] = 11;  // B (Amber Gold)
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        const transparentDataUrl = canvas.toDataURL('image/png');
        if (isMounted) {
          setProcessedLogo(transparentDataUrl);
        }
      } catch (err) {
        console.warn('Canvas background removal skipped:', err);
      }
    };

    return () => {
      isMounted = false;
    };
  }, [logoSrc, isDarkBg]);

  const sizeHeights = {
    sm: 'h-10',
    md: 'h-14 sm:h-16',
    lg: 'h-18 sm:h-20',
    xl: 'h-22 sm:h-24'
  };

  const displaySrc = processedLogo || logoSrc;

  return (
    <div className={`inline-flex flex-col items-start ${className}`}>
      <div className={`flex items-center ${sizeHeights[size]}`}>
        <img
          src={displaySrc}
          alt="SenTollBi Logo"
          referrerPolicy="no-referrer"
          className="h-full w-auto max-w-full object-contain filter drop-shadow-sm transition-all"
          style={{
            // Blend mode fallback ensures background is never visible
            mixBlendMode: isDarkBg ? 'screen' : 'multiply'
          }}
        />
      </div>

      {showSubtitle && (
        <span
          className={`text-[9px] uppercase tracking-[0.25em] font-extrabold mt-0.5 ${
            isDarkBg ? 'text-amber-400' : 'text-[#013b22]/80'
          }`}
        >
          SAVEURS D'AFRIQUE
        </span>
      )}
    </div>
  );
};

