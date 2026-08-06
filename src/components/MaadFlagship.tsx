import React from 'react';
import { ArrowRight, FileText, Globe, Clock, Package, Truck, CheckCircle2 } from 'lucide-react';
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

  return (
    <section 
      className="relative text-white py-12 md:py-16 border-b border-emerald-900/80 overflow-hidden bg-[#031309]"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(3, 19, 9, 0.96) 0%, rgba(3, 19, 9, 0.88) 55%, rgba(3, 19, 9, 0.45) 100%), url(${FLAGSHIP_BG_IMG})`,
        backgroundPosition: 'right bottom',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Product Photo Collage Grid matching screenshot */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-12 gap-2.5 bg-[#020d06]/80 p-2.5 rounded-2xl border border-emerald-800/80 shadow-2xl backdrop-blur-sm">
              {/* Left Main Large Image */}
              <div className="col-span-8 relative rounded-xl overflow-hidden bg-gradient-to-b from-emerald-950/80 to-black/90 border border-emerald-800/50 flex items-center justify-center p-2 group">
                <img 
                  src={MADD_JAR_IMG} 
                  alt="Maad SenTollBi Glass Jar" 
                  className="w-full h-[260px] sm:h-[300px] object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Right 3 Stacked Thumbnails */}
              <div className="col-span-4 flex flex-col gap-2.5">
                <div className="h-[82px] sm:h-[95px] rounded-lg overflow-hidden border border-emerald-800/50 bg-emerald-950/60 p-1 flex items-center justify-center">
                  <img 
                    src={MADD_BACK_LABEL_IMG} 
                    alt="Back Label & Nutrition" 
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div className="h-[82px] sm:h-[95px] rounded-lg overflow-hidden border border-emerald-800/50 bg-emerald-950/60 p-1 flex items-center justify-center">
                  <img 
                    src={MADD_TOP_VIEW_IMG} 
                    alt="Top Down Gold Lid View" 
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div className="h-[82px] sm:h-[95px] rounded-lg overflow-hidden border border-emerald-800/50 bg-emerald-950/60 p-1 flex items-center justify-center">
                  <img 
                    src={MADD_JAR_IMG} 
                    alt="Jar details" 
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column: Details & Description */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <div>
              <span className="text-[#f59e0b] text-xs font-black uppercase tracking-widest">
                {t('bestsellerTag') || 'BEST SELLER'}
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase text-white mt-1 tracking-tight leading-snug">
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
                <li key={idx} className="flex items-center gap-2 text-xs text-emerald-100 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Buttons matching screenshot */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
              <button
                type="button"
                onClick={onAddToCart}
                className="bg-[#d97706] hover:bg-[#b45309] text-white px-5 py-3 rounded-md text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md border border-amber-400/30"
              >
                <span>{t('maadBtnQuote') || 'ADD TO QUOTE'}</span>
                <FileText className="w-4 h-4 text-amber-100" />
              </button>

              <button
                type="button"
                onClick={onOpenProductSheet}
                className="border border-emerald-600/80 hover:border-white text-emerald-100 hover:text-white px-4 py-3 rounded-md text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-all bg-emerald-950/40 backdrop-blur-sm"
              >
                <span>{t('maadBtnSheet') || 'VIEW PRODUCT SHEET'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>
          </div>

          {/* Right Column: Specification Glass Box matching reference screenshot */}
          <div className="lg:col-span-3">
            <div className="bg-[#051c0f]/80 backdrop-blur-md border border-emerald-800/70 p-5 rounded-2xl shadow-2xl space-y-4 text-left">
              
              {/* Origin */}
              <div className="flex items-start gap-3 pb-3 border-b border-emerald-900/60">
                <Globe className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                    {t('specOriginLabel') || 'ORIGIN'}
                  </p>
                  <p className="text-xs font-extrabold text-white">
                    {t('specOriginVal') || 'West Africa'}
                  </p>
                </div>
              </div>

              {/* Shelf Life */}
              <div className="flex items-start gap-3 pb-3 border-b border-emerald-900/60">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                    {t('specShelfLifeLabel') || 'SHELF LIFE'}
                  </p>
                  <p className="text-xs font-extrabold text-white">
                    {t('specShelfLifeVal') || '24 months'}
                  </p>
                </div>
              </div>

              {/* MOQ */}
              <div className="flex items-start gap-3 pb-3 border-b border-emerald-900/60">
                <Package className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                    {t('specMoqLabel') || 'MOQ'}
                  </p>
                  <p className="text-xs font-extrabold text-white">
                    {t('specMoqVal') || '1 pallet'}
                  </p>
                </div>
              </div>

              {/* Delivery Time */}
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
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
    </section>
  );
};
