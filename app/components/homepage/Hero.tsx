import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  title: string;
  imageSrc: string;
  ctaText: string;
  ctaLink: string;
}

const Hero = ({ title, imageSrc, ctaText, ctaLink }: HeroProps) => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Zdjęcie Hero z priorytetem ładowania */}
      <Image
        src={imageSrc}
        alt={title}
        fill
        priority // Kluczowe dla LCP!
        className="object-cover opacity-80"
        sizes="100vw"
      />

      {/* Overlay z treścią */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-white mb-8 max-w-5xl leading-[0.9] tracking-tightest ">
          {title}
        </h1>

        <Link
          href={ctaLink}
          className="group relative px-10 py-4 bg-white text-black font-body text-xs uppercase tracking-[0.3em] hover:bg-brown hover:text-white transition-all duration-500"
        >
          {ctaText}
          {/* Subtelna linia pod spodem w stylu editorial */}
          <span className="absolute -bottom-2 left-0 w-0 h-px bg-brown transition-all duration-500 group-hover:w-full" />
        </Link>
      </div>

      {/* Subtelny scroll indicator (opcjonalnie) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 font-body text-[10px] uppercase tracking-[0.2em] animate-bounce">
        Scroll
      </div>
    </section>
  );
};

export default Hero;
