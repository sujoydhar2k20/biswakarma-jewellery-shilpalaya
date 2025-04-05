
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Trash, Upload, Plus } from "lucide-react";

// Define category types
const categoryTypes = [
  { id: 'gold', name: '22 Karat Gold Collections', color: 'ruby-red' },
  { id: 'pearl', name: 'Pearl Collections', color: 'cream' },
  { id: 'silver', name: 'Silver Collections', color: 'gray-200' },
  { id: 'diamond', name: 'Diamond Collections', color: 'white' }
];

const generateCategories = () => {
  const allCategories = [];
  let count = 1;
  
  // Distribute categories evenly
  for (let type of categoryTypes) {
    const itemCount = Math.floor(102 / categoryTypes.length) + (type.id === 'gold' ? 2 : 0);
    
    for (let i = 0; i < itemCount; i++) {
      allCategories.push({
        id: count,
        name: `${type.name.split(' ')[0]} ${count}`,
        image: '/placeholder.svg',
        link: `/category/${count}`,
        type: type.id
      });
      count++;
    }
  }
  
  return allCategories;
};

const CollectionsEditor = () => {
  const [categories, setCategories] = useState(generateCategories);
  const [editingCategory, setEditingCategory] = useState(null);
  const [activeType, setActiveType] = useState('gold');
  
  const handleEditCategory = (category) => {
    setEditingCategory({...category});
  };
  
  const handleSaveCategory = () => {
    if (editingCategory) {
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id ? editingCategory : cat
      ));
      setEditingCategory(null);
    }
  };
  
  const handleAddCategory = () => {
    const newId = Math.max(...categories.map(c => c.id)) + 1;
    const newCategory = {
      id: newId,
      name: `New Category`,
      image: '/placeholder.svg',
      link: `/category/${newId}`,
      type: activeType
    };
    
    setEditingCategory(newCategory);
  };
  
  const handleDeleteCategory = (id) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };
  
  const filteredCategories = categories.filter(cat => cat.type === activeType);
  
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
        
        {categoryTypes.map(type => (
          <TabsContent key={type.id} value={type.id} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCategories.map(category => (
                <Card key={category.id} className="overflow-hidden">
                  <div className="aspect-square bg-gray-200 relative overflow-hidden">
                    <img 
                      src={category.image} 
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
          </TabsContent>
        ))}
      </Tabs>
      
      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">
                {categories.some(c => c.id === editingCategory.id) ? 'Edit Category' : 'Add New Category'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cat-image">Category Image</Label>
                  <div className="mt-2 border-2 border-dashed rounded-md p-4 text-center">
                    {editingCategory.image && editingCategory.image !== '/placeholder.svg' ? (
                      <div className="relative">
                        <img 
                          src={editingCategory.image} 
                          alt="Category preview"
                          className="mx-auto h-32 object-contain"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => setEditingCategory({...editingCategory, image: '/placeholder.svg'})}
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
                          id="cat-image" 
                          className="sr-only"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const fakeUrl = URL.createObjectURL(file);
                              setEditingCategory({...editingCategory, image: fakeUrl});
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
                    value={editingCategory.name} 
                    onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="cat-link">Category Link</Label>
                  <Input 
                    id="cat-link" 
                    value={editingCategory.link} 
                    onChange={(e) => setEditingCategory({...editingCategory, link: e.target.value})}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="cat-type">Category Type</Label>
                  <select
                    id="cat-type"
                    value={editingCategory.type}
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
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      if (!categories.some(c => c.id === editingCategory.id)) {
                        setCategories([...categories, editingCategory]);
                      } else {
                        handleSaveCategory();
                      }
                      setEditingCategory(null);
                    }}
                  >
                    Save Category
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
