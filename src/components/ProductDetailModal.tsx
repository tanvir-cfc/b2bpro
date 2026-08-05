import React, { useState } from 'react';
import { Product } from '../types';
import { 
  X, 
  Check, 
  Package, 
  Truck, 
  ShieldCheck, 
  FileCheck, 
  Barcode, 
  Calendar, 
  MapPin, 
  Plus, 
  Minus,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, cartonsCount: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  if (!product) return null;

  const { t } = useLanguage();
  const [cartons, setCartons] = useState(2);
  const [activeTab, setActiveTab] = useState<'specs' | 'logistics' | 'nutrition'>('specs');
  const [sampleRequested, setSampleRequested] = useState(false);

  const totalUnits = cartons * product.unitsPerCarton;

  // Find price tier
  const matchedTier = product.tieredPricing.find(
    (tier) => cartons >= tier.minQty && (tier.maxQty === null || cartons <= tier.maxQty)
  ) || product.tieredPricing[0];

  const currentUnitPrice = matchedTier.pricePerUnit;
  const totalAmount = totalUnits * currentUnitPrice;

  const totalGrossWeight = cartons * product.cartonGrossWeightKg;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-gray-200 my-8">
        
        {/* Header */}
        <div className="bg-[#013b22] text-white p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-amber-500 text-amber-950 text-xs font-extrabold px-2.5 py-1 rounded-md uppercase">
              {t('productTechSheetTitle')}
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
              {product.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-emerald-200 hover:text-white hover:bg-emerald-900/60 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 grid lg:grid-cols-12 gap-8 max-h-[80vh] overflow-y-auto">
          
          {/* Left Column - Image & Packaging Preview */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center relative flex items-center justify-center min-h-[260px]">
              <img 
                src={product.image} 
                alt={product.name} 
                className="max-h-60 max-w-full object-contain rounded-xl mx-auto drop-shadow-md"
              />
              <span className="absolute bottom-3 right-3 bg-white/90 text-[#013b22] text-xs font-bold px-2.5 py-1 rounded-lg border border-gray-200 shadow-sm">
                {t('eanCode')} {product.ean}
              </span>
            </div>

            {/* Quick Badges */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl flex items-center gap-2 text-emerald-900 font-bold">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Origine: {product.origin}</span>
              </div>
              <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl flex items-center gap-2 text-amber-900 font-bold">
                <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
                <span>DLUO: {product.shelfLife}</span>
              </div>
            </div>

            {/* Certifications row */}
            <div className="border border-gray-200 rounded-xl p-3 bg-gray-50 space-y-1.5">
              <p className="text-[11px] font-bold text-gray-500 uppercase">Conformité Sanitaire & Import</p>
              <div className="flex flex-wrap gap-2 text-[10px] font-extrabold text-gray-700">
                <span className="bg-white border px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> Norme HACCP
                </span>
                <span className="bg-white border px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                  <FileCheck className="w-3 h-3 text-emerald-600" /> Certifié ISO 22000
                </span>
                <span className="bg-white border px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                  <Barcode className="w-3 h-3 text-emerald-600" /> Traçabilité Lot
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Spec & Pricing Calculator */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Title & Subtitle */}
            <div>
              <h3 className="text-lg font-black text-[#013b22] leading-tight">
                {product.frenchTitle}
              </h3>
              <p className="text-gray-600 text-xs mt-1">
                {product.description}
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-gray-200 gap-4 text-xs font-bold">
              {[
                { id: 'specs', label: 'Tarifs Grossiste' },
                { id: 'logistics', label: 'Spécifications Logistiques' },
                { id: 'nutrition', label: 'Valeurs Nutritionnelles' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'border-b-2 border-[#013b22] text-[#013b22] font-black'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Pricing */}
            {activeTab === 'specs' && (
              <div className="space-y-4">
                
                {/* Volume Pricing Matrix */}
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                  <p className="text-[11px] font-extrabold text-gray-500 uppercase mb-2">
                    {t('pricingTierHeading')}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                    {product.tieredPricing.map((tier, idx) => {
                      const isActive = matchedTier === tier;
                      return (
                        <div 
                          key={idx}
                          className={`p-2 rounded-lg border transition-all ${
                            isActive 
                              ? 'bg-[#013b22] text-white border-[#013b22] font-bold shadow-md' 
                              : 'bg-white text-gray-700 border-gray-200'
                          }`}
                        >
                          <p className="text-[10px] opacity-80">{tier.label}</p>
                          <p className="text-sm font-black text-amber-400">{tier.pricePerUnit.toFixed(2)} €</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Interactive Order Configurator */}
                <div className="bg-emerald-50/80 border border-emerald-200 p-4 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-[#013b22]">
                    <span>CONFIGURER LE VOLUME:</span>
                    <span className="text-amber-800 font-extrabold">
                      1 {t('carton')} = {product.unitsPerCarton} {t('pcs')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-emerald-300">
                    <div className="flex items-center gap-3">
                      <Package className="w-6 h-6 text-[#013b22]" />
                      <div>
                        <p className="text-xs font-black text-[#013b22]">Quantité de Cartons</p>
                        <p className="text-[11px] text-gray-500 font-semibold">
                          Total: <strong className="text-emerald-800">{totalUnits} {t('pcs')}</strong> (~{totalGrossWeight.toFixed(1)} kg)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={() => setCartons(Math.max(1, cartons - 1))}
                        className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-black flex items-center justify-center text-sm cursor-pointer"
                        type="button"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={cartons}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          setCartons(isNaN(val) ? 1 : Math.max(1, val));
                        }}
                        className="w-16 h-8 text-center font-black text-base text-[#013b22] bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#013b22] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <button 
                        onClick={() => setCartons(cartons + 1)}
                        className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-black flex items-center justify-center text-sm cursor-pointer"
                        type="button"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Calculated summary */}
                  <div className="flex items-center justify-between pt-2 border-t border-emerald-200 text-xs">
                    <div>
                      <p className="text-gray-600 font-medium">Prix unitaire appliqué:</p>
                      <p className="text-base font-black text-[#013b22]">{currentUnitPrice.toFixed(2)} € HT</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600 font-medium">Estimation Total HT:</p>
                      <p className="text-xl font-black text-[#ea580c]">{totalAmount.toFixed(2)} € HT</p>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Tab 2: Logistics */}
            {activeTab === 'logistics' && (
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-2xl space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-xl border">
                    <p className="font-extrabold text-[#013b22] uppercase text-[10px]">Conditionnement Carton</p>
                    <p className="text-sm font-black text-gray-800 mt-1">{product.unitsPerCarton} unités / carton</p>
                    <p className="text-[11px] text-gray-500">Dimensions: {product.cartonDimensions}</p>
                    <p className="text-[11px] text-gray-500">Poids brut: {product.cartonGrossWeightKg} kg</p>
                  </div>

                  <div className="bg-white p-3 rounded-xl border">
                    <p className="font-extrabold text-[#013b22] uppercase text-[10px]">Palettisation Standard</p>
                    <p className="text-sm font-black text-gray-800 mt-1">{product.cartonsPerPallet} cartons / palette</p>
                    <p className="text-[11px] text-gray-500">Dimensions: {product.palletDimensions}</p>
                    <p className="text-[11px] text-gray-500">Poids palette: ~{product.palletWeightKg} kg</p>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-amber-900 text-xs flex items-center gap-2">
                  <Truck className="w-5 h-5 text-amber-700 shrink-0" />
                  <span>
                    Livraison directe par transporteur partenaire (Gefco / Dachser) en France, Belgique, Allemagne, Espagne, Italie.
                  </span>
                </div>
              </div>
            )}

            {/* Tab 3: Nutrition */}
            {activeTab === 'nutrition' && product.nutrition && (
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-2xl text-xs space-y-3">
                <p className="font-extrabold text-[#013b22] uppercase text-[10px]">
                  Tableau Nutritionnel Moyenne pour 100g
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <div className="bg-white p-2.5 rounded-lg border text-center">
                    <span className="text-[10px] text-gray-500">Énergie</span>
                    <p className="font-black text-gray-800">{product.nutrition.energy}</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border text-center">
                    <span className="text-[10px] text-gray-500">Protéines</span>
                    <p className="font-black text-gray-800">{product.nutrition.protein}</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border text-center">
                    <span className="text-[10px] text-gray-500">Glucides</span>
                    <p className="font-black text-gray-800">{product.nutrition.carbs}</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border text-center">
                    <span className="text-[10px] text-gray-500">Fibres</span>
                    <p className="font-black text-gray-800">{product.nutrition.fiber}</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border text-center">
                    <span className="text-[10px] text-gray-500">Matières Grasses</span>
                    <p className="font-black text-gray-800">{product.nutrition.fat}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  onAddToCart(product, cartons);
                  onClose();
                }}
                className="w-full sm:flex-1 bg-[#013b22] hover:bg-[#025a34] text-white py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <span>{t('addToQuote')} ({totalAmount.toFixed(2)} €)</span>
              </button>

              <button
                type="button"
                onClick={() => setSampleRequested(true)}
                disabled={sampleRequested}
                className={`w-full sm:w-auto px-5 py-3.5 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                  sampleRequested
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {sampleRequested ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-700" />
                    <span>Échantillon Demandé</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Demander Échantillon Pro</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
