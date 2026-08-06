import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  Headphones, 
  Globe2 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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
    <section className="py-16 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
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

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left/Middle 5 Pillars Grid */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
            {pillars.map((item, index) => (
              <div 
                key={index} 
                className={`p-5 rounded-2xl border transition-all hover:shadow-lg ${
                  index === 4 ? 'sm:col-span-2 bg-amber-50/50 border-amber-200' : 'bg-gray-50/80 border-gray-200'
                }`}
              >
                <div className="flex items-start gap-3.5">
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

          {/* Right Highlight Box with Africa Map Graphic */}
          <div className="lg:col-span-4">
            <div className="bg-[#0b2416] text-white p-6 sm:p-8 rounded-2xl border border-emerald-900 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[360px]">
              {/* Background Africa Vector */}
              <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
                <Globe2 className="w-72 h-72 text-emerald-400" />
              </div>

              <div className="relative z-10 space-y-4">
                <span className="inline-block bg-amber-500 text-gray-950 font-black text-[10px] px-2.5 py-1 rounded uppercase tracking-wider">
                  OUR MISSION
                </span>

                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white leading-tight">
                  FROM AFRICA TO EUROPE WITH EXCELLENCE
                </h3>

                <p className="text-emerald-100/90 text-xs leading-relaxed font-normal">
                  Building strong, transparent partnerships between African producers and European businesses for sustainable and long-term commercial growth.
                </p>
              </div>

              <div className="relative z-10 pt-6 border-t border-emerald-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse"></div>
                  <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    Connecting Dakar & Europe Daily
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
