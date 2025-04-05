
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define category types
const categoryTypes = [
  { id: 'gold', name: '22 Karat Gold Collections', color: 'ruby-red' },
  { id: 'pearl', name: 'Pearl Collections', color: 'cream' },
  { id: 'silver', name: 'Silver Collections', color: 'gray-200' },
  { id: 'diamond', name: 'Diamond Collections', color: 'white' }
];

// Distribute 102 categories across the 4 types
const generateCategories = () => {
  const allCategories = [];
  let count = 1;
  
  // Distribute categories evenly (roughly 25-26 per type)
  for (let type of categoryTypes) {
    const itemCount = Math.floor(102 / categoryTypes.length) + (type.id === 'gold' ? 2 : 0);
    
    for (let i = 0; i < itemCount; i++) {
      allCategories.push({
        id: count,
        name: `${type.name.split(' ')[0]} ${count}`,
        image: '/placeholder.svg',
        type: type.id
      });
      count++;
    }
  }
  
  return allCategories;
};

const categories = generateCategories();

const CategoryCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeType, setActiveType] = useState('gold');
  
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
  
  const filteredCategories = categories.filter(cat => cat.type === activeType);
  
  return (
    <section className="py-20 bg-gradient-to-b from-cream to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-center md:text-left">Our <span className="text-ruby-red">Collections</span></h2>
          
          <div className="flex flex-wrap justify-center gap-3">
            {categoryTypes.map((type) => (
              <Button 
                key={type.id}
                variant={activeType === type.id ? "default" : "outline"}
                className="transition-all duration-300"
                onClick={() => setActiveType(type.id)}
              >
                {type.name}
              </Button>
            ))}
          </div>
          
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => handleScroll('left')}
            >
              <ChevronLeft size={20} />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleScroll('right')}
            >
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>
        
        <div className="relative overflow-hidden">
          <div 
            ref={containerRef}
            className="flex gap-6 overflow-x-auto pb-8 scroll-smooth hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredCategories.map((category) => (
              <a 
                href={`/category/${category.id}`} 
                key={category.id}
                className="flex-shrink-0 group"
              >
                <div className="relative w-56 h-56 overflow-hidden rounded-2xl shadow-lg transform transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-ruby-red/90 transition-colors flex items-end justify-center">
                    <span className="text-white font-medium text-lg font-playfair p-5 text-center">
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
