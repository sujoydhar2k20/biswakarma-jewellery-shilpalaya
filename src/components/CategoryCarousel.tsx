
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = Array.from({ length: 102 }, (_, i) => ({
  id: i + 1,
  name: `Category ${i + 1}`,
  image: '/placeholder.svg'
}));

const CategoryCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const scrollAmount = 300;
  
  const handleScroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    
    const scrollLeft = containerRef.current.scrollLeft;
    const newPosition = direction === 'left' 
      ? Math.max(scrollLeft - scrollAmount, 0) 
      : scrollLeft + scrollAmount;
    
    containerRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    
    setScrollPosition(newPosition);
  };
  
  return (
    <section className="py-16 bg-cream">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold">Our Categories</h2>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="border-gold text-gold hover:bg-gold hover:text-white"
              onClick={() => handleScroll('left')}
            >
              <ChevronLeft size={20} />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              className="border-gold text-gold hover:bg-gold hover:text-white"
              onClick={() => handleScroll('right')}
            >
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>
        
        <div className="relative overflow-hidden">
          <div 
            ref={containerRef}
            className="flex gap-4 overflow-x-auto pb-6 scroll-smooth hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category) => (
              <a 
                href={`/category/${category.id}`} 
                key={category.id}
                className="flex-shrink-0 group"
              >
                <div className="relative w-48 h-48 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <span className="text-white font-medium text-lg font-playfair">
                      {category.name}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;
