
import { Clock, Gem, Award } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about-us" className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">About Biswakarma Jewellery Shilpalaya</h2>
            <p className="text-gray-600 mb-6">
              Founded in 1978, Biswakarma Jewellery has been a symbol of trust and excellence in the jewelry industry for over 45 years. Our craftsmen combine traditional techniques with modern innovation to create pieces that are both timeless and contemporary.
            </p>
            <p className="text-gray-600 mb-8">
              We pride ourselves on sourcing only the finest materials and gemstones from ethical suppliers around the world. Each piece in our collection undergoes rigorous quality checks to ensure it meets our exacting standards before reaching our customers.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-4 border border-gray-200">
                <Gem className="text-gold mb-2" size={28} />
                <h3 className="font-playfair font-semibold mb-1">Premium Quality</h3>
                <p className="text-sm text-gray-500">Finest materials and craftsmanship</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 border border-gray-200">
                <Clock className="text-gold mb-2" size={28} />
                <h3 className="font-playfair font-semibold mb-1">45+ Years</h3>
                <p className="text-sm text-gray-500">Of trusted excellence</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 border border-gray-200">
                <Award className="text-gold mb-2" size={28} />
                <h3 className="font-playfair font-semibold mb-1">Award Winning</h3>
                <p className="text-sm text-gray-500">Internationally recognized designs</p>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="relative">
              <img 
                src="/placeholder.svg" 
                alt="Biswakarma Jewellery Craftsman"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 md:w-32 md:h-32 bg-gold flex items-center justify-center rounded-lg shadow-lg">
                <span className="text-white font-playfair text-center">
                  <span className="block font-bold text-2xl md:text-3xl">45+</span>
                  <span className="text-sm">Years of Excellence</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
