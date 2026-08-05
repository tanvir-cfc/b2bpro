import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Linkedin, 
  Instagram, 
  Facebook, 
  ShieldCheck, 
  Award, 
  Check 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#022c19] text-white pt-12 pb-6 border-t border-emerald-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-xs">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <button 
              type="button" 
              onClick={() => onNavigate('accueil')}
              className="text-left cursor-pointer focus:outline-none"
            >
              <Logo size="md" variant="white" />
            </button>

            <p className="text-emerald-100/80 leading-relaxed max-w-sm">
              {t('footerBrandDesc')}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-1">
              <a href="#linkedin" className="w-8 h-8 rounded-lg bg-emerald-900/80 flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-emerald-950 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#instagram" className="w-8 h-8 rounded-lg bg-emerald-900/80 flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-emerald-950 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#facebook" className="w-8 h-8 rounded-lg bg-emerald-900/80 flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-emerald-950 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick links */}
          <div className="space-y-3">
            <h3 className="font-extrabold uppercase text-amber-400 tracking-wider text-[11px]">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-2 text-emerald-100/90 font-medium">
              <li><button type="button" onClick={() => onNavigate('accueil')} className="hover:text-amber-300 transition-colors cursor-pointer">{t('navAccueil')}</button></li>
              <li><button type="button" onClick={() => onNavigate('catalogue')} className="hover:text-amber-300 transition-colors cursor-pointer">{t('navCatalogue')}</button></li>
              <li><button type="button" onClick={() => onNavigate('marques')} className="hover:text-amber-300 transition-colors cursor-pointer">{t('navMarques')}</button></li>
              <li><button type="button" onClick={() => onNavigate('importation')} className="hover:text-amber-300 transition-colors cursor-pointer">{t('navImportation')}</button></li>
              <li><button type="button" onClick={() => onNavigate('distributeur')} className="hover:text-amber-300 transition-colors cursor-pointer">{t('navDistributeur')}</button></li>
              <li><button type="button" onClick={() => onNavigate('ressources')} className="hover:text-amber-300 transition-colors cursor-pointer">{t('navRessources')}</button></li>
            </ul>
          </div>

          {/* Column 3: Legal & Info */}
          <div className="space-y-3">
            <h3 className="font-extrabold uppercase text-amber-400 tracking-wider text-[11px]">
              INFORMATIONS
            </h3>
            <ul className="space-y-2 text-emerald-100/90 font-medium">
              <li><a href="#cgv" className="hover:text-amber-300 transition-colors">{t('cgvB2b')}</a></li>
              <li><a href="#privacy" className="hover:text-amber-300 transition-colors">{t('privacyPolicy')}</a></li>
              <li><a href="#mentions" className="hover:text-amber-300 transition-colors">{t('legalNotice')}</a></li>
              <li><a href="#faq" className="hover:text-amber-300 transition-colors">{t('faqB2b')}</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & Certifications */}
          <div className="space-y-3">
            <h3 className="font-extrabold uppercase text-amber-400 tracking-wider text-[11px]">
              CONTACT & CERTIFICATIONS
            </h3>
            <div className="space-y-2 text-emerald-100/90 font-medium">
              <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-amber-400" /> +33 6 12 34 56 78</p>
              <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-amber-400" /> contact@sentollbi.com</p>
              <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-amber-400" /> Paris, France</p>
              <p className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-amber-400" /> Lun - Ven : 9h00 - 18h00</p>
            </div>

            {/* Certifications Badges */}
            <div className="pt-2 flex flex-wrap gap-2">
              <span className="bg-emerald-950 border border-emerald-700/80 text-amber-300 text-[10px] font-black px-2 py-1 rounded flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-amber-400" /> HACCP
              </span>
              <span className="bg-emerald-950 border border-emerald-700/80 text-amber-300 text-[10px] font-black px-2 py-1 rounded flex items-center gap-1">
                <Award className="w-3 h-3 text-amber-400" /> ISO 22000
              </span>
              <span className="bg-emerald-950 border border-emerald-700/80 text-amber-300 text-[10px] font-black px-2 py-1 rounded flex items-center gap-1">
                <Check className="w-3 h-3 text-amber-400" /> BIO EU
              </span>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-emerald-900/80 text-center text-[11px] text-emerald-300/80 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>{t('copyright')}</p>
          <p className="text-[10px] text-emerald-400 font-medium">
            Plateforme Grossiste B2B - Import Direct Sénégal & Afrique de l'Ouest
          </p>
        </div>

      </div>
    </footer>
  );
};
