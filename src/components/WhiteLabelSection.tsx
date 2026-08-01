import React, { useState } from 'react';
import { 
  Sparkles, 
  Tag, 
  Check, 
  Layers, 
  Send,
  Eye,
  Sliders
} from 'lucide-react';

export const WhiteLabelSection: React.FC = () => {
  const [brandName, setBrandName] = useState('MA MARQUE BIO');
  const [accentColor, setAccentColor] = useState('#ea580c');
  const [packType, setPackType] = useState<'jar' | 'pouch'>('jar');
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-12 bg-amber-50/50 border-y border-amber-200/60 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5 text-amber-700" />
            <span>Service Sur-Mesure B2B</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#013b22] uppercase tracking-tight">
            MARQUE DISTRIBUTEUR (MDD) & WHITE LABEL
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm">
            Créez votre propre gamme de produits africains sous votre marque. Nous personnalisons les étiquettes, le conditionnement et les codes-barres EAN pour votre enseigne.
          </p>
        </div>

        {/* Interactive Label Simulator & Info */}
        <div className="grid lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-lg">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-5">
            
            <div className="flex items-center gap-2 text-xs font-black text-[#013b22] uppercase">
              <Sliders className="w-4 h-4 text-amber-600" />
              <span>Simulateur de Marque Propre</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Nom de votre Marque / Enseigne
              </label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                maxLength={25}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-bold text-[#013b22] focus:ring-2 focus:ring-[#013b22] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">
                  Format Packaging
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPackType('jar')}
                    className={`flex-1 py-2 rounded-lg font-bold border transition-colors ${
                      packType === 'jar'
                        ? 'bg-[#013b22] text-white border-[#013b22]'
                        : 'bg-gray-100 text-gray-700 border-gray-300'
                    }`}
                  >
                    Bocal Verre (250g)
                  </button>
                  <button
                    onClick={() => setPackType('pouch')}
                    className={`flex-1 py-2 rounded-lg font-bold border transition-colors ${
                      packType === 'pouch'
                        ? 'bg-[#013b22] text-white border-[#013b22]'
                        : 'bg-gray-100 text-gray-700 border-gray-300'
                    }`}
                  >
                    Sachet Doypack
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">
                  Couleur d'Accent
                </label>
                <div className="flex items-center gap-2 pt-1">
                  {['#ea580c', '#013b22', '#d97706', '#be123c', '#4338ca'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setAccentColor(color)}
                      style={{ backgroundColor: color }}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        accentColor === color ? 'scale-125 border-gray-900 shadow-md' : 'border-white'
                      }`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 text-xs space-y-2">
              <p className="font-extrabold text-[#013b22] uppercase">Avantages de l'offre MDD SenToll Bi :</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 font-medium">
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Impression HD agréée</span>
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Code EAN B2B unique</span>
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Validation règlement UE</span>
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Échantillon imprimé sous 72h</span>
              </div>
            </div>

            {submitted ? (
              <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold text-center">
                Demande de devis Marque Blanche enregistrée ! Un graphiste dédié vous contactera.
              </div>
            ) : (
              <button
                onClick={() => setSubmitted(true)}
                className="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
              >
                <Send className="w-4 h-4 text-amber-200" />
                <span>DEMANDER UN PROTOTYPE MDD POUR "{brandName.toUpperCase()}"</span>
              </button>
            )}

          </div>

          {/* Visual Live Preview Column */}
          <div className="lg:col-span-6 bg-gradient-to-br from-amber-100/60 to-emerald-50/60 p-6 rounded-2xl border border-amber-200 text-center relative flex flex-col items-center justify-center min-h-[300px]">
            
            <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-[10px] font-black text-gray-700 shadow-xs flex items-center gap-1">
              <Eye className="w-3 h-3 text-amber-600" />
              <span>Aperçu Maquette Étiquette En Direct</span>
            </div>

            {/* Custom Packaging Mockup Box */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 max-w-xs w-full space-y-3 relative overflow-hidden">
              
              {/* Header Label stripe */}
              <div 
                style={{ backgroundColor: accentColor }}
                className="py-2.5 px-3 rounded-xl text-white font-black text-sm uppercase tracking-wider shadow-sm"
              >
                {brandName || 'VOTRE MARQUE'}
              </div>

              {/* Product Representation */}
              <div className="py-4">
                <div className="w-24 h-24 mx-auto rounded-full bg-amber-100 border-4 border-amber-200 flex items-center justify-center text-3xl shadow-inner">
                  {packType === 'jar' ? '🏺' : '🛍️'}
                </div>
                <h4 className="font-black text-gray-900 uppercase text-sm mt-3">
                  MADD 100% NATUREL
                </h4>
                <p className="text-[10px] text-gray-500 font-bold uppercase">
                  {packType === 'jar' ? 'Bocal en verre 250g' : 'Sachet Doypack 250g'}
                </p>
              </div>

              {/* Footer info stripe */}
              <div className="border-t border-gray-200 pt-2 text-[9px] text-gray-500 font-mono flex items-center justify-between">
                <span>CONFORMITÉ HACCP</span>
                <span>EAN: 3047875661285</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
