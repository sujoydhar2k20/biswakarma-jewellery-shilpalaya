
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Review } from "@/types/supabase";

// Reviews
export async function fetchReviews(): Promise<Review[]> {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('display_order', { ascending: true }) as { data: Review[] | null, error: any };
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}

export async function saveReview(review: any): Promise<Review[]> {
  try {
    // Determine if we're updating or inserting
    const existingId = review.id && !review.id.startsWith('temp_') ? review.id : null;
    
    if (existingId) {
      const { error } = await supabase
        .from('reviews')
        .update({
          name: review.name,
          rating: review.rating,
          text: review.text,
          date: review.date,
          display_order: review.display_order || 0,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingId);
      
      if (error) throw error;
      toast.success('Review updated successfully');
    } else {
      const { error } = await supabase
        .from('reviews')
        .insert({
          name: review.name || '',
          rating: review.rating || 5,
          text: review.text || '',
          date: review.date,
          display_order: review.display_order || 0
        });
      
      if (error) throw error;
      toast.success('Review added successfully');
    }
    
    return await fetchReviews();
  } catch (error) {
    console.error('Error saving review:', error);
    toast.error('Failed to save review');
    throw error;
  }
}

export async function deleteReview(reviewId: string): Promise<Review[]> {
  try {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId);
    
    if (error) throw error;
    toast.success('Review deleted successfully');
    
    return await fetchReviews();
  } catch (error) {
    console.error('Error deleting review:', error);
    toast.error('Failed to delete review');
    throw error;
  }
}
