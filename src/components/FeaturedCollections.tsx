
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
    <section className="py-20 bg-gradient-to-b from-white to-rose-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4">Featured <span className="text-ruby-red">Collections</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover our most sought-after jewelry collections, crafted with precision and passion
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((collection) => (
            <Card 
              key={collection.id} 
              className="group overflow-hidden border border-gray-100 hover:border-ruby-red/30 hover:shadow-2xl transition-all duration-500 rounded-2xl"
            >
              <div className="relative h-72 overflow-hidden">
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-red-pink-gradient text-white text-xs font-medium px-4 py-1.5 rounded-full">
                    {collection.category}
                  </span>
                </div>
                <img 
                  src={collection.image} 
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-2xl font-playfair">{collection.name}</CardTitle>
                <CardDescription className="font-poppins text-base">{collection.description}</CardDescription>
              </CardHeader>
              <CardFooter className="p-6 pt-2">
                <a 
                  href={`/collection/${collection.id}`} 
                  className="inline-flex items-center text-ruby-red hover:text-ruby-dark transition-colors font-medium group"
                >
                  View Collection 
                  <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Button size="lg" className="px-10 py-6 text-lg">
            View All Collections
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
