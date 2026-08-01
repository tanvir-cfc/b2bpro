import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageCode = 'fr' | 'en' | 'es' | 'de';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  flag: string;
  label: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'fr', name: 'Français', flag: '🇫🇷', label: 'Français (FR)' },
  { code: 'en', name: 'English', flag: '🇬🇧', label: 'English (EN)' },
  { code: 'es', name: 'Español', flag: '🇪🇸', label: 'Español (ES)' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', label: 'Deutsch (DE)' }
];

export const translations: Record<LanguageCode, Record<string, string>> = {
  fr: {
    proNotice: "SITE RÉSERVÉ AUX PROFESSIONNELS — VENTE EN GROS UNIQUEMENT",
    deliveryInfo: "Livraison France & Europe (Palette ou Conteneur)",
    contactPhone: "+33 6 12 34 56 78",
    contactEmail: "contact@sentollbi.com",
    
    // Navigation
    navAccueil: "Accueil",
    navCatalogue: "Catalogue B2B",
    navMarques: "Nos Marques & MDD",
    navImportation: "Importation",
    navDistributeur: "Devenir Distributeur",
    navRessources: "Logistique & Fiches",

    // Actions
    adminSpace: "Espace Admin",
    adminActive: "Admin Actif",
    connexionPro: "Connexion Pro",
    monDevis: "Mon Devis",
    demanderDevis: "Demander un devis",

    // Hero
    heroBadge: "GROSSISTE ET IMPORTATEUR D'AFRIQUE",
    heroTitle1: "L'Excellence des Produits",
    heroTitle2: "Agroalimentaires Africains",
    heroSubtitle: "Fournisseur B2B privilégié des supermarchés, épiceries fines et distributeurs en Europe. Gammes conditionnées aux normes HACCP.",
    exploreCatalog: "Explorer le Catalogue",
    requestCustomQuote: "Devis Sur Mesure",

    // Catalog
    searchPlaceholder: "Rechercher un produit, EAN, ingrédient...",
    allCategories: "Toutes les catégories",
    potsPots: "Pots en verre",
    sachetsDoypack: "Sachets Doypack",
    epicesCafes: "Cafés & Épices",
    unitsPerCarton: "unités / carton",
    addToQuote: "Ajouter au Devis",
    cartonsInQuote: "cartons au devis",
    details: "Fiche Produit",
    minOrder: "Min. Commande:"
  },

  en: {
    proNotice: "PROFESSIONALS ONLY SITE — WHOLESALE DISTRIBUTORS ONLY",
    deliveryInfo: "Delivery France & Europe (Pallet or Container)",
    contactPhone: "+33 6 12 34 56 78",
    contactEmail: "contact@sentollbi.com",

    // Navigation
    navAccueil: "Home",
    navCatalogue: "B2B Catalog",
    navMarques: "Our Brands & Private Label",
    navImportation: "Import & Export",
    navDistributeur: "Become a Distributor",
    navRessources: "Logistics & Tech Sheets",

    // Actions
    adminSpace: "Admin Portal",
    adminActive: "Admin Mode Active",
    connexionPro: "Pro Login",
    monDevis: "My Quote Basket",
    demanderDevis: "Request a Quote",

    // Hero
    heroBadge: "AFRICAN WHOLESALER & DIRECT IMPORTER",
    heroTitle1: "Excellence in Premium",
    heroTitle2: "African Agrifood Products",
    heroSubtitle: "Preferred B2B supplier for supermarkets, specialty food stores, and distributors across Europe. HACCP certified packaging.",
    exploreCatalog: "Explore B2B Catalog",
    requestCustomQuote: "Custom Wholesale Quote",

    // Catalog
    searchPlaceholder: "Search product, EAN, ingredients...",
    allCategories: "All Categories",
    potsPots: "Glass Jars",
    sachetsDoypack: "Doypack Pouches",
    epicesCafes: "Coffee & Spices",
    unitsPerCarton: "units / carton",
    addToQuote: "Add to Quote Basket",
    cartonsInQuote: "cartons in quote",
    details: "Product Details",
    minOrder: "Min. Order:"
  },

  es: {
    proNotice: "SITIO RESERVADO A PROFESIONALES — VENTA AL POR MAYOR ÚNICAMENTE",
    deliveryInfo: "Envío Francia y Europa (Palet o Contenedor)",
    contactPhone: "+33 6 12 34 56 78",
    contactEmail: "contact@sentollbi.com",

    // Navigation
    navAccueil: "Inicio",
    navCatalogue: "Catálogo B2B",
    navMarques: "Nuestras Marcas y Marca Blanca",
    navImportation: "Importación",
    navDistributeur: "Ser Distribuidor",
    navRessources: "Logística y Fichas",

    // Actions
    adminSpace: "Área Admin",
    adminActive: "Admin Activo",
    connexionPro: "Acceso Pro",
    monDevis: "Mi Presupuesto",
    demanderDevis: "Solicitar Presupuesto",

    // Hero
    heroBadge: "MAYORISTA E IMPORTADOR DE ÁFRICA",
    heroTitle1: "La Excelencia de los Productos",
    heroTitle2: "Agroalimentarios Africanos",
    heroSubtitle: "Proveedor B2B preferido para supermercados, tiendas gourmet y distribuidores en Europa.",
    exploreCatalog: "Explorar Catálogo",
    requestCustomQuote: "Presupuesto a Medida",

    // Catalog
    searchPlaceholder: "Buscar producto, EAN, ingredientes...",
    allCategories: "Todas las categorías",
    potsPots: "Tarros de cristal",
    sachetsDoypack: "Bolsas Doypack",
    epicesCafes: "Cafés y Especias",
    unitsPerCarton: "unidades / caja",
    addToQuote: "Añadir al Presupuesto",
    cartonsInQuote: "cajas en presupuesto",
    details: "Ficha Técnica",
    minOrder: "Pedido Mínimo:"
  },

  de: {
    proNotice: "NUR FÜR GEWERBLICHE KUNDEN — AUSSCHLIESSLICH GROSSHANDEL",
    deliveryInfo: "Lieferung Frankreich & Europa (Palette oder Container)",
    contactPhone: "+33 6 12 34 56 78",
    contactEmail: "contact@sentollbi.com",

    // Navigation
    navAccueil: "Startseite",
    navCatalogue: "B2B Katalog",
    navMarques: "Unsere Marken & Eigenmarke",
    navImportation: "Import & Logistik",
    navDistributeur: "Vertriebspartner werden",
    navRessources: "Logistik & Datenblätter",

    // Actions
    adminSpace: "Admin-Bereich",
    adminActive: "Admin Aktiv",
    connexionPro: "Pro-Anmeldung",
    monDevis: "Mein Angebot",
    demanderDevis: "Angebot Anfordern",

    // Hero
    heroBadge: "GROSSHÄNDLER & IMPORTEUR AUS AFRIKA",
    heroTitle1: "Spitzenqualität Afrikanischer",
    heroTitle2: "Lebensmittelprodukte",
    heroSubtitle: "Bevorzugter B2B-Lieferant für Supermärkte, Feinkostläden und Großhändler in ganz Europa.",
    exploreCatalog: "Katalog erkunden",
    requestCustomQuote: "Individuelles Angebot",

    // Catalog
    searchPlaceholder: "Produkt, EAN, Zutaten suchen...",
    allCategories: "Alle Kategorien",
    potsPots: "Glasgläser",
    sachetsDoypack: "Doypack-Beutel",
    epicesCafes: "Kaffee & Gewürze",
    unitsPerCarton: "Einheiten / Karton",
    addToQuote: "Zum Angebot Hinzufügen",
    cartonsInQuote: "Kartons im Angebot",
    details: "Produktdetails",
    minOrder: "Mindestbestellmenge:"
  }
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  currentLangObj: LanguageOption;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('sentollbi_lang') as LanguageCode;
    return saved && ['fr', 'en', 'es', 'de'].includes(saved) ? saved : 'fr';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('sentollbi_lang', lang);
  };

  const currentLangObj = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.fr[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, currentLangObj, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
