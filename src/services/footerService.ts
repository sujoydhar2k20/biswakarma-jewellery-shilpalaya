
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FooterContent } from "@/types/supabase";

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
