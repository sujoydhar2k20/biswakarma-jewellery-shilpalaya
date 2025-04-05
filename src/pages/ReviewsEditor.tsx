
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash, Plus, Star } from "lucide-react";

const ReviewsEditor = () => {
  const [reviews, setReviews] = useState([
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
  ]);

  const [editingReview, setEditingReview] = useState(null);
  const [overallRating, setOverallRating] = useState("4.9");

  const handleEditReview = (review) => {
    setEditingReview({...review});
  };

  const handleAddReview = () => {
    setEditingReview({
      id: Date.now(),
      name: "",
      rating: 5,
      text: "",
      date: "Just now"
    });
  };

  const handleSaveReview = () => {
    if (editingReview) {
      const existing = reviews.find(r => r.id === editingReview.id);
      if (existing) {
        setReviews(reviews.map(r => r.id === editingReview.id ? editingReview : r));
      } else {
        setReviews([...reviews, editingReview]);
      }
      setEditingReview(null);
    }
  };

  const handleDeleteReview = (id) => {
    if (confirm("Are you sure you want to delete this review?")) {
      setReviews(reviews.filter(review => review.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Customer Reviews Management</h1>
        <Button onClick={handleAddReview} className="flex items-center gap-2">
          <Plus size={16} />
          Add New Review
        </Button>
      </div>
      
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Overall Rating</h2>
        <div className="flex items-center gap-4">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} fill="#FFC107" color="#FFC107" size={24} />
            ))}
          </div>
          <Input 
            value={overallRating} 
            onChange={(e) => setOverallRating(e.target.value)}
            className="w-20" 
          />
          <span className="text-gray-600">out of 5</span>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map(review => (
          <Card key={review.id} className="p-6">
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium">{review.name}</h3>
                <div className="flex my-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16}
                      className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <p className="text-gray-500 text-sm mb-3">{review.date}</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-8 w-8 p-0"
                  onClick={() => handleEditReview(review)}
                >
                  <Edit size={16} />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => handleDeleteReview(review.id)}
                >
                  <Trash size={16} />
                </Button>
              </div>
            </div>
            <p className="text-gray-700">"{review.text}"</p>
          </Card>
        ))}
      </div>
      
      {/* Edit Review Modal */}
      {editingReview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">
                {reviews.some(r => r.id === editingReview.id) ? 'Edit Review' : 'Add New Review'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="review-name">Customer Name</Label>
                  <Input 
                    id="review-name" 
                    value={editingReview.name} 
                    onChange={(e) => setEditingReview({...editingReview, name: e.target.value})}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="review-rating">Rating</Label>
                  <div className="flex items-center gap-4 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`cursor-pointer ${star <= editingReview.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        onClick={() => setEditingReview({...editingReview, rating: star})}
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="review-text">Review Text</Label>
                  <Textarea 
                    id="review-text" 
                    value={editingReview.text} 
                    onChange={(e) => setEditingReview({...editingReview, text: e.target.value})}
                    className="mt-1 resize-none"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="review-date">Date</Label>
                  <Input 
                    id="review-date" 
                    value={editingReview.date} 
                    onChange={(e) => setEditingReview({...editingReview, date: e.target.value})}
                    className="mt-1"
                    placeholder="e.g., 2 weeks ago"
                  />
                </div>
                
                <div className="flex justify-end gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setEditingReview(null)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveReview}>
                    Save Review
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ReviewsEditor;
