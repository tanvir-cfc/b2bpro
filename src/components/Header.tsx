import React, { useState, useRef, useEffect } from 'react';
import { 
  Lock, 
  Truck, 
  Globe, 
  User, 
  FileText, 
  ShoppingBag, 
  ShoppingCart,
  ChevronDown, 
  Menu, 
  X,
  Phone,
  Mail,
  Check,
  ShieldCheck,
  Package
} from 'lucide-react';
import { useLanguage, LANGUAGES, LanguageCode } from '../context/LanguageContext';
import { Logo } from './Logo';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  quoteCartCount: number;
  setIsQuoteDrawerOpen: (open: boolean) => void;
  setIsLoginModalOpen: (open: boolean) => void;
  isAdmin: boolean;
  setIsAdmin: (admin: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  quoteCartCount,
  setIsQuoteDrawerOpen,
  setIsLoginModalOpen,
  isAdmin,
  setIsAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { language, setLanguage, currentLangObj, t } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full sticky top-0 z-40 bg-white shadow-sm font-sans">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-[#031107] via-[#062011] to-[#031107] text-emerald-100 py-1.5 px-3 sm:px-6 border-b border-amber-500/30 font-sans shadow-md relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          {/* Left: Authentic African Excellence Badge */}
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold tracking-wide shrink-0">
            <span className="inline-flex items-center justify-center p-0.5 sm:p-1 rounded-full bg-amber-500/20 border border-amber-400/40">
              <ShieldCheck className="w-3 h-3 text-amber-400 shrink-0" />
            </span>
            <span className="uppercase tracking-widest text-[9px] sm:text-[11px] font-black text-amber-100">
              {t('authenticExcellence') || 'AUTHENTIC AFRICAN EXCELLENCE'}
            </span>
          </div>

          {/* Center: B2B Minimum Order Notice (Hidden on small mobile, visible on tablet+) */}
          <div className="hidden md:flex items-center gap-2 text-[11px] font-semibold text-amber-300/90 bg-emerald-950/80 px-3 py-0.5 rounded-full border border-emerald-800/80">
            <Package className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{t('b2bNotice') || 'B2B ONLY – Minimum order quantity applies'}</span>
          </div>

          {/* Right: Shipping + Language Selector Dropdown */}
          <div className="flex items-center gap-2 sm:gap-4 text-[11px] shrink-0 font-medium text-emerald-200">
            <div className="hidden lg:flex items-center gap-1.5 whitespace-nowrap text-emerald-200/90 font-medium">
              <Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{t('shippingEurope') || 'Shipping to Europe'}</span>
            </div>

            {/* Language Selector Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLangDropdownOpen((prev) => !prev);
                }}
                className="flex items-center gap-1.5 bg-[#020d06] hover:bg-emerald-900/90 text-emerald-100 px-2 sm:px-2.5 py-1 rounded-lg border border-amber-500/50 hover:border-amber-400 cursor-pointer transition-all text-[10px] sm:text-[11px] font-black focus:outline-none shadow-sm active:scale-95"
                aria-haspopup="true"
                aria-expanded={langDropdownOpen}
              >
                <Globe className="w-3 h-3 text-amber-400 shrink-0" />
                <span className="flex items-center gap-1">
                  <span className="text-xs leading-none">{currentLangObj.flag}</span>
                  <span className="uppercase tracking-wider font-black text-amber-300 text-[10px] sm:text-[11px]">{currentLangObj.code}</span>
                </span>
                <ChevronDown className={`w-3 h-3 text-amber-400 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 sm:w-52 bg-[#051c0f] text-white rounded-xl shadow-2xl border border-emerald-700/80 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 backdrop-blur-xl">
                  <div className="px-3 py-1 text-[10px] font-black text-amber-400 uppercase tracking-widest border-b border-emerald-800/80 mb-1.5 flex items-center gap-1.5">
                    <Globe className="w-3 h-3 text-amber-400" />
                    <span>Select Language</span>
                  </div>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLanguage(lang.code as LanguageCode);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-emerald-900/80 cursor-pointer font-bold transition-colors ${
                        language === lang.code ? 'bg-amber-500/20 text-amber-300 font-extrabold border-l-2 border-amber-400' : 'text-emerald-100/90'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="text-base">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                      {language === lang.code && (
                        <Check className="w-3.5 h-3.5 text-amber-400 font-bold" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Main Navbar matching reference design */}
      <div className="bg-[#0b2416] border-b border-emerald-900/60 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          {/* Brand Logo */}
          <button 
            type="button"
            onClick={() => setActiveTab('accueil')}
            className="flex items-center group focus:outline-none cursor-pointer"
          >
            <Logo size="md" variant="white" showSubtitle={false} />
          </button>

          {/* Desktop Navigation Links matching screenshot */}
          <nav className="hidden lg:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-100/90">
            {[
              { id: 'accueil', label: t('navAccueil') || 'HOME' },
              { id: 'catalogue', label: t('navCatalogue') || 'CATALOGUE', hasDropdown: true },
              { id: 'distributeur', label: t('navBecomeDistributor') || 'BECOME A DISTRIBUTOR' },
              { id: 'importation', label: t('navImportation') || 'IMPORTATION' },
              { id: 'marques', label: t('navAboutUs') || 'ABOUT US' },
              { id: 'ressources', label: t('navContact') || 'CONTACT' }
            ].map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-2 rounded transition-all cursor-pointer flex items-center gap-1 ${
                  activeTab === item.id
                    ? 'text-amber-400 font-black border-b-2 border-amber-400 bg-emerald-900/30'
                    : 'hover:text-amber-300 hover:bg-emerald-900/20'
                }`}
              >
                <span>{item.label}</span>
                {item.hasDropdown && <ChevronDown className="w-3 h-3 text-amber-400" />}
              </button>
            ))}
          </nav>

          {/* Right CTA Actions matching screenshot */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cart Icon Button (Visible on mobile & desktop) */}
            <button
              type="button"
              onClick={() => setIsQuoteDrawerOpen(true)}
              className="relative p-2 sm:p-2.5 bg-emerald-950/90 hover:bg-emerald-900 text-emerald-100 border border-emerald-700/60 rounded-full transition-all cursor-pointer shadow-md hover:scale-105"
              aria-label="View Cart"
              title={t('monDevis') || 'Cart'}
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
              {quoteCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-gray-950 text-[10px] sm:text-[11px] font-black w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-[#05180d] shadow-sm">
                  {quoteCartCount}
                </span>
              )}
            </button>

            {/* Request a Quote CTA Button matching reference image (hidden on smallest screens, available in mobile menu) */}
            <button
              type="button"
              onClick={() => setActiveTab('distributeur')}
              className="hidden sm:flex items-center gap-2 bg-[#d97706] hover:bg-[#b45309] text-white px-4 py-2.5 rounded-md text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer border border-amber-400/40"
            >
              <FileText className="w-4 h-4 text-amber-100" />
              <span>{t('demanderDevis') || 'REQUEST A QUOTE'}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-emerald-100 hover:bg-emerald-900/50 rounded-lg cursor-pointer border border-emerald-700/40"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6 text-emerald-100" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Ultra-Premium Dark Luxury Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gradient-to-b from-[#031308] via-[#051c0d] to-[#020a05] text-white border-t border-emerald-800/80 px-4 pt-4 pb-8 space-y-4 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-3 duration-200">
          
          {/* Mobile Language Selector */}
          <div className="bg-[#020d06]/80 p-3 rounded-xl border border-emerald-800/60 shadow-inner">
            <div className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('language') || 'Language / Langue'}:</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLanguage(lang.code as LanguageCode)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                    language === lang.code
                      ? 'bg-amber-500 text-gray-950 border-amber-400 shadow-md font-black'
                      : 'bg-emerald-950/60 text-emerald-100 border-emerald-800/80 hover:bg-emerald-900'
                  }`}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span className="truncate">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-1.5 py-1">
            {[
              { id: 'accueil', label: t('navAccueil') || 'HOME' },
              { id: 'catalogue', label: t('navCatalogue') || 'CATALOGUE' },
              { id: 'distributeur', label: t('navBecomeDistributor') || 'BECOME A DISTRIBUTOR' },
              { id: 'importation', label: t('navImportation') || 'IMPORTATION' },
              { id: 'marques', label: t('navAboutUs') || 'ABOUT US' },
              { id: 'ressources', label: t('navContact') || 'CONTACT' }
            ].map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-4 py-3 rounded-xl font-extrabold text-xs tracking-wider uppercase transition-all cursor-pointer flex items-center justify-between ${
                  activeTab === item.id 
                    ? 'bg-gradient-to-r from-amber-500/20 to-emerald-900/40 text-amber-400 border border-amber-500/40 font-black' 
                    : 'text-emerald-100/90 hover:bg-emerald-900/30'
                }`}
              >
                <span>{item.label}</span>
                <ChevronDown className="-rotate-90 w-4 h-4 text-amber-400/80" />
              </button>
            ))}
          </div>

          {/* Action CTAs in Mobile Drawer */}
          <div className="pt-3 border-t border-emerald-900/80 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                setActiveTab('distributeur');
                setMobileMenuOpen(false);
              }}
              className="w-full bg-[#d97706] hover:bg-[#b45309] text-white py-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg border border-amber-400/40"
            >
              <FileText className="w-4 h-4 text-amber-100" />
              <span>{t('demanderDevis') || 'REQUEST A QUOTE'}</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsQuoteDrawerOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-1.5 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-100 border border-emerald-700/60 py-2.5 rounded-xl font-bold text-xs cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4 text-amber-400" />
                <span>{t('monDevis') || 'QUOTE'} ({quoteCartCount})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsLoginModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-1.5 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-100 border border-emerald-700/60 py-2.5 rounded-xl font-bold text-xs cursor-pointer"
              >
                <User className="w-4 h-4 text-amber-400" />
                <span>{t('connexionPro') || 'Pro Login'}</span>
              </button>
            </div>
          </div>

        </div>
      )}
    </header>
  );
};

