"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const featuredProducts = [
  {
    id: "1",
    name: "Szafa dębowa",
    category: "Szafy",
    price: 3200,
    slug: "szafa-debowa",
    image: "/images/products/p1.jpg",
  },
  {
    id: "2",
    name: "Fotel z podnóżkiem",
    category: "Wypoczynki",
    price: 1800,
    slug: "fotel-z-podnozkiem",
    image: "/images/products/p2.jpg",
  },
  {
    id: "3",
    name: "Obraz kwiatki",
    category: "Dekoracje",
    price: 200,
    slug: "obraz-kwiatki",
    image: "/images/products/p3.jpg",
  },
  {
    id: "4",
    name: "Fotel wielobarwny",
    category: "Wypoczynki",
    price: 500,
    slug: "fotel-wielobarwny",
    image: "/images/products/p4.jpg",
  },
  {
    id: "5",
    name: "Stylowy fotel",
    category: "Wypoczynki",
    price: 420,
    slug: "stylowy-fotel",
    image: "/images/products/p5.jpg",
  },
  {
    id: "6",
    name: "Złote róże",
    category: "Ozdoby",
    price: 50,
    slug: "zlote-roze",
    image: "/images/products/p6.jpg",
  },
  {
    id: "7",
    name: "Sosnowy stolik",
    category: "Stoły",
    price: 310,
    slug: "sosnowy-stolik",
    image: "/images/products/p7.jpg",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const NewArrivals = () => {
  return (
    <section className="bg-main min-h-screen lg:h-screen lg:max-h-screen flex flex-col py-10 lg:py-10">
      <div className="container mx-auto px-4 lg:px-10 flex flex-col h-full">
        {/* NAGŁÓWEK */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="flex flex-col items-center text-center mb-8 lg:mb-8 shrink-0"
        >
          <p className="font-body text-brown text-[10px] uppercase tracking-[0.4em] mb-2">
            Ostatnio dodane perełki
          </p>
          <h2 className="font-heading text-4xl lg:text-5xl text-black">
            Nowości
          </h2>
        </motion.div>

        {/* GRID PRODUKTOWY */}
        <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4 lg:gap-5">
          {featuredProducts.map((product, i) => {
            const isHero = i === 0;

            return (
              <motion.div
                key={product.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "flex flex-col group",
                  isHero
                    ? "col-span-2 lg:col-span-1 lg:row-span-2"
                    : "col-span-1 lg:col-span-1 lg:row-span-1",
                )}
              >
                <Link
                  href={`/sklep/produkty/${product.slug}`}
                  className="flex flex-col h-full"
                >
                  {/* Container Zdjęcia - Kluczowa zmiana: aspect-[3/4] na mobile */}
                  <div className="relative flex-1 aspect-[3/4] lg:aspect-auto overflow-hidden bg-beige/20 shadow-sm border border-black/5">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes={
                        isHero
                          ? "(max-width: 1024px) 100vw, 25vw"
                          : "(max-width: 1024px) 50vw, 25vw"
                      }
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                      priority={isHero}
                    />

                    {/* {isHero && (
                      <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1">
                        <p className="font-body text-[8px] uppercase tracking-widest text-brown font-bold italic">
                          Unikat
                        </p>
                      </div>
                    )} */}
                  </div>

                  {/* INFO O PRODUKCIE */}
                  <div className="shrink-0 pt-3 flex flex-col items-center text-center px-1">
                    <h3
                      className={cn(
                        "font-heading leading-tight truncate w-full",
                        isHero ? "text-lg lg:text-xl" : "text-sm lg:text-base",
                      )}
                    >
                      {product.name}
                    </h3>
                    <p className="font-body text-[8px] lg:text-[9px] uppercase tracking-widest text-gray mt-1">
                      {product.category}
                    </p>
                    <p className="font-body text-[10px] lg:text-[11px] font-semibold mt-1 text-brown">
                      {product.price.toLocaleString("pl-PL")} zł
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* STOPKA SEKCJI */}
        <div className="mt-10 lg:mt-8 text-center shrink-0">
          <Link
            href="/sklep"
            className="group inline-flex items-center gap-3 font-body text-[9px] uppercase tracking-[0.3em] text-black/50 hover:text-brown transition-all"
          >
            Pełna oferta{" "}
            <ArrowRight
              size={12}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
