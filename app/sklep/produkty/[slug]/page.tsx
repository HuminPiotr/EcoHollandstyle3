import Link from "next/link";
import { ArrowLeft, ShoppingBag, MessageCircle } from "lucide-react";
import ProductGallery from "@/components/product/ProductGallery";
import ConditionReport from "@/components/product/ConditionReport";
import { notFound } from "next/navigation";

import AddToCart from "@/components/product/AddToCart";

// Mock danych
const getProduct = async (slug: string) => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  if (slug === "fotel-pastoe-fm60") {
    return {
      id: "1",
      name: "Fotel Pastoe FM60",
      slug: "fotel-pastoe-fm60",
      price: 3200,
      designer: "Raoul Guys",
      year: "1963",
      description:
        "Kultowy fotel zaprojektowany przez Raoula Guys dla Pastoe w latach 60. Minimalistyczna forma z głębokim siedziskiem.",
      images: [
        "/images/products/p1.jpg",
        "/images/products/p2.jpg",
        "/images/products/p3.jpg",
      ],
      stockStatus: "instock",
      stockQuantity: 4,
      condition: {
        status: "Po renowacji",
        dimensions: "78 × 68 × 72 cm",
        description:
          "Tapicerka wymieniona na nową tkaninę Kvadrat w kolorze musztardowym. Rama drewniana odświeżona, drobne ślady użytkowania na nogach.",
      },
    };
  }
  return null;
};

// --- POPRAWKA 1: Typowanie Props jako Promise ---
type Props = {
  params: Promise<{ slug: string }>;
};

// --- POPRAWKA 2: generateMetadata z await ---
export async function generateMetadata({ params }: Props) {
  const { slug } = await params; // Oczekujemy na params
  const product = await getProduct(slug);

  if (!product) return {};

  return {
    title: `${product.name} | eco Hollandstyle`,
    description: product.description,
  };
}

// --- POPRAWKA 3: Komponent strony z await ---
export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  // Przygotowujemy obiekt produktu dla koszyka (uproszczony)
  const cartProduct = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.images[0], // Bierzemy pierwsze zdjęcie do koszyka
  };

  return (
    <main className="bg-main min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Breadcrumb */}
        <Link
          href="/sklep"
          className="inline-flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.2em] text-gray hover:text-brown transition-colors mb-10"
        >
          <ArrowLeft size={14} /> Powrót do sklepu
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* LEWA KOLUMNA: Galeria */}
          <div>
            <ProductGallery images={product.images} name={product.name} />
          </div>

          {/* PRAWA KOLUMNA: Info i Akcje */}
          <div className="flex flex-col">
            {/* Nagłówek Produktu */}
            <div className="mb-8 border-b border-black/10 pb-8">
              <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gray mb-3">
                {product.designer}, {product.year}
              </p>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-black mb-4 leading-tight">
                {product.name}
              </h1>
              <p className="font-body text-2xl text-black font-medium">
                {product.price.toLocaleString("pl-PL")} zł
              </p>
            </div>

            {/* Krótki opis */}
            <p className="font-body text-black/80 leading-relaxed text-lg mb-2">
              {product.description}
            </p>

            {/* Raport Stanu */}
            <ConditionReport
              status={product.condition.status}
              dimensions={product.condition.dimensions}
              description={product.condition.description}
            />

            {/* Przyciski Akcji */}
            <div className="flex flex-col gap-4 ">
              {/* --- ZMIANA: Użycie komponentu klienckiego --- */}
              <AddToCart
                product={cartProduct}
                variant="desktop"
                maxQuantity={product.stockQuantity}
              />

              <Link
                href="/kontakt"
                className="w-full border border-black/10 bg-transparent py-4 font-body text-xs uppercase tracking-[0.2em] text-black hover:bg-black/5 transition-colors flex items-center justify-center gap-3"
              >
                <MessageCircle size={18} />
                Zapytaj o produkt
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray/20 p-4 lg:hidden z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        {/* --- ZMIANA: Użycie komponentu klienckiego (Mobile) --- */}
        <AddToCart product={cartProduct} variant="mobile" />
      </div>
    </main>
  );
}
