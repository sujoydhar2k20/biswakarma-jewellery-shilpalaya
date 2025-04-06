
import { supabase } from "@/integrations/supabase/client";

// Helper function for file uploads
export async function uploadFile(file: File, path: string): Promise<string | null> {
  try {
    if (!file) return null;
    
    const fileExt = file.name ? file.name.split('.').pop() : 'jpg';
    const fileName = `${path}-${Date.now()}.${fileExt}`;
    const filePath = `${path}/${fileName}`;
    
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('website_images')
      .upload(filePath, file);
    
    if (uploadError) throw uploadError;
    
    const { data } = supabase
      .storage
      .from('website_images')
      .getPublicUrl(filePath);
    
    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    // Return a default image URL when upload fails
    return `https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format`;
  }
}
