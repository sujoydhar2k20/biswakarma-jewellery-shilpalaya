
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { HeroBanner } from "@/types/supabase";

// Default image URL to handle null cases
const DEFAULT_IMAGE_URL = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b";

// Hero Banners
export async function fetchHeroBanners(): Promise<HeroBanner[]> {
  try {
    const { data, error } = await supabase
      .from('hero_banners')
      .select('*')
      .order('display_order', { ascending: true }) as { data: HeroBanner[] | null, error: any };
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching hero banners:', error);
    return [];
  }
}

export async function saveHeroBanner(banner: Partial<HeroBanner> & { imagePreview?: string }): Promise<HeroBanner[]> {
  try {
    let image_url = banner.image_url;
    
    // If the image is a File object, upload it to storage
    // Check if image_url exists and is a File object
    if (banner.image_url && 
        typeof banner.image_url === 'object' && 
        banner.image_url !== null &&
        'name' in banner.image_url && 
        'size' in banner.image_url) {
      
      // Explicit type assertion and null check
      const file = banner.image_url as File;
      
      if (file) {
        // Safely access file properties after null check
        const fileExt = file.name ? file.name.split('.').pop() : 'jpg';
        const fileName = `banner-${Date.now()}.${fileExt}`;
        
        try {
          const { data: uploadData, error: uploadError } = await supabase
            .storage
            .from('website_images')
            .upload(`banners/${fileName}`, file);
          
          if (uploadError) throw uploadError;
          
          const { data } = supabase
            .storage
            .from('website_images')
            .getPublicUrl(`banners/${fileName}`);
          
          image_url = data.publicUrl;
        } catch (uploadError) {
          console.error('Error uploading image:', uploadError);
          // Use default image if upload fails
          image_url = DEFAULT_IMAGE_URL;
        }
      }
    }
    
    // Determine if we're updating or inserting
    const existingBannerId = banner.id && !banner.id.startsWith('temp_') ? banner.id : null;
    
    if (existingBannerId) {
      const { error } = await supabase
        .from('hero_banners')
        .update({
          title: banner.title || '',
          subtitle: banner.subtitle,
          image_url: image_url,
          button_text: banner.button_text,
          button_link: banner.button_link,
          display_order: banner.display_order || 0,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingBannerId);
      
      if (error) throw error;
      toast.success('Banner updated successfully');
    } else {
      const { error } = await supabase
        .from('hero_banners')
        .insert({
          title: banner.title || '',
          subtitle: banner.subtitle,
          image_url: image_url,
          button_text: banner.button_text,
          button_link: banner.button_link,
          display_order: banner.display_order || 0
        });
      
      if (error) throw error;
      toast.success('Banner added successfully');
    }
    
    return await fetchHeroBanners();
  } catch (error) {
    console.error('Error saving banner:', error);
    toast.error('Failed to save banner');
    throw error;
  }
}

export async function deleteHeroBanner(bannerId: string): Promise<HeroBanner[]> {
  try {
    const { error } = await supabase
      .from('hero_banners')
      .delete()
      .eq('id', bannerId);
    
    if (error) throw error;
    toast.success('Banner deleted successfully');
    
    return await fetchHeroBanners();
  } catch (error) {
    console.error('Error deleting banner:', error);
    toast.error('Failed to delete banner');
    throw error;
  }
}
