
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash } from "lucide-react";

interface Category {
  id: number;
  text: string;
  url: string;
}

interface CategoriesTabContentProps {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
}

const CategoriesTabContent = ({ categories, setCategories }: CategoriesTabContentProps) => {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleSaveCategory = () => {
    if (editingCategory) {
      if (categories.some(cat => cat.id === editingCategory.id)) {
        setCategories(categories.map(cat => 
          cat.id === editingCategory.id ? editingCategory : cat
        ));
      } else {
        setCategories([...categories, editingCategory]);
      }
      setEditingCategory(null);
    }
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Categories</h2>
        <Button 
          onClick={() => setEditingCategory({
            id: Date.now(),
            text: "",
            url: "/category/"
          })}
          variant="outline"
        >
          <Plus size={16} className="mr-2" /> Add Category
        </Button>
      </div>
      
      <div className="space-y-4">
        {categories.map(category => (
          <div key={category.id} className="flex justify-between items-center border rounded-md p-3">
            <div>
              <div className="font-medium">{category.text}</div>
              <div className="text-sm text-gray-500">{category.url}</div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setEditingCategory({...category})}
              >
                Edit
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => handleDeleteCategory(category.id)}
              >
                <Trash size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {editingCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">
                {categories.some(cat => cat.id === editingCategory.id) ? 'Edit Category' : 'Add Category'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="category-text">Category Name</Label>
                  <Input 
                    id="category-text" 
                    value={editingCategory.text} 
                    onChange={(e) => setEditingCategory({...editingCategory, text: e.target.value})}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="category-url">URL</Label>
                  <Input 
                    id="category-url" 
                    value={editingCategory.url} 
                    onChange={(e) => setEditingCategory({...editingCategory, url: e.target.value})}
                    className="mt-1"
                  />
                </div>
                
                <div className="flex justify-end gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setEditingCategory(null)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveCategory}>
                    Save Category
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </Card>
  );
};

export default CategoriesTabContent;
