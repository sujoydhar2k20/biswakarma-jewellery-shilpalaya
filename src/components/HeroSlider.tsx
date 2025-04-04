
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    image: '/placeholder.svg',
    title: "Elegant Diamond Collection",
    subtitle: "Timeless beauty crafted with precision",
    buttonText: "Explore Collection"
  },
  {
    id: 2,
    image: '/placeholder.svg',
    title: "Gold Wedding Jewelry",
    subtitle: "Make your special day unforgettable",
    buttonText: "View Bridal Sets"
  },
  {
    id: 3,
    image: '/placeholder.svg',
    title: "Gemstone Masterpieces",
    subtitle: "Rare and exquisite colored stones",
    buttonText: "Discover Now"
  }
];

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[60vh] md:h-[80vh] overflow-hidden bg-gray-100">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="container mx-auto h-full flex items-center justify-center px-4">
            <div className="text-center text-white animate-fade-in max-w-2xl">
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {slide.title}
              </h1>
              <p className="font-poppins mb-8 text-lg md:text-xl opacity-90">
                {slide.subtitle}
              </p>
              <Button className="px-8 py-6 text-lg rounded-none">
                {slide.buttonText}
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-10"
        onClick={goToPrev}
      >
        <ChevronLeft size={24} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-10"
        onClick={goToNext}
      >
        <ChevronRight size={24} />
      </Button>

      {/* Indicator dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 md:h-3 md:w-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-ruby-red w-8' : 'bg-white/60'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
