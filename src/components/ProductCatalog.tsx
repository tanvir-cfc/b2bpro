import React, { useState } from 'react';
import { Product, Category } from '../types';
import { 
  Eye, 
  PlusCircle, 
  Search, 
  Sparkles, 
  Check, 
  Info,
  Package,
  Layers
} from 'lucide-react';

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
    setAddedNotice(`${cartons} carton(s) de ${product.name} ajouté(s) au devis !`);
    setTimeout(() => setAddedNotice(null), 3000);
  };

  return (
    <section className="py-12 bg-white px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-[#013b22] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Catalogue Grossiste Direct</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#013b22] uppercase tracking-tight">
            NOTRE GAMME DE PRODUITS
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Plus de 20 références disponibles en gros pour les professionnels de la distribution
          </p>
          <div className="w-16 h-1 bg-[#ea580c] mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Success Added Banner */}
        {addedNotice && (
          <div className="mb-6 bg-emerald-700 text-white p-3 rounded-xl font-bold text-center text-sm shadow-md flex items-center justify-center gap-2 animate-bounce">
            <Check className="w-5 h-5 text-amber-300" />
            <span>{addedNotice}</span>
          </div>
        )}

        {/* Filter Bar */}
        <div className="bg-gray-50 p-3 sm:p-4 rounded-2xl border border-gray-200 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Categories Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {[
              { id: 'all', label: 'Tous les produits' },
              { id: 'pots', label: 'Bocaux en Verre (250g)' },
              { id: 'sachets', label: 'Sachets & Doypacks' },
              { id: 'boissons', label: 'Boissons & Poudres' },
              { id: 'epices', label: 'Épices & Café' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as Category)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#013b22] text-white shadow-sm'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Rechercher une référence..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#013b22] focus:outline-none"
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
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group border-t-4 border-t-[#013b22]"
              >
                {/* Top Image Box */}
                <div className="relative p-4 bg-gray-50 flex items-center justify-center border-b border-gray-100 overflow-hidden">
                  
                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-[#ea580c] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-sm z-10">
                      {product.badge}
                    </span>
                  )}

                  {/* Format tag */}
                  <span className="absolute top-3 right-3 bg-emerald-900/80 text-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-md z-10">
                    {product.format}
                  </span>

                  {/* Image */}
                  <div className="w-full h-44 overflow-hidden rounded-xl flex items-center justify-center bg-white border border-gray-100 shadow-inner">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  
                  {/* Title & Format */}
                  <div>
                    <h3 className="text-sm font-black text-[#013b22] uppercase tracking-tight leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-gray-500 font-medium">
                      {product.subtitle}
                    </p>
                  </div>

                  {/* Tiered Price Table matching screenshot */}
                  <div className="bg-gray-50 rounded-xl p-2.5 border border-gray-200 text-xs">
                    <div className="grid grid-cols-2 text-[10px] font-bold text-gray-500 uppercase border-b border-gray-200 pb-1 mb-1">
                      <span>Quantité</span>
                      <span className="text-right">Prix unitaire HT</span>
                    </div>

                    <div className="space-y-0.5 font-medium text-[11px]">
                      {product.tieredPricing.map((tier, idx) => {
                        const isApplicable = totalUnits >= tier.minQty && (tier.maxQty === null || totalUnits <= tier.maxQty);
                        return (
                          <div 
                            key={idx} 
                            className={`grid grid-cols-2 py-0.5 px-1 rounded transition-colors ${
                              isApplicable 
                                ? 'bg-amber-100/80 font-black text-amber-900 border border-amber-300' 
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
                    <div className="flex items-center gap-1.5 text-[#013b22]">
                      <Package className="w-4 h-4 text-amber-600" />
                      <span className="font-bold text-[11px]">Conditionnement:</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-extrabold text-gray-700">
                        {currentCartons} carton ({totalUnits} pcs)
                      </span>
                      <div className="flex items-center border border-gray-300 rounded bg-white">
                        <button 
                          onClick={() => handleCartonQtyChange(product.id, currentCartons - 1)}
                          className="px-1.5 py-0.5 text-xs font-bold text-gray-600 hover:bg-gray-100 border-r border-gray-200"
                          type="button"
                          title="Diminuer"
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
                          className="w-12 text-center text-xs font-bold text-[#013b22] focus:outline-none focus:ring-1 focus:ring-[#013b22] py-0.5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <button 
                          onClick={() => handleCartonQtyChange(product.id, currentCartons + 1)}
                          className="px-1.5 py-0.5 text-xs font-bold text-gray-600 hover:bg-gray-100 border-l border-gray-200"
                          type="button"
                          title="Augmenter"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Buttons Action */}
                  <div className="space-y-2 pt-1">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="w-full bg-white hover:bg-gray-100 text-[#013b22] border border-[#013b22] py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>VOIR LA FICHE PRODUIT</span>
                    </button>

                    <button
                      onClick={() => handleAdd(product)}
                      className="w-full bg-[#013b22] hover:bg-[#025a34] text-white py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm"
                    >
                      <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
                      <span>AJOUTER AU DEVIS</span>
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
              onClick={onViewAllClick}
              className="inline-flex items-center gap-2 bg-[#013b22] hover:bg-[#025a34] text-white px-8 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
            >
              <span>VOIR TOUT LE CATALOGUE B2B</span>
              <Layers className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
