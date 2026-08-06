import React, { useState } from 'react';
import { Product, Category } from '../types';
import { 
  Eye, 
  PlusCircle, 
  Search, 
  Sparkles, 
  Check, 
  Package,
  Layers
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

import MADD_JAR_IMG from '../assets/images/sentollbi_madd_jar_1785606193943.jpg';
import BAOBAB_POUCH_IMG from '../assets/images/sentollbi_baobab_pouch_1785606210397.jpg';
import BISSAP_POUCH_IMG from '../assets/images/sentollbi_bissap_pouch_1785606221551.jpg';
import PEANUTS_POUCH_IMG from '../assets/images/sentollbi_peanuts_pouch_1785606235045.jpg';

interface ProductCatalogProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, cartonsCount: number) => void;
  onViewAllClick: () => void;
  isFullView?: boolean;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onViewAllClick,
  isFullView = false
}) => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartonQuantities, setCartonQuantities] = useState<Record<string, number>>({});
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  // Filter logic
  const filteredProducts = products.filter((p) => {
    const matchesCategory = 
      selectedCategory === 'all' ||
      (selectedCategory === 'pots' && p.category === 'pots') ||
      (selectedCategory === 'sachets' && p.category === 'sachets') ||
      (selectedCategory === 'boissons' && (p.category === 'pots' || p.category === 'boissons')) ||
      (selectedCategory === 'epices' && p.category === 'epices');

    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.frenchTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const displayedProducts = isFullView ? filteredProducts : filteredProducts.slice(0, 4);

  const handleCartonQtyChange = (productId: string, qty: number) => {
    setCartonQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, qty)
    }));
  };

  const handleAdd = (product: Product) => {
    const cartons = cartonQuantities[product.id] || 1;
    onAddToCart(product, cartons);
    setAddedNotice(`${cartons} ${t('carton')}(s) ${product.name} ${t('addedToQuoteNotice')}`);
    setTimeout(() => setAddedNotice(null), 3000);
  };

  return (
    <section className="py-12 bg-[#f8faf8] border-b border-gray-200 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header matching screenshot */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <p className="text-xs font-black uppercase tracking-widest text-[#d97706] mb-1">
            {t('ourProductRange') || 'OUR PRODUCT RANGE'}
          </p>
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#0b2416] tracking-tight">
            {t('premiumAfricanProductsTitle') || 'Premium African Products'}
          </h2>
          <p className="text-gray-600 text-sm mt-1 font-medium">
            {t('premiumAfricanProductsSubtitle') || 'Carefully selected natural products, perfect for your business.'}
          </p>
          <div className="w-16 h-1 bg-[#d97706] mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Success Added Banner */}
        {addedNotice && (
          <div className="mb-6 bg-emerald-700 text-white p-3 rounded-xl font-bold text-center text-sm shadow-md flex items-center justify-center gap-2 animate-bounce">
            <Check className="w-5 h-5 text-amber-300" />
            <span>{addedNotice}</span>
          </div>
        )}

        {/* Filter Bar */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl border border-gray-200 shadow-sm mb-8 flex flex-col md:flex-row justify-between items-center gap-3">
          
          {/* Categories Tabs - Horizontally scrollable on mobile */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-none touch-pan-x">
            {[
              { id: 'all', label: t('allProducts') },
              { id: 'pots', label: t('glassJarsFormat') },
              { id: 'sachets', label: t('sachetsDoypacks') },
              { id: 'boissons', label: t('drinksPowders') },
              { id: 'epices', label: t('spicesCoffee') }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as Category)}
                className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#0b2416] text-amber-400 shadow-md border border-emerald-900'
                    : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 font-bold'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#0b2416] focus:outline-none"
            />
          </div>

        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => {
            const currentCartons = cartonQuantities[product.id] || 1;
            const totalUnits = currentCartons * product.unitsPerCarton;

            return (
              <div 
                key={product.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group border-t-4 border-t-[#0b2416]"
              >
                {/* Top Image Box */}
                <div className="relative p-4 bg-gradient-to-b from-gray-50 to-emerald-50/20 flex items-center justify-center border-b border-gray-100 overflow-hidden">
                  
                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-[#0b2416] text-amber-400 text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-sm z-10">
                      {product.badge}
                    </span>
                  )}

                  {/* Format tag */}
                  <span className="absolute top-3 right-3 bg-emerald-900/80 text-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-md z-10">
                    {product.format}
                  </span>

                  {/* Image */}
                  <div className="w-full h-48 rounded-xl flex items-center justify-center bg-white border border-gray-100 shadow-xs p-2">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  
                  {/* Title & Format */}
                  <div>
                    <h3 className="text-sm font-black text-[#0b2416] uppercase tracking-tight leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-gray-500 font-medium">
                      {product.subtitle}
                    </p>
                  </div>

                  {/* Tiered Price Table matching screenshot */}
                  <div className="bg-gray-50 rounded-xl p-2.5 border border-gray-200 text-xs">
                    <div className="grid grid-cols-2 text-[10px] font-bold text-gray-500 uppercase border-b border-gray-200 pb-1 mb-1">
                      <span>{t('quantity')}</span>
                      <span className="text-right">{t('pricePerUnitExcl')}</span>
                    </div>

                    <div className="space-y-0.5 font-medium text-[11px]">
                      {product.tieredPricing.map((tier, idx) => {
                        const isApplicable = currentCartons >= tier.minQty && (tier.maxQty === null || currentCartons <= tier.maxQty);
                        return (
                          <div 
                            key={idx} 
                            className={`grid grid-cols-2 py-0.5 px-1 rounded transition-colors ${
                              isApplicable 
                                ? 'bg-amber-100/80 font-black text-amber-950 border border-amber-300' 
                                : 'text-gray-700'
                            }`}
                          >
                            <span>{tier.label}</span>
                            <span className="text-right font-bold">
                              {tier.pricePerUnit.toFixed(2)} €
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Carton selector & Units preview */}
                  <div className="bg-emerald-50/60 p-2 rounded-lg border border-emerald-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-[#0b2416]">
                      <Package className="w-4 h-4 text-amber-600" />
                      <span className="font-bold text-[11px]">{t('packaging')}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-extrabold text-gray-700">
                        {currentCartons} {t('carton')} ({totalUnits} {t('pcs')})
                      </span>
                      <div className="flex items-center border border-gray-300 rounded bg-white">
                        <button 
                          onClick={() => handleCartonQtyChange(product.id, currentCartons - 1)}
                          className="px-1.5 py-0.5 text-xs font-bold text-gray-600 hover:bg-gray-100 border-r border-gray-200 cursor-pointer"
                          type="button"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={currentCartons}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            handleCartonQtyChange(product.id, isNaN(val) ? 1 : val);
                          }}
                          className="w-12 text-center text-xs font-bold text-[#0b2416] focus:outline-none focus:ring-1 focus:ring-[#0b2416] py-0.5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <button 
                          onClick={() => handleCartonQtyChange(product.id, currentCartons + 1)}
                          className="px-1.5 py-0.5 text-xs font-bold text-gray-600 hover:bg-gray-100 border-l border-gray-200 cursor-pointer"
                          type="button"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Buttons Action */}
                  <div className="space-y-2 pt-1">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="w-full bg-white hover:bg-gray-100 text-[#0b2416] border border-[#0b2416] py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{t('viewProductSheet')}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAdd(product)}
                      className="w-full bg-[#0b2416] hover:bg-[#04150b] text-white py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer border border-amber-400/30"
                    >
                      <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
                      <span>{t('addToQuote')}</span>
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* View All Catalogue Button */}
        {!isFullView && (
          <div className="text-center mt-10">
            <button
              type="button"
              onClick={onViewAllClick}
              className="inline-flex items-center gap-2 bg-[#d97706] hover:bg-[#b45309] text-white px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-md hover:shadow-lg transition-all cursor-pointer border border-amber-400/30"
            >
              <span>{t('viewAllB2BCatalog')}</span>
              <Layers className="w-4 h-4 text-amber-100" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

