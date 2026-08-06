import React from 'react';
import { 
  Building2, 
  Award, 
  Factory, 
  CreditCard, 
  FileText 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ValueProps: React.FC = () => {
  const { t } = useLanguage();

  const props = [
    {
      icon: Building2,
      title: t('vp1Title') || 'TRUSTED PARTNER',
      subtitle: t('vp1Sub') || 'of European businesses'
    },
    {
      icon: Award,
      title: t('vp2Title') || 'QUALITY CERTIFIED',
      subtitle: t('vp2Sub') || 'International standards'
    },
    {
      icon: Factory,
      title: t('vp3Title') || 'HIGH PRODUCTION CAPACITY',
      subtitle: t('vp3Sub') || 'Up to 20,000+ jars per day'
    },
    {
      icon: CreditCard,
      title: t('vp4Title') || 'SECURE PAYMENT',
      subtitle: t('vp4Sub') || 'Safe & flexible options'
    },
    {
      icon: FileText,
      title: t('vp5Title') || 'DOCUMENTATION SUPPORT',
      subtitle: t('vp5Sub') || 'All export documents provided'
    }
  ];

  return (
    <section className="bg-white border-b border-gray-200 py-6 px-4 sm:px-6 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {props.map((p, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 p-3 bg-gray-50/80 rounded-xl border border-gray-200/80 hover:border-amber-400 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#0b2416]/10 flex items-center justify-center text-[#0b2416] group-hover:bg-[#0b2416] group-hover:text-amber-400 transition-colors shrink-0">
                <p.icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-[11px] font-black uppercase text-gray-900 tracking-tight leading-snug">
                  {p.title}
                </h3>
                <p className="text-[10px] text-gray-500 font-medium truncate">
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

