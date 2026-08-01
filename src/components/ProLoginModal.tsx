import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Building2, 
  Mail, 
  User, 
  Check, 
  ShieldCheck 
} from 'lucide-react';

interface ProLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProLoginModal: React.FC<ProLoginModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    vat: '',
    email: '',
    password: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setTimeout(() => {
      setIsLoggedIn(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#013b22] flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6 text-[#013b22]" />
          </div>
          <h2 className="text-xl font-black text-[#013b22] uppercase tracking-tight">
            {isRegister ? 'CRÉER UN COMPTE COMPTE B2B' : 'ESPACE CLIENT PROFESSIONNEL'}
          </h2>
          <p className="text-xs text-gray-500">
            {isRegister
              ? 'Accédez aux tarifs dégressifs réservés aux détaillants et grossistes'
              : 'Connectez-vous pour accéder à vos tarifs privilégiés et historique de devis'}
          </p>
        </div>

        {isLoggedIn ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-[#013b22] rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 text-emerald-700" />
            </div>
            <p className="text-sm font-bold text-[#013b22]">Bienvenue sur votre Espace Pro SenToll Bi !</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {isRegister && (
              <>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Raison Sociale *</label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="Nom de votre société"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#013b22]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Numéro SIRET / TVA Intracommunautaire *</label>
                  <input
                    type="text"
                    required
                    placeholder="FR123456789"
                    value={formData.vat}
                    onChange={(e) => setFormData({ ...formData, vat: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#013b22]"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block font-bold text-gray-700 mb-1">Adresse Email Pro *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  placeholder="contact@entreprise.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#013b22]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Mot de passe *</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#013b22]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#013b22] hover:bg-[#025a34] text-white py-3 rounded-xl font-extrabold uppercase tracking-wider transition-colors shadow-md"
            >
              {isRegister ? 'Valider mon Inscription Pro' : 'Se Connecter à l\'Espace Pro'}
            </button>

            <div className="text-center pt-2 border-t">
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-xs text-[#013b22] font-bold hover:underline"
              >
                {isRegister
                  ? 'Déjà un compte ? Se connecter'
                  : 'Pas encore de compte B2B ? Créer un compte pro'}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
