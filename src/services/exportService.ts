
import { toast } from "sonner";
import { fetchHeroBanners } from "./bannerService";
import { fetchCollections } from "./collectionService";
import { fetchFeaturedCollections } from "./featuredCollectionService";
import { fetchTestimonials } from "./testimonialService";
import { fetchAboutSection } from "./aboutService";
import { fetchFooterContent } from "./footerService";
import { fetchReviews } from "./reviewService";

// Export helper for cPanel
export async function exportWebsiteData(): Promise<boolean> {
  try {
    // Fetch all data
    const banners = await fetchHeroBanners();
    const collections = await fetchCollections();
    const featuredCollections = await fetchFeaturedCollections();
    const testimonials = await fetchTestimonials();
    const reviews = await fetchReviews();
    const aboutSection = await fetchAboutSection();
    const footerContent = await fetchFooterContent();
    
    // Combine all data
    const websiteData = {
      banners,
      collections,
      featuredCollections,
      testimonials,
      reviews,
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
