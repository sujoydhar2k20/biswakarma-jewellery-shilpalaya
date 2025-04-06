
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Collection } from "@/types/supabase";
import { uploadFile } from "./uploadService";

// Collections
export async function fetchCollections(): Promise<Collection[]> {
  try {
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .order('display_order', { ascending: true }) as { data: Collection[] | null, error: any };
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
}

export async function saveCollection(collection: any): Promise<Collection[]> {
  try {
    let imageUrl = collection.image;
    
    // If the image is a Blob/File, upload it to storage
    if (typeof collection.image === 'object' && collection.image instanceof File) {
      const uploadedUrl = await uploadFile(collection.image, 'collections');
      if (uploadedUrl) imageUrl = uploadedUrl;
    }
    
    // Determine if we're updating or inserting
    const existingId = collection.id && !collection.id.startsWith('temp_') ? collection.id : null;
    
    if (existingId) {
      const { error } = await supabase
        .from('collections')
        .update({
          name: collection.name,
          image: imageUrl,
          link: collection.link,
          type: collection.type,
          display_order: collection.display_order || 0,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingId);
      
      if (error) throw error;
      toast.success('Collection updated successfully');
    } else {
      const { error } = await supabase
        .from('collections')
        .insert({
          name: collection.name || '',
          image: imageUrl,
          link: collection.link,
          type: collection.type || '',
          display_order: collection.display_order || 0
        });
      
      if (error) throw error;
      toast.success('Collection added successfully');
    }
    
    return await fetchCollections();
  } catch (error) {
    console.error('Error saving collection:', error);
    toast.error('Failed to save collection');
    throw error;
  }
}

export async function deleteCollection(collectionId: string): Promise<Collection[]> {
  try {
    const { error } = await supabase
      .from('collections')
      .delete()
      .eq('id', collectionId);
    
    if (error) throw error;
    toast.success('Collection deleted successfully');
    
    return await fetchCollections();
  } catch (error) {
    console.error('Error deleting collection:', error);
    toast.error('Failed to delete collection');
    throw error;
  }
}
