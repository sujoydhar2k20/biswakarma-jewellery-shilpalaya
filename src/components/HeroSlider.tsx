
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchHeroBanners } from '@/services/bannerService'; // Updated import
import { HeroBanner } from '@/types/supabase';
import { useData } from '@/contexts/DataContext';

// Default fallback image
const DEFAULT_IMAGE_URL = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1920&auto=format";

const defaultSlides = [
  {
    id: "1",
    title: "Elegant Diamond Collection",
    subtitle: "Timeless beauty crafted with precision",
    button_text: "Explore Collection",
    image_url: DEFAULT_IMAGE_URL,
    button_link: "#"
  }
];

interface FormattedSlide {
  id: string;
  title: string;
  subtitle?: string | null;
  button_text?: string | null;
  button_link?: string | null;
  image_url?: string | null;
}

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState<FormattedSlide[]>(defaultSlides);
  const [loading, setLoading] = useState(true);
  const { heroBanners } = useData();

  useEffect(() => {
    if (heroBanners && heroBanners.length > 0) {
      console.log("Using data from context:", heroBanners);
      // Transform data format
      const formattedSlides: FormattedSlide[] = heroBanners.map((item: HeroBanner) => ({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        button_text: item.button_text,
        button_link: item.button_link,
        image_url: item.image_url || DEFAULT_IMAGE_URL // Use default image if null
      }));
      
      setSlides(formattedSlides);
      setLoading(false);
    } else {
      loadSlides();
    }
  }, [heroBanners]);

  const loadSlides = async () => {
    try {
      console.log("Fetching banners directly");
      const data = await fetchHeroBanners();
      if (data && data.length > 0) {
        // Transform data format
        const formattedSlides = data.map(item => ({
          id: item.id,
          title: item.title,
          subtitle: item.subtitle,
          button_text: item.button_text,
          button_link: item.button_link,
          image_url: item.image_url || DEFAULT_IMAGE_URL // Use default image if null
        }));
        
        setSlides(formattedSlides);
      }
    } catch (error) {
      console.error('Error loading hero slides:', error);
    } finally {
      setLoading(false);
    }
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    if (slides.length <= 1) return;
    
    const timer = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[65vh] bg-gray-100">
        <Loader2 className="h-12 w-12 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="relative h-[65vh] md:h-[85vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide.image_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="container mx-auto h-full flex items-center justify-center px-4">
            <div className="text-center text-white animate-fade-in max-w-2xl backdrop-blur-sm bg-black/20 p-8 rounded-3xl shadow-2xl">
              <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient">
                {slide.title}
              </h1>
              <p className="font-poppins mb-10 text-lg md:text-xl opacity-90">
                {slide.subtitle}
              </p>
              {slide.button_text && (
                <Button size="lg" className="px-10 py-7 text-lg">
                  {slide.button_text}
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      {slides.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 z-10 h-12 w-12"
            onClick={() => setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1))}
          >
            <ChevronLeft size={28} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 z-10 h-12 w-12"
            onClick={() => setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1))}
          >
            <ChevronRight size={28} />
          </Button>

          {/* Indicator dots */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`h-3 md:h-4 transition-all ${
                  index === currentIndex ? 'bg-red-pink-gradient w-10 rounded-full' : 'bg-white/70 w-3 md:w-4 rounded-full hover:bg-white'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HeroSlider;
