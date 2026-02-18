"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/ui/Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-black/5">
      {/* CZEŚĆ 1: JASNA / GŁÓWNA */}
      <div className="relative overflow-hidden bg-beige/30 py-24 lg:py-32">
        {/* Ornament Watermark */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
          <div className="relative w-[500px] h-[500px] opacity-30">
            <Image
              src="/images/ornament-footer.svg"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          {/* LOGO */}
          <div className="flex justify-center mb-16">
            <Logo />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
            {/* Lewo: Kontakt i Godziny */}
            <div className="flex flex-col gap-10">
              <div>
                <h4 className="font-body font-bold text-[11px] uppercase tracking-[0.3em] text-black mb-6">
                  Kontakt
                </h4>
                <div className="flex flex-col gap-3 font-body text-sm text-black">
                  {" "}
                  {/* Zwiększony kontrast (brak opacity) */}
                  <p>ul. Kąpielowa 3c, Biała Podlaska</p>
                  <a
                    href="tel:+48123456789"
                    className="hover:text-brown transition-colors font-medium"
                  >
                    513 129 116
                  </a>
                  <a
                    href="mailto:info@hollandstyle.pl"
                    className="hover:text-brown transition-colors font-medium"
                  >
                    marta.mierzwinska@onet.pl
                  </a>
                </div>
              </div>

              <div>
                <h4 className="font-body font-bold text-[11px] uppercase tracking-[0.3em] text-black mb-6">
                  Godziny otwarcia
                </h4>
                <div className="flex flex-col gap-2 font-body text-sm text-black">
                  <p>Pon. – Pt. &nbsp;|&nbsp; 10:00 – 17:00</p>
                  <p>Sobota &nbsp;|&nbsp; 10:00 – 14:00</p>
                </div>
              </div>
            </div>

            {/* Środek */}
            <div className="hidden md:block" />

            {/* Prawo: Nawigacja i Social */}
            <div className="flex flex-col gap-10 md:items-end">
              <div className="md:text-right">
                <h4 className="font-body font-bold text-[11px] uppercase tracking-[0.3em] text-black mb-6">
                  Sklep
                </h4>
                <nav className="flex flex-col gap-3">
                  <Link
                    href="/sklep"
                    className="font-body text-sm text-black hover:text-brown transition-colors font-medium"
                  >
                    Oferta unikatów
                  </Link>
                  <Link
                    href="/o-nas"
                    className="font-body text-sm text-black hover:text-brown transition-colors font-medium"
                  >
                    O nas
                  </Link>
                  <Link
                    href="/kontakt"
                    className="font-body text-sm text-black hover:text-brown transition-colors font-medium"
                  >
                    Kontakt
                  </Link>
                </nav>
              </div>

              {/* Facebook Icon - Black to Blue on Hover */}
              <a
                href="https://facebook.com/twoja-strona"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-[#1877F2] transition-colors duration-300 md:self-end"
                aria-label="Odwiedź nasz Facebook"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 12.0735C24 5.4051 18.5978 0 12 0C5.40217 0 0 5.4051 0 12.0735C0 18.0991 4.38823 23.0963 10.125 24V15.5631H7.07812V12.0735H10.125V9.41325C10.125 6.3867 11.9272 4.71525 14.6864 4.71525C16.0073 4.71525 17.3888 4.9515 17.3888 4.9515V7.93575H15.8653C14.3681 7.93575 13.9 8.86875 13.9 9.82425V12.0735H17.2612L16.7239 15.5631H13.9V24C19.6118 23.0963 24 18.0991 24 12.0735Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CZEŚĆ 2: COPYRIGHT */}
      <div className="bg-black py-6 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <p className="font-body text-[10px] uppercase tracking-[0.4em] text-white/50">
            Copyright © {currentYear} &nbsp; Daniel &nbsp;•&nbsp; ECO
            HOLLANDSTYLE
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
