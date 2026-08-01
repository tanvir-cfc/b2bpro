export type Category = 'all' | 'pots' | 'sachets' | 'boissons' | 'epices' | 'confiserie';

export interface TierPrice {
  minQty: number; // e.g. 10
  maxQty: number | null; // e.g. 29 or null for 120+
  pricePerUnit: number; // e.g. 6.90
  label: string; // e.g. "10 - 29 pots"
}

export interface Product {
  id: string;
  name: string;
  frenchTitle: string;
  subtitle: string;
  category: Category;
  format: string; // e.g., "Pot de 250g", "Sachet de 100g", "Sachet 250g"
  netWeight: string; // "250g", "100g"
  image: string;
  secondaryImages?: string[];
  badge?: string; // "100% Naturel", "Best-Seller", "Certifié Bio", "Sans Huile de Palme"
  origin: string; // e.g., "Sénégal / Afrique de l'Ouest"
  description: string;
  ean: string; // e.g. "3047875661285"
  shelfLife: string; // e.g. "24 mois"
  storageCondition: string; // "À conserver dans un endroit frais et sec"
  
  // Packaging & Logistics specs
  unitsPerCarton: number; // e.g. 12
  cartonDimensions: string; // e.g. "30 x 23 x 15 cm"
  cartonNetWeightKg: number; // 3.0
  cartonGrossWeightKg: number; // 3.5
  cartonsPerPallet: number; // 100
  palletDimensions: string; // "120 x 80 x 150 cm"
  palletWeightKg: number; // ~350 kg
  
  // Inventory state
  stockInCartons: number; // Stock level in cartons
  minOrderCartons: number; // e.g. 1 (or min order 10 cartons total across order)
  
  // Tiered Pricing (per unit)
  tieredPricing: TierPrice[];
  
  // Nutritional table (per 100g)
  nutrition?: {
    energy: string;
    protein: string;
    carbs: string;
    fiber: string;
    fat: string;
  };
  
  // Benefits/Features
  benefits: string[];
}

export interface QuoteItem {
  product: Product;
  cartonsCount: number; // e.g., 5 cartons = 60 units
  selectedUnitTierPrice: number;
}

export interface QuoteRequest {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  vatNumber?: string;
  message?: string;
  requestedQtyDescription?: string;
  items: {
    productId: string;
    productName: string;
    cartons: number;
    totalUnits: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  totalEstimatedAmount: number;
  status: 'pending' | 'processed' | 'shipped' | 'cancelled';
  createdAt: string;
}

export interface FilterState {
  category: Category;
  searchQuery: string;
  minTierQty: number;
  formatType: 'all' | 'pots' | 'sachets';
}
