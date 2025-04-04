
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X, Plus, ArrowUp, ArrowDown } from "lucide-react";

const BannerEditor = () => {
  const [banners, setBanners] = useState([
    {
      id: 1,
      title: "Exclusive Diamond Collection",
      subtitle: "Timeless elegance for every occasion",
      imageUrl: "https://placeholder.pics/svg/1600x600",
      buttonText: "Explore Now",
      buttonLink: "/collections/diamond"
    },
    {
      id: 2,
      title: "Traditional Gold Jewelry",
      subtitle: "Celebrating our heritage with exquisite craftsmanship",
      imageUrl: "https://placeholder.pics/svg/1600x600/DEDEDE/555555",
      buttonText: "View Collection",
      buttonLink: "/collections/gold"
    }
  ]);

  const [editingBanner, setEditingBanner] = useState(null);

  const handleEditBanner = (banner) => {
    setEditingBanner({...banner});
  };

  const handleAddBanner = () => {
    setEditingBanner({
      id: Date.now(),
      title: "",
      subtitle: "",
      imageUrl: "",
      buttonText: "Shop Now",
      buttonLink: "/"
    });
  };

  const handleSaveBanner = () => {
    if (editingBanner) {
      const existing = banners.find(b => b.id === editingBanner.id);
      if (existing) {
        setBanners(banners.map(b => b.id === editingBanner.id ? editingBanner : b));
      } else {
        setBanners([...banners, editingBanner]);
      }
      setEditingBanner(null);
    }
  };

  const handleDeleteBanner = (id) => {
    setBanners(banners.filter(banner => banner.id !== id));
  };

  const moveBanner = (id, direction) => {
    const index = banners.findIndex(banner => banner.id === id);
    if ((direction === 'up' && index > 0) || (direction === 'down' && index < banners.length - 1)) {
      const newBanners = [...banners];
      const swap = direction === 'up' ? index - 1 : index + 1;
      
      [newBanners[index], newBanners[swap]] = [newBanners[swap], newBanners[index]];
      setBanners(newBanners);
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
      <div className="space-y-4">
        {banners.map(banner => (
          <Card key={banner.id} className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-40 h-24 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                <img 
                  src={banner.imageUrl || "/placeholder.svg"} 
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-medium">{banner.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{banner.subtitle}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    Button: {banner.buttonText}
                  </span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    Link: {banner.buttonLink}
                  </span>
                </div>
              </div>
              <div className="flex md:flex-col gap-2 justify-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-shrink-0"
                  onClick={() => handleEditBanner(banner)}
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
                    {editingBanner.imageUrl ? (
                      <div className="relative">
                        <img 
                          src={editingBanner.imageUrl} 
                          alt="Banner preview"
                          className="mx-auto max-h-40 object-contain"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => setEditingBanner({...editingBanner, imageUrl: ""})}
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
                        >
                          Choose Image
                        </Button>
                        <Input 
                          type="file" 
                          id="banner-image" 
                          className="sr-only"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              // In a real app, this would upload to a server
                              const fakeUrl = URL.createObjectURL(file);
                              setEditingBanner({...editingBanner, imageUrl: fakeUrl});
                            }
                          }}
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
                    value={editingBanner.subtitle} 
                    onChange={(e) => setEditingBanner({...editingBanner, subtitle: e.target.value})}
                    className="mt-1"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="banner-button-text">Button Text</Label>
                    <Input 
                      id="banner-button-text" 
                      value={editingBanner.buttonText} 
                      onChange={(e) => setEditingBanner({...editingBanner, buttonText: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="banner-button-link">Button Link</Label>
                    <Input 
                      id="banner-button-link" 
                      value={editingBanner.buttonLink} 
                      onChange={(e) => setEditingBanner({...editingBanner, buttonLink: e.target.value})}
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
                  >
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
