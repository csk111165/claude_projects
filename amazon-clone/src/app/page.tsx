import HeroBanner from "@/components/home/HeroBanner";
import DealOfTheDay from "@/components/home/DealOfTheDay";
import CategoryCards from "@/components/home/CategoryCards";
import ProductCarousel from "@/components/home/ProductCarousel";
import TrendingGrid from "@/components/home/TrendingGrid";
import RecommendedSection from "@/components/home/RecommendedSection";
import RecentlyViewed from "@/components/product/RecentlyViewed";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function HomePage() {
  return (
    <div className="bg-gray-100">
      <HeroBanner />
      <div className="max-w-[1500px] mx-auto px-4 -mt-24 relative z-10 space-y-6 pb-8">
        <ScrollReveal>
          <CategoryCards />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <DealOfTheDay />
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <ProductCarousel title="Best Sellers" filterTag="best-seller" />
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <TrendingGrid />
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <ProductCarousel title="Top Rated" filterTag="top-rated" />
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <RecommendedSection />
        </ScrollReveal>
        <ScrollReveal delay={0.25}>
          <RecentlyViewed />
        </ScrollReveal>
      </div>
    </div>
  );
}
