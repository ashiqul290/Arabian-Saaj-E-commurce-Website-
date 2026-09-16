import React from 'react';
import { Phone, Mail, Instagram, Facebook, MessageCircle, ShieldCheck, Heart } from 'lucide-react';
import { BrandLogo } from './BrandLogo.tsx';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#1C1A18] text-[#D8C7B5] border-t border-[#38332E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-[#2E2925]">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <BrandLogo size="lg" inverted={true} onClick={() => onNavigate('home')} />
            <p className="text-sm font-serif italic text-[#C5A059] tracking-wider pt-1">
              “Elegance • Modesty • Style”
            </p>
            <p className="text-xs text-[#A8988A] leading-relaxed max-w-md pt-2">
              Arabian Saaj is dedicated to bringing exquisite modest fashion to women across Bangladesh and beyond.
              From feather-soft Medina silks to opulent Dubai crepe abayas and breathable niqabs, each silhouette is crafted with graceful modesty, dignified cut, and enduring craftsmanship.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#2C2723] flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059] hover:text-[#1C1A18] transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#2C2723] flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059] hover:text-[#1C1A18] transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/8801700000000"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#2C2723] flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059] hover:text-[#1C1A18] transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-serif tracking-[0.2em] text-[#FAF8F5] font-semibold">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  About Arabian Saaj
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#FAF8F5] transition-colors"
                >
                  Contact & Concierge
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin-login')}
                  className="text-[#9E7528] hover:text-[#C5A059] transition-colors pt-1 block"
                >
                  Staff Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-serif tracking-[0.2em] text-[#FAF8F5] font-semibold">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2 text-[#C5A059]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Modest Cut Guarantee</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>+880 1711-223344</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>concierge@arabiansaaj.com</span>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="text-[11px] text-[#8C7C6E] hover:text-[#D8C7B5] transition-colors block"
                >
                  Privacy Policy • Terms & Conditions
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#786B60]">
          <p>© 2026 Arabian Saaj. All Rights Reserved.</p>
          <p className="flex items-center gap-1 text-[11px]">
            <span>Crafted with grace for modest women</span>
            <Heart className="w-3 h-3 text-[#C5A059] fill-[#C5A059]" />
          </p>
        </div>
      </div>
    </footer>
  );
};
