import React, { useState } from 'react';
import { QuoteItem, QuoteRequest } from '../types';
import { 
  X, 
  Trash2, 
  Printer, 
  Check, 
  ShoppingBag, 
  Package, 
  Send,
  Building,
  Mail
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface QuoteCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: QuoteItem[];
  onUpdateCartonCount: (productId: string, cartons: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onAddQuoteRequest: (quote: QuoteRequest) => void;
}

export const QuoteCartDrawer: React.FC<QuoteCartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateCartonCount,
  onRemoveItem,
  onClearCart,
  onAddQuoteRequest
}) => {
  if (!isOpen) return null;

  const { t } = useLanguage();
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  // Calculations
  const totalEstimatedAmount = cartItems.reduce((sum, item) => {
    const totalUnits = item.cartonsCount * item.product.unitsPerCarton;
    const tier = item.product.tieredPricing.find(
      (t) => item.cartonsCount >= t.minQty && (t.maxQty === null || item.cartonsCount <= t.maxQty)
    ) || item.product.tieredPricing[0];
    return sum + (totalUnits * tier.pricePerUnit);
  }, 0);

  const totalCartons = cartItems.reduce((sum, item) => sum + item.cartonsCount, 0);
  const totalGrossWeightKg = cartItems.reduce((sum, item) => sum + (item.cartonsCount * item.product.cartonGrossWeightKg), 0);
  const totalUnitsCount = cartItems.reduce((sum, item) => sum + (item.cartonsCount * item.product.unitsPerCarton), 0);

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !email || cartItems.length === 0) return;

    const newQuote: QuoteRequest = {
      id: `RFQ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      companyName,
      contactName: companyName,
      email,
      phone,
      country: 'France',
      vatNumber,
      message: `Commande configurée depuis le panier devis: ${totalCartons} cartons (${totalUnitsCount} unités).`,
      items: cartItems.map((item) => {
        const totalUnits = item.cartonsCount * item.product.unitsPerCarton;
        const tier = item.product.tieredPricing.find(
          (t) => item.cartonsCount >= t.minQty && (t.maxQty === null || item.cartonsCount <= t.maxQty)
        ) || item.product.tieredPricing[0];
        return {
          productId: item.product.id,
          productName: item.product.name,
          cartons: item.cartonsCount,
          totalUnits,
          unitPrice: tier.pricePerUnit,
          totalPrice: totalUnits * tier.pricePerUnit
        };
      }),
      totalEstimatedAmount,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    onAddQuoteRequest(newQuote);
    setSentSuccess(true);
    setTimeout(() => {
      onClearCart();
      setSentSuccess(false);
      onClose();
    }, 2500);
  };

  const handlePrintQuote = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg h-full flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="bg-[#013b22] text-white p-4 sm:p-5 flex items-center justify-between border-b border-emerald-900">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-black uppercase tracking-tight">
              {t('quoteDrawerTitle')}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-900 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          
          {sentSuccess ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-[#013b22] rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-emerald-700" />
              </div>
              <h3 className="text-xl font-black text-[#013b22]">DEVIS TRANSMIS AVEC SUCCÈS !</h3>
              <p className="text-xs text-gray-600">
                {t('quoteSuccessMsg')}
              </p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Package className="w-12 h-12 text-gray-300 mx-auto" />
              <p className="text-sm font-bold text-gray-600">{t('emptyQuoteBasket')}</p>
              <p className="text-xs text-gray-400">
                {t('emptyBasketSubtitle')}
              </p>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-bold text-gray-500 uppercase border-b pb-1">
                  <span>Références choisies ({cartItems.length})</span>
                  <button 
                    type="button"
                    onClick={onClearCart}
                    className="text-rose-600 hover:underline flex items-center gap-1 text-[10px] cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" /> {t('clearQuoteBasket')}
                  </button>
                </div>

                {cartItems.map((item) => {
                  const totalUnits = item.cartonsCount * item.product.unitsPerCarton;
                  const tier = item.product.tieredPricing.find(
                    (t) => item.cartonsCount >= t.minQty && (t.maxQty === null || item.cartonsCount <= t.maxQty)
                  ) || item.product.tieredPricing[0];
                  const lineTotal = totalUnits * tier.pricePerUnit;

                  return (
                    <div 
                      key={item.product.id}
                      className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-12 h-12 object-contain rounded-lg border border-gray-200 bg-white p-0.5 shrink-0"
                        />
                        <div>
                          <p className="font-extrabold text-[#013b22] uppercase leading-tight">{item.product.name}</p>
                          <p className="text-[10px] text-gray-500">
                            {item.product.unitsPerCarton} {t('pcs')} / {t('carton')} | {tier.pricePerUnit.toFixed(2)} €/{t('pcs')}
                          </p>
                          <p className="text-[10px] text-amber-700 font-bold">
                            Total: {totalUnits} {t('pcs')}
                          </p>
                        </div>
                      </div>

                      <div className="text-right space-y-1">
                        <div className="flex items-center gap-1 justify-end">
                          <button 
                            onClick={() => onUpdateCartonCount(item.product.id, Math.max(1, item.cartonsCount - 1))}
                            className="w-5 h-5 bg-white border rounded font-bold text-gray-700 hover:bg-gray-100 flex items-center justify-center text-xs cursor-pointer"
                            type="button"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.cartonsCount}
                            onChange={(e) => {
                              const val = parseInt(e.target.value, 10);
                              onUpdateCartonCount(item.product.id, isNaN(val) ? 1 : Math.max(1, val));
                            }}
                            className="w-12 text-center font-extrabold text-xs text-[#013b22] bg-white border border-gray-200 rounded py-0.5 focus:outline-none focus:ring-1 focus:ring-[#013b22] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <span className="text-[10px] text-gray-500 font-bold pr-1">ctn</span>
                          <button 
                            onClick={() => onUpdateCartonCount(item.product.id, item.cartonsCount + 1)}
                            className="w-5 h-5 bg-white border rounded font-bold text-gray-700 hover:bg-gray-100 flex items-center justify-center text-xs cursor-pointer"
                            type="button"
                          >
                            +
                          </button>
                          <button 
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-gray-400 hover:text-rose-600 ml-1 cursor-pointer"
                            type="button"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="font-black text-sm text-[#ea580c]">
                          {lineTotal.toFixed(2)} € HT
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Summary Box */}
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between text-gray-700 font-medium">
                  <span>Total Cartons:</span>
                  <strong className="text-[#013b22]">{totalCartons} {t('carton')}s ({totalUnitsCount} {t('pcs')})</strong>
                </div>
                <div className="flex justify-between text-gray-700 font-medium">
                  <span>Poids Brut Estimé:</span>
                  <strong className="text-[#013b22]">~{totalGrossWeightKg.toFixed(1)} kg</strong>
                </div>
                <div className="flex justify-between text-[#013b22] font-black text-sm border-t border-emerald-200 pt-2">
                  <span>{t('estimatedTotalHT')}</span>
                  <span className="text-[#ea580c] text-base">{totalEstimatedAmount.toFixed(2)} € HT</span>
                </div>
              </div>

              {/* Company Info Form */}
              <form onSubmit={handleSendQuote} className="space-y-3 pt-2">
                <p className="text-xs font-black text-[#013b22] uppercase border-b pb-1">
                  Coordonnées pour réception de l'offre
                </p>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700">{t('companyName')} *</label>
                  <div className="relative">
                    <Building className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="Nom entreprise"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full pl-8 pr-2 py-1.5 border rounded-lg text-xs focus:ring-1 focus:ring-[#013b22]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700">{t('emailPro')} *</label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                      <input
                        type="email"
                        required
                        placeholder="email@pro.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-8 pr-2 py-1.5 border rounded-lg text-xs focus:ring-1 focus:ring-[#013b22]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700">{t('siretNumber')}</label>
                    <input
                      type="text"
                      placeholder="FR 123456789"
                      value={vatNumber}
                      onChange={(e) => setVatNumber(e.target.value)}
                      className="w-full px-2 py-1.5 border rounded-lg text-xs focus:ring-1 focus:ring-[#013b22]"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handlePrintQuote}
                    className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Imprimer</span>
                  </button>

                  <button
                    type="submit"
                    className="flex-1 bg-[#013b22] hover:bg-[#025a34] text-white py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t('finalizeQuoteRequest')}</span>
                  </button>
                </div>

              </form>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
