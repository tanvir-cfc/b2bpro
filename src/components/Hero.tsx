import React from 'react';
import { 
  ArrowRight, 
  FileText, 
  MessageSquare 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

import FULLWIDTH_HERO_BG from '../assets/images/fullwidth_hero_banner_1786003482343.png';

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
    <section className="relative bg-[#04140b] text-white overflow-hidden py-4 sm:py-12 lg:py-20 border-b border-emerald-900/60 min-h-0 sm:min-h-[580px] flex flex-col justify-between">
      
      {/* Full Width Hero Background Image (Desktop & Mobile) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src={FULLWIDTH_HERO_BG} 
          alt="SenTollBi Full Width Hero Banner" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[82%_center] sm:object-center md:object-[75%_center] lg:object-center transition-all duration-300"
        />
        {/* Subtle dark gradient overlay ONLY on the text area (left side) so text is 100% readable while the product pouches on the right remain 100% crisp and un-dimmed */}
        <div className="absolute inset-y-0 left-0 w-full md:w-2/3 bg-gradient-to-r from-[#031109]/95 via-[#031109]/80 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#04140b] to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full my-auto py-2 sm:py-4">
        
        {/* Overlaid Hero Content (Mobile & Desktop) */}
        <div className="max-w-2xl text-left space-y-3 sm:space-y-6">
          
          <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-400/40 px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest backdrop-blur-sm shadow-md">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>EXPORTATION B2B • SENTOLLBI</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-[1.18] sm:leading-[1.15] drop-shadow-xl">
            {t('heroTitleMain1') || 'PREMIUM'} <br />
            <span className="text-[#f59e0b] drop-shadow-md">
              {t('heroTitleMain2') || 'AFRICAN INGREDIENTS'}
            </span> <br />
            <span className="text-emerald-100/95">
              {t('heroTitleMain3') || 'FOR EUROPEAN PROFESSIONALS'}
            </span>
          </h1>

          <p className="text-emerald-100/90 text-xs sm:text-base font-medium max-w-xl leading-relaxed drop-shadow-md">
            {t('heroSubtitleMain') || 'Authentic products sourced directly from African regions and delivered to your business with quality, transparency and reliability.'}
          </p>

          {/* Overlaid Action Buttons */}
          <div className="flex flex-row items-center gap-2 sm:gap-4 pt-2">
            <button
              type="button"
              onClick={onOpenQuoteForm}
              className="flex-1 sm:flex-initial bg-[#d97706] hover:bg-[#b45309] text-white px-2.5 sm:px-6 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl font-black text-[10px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-1 sm:gap-2 cursor-pointer transition-all shadow-2xl border border-amber-400/40 active:scale-95 whitespace-nowrap"
            >
              <span>{t('demanderDevis') || 'REQUEST A QUOTE'}</span>
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-100 shrink-0" />
            </button>

            <button
              type="button"
              onClick={onOpenCatalog}
              className="flex-1 sm:flex-initial bg-emerald-950/80 hover:bg-emerald-900 border sm:border-2 border-emerald-400/60 hover:border-white text-emerald-100 px-2.5 sm:px-6 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-1 sm:gap-2 cursor-pointer transition-all backdrop-blur-md shadow-xl active:scale-95 whitespace-nowrap"
            >
              <span>{t('viewCatalogue') || 'VIEW CATALOGUE'}</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
            </button>
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



