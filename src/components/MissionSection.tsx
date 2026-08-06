import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import TRADE_MAP_BG from '../assets/images/africa_europe_trade_map_1786027599115.jpg';

export const MissionSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative w-full bg-[#020d06] text-white py-12 sm:py-20 overflow-hidden border-t border-b border-emerald-900/80">
      
      {/* Background Trade Map Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={TRADE_MAP_BG} 
          alt="SenTollBi Dakar to Europe Trade Network Map" 
          className="w-full h-full object-cover object-center scale-105 opacity-90"
        />
        {/* Dark gradient overlay on the left to guarantee readability for the mission card */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020d06] via-[#020d06]/85 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#020d06] via-transparent to-[#020d06]/50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[460px] sm:min-h-[540px]">
          
          {/* Left Column: Glassmorphic Mission Card (Exact match to reference design) */}
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="bg-[#03180d]/90 border border-emerald-800/80 p-6 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-md relative overflow-hidden">
              
              {/* Background Watermark Pattern */}
              <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
                <div className="w-64 h-64 rounded-full border-[16px] border-emerald-400 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full border-[8px] border-amber-400"></div>
                </div>
              </div>

              <div className="relative z-10 space-y-5 text-left">
                {/* Badge */}
                <div>
                  <span className="inline-block bg-[#f59e0b] text-[#020d06] font-black text-xs uppercase tracking-widest px-4 py-2 rounded-xl shadow-md border border-amber-300/40">
                    {t('ourMission') || 'OUR MISSION'}
                  </span>
                </div>

                {/* Main Heading */}
                <h2 className="text-2xl sm:text-4xl lg:text-4xl xl:text-5xl font-black uppercase text-white tracking-tight leading-[1.12] drop-shadow-md">
                  {t('missionTitleLine1') || 'FROM AFRICA TO'} <br />
                  {t('missionTitleLine2') || 'EUROPE WITH'} <br />
                  <span className="text-white">{t('missionTitleLine3') || 'EXCELLENCE'}</span>
                </h2>

                {/* Description */}
                <p className="text-emerald-100/90 text-sm sm:text-base font-medium leading-relaxed max-w-md drop-shadow-sm">
                  {t('missionSubtitle') || 'Building strong, transparent partnerships between African producers and European businesses for sustainable and long-term commercial growth.'}
                </p>

                {/* Bottom Divider & Pulse Indicator */}
                <div className="pt-6 mt-8 border-t border-emerald-800/70 flex items-center gap-3">
                  <span className="relative flex h-3.5 w-3.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-400 shadow-[0_0_12px_#f59e0b]"></span>
                  </span>
                  <p className="text-amber-400 font-extrabold text-xs sm:text-sm uppercase tracking-[0.18em] drop-shadow-sm">
                    {t('missionConnectingText') || 'CONNECTING DAKAR & EUROPE DAILY'}
                  </p>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: Interactive Map Hub Points & Connections (Desktop & Mobile) */}
          <div className="lg:col-span-6 xl:col-span-7 relative hidden sm:block h-[400px] sm:h-[500px]">
            {/* SVG Arc Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 800 500" fill="none">
              <defs>
                <linearGradient id="goldArcGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#fbbf24" stopOpacity="1" />
                  <stop offset="100%" stopColor="#d97706" stopOpacity="0.7" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Dakar (320, 240) to Paris (540, 100) */}
              <path d="M 320 240 Q 400 130 540 100" stroke="url(#goldArcGrad)" strokeWidth="2.5" fill="none" filter="url(#glow)" strokeDasharray="6 3" className="animate-pulse" />
              
              {/* Dakar (320, 240) to Bruxelles (590, 115) */}
              <path d="M 320 240 Q 440 140 590 115" stroke="url(#goldArcGrad)" strokeWidth="2" fill="none" filter="url(#glow)" />
              
              {/* Dakar (320, 240) to Amsterdam (640, 75) */}
              <path d="M 320 240 Q 470 120 640 75" stroke="url(#goldArcGrad)" strokeWidth="2" fill="none" filter="url(#glow)" strokeDasharray="4 2" />

              {/* Abidjan (390, 310) to Paris (540, 100) */}
              <path d="M 390 310 Q 470 180 540 100" stroke="url(#goldArcGrad)" strokeWidth="1.5" strokeOpacity="0.8" fill="none" />

              {/* Accra (440, 340) to Bruxelles (590, 115) */}
              <path d="M 440 340 Q 520 200 590 115" stroke="url(#goldArcGrad)" strokeWidth="1.5" strokeOpacity="0.8" fill="none" />

              {/* Douala (540, 380) to Paris (540, 100) */}
              <path d="M 540 380 Q 570 240 540 100" stroke="url(#goldArcGrad)" strokeWidth="1.5" strokeOpacity="0.7" fill="none" />
            </svg>

            {/* City Nodes */}
            {/* DAKAR (Primary Hub) */}
            <div className="absolute top-[48%] left-[38%] transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 z-20 group cursor-pointer">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-90"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-400 shadow-[0_0_15px_#f59e0b] border-2 border-[#020d06]"></span>
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-amber-300 bg-[#020d06]/80 px-2.5 py-1 rounded-md border border-amber-400/50 shadow-lg">
                DAKAR
              </span>
            </div>

            {/* ABIDJAN */}
            <div className="absolute top-[62%] left-[47%] transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 z-20">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] border border-[#020d06]"></span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-200/90 bg-[#020d06]/70 px-1.5 py-0.5 rounded">
                ABIDJAN
              </span>
            </div>

            {/* ACCRA */}
            <div className="absolute top-[68%] left-[53%] transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 z-20">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] border border-[#020d06]"></span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-200/90 bg-[#020d06]/70 px-1.5 py-0.5 rounded">
                ACCRA
              </span>
            </div>

            {/* DOUALA */}
            <div className="absolute top-[76%] left-[65%] transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 z-20">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] border border-[#020d06]"></span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-200/90 bg-[#020d06]/70 px-1.5 py-0.5 rounded">
                DOUALA
              </span>
            </div>

            {/* PARIS */}
            <div className="absolute top-[20%] left-[67%] transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 z-20">
              <span className="w-3 h-3 rounded-full bg-amber-300 shadow-[0_0_10px_#f59e0b] border border-[#020d06]"></span>
              <span className="text-[11px] font-black uppercase tracking-wider text-white bg-[#020d06]/80 px-2 py-0.5 rounded border border-emerald-700/60">
                PARIS
              </span>
            </div>

            {/* BRUXELLES */}
            <div className="absolute top-[23%] left-[74%] transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 z-20">
              <span className="w-3 h-3 rounded-full bg-amber-300 shadow-[0_0_10px_#f59e0b] border border-[#020d06]"></span>
              <span className="text-[11px] font-black uppercase tracking-wider text-white bg-[#020d06]/80 px-2 py-0.5 rounded border border-emerald-700/60">
                BRUXELLES
              </span>
            </div>

            {/* AMSTERDAM */}
            <div className="absolute top-[15%] left-[80%] transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 z-20">
              <span className="w-3 h-3 rounded-full bg-amber-300 shadow-[0_0_10px_#f59e0b] border border-[#020d06]"></span>
              <span className="text-[11px] font-black uppercase tracking-wider text-white bg-[#020d06]/80 px-2 py-0.5 rounded border border-emerald-700/60">
                AMSTERDAM
              </span>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};
