"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ArrowRight, Minus, Plus, ShoppingBag } from "lucide-react"; // Import ikon
import { useCart } from "@/lib/hooks/use-cart";
import { usePathname } from "next/navigation";

const CartSidebar = () => {
  const { isOpen, closeCart, items, removeItem, updateQuantity, totalPrice } =
    useCart();
  const pathname = usePathname();

  useEffect(() => {
    closeCart();
  }, [pathname, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-[70] h-full w-full sm:w-[450px] bg-main border-l border-black/5 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-black/5 flex items-center justify-between bg-white/50 backdrop-blur-md">
              <h2 className="font-heading text-2xl text-black">
                Twój Koszyk ({items.length})
              </h2>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Lista Produktów */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <ShoppingBag size={48} className="mb-4 text-brown/50" />
                  <p className="font-body text-sm uppercase tracking-widest mb-4">
                    Twój koszyk jest pusty
                  </p>
                  <button
                    onClick={closeCart}
                    className="underline hover:text-brown"
                  >
                    Wróć do sklepu
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-5 group">
                    {/* Zdjęcie */}
                    <div className="relative w-24 h-32 bg-beige/30 flex-shrink-0 border border-black/5">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Detale */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-heading text-lg leading-tight text-black">
                            {item.name}
                          </h3>
                          <p className="font-body text-[10px] uppercase tracking-widest text-gray mt-1">
                            {item.price.toLocaleString("pl-PL")} zł / szt.
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-black/20 hover:text-red-500 transition-colors p-1"
                          aria-label="Usuń produkt"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* Kontroler Ilości */}
                      <div className="flex justify-between items-end mt-4">
                        <div className="flex items-center border border-black/10">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="p-2 hover:bg-black/5 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="font-body text-xs w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            disabled={item.quantity >= (item.maxQuantity || 1)}
                            className="p-2 hover:bg-black/5 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <p className="font-body text-sm font-semibold text-brown">
                          {(item.price * item.quantity).toLocaleString("pl-PL")}{" "}
                          zł
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-black/5">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-body text-xs uppercase tracking-widest text-gray">
                    Suma (z VAT)
                  </span>
                  <span className="font-heading text-3xl text-black">
                    {totalPrice().toLocaleString("pl-PL")} zł
                  </span>
                </div>
                <Link
                  href="/zamowienie"
                  className="w-full bg-dark-brown text-white py-4 font-body text-xs uppercase tracking-[0.2em] hover:bg-brown transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  Przejdź do kasy <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
