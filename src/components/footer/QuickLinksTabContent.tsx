
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash } from "lucide-react";

interface QuickLink {
  id: number;
  text: string;
  url: string;
}

interface QuickLinksTabContentProps {
  quickLinks: QuickLink[];
  setQuickLinks: (links: QuickLink[]) => void;
}

const QuickLinksTabContent = ({ quickLinks, setQuickLinks }: QuickLinksTabContentProps) => {
  const [editingQuickLink, setEditingQuickLink] = useState<QuickLink | null>(null);

  const handleSaveQuickLink = () => {
    if (editingQuickLink) {
      if (quickLinks.some(link => link.id === editingQuickLink.id)) {
        setQuickLinks(quickLinks.map(link => 
          link.id === editingQuickLink.id ? editingQuickLink : link
        ));
      } else {
        setQuickLinks([...quickLinks, editingQuickLink]);
      }
      setEditingQuickLink(null);
    }
  };

  const handleDeleteQuickLink = (id: number) => {
    setQuickLinks(quickLinks.filter(link => link.id !== id));
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Quick Links</h2>
        <Button 
          onClick={() => setEditingQuickLink({
            id: Date.now(),
            text: "",
            url: "/"
          })}
          variant="outline"
        >
          <Plus size={16} className="mr-2" /> Add Quick Link
        </Button>
      </div>
      
      <div className="space-y-4">
        {quickLinks.map(link => (
          <div key={link.id} className="flex justify-between items-center border rounded-md p-3">
            <div>
              <div className="font-medium">{link.text}</div>
              <div className="text-sm text-gray-500">{link.url}</div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setEditingQuickLink({...link})}
              >
                Edit
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => handleDeleteQuickLink(link.id)}
              >
                <Trash size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {editingQuickLink && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">
                {quickLinks.some(link => link.id === editingQuickLink.id) ? 'Edit Quick Link' : 'Add Quick Link'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="quick-text">Link Text</Label>
                  <Input 
                    id="quick-text" 
                    value={editingQuickLink.text} 
                    onChange={(e) => setEditingQuickLink({...editingQuickLink, text: e.target.value})}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="quick-url">URL</Label>
                  <Input 
                    id="quick-url" 
                    value={editingQuickLink.url} 
                    onChange={(e) => setEditingQuickLink({...editingQuickLink, url: e.target.value})}
                    className="mt-1"
                  />
                </div>
                
                <div className="flex justify-end gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setEditingQuickLink(null)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveQuickLink}>
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

export default QuickLinksTabContent;
