
import { Star, ArrowRight } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Rahul Sharma",
    rating: 5,
    text: "Absolutely stunning jewelry collection! I purchased a necklace for my wife's birthday and she loved it. The craftsmanship is exceptional.",
    date: "2 weeks ago"
  },
  {
    id: 2,
    name: "Priya Patel",
    rating: 5,
    text: "The service here is outstanding. Staff helped me choose the perfect pair of earrings. Will definitely come back!",
    date: "1 month ago"
  },
  {
    id: 3,
    name: "Amit Kumar",
    rating: 4,
    text: "Beautiful collection of traditional gold jewelry. Prices are fair for the quality they offer.",
    date: "2 months ago"
  },
  {
    id: 4,
    name: "Meera Singh",
    rating: 5,
    text: "I've been a customer for years and the quality never disappoints. Recently bought a diamond ring and it's magnificent!",
    date: "3 months ago"
  }
];

const GoogleReviews = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">Customer <span className="text-ruby-red">Reviews</span></h2>
          <div className="flex items-center justify-center mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} fill="#FFC107" color="#FFC107" size={24} />
              ))}
            </div>
            <span className="ml-2 text-lg font-medium">4.9 out of 5</span>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See what our customers have to say about their experiences with us
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <div 
              key={review.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-ruby-red/10 flex items-center justify-center text-ruby-red font-medium mr-3">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium">{review.name}</h4>
                  <span className="text-gray-500 text-sm">{review.date}</span>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} fill="#FFC107" color="#FFC107" size={16} />
                ))}
              </div>
              
              <p className="text-gray-600 text-sm">"{review.text}"</p>
              
              <div className="flex items-center mt-4">
                <img src="/placeholder.svg" alt="Google" width={16} height={16} className="mr-1" />
                <span className="text-xs text-gray-500">Posted on Google</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <a 
            href="https://g.page/r/biswakarma-jewellery-reviews" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-ruby-red hover:text-ruby-dark transition-colors font-medium inline-flex items-center"
          >
            View all reviews on Google
            <ArrowRight size={16} className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
