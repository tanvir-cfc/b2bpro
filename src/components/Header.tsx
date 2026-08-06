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
      <div className="bg-[#05180d] text-emerald-100 text-[11px] py-2 px-4 border-b border-emerald-900/60 font-sans">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Authentic African Excellence */}
          <div className="flex items-center gap-2 text-[11px] font-bold tracking-wide">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="uppercase tracking-wider text-[10px] font-black text-white">
              {t('authenticExcellence') || 'AUTHENTIC AFRICAN EXCELLENCE'}
            </span>
          </div>

          {/* Center: B2B Minimum Order Notice */}
          <div className="hidden md:flex items-center gap-2 text-[11px] font-medium text-emerald-200/90">
            <Package className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{t('b2bNotice') || 'B2B ONLY – Minimum order quantity applies'}</span>
          </div>

          {/* Right: Shipping + Language Selector */}
          <div className="flex items-center gap-4 text-[11px] shrink-0 font-medium text-emerald-200">
            <div className="hidden sm:flex items-center gap-1.5 whitespace-nowrap">
              <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" />
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
                className="flex items-center gap-1.5 bg-emerald-950/90 hover:bg-emerald-900 text-emerald-100 px-2.5 py-1 rounded border border-emerald-700/60 cursor-pointer transition-colors text-xs font-semibold focus:outline-none"
                aria-haspopup="true"
                aria-expanded={langDropdownOpen}
              >
                <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="flex items-center gap-1">
                  <span>{currentLangObj.flag}</span>
                  <span>{currentLangObj.name}</span>
                </span>
                <ChevronDown className={`w-3 h-3 text-emerald-300 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-48 bg-white text-gray-800 rounded-lg shadow-2xl border border-gray-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 mb-1">
                    Language / Langue
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
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-emerald-50 hover:text-[#013b22] cursor-pointer font-medium transition-colors ${
                        language === lang.code ? 'bg-emerald-50/80 text-[#013b22] font-bold' : 'text-gray-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-base">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                      {language === lang.code && (
                        <Check className="w-3.5 h-3.5 text-emerald-700 font-bold" />
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
          <div className="hidden sm:flex items-center gap-3">
            {/* Cart Icon Button */}
            <button
              type="button"
              onClick={() => setIsQuoteDrawerOpen(true)}
              className="relative p-2.5 bg-emerald-950/90 hover:bg-emerald-900 text-emerald-100 border border-emerald-700/60 rounded-full transition-all cursor-pointer shadow-md hover:scale-105"
              aria-label="View Cart"
              title={t('monDevis') || 'Cart'}
            >
              <ShoppingCart className="w-5 h-5 text-amber-400" />
              {quoteCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-gray-950 text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#05180d] shadow-sm">
                  {quoteCartCount}
                </span>
              )}
            </button>

            {/* Request a Quote CTA Button matching reference image */}
            <button
              type="button"
              onClick={() => setActiveTab('distributeur')}
              className="flex items-center gap-2 bg-[#d97706] hover:bg-[#b45309] text-white px-4 py-2.5 rounded-md text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer border border-amber-400/40"
            >
              <FileText className="w-4 h-4 text-amber-100" />
              <span>{t('demanderDevis') || 'REQUEST A QUOTE'}</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-emerald-100 hover:bg-emerald-900/50 rounded-lg cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          {/* Mobile Language Selector Selector */}
          <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200">
            <div className="text-[11px] font-bold text-gray-500 uppercase mb-2 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-[#013b22]" />
              <span>Langue / Language:</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLanguage(lang.code as LanguageCode)}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded text-xs font-semibold cursor-pointer border ${
                    language === lang.code
                      ? 'bg-[#013b22] text-white border-[#013b22]'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-1">
            {[
              { id: 'accueil', label: t('navAccueil') },
              { id: 'catalogue', label: t('navCatalogue') },
              { id: 'marques', label: t('navMarques') },
              { id: 'importation', label: t('navImportation') },
              { id: 'distributeur', label: t('navDistributeur') },
              { id: 'ressources', label: t('navRessources') }
            ].map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-md font-medium text-sm cursor-pointer ${
                  activeTab === item.id ? 'bg-emerald-100 text-[#013b22] font-bold' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setIsLoginModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg font-semibold text-xs text-gray-800 cursor-pointer"
            >
              <User className="w-4 h-4" />
              <span>{t('connexionPro')}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsQuoteDrawerOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-gray-950 py-2.5 rounded-lg font-bold text-xs cursor-pointer shadow-sm"
            >
              <ShoppingCart className="w-4 h-4 text-gray-950" />
              <span>{t('monDevis')} ({quoteCartCount})</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('distributeur');
                setMobileMenuOpen(false);
              }}
              className="w-full bg-[#013b22] text-white py-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>{t('demanderDevis')}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

