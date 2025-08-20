import HeroSection from "@/components/hero-section";
import FeaturedArticles from "@/components/featured-articles";
import TopicsSection from "@/components/topics-section";
import NewsletterSection from "@/components/newsletter-section";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedArticles />
      <TopicsSection />
      <NewsletterSection />
    </div>
  );
}
