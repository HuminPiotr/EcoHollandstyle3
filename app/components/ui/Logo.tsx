"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "default" | "white";
  className?: string;
}

const Logo = ({ variant = "default", className }: LogoProps) => {
  return (
    <Link
      href="/"
      // inline-flex bez żadnych paddingów bocznych!
      // Szerokość tego komponentu = szerokość napisu Hollandstyle.
      className={cn("relative inline-flex items-center py-2 group", className)}
    >
      {/* NAPIS - Serce komponentu, to on wyznacza środek */}
      <div
        className={cn(
          "font-heading text-[28px] font-bold leading-none tracking-tight relative",
          variant === "white" ? "text-white" : "text-brown",
        )}
      >
        {/* LISTEK - "Duch" (Absolute)
            -left-[25px]: przesuwa go dokładnie o 25px w lewo od litery H
            -top-[6px]: przesuwa go o 6px w górę
            pointer-events-none: sprawia, że listek nie przeszkadza w klikaniu
        */}
        <span className="absolute -left-[25px] -top-[15px] animate-falling-leaf pointer-events-none">
          <Image
            src="/images/leaf-logo2.png"
            alt=""
            width={37}
            height={20}
            className="object-contain"
            priority
          />
        </span>
        Hollandstyle
      </div>
    </Link>
  );
};

export default Logo;
