"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

interface CollageImageProps {
  src: string;
  alt: string;
  className: string;
  parallaxOffset: number;
  delay?: number;
}

const CollageImage = ({
  src,
  alt,
  className,
  parallaxOffset,
  delay = 0,
}: CollageImageProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [parallaxOffset, -parallaxOffset],
  );

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
      className={`${className} overflow-hidden shadow-2xl`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 25vw"
        className="object-cover"
      />
    </motion.div>
  );
};

const WelcomeSection = () => {
  const images = [
    "/images/welcome/image_1.png",
    "/images/welcome/image_2.png",
    "/images/welcome/image_3.png",
    "/images/welcome/image_4.png",
    "/images/welcome/image_5.png",
    "/images/welcome/image_6.png",
  ];

  return (
    <section className="relative py-24 lg:py-48 bg-main overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 relative">
        {/* Collage images – Desktop Parallax */}
        <div className="hidden md:block absolute inset-0 pointer-events-none">
          {/* LEWA STRONA */}
          <CollageImage
            src={images[0]}
            alt="Meble vintage 1"
            className="absolute left-[3%] top-[2%] w-[15%] aspect-[3/4] -rotate-6 z-0"
            parallaxOffset={120} // Szybki ruch - "najdalej"
            delay={0.1}
          />
          <CollageImage
            src={images[4]}
            alt="Meble vintage 5"
            className="absolute left-[11%] top-[48%] w-[13%] aspect-[4/3] -rotate-2 z-10 shadow-xl"
            parallaxOffset={40} // Wolny ruch - "bliżej"
            delay={0.2}
          />
          <CollageImage
            src={images[2]}
            alt="Meble vintage 3"
            className="absolute left-[2%] top-[68%] w-[17%] aspect-[3/4] rotate-3 z-0"
            parallaxOffset={100}
            delay={0.3}
          />

          {/* PRAWA STRONA */}
          <CollageImage
            src={images[1]}
            alt="Meble vintage 2"
            className="absolute right-[4%] top-[6%] w-[16%] aspect-[3/4] rotate-6 z-0"
            parallaxOffset={90}
            delay={0.15}
          />
          <CollageImage
            src={images[5]}
            alt="Meble vintage 6"
            className="absolute right-[12%] top-[44%] w-[15%] aspect-[4/3] rotate-2 z-10 shadow-2xl"
            parallaxOffset={60}
            delay={0.35}
          />
          <CollageImage
            src={images[3]}
            alt="Meble vintage 4"
            className="absolute right-[3%] top-[65%] w-[15%] aspect-[3/4] -rotate-3 z-20"
            parallaxOffset={130} // Szybki ruch na dole dla dynamiki
            delay={0.25}
          />
        </div>

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-center"
          >
            <div className="relative w-40 md:w-52 h-20 mb-8 opacity-40">
              <Image
                src="/images/ornament.svg"
                alt="Decoration"
                fill
                className="object-contain"
              />
            </div>

            <h2 className="font-heading text-display-md leading-[1.1] mb-8 text-black">
              Witaj w naszym sklepie z&nbsp;holenderskim designem
            </h2>

            <p className="font-body text-black/70 leading-relaxed mb-10 max-w-lg text-lg">
              Importujemy starannie wyselekcjonowane meble i&nbsp;dekoracje
              vintage prosto z&nbsp;Holandii i&nbsp;Belgii. Każdy przedmiot
              przechodzi szczegółową kontrolę jakości i&nbsp;otrzymuje raport
              stanu — abyś mógł kupować z&nbsp;pełnym zaufaniem.
            </p>

            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-4 border border-black/20 px-10 py-4 font-body text-xs uppercase tracking-widest hover:bg-brown hover:text-white hover:border-brown transition-all duration-500"
            >
              O nas
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        </div>

        {/* Mobile: Elegant Grid */}
        <div className="grid grid-cols-2 gap-4 mt-16 md:hidden">
          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative h-64 ${i % 3 === 0 ? "col-span-2" : ""}`}
            >
              <Image
                src={src}
                alt={`Vintage ${i}`}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
