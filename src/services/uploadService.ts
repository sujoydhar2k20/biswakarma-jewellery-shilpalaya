
import { supabase } from "@/integrations/supabase/client";

// Default image URL when upload fails
const DEFAULT_IMAGE_URL = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b";

// Helper function for file uploads
export async function uploadFile(file: File, path: string): Promise<string | null> {
  try {
    if (!file) return null;
    
    const fileExt = file.name ? file.name.split('.').pop() : 'jpg';
    const fileName = `${path}-${Date.now()}.${fileExt}`;
    const filePath = `${path}/${fileName}`;
    
    // Check if the storage bucket exists, if not create it
    try {
      const { data: buckets } = await supabase.storage.listBuckets();
      if (!buckets?.some(bucket => bucket.name === 'website_images')) {
        const { error } = await supabase.storage.createBucket('website_images', { 
          public: true 
        });
        if (error) console.error('Error creating bucket:', error);
      }
    } catch (bucketError) {
      console.error('Error checking buckets:', bucketError);
    }
    
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
    return DEFAULT_IMAGE_URL;
  }
}
