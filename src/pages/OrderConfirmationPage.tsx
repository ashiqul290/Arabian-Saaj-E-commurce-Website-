import React from 'react';
import { CheckCircle2, ArrowRight, Package, MapPin, Phone, Calendar } from 'lucide-react';
import { Order } from '../types.ts';

interface OrderConfirmationPageProps {
  order: Order;
  onContinueShopping: () => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({
  order,
  onContinueShopping
}) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* Top Banner Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8DFD8] shadow-sm text-center space-y-4">
        <div className="w-16 h-16 bg-[#F7F1E4] text-[#B38838] rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#B38838] block">
          Order Confirmed
        </span>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#1F1D1B]">
          Thank You for Shopping with Arabian Saaj
        </h1>

        <p className="text-xs sm:text-sm text-[#786A5E] max-w-md mx-auto leading-relaxed">
          Your modest fashion order has been received with care. Our concierge team is now preparing your parcel for dispatch.
        </p>

        {/* Order Reference Badge */}
        <div className="inline-flex items-center gap-2 bg-[#FAF8F5] border border-[#E8DFD8] px-4 py-2 rounded-xl text-xs font-mono text-[#1F1D1B]">
          <span className="text-[#8C7C6E]">Order Reference:</span>
          <span className="font-bold text-[#B38838]">{order.orderId}</span>
        </div>
      </div>

      {/* Order Details Breakdown */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DFD8] shadow-xs space-y-6">
        <h2 className="font-serif text-lg font-bold text-[#1F1D1B] border-b border-[#F5EFEB] pb-3">
          Order Summary
        </h2>

        {/* Items */}
        <div className="divide-y divide-[#F5EFEB]">
          {order.products.map((item, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-14 object-cover rounded-lg bg-[#FAF8F5]"
                  />
                )}
                <div>
                  <h4 className="font-serif font-semibold text-[#1F1D1B]">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-[#8C7C6E]">
                    Qty: {item.quantity} • {item.color} • {item.size}
                  </p>
                </div>
              </div>
              <span className="font-medium text-[#1F1D1B]">
                ৳{(item.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        {/* Delivery & Cost breakdown */}
        <div className="pt-4 border-t border-[#E8DFD8] grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          {/* Left: Customer Info */}
          <div className="space-y-2 bg-[#FAF8F5] p-4 rounded-xl border border-[#EFE8DF]">
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#1F1D1B] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#B38838]" />
              <span>Delivery Details</span>
            </h4>
            <p className="font-medium text-[#1F1D1B]">{order.customerName}</p>
            <p className="text-[#6B5E51] flex items-center gap-1">
              <Phone className="w-3 h-3" />
              <span>{order.phone}</span>
            </p>
            <p className="text-[#6B5E51]">{order.address}, {order.area}{order.district ? `, ${order.district}` : ''}, {order.city}</p>
            {order.note && (
              <p className="text-[11px] text-[#8C7C6E] italic mt-1">
                Note: “{order.note}”
              </p>
            )}
          </div>

          {/* Right: Payment & Total */}
          <div className="space-y-2.5 bg-[#FAF8F5] p-4 rounded-xl border border-[#EFE8DF] flex flex-col justify-between">
            <div>
              <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#1F1D1B] flex items-center gap-1.5 mb-2">
                <Package className="w-3.5 h-3.5 text-[#B38838]" />
                <span>Payment Summary</span>
              </h4>
              <div className="flex justify-between text-[#6B5E51] text-xs">
                <span>Payment Method</span>
                <span className="font-medium text-[#1F1D1B]">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-[#6B5E51] text-xs mt-1">
                <span>Delivery Charge</span>
                <span className="font-medium text-[#1F1D1B]">৳{order.deliveryCharge}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E8DFD8] flex justify-between items-baseline">
              <span className="font-serif font-bold text-sm text-[#1F1D1B]">Total Due:</span>
              <span className="font-serif text-lg font-bold text-[#1F1D1B]">
                ৳{order.totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Expected dispatch timeline */}
        <div className="flex items-center gap-2.5 p-3.5 bg-[#F7F1E4] text-[#7A5B20] rounded-xl text-xs">
          <Calendar className="w-4 h-4 flex-shrink-0" />
          <span>
            Expected Delivery: <strong>1 to 2 business days</strong> inside Dhaka, <strong>2 to 3 days</strong> outside Dhaka.
          </span>
        </div>

        {/* Continue Shopping button */}
        <div className="pt-4 text-center">
          <button
            onClick={onContinueShopping}
            className="px-8 py-3.5 bg-[#1F1D1B] hover:bg-[#3D352D] text-[#FAF8F5] text-xs uppercase font-bold tracking-widest rounded-xl transition-all duration-300 inline-flex items-center gap-2 shadow-md"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4 text-[#C5A059]" />
          </button>
        </div>
      </div>
    </div>
  );
};
