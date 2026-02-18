"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/hooks/use-cart";
import Logo from "@/components/ui/Logo";

const categories = [
  { id: "1", name: "Meble", slug: "meble" },
  { id: "2", name: "Oświetlenie", slug: "oswietlenie" },
  { id: "3", name: "Dekoracje", slug: "dekoracje" },
];

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { totalItems, setIsOpen } = useCart();

  // 1. Inicjalizacja montowania i scrolla
  useEffect(() => {
    setMounted(true);
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);
      setHidden(currentY > 100 && currentY > lastScrollY);
      lastScrollY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Sprawdź pozycję natychmiast po załadowaniu

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Zamykanie menu przy zmianie trasy
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Logika wariantu (Mounted zapobiega błędnym kolorom na starcie)
  const isOverHero = mounted && isHomePage && !scrolled && !menuOpen;
  const textColorClass = isOverHero ? "text-white" : "text-black";
  const logoVariant = isOverHero ? "white" : "default";

  return (
    <>
      {/* Overlay tła przy otwartym menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        } ${
          isOverHero
            ? "bg-transparent"
            : "bg-main/95 backdrop-blur-md border-b border-gray/20 shadow-sm"
        }`}
      >
        <div
          className={`container mx-auto px-6 lg:px-12 transition-colors duration-500 ${textColorClass}`}
        >
          <div className="flex items-center justify-between h-20 relative">
            {/* LEWA STRONA: Hamburger + Nav */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 -ml-2 hover:opacity-60 transition-opacity cursor-pointer z-50"
                aria-label="Menu"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              <nav className="hidden md:flex items-center gap-6 font-body text-[10px] uppercase tracking-[0.3em]">
                <Link
                  href="/sklep"
                  className="hover:opacity-60 transition-opacity"
                >
                  Sklep
                </Link>
                <Link
                  href="/kontakt"
                  className="hover:opacity-60 transition-opacity"
                >
                  Kontakt
                </Link>
              </nav>
            </div>

            {/* ŚRODEK: Logo */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Logo variant={logoVariant} />
            </div>

            {/* PRAWA STRONA: Koszyk */}
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 -mr-2 relative hover:opacity-60 transition-opacity cursor-pointer z-50"
              aria-label="Koszyk"
            >
              <ShoppingBag size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brown text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* MENU WYSUWANE (DROPDOWN) */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden bg-main border-t border-gray/20 shadow-xl"
            >
              <div className="container mx-auto px-6 lg:px-12 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                  {/* Nawigacja główna */}
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-[0.2em] text-gray mb-6 text-black/40">
                      Nawigacja
                    </p>
                    <nav className="flex flex-col gap-4">
                      <Link
                        href="/"
                        className="font-heading text-4xl hover:text-brown transition-colors text-black"
                      >
                        Start
                      </Link>
                      <Link
                        href="/sklep"
                        className="font-heading text-4xl hover:text-brown transition-colors text-black"
                      >
                        Sklep
                      </Link>
                      <Link
                        href="/kontakt"
                        className="font-heading text-4xl hover:text-brown transition-colors text-black"
                      >
                        Kontakt
                      </Link>
                    </nav>
                  </div>

                  {/* Kategorie */}
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-[0.2em] text-gray mb-6 text-black/40">
                      Kategorie
                    </p>
                    <nav className="flex flex-col gap-3">
                      {categories.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/sklep?kategoria=${cat.slug}`}
                          className="font-heading text-2xl hover:text-brown transition-colors text-black"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </nav>
                  </div>

                  {/* Kontakt Info */}
                  <div className="hidden md:block">
                    <p className="font-body text-[10px] uppercase tracking-[0.2em] text-gray mb-6 text-black/40">
                      Kontakt
                    </p>
                    <div className="font-body text-sm space-y-2 text-black/70">
                      <p>info@hollandstyle.pl</p>
                      <p>ul. Vintage 12, Warszawa</p>
                    </div>
                  </div>

                  {/* Wyszukiwarka */}
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-[0.2em] text-gray mb-6 text-black/40">
                      Szukaj
                    </p>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Czego szukasz?"
                        className="w-full bg-transparent border-b border-black/20 pb-2 font-body text-sm focus:outline-none focus:border-brown transition-colors text-black"
                      />
                      <Search
                        size={16}
                        className="absolute right-0 bottom-3 text-gray"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
