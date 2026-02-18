"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const ContactCTA = () => {
  return (
    <section className="relative py-28 lg:py-44 bg-dark-brown overflow-hidden">
      {/* 1. LINIE DEKORACYJNE POZIOME */}
      <div className="absolute top-0 left-0 right-0 h-px bg-beige/20" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-beige/20" />

      {/* 2. SUBTELNE ORNAMENTY - TERAZ ZAWSZE WIDOCZNE (POZYTYWNE POZYCJONOWANIE) */}
      {/* Koło lewa góra */}
      <div className="absolute top-8 left-8 w-24 h-24 md:w-32 md:h-32 border border-beige/15 rounded-full pointer-events-none" />

      {/* Koło prawa dół */}
      <div className="absolute bottom-8 right-8 w-32 h-32 md:w-44 md:h-44 border border-beige/15 rounded-full pointer-events-none" />

      {/* Linie pionowe boczne - Zgodnie z Twoją grafiką */}
      <div className="absolute top-1/2 left-12 -translate-y-1/2 w-px h-24 bg-beige/15 hidden lg:block" />
      <div className="absolute top-1/2 right-12 -translate-y-1/2 w-px h-24 bg-beige/15 hidden lg:block" />

      {/* 3. TREŚĆ CENTRALNA */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="font-body text-[10px] uppercase tracking-[0.5em] text-beige/40 mb-8">
            Indywidualne podejście
          </p>

          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl text-beige leading-[1.1] mb-10 tracking-tight">
            Szukasz czegoś <br className="hidden md:block" /> wyjątkowego?
          </h2>

          <div className="w-16 h-px bg-beige/30 mx-auto mb-10" />

          <p className="font-body text-beige/70 text-lg lg:text-xl max-w-xl mx-auto leading-relaxed mb-12">
            Napisz do nas — pomożemy znaleźć idealny meble, który nadadzą
            Twojemu wnętrzu niepowtarzalny charakter.
          </p>

          <Link
            href="/kontakt"
            className="group inline-flex items-center gap-4 border border-beige/30 text-beige px-12 py-5 font-body text-xs uppercase tracking-[0.2em] hover:bg-beige hover:text-dark-brown transition-all duration-500 shadow-xl"
          >
            Skontaktuj się
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;
