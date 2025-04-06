
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AboutSection, AboutFeature } from "@/types/supabase";
import { uploadFile } from "./uploadService";

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
      const uploadedUrl = await uploadFile(aboutData.image, 'about');
      if (uploadedUrl) imageUrl = uploadedUrl;
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
