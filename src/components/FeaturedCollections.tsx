
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const collections = [
  {
    id: 1,
    name: "Diamond Elegance",
    description: "Timeless diamond pieces for every occasion",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Gold Heritage",
    description: "Traditional designs with modern craftsmanship",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Gemstone Wonders",
    description: "Colorful precious stones in artistic settings",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Bridal Collection",
    description: "Special jewelry for your most important day",
    image: "/placeholder.svg"
  }
];

const FeaturedCollections = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">Featured Collections</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most sought-after jewelry collections, crafted with precision and passion
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection) => (
            <div 
              key={collection.id} 
              className="group overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={collection.image} 
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-playfair font-semibold mb-2">{collection.name}</h3>
                <p className="text-gray-600 mb-4 font-poppins">{collection.description}</p>
                <a 
                  href={`/collection/${collection.id}`} 
                  className="inline-flex items-center text-gold hover:text-gold-dark transition-colors font-medium"
                >
                  View Collection <ArrowRight size={16} className="ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-gold hover:bg-gold-dark text-white px-8 py-6 rounded-none">
            View All Collections
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
