"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useAnimationControls } from "framer-motion";

// Dane testowe - docelowo z lib/data/get-products.ts (produkty z flagą featured)
const featuredProducts = [
  {
    id: "1",
    name: "Fotel zielony",
    price: 300,
    slug: "fotel-zielony",
    image: "/images/products/p8.jpg",
  },
  {
    id: "2",
    name: "Krzesło pufa",
    price: 250,
    slug: "krzeslo-pufa",
    image: "/images/products/p9.jpg",
  },
  {
    id: "3",
    name: "Kaktus",
    price: 30,
    slug: "kaktus",
    image: "/images/products/p10.jpg",
  },
  {
    id: "4",
    name: "Lampa stojąca",
    price: 500,
    slug: "lampa-stojaca",
    image: "/images/products/p12.jpg",
  },
];

const FeaturedMarquee = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const controls = useAnimationControls();

  const [isDragging, setIsDragging] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const dragStartX = useRef(0);
  const currentX = useRef(0);

  const items = [...featuredProducts, ...featuredProducts, ...featuredProducts];

  useEffect(() => {
    if (containerRef.current) {
      setContentWidth(containerRef.current.scrollWidth / 3);
    }
  }, []);

  useEffect(() => {
    if (contentWidth === 0 || isDragging) return;

    const remainingDistance = contentWidth + currentX.current;
    const duration = (remainingDistance / contentWidth) * (contentWidth / 40);

    controls.start({
      x: -contentWidth,
      transition: { duration, ease: "linear", repeat: Infinity },
    });
  }, [contentWidth, isDragging, controls]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setHasMoved(false);
    controls.stop();
    dragStartX.current = e.clientX;

    const transform = getComputedStyle(containerRef.current!).transform;
    const matrix = new DOMMatrixReadOnly(transform);
    currentX.current = matrix.m41;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || contentWidth === 0) return;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 10) setHasMoved(true);

    let newX = currentX.current + delta;
    if (newX > 0) newX -= contentWidth;
    if (newX < -contentWidth) newX += contentWidth;

    controls.set({ x: newX });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    const transform = getComputedStyle(containerRef.current!).transform;
    const matrix = new DOMMatrixReadOnly(transform);
    currentX.current = matrix.m41;
  };

  return (
    <section className="bg-main border-y border-black/10 overflow-hidden select-none">
      {/* Header - Zgodnie z grafiką */}
      <div className="py-6 text-center border-b border-black/10 bg-main">
        <h2 className="font-heading text-2xl md:text-3xl text-black uppercase tracking-[0.2em]">
          Polecane Produkty
        </h2>
      </div>

      {/* Marquee Track */}
      <div
        className="relative overflow-hidden cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <motion.div
          ref={containerRef}
          className="flex"
          animate={controls}
          initial={{ x: 0 }}
        >
          {items.map((product, i) => (
            <div
              key={`${product.id}-${i}`}
              className="flex-shrink-0 w-[445px] border-r border-black/10 group"
            >
              <Link
                href={`/sklep/produkty/${product.slug}`}
                onClick={(e) => hasMoved && e.preventDefault()}
                className="block p-[20px]" // To są Twoje 20px marginesy
              >
                {/* Białe pudełko: zajmie dokładnie 405px (445px - 20px - 20px) */}
                <div className="relative aspect-square w-full overflow-hidden bg-white border border-black/5 shadow-sm">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="405px"
                    className="object-contain p-8"
                    draggable={false}
                  />
                </div>

                {/* Tekst - Nazwa i Cena w jednym rzędzie */}
                <div className="mt-5 flex justify-between items-center gap-4 px-1">
                  <h3 className="font-body text-xs md:text-sm text-black uppercase tracking-widest truncate">
                    {product.name}
                  </h3>
                  <p className="font-body text-xs md:text-sm text-black whitespace-nowrap">
                    {product.price} zł
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Footer - Zgodnie z grafiką */}
      <div className="py-6 text-center border-t border-black/10 bg-main">
        <Link
          href="/sklep"
          className="font-body text-[10px] uppercase tracking-[0.3em] text-black hover:text-brown transition-colors"
        >
          Cały sklep
        </Link>
      </div>
    </section>
  );
};

export default FeaturedMarquee;
