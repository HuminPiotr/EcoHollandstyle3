import Hero from "@/components/homepage/Hero";
import WelcomeSection from "@/components/homepage/WelcomeSection";

const heroData = {
  title: "Unikalne meble z duszą Holandii",
  imageSrc: "/images/hero.png", // Upewnij się, że masz to zdjęcie w public/images/
  ctaText: "Odkryj kolekcję",
  ctaLink: "/sklep",
};
export default function Home() {
  return (
    <>
      <Hero
        title={heroData.title}
        imageSrc={heroData.imageSrc}
        ctaText={heroData.ctaText}
        ctaLink={heroData.ctaLink}
      />
      <WelcomeSection />
    </>
  );
}
