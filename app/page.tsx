import Hero from "@/components/homepage/Hero";
import WelcomeSection from "@/components/homepage/WelcomeSection";
import CategoryHorizontalScroll from "@/components/homepage/CategoryHorizontalScroll";
import NewArrivals from "@/components/homepage/NewArrivals";
import FeaturedMarquee from "@/components/homepage/FeaturedMarquee";
import SocialGarden from "@/components/homepage/SocialGarden";

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
      <CategoryHorizontalScroll />
      <NewArrivals />
      <FeaturedMarquee />
      <SocialGarden />
    </>
  );
}
