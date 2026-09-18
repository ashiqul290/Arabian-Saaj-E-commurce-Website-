import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, Heart, Home, Store, UserRound } from 'lucide-react';
import { BrandLogo } from './BrandLogo.tsx';
import { useCart } from '../context/CartContext.tsx';
import { useWishlist } from '../context/WishlistContext.tsx';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, params?: any) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch
}) => {
  const { itemCount, openCart } = useCart();
  const { wishlistIds } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (pageId: string) => {
    setMobileMenuOpen(false);
    onNavigate(pageId);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-[#E8DFD8]'
            : 'bg-[#FAF8F5] border-b border-[#F0EAE1]'
        }`}
      >
        {/* Top micro-announcement banner */}
        <div className="bg-[#1F1D1B] text-[#E8DFD8] text-[10px] sm:text-xs py-1.5 px-3 text-center tracking-wide font-light flex items-center justify-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse flex-shrink-0"></span>
          <span className="truncate">Free Delivery on ৳5000+ • Cash on Delivery Nationwide</span>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Brand Logo */}
            <BrandLogo
              size="md"
              onClick={() => handleNavClick('home')}
            />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-9">
              {navLinks.map(link => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`text-sm tracking-widest uppercase transition-colors relative py-1 font-medium ${
                      isActive
                        ? 'text-[#1F1D1B] font-semibold'
                        : 'text-[#6B5E51] hover:text-[#1F1D1B]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C5A059] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Action Icons */}
            <div className="flex items-center space-x-1 sm:space-x-4">
              {/* Search Trigger */}
              <button
                onClick={onOpenSearch}
                className="p-2 text-[#4A4036] hover:text-[#1F1D1B] hover:bg-[#EFE8DF]/60 rounded-full transition-colors"
                aria-label="Search products"
                title="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Indicator */}
              {wishlistIds.length > 0 && (
                <button
                  onClick={() => onNavigate('shop')}
                  className="p-2 text-[#4A4036] hover:text-[#1F1D1B] hover:bg-[#EFE8DF]/60 rounded-full transition-colors relative"
                  aria-label="Wishlist"
                  title={`${wishlistIds.length} items in Wishlist`}
                >
                  <Heart className="w-5 h-5 text-[#B38838] fill-[#B38838]/20" />
                  <span className="absolute -top-1 -right-1 bg-[#B38838] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistIds.length}
                  </span>
                </button>
              )}

              {/* Cart Button */}
              <button
                onClick={() => onNavigate('account')}
                className="p-2 text-[#1F1D1B] hover:bg-[#EFE8DF]/60 rounded-full transition-colors"
                aria-label="My account"
                title="My account"
              >
                <UserRound className="w-5 h-5" />
              </button>

              <button
                onClick={openCart}
                className="p-2 text-[#1F1D1B] hover:bg-[#EFE8DF]/60 rounded-full transition-colors relative"
                aria-label="Shopping Cart"
                title="View Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#1F1D1B] text-[#FAF8F5] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FAF8F5]">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[#1F1D1B] hover:bg-[#EFE8DF]/60 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E8DFD8] bg-[#FAF8F5] px-5 py-5 space-y-3 shadow-lg animate-fadeIn">
            {navLinks.map(link => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`block w-full text-left py-2.5 px-3 rounded-lg text-sm tracking-wider uppercase font-semibold transition-colors ${
                    isActive
                      ? 'text-[#B38838] bg-[#F4EDE2] font-bold'
                      : 'text-[#4A4036] hover:bg-[#F0EAE1]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            <div className="pt-3 border-t border-[#E8DFD8] flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="flex items-center gap-3 text-xs uppercase tracking-wider font-semibold text-[#5C5044] p-2.5 rounded-lg hover:bg-[#F0EAE1]"
              >
                <Search className="w-4 h-4 text-[#B38838]" />
                <span>Search Products</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Sticky Bottom Quick-Access Bar */}
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#E8DFD8] z-30 flex items-center justify-around py-2 px-1 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]"
        aria-label="Mobile Navigation"
      >
        <button
          onClick={() => handleNavClick('home')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
            currentPage === 'home' ? 'text-[#B38838]' : 'text-[#7A6B5E] hover:text-[#1F1D1B]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-wide">Home</span>
        </button>

        <button
          onClick={() => handleNavClick('shop')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
            currentPage === 'shop' ? 'text-[#B38838]' : 'text-[#7A6B5E] hover:text-[#1F1D1B]'
          }`}
        >
          <Store className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-wide">Shop</span>
        </button>

        <button
          onClick={onOpenSearch}
          className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[#7A6B5E] hover:text-[#1F1D1B] transition-colors"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-wide">Search</span>
        </button>

        <button
          onClick={openCart}
          className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[#7A6B5E] hover:text-[#1F1D1B] transition-colors relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#1F1D1B] text-[#FAF8F5] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-wide">Cart</span>
        </button>
      </nav>
    </>
  );
};
