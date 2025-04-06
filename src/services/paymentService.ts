
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PaymentMethod, PaymentSection } from "@/types/supabase";
import { uploadFile } from "./uploadService";

// Payment Methods
export async function fetchPaymentMethods(): Promise<PaymentMethod[]> {
  try {
    const { data, error } = await supabase
      .from('payment_methods')
      .select('*')
      .order('display_order', { ascending: true }) as { data: PaymentMethod[] | null, error: any };
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    return [];
  }
}

export async function savePaymentMethod(method: any): Promise<PaymentMethod[]> {
  try {
    let imageUrl = method.image;
    
    // If the image is a Blob/File, upload it to storage
    if (typeof method.image === 'object' && method.image instanceof File) {
      const uploadedUrl = await uploadFile(method.image, 'payments');
      if (uploadedUrl) imageUrl = uploadedUrl;
    }
    
    // Determine if we're updating or inserting
    const existingId = method.id && !method.id.startsWith('temp_') ? method.id : null;
    
    if (existingId) {
      const { error } = await supabase
        .from('payment_methods')
        .update({
          name: method.name,
          image: imageUrl,
          display_order: method.display_order || 0,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingId);
      
      if (error) throw error;
      toast.success('Payment method updated successfully');
    } else {
      const { error } = await supabase
        .from('payment_methods')
        .insert({
          name: method.name || '',
          image: imageUrl,
          display_order: method.display_order || 0
        });
      
      if (error) throw error;
      toast.success('Payment method added successfully');
    }
    
    return await fetchPaymentMethods();
  } catch (error) {
    console.error('Error saving payment method:', error);
    toast.error('Failed to save payment method');
    throw error;
  }
}

export async function deletePaymentMethod(methodId: string): Promise<PaymentMethod[]> {
  try {
    const { error } = await supabase
      .from('payment_methods')
      .delete()
      .eq('id', methodId);
    
    if (error) throw error;
    toast.success('Payment method deleted successfully');
    
    return await fetchPaymentMethods();
  } catch (error) {
    console.error('Error deleting payment method:', error);
    toast.error('Failed to delete payment method');
    throw error;
  }
}

export async function fetchPaymentSection(): Promise<PaymentSection | null> {
  try {
    const { data, error } = await supabase
      .from('payment_section')
      .select('*') as { data: PaymentSection[] | null, error: any };
    
    if (error) throw error;
    return data?.[0] || null;
  } catch (error) {
    console.error('Error fetching payment section:', error);
    return null;
  }
}

export async function savePaymentSection(section: any): Promise<PaymentSection | null> {
  try {
    // Check if a section already exists
    const { data: existingData } = await supabase
      .from('payment_section')
      .select('id') as { data: Pick<PaymentSection, 'id'>[] | null };
    
    if (existingData && existingData.length > 0) {
      // Update existing record
      const { error } = await supabase
        .from('payment_section')
        .update({
          title: section.title || '',
          description: section.description,
          footer: section.footer,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingData[0].id);
      
      if (error) throw error;
      toast.success('Payment section updated successfully');
    } else {
      // Insert new record
      const { error } = await supabase
        .from('payment_section')
        .insert({
          title: section.title || '',
          description: section.description,
          footer: section.footer
        });
      
      if (error) throw error;
      toast.success('Payment section created successfully');
    }
    
    return await fetchPaymentSection();
  } catch (error) {
    console.error('Error saving payment section:', error);
    toast.error('Failed to save payment section');
    throw error;
  }
}
