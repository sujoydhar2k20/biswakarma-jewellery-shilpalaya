
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash } from "lucide-react";

interface BottomLink {
  id: number;
  text: string;
  url: string;
}

interface BottomLinksTabContentProps {
  bottomLinks: BottomLink[];
  setBottomLinks: (links: BottomLink[]) => void;
}

const BottomLinksTabContent = ({ bottomLinks, setBottomLinks }: BottomLinksTabContentProps) => {
  const [editingBottomLink, setEditingBottomLink] = useState<BottomLink | null>(null);

  const handleSaveBottomLink = () => {
    if (editingBottomLink) {
      if (bottomLinks.some(link => link.id === editingBottomLink.id)) {
        setBottomLinks(bottomLinks.map(link => 
          link.id === editingBottomLink.id ? editingBottomLink : link
        ));
      } else {
        setBottomLinks([...bottomLinks, editingBottomLink]);
      }
      setEditingBottomLink(null);
    }
  };

  const handleDeleteBottomLink = (id: number) => {
    setBottomLinks(bottomLinks.filter(link => link.id !== id));
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Bottom Links</h2>
        <Button 
          onClick={() => setEditingBottomLink({
            id: Date.now(),
            text: "",
            url: "/"
          })}
          variant="outline"
        >
          <Plus size={16} className="mr-2" /> Add Bottom Link
        </Button>
      </div>
      
      <div className="space-y-4">
        {bottomLinks.map(link => (
          <div key={link.id} className="flex justify-between items-center border rounded-md p-3">
            <div>
              <div className="font-medium">{link.text}</div>
              <div className="text-sm text-gray-500">{link.url}</div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setEditingBottomLink({...link})}
              >
                Edit
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => handleDeleteBottomLink(link.id)}
              >
                <Trash size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {editingBottomLink && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">
                {bottomLinks.some(link => link.id === editingBottomLink.id) ? 'Edit Bottom Link' : 'Add Bottom Link'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bottom-text">Link Text</Label>
                  <Input 
                    id="bottom-text" 
                    value={editingBottomLink.text} 
                    onChange={(e) => setEditingBottomLink({...editingBottomLink, text: e.target.value})}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="bottom-url">URL</Label>
                  <Input 
                    id="bottom-url" 
                    value={editingBottomLink.url} 
                    onChange={(e) => setEditingBottomLink({...editingBottomLink, url: e.target.value})}
                    className="mt-1"
                  />
                </div>
                
                <div className="flex justify-end gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setEditingBottomLink(null)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveBottomLink}>
                    Save Link
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

export default BottomLinksTabContent;
