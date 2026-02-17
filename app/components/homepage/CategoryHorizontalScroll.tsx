"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    id: "1",
    name: "Krzesła",
    slug: "krzesla",
    image: "/images/categories/krzesla.jpg",
    smallImage: "/images/categories/krzesla-sm.jpg",
  },
  {
    id: "2",
    name: "Stoły",
    slug: "stoly",
    image: "/images/categories/stoly.jpg",
    smallImage: "/images/categories/stoly-sm.jpg",
  },
  {
    id: "3",
    name: "Szafy",
    slug: "szafy",
    image: "/images/categories/szafy.jpg",
    smallImage: "/images/categories/szafy-sm.jpg",
  },
  {
    id: "4",
    name: "Komody",
    slug: "komody",
    image: "/images/categories/komody.jpg",
    smallImage: "/images/categories/komody-sm.jpg",
  },
  {
    id: "5",
    name: "Oświetlenie",
    slug: "oswietlenie",
    image: "/images/categories/lampy.jpg",
    smallImage: "/images/categories/lampy-sm.jpg",
  },
  {
    id: "6",
    name: "Dekoracje",
    slug: "dekoracje",
    image: "/images/categories/dekoracje.jpg",
    smallImage: "/images/categories/dekoracje-sm.jpg",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const CategoryHorizontalScroll = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Stan do zarządzania przeciąganiem
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragThreshold = 10; // Próg w pikselach
  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (!isHovering) return;
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const maxScroll = scrollWidth - clientWidth;
      const atStart = scrollLeft <= 0 && e.deltaY < 0;
      const atEnd = scrollLeft >= maxScroll - 1 && e.deltaY > 0;

      if (atStart || atEnd) return;
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [isHovering]);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setHasMoved(false);
    startX.current = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollContainerRef.current?.scrollLeft || 0;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = x - startX.current;

    if (Math.abs(walk) > dragThreshold) {
      setHasMoved(true);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
      }
    }
  };

  const onMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  return (
    <section className="pt-12 pb-24 lg:pt-16 lg:pb-24 bg-main overflow-hidden">
      {/* NAGŁÓWEK */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="flex flex-col items-center text-center mb-8 lg:mb-8 shrink-0"
      >
        <h2 className="font-heading text-4xl lg:text-5xl text-black">
          Oferujemy
        </h2>
      </motion.div>
      <div className="hidden md:block">
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => {
            setIsHovering(false);
            onMouseUpOrLeave();
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUpOrLeave}
          className="flex overflow-x-auto overflow-y-visible cursor-grab active:cursor-grabbing py-10 no-scrollbar select-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((cat) => (
            <CategorySlide
              key={cat.id}
              cat={cat}
              scrollContainerRef={scrollContainerRef}
              hasMoved={hasMoved}
            />
          ))}
          {/* ELEMENT DYSTANSOWY NA KOŃCU */}
          <div
            className="flex-shrink-0 w-[20vw] h-full pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Mobile Version - Prostszy Grid dla niezawodności */}
      <div className="md:hidden grid grid-cols-1 gap-4 px-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/sklep?kategoria=${cat.slug}`}
            className="relative h-64 overflow-hidden"
          >
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <h3 className="font-heading text-4xl text-white">{cat.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

const CategorySlide = ({ cat, scrollContainerRef, hasMoved }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const slide = ref.current;
    if (!container || !slide) return;

    const update = () => {
      const slideRect = slide.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const slideCenterX = slideRect.left + slideRect.width / 2;
      const containerCenterX = containerRect.left + containerRect.width / 2;
      const p = (slideCenterX - containerCenterX) / containerRect.width;
      setProgress(Math.max(-1, Math.min(1, p)));
    };

    container.addEventListener("scroll", update);
    update();
    return () => container.removeEventListener("scroll", update);
  }, [scrollContainerRef]);

  const fgX = progress * 120;
  const fgY = 40 + progress * 20;

  return (
    <div
      ref={ref}
      className="flex-shrink-0 flex items-center px-12 lg:px-24"
      style={{ width: "60vw" }}
    >
      <div className="w-full flex items-center gap-16">
        {/* Zdjęcia */}
        <div className="w-1/2 relative pb-20">
          <div className="relative aspect-[3/4] max-h-[55vh] overflow-hidden shadow-sm">
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              sizes="30vw"
              className="object-cover grayscale-[20%]"
              draggable={false}
            />
          </div>

          <motion.div
            style={{ x: fgX, y: fgY }}
            className="absolute w-[55%] aspect-[3/4] shadow-2xl right-[-10%] bottom-0 z-10 border-[10px] border-main pointer-events-none"
          >
            <Image
              src={cat.smallImage || cat.image}
              alt=""
              fill
              sizes="20vw"
              className="object-cover"
              draggable={false}
            />
          </motion.div>
        </div>

        {/* Tekst i Przycisk */}
        <div className="w-1/2 relative z-50">
          <h2 className="font-heading text-6xl lg:text-7xl xl:text-8xl leading-[0.85] mb-10 text-black tracking-tighter uppercase pointer-events-none">
            {cat.name}
          </h2>

          <Link
            href={`/sklep?kategoria=${cat.slug}`}
            onClick={(e) => {
              if (hasMoved) {
                e.preventDefault(); // Blokuj kliknięcie tylko jeśli był ruch (drag)
              }
            }}
            className="group relative z-[100] inline-flex items-center gap-4 border border-black/20 px-10 py-5 font-body text-[10px] uppercase tracking-widest hover:bg-brown hover:text-white hover:border-brown transition-all duration-500 cursor-pointer"
          >
            Sklep
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryHorizontalScroll;
