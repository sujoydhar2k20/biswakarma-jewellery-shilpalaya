
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Testimonial } from "@/types/supabase";
import { uploadFile } from "./uploadService";

// Testimonials
export async function fetchTestimonials(): Promise<Testimonial[]> {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('display_order', { ascending: true }) as { data: Testimonial[] | null, error: any };
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

export async function saveTestimonial(testimonial: any): Promise<Testimonial[]> {
  try {
    let imageUrl = testimonial.image;
    
    // If the image is a Blob/File, upload it to storage
    if (typeof testimonial.image === 'object' && testimonial.image instanceof File) {
      const uploadedUrl = await uploadFile(testimonial.image, 'testimonials');
      if (uploadedUrl) imageUrl = uploadedUrl;
    }
    
    // Determine if we're updating or inserting
    const existingId = testimonial.id && !testimonial.id.startsWith('temp_') ? testimonial.id : null;
    
    if (existingId) {
      const { error } = await supabase
        .from('testimonials')
        .update({
          name: testimonial.name,
          title: testimonial.title,
          content: testimonial.content,
          image: imageUrl,
          display_order: testimonial.display_order || 0,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingId);
      
      if (error) throw error;
      toast.success('Testimonial updated successfully');
    } else {
      const { error } = await supabase
        .from('testimonials')
        .insert({
          name: testimonial.name || '',
          title: testimonial.title,
          content: testimonial.content || '',
          image: imageUrl,
          display_order: testimonial.display_order || 0
        });
      
      if (error) throw error;
      toast.success('Testimonial added successfully');
    }
    
    return await fetchTestimonials();
  } catch (error) {
    console.error('Error saving testimonial:', error);
    toast.error('Failed to save testimonial');
    throw error;
  }
}

export async function deleteTestimonial(testimonialId: string): Promise<Testimonial[]> {
  try {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', testimonialId);
    
    if (error) throw error;
    toast.success('Testimonial deleted successfully');
    
    return await fetchTestimonials();
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    toast.error('Failed to delete testimonial');
    throw error;
  }
}
