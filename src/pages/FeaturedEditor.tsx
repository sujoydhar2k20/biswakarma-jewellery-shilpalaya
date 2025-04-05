
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X, Plus, ArrowUp, ArrowDown } from "lucide-react";

const FeaturedEditor = () => {
  const [collections, setCollections] = useState([
    {
      id: 1,
      name: "Ruby Elegance",
      description: "Stunning ruby pieces for a vibrant look",
      image: "/placeholder.svg",
      category: "Featured"
    },
    {
      id: 2,
      name: "22K Gold Heritage",
      description: "Traditional designs with modern craftsmanship",
      image: "/placeholder.svg",
      category: "22K Gold"
    },
    {
      id: 3,
      name: "Pearl Wonders",
      description: "Timeless pearl jewelry for every occasion",
      image: "/placeholder.svg",
      category: "Pearl"
    },
    {
      id: 4,
      name: "Diamond Dreams",
      description: "Luxury diamond pieces that sparkle and shine",
      image: "/placeholder.svg",
      category: "Diamond"
    }
  ]);

  const [editingCollection, setEditingCollection] = useState(null);

  const handleEditCollection = (collection) => {
    setEditingCollection({...collection});
  };

  const handleAddCollection = () => {
    setEditingCollection({
      id: Date.now(),
      name: "",
      description: "",
      image: "/placeholder.svg",
      category: "Featured"
    });
  };

  const handleSaveCollection = () => {
    if (editingCollection) {
      const existing = collections.find(c => c.id === editingCollection.id);
      if (existing) {
        setCollections(collections.map(c => c.id === editingCollection.id ? editingCollection : c));
      } else {
        setCollections([...collections, editingCollection]);
      }
      setEditingCollection(null);
    }
  };

  const handleDeleteCollection = (id) => {
    if (confirm("Are you sure you want to delete this collection?")) {
      setCollections(collections.filter(collection => collection.id !== id));
    }
  };

  const moveCollection = (id, direction) => {
    const index = collections.findIndex(collection => collection.id === id);
    if ((direction === 'up' && index > 0) || (direction === 'down' && index < collections.length - 1)) {
      const newCollections = [...collections];
      const swap = direction === 'up' ? index - 1 : index + 1;
      
      [newCollections[index], newCollections[swap]] = [newCollections[swap], newCollections[index]];
      setCollections(newCollections);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Featured Collections Management</h1>
        <Button onClick={handleAddCollection} className="flex items-center gap-2">
          <Plus size={16} />
          Add New Collection
        </Button>
      </div>
      
      {/* Collection List */}
      <div className="space-y-4">
        {collections.map(collection => (
          <Card key={collection.id} className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-40 h-24 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                <img 
                  src={collection.image} 
                  alt={collection.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-medium">{collection.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{collection.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    Category: {collection.category}
                  </span>
                </div>
              </div>
              <div className="flex md:flex-col gap-2 justify-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-shrink-0"
                  onClick={() => handleEditCollection(collection)}
                >
                  Edit
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                  onClick={() => handleDeleteCollection(collection.id)}
                >
                  Delete
                </Button>
                <div className="flex md:flex-col gap-1 mt-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-0 h-8 w-8"
                    onClick={() => moveCollection(collection.id, 'up')}
                  >
                    <ArrowUp size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-0 h-8 w-8"
                    onClick={() => moveCollection(collection.id, 'down')}
                  >
                    <ArrowDown size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Edit Collection Modal */}
      {editingCollection && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                  {collections.some(c => c.id === editingCollection.id) ? 'Edit Collection' : 'Add New Collection'}
                </h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="rounded-full p-0 h-8 w-8"
                  onClick={() => setEditingCollection(null)}
                >
                  <X size={18} />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="collection-image">Collection Image</Label>
                  <div className="mt-2 border-2 border-dashed rounded-md p-4 text-center">
                    {editingCollection.image && editingCollection.image !== '/placeholder.svg' ? (
                      <div className="relative">
                        <img 
                          src={editingCollection.image} 
                          alt="Collection preview"
                          className="mx-auto h-32 object-contain"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => setEditingCollection({...editingCollection, image: '/placeholder.svg'})}
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
                          id="collection-image" 
                          className="sr-only"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const fakeUrl = URL.createObjectURL(file);
                              setEditingCollection({...editingCollection, image: fakeUrl});
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="collection-name">Collection Name</Label>
                  <Input 
                    id="collection-name" 
                    value={editingCollection.name} 
                    onChange={(e) => setEditingCollection({...editingCollection, name: e.target.value})}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="collection-description">Description</Label>
                  <Textarea 
                    id="collection-description" 
                    value={editingCollection.description} 
                    onChange={(e) => setEditingCollection({...editingCollection, description: e.target.value})}
                    className="mt-1 resize-none"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="collection-category">Category</Label>
                  <Input 
                    id="collection-category" 
                    value={editingCollection.category} 
                    onChange={(e) => setEditingCollection({...editingCollection, category: e.target.value})}
                    className="mt-1"
                  />
                </div>
                
                <div className="flex justify-end gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setEditingCollection(null)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveCollection}>
                    Save Collection
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

export default FeaturedEditor;
