
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash, Plus, Star, Upload } from "lucide-react";

const TestimonialsEditor = () => {
  const [testimonials, setTestimonials] = useState([
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
  ]);

  const [editingTestimonial, setEditingTestimonial] = useState(null);

  const handleEditTestimonial = (testimonial) => {
    setEditingTestimonial({...testimonial});
  };

  const handleAddTestimonial = () => {
    setEditingTestimonial({
      id: Date.now(),
      name: "",
      role: "",
      quote: "",
      rating: 5,
      image: "/placeholder.svg"
    });
  };

  const handleSaveTestimonial = () => {
    if (editingTestimonial) {
      const existing = testimonials.find(t => t.id === editingTestimonial.id);
      if (existing) {
        setTestimonials(testimonials.map(t => t.id === editingTestimonial.id ? editingTestimonial : t));
      } else {
        setTestimonials([...testimonials, editingTestimonial]);
      }
      setEditingTestimonial(null);
    }
  };

  const handleDeleteTestimonial = (id) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Customer Stories Management</h1>
        <Button onClick={handleAddTestimonial} className="flex items-center gap-2">
          <Plus size={16} />
          Add New Testimonial
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map(testimonial => (
          <Card key={testimonial.id} className="p-6">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{testimonial.name}</h3>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-8 w-8 p-0"
                  onClick={() => handleEditTestimonial(testimonial)}
                >
                  <Edit size={16} />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => handleDeleteTestimonial(testimonial.id)}
                >
                  <Trash size={16} />
                </Button>
              </div>
            </div>
            
            <div className="flex my-3">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            
            <p className="text-gray-700 italic">"{testimonial.quote}"</p>
          </Card>
        ))}
      </div>
      
      {/* Edit Testimonial Modal */}
      {editingTestimonial && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">
                {testimonials.some(t => t.id === editingTestimonial.id) ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="testimonial-image">Customer Photo</Label>
                  <div className="mt-2 border-2 border-dashed rounded-md p-4 text-center">
                    {editingTestimonial.image && editingTestimonial.image !== '/placeholder.svg' ? (
                      <div className="relative">
                        <img 
                          src={editingTestimonial.image} 
                          alt="Testimonial preview"
                          className="mx-auto h-32 object-contain"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => setEditingTestimonial({...editingTestimonial, image: '/placeholder.svg'})}
                        >
                          Remove Image
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-1 text-sm text-gray-500">
                          Drop an image here or click to upload
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                        >
                          Choose Image
                        </Button>
                        <Input 
                          type="file" 
                          id="testimonial-image" 
                          className="sr-only"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const fakeUrl = URL.createObjectURL(file);
                              setEditingTestimonial({...editingTestimonial, image: fakeUrl});
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="testimonial-name">Customer Name</Label>
                  <Input 
                    id="testimonial-name" 
                    value={editingTestimonial.name} 
                    onChange={(e) => setEditingTestimonial({...editingTestimonial, name: e.target.value})}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="testimonial-role">Role/Title</Label>
                  <Input 
                    id="testimonial-role" 
                    value={editingTestimonial.role} 
                    onChange={(e) => setEditingTestimonial({...editingTestimonial, role: e.target.value})}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="testimonial-rating">Rating</Label>
                  <div className="flex items-center gap-4 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`cursor-pointer ${star <= editingTestimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        onClick={() => setEditingTestimonial({...editingTestimonial, rating: star})}
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="testimonial-quote">Testimonial Quote</Label>
                  <Textarea 
                    id="testimonial-quote" 
                    value={editingTestimonial.quote} 
                    onChange={(e) => setEditingTestimonial({...editingTestimonial, quote: e.target.value})}
                    className="mt-1 resize-none"
                    rows={4}
                  />
                </div>
                
                <div className="flex justify-end gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setEditingTestimonial(null)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveTestimonial}>
                    Save Testimonial
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

export default TestimonialsEditor;
