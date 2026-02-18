"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/hooks/use-cart";
// import { toast } from 'sonner'; // Opcjonalnie: do powiadomień (warto dodać później)

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface AddToCartProps {
  product: Product;
  variant?: "desktop" | "mobile"; // Aby obsłużyć oba style przycisku
  maxQuantity?: number;
}

const AddToCart = ({
  product,
  variant = "desktop",
  maxQuantity = 1,
}: AddToCartProps) => {
  const { addItem, openCart } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      maxQuantity: maxQuantity, // Używamy wartości z props
    });
    openCart(); // Automatycznie otwórz koszyk po dodaniu
  };

  if (variant === "mobile") {
    return (
      <button
        onClick={handleAddToCart}
        className="w-full bg-dark-brown text-white py-4 font-body text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 active:bg-brown transition-colors"
      >
        Do koszyka — {product.price.toLocaleString("pl-PL")} zł
      </button>
    );
  }

  // Default desktop variant
  return (
    <button
      onClick={handleAddToCart}
      className="w-full bg-dark-brown text-white py-5 font-body text-xs uppercase tracking-[0.2em] hover:bg-brown transition-colors flex items-center justify-center gap-3 shadow-lg cursor-pointer active:scale-[0.98] duration-200"
    >
      <ShoppingBag size={18} />
      Dodaj do koszyka
    </button>
  );
};

export default AddToCart;
