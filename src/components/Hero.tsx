import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  PackageCheck, 
  Tag, 
  ShieldCheck, 
  Headphones,
  Award
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onOpenQuoteForm: () => void;
  onOpenCatalog: () => void;
  onDownloadCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenQuoteForm,
  onOpenCatalog,
  onDownloadCatalog
}) => {
  const { t } = useLanguage();

  return (
    <section className="relative bg-gradient-to-b from-[#022c19] via-[#013b22] to-[#042d1b] text-white overflow-hidden py-12 lg:py-16">
      {/* Background Subtle Mesh Patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-900/80 border border-emerald-500/40 text-amber-300 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide">
              <Award className="w-4 h-4 text-amber-400" />
              <span>{t('heroBadge')}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-[1.15]">
              {t('heroTitle1')} <br className="hidden sm:inline" />
              <span className="text-amber-400 underline decoration-amber-500/40 underline-offset-4">
                {t('heroTitle2')}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-emerald-100 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
              {t('heroSubtitle')}
            </p>

            {/* Trust Bulletins Grid matching screenshot */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 pt-2 text-left">
              {[
                { icon: PackageCheck, text: 'LIVRAISON PALETTE ou conteneur' },
                { icon: Tag, text: 'MARQUE DISTRIBUTEUR (MDD) & WHITE LABEL' },
                { icon: ShieldCheck, text: 'CONDITIONS B2B avantageuses' },
                { icon: Headphones, text: 'SERVICE PRO dédié 5j/7' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 bg-emerald-950/40 border border-emerald-800/60 p-2.5 rounded-lg">
                  <item.icon className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-xs font-bold text-emerald-50 uppercase tracking-wider leading-snug">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button
                type="button"
                onClick={onOpenQuoteForm}
                className="w-full sm:w-auto bg-[#ea580c] hover:bg-[#c2410c] text-white px-7 py-3.5 rounded-xl font-extrabold text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-orange-950/50 flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <span>{t('requestCustomQuote')}</span>
                <ArrowRight className="w-4 h-4 text-amber-200 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onOpenCatalog}
                className="w-full sm:w-auto border-2 border-emerald-300/40 hover:border-white text-emerald-50 hover:bg-white/10 px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>{t('exploreCatalog')}</span>
              </button>
            </div>

            {/* Guarantee Tagline */}
            <div className="flex items-center gap-3 text-xs text-emerald-300/90 pt-1">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Réponse sous 24h ouvrées — Tarification dégressive selon volumes</span>
            </div>

          </div>

          {/* Right Product Banner Collage Column */}
          <div className="lg:col-span-5 relative">
            {/* Visual Glassmorphism Packaging Frame */}
            <div className="relative mx-auto max-w-md lg:max-w-none bg-gradient-to-tr from-emerald-900/60 to-emerald-800/20 p-4 sm:p-6 rounded-2xl border border-emerald-500/30 shadow-2xl backdrop-blur-sm">
              
              {/* Product Showcase Cards Row */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                
                {/* Product 1: Madd Glass Jar */}
                <div 
                  onClick={onOpenCatalog}
                  className="bg-white/90 rounded-xl p-3 text-gray-900 shadow-md border border-amber-200 group hover:scale-[1.02] transition-transform cursor-pointer"
                >
                  <div className="relative h-32 sm:h-36 rounded-lg bg-amber-50 p-1 flex items-center justify-center">
                    <img 
                      src="https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&q=80&w=400" 
                      alt="Madd 100% Naturel Pot 250g" 
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-1.5 left-1.5 bg-[#ea580c] text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase">
                      Bocal 250g
                    </span>
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-xs font-black text-[#013b22] uppercase tracking-tight">Madd 100% Naturel</p>
                    <p className="text-[10px] text-amber-700 font-bold mt-0.5">Dès 5,40 € / pot</p>
                  </div>
                </div>

                {/* Product 2: Café Touba */}
                <div 
                  onClick={onOpenCatalog}
                  className="bg-white/90 rounded-xl p-3 text-gray-900 shadow-md border border-amber-200 group hover:scale-[1.02] transition-transform cursor-pointer"
                >
                  <div className="relative h-32 sm:h-36 rounded-lg bg-amber-900/10 p-1 flex items-center justify-center">
                    <img 
                      src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400" 
                      alt="Café Touba Moulu 250g" 
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-1.5 left-1.5 bg-[#013b22] text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase">
                      Épices Djar
                    </span>
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-xs font-black text-[#013b22] uppercase tracking-tight">Café Touba Moulu</p>
                    <p className="text-[10px] text-amber-700 font-bold mt-0.5">Dès 4,50 € / pot</p>
                  </div>
                </div>

                {/* Product 3: Bissap Poudre */}
                <div 
                  onClick={onOpenCatalog}
                  className="bg-white/90 rounded-xl p-3 text-gray-900 shadow-md border border-amber-200 group hover:scale-[1.02] transition-transform cursor-pointer"
                >
                  <div className="relative h-32 sm:h-36 rounded-lg bg-rose-50 p-1 flex items-center justify-center">
                    <img 
                      src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400" 
                      alt="Bissap Hibiscus Poudre 250g" 
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-1.5 left-1.5 bg-rose-700 text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase">
                      Hibiscus
                    </span>
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-xs font-black text-[#013b22] uppercase tracking-tight">Bissap en Poudre</p>
                    <p className="text-[10px] text-amber-700 font-bold mt-0.5">Dès 4,00 € / pot</p>
                  </div>
                </div>

                {/* Product 4: Mangue Séchée Sachet */}
                <div 
                  onClick={onOpenCatalog}
                  className="bg-white/90 rounded-xl p-3 text-gray-900 shadow-md border border-amber-200 group hover:scale-[1.02] transition-transform cursor-pointer"
                >
                  <div className="relative h-32 sm:h-36 rounded-lg bg-amber-100 p-1 flex items-center justify-center">
                    <img 
                      src="https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&q=80&w=400" 
                      alt="Mangue Séchée Sachet 100g" 
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-1.5 left-1.5 bg-amber-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase">
                      Sachet 100g
                    </span>
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-xs font-black text-[#013b22] uppercase tracking-tight">Mangue Séchée</p>
                    <p className="text-[10px] text-amber-700 font-bold mt-0.5">Dès 3,70 € / sachet</p>
                  </div>
                </div>

              </div>

              {/* Quality Label Stamp floating overlay */}
              <div className="absolute -bottom-4 -right-4 bg-[#ea580c] text-white p-3 rounded-2xl shadow-xl flex items-center gap-2.5 border-2 border-white">
                <div className="bg-white text-[#ea580c] p-1.5 rounded-full font-black text-xs">
                  100%
                </div>
                <div className="text-[11px] leading-tight font-extrabold pr-1">
                  Qualité Certifiée <br />
                  <span className="text-amber-200 uppercase font-black text-[10px]">Normes Européennes</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

