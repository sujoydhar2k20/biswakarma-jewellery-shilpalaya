
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

export async function saveCollection(collection: Partial<Collection> & { image?: File | string }): Promise<Collection[]> {
  try {
    let imageUrl = collection.image;
    
    // If the image is a File object, upload it to storage
    if (collection.image && typeof collection.image === 'object' && collection.image instanceof File) {
      try {
        const uploadedUrl = await uploadFile(collection.image, 'collections');
        if (uploadedUrl) imageUrl = uploadedUrl;
      } catch (uploadError) {
        console.error('Error uploading collection image:', uploadError);
        toast.error('Failed to upload image');
        // Continue with save operation even if image upload fails
      }
    }
    
    // Determine if we're updating or inserting
    const existingId = collection.id && !collection.id.toString().startsWith('temp_') ? collection.id : null;
    
    if (existingId) {
      // Create update object with only fields that exist
      const updateData: any = {
        updated_at: new Date().toISOString()
      };
      
      // Only add fields that have values
      if (collection.name !== undefined) updateData.name = collection.name;
      if (imageUrl !== undefined) updateData.image = imageUrl;
      if (collection.link !== undefined) updateData.link = collection.link;
      if (collection.type !== undefined) updateData.type = collection.type;
      if (collection.display_order !== undefined) updateData.display_order = collection.display_order;
      
      const { error } = await supabase
        .from('collections')
        .update(updateData)
        .eq('id', existingId);
      
      if (error) throw error;
      toast.success('Collection updated successfully');
    } else {
      const { error } = await supabase
        .from('collections')
        .insert({
          name: collection.name || '',
          image: imageUrl || null,
          link: collection.link || null,
          type: collection.type || '',
          display_order: collection.display_order || 0
        });
      
      if (error) throw error;
      toast.success('Collection added successfully');
    }
    
    // Return updated collections list
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
