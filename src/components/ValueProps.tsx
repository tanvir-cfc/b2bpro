import React from 'react';
import { 
  Sparkles, 
  Award, 
  Building2, 
  Truck 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ValueProps: React.FC = () => {
  const { t } = useLanguage();

  const props = [
    {
      icon: Sparkles,
      title: t('vp1Title') || '100% NATUREL',
      subtitle: t('vp1Sub') || 'Sans additifs'
    },
    {
      icon: Award,
      title: t('vp2Title') || 'QUALITÉ SUPÉRIEURE',
      subtitle: t('vp2Sub') || 'Soigneusement sélectionnés'
    },
    {
      icon: Building2,
      title: t('vp3Title') || 'VENTE EN GROS B2B',
      subtitle: t('vp3Sub') || 'Meilleurs prix'
    },
    {
      icon: Truck,
      title: t('vp4Title') || 'LIVRAISON RAPIDE',
      subtitle: t('vp4Sub') || "Dans toute l'Europe"
    }
  ];

  return (
    <section className="bg-[#0b2416] border-y border-emerald-900/80 py-5 sm:py-6 px-4 sm:px-6 shadow-md text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {props.map((p, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 p-3.5 bg-emerald-950/60 rounded-xl border border-emerald-800/60 hover:border-amber-400/60 hover:bg-emerald-900/50 transition-all group shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-gray-950 transition-all shrink-0 shadow-sm">
                <p.icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-black uppercase text-amber-300 tracking-tight leading-snug">
                  {p.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-emerald-100/90 font-medium truncate">
                  {p.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


