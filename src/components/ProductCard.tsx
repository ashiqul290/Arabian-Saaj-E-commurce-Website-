import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../types.ts';
import { useCart } from '../context/CartContext.tsx';
import { useWishlist } from '../context/WishlistContext.tsx';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const hasDiscount = Boolean(
    product.discountPrice && product.discountPrice > 0 && product.discountPrice < product.price
  );
  const inWishlist = isInWishlist(product._id);
  const displayImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80';

  const defaultColor = product.colors?.[0] || 'Default';
  const defaultSize = product.sizes?.[0] || 'Standard';

  const discountPercent =
    hasDiscount && product.discountPrice
      ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
      : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, defaultColor, defaultSize, false);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product._id, product.name);
  };

  const handleCardClick = () => {
    onViewDetails(product);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group cursor-pointer flex flex-col bg-white rounded-2xl sm:rounded-[22px] border border-[#E8E8E8] hover:border-[#D0D0D0] overflow-hidden transition-all duration-300 hover:shadow-md"
    >
      {/* Product Image Area */}
      <div className="relative aspect-[4/5] bg-[#FBFBFB] flex items-center justify-center overflow-hidden border-b border-[#F0ECE6]">
        <img
          src={displayImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-sm transition-all z-10 ${
            inWishlist
              ? 'bg-white text-rose-600 shadow-sm scale-105'
              : 'bg-white/80 text-gray-400 hover:text-rose-600 hover:bg-white shadow-2xs'
          }`}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              inWishlist ? 'fill-rose-600 text-rose-600' : ''
            }`}
          />
        </button>
      </div>

      {/* Product Details Section */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow justify-between gap-2.5 sm:gap-3 bg-white">
        <div>
          {/* Product Name (2-lines, clean) */}
          <h3 className="text-xs sm:text-sm font-medium text-[#1F1D1B] line-clamp-2 leading-snug group-hover:text-[#0D6E6E] transition-colors min-h-[2.3rem]">
            {product.name}
          </h3>
        </div>

        {/* Price Row matching user image */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {hasDiscount ? (
            <>
              <span className="text-sm sm:text-base font-bold text-[#0D6E6E]">
                ৳ {product.discountPrice?.toLocaleString()}
              </span>
              <span className="text-[11px] sm:text-xs text-[#9CA3AF] line-through">
                ৳ {product.price.toLocaleString()}
              </span>
              <span className="bg-[#FFB800] text-[#1F1D1B] text-[10px] sm:text-[11px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full">
                -{discountPercent}%
              </span>
            </>
          ) : (
            <span className="text-sm sm:text-base font-bold text-[#0D6E6E]">
              ৳ {product.price.toLocaleString()}
            </span>
          )}
        </div>

        {/* Add to Cart Pill Button (exactly like reference image) */}
        <button
          onClick={handleQuickAdd}
          disabled={product.stock === 0}
          className="w-full py-2 sm:py-2.5 px-3 bg-[#ECF5F4] hover:bg-[#DEEFEF] active:bg-[#D0E8E7] text-[#164E63] font-semibold text-xs sm:text-sm rounded-full flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-200 disabled:opacity-50"
        >
          <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#164E63]" />
          <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
};
