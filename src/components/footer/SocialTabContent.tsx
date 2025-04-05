
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash } from "lucide-react";

interface SocialLink {
  id: number;
  name: string;
  url: string;
  icon: string;
}

interface SocialTabContentProps {
  socialLinks: SocialLink[];
  setSocialLinks: (links: SocialLink[]) => void;
}

const SocialTabContent = ({ socialLinks, setSocialLinks }: SocialTabContentProps) => {
  const [editingSocial, setEditingSocial] = useState<SocialLink | null>(null);

  const handleSaveSocial = () => {
    if (editingSocial) {
      if (socialLinks.some(link => link.id === editingSocial.id)) {
        setSocialLinks(socialLinks.map(link => 
          link.id === editingSocial.id ? editingSocial : link
        ));
      } else {
        setSocialLinks([...socialLinks, editingSocial]);
      }
      setEditingSocial(null);
    }
  };

  const handleDeleteSocial = (id: number) => {
    setSocialLinks(socialLinks.filter(link => link.id !== id));
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Social Media Links</h2>
        <Button 
          onClick={() => setEditingSocial({
            id: Date.now(),
            name: "",
            url: "",
            icon: "Facebook"
          })}
          variant="outline"
        >
          <Plus size={16} className="mr-2" /> Add Social Link
        </Button>
      </div>
      
      <div className="space-y-4">
        {socialLinks.map(link => (
          <div key={link.id} className="flex justify-between items-center border rounded-md p-3">
            <div>
              <div className="font-medium">{link.name}</div>
              <div className="text-sm text-gray-500">{link.url}</div>
              <div className="text-xs text-gray-400 mt-1">Icon: {link.icon}</div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setEditingSocial({...link})}
              >
                Edit
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => handleDeleteSocial(link.id)}
              >
                <Trash size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {editingSocial && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">
                {socialLinks.some(link => link.id === editingSocial.id) ? 'Edit Social Link' : 'Add Social Link'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="social-name">Name</Label>
                  <Input 
                    id="social-name" 
                    value={editingSocial.name} 
                    onChange={(e) => setEditingSocial({...editingSocial, name: e.target.value})}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="social-url">URL</Label>
                  <Input 
                    id="social-url" 
                    value={editingSocial.url} 
                    onChange={(e) => setEditingSocial({...editingSocial, url: e.target.value})}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="social-icon">Icon</Label>
                  <select
                    id="social-icon"
                    value={editingSocial.icon}
                    onChange={(e) => setEditingSocial({...editingSocial, icon: e.target.value})}
                    className="w-full p-2 border rounded-md mt-1"
                  >
                    <option value="Facebook">Facebook</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Youtube">YouTube</option>
                    <option value="Twitter">Twitter</option>
                    <option value="LinkedIn">LinkedIn</option>
                  </select>
                </div>
                
                <div className="flex justify-end gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setEditingSocial(null)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveSocial}>
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

export default SocialTabContent;
