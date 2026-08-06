import { Product, QuoteRequest } from '../types';

import MADD_JAR_IMG from '../assets/images/sentollbi_madd_jar_1785606193943.jpg';
import BAOBAB_POUCH_IMG from '../assets/images/sentollbi_baobab_pouch_1785606210397.jpg';
import BISSAP_POUCH_IMG from '../assets/images/sentollbi_bissap_pouch_1785606221551.jpg';
import PEANUTS_POUCH_IMG from '../assets/images/sentollbi_peanuts_pouch_1785606235045.jpg';
import TOUBA_JAR_IMG from '../assets/images/sentollbi_touba_jar_1785606250291.jpg';

export const MADD_JAR_IMAGE = MADD_JAR_IMG;
export const BAOBAB_POUCH_IMAGE = BAOBAB_POUCH_IMG;
export const BISSAP_POUCH_IMAGE = BISSAP_POUCH_IMG;
export const CAFE_TOUBA_IMAGE = TOUBA_JAR_IMG;
export const MANGO_DRIED_IMAGE = "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&q=80&w=800";
export const PEANUTS_POUCH_IMAGE = PEANUTS_POUCH_IMG;

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-madd-250g',
    name: 'MADD 100% Naturel',
    frenchTitle: 'Maad (Detarium Microcarpum) 100% Naturel',
    subtitle: 'Fruit sauvage d\'Afrique riche en nutriments & fibres',
    category: 'pots',
    format: 'Pot de 250g',
    netWeight: '250g',
    image: MADD_JAR_IMAGE,
    badge: 'Best-Seller B2B',
    origin: 'Sénégal',
    description: 'Le Madd (Detarium microcarpum) est un fruit sauvage très populaire d\'Afrique de l\'Ouest, apprécié pour sa pulpe acidulée et sucrée. Préparé avec soin dans un bocal en verre scellé de 250g avec couvercle doré.',
    ean: '3047875661285',
    shelfLife: '24 mois',
    storageCondition: 'À conserver dans un endroit frais et sec, à l\'abri de la lumière.',
    unitsPerCarton: 30,
    cartonDimensions: '40 x 30 x 40 cm',
    cartonNetWeightKg: 4.5,
    cartonGrossWeightKg: 5.0,
    cartonsPerPallet: 24,
    palletDimensions: '120 x 80 x 150 cm',
    palletWeightKg: 120,
    stockInCartons: 180,
    minOrderCartons: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 10, pricePerUnit: 3.75, label: '1 à 10 cartons', discount: '—' },
      { minQty: 11, maxQty: 25, pricePerUnit: 3.37, label: '11 à 25 cartons', discount: '-10 %' },
      { minQty: 26, maxQty: 45, pricePerUnit: 2.86, label: '26 à 45 cartons', discount: '-15 %' },
      { minQty: 46, maxQty: null, pricePerUnit: 0, label: 'Plus de 45 cartons', discount: 'À négocier', customPriceText: 'Sur devis' }
    ],
    nutrition: {
      energy: '357 Kcal',
      protein: '3,2 g',
      carbs: '66,0 g',
      fiber: '8,5 g',
      fat: '1,2 g'
    },
    benefits: [
      'Riche en fibres alimentaires (8,5g / 100g)',
      'Source d\'énergie naturelle (357 Kcal)',
      'Sans conservateurs artificiels',
      'Certifié aux normes européennes HACCP & ISO 22000'
    ]
  },
  {
    id: 'prod-baobab-250g',
    name: 'POUDRE DE BAOBAB',
    frenchTitle: 'Poudre de Baobab (Pain de Singe) 250G',
    subtitle: 'Sachet Doypack Jaune 250g - Superaliment Africain',
    category: 'sachets',
    format: 'Sachet 250g',
    netWeight: '250g',
    image: BAOBAB_POUCH_IMAGE,
    badge: 'Superfood Bio',
    origin: 'Sénégal',
    description: 'Poudre de pulpe de baobab 100% pure et naturelle en sachet hermétique Doypack jaune de 250g. Riche en vitamine C, calcium et fibres prébiotiques. Idéal pour smoothies, yaourts et boissons santé.',
    ean: '3047875661322',
    shelfLife: '24 mois',
    storageCondition: 'Au sec, à l\'abri de l\'humidité.',
    unitsPerCarton: 40,
    cartonDimensions: '50 x 40 x 50 cm',
    cartonNetWeightKg: 4.5,
    cartonGrossWeightKg: 5.0,
    cartonsPerPallet: 12,
    palletDimensions: '120 x 80 x 150 cm',
    palletWeightKg: 60,
    stockInCartons: 140,
    minOrderCartons: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 10, pricePerUnit: 3.75, label: '1 à 10 cartons', discount: '—' },
      { minQty: 11, maxQty: 25, pricePerUnit: 3.37, label: '11 à 25 cartons', discount: '-10 %' },
      { minQty: 26, maxQty: 45, pricePerUnit: 2.86, label: '26 à 45 cartons', discount: '-15 %' },
      { minQty: 46, maxQty: null, pricePerUnit: 0, label: 'Plus de 45 cartons', discount: 'À négocier', customPriceText: 'Sur devis' }
    ],
    nutrition: {
      energy: '230 Kcal',
      protein: '2,8 g',
      carbs: '44,0 g',
      fiber: '45,0 g',
      fat: '0,2 g'
    },
    benefits: [
      'Apport exceptionnel en Vitamine C et Fibres',
      'Sachet Doypack refermable avec zip conservation',
      'Conforme aux normes de distribution B2B Europe'
    ]
  },
  {
    id: 'prod-bissap-pot-250g',
    name: 'BISSAP D\'HIBISCUS',
    frenchTitle: 'Bissap d\'Hibiscus (Fleurs Séchées) 250G',
    subtitle: 'Fleurs d\'Hibiscus Sabdariffa en Sachet Doypack 250g',
    category: 'sachets',
    format: 'Sachet 250g',
    netWeight: '250g',
    image: BISSAP_POUCH_IMAGE,
    badge: '100% Naturel',
    origin: 'Sénégal / Afrique de l\'Ouest',
    description: 'Fleurs d\'Hibiscus rouge (Bissap / Karkadé) sélectionnées à la main et conditionnées en sachet Doypack brun de 250g. Pour jus de bissap, infusions chaudes ou rafraîchissements.',
    ean: '3047875661308',
    shelfLife: '24 mois',
    storageCondition: 'À conserver au frais et au sec.',
    unitsPerCarton: 30,
    cartonDimensions: '40 x 30 x 40 cm',
    cartonNetWeightKg: 4.0,
    cartonGrossWeightKg: 4.5,
    cartonsPerPallet: 24,
    palletDimensions: '120 x 80 x 150 cm',
    palletWeightKg: 110,
    stockInCartons: 150,
    minOrderCartons: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 10, pricePerUnit: 3.75, label: '1 à 10 cartons', discount: '—' },
      { minQty: 11, maxQty: 25, pricePerUnit: 3.37, label: '11 à 25 cartons', discount: '-10 %' },
      { minQty: 26, maxQty: 45, pricePerUnit: 2.86, label: '26 à 45 cartons', discount: '-15 %' },
      { minQty: 46, maxQty: null, pricePerUnit: 0, label: 'Plus de 45 cartons', discount: 'À négocier', customPriceText: 'Sur devis' }
    ],
    nutrition: {
      energy: '245 Kcal',
      protein: '4,1 g',
      carbs: '52,0 g',
      fiber: '12,0 g',
      fat: '0,8 g'
    },
    benefits: [
      'Fort pouvoir antioxydant naturel',
      'Saveur acidulée et rafraîchissante',
      'Sans colorant ni conservateur'
    ]
  },
  {
    id: 'prod-cacahuetes-150g',
    name: 'CACAHUÈTES SUCRÉES',
    frenchTitle: 'Cacahuètes Sucrées 150G - Sans Huile de Palme',
    subtitle: 'Chouchous d\'Afrique - Sachet Doypack Rouge 150g',
    category: 'sachets',
    format: 'Sachet 150g',
    netWeight: '150g',
    image: PEANUTS_POUCH_IMAGE,
    badge: 'Sans Huile de Palme',
    origin: 'Sénégal',
    description: 'Arachides sélectionnées de qualité supérieure, enrobées de sucre cristallisé et dorées selon la recette artisanale. Conditionnées en sachet Doypack rouge de 150g, garanti sans huile de palme.',
    ean: '3047875661339',
    shelfLife: '12 mois',
    storageCondition: 'Conserver à l\'abri de l\'humidité et de la chaleur.',
    unitsPerCarton: 30,
    cartonDimensions: '40 x 30 x 30 cm',
    cartonNetWeightKg: 4.5,
    cartonGrossWeightKg: 5.0,
    cartonsPerPallet: 30,
    palletDimensions: '120 x 80 x 150 cm',
    palletWeightKg: 150,
    stockInCartons: 250,
    minOrderCartons: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 10, pricePerUnit: 3.75, label: '1 à 10 cartons', discount: '—' },
      { minQty: 11, maxQty: 25, pricePerUnit: 3.37, label: '11 à 25 cartons', discount: '-10 %' },
      { minQty: 26, maxQty: 45, pricePerUnit: 2.86, label: '26 à 45 cartons', discount: '-15 %' },
      { minQty: 46, maxQty: null, pricePerUnit: 0, label: 'Plus de 45 cartons', discount: 'À négocier', customPriceText: 'Sur devis' }
    ],
    nutrition: {
      energy: '512 Kcal',
      protein: '18,5 g',
      carbs: '48,0 g',
      fiber: '6,2 g',
      fat: '28,4 g'
    },
    benefits: [
      'Snacking gourmand et croustillant',
      'Sans huile de palme',
      'Format idéal pour caisses et rayonnages épicerie'
    ]
  },
  {
    id: 'prod-cafe-touba-250g',
    name: 'CAFÉ TOUBA MOULU',
    frenchTitle: 'Café Touba Moulu aux Épices (Djar)',
    subtitle: 'Café Robusta torréfié au piment de Selim',
    category: 'pots',
    format: 'Pot de 250g',
    netWeight: '250g',
    image: CAFE_TOUBA_IMAGE,
    badge: 'Produit Phare',
    origin: 'Sénégal',
    description: 'Le Café Touba traditionnel est moulu et aromatisé au poivre de Selim (Kani / Djar) et clou de girofle. Une boisson tonifiante aux notes intenses et poivrées.',
    ean: '3047875661292',
    shelfLife: '24 mois',
    storageCondition: 'À conserver au sec et à l\'abri des odeurs.',
    unitsPerCarton: 30,
    cartonDimensions: '40 x 30 x 40 cm',
    cartonNetWeightKg: 4.5,
    cartonGrossWeightKg: 5.0,
    cartonsPerPallet: 24,
    palletDimensions: '120 x 80 x 150 cm',
    palletWeightKg: 120,
    stockInCartons: 210,
    minOrderCartons: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 10, pricePerUnit: 3.75, label: '1 à 10 cartons', discount: '—' },
      { minQty: 11, maxQty: 25, pricePerUnit: 3.37, label: '11 à 25 cartons', discount: '-10 %' },
      { minQty: 26, maxQty: 45, pricePerUnit: 2.86, label: '26 à 45 cartons', discount: '-15 %' },
      { minQty: 46, maxQty: null, pricePerUnit: 0, label: 'Plus de 45 cartons', discount: 'À négocier', customPriceText: 'Sur devis' }
    ],
    nutrition: {
      energy: '280 Kcal',
      protein: '11,5 g',
      carbs: '42,0 g',
      fiber: '14,0 g',
      fat: '2,1 g'
    },
    benefits: [
      'Propriétés digestives et stimulantes',
      'Épices 100% authentiques',
      'Bocal verre étanche longue conservation'
    ]
  },
  {
    id: 'prod-mangue-100g',
    name: 'MANGUE SÉCHÉE',
    frenchTitle: 'Mangue Séchée d\'Afrique Premium',
    subtitle: 'Sachet Doypack Hermétique de 100g',
    category: 'sachets',
    format: 'Sachet de 100g',
    netWeight: '100g',
    image: MANGO_DRIED_IMAGE,
    badge: 'Sans Sucre Ajouté',
    origin: 'Burkina Faso / Sénégal',
    description: 'Lanières de mangues séchées de variété Brooks & Amélie, moelleuses et parfumées. Récoltées à maturité optimale et séchées délicatement à basse température.',
    ean: '3047875661315',
    shelfLife: '18 mois',
    storageCondition: 'Conserver dans un endroit sec à température ambiante.',
    unitsPerCarton: 40,
    cartonDimensions: '40 x 30 x 30 cm',
    cartonNetWeightKg: 4.0,
    cartonGrossWeightKg: 4.5,
    cartonsPerPallet: 28,
    palletDimensions: '120 x 80 x 160 cm',
    palletWeightKg: 126,
    stockInCartons: 320,
    minOrderCartons: 1,
    tieredPricing: [
      { minQty: 1, maxQty: 10, pricePerUnit: 3.75, label: '1 à 10 cartons', discount: '—' },
      { minQty: 11, maxQty: 25, pricePerUnit: 3.37, label: '11 à 25 cartons', discount: '-10 %' },
      { minQty: 26, maxQty: 45, pricePerUnit: 2.86, label: '26 à 45 cartons', discount: '-15 %' },
      { minQty: 46, maxQty: null, pricePerUnit: 0, label: 'Plus de 45 cartons', discount: 'À négocier', customPriceText: 'Sur devis' }
    ],
    nutrition: {
      energy: '319 Kcal',
      protein: '2,5 g',
      carbs: '73,0 g',
      fiber: '7,8 g',
      fat: '0,9 g'
    },
    benefits: [
      '100% fruit pur, 0% conservateur',
      'Sachet Doypack refermable avec zip',
      'Format snacking B2B idéal pour rayons bio & épiceries'
    ]
  }
];

