import React from 'react';
import { 
  Award, 
  Globe2, 
  Users2, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const StatsAndPartners: React.FC = () => {
  return (
    <section className="bg-[#013b22] text-white py-12 px-4 sm:px-6 border-y border-emerald-800">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Key Performance Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          
          <div className="p-4 bg-emerald-950/40 border border-emerald-800/80 rounded-2xl flex flex-col items-center">
            <Sparkles className="w-8 h-8 text-amber-400 mb-2" />
            <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">20 000+</p>
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-200 mt-1">
              Pots Disponibles Par Production
            </p>
          </div>

          <div className="p-4 bg-emerald-950/40 border border-emerald-800/80 rounded-2xl flex flex-col items-center">
            <Globe2 className="w-8 h-8 text-amber-400 mb-2" />
            <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">27</p>
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-200 mt-1">
              Pays Livrés En Europe
            </p>
          </div>

          <div className="p-4 bg-emerald-950/40 border border-emerald-800/80 rounded-2xl flex flex-col items-center">
            <Users2 className="w-8 h-8 text-amber-400 mb-2" />
            <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">50+</p>
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-200 mt-1">
              Partenaires Professionnels
            </p>
          </div>

          <div className="p-4 bg-emerald-950/40 border border-emerald-800/80 rounded-2xl flex flex-col items-center">
            <Award className="w-8 h-8 text-amber-400 mb-2" />
            <p className="text-xl sm:text-2xl font-black text-amber-300 tracking-tight uppercase mt-1">
              Qualité Premium
            </p>
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-200 mt-1">
              Produits Authentiques Et Certifiés
            </p>
          </div>

        </div>

        {/* Partners Banner matching screenshot "ILS NOUS FONT CONFIANCE" */}
        <div className="bg-emerald-950/60 border border-emerald-800 rounded-2xl p-6 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left space-y-1">
            <h3 className="text-lg font-black uppercase tracking-wider text-amber-300">
              ILS NOUS FONT CONFIANCE
            </h3>
            <p className="text-xs text-emerald-200">
              Plus de 50 enseignes et distributeurs généralistes et spécialisés à travers l'Europe
            </p>
          </div>

          {/* Logos Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {[
              { name: 'ANNAN WHOLESALE', icon: '🌿 ANNAN' },
              { name: 'TROPIC ISLAND', icon: '🌴 TROPIC ISLAND' },
              { name: 'TAI YAT IMPORT', icon: '⛩️ TAI YAT' },
              { name: 'EURO-BIO DISTRIBUTION', icon: '🍃 EURO-BIO' },
              { name: 'AFRO-FOODS BERLIN', icon: '🌍 AFRO-FOODS' }
            ].map((partner, index) => (
              <div 
                key={index} 
                className="bg-white/10 hover:bg-white/20 border border-emerald-700/60 px-4 py-2.5 rounded-xl text-xs font-black text-emerald-100 tracking-wider flex items-center gap-2 transition-all cursor-default"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>{partner.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
