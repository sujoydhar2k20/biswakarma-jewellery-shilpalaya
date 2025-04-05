
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Edit } from "lucide-react";

const AboutEditor = () => {
  const [aboutData, setAboutData] = useState({
    title: "About Biswakarma Jewellery Shilpalaya",
    description1: "Founded in 1978, Biswakarma Jewellery has been a symbol of trust and excellence in the jewelry industry for over 45 years. Our craftsmen combine traditional techniques with modern innovation to create pieces that are both timeless and contemporary.",
    description2: "We pride ourselves on sourcing only the finest materials and gemstones from ethical suppliers around the world. Each piece in our collection undergoes rigorous quality checks to ensure it meets our exacting standards before reaching our customers.",
    features: [
      {
        id: 1,
        title: "Premium Quality",
        description: "Finest materials and craftsmanship",
        icon: "Gem"
      },
      {
        id: 2,
        title: "45+ Years",
        description: "Of trusted excellence",
        icon: "Clock"
      },
      {
        id: 3,
        title: "Award Winning",
        description: "Internationally recognized designs",
        icon: "Award"
      }
    ],
    image: "/placeholder.svg",
    yearsExperience: "45+"
  });

  const [editing, setEditing] = useState(false);
  const [editingFeatureIndex, setEditingFeatureIndex] = useState(null);

  const handleFeatureChange = (index, field, value) => {
    const updatedFeatures = [...aboutData.features];
    updatedFeatures[index] = {
      ...updatedFeatures[index],
      [field]: value
    };
    
    setAboutData({
      ...aboutData,
      features: updatedFeatures
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">About Section</h1>
        <Button 
          onClick={() => setEditing(!editing)}
        >
          {editing ? "Save Changes" : "Edit Content"}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Main Content</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="about-title">Section Title</Label>
              <Input 
                id="about-title" 
                value={aboutData.title} 
                onChange={(e) => setAboutData({...aboutData, title: e.target.value})}
                disabled={!editing}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="about-desc1">Main Description (Paragraph 1)</Label>
              <Textarea 
                id="about-desc1" 
                value={aboutData.description1} 
                onChange={(e) => setAboutData({...aboutData, description1: e.target.value})}
                disabled={!editing}
                className="mt-1"
                rows={4}
              />
            </div>
            
            <div>
              <Label htmlFor="about-desc2">Main Description (Paragraph 2)</Label>
              <Textarea 
                id="about-desc2" 
                value={aboutData.description2} 
                onChange={(e) => setAboutData({...aboutData, description2: e.target.value})}
                disabled={!editing}
                className="mt-1"
                rows={4}
              />
            </div>
          </div>
          
          <h2 className="text-lg font-semibold mt-8 mb-4">Image Settings</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="about-image">About Image</Label>
              {editing ? (
                <div className="mt-2 border-2 border-dashed rounded-md p-4 text-center">
                  {aboutData.image && aboutData.image !== '/placeholder.svg' ? (
                    <div className="relative">
                      <img 
                        src={aboutData.image} 
                        alt="About preview"
                        className="mx-auto h-32 object-contain"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => setAboutData({...aboutData, image: '/placeholder.svg'})}
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
                        id="about-image" 
                        className="sr-only"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const fakeUrl = URL.createObjectURL(file);
                            setAboutData({...aboutData, image: fakeUrl});
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-2 border rounded-md p-4 text-center">
                  <img 
                    src={aboutData.image} 
                    alt="About section"
                    className="mx-auto h-32 object-contain"
                  />
                </div>
              )}
            </div>
            
            <div>
              <Label htmlFor="about-years">Years Experience</Label>
              <Input 
                id="about-years" 
                value={aboutData.yearsExperience} 
                onChange={(e) => setAboutData({...aboutData, yearsExperience: e.target.value})}
                disabled={!editing}
                className="mt-1"
              />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Features</h2>
          
          <div className="space-y-6">
            {aboutData.features.map((feature, index) => (
              <div key={feature.id} className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">{feature.title}</h3>
                  {editing && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setEditingFeatureIndex(editingFeatureIndex === index ? null : index)}
                    >
                      <Edit size={16} />
                    </Button>
                  )}
                </div>
                
                {editingFeatureIndex === index ? (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor={`feature-title-${index}`}>Title</Label>
                      <Input 
                        id={`feature-title-${index}`}
                        value={feature.title}
                        onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`feature-desc-${index}`}>Description</Label>
                      <Input 
                        id={`feature-desc-${index}`}
                        value={feature.description}
                        onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`feature-icon-${index}`}>Icon</Label>
                      <select
                        id={`feature-icon-${index}`}
                        value={feature.icon}
                        onChange={(e) => handleFeatureChange(index, 'icon', e.target.value)}
                        className="w-full p-2 border rounded-md mt-1"
                      >
                        <option value="Gem">Gem</option>
                        <option value="Clock">Clock</option>
                        <option value="Award">Award</option>
                        <option value="Star">Star</option>
                        <option value="Medal">Medal</option>
                      </select>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        size="sm"
                        onClick={() => setEditingFeatureIndex(null)}
                      >
                        Done
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-500 text-sm">{feature.description}</p>
                    <div className="mt-2 text-sm text-gray-400">Icon: {feature.icon}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      <div className="p-6 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Preview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{aboutData.title}</h3>
            <p className="text-gray-600 mb-4">{aboutData.description1}</p>
            <p className="text-gray-600 mb-6">{aboutData.description2}</p>
            
            <div className="grid grid-cols-3 gap-4">
              {aboutData.features.map(feature => (
                <div key={feature.id} className="border border-gray-200 p-3 text-center">
                  <div className="text-center mb-2">[{feature.icon}]</div>
                  <h4 className="font-semibold mb-1">{feature.title}</h4>
                  <p className="text-xs text-gray-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="rounded-lg overflow-hidden">
              <img 
                src={aboutData.image} 
                alt="About Preview"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-yellow-600 flex items-center justify-center rounded-lg">
              <span className="text-white text-center">
                <span className="block font-bold text-xl">{aboutData.yearsExperience}</span>
                <span className="text-xs">Years of Excellence</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutEditor;
