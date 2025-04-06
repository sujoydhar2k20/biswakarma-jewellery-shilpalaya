
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Trash, Upload, Plus, Loader2 } from "lucide-react";
import { fetchCollections, saveCollection, deleteCollection } from "@/services/collectionService";
import { Collection } from "@/types/supabase";
import { toast } from "sonner";

// Define category types
const categoryTypes = [
  { id: 'gold', name: '22 Karat Gold Collections', color: 'ruby-red' },
  { id: 'pearl', name: 'Pearl Collections', color: 'cream' },
  { id: 'silver', name: 'Silver Collections', color: 'gray-200' },
  { id: 'diamond', name: 'Diamond Collections', color: 'white' }
];

const CollectionsEditor = () => {
  const [categories, setCategories] = useState<Collection[]>([]);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [activeType, setActiveType] = useState('gold');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Fetch collections from database on load
  useEffect(() => {
    const loadCollections = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCollections();
        setCategories(data);
      } catch (error) {
        console.error("Error loading collections:", error);
        toast.error("Failed to load collections");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCollections();
  }, []);
  
  const handleEditCategory = (category: Collection) => {
    setEditingCategory({...category});
  };
  
  const handleAddCategory = () => {
    // Generate a temporary ID for new category
    const tempId = `temp_${Date.now()}`;
    const newCategory = {
      id: tempId,
      name: `New Category`,
      image: null,
      link: `/category/${tempId}`,
      type: activeType,
      display_order: categories.length + 1
    };
    
    setEditingCategory(newCategory);
  };
  
  const handleDeleteCategory = async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        const updatedCategories = await deleteCollection(id);
        setCategories(updatedCategories);
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };
  
  const handleSaveCategory = async () => {
    if (editingCategory) {
      setIsSaving(true);
      try {
        const updatedCategories = await saveCollection(editingCategory);
        setCategories(updatedCategories);
        setEditingCategory(null);
        toast.success("Category saved successfully");
      } catch (error) {
        console.error("Error saving category:", error);
        toast.error("Failed to save category");
      } finally {
        setIsSaving(false);
      }
    }
  };
  
  const filteredCategories = categories.filter(cat => cat.type === activeType);
  
  // Default placeholder image when no image is available
  const defaultImage = "/placeholder.svg";
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Collections Management</h1>
        <Button onClick={handleAddCategory} className="flex items-center gap-2">
          <Plus size={16} />
          Add New Category
        </Button>
      </div>
      
      <Tabs defaultValue="gold" onValueChange={setActiveType} value={activeType}>
        <TabsList className="grid grid-cols-4 w-full">
          {categoryTypes.map(type => (
            <TabsTrigger key={type.id} value={type.id}>
              {type.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-ruby-red" />
            <span className="ml-2">Loading collections...</span>
          </div>
        ) : (
          categoryTypes.map(type => (
            <TabsContent key={type.id} value={type.id} className="mt-6">
              {filteredCategories.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  <p>No collections found in this category.</p>
                  <Button 
                    onClick={() => {
                      setActiveType(type.id);
                      handleAddCategory();
                    }}
                    variant="outline" 
                    className="mt-4"
                  >
                    <Plus size={16} className="mr-2" />
                    Add your first collection
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredCategories.map(category => (
                    <Card key={category.id} className="overflow-hidden">
                      <div className="aspect-square bg-gray-200 relative overflow-hidden">
                        <img 
                          src={category.image || defaultImage} 
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 flex gap-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="bg-white rounded-full"
                            onClick={() => handleEditCategory(category)}
                          >
                            <Edit size={16} />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="bg-white text-red-500 rounded-full"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            <Trash size={16} />
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium">{category.name}</h3>
                        <p className="text-sm text-gray-500 truncate">{category.link}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          ))
        )}
      </Tabs>
      
      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">
                {categories.some(c => c.id === editingCategory.id && !String(c.id).startsWith('temp_')) ? 'Edit Category' : 'Add New Category'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cat-image">Category Image</Label>
                  <div className="mt-2 border-2 border-dashed rounded-md p-4 text-center">
                    {editingCategory.image && editingCategory.image !== defaultImage ? (
                      <div className="relative">
                        <img 
                          src={typeof editingCategory.image === 'string' ? editingCategory.image : URL.createObjectURL(editingCategory.image)} 
                          alt="Category preview"
                          className="mx-auto h-32 object-contain"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => setEditingCategory({...editingCategory, image: null})}
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
                        <label htmlFor="cat-image">
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            type="button"
                          >
                            Choose Image
                          </Button>
                        </label>
                        <Input 
                          type="file" 
                          id="cat-image" 
                          className="sr-only"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setEditingCategory({...editingCategory, image: file});
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="cat-name">Category Name</Label>
                  <Input 
                    id="cat-name" 
                    value={editingCategory.name || ''} 
                    onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="cat-link">Category Link</Label>
                  <Input 
                    id="cat-link" 
                    value={editingCategory.link || ''} 
                    onChange={(e) => setEditingCategory({...editingCategory, link: e.target.value})}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="cat-type">Category Type</Label>
                  <select
                    id="cat-type"
                    value={editingCategory.type || ''}
                    onChange={(e) => setEditingCategory({...editingCategory, type: e.target.value})}
                    className="w-full p-2 border rounded-md mt-1"
                  >
                    {categoryTypes.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex justify-end gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setEditingCategory(null)}
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveCategory}
                    disabled={isSaving}
                    className="relative"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 size={16} className="mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Category'
                    )}
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

export default CollectionsEditor;
