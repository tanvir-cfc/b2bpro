import React from 'react';
import { 
  ArrowRight, 
  FileText, 
  Leaf, 
  Award, 
  Tag, 
  Truck, 
  MessageSquare 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

import FULLWIDTH_HERO_BG from '../assets/images/fullwidth_hero_banner_1786003482343.jpg';

interface HeroProps {
  onOpenQuoteForm: () => void;
  onOpenCatalog: () => void;
  onDownloadCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenQuoteForm,
  onOpenCatalog
}) => {
  const { t } = useLanguage();

  return (
    <section className="relative bg-[#04140b] text-white overflow-hidden py-12 lg:py-20 border-b border-emerald-900/60 min-h-[580px] flex flex-col justify-between">
      
      {/* Full Width Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={FULLWIDTH_HERO_BG} 
          alt="SenTollBi Full Width Hero Banner" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark gradient on the left half to guarantee readability of white typography while showing products on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#031109] via-[#031109]/85 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#031109] via-transparent to-[#031109]/40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full my-auto">
        <div className="max-w-2xl text-left space-y-6">
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-[1.12] drop-shadow-md">
            {t('heroTitleMain1') || 'PREMIUM'} <br />
            <span className="text-[#f59e0b]">{t('heroTitleMain2') || 'AFRICAN INGREDIENTS'}</span> <br />
            {t('heroTitleMain3') || 'FOR EUROPEAN PROFESSIONALS'}
          </h1>

          <p className="text-emerald-100/90 text-sm sm:text-base font-normal max-w-xl leading-relaxed drop-shadow-sm">
            {t('heroSubtitleMain') || 'Authentic products sourced directly from African regions and delivered to your business with quality, transparency and reliability.'}
          </p>

          {/* Overlaid Action Buttons matching reference image */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              type="button"
              onClick={onOpenQuoteForm}
              className="bg-[#d97706] hover:bg-[#b45309] text-white px-7 py-3.5 rounded-md font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xl border border-amber-400/30"
            >
              <span>{t('demanderDevis') || 'REQUEST A QUOTE'}</span>
              <FileText className="w-4 h-4 text-amber-100" />
            </button>

            <button
              type="button"
              onClick={onOpenCatalog}
              className="bg-emerald-950/60 hover:bg-emerald-900/80 border-2 border-emerald-400/50 hover:border-white text-emerald-100 px-6 py-3.5 rounded-md font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all backdrop-blur-sm shadow-lg"
            >
              <span>{t('viewCatalogue') || 'VIEW CATALOGUE'}</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Hero 4 Badges Bar matching reference image */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-8 mt-8 border-t border-emerald-900/60">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          
          <div className="flex items-center gap-3 bg-[#03140a]/80 border border-emerald-800/80 p-3 rounded-lg backdrop-blur-md">
            <Leaf className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-black uppercase text-white">{t('badge100Natural') || '100% NATURAL'}</p>
              <p className="text-[11px] text-emerald-300">{t('badgeNoAdditives') || 'No additives'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#03140a]/80 border border-emerald-800/80 p-3 rounded-lg backdrop-blur-md">
            <Award className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-black uppercase text-white">{t('badgePremiumQuality') || 'PREMIUM QUALITY'}</p>
              <p className="text-[11px] text-emerald-300">{t('badgeCarefullySelected') || 'Carefully selected'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#03140a]/80 border border-emerald-800/80 p-3 rounded-lg backdrop-blur-md">
            <Tag className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-black uppercase text-white">{t('badgeWholesale') || 'B2B WHOLESALE'}</p>
              <p className="text-[11px] text-emerald-300">{t('badgeBestPrices') || 'Best prices'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#03140a]/80 border border-emerald-800/80 p-3 rounded-lg backdrop-blur-md">
            <Truck className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-black uppercase text-white">{t('badgeFastDelivery') || 'FAST DELIVERY'}</p>
              <p className="text-[11px] text-emerald-300">{t('badgeToAllEurope') || 'To all Europe'}</p>
            </div>
          </div>

        </div>
      </div>

      {/* Floating WhatsApp Widget Icon */}
      <a
        href="https://wa.me/393520674106"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#16a34a] hover:bg-[#15803d] text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 border-2 border-white cursor-pointer group"
        aria-label="WhatsApp Contact"
        title="Contact us on WhatsApp (+39 352 067 4106)"
      >
        <MessageSquare className="w-6 h-6 fill-white text-white transition-transform group-hover:scale-110" />
      </a>

    </section>
  );
};



