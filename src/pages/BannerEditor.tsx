import { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X, Plus, ArrowUp, ArrowDown, Loader2 } from "lucide-react";
import { fetchHeroBanners, saveHeroBanner, deleteHeroBanner } from "@/services/supabaseService";
import { HeroBanner } from '@/types/supabase';

interface EditorBanner {
  id: string;
  title: string;
  subtitle?: string | null;
  image_url?: string | null;
  imagePreview?: string | null;
  button_text?: string | null;
  button_link?: string | null;
  display_order: number;
}

const BannerEditor = () => {
  const [banners, setBanners] = useState<EditorBanner[]>([]);
  const [editingBanner, setEditingBanner] = useState<EditorBanner | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    setIsLoading(true);
    try {
      const data = await fetchHeroBanners();
      
      // Transform data to match component's expected format
      const transformedData = data.map(item => ({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        image_url: item.image_url,
        button_text: item.button_text,
        button_link: item.button_link,
        display_order: item.display_order
      }));
      
      setBanners(transformedData);
    } catch (error) {
      console.error("Error loading banners:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditBanner = (banner: EditorBanner) => {
    setEditingBanner({...banner});
  };

  const handleAddBanner = () => {
    setEditingBanner({
      id: `temp_${Date.now()}`,
      title: "",
      subtitle: "",
      image_url: "",
      button_text: "Shop Now",
      button_link: "/",
      display_order: banners.length
    });
  };

  const handleSaveBanner = async () => {
    if (!editingBanner) return;
    
    setIsSaving(true);
    try {
      const updatedBanners = await saveHeroBanner(editingBanner);
      
      // Transform data to match component's expected format
      const transformedData = updatedBanners.map(item => ({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        image_url: item.image_url,
        button_text: item.button_text,
        button_link: item.button_link,
        display_order: item.display_order
      }));
      
      setBanners(transformedData);
      setEditingBanner(null);
    } catch (error) {
      console.error("Error saving banner:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteBanner = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      try {
        const updatedBanners = await deleteHeroBanner(id);
        
        // Transform data to match component's expected format
        const transformedData = updatedBanners.map(item => ({
          id: item.id,
          title: item.title,
          subtitle: item.subtitle,
          image_url: item.image_url,
          button_text: item.button_text,
          button_link: item.button_link,
          display_order: item.display_order
        }));
        
        setBanners(transformedData);
      } catch (error) {
        console.error("Error deleting banner:", error);
      }
    }
  };

  const moveBanner = async (id: string, direction: 'up' | 'down') => {
    const index = banners.findIndex(banner => banner.id === id);
    if ((direction === 'up' && index > 0) || (direction === 'down' && index < banners.length - 1)) {
      const newBanners = [...banners];
      const swap = direction === 'up' ? index - 1 : index + 1;
      
      // Swap display order
      const tempOrder = newBanners[index].display_order;
      newBanners[index].display_order = newBanners[swap].display_order;
      newBanners[swap].display_order = tempOrder;
      
      // Swap positions in array
      [newBanners[index], newBanners[swap]] = [newBanners[swap], newBanners[index]];
      
      setBanners(newBanners);
      
      // Update both banners in the database
      try {
        await saveHeroBanner(newBanners[swap]);
        await saveHeroBanner(newBanners[index]);
      } catch (error) {
        console.error("Error updating banner order:", error);
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingBanner) {
      // Store the actual file object for later upload
      setEditingBanner({...editingBanner, image_url: file as unknown as string});
      
      // Also create a preview URL for display
      const previewUrl = URL.createObjectURL(file);
      setEditingBanner({...editingBanner, image_url: file as unknown as string, imagePreview: previewUrl});
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Hero Banner Management</h1>
        <Button onClick={handleAddBanner} className="flex items-center gap-2">
          <Plus size={16} />
          Add New Banner
        </Button>
      </div>
      
      {/* Banner List */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
        </div>
      ) : (
        <div className="space-y-4">
          {banners.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-md">
              <p className="text-gray-500">No banners found. Add your first banner to get started!</p>
            </div>
          )}
          
          {banners.map(banner => (
            <Card key={banner.id} className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-40 h-24 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                  <img 
                    src={banner.image_url || "/placeholder.svg"} 
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium">{banner.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{banner.subtitle}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      Button: {banner.button_text}
                    </span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      Link: {banner.button_link}
                    </span>
                  </div>
                </div>
                <div className="flex md:flex-col gap-2 justify-end">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-shrink-0"
                    onClick={() => setEditingBanner({...banner})}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                    onClick={() => handleDeleteBanner(banner.id)}
                  >
                    Delete
                  </Button>
                  <div className="flex md:flex-col gap-1 mt-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-0 h-8 w-8"
                      onClick={() => moveBanner(banner.id, 'up')}
                    >
                      <ArrowUp size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-0 h-8 w-8"
                      onClick={() => moveBanner(banner.id, 'down')}
                    >
                      <ArrowDown size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      
      {/* Edit Banner Modal */}
      {editingBanner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                  {banners.some(b => b.id === editingBanner.id) ? 'Edit Banner' : 'Add New Banner'}
                </h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="rounded-full p-0 h-8 w-8"
                  onClick={() => setEditingBanner(null)}
                >
                  <X size={18} />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="banner-image">Banner Image</Label>
                  <div className="mt-2 border-2 border-dashed rounded-md p-4 text-center">
                    {(editingBanner.image_url || editingBanner.imagePreview) ? (
                      <div className="relative">
                        <img 
                          src={editingBanner.imagePreview || editingBanner.image_url || ""} 
                          alt="Banner preview"
                          className="mx-auto max-h-40 object-contain"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => setEditingBanner({...editingBanner, image_url: "", imagePreview: null})}
                        >
                          Remove Image
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-1 text-sm text-gray-500">
                          Drop an image here or click to upload
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Choose Image
                        </Button>
                        <Input 
                          ref={fileInputRef}
                          type="file" 
                          id="banner-image" 
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="banner-title">Title</Label>
                  <Input 
                    id="banner-title" 
                    value={editingBanner.title} 
                    onChange={(e) => setEditingBanner({...editingBanner, title: e.target.value})}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="banner-subtitle">Subtitle</Label>
                  <Textarea 
                    id="banner-subtitle" 
                    value={editingBanner.subtitle || ""} 
                    onChange={(e) => setEditingBanner({...editingBanner, subtitle: e.target.value})}
                    className="mt-1"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="banner-button-text">Button Text</Label>
                    <Input 
                      id="banner-button-text" 
                      value={editingBanner.button_text || ""} 
                      onChange={(e) => setEditingBanner({...editingBanner, button_text: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="banner-button-link">Button Link</Label>
                    <Input 
                      id="banner-button-link" 
                      value={editingBanner.button_link || ""} 
                      onChange={(e) => setEditingBanner({...editingBanner, button_link: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setEditingBanner(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveBanner}
                    disabled={isSaving}
                  >
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Banner
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BannerEditor;
