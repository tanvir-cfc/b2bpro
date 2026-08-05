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
    // Header & Top bar
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
    catalogBadge: "Catalogue Grossiste Direct",
    catalogTitle: "NOTRE GAMME DE PRODUITS",
    catalogSubtitle: "Plus de 20 références disponibles en gros pour les professionnels de la distribution",
    allProducts: "Tous les produits",
    glassJarsFormat: "Bocaux en Verre (250g)",
    sachetsDoypacks: "Sachets & Doypacks",
    drinksPowders: "Boissons & Poudres",
    spicesCoffee: "Épices & Café",
    searchPlaceholder: "Rechercher une référence, ingrédient...",
    quantity: "Quantité",
    pricePerUnitExcl: "Prix unitaire HT",
    packaging: "Conditionnement:",
    carton: "carton",
    pcs: "pcs",
    viewProductSheet: "VOIR LA FICHE PRODUIT",
    addToQuote: "AJOUTER AU DEVIS",
    viewAllB2BCatalog: "VOIR TOUT LE CATALOGUE B2B",
    addedToQuoteNotice: "carton(s) ajouté(s) au panier de devis !",

    // Product Detail Modal
    productTechSheetTitle: "Fiche Technique Produit",
    eanCode: "Code EAN:",
    moqLabel: "Min. commande:",
    ingredientsLabel: "Ingrédients & Origine:",
    nutritionLabel: "Valeurs Nutritionnelles (pour 100g):",
    pricingTierHeading: "Barème de Prix Dégressif (HT):",
    cartonsToQuote: "cartons à ajouter",
    closeModal: "Fermer",

    // Quote Drawer
    quoteDrawerTitle: "Votre Panier de Devis B2B",
    emptyQuoteBasket: "Votre panier de devis est vide.",
    emptyBasketSubtitle: "Parcourez notre catalogue et ajoutez vos cartons pour générer une demande de devis personnalisée.",
    browseCatalog: "Parcourir le catalogue",
    estimatedTotalHT: "Montant Estimé Total HT:",
    estimatedNotice: "Devis final avec frais de port ajustés selon votre destination après validation.",
    finalizeQuoteRequest: "VALIDER ET RECEVOIR LE DEVIS (PDF)",
    clearQuoteBasket: "Vider le panier",

    // Quote Form Section
    quoteFormTitle: "DEMANDER UN DEVIS GROSSISTE SUR MESURE",
    quoteFormSubtitle: "Remplissez ce formulaire pour recevoir un devis officiel adapté à vos volumes de commande.",
    companyName: "Raison Sociale / Nom de l'Entreprise",
    siretNumber: "Numéro SIRET / N° TVA Intra",
    emailPro: "Adresse Email Professionnelle",
    phoneNumber: "Téléphone de contact",
    sectorType: "Secteur d'activité",
    sectorSupermarket: "Supermarché / Grande Distribution",
    sectorDelicatessen: "Épicerie fine / Magasin spécialisé",
    sectorWholesale: "Grossiste / Distributeur régional",
    sectorOther: "Autre secteur",
    logisticsPreference: "Option Logistique Souhaitée",
    logisticsPallet: "Livraison Palette Europe",
    logisticsContainer: "Expédition Conteneur Maritime (20ft/40ft)",
    logisticsExWorks: "Retrait Entrepôt (Ex-Works)",
    additionalComments: "Précisions ou besoins spécifiques (Marque Blanche, Délais...)",
    submitQuoteButton: "ENVOYER LA DEMANDE DE DEVIS",
    quoteSuccessMsg: "Votre demande de devis a été transmise avec succès ! Notre équipe B2B vous contactera sous 24h.",

    // Footer
    footerAboutTitle: "Sentollbi B2B",
    footerAboutText: "Grossiste et importateur direct de produits agroalimentaires africains haut de gamme pour la grande distribution et épiceries spécialisées en Europe.",
    footerQuickLinks: "Liens Rapides",
    footerContactTitle: "Contact & Service Commercial",
    footerRights: "Tous droits réservés. Vente réservée aux professionnels.",
    haccpCertified: "Certifié Normes HACCP & Traçabilité Europe",

    // Stats & Props
    statHaccpTitle: "100% Certifié HACCP",
    statHaccpDesc: "Normes d'hygiène et sécurité alimentaire européennes",
    statCountriesTitle: "Import Direct Afrique",
    statCountriesDesc: "Sénégal, Côte d'Ivoire, Cameroun, Mali",
    statStorageTitle: "Stockage France",
    statStorageDesc: "Entrepôts régulés et disponibilité immédiate",
    statShippingTitle: "Logistique Rapide",
    statShippingDesc: "Expédition sous 48/72h partout en Europe",

    // Private label / MDD
    whiteLabelBadge: "SERVICE MARQUE DISTRIBUTEUR (MDD)",
    whiteLabelTitle: "Vos Produits sous Votre Propre Marque",
    whiteLabelSubtitle: "Nous créons, conditionnons et personnalisons les emballages pour votre chaîne de magasins ou marque propre.",
    requestMddQuote: "DISCUTER D'UN PROJET MDD"
  },

  en: {
    // Header & Top bar
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
    adminActive: "Admin Active",
    connexionPro: "Pro Login",
    monDevis: "My Quote",
    demanderDevis: "Request Quote",

    // Hero
    heroBadge: "AFRICAN WHOLESALER & DIRECT IMPORTER",
    heroTitle1: "Excellence in Premium",
    heroTitle2: "African Agrifood Products",
    heroSubtitle: "Preferred B2B supplier for supermarkets, specialty food stores, and regional distributors across Europe. HACCP certified packaging.",
    exploreCatalog: "Explore B2B Catalog",
    requestCustomQuote: "Custom Wholesale Quote",

    // Catalog
    catalogBadge: "Direct Wholesale Catalog",
    catalogTitle: "OUR PRODUCT RANGE",
    catalogSubtitle: "Over 20 references available in bulk for professional distributors",
    allProducts: "All products",
    glassJarsFormat: "Glass Jars (250g)",
    sachetsDoypacks: "Pouches & Doypacks",
    drinksPowders: "Beverages & Powders",
    spicesCoffee: "Spices & Coffee",
    searchPlaceholder: "Search reference, ingredient...",
    quantity: "Quantity",
    pricePerUnitExcl: "Unit Price (excl. VAT)",
    packaging: "Packaging:",
    carton: "carton",
    pcs: "pcs",
    viewProductSheet: "VIEW PRODUCT SHEET",
    addToQuote: "ADD TO QUOTE",
    viewAllB2BCatalog: "VIEW ALL B2B CATALOG",
    addedToQuoteNotice: "carton(s) added to your quote basket!",

    // Product Detail Modal
    productTechSheetTitle: "Product Technical Sheet",
    eanCode: "EAN Code:",
    moqLabel: "Min. order:",
    ingredientsLabel: "Ingredients & Origin:",
    nutritionLabel: "Nutritional Values (per 100g):",
    pricingTierHeading: "Tiered Pricing Scale (excl. VAT):",
    cartonsToQuote: "cartons to add",
    closeModal: "Close",

    // Quote Drawer
    quoteDrawerTitle: "Your B2B Quote Basket",
    emptyQuoteBasket: "Your quote basket is empty.",
    emptyBasketSubtitle: "Browse our catalog and add cartons to request a custom commercial quotation.",
    browseCatalog: "Browse catalog",
    estimatedTotalHT: "Estimated Total Amount (excl. VAT):",
    estimatedNotice: "Final quotation including freight costs will be sent upon validation.",
    finalizeQuoteRequest: "SUBMIT & RECEIVE QUOTE (PDF)",
    clearQuoteBasket: "Clear basket",

    // Quote Form Section
    quoteFormTitle: "REQUEST A CUSTOM WHOLESALE QUOTE",
    quoteFormSubtitle: "Fill in this form to receive an official price estimate tailored to your volume requirements.",
    companyName: "Company Name / Business Name",
    siretNumber: "Tax ID / VAT Number",
    emailPro: "Business Email Address",
    phoneNumber: "Contact Phone",
    sectorType: "Business Sector",
    sectorSupermarket: "Supermarket / Retail Chain",
    sectorDelicatessen: "Gourmet / Specialty Store",
    sectorWholesale: "Wholesaler / Regional Distributor",
    sectorOther: "Other Sector",
    logisticsPreference: "Preferred Logistics Option",
    logisticsPallet: "Euro Pallet Delivery",
    logisticsContainer: "Sea Freight Container (20ft/40ft)",
    logisticsExWorks: "Warehouse Pickup (Ex-Works)",
    additionalComments: "Specific requests (Private Label, Deadlines...)",
    submitQuoteButton: "SEND QUOTE REQUEST",
    quoteSuccessMsg: "Your quote request has been sent successfully! Our B2B team will contact you within 24h.",

    // Footer
    footerAboutTitle: "Sentollbi B2B",
    footerAboutText: "Direct wholesaler and importer of premium African agrifood products for retail chains and specialty stores in Europe.",
    footerQuickLinks: "Quick Links",
    footerContactTitle: "Sales & Contact",
    footerRights: "All rights reserved. Reserved for business professionals.",
    haccpCertified: "HACCP Standards & European Traceability Certified",

    // Stats & Props
    statHaccpTitle: "100% HACCP Certified",
    statHaccpDesc: "Compliant with European hygiene and food safety standards",
    statCountriesTitle: "Direct African Import",
    statCountriesDesc: "Senegal, Ivory Coast, Cameroon, Mali",
    statStorageTitle: "France Storage",
    statStorageDesc: "Climate controlled warehouses for immediate shipping",
    statShippingTitle: "Fast Logistics",
    statShippingDesc: "Dispatched within 48/72h across Europe",

    // Private label / MDD
    whiteLabelBadge: "PRIVATE LABEL SERVICE (MDD)",
    whiteLabelTitle: "Your Products Under Your Own Brand",
    whiteLabelSubtitle: "We manufacture, package and customize labels tailored to your store network or custom brand.",
    requestMddQuote: "DISCUSS PRIVATE LABEL PROJECT"
  },

  es: {
    // Header & Top bar
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
    heroSubtitle: "Proveedor B2B preferido para supermercados, tiendas gourmet y distribuidores regionales en Europa.",
    exploreCatalog: "Explorar Catálogo B2B",
    requestCustomQuote: "Presupuesto a Medida",

    // Catalog
    catalogBadge: "Catálogo Mayorista Directo",
    catalogTitle: "NUESTRA GAMA DE PRODUCTOS",
    catalogSubtitle: "Más de 20 referencias disponibles al por mayor para profesionales",
    allProducts: "Todos los productos",
    glassJarsFormat: "Tarros de Cristal (250g)",
    sachetsDoypacks: "Bolsas y Doypacks",
    drinksPowders: "Bebidas y Polvos",
    spicesCoffee: "Especias y Café",
    searchPlaceholder: "Buscar referencia, ingrediente...",
    quantity: "Cantidad",
    pricePerUnitExcl: "Precio unitario sin IVA",
    packaging: "Embalaje:",
    carton: "caja",
    pcs: "uds",
    viewProductSheet: "VER FICHA TÉCNICA",
    addToQuote: "AÑADIR AL PRESUPUESTO",
    viewAllB2BCatalog: "VER TODO EL CATÁLOGO B2B",
    addedToQuoteNotice: "caja(s) añadida(s) a su presupuesto!",

    // Product Detail Modal
    productTechSheetTitle: "Ficha Técnica del Producto",
    eanCode: "Código EAN:",
    moqLabel: "Pedido mín.:",
    ingredientsLabel: "Ingredientes y Origen:",
    nutritionLabel: "Valores Nutricionales (por 100g):",
    pricingTierHeading: "Escala de Precios (sin IVA):",
    cartonsToQuote: "cajas para añadir",
    closeModal: "Cerrar",

    // Quote Drawer
    quoteDrawerTitle: "Su Cesta de Presupuesto B2B",
    emptyQuoteBasket: "Su cesta de presupuesto está vacía.",
    emptyBasketSubtitle: "Explore nuestro catálogo y añada cajas para solicitar un presupuesto comercial a medida.",
    browseCatalog: "Explorar catálogo",
    estimatedTotalHT: "Monto Total Estimado (sin IVA):",
    estimatedNotice: "El presupuesto final con gastos de envío se enviará tras la validación.",
    finalizeQuoteRequest: "VALIDAR Y RECIBIR PRESUPUESTO (PDF)",
    clearQuoteBasket: "Vaciar cesta",

    // Quote Form Section
    quoteFormTitle: "SOLICITAR PRESUPUESTO AL POR MAYOR A MEDIDA",
    quoteFormSubtitle: "Rellene este formulario para recibir una cotización oficial adaptada a su volumen.",
    companyName: "Nombre de la Empresa / Razón Social",
    siretNumber: "CIF / NIF / Número de IVA",
    emailPro: "Correo Electrónico Profesional",
    phoneNumber: "Teléfono de Contacto",
    sectorType: "Sector de Actividad",
    sectorSupermarket: "Supermercado / Gran Distribución",
    sectorDelicatessen: "Tienda Gourmet / Especializada",
    sectorWholesale: "Mayorista / Distribuidor Regional",
    sectorOther: "Otro Sector",
    logisticsPreference: "Opción Logística Preferida",
    logisticsPallet: "Envío en Palet Europeo",
    logisticsContainer: "Contenedor Marítimo (20ft/40ft)",
    logisticsExWorks: "Recogida en Almacén (Ex-Works)",
    additionalComments: "Detalles o necesidades específicas (Marca Blanca, Plazos...)",
    submitQuoteButton: "ENVIAR SOLICITUD DE PRESUPUESTO",
    quoteSuccessMsg: "¡Su solicitud ha sido enviada con éxito! Nuestro equipo le contactará en menos de 24 horas.",

    // Footer
    footerAboutTitle: "Sentollbi B2B",
    footerAboutText: "Mayorista e importador directo de productos agroalimentarios africanos de alta gama para Europa.",
    footerQuickLinks: "Enlaces Rápidos",
    footerContactTitle: "Contacto Comercial",
    footerRights: "Todos los derechos reservados. Venta exclusiva a profesionales.",
    haccpCertified: "Certificado Normas HACCP y Trazabilidad Europea",

    // Stats & Props
    statHaccpTitle: "100% Certificado HACCP",
    statHaccpDesc: "Normas de higiene y seguridad alimentaria europea",
    statCountriesTitle: "Importación Directa de África",
    statCountriesDesc: "Senegal, Costa de Marfil, Camerún, Malí",
    statStorageTitle: "Almacenamiento en Francia",
    statStorageDesc: "Almacenes regulados y disponibilidad inmediata",
    statShippingTitle: "Logística Rápida",
    statShippingDesc: "Envío en 48/72h a toda Europa",

    // Private label / MDD
    whiteLabelBadge: "SERVICIO MARCA BLANCA / MDD",
    whiteLabelTitle: "Sus Productos con Su Propia Marca",
    whiteLabelSubtitle: "Creamos, envasamos y personalizamos las etiquetas para su cadena de tiendas.",
    requestMddQuote: "PROYECTO MARCA BLANCA"
  },

  de: {
    // Header & Top bar
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
    catalogBadge: "Direkter Großhandelskatalog",
    catalogTitle: "UNSER PRODUKTSORTIMENT",
    catalogSubtitle: "Über 20 Artikel im Großhandel für Wiederverkäufer verfügbar",
    allProducts: "Alle Produkte",
    glassJarsFormat: "Glasgläser (250g)",
    sachetsDoypacks: "Beutel & Doypacks",
    drinksPowders: "Getränke & Pulver",
    spicesCoffee: "Gewürze & Kaffee",
    searchPlaceholder: "Artikel, Zutaten suchen...",
    quantity: "Menge",
    pricePerUnitExcl: "Stückpreis zzgl. MwSt.",
    packaging: "Verpackung:",
    carton: "Karton",
    pcs: "Stk.",
    viewProductSheet: "DATENBLATT ANSEHEN",
    addToQuote: "ZUM ANGEBOT HINZUFÜGEN",
    viewAllB2BCatalog: "GESAMTEN B2B KATALOG ANSEHEN",
    addedToQuoteNotice: "Karton(s) zum Angebot hinzugefügt!",

    // Product Detail Modal
    productTechSheetTitle: "Technisches Produktdatenblatt",
    eanCode: "EAN-Code:",
    moqLabel: "Mindestbestellmenge:",
    ingredientsLabel: "Zutaten & Herkunft:",
    nutritionLabel: "Nährwerte (pro 100g):",
    pricingTierHeading: "Mengenrabatt-Preise (zzgl. MwSt.):",
    cartonsToQuote: "Kartons hinzufügen",
    closeModal: "Schließen",

    // Quote Drawer
    quoteDrawerTitle: "Ihr B2B Angebotskorb",
    emptyQuoteBasket: "Ihr Angebotskorb ist leer.",
    emptyBasketSubtitle: "Durchsuchen Sie unseren Katalog und fügen Sie Kartons hinzu, um ein verbindliches Angebot anzufordern.",
    browseCatalog: "Katalog durchsuchen",
    estimatedTotalHT: "Geschätzter Gesamtbetrag (zzgl. MwSt.):",
    estimatedNotice: "Ein detailliertes Angebot inklusive Frachtkosten erhalten Sie nach der Validierung.",
    finalizeQuoteRequest: "ANGEBOT BESTÄTIGEN (PDF)",
    clearQuoteBasket: "Korb leeren",

    // Quote Form Section
    quoteFormTitle: "INDIVIDUELLES GROSSHANDELSANGEBOT ANFORDERN",
    quoteFormSubtitle: "Füllen Sie dieses Formular aus, um ein maßgeschneidertes Angebot zu erhalten.",
    companyName: "Firmenname / Unternehmen",
    siretNumber: "USt-IdNr. / Handelsregisternummer",
    emailPro: "Geschäftliche E-Mail-Adresse",
    phoneNumber: "Telefonnummer",
    sectorType: "Branche",
    sectorSupermarket: "Supermarkt / Einzelhandel",
    sectorDelicatessen: "Feinkost / Spezialitätengeschäft",
    sectorWholesale: "Großhändler / Regionaler Distributor",
    sectorOther: "Sonstige Branche",
    logisticsPreference: "Bevorzugte Logistikoption",
    logisticsPallet: "Europaletten-Lieferung",
    logisticsContainer: "Seefracht-Container (20ft/40ft)",
    logisticsExWorks: "Selbstabholung Lager (Ex-Works)",
    additionalComments: "Anmerkungen / Sonderwünsche (Eigenmarke, Lieferfristen...)",
    submitQuoteButton: "ANGEBOTSANFRAGE ABSENDEN",
    quoteSuccessMsg: "Ihre Angebotsanfrage wurde erfolgreich übermittelt! Unser B2B-Team meldet sich innerhalb von 24h.",

    // Footer
    footerAboutTitle: "Sentollbi B2B",
    footerAboutText: "Direktimporteur und Großhändler für afrikanische Premium-Lebensmittel in Europa.",
    footerQuickLinks: "Quick Links",
    footerContactTitle: "Vertrieb & Kontakt",
    footerRights: "Alle Rechte vorbehalten. Verkauf nur an Gewerbetreibende.",
    haccpCertified: "Zertifiziert nach HACCP-Standards & EU-Rückverfolgbarkeit",

    // Stats & Props
    statHaccpTitle: "100% HACCP Zertifiziert",
    statHaccpDesc: "Einhaltung europäischer Hygiene- und Lebensmittelstandards",
    statCountriesTitle: "Direktimport Afrika",
    statCountriesDesc: "Senegal, Elfenbeinküste, Kamerun, Mali",
    statStorageTitle: "Lagerung Frankreich",
    statStorageDesc: "Klimatisierte Lager und sofortige Verfügbarkeit",
    statShippingTitle: "Schnelle Logistik",
    statShippingDesc: "Versand innerhalb von 48/72h europaweit",

    // Private label / MDD
    whiteLabelBadge: "EIGENMARKEN-SERVICE (MDD)",
    whiteLabelTitle: "Ihre Produkte Unter Eigner Marke",
    whiteLabelSubtitle: "Wir produzieren, verpacken und etikettieren nach Ihren Wünschen für Ihre Filialen.",
    requestMddQuote: "EIGENMARKEN-PROJEKT BESPRECHEN"
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
