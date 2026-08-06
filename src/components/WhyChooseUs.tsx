import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  Headphones 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { MissionSection } from './MissionSection';

export const WhyChooseUs: React.FC = () => {
  const { t } = useLanguage();

  const pillars = [
    {
      icon: Building2,
      title: t('whyPillar1Title') || 'DIRECT SOURCING',
      description: t('whyPillar1Desc') || 'Sourced directly from trusted local agricultural producers in West Africa.'
    },
    {
      icon: Award,
      title: t('whyPillar2Title') || 'PREMIUM QUALITY',
      description: t('whyPillar2Desc') || 'Rigorous quality control and carefully selected 100% natural raw products.'
    },
    {
      icon: ShieldCheck,
      title: t('whyPillar3Title') || 'COMPLIANCE & SAFETY',
      description: t('whyPillar3Desc') || 'Certified according to European & international safety standards (HACCP, ISO).'
    },
    {
      icon: TrendingUp,
      title: t('whyPillar4Title') || 'COMPETITIVE PRICES',
      description: t('whyPillar4Desc') || 'Direct wholesale pricing providing the best value for your commercial margin.'
    },
    {
      icon: Headphones,
      title: t('whyPillar5Title') || 'DEDICATED SUPPORT',
      description: t('whyPillar5Desc') || 'Personalized B2B customer support assisting you from quote to final delivery.'
    }
  ];

  return (
    <div className="bg-white">
      {/* 5 Pillars Section */}
      <section className="py-14 bg-gray-50/50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-[#d97706] mb-1">
              EXCELLENCE & RELIABILITY
            </p>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#0b2416] tracking-tight">
              {t('whyTitle') || 'WHY CHOOSE SENTOLL BI DISTRIBUTION ?'}
            </h2>
            <p className="text-gray-600 text-sm mt-2 font-medium">
              {t('whySubtitle') || 'Your reliable gateway for authentic African products in Europe.'}
            </p>
            <div className="w-16 h-1 bg-[#d97706] mx-auto mt-3 rounded-full"></div>
          </div>

          {/* 5 Pillars Horizontal Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {pillars.map((item, index) => (
              <div 
                key={index} 
                className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm transition-all hover:shadow-md hover:border-emerald-500/30 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0b2416] text-amber-400 flex items-center justify-center shrink-0 shadow-sm">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase text-[#0b2416] tracking-wider mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Dedicated Mission Section matching reference screenshot */}
      <MissionSection />
    </div>
  );
};

