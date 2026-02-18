"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const SocialGarden = () => {
  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-main py-4 lg:py-0 lg:h-screen lg:max-h-[1000px]">
      {/* 1. ORNAMENT TŁA - Pełne wypełnienie na mobile i desktopie */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 lg:opacity-100">
        <Image
          src="/images/social-ornaments.png"
          alt=""
          fill
          // object-cover sprawia, że obraz wypełnia całą wysokość i szerokość (tło "od krawędzi do krawędzi")
          // object-center dba o to, by środek grafiki był zawsze widoczny
          className="object-cover object-center"
          priority={false}
        />
      </div>

      {/* 2. TREŚĆ (Content) */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        // max-w-lg (512px) na desktopie sprawi, że tekst będzie bardziej "zciśnięty" i elegancki
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-md lg:max-w-lg mx-auto"
      >
        {/* Ikona Facebooka */}
        <div className="relative w-14 h-14 mb-8 shadow-2xl rounded-2xl overflow-hidden border border-black/5">
          <Image
            src="/images/facebook-icon.png"
            alt="Facebook"
            fill
            className="object-cover"
          />
        </div>

        <p className="font-body text-brown text-[10px] uppercase tracking-[0.4em] mb-4">
          Bądź częścią historii
        </p>

        <h2 className="font-heading text-4xl lg:text-5xl leading-[1.1] mb-8 text-black">
          Dołącz do naszego ogrodu inspiracji
        </h2>

        {/* Skrócony wiersz tekstu dla lepszej estetyki */}
        <p className="font-body text-black/70 text-base lg:text-lg leading-relaxed mb-10">
          Codziennie publikujemy zapowiedzi nowych dropów z&nbsp;Holandii,
          historie renowacji naszych unikatów i&nbsp;inspiracje, które pomogą Ci
          stworzyć wnętrze z&nbsp;duszą.
        </p>

        <a
          href="https://facebook.com/twoja-strona"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-4 bg-black text-white px-10 py-4 font-body text-xs uppercase tracking-[0.2em] hover:bg-brown transition-all duration-500 shadow-xl"
        >
          Odwiedź nas na Facebooku
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </a>
      </motion.div>
    </section>
  );
};

export default SocialGarden;
