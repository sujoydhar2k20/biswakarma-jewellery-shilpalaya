
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AboutInfo {
  logo: string;
  title: string;
  subtitle: string;
  description: string;
}

interface AboutTabContentProps {
  aboutInfo: AboutInfo;
  setAboutInfo: (aboutInfo: AboutInfo) => void;
  editing: boolean;
  toggleEditing: () => void;
}

const AboutTabContent = ({ aboutInfo, setAboutInfo, editing, toggleEditing }: AboutTabContentProps) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">About Information</h2>
        <Button 
          onClick={toggleEditing}
          variant="outline"
        >
          {editing ? "Save Changes" : "Edit"}
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="footer-logo">Logo URL</Label>
          {editing ? (
            <div className="mt-2 space-y-4">
              <Input 
                id="footer-logo" 
                value={aboutInfo.logo} 
                onChange={(e) => setAboutInfo({...aboutInfo, logo: e.target.value})}
              />
              <div className="border-2 border-dashed rounded-md p-4 text-center">
                <img 
                  src={aboutInfo.logo} 
                  alt="Footer logo" 
                  className="h-16 mx-auto"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = '/placeholder.svg';
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="mt-2 p-4 border rounded-md">
              <img 
                src={aboutInfo.logo} 
                alt="Footer logo" 
                className="h-16"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src = '/placeholder.svg';
                }}
              />
            </div>
          )}
        </div>
        
        <div>
          <Label htmlFor="footer-title">Title</Label>
          <Input 
            id="footer-title" 
            value={aboutInfo.title} 
            onChange={(e) => setAboutInfo({...aboutInfo, title: e.target.value})}
            disabled={!editing}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="footer-subtitle">Subtitle</Label>
          <Input 
            id="footer-subtitle" 
            value={aboutInfo.subtitle} 
            onChange={(e) => setAboutInfo({...aboutInfo, subtitle: e.target.value})}
            disabled={!editing}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="footer-description">Description</Label>
          <Textarea 
            id="footer-description" 
            value={aboutInfo.description} 
            onChange={(e) => setAboutInfo({...aboutInfo, description: e.target.value})}
            disabled={!editing}
            className="mt-1"
            rows={3}
          />
        </div>
      </div>
    </Card>
  );
};

export default AboutTabContent;
