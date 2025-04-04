
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import CategoryCarousel from "@/components/CategoryCarousel";
import FeaturedCollections from "@/components/FeaturedCollections";
import TestimonialSlider from "@/components/TestimonialSlider";
import AboutSection from "@/components/AboutSection";
import LocationMap from "@/components/LocationMap";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <HeroSlider />
        <CategoryCarousel />
        <FeaturedCollections />
        <TestimonialSlider />
        <AboutSection />
        <LocationMap />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
