import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Send, 
  Building2, 
  Mail, 
  Phone, 
  Globe, 
  Boxes, 
  Check 
} from 'lucide-react';
import { QuoteRequest } from '../types';

interface QuoteFormSectionProps {
  onAddQuoteRequest: (quote: QuoteRequest) => void;
}

export const QuoteFormSection: React.FC<QuoteFormSectionProps> = ({ onAddQuoteRequest }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    country: 'France',
    quantityDesired: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.email || !formData.phone) return;

    const newQuote: QuoteRequest = {
      id: `RFQ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      companyName: formData.companyName,
      contactName: formData.contactName || formData.companyName,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      message: formData.message,
      requestedQtyDescription: formData.quantityDesired,
      items: [],
      totalEstimatedAmount: 0,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    onAddQuoteRequest(newQuote);
    setSubmitted(true);
  };

  return (
    <section className="py-12 bg-white px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Devenez Distributeur Banner matching screenshot */}
          <div className="lg:col-span-5 relative bg-gradient-to-br from-[#022c19] to-[#013b22] text-white p-8 rounded-3xl overflow-hidden flex flex-col justify-between shadow-xl border border-emerald-800">
            {/* Background image overlay */}
            <div className="absolute inset-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center pointer-events-none"></div>

            <div className="relative z-10 space-y-6">
              <span className="bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-black uppercase px-3 py-1 rounded-full">
                PARTENARIAT GROSSISTE & REVENTE
              </span>

              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-tight">
                DEVENEZ NOTRE PARTENAIRE DISTRIBUTEUR
              </h2>

              <p className="text-emerald-100 text-sm leading-relaxed">
                Remplissez le formulaire ci-contre et recevez votre offre tarifaire personnalisée sur-mesure sous 24 heures.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  'Réponse sous 24h ouvrées garantie',
                  'Offre sur-mesure adaptée à vos volumes',
                  'Prix grossiste direct fabricant certifiés',
                  'Accompagnement logistique dédié'
                ].map((point, index) => (
                  <div key={index} className="flex items-center gap-3 text-xs sm:text-sm font-bold text-white">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 pt-8 mt-6 border-t border-emerald-800/80 text-xs text-emerald-200">
              <p className="font-extrabold text-amber-300 uppercase">Service commercial Grossiste :</p>
              <p className="mt-1">📞 +33 6 12 34 56 78 — 📧 contact@sentollbi.com</p>
            </div>
          </div>

          {/* Right Column: Interactive Form matching screenshot */}
          <div className="lg:col-span-7 bg-gray-50 p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-md">
            
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-[#013b22] rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-emerald-700" />
                </div>
                <h3 className="text-2xl font-black text-[#013b22] uppercase">
                  DEMANDE DE DEVIS TRANSMISE !
                </h3>
                <p className="text-gray-600 text-sm max-w-md mx-auto">
                  Merci <strong>{formData.companyName}</strong>. Notre équipe commerciale étudie votre dossier et vous contactera à l'adresse <strong>{formData.email}</strong> sous 24 heures ouvrées.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      companyName: '',
                      contactName: '',
                      email: '',
                      phone: '',
                      country: 'France',
                      quantityDesired: '',
                      message: ''
                    });
                  }}
                  className="bg-[#013b22] text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide hover:bg-[#025a34]"
                >
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <h3 className="text-xl font-black text-[#013b22] uppercase tracking-tight border-b border-gray-200 pb-3">
                  DEMANDE DE DEVIS PERSONNALISÉ
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nom de votre entreprise */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Nom de votre entreprise *
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="Ex: EuroAfro Distribution"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#013b22] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Pays */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Pays de livraison *
                    </label>
                    <div className="relative">
                      <Globe className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <select
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#013b22] focus:outline-none"
                      >
                        <option value="France">France</option>
                        <option value="Belgique">Belgique</option>
                        <option value="Allemagne">Allemagne</option>
                        <option value="Espagne">Espagne</option>
                        <option value="Italie">Italie</option>
                        <option value="Suisse">Suisse</option>
                        <option value="Royaume-Uni">Royaume-Uni</option>
                        <option value="Autre Europe">Autre Pays d'Europe</option>
                      </select>
                    </div>
                  </div>

                  {/* Email professionnel */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Email professionnel *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        placeholder="exemple@entreprise.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#013b22] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Téléphone */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Téléphone *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        placeholder="Votre numéro de contact"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#013b22] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Quantité souhaitée */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Quantité souhaitée (Cartons ou Palettes) *
                  </label>
                  <div className="relative">
                    <Boxes className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Ex: 50 cartons de Madd, 20 cartons de Café Touba..."
                      value={formData.quantityDesired}
                      onChange={(e) => setFormData({ ...formData, quantityDesired: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#013b22] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Votre message */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Votre message (Optionnel)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Précisez vos besoins particuliers, conditions de livraison ou demande de marque propre (MDD)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 bg-white border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#013b22] focus:outline-none"
                  ></textarea>
                </div>

                {/* Submit button matching screenshot */}
                <button
                  type="submit"
                  className="w-full bg-[#013b22] hover:bg-[#025a34] text-white py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                >
                  <span>ENVOYER MA DEMANDE DE DEVIS</span>
                  <Send className="w-4 h-4 text-amber-400" />
                </button>

              </form>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};
