
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Loyal Customer",
    quote: "The craftsmanship at Biswakarma Jewellery is truly exceptional. Each piece I've purchased has become a treasured heirloom in my family.",
    rating: 5,
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Rahul Mehta",
    role: "First-time Buyer",
    quote: "I was amazed by the variety and quality of designs. The staff helped me find the perfect engagement ring within my budget.",
    rating: 5,
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Ananya Patel",
    role: "Wedding Customer",
    quote: "Our entire wedding jewelry was from Biswakarma, and we couldn't be happier. The attention to detail and customer service is world-class.",
    rating: 5,
    image: "/placeholder.svg"
  }
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 6000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-2">Customer Stories</h2>
          <p className="text-gray-600">Hear what our valued customers have to say</p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`transition-opacity duration-500 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0 absolute inset-0'
              }`}
            >
              <div className="bg-white shadow-lg p-6 md:p-10 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-gold fill-gold" />
                  ))}
                </div>
                
                <blockquote className="text-gray-700 text-lg md:text-xl italic mb-6">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="font-playfair">
                  <p className="font-bold text-lg">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrev}
            className="absolute left-0 md:-left-16 top-1/2 transform -translate-y-1/2 bg-white shadow-md hover:bg-gray-100 text-gray-700 rounded-full p-2 z-10"
          >
            <ChevronLeft size={20} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute right-0 md:-right-16 top-1/2 transform -translate-y-1/2 bg-white shadow-md hover:bg-gray-100 text-gray-700 rounded-full p-2 z-10"
          >
            <ChevronRight size={20} />
          </Button>
        </div>
        
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? 'w-8 bg-gold' : 'w-2 bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
