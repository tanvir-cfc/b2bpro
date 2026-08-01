import React, { useState } from 'react';
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
  Mail
} from 'lucide-react';

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

  return (
    <header className="w-full sticky top-0 z-40 bg-white shadow-sm font-sans">
      {/* Top Banner Notice */}
      <div className="bg-[#042f1a] text-emerald-100 text-xs py-2 px-4 border-b border-emerald-900/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <span className="bg-emerald-800/60 text-amber-300 px-1.5 py-0.5 rounded text-[10px] font-bold border border-amber-400/30">
              PRO B2B
            </span>
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>SITE RÉSERVÉ AUX PROFESSIONNELS — VENTE EN GROS UNIQUEMENT</span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <div className="flex items-center gap-1.5 text-emerald-200">
              <Truck className="w-3.5 h-3.5 text-amber-400" />
              <span>Livraison France & Europe (Palette ou Conteneur)</span>
            </div>
            <div className="hidden md:flex items-center gap-3 border-l border-emerald-800/80 pl-4 text-emerald-300">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" /> +33 6 12 34 56 78
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" /> contact@sentollbi.com
              </span>
            </div>
            <div className="flex items-center gap-1 bg-emerald-900/50 px-2 py-0.5 rounded cursor-pointer hover:text-white">
              <Globe className="w-3 h-3 text-emerald-400" />
              <span>Français</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <button 
          onClick={() => setActiveTab('accueil')}
          className="flex items-center gap-2 text-left group focus:outline-none"
        >
          <div className="flex flex-col">
            <div className="flex items-center text-2xl font-black tracking-tight leading-none">
              <span className="text-[#ea580c] flex items-center">
                S<span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 mx-[1px]"></span>n
              </span>
              <span className="text-[#013b22] ml-0.5">Toll</span>
              <span className="text-[#16a34a] font-black ml-1 flex items-center">
                Bi
                <span className="text-xs ml-0.5 text-amber-500 font-bold">🌿</span>
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.25em] font-extrabold text-[#013b22]/80 mt-1">
              SAVEURS D'AFRIQUE
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold text-gray-700">
          {[
            { id: 'accueil', label: 'Accueil' },
            { id: 'catalogue', label: 'Catalogue B2B' },
            { id: 'marques', label: 'Nos Marques & MDD' },
            { id: 'importation', label: 'Importation' },
            { id: 'distributeur', label: 'Devenir Distributeur' },
            { id: 'ressources', label: 'Logistique & Fiches' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3.5 py-2 rounded-lg transition-all ${
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
            onClick={() => {
              setIsAdmin(!isAdmin);
              if (!isAdmin) setActiveTab('admin');
              else setActiveTab('accueil');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full font-bold border transition-colors ${
              isAdmin
                ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
            }`}
            title="Basculer Mode Admin & Gestion de Stock"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>{isAdmin ? 'Admin Actif' : 'Espace Admin'}</span>
          </button>

          {/* Login Pro */}
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#013b22] border border-[#013b22]/30 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            <User className="w-3.5 h-3.5" />
            <span>Connexion Pro</span>
          </button>

          {/* Quote Cart Drawer Button */}
          <button
            onClick={() => setIsQuoteDrawerOpen(true)}
            className="relative flex items-center gap-1.5 px-3 py-2 bg-amber-50 text-amber-900 border border-amber-300 rounded-lg font-semibold text-xs hover:bg-amber-100 transition-colors"
          >
            <ShoppingBag className="w-4 h-4 text-amber-700" />
            <span>Mon Devis</span>
            {quoteCartCount > 0 && (
              <span className="bg-amber-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                {quoteCartCount}
              </span>
            )}
          </button>

          {/* Demander un Devis CTA */}
          <button
            onClick={() => setActiveTab('distributeur')}
            className="flex items-center gap-1.5 bg-[#013b22] hover:bg-[#02522f] text-white px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all shadow-sm hover:shadow"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Demander un devis</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-1">
            {[
              { id: 'accueil', label: 'Accueil' },
              { id: 'catalogue', label: 'Catalogue B2B' },
              { id: 'marques', label: 'Nos Marques & MDD' },
              { id: 'importation', label: 'Importation' },
              { id: 'distributeur', label: 'Devenir Distributeur' },
              { id: 'ressources', label: 'Logistique & Fiches' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-md font-medium text-sm ${
                  activeTab === item.id ? 'bg-emerald-100 text-[#013b22] font-bold' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsAdmin(!isAdmin);
                setActiveTab(isAdmin ? 'accueil' : 'admin');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-amber-500 text-white py-2 rounded-lg font-bold text-xs"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{isAdmin ? 'Quitter Admin' : 'Accéder Espace Admin & Stock'}</span>
            </button>
            <button
              onClick={() => {
                setIsLoginModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg font-semibold text-xs text-gray-800"
            >
              <User className="w-4 h-4" />
              <span>Connexion Espace Pro</span>
            </button>
            <button
              onClick={() => {
                setIsQuoteDrawerOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-amber-100 text-amber-900 py-2 rounded-lg font-bold text-xs"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Voir mon Panier Devis ({quoteCartCount})</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('distributeur');
                setMobileMenuOpen(false);
              }}
              className="w-full bg-[#013b22] text-white py-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Demander un Devis Personnalisé</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
