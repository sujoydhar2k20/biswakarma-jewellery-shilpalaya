
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  HeroBanner,
  Collection,
  FeaturedCollection,
  Testimonial,
  AboutSection,
  AboutFeature,
  FooterContent,
  PaymentMethod,
  PaymentSection,
  Review
} from "@/types/supabase";

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
    if (banner.image_url && typeof banner.image_url === 'object' && 'name' in banner.image_url && 'size' in banner.image_url) {
      const file = banner.image_url as File;
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `banner-${Date.now()}.${fileExt}`;
        
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
      const file = collection.image;
      const fileExt = file.name.split('.').pop();
      const fileName = `collection-${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('website_images')
        .upload(`collections/${fileName}`, file);
      
      if (uploadError) throw uploadError;
      
      const { data } = supabase
        .storage
        .from('website_images')
        .getPublicUrl(`collections/${fileName}`);
      
      imageUrl = data.publicUrl;
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
      const file = collection.image;
      const fileExt = file.name.split('.').pop();
      const fileName = `featured-${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('website_images')
        .upload(`featured/${fileName}`, file);
      
      if (uploadError) throw uploadError;
      
      const { data } = supabase
        .storage
        .from('website_images')
        .getPublicUrl(`featured/${fileName}`);
      
      imageUrl = data.publicUrl;
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
      const file = testimonial.image;
      const fileExt = file.name.split('.').pop();
      const fileName = `testimonial-${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('website_images')
        .upload(`testimonials/${fileName}`, file);
      
      if (uploadError) throw uploadError;
      
      const { data } = supabase
        .storage
        .from('website_images')
        .getPublicUrl(`testimonials/${fileName}`);
      
      imageUrl = data.publicUrl;
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

// About Section
export async function fetchAboutSection(): Promise<AboutSection | null> {
  try {
    const { data, error } = await supabase
      .from('about_section')
      .select('*, about_features(*)') as { data: (AboutSection & { about_features: AboutFeature[] })[] | null, error: any };
    
    if (error) throw error;
    return data?.[0] || null;
  } catch (error) {
    console.error('Error fetching about section:', error);
    return null;
  }
}

export async function saveAboutSection(aboutData: any): Promise<AboutSection | null> {
  try {
    let imageUrl = aboutData.image;
    
    // If the image is a Blob/File, upload it to storage
    if (typeof aboutData.image === 'object' && aboutData.image instanceof File) {
      const file = aboutData.image;
      const fileExt = file.name.split('.').pop();
      const fileName = `about-${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('website_images')
        .upload(`about/${fileName}`, file);
      
      if (uploadError) throw uploadError;
      
      const { data } = supabase
        .storage
        .from('website_images')
        .getPublicUrl(`about/${fileName}`);
      
      imageUrl = data.publicUrl;
    }
    
    // Check if an about section already exists
    const { data: existingData } = await supabase
      .from('about_section')
      .select('id') as { data: Pick<AboutSection, 'id'>[] | null };
    
    let aboutId: string;
    
    if (existingData && existingData.length > 0) {
      // Update existing record
      const { error } = await supabase
        .from('about_section')
        .update({
          title: aboutData.title || '',
          description1: aboutData.description1,
          description2: aboutData.description2,
          image: imageUrl,
          years_experience: aboutData.yearsExperience,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingData[0].id);
      
      if (error) throw error;
      aboutId = existingData[0].id;
      toast.success('About section updated successfully');
    } else {
      // Insert new record
      const { data, error } = await supabase
        .from('about_section')
        .insert({
          title: aboutData.title || '',
          description1: aboutData.description1,
          description2: aboutData.description2,
          image: imageUrl,
          years_experience: aboutData.yearsExperience
        })
        .select();
      
      if (error) throw error;
      aboutId = data[0].id;
      toast.success('About section created successfully');
    }
    
    // Handle features
    if (aboutData.features && aboutData.features.length > 0) {
      // Delete existing features
      await supabase
        .from('about_features')
        .delete()
        .eq('about_id', aboutId);
      
      // Insert new features
      const featuresWithAboutId = aboutData.features.map((feature: any, index: number) => ({
        title: feature.title || '',
        description: feature.description,
        icon: feature.icon,
        about_id: aboutId,
        display_order: index
      }));
      
      const { error: featuresError } = await supabase
        .from('about_features')
        .insert(featuresWithAboutId);
      
      if (featuresError) throw featuresError;
    }
    
    return await fetchAboutSection();
  } catch (error) {
    console.error('Error saving about section:', error);
    toast.error('Failed to save about section');
    throw error;
  }
}

// Footer Content
export async function fetchFooterContent(): Promise<Record<string, any>> {
  try {
    const { data, error } = await supabase
      .from('footer_content')
      .select('*') as { data: FooterContent[] | null, error: any };
    
    if (error) throw error;
    
    // Convert to expected format
    const footerData: Record<string, any> = {};
    if (data && data.length > 0) {
      data.forEach(item => {
        footerData[item.section] = item.content;
      });
    }
    
    return footerData;
  } catch (error) {
    console.error('Error fetching footer content:', error);
    return {};
  }
}

export async function saveFooterContent(section: string, content: any): Promise<Record<string, any>> {
  try {
    // Check if section already exists
    const { data: existingData } = await supabase
      .from('footer_content')
      .select('id')
      .eq('section', section) as { data: Pick<FooterContent, 'id'>[] | null };
    
    if (existingData && existingData.length > 0) {
      // Update existing record
      const { error } = await supabase
        .from('footer_content')
        .update({
          content,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingData[0].id);
      
      if (error) throw error;
    } else {
      // Insert new record
      const { error } = await supabase
        .from('footer_content')
        .insert({
          section,
          content: content
        });
      
      if (error) throw error;
    }
    
    toast.success(`Footer ${section} updated successfully`);
    return await fetchFooterContent();
  } catch (error) {
    console.error(`Error saving footer ${section}:`, error);
    toast.error(`Failed to save footer ${section}`);
    throw error;
  }
}

// Helper function for file uploads
export async function uploadFile(file: File, path: string): Promise<string | null> {
  try {
    if (!file) return null;
    
    const fileExt = file.name.split('.').pop();
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
    throw error;
  }
}

// Export helper for cPanel
export async function exportWebsiteData(): Promise<boolean> {
  try {
    // Fetch all data
    const banners = await fetchHeroBanners();
    const collections = await fetchCollections();
    const featuredCollections = await fetchFeaturedCollections();
    const testimonials = await fetchTestimonials();
    const aboutSection = await fetchAboutSection();
    const footerContent = await fetchFooterContent();
    
    // Combine all data
    const websiteData = {
      banners,
      collections,
      featuredCollections,
      testimonials,
      aboutSection,
      footerContent,
      exportDate: new Date().toISOString()
    };
    
    // Convert to JSON string
    const jsonData = JSON.stringify(websiteData, null, 2);
    
    // Create and download a file
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `website-data-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Website data exported successfully');
    return true;
  } catch (error) {
    console.error('Error exporting website data:', error);
    toast.error('Failed to export website data');
    return false;
  }
}
