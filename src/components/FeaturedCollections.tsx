
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const collections = [
  {
    id: 1,
    name: "Ruby Elegance",
    description: "Stunning ruby pieces for a vibrant look",
    image: "/placeholder.svg",
    category: "Featured"
  },
  {
    id: 2,
    name: "22K Gold Heritage",
    description: "Traditional designs with modern craftsmanship",
    image: "/placeholder.svg",
    category: "22K Gold"
  },
  {
    id: 3,
    name: "Pearl Wonders",
    description: "Timeless pearl jewelry for every occasion",
    image: "/placeholder.svg",
    category: "Pearl"
  },
  {
    id: 4,
    name: "Diamond Dreams",
    description: "Luxury diamond pieces that sparkle and shine",
    image: "/placeholder.svg",
    category: "Diamond"
  }
];

const FeaturedCollections = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-rose-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">Featured <span className="text-ruby-red">Collections</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most sought-after jewelry collections, crafted with precision and passion
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection) => (
            <Card 
              key={collection.id} 
              className="group overflow-hidden border border-gray-200 hover:border-ruby-red/30 hover:shadow-lg transition-all duration-300 rounded-lg"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute top-3 left-3 z-10 bg-ruby-red/90 text-white text-xs font-medium px-3 py-1 rounded-full">
                  {collection.category}
                </div>
                <img 
                  src={collection.image} 
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-xl font-playfair">{collection.name}</CardTitle>
                <CardDescription className="font-poppins">{collection.description}</CardDescription>
              </CardHeader>
              <CardFooter className="p-6 pt-2">
                <a 
                  href={`/collection/${collection.id}`} 
                  className="inline-flex items-center text-ruby-red hover:text-ruby-dark transition-colors font-medium group"
                >
                  View Collection 
                  <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-ruby-red hover:bg-ruby-dark text-white px-8 py-6 rounded-none">
            View All Collections
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
