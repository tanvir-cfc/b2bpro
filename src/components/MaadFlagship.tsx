import React, { useState } from 'react';
import { ArrowRight, FileText, Globe, Clock, Package, Truck, CheckCircle2, Sparkles, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

import MADD_JAR_IMG from '../assets/images/sentollbi_madd_jar_1785606193943.jpg';
import MADD_BACK_LABEL_IMG from '../assets/images/madd_back_label_1786008866710.jpg';
import MADD_TOP_VIEW_IMG from '../assets/images/madd_top_view_1786008887316.jpg';
import FLAGSHIP_BG_IMG from '../assets/images/maad_flagship_bg_1786008838490.jpg';

interface MaadFlagshipProps {
  onAddToCart: () => void;
  onOpenProductSheet: () => void;
}

export const MaadFlagship: React.FC<MaadFlagshipProps> = ({
  onAddToCart,
  onOpenProductSheet
}) => {
  const { t } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const galleryImages = [
    { id: 'main', src: MADD_JAR_IMG, label: 'JAR FRONT', alt: 'Front View Jar' },
    { id: 'label', src: MADD_BACK_LABEL_IMG, label: 'NUTRITION', alt: 'Nutrition & Label' },
    { id: 'top', src: MADD_TOP_VIEW_IMG, label: 'GOLD LID', alt: 'Gold Lid Top View' }
  ];

  const currentImage = galleryImages[activeImageIndex] || galleryImages[0];

  return (
    <section 
      className="relative text-white py-8 sm:py-12 md:py-16 border-b border-emerald-900/80 overflow-hidden bg-[#031309]"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(3, 19, 9, 0.97) 0%, rgba(3, 19, 9, 0.9) 55%, rgba(3, 19, 9, 0.5) 100%), url(${FLAGSHIP_BG_IMG})`,
        backgroundPosition: 'center right',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          
          {/* Left Column: Highly Organized Product Photo Showcase */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-[#020d06]/90 p-3 sm:p-4 rounded-2xl border border-emerald-800/80 shadow-2xl backdrop-blur-md space-y-3">
              
              {/* Main Active Image Display */}
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-b from-emerald-950/90 via-[#03140a] to-black border border-emerald-800/60 flex items-center justify-center p-4 sm:p-6 group min-h-[250px] sm:min-h-[310px]">
                {/* Top Status Tag */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-amber-500/90 text-gray-950 text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md">
                  <Sparkles className="w-3 h-3 text-gray-950" />
                  <span>100% NATURAL</span>
                </div>

                {/* Main Product Image */}
                <img 
                  src={currentImage.src} 
                  alt={currentImage.alt} 
                  className="w-full h-[220px] sm:h-[280px] object-contain drop-shadow-2xl transition-all duration-300 transform group-hover:scale-105"
                />

                {/* View Badge overlay bottom right */}
                <span className="absolute bottom-3 right-3 z-10 bg-emerald-950/80 border border-emerald-700/60 text-emerald-200 text-[10px] font-black uppercase px-2 py-0.5 rounded-md backdrop-blur-sm">
                  {currentImage.label}
                </span>
              </div>

              {/* Organized Thumbnails Selector */}
              <div className="grid grid-cols-3 gap-2">
                {galleryImages.map((imgItem, idx) => {
                  const isActive = activeImageIndex === idx;
                  return (
                    <button
                      key={imgItem.id}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative flex flex-col items-center justify-center p-1 rounded-xl border transition-all cursor-pointer bg-emerald-950/60 group ${
                        isActive
                          ? 'border-amber-400 ring-2 ring-amber-400/50 bg-emerald-900/80 shadow-lg scale-[0.98]'
                          : 'border-emerald-800/60 opacity-75 hover:opacity-100 hover:border-emerald-500 hover:bg-emerald-950'
                      }`}
                    >
                      <div className="w-full h-[55px] sm:h-[70px] rounded-lg overflow-hidden flex items-center justify-center bg-black/40">
                        <img 
                          src={imgItem.src} 
                          alt={imgItem.alt} 
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <span className={`text-[9px] font-black uppercase tracking-wider mt-1 ${isActive ? 'text-amber-400' : 'text-emerald-300/80'}`}>
                        {imgItem.label}
                      </span>
                    </button>
                  );
                })}
              </div>

            </div>
          </div>

          {/* Middle Column: Details & Description */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <div>
              <span className="inline-block bg-amber-500/20 text-[#f59e0b] border border-amber-500/40 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest mb-1">
                {t('bestsellerTag') || 'BEST SELLER'}
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase text-white tracking-tight leading-snug">
                {t('maadTitle') || 'MAAD – OUR FLAGSHIP PRODUCT'}
              </h2>
            </div>

            <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed font-normal">
              {t('maadDescription') || 'Maad is a wild fruit from the savannah of West Africa. Rich in nutrients, vitamins and antioxidants, it is appreciated for its unique taste and numerous benefits.'}
            </p>

            {/* Checkmark List matching screenshot */}
            <ul className="space-y-2 pt-1">
              {[
                t('maadCheck1') || 'Rich in essential vitamins',
                t('maadCheck2') || '100% Natural & No additives',
                t('maadCheck3') || 'Exceptional taste & aroma',
                t('maadCheck4') || 'Premium quality selected fruits'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-emerald-100 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Buttons matching screenshot */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={onAddToCart}
                className="bg-[#d97706] hover:bg-[#b45309] text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md border border-amber-400/40 active:scale-95"
              >
                <span>{t('maadBtnQuote') || 'ADD TO QUOTE'}</span>
                <FileText className="w-4 h-4 text-amber-100" />
              </button>

              <button
                type="button"
                onClick={onOpenProductSheet}
                className="border border-emerald-600/80 hover:border-white text-emerald-100 hover:text-white px-4 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-all bg-emerald-950/60 backdrop-blur-sm active:scale-95"
              >
                <span>{t('maadBtnSheet') || 'VIEW PRODUCT SHEET'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>
          </div>

          {/* Right Column: Specification Glass Box Organized neatly */}
          <div className="lg:col-span-3 w-full">
            <div className="bg-[#051c0f]/90 backdrop-blur-md border border-emerald-800/80 p-4 sm:p-5 rounded-2xl shadow-2xl text-left">
              <div className="flex items-center gap-1.5 text-amber-400 font-black text-xs uppercase tracking-wider mb-3 pb-2 border-b border-emerald-800/60">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Product Specifications</span>
              </div>

              {/* 2x2 grid on mobile, stacked list on desktop */}
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
                
                {/* Origin */}
                <div className="flex items-start gap-2.5 pb-2 lg:pb-3 border-b-0 lg:border-b border-emerald-900/60">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[9px] sm:text-[10px] font-black uppercase text-amber-400 tracking-wider">
                      {t('specOriginLabel') || 'ORIGIN'}
                    </p>
                    <p className="text-xs font-extrabold text-white">
                      {t('specOriginVal') || 'West Africa'}
                    </p>
                  </div>
                </div>

                {/* Shelf Life */}
                <div className="flex items-start gap-2.5 pb-2 lg:pb-3 border-b-0 lg:border-b border-emerald-900/60">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[9px] sm:text-[10px] font-black uppercase text-amber-400 tracking-wider">
                      {t('specShelfLifeLabel') || 'SHELF LIFE'}
                    </p>
                    <p className="text-xs font-extrabold text-white">
                      {t('specShelfLifeVal') || '24 months'}
                    </p>
                  </div>
                </div>

                {/* MOQ */}
                <div className="flex items-start gap-2.5 pb-2 lg:pb-3 border-b-0 lg:border-b border-emerald-900/60">
                  <Package className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[9px] sm:text-[10px] font-black uppercase text-amber-400 tracking-wider">
                      {t('specMoqLabel') || 'MOQ'}
                    </p>
                    <p className="text-xs font-extrabold text-white">
                      {t('specMoqVal') || '1 pallet'}
                    </p>
                  </div>
                </div>

                {/* Delivery Time */}
                <div className="flex items-start gap-2.5">
                  <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[9px] sm:text-[10px] font-black uppercase text-amber-400 tracking-wider">
                      {t('specDeliveryLabel') || 'DELIVERY TIME'}
                    </p>
                    <p className="text-xs font-extrabold text-white">
                      {t('specDeliveryVal') || '7 – 14 days'}
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
