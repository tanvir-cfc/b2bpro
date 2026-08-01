import React, { useState, useEffect } from 'react';
import { Product, QuoteItem, QuoteRequest } from './types';
import { INITIAL_PRODUCTS, INITIAL_QUOTES } from './data/mockProducts';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ValueProps } from './components/ValueProps';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { StatsAndPartners } from './components/StatsAndPartners';
import { LogisticsSection } from './components/LogisticsSection';
import { QuoteFormSection } from './components/QuoteFormSection';
import { WhiteLabelSection } from './components/WhiteLabelSection';
import { QuoteCartDrawer } from './components/QuoteCartDrawer';
import { AdminDashboard } from './components/AdminDashboard';
import { ProLoginModal } from './components/ProLoginModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('accueil');
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('sentollbi_products_v2');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [quotes, setQuotes] = useState<QuoteRequest[]>(() => {
    const saved = localStorage.getItem('sentollbi_quotes');
    return saved ? JSON.parse(saved) : INITIAL_QUOTES;
  });

  const [cartItems, setCartItems] = useState<QuoteItem[]>(() => {
    const saved = localStorage.getItem('sentollbi_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Sync state to local persistence
  useEffect(() => {
    localStorage.setItem('sentollbi_products_v2', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sentollbi_quotes', JSON.stringify(quotes));
  }, [quotes]);

  useEffect(() => {
    localStorage.setItem('sentollbi_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Cart operations
  const handleAddToCart = (product: Product, cartonsCount: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, cartonsCount: item.cartonsCount + cartonsCount }
            : item
        );
      }
      return [...prev, { product, cartonsCount, selectedUnitTierPrice: product.tieredPricing[0].pricePerUnit }];
    });
  };

  const handleUpdateCartonCount = (productId: string, cartons: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, cartonsCount: cartons } : item))
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Quotes management
  const handleAddQuoteRequest = (quote: QuoteRequest) => {
    setQuotes((prev) => [quote, ...prev]);
  };

  const handleUpdateQuoteStatus = (quoteId: string, status: 'pending' | 'processed' | 'shipped' | 'cancelled') => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === quoteId ? { ...q, status } : q))
    );
  };

  // Admin Product operations
  const handleAddProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  const handleUpdateProduct = (updatedProd: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProd.id ? updatedProd : p)));
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-amber-200 selection:text-amber-900">
      
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        quoteCartCount={cartItems.length}
        setIsQuoteDrawerOpen={setIsQuoteDrawerOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />

      {/* Main Page View Router */}
      <main>
        {activeTab === 'admin' ? (
          <AdminDashboard
            products={products}
            quotes={quotes}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateQuoteStatus={handleUpdateQuoteStatus}
          />
        ) : activeTab === 'catalogue' ? (
          <div className="py-8 space-y-6">
            <ProductCatalog
              products={products}
              onSelectProduct={setSelectedProductModal}
              onAddToCart={handleAddToCart}
              onViewAllClick={() => {}}
              isFullView={true}
            />
            <LogisticsSection />
          </div>
        ) : activeTab === 'marques' ? (
          <div className="py-8 space-y-6">
            <WhiteLabelSection />
            <QuoteFormSection onAddQuoteRequest={handleAddQuoteRequest} />
          </div>
        ) : activeTab === 'importation' || activeTab === 'ressources' ? (
          <div className="py-8 space-y-6">
            <LogisticsSection />
            <StatsAndPartners />
            <QuoteFormSection onAddQuoteRequest={handleAddQuoteRequest} />
          </div>
        ) : activeTab === 'distributeur' ? (
          <div className="py-8 space-y-6">
            <QuoteFormSection onAddQuoteRequest={handleAddQuoteRequest} />
            <ValueProps />
            <LogisticsSection />
          </div>
        ) : (
          /* Default Accueil / Home Page View */
          <div className="space-y-0">
            <Hero
              onOpenQuoteForm={() => setActiveTab('distributeur')}
              onOpenCatalog={() => setActiveTab('catalogue')}
              onDownloadCatalog={() => {
                alert("Téléchargement du catalogue officiel B2B SenToll Bi (PDF)...");
              }}
            />

            <ValueProps />

            <ProductCatalog
              products={products}
              onSelectProduct={setSelectedProductModal}
              onAddToCart={handleAddToCart}
              onViewAllClick={() => setActiveTab('catalogue')}
              isFullView={false}
            />

            <StatsAndPartners />

            <LogisticsSection />

            <WhiteLabelSection />

            <QuoteFormSection onAddQuoteRequest={handleAddQuoteRequest} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={setActiveTab} />

      {/* Modals and Drawers */}
      <ProductDetailModal
        product={selectedProductModal}
        onClose={() => setSelectedProductModal(null)}
        onAddToCart={handleAddToCart}
      />

      <QuoteCartDrawer
        isOpen={isQuoteDrawerOpen}
        onClose={() => setIsQuoteDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateCartonCount={handleUpdateCartonCount}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onAddQuoteRequest={handleAddQuoteRequest}
      />

      <ProLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

    </div>
  );
}
