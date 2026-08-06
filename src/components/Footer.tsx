import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe2, 
  Linkedin, 
  Instagram, 
  Facebook, 
  ShieldCheck 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#041d0f] text-white pt-12 pb-6 border-t border-emerald-950 font-sans relative overflow-hidden">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:32px_32px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-xs">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <button 
              type="button" 
              onClick={() => onNavigate('accueil')}
              className="text-left cursor-pointer focus:outline-none"
            >
              <Logo size="md" variant="white" showSubtitle={false} />
            </button>

            <p className="text-emerald-200/80 leading-relaxed max-w-sm font-normal">
              Your trusted partner for premium African products in Europe. Sourcing authentic raw ingredients directly from West Africa with complete transparency and reliability.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-1">
              <a href="#linkedin" className="w-8 h-8 rounded-lg bg-emerald-950/80 flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-emerald-950 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#instagram" className="w-8 h-8 rounded-lg bg-emerald-950/80 flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-emerald-950 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#facebook" className="w-8 h-8 rounded-lg bg-emerald-950/80 flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-emerald-950 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>HACCP & ISO Quality Certified Export</span>
            </div>
          </div>

          {/* Column 2: Quick links */}
          <div className="space-y-3">
            <h3 className="font-extrabold uppercase text-amber-400 tracking-wider text-[11px] border-b border-emerald-900/80 pb-2">
              QUICK LINKS
            </h3>
            <ul className="space-y-2 text-emerald-100/90 font-medium">
              {[
                { id: 'accueil', label: 'Home' },
                { id: 'catalogue', label: 'Catalogue' },
                { id: 'distributeur', label: 'Become a Distributor' },
                { id: 'importation', label: 'Importation' },
                { id: 'marques', label: 'About Us' },
                { id: 'ressources', label: 'Contact' }
              ].map((item) => (
                <li key={item.id}>
                  <button 
                    type="button" 
                    onClick={() => onNavigate(item.id)} 
                    className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Products */}
          <div className="space-y-3">
            <h3 className="font-extrabold uppercase text-amber-400 tracking-wider text-[11px] border-b border-emerald-900/80 pb-2">
              PRODUCTS
            </h3>
            <ul className="space-y-2 text-emerald-100/90 font-medium">
              {[
                'Madd (Wild Fruit)',
                'Baobab Powder',
                'Hibiscus (Bissap)',
                'Cashew Nuts',
                'Roasted Peanuts',
                'Café Touba'
              ].map((p, idx) => (
                <li key={idx}>
                  <button 
                    type="button" 
                    onClick={() => onNavigate('catalogue')} 
                    className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                  >
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Support */}
          <div className="space-y-3">
            <h3 className="font-extrabold uppercase text-amber-400 tracking-wider text-[11px] border-b border-emerald-900/80 pb-2">
              B2B CONTACT
            </h3>
            <div className="space-y-2.5 text-emerald-100/90 font-medium">
              <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" /> info@sentollbi.com</p>
              <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" /> +39 352 067 4106</p>
              <p className="flex items-center gap-2"><Globe2 className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Shipping to All Europe</p>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-emerald-300/80 gap-3">
          <p>© 2024 SenTollBi Distribution – All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-amber-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-amber-400 cursor-pointer">Terms & Conditions</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

