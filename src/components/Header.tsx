import React, { useState, useRef, useEffect } from 'react';
import { 
  Lock, 
  Truck, 
  Globe, 
  User, 
  FileText, 
  ShoppingBag, 
  LayoutDashboard, 
  ChevronDown, 
  Menu, 
  X,
  Phone,
  Mail,
  Check
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
      <div className="bg-[#042f1a] text-emerald-100 text-[11px] py-1.5 px-4 border-b border-emerald-900/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-medium tracking-wide min-w-0">
            <span className="bg-emerald-800/90 text-amber-300 px-1.5 py-0.5 rounded text-[10px] font-extrabold border border-amber-400/30 shrink-0">
              PRO B2B
            </span>
            <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0 hidden sm:inline" />
            <span className="truncate font-semibold">{t('proNotice')}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] shrink-0">
            <div className="hidden xl:flex items-center gap-1.5 text-emerald-200 whitespace-nowrap">
              <Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{t('deliveryInfo')}</span>
            </div>
            <div className="hidden lg:flex items-center gap-3 border-l border-emerald-800/80 pl-3 text-emerald-300 whitespace-nowrap">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-amber-400" /> {t('contactPhone')}
              </span>
            </div>

            {/* Language Selector Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 bg-emerald-900/90 hover:bg-emerald-800 text-emerald-100 px-2 py-0.5 rounded border border-emerald-700/60 cursor-pointer transition-colors text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-amber-400"
                aria-haspopup="true"
                aria-expanded={langDropdownOpen}
              >
                <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="flex items-center gap-1">
                  <span>{currentLangObj.flag}</span>
                  <span className="hidden sm:inline">{currentLangObj.name}</span>
                </span>
                <ChevronDown className={`w-3 h-3 text-emerald-300 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-44 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 mb-1">
                    Langue / Language
                  </div>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setLanguage(lang.code as LanguageCode);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left hover:bg-emerald-50 hover:text-[#013b22] cursor-pointer font-medium transition-colors ${
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

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <button 
          type="button"
          onClick={() => setActiveTab('accueil')}
          className="flex items-center group focus:outline-none cursor-pointer"
        >
          <Logo size="md" variant="color" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold text-gray-700">
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
              onClick={() => setActiveTab(item.id)}
              className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === item.id
                  ? 'bg-emerald-50 text-[#013b22] font-bold border-b-2 border-[#013b22]'
                  : 'hover:text-[#013b22] hover:bg-gray-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Admin Toggle Switch */}
          <button
            type="button"
            onClick={() => {
              setIsAdmin(!isAdmin);
              if (!isAdmin) setActiveTab('admin');
              else setActiveTab('accueil');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full font-bold border transition-colors cursor-pointer ${
              isAdmin
                ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
            }`}
            title="Basculer Mode Admin & Gestion de Stock"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>{isAdmin ? t('adminActive') : t('adminSpace')}</span>
          </button>

          {/* Login Pro */}
          <button
            type="button"
            onClick={() => setIsLoginModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#013b22] border border-[#013b22]/30 rounded-lg hover:bg-emerald-50 transition-colors cursor-pointer"
          >
            <User className="w-3.5 h-3.5" />
            <span>{t('connexionPro')}</span>
          </button>

          {/* Quote Cart Drawer Button */}
          <button
            type="button"
            onClick={() => setIsQuoteDrawerOpen(true)}
            className="relative flex items-center gap-1.5 px-3 py-2 bg-amber-50 text-amber-900 border border-amber-300 rounded-lg font-semibold text-xs hover:bg-amber-100 transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-amber-700" />
            <span>{t('monDevis')}</span>
            {quoteCartCount > 0 && (
              <span className="bg-amber-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                {quoteCartCount}
              </span>
            )}
          </button>

          {/* Demander un Devis CTA */}
          <button
            type="button"
            onClick={() => setActiveTab('distributeur')}
            className="flex items-center gap-1.5 bg-[#013b22] hover:bg-[#02522f] text-white px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all shadow-sm hover:shadow cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('demanderDevis')}</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
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
                setIsAdmin(!isAdmin);
                setActiveTab(isAdmin ? 'accueil' : 'admin');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-amber-500 text-white py-2 rounded-lg font-bold text-xs cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{isAdmin ? t('adminActive') : t('adminSpace')}</span>
            </button>
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
              className="w-full flex items-center justify-center gap-2 bg-amber-100 text-amber-900 py-2 rounded-lg font-bold text-xs cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
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

