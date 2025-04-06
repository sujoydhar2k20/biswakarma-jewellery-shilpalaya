
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FeaturedCollection } from "@/types/supabase";
import { uploadFile } from "./uploadService";

// Featured Collections
export async function fetchFeaturedCollections(): Promise<FeaturedCollection[]> {
  try {
    const { data, error } = await supabase
      .from('featured_collections')
      .select('*')
      .order('display_order', { ascending: true }) as { data: FeaturedCollection[] | null, error: any };
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching featured collections:', error);
    return [];
  }
}

export async function saveFeaturedCollection(collection: any): Promise<FeaturedCollection[]> {
  try {
    let imageUrl = collection.image;
    
    // If the image is a Blob/File, upload it to storage
    if (typeof collection.image === 'object' && collection.image instanceof File) {
      const uploadedUrl = await uploadFile(collection.image, 'featured');
      if (uploadedUrl) imageUrl = uploadedUrl;
    }
    
    // Determine if we're updating or inserting
    const existingId = collection.id && !collection.id.startsWith('temp_') ? collection.id : null;
    
    if (existingId) {
      const { error } = await supabase
        .from('featured_collections')
        .update({
          name: collection.name,
          description: collection.description,
          image: imageUrl,
          category: collection.category,
          display_order: collection.display_order || 0,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingId);
      
      if (error) throw error;
      toast.success('Featured collection updated successfully');
    } else {
      const { error } = await supabase
        .from('featured_collections')
        .insert({
          name: collection.name || '',
          description: collection.description,
          image: imageUrl,
          category: collection.category,
          display_order: collection.display_order || 0
        });
      
      if (error) throw error;
      toast.success('Featured collection added successfully');
    }
    
    return await fetchFeaturedCollections();
  } catch (error) {
    console.error('Error saving featured collection:', error);
    toast.error('Failed to save featured collection');
    throw error;
  }
}

export async function deleteFeaturedCollection(collectionId: string): Promise<FeaturedCollection[]> {
  try {
    const { error } = await supabase
      .from('featured_collections')
      .delete()
      .eq('id', collectionId);
    
    if (error) throw error;
    toast.success('Featured collection deleted successfully');
    
    return await fetchFeaturedCollections();
  } catch (error) {
    console.error('Error deleting featured collection:', error);
    toast.error('Failed to delete featured collection');
    throw error;
  }
}
