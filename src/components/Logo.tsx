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

  const sizeHeights = {
    sm: 'h-8',
    md: 'h-11',
    lg: 'h-14',
    xl: 'h-16'
  };

  const logoSrc = customLogo || defaultLogoImg;

  return (
    <div className={`inline-flex flex-col items-start ${className}`}>
      <div className={`flex items-center ${sizeHeights[size]}`}>
        <img
          src={logoSrc}
          alt="SenTollBi Logo"
          referrerPolicy="no-referrer"
          className="h-full w-auto max-w-full object-contain"
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