export const INITIAL_QUOTES: QuoteRequest[] = [
  {
    id: 'RFQ-2026-0042',
    companyName: 'EuroAfro Distribution S.A.R.L.',
    contactName: 'Marc Lefebvre',
    email: 'm.lefebvre@euroafro.fr',
    phone: '+33 1 42 68 55 00',
    country: 'France',
    vatNumber: 'FR 84 920184920',
    message: 'Demande d\'approvisionnement mensuel pour 12 magasins bio en Région Parisienne. Livraison sur palette Europe.',
    requestedQtyDescription: '15 cartons Madd, 10 cartons Café Touba, 20 cartons Mangue',
    items: [
      {
        productId: 'prod-madd-250g',
        productName: 'MADD 100% Naturel (Pot de 250g)',
        cartons: 15,
        totalUnits: 180,
        unitPrice: 5.40,
        totalPrice: 972.00
      },
      {
        productId: 'prod-cafe-touba-250g',
        productName: 'CAFÉ TOUBA MOULU (Pot de 250g)',
        cartons: 10,
        totalUnits: 120,
        unitPrice: 4.50,
        totalPrice: 540.00
      }
    ],
    totalEstimatedAmount: 1512.00,
    status: 'pending',
    createdAt: '2026-08-01T09:15:00Z'
  },
  {
    id: 'RFQ-2026-0038',
    companyName: 'Tropic Market Bruxelles',
    contactName: 'Sophie Van Der Berg',
    email: 'sophie@tropicmarket.be',
    phone: '+32 2 555 12 34',
    country: 'Belgique',
    vatNumber: 'BE 0829102931',
    message: 'Commande d\'essai 1 palette complète multi-références.',
    requestedQtyDescription: '50 cartons assortis',
    items: [
      {
        productId: 'prod-madd-250g',
        productName: 'MADD 100% Naturel',
        cartons: 25,
        totalUnits: 300,
        unitPrice: 5.40,
        totalPrice: 1620.00
      }
    ],
    totalEstimatedAmount: 1620.00,
    status: 'processed',
    createdAt: '2026-07-30T14:22:00Z'
  }
];
