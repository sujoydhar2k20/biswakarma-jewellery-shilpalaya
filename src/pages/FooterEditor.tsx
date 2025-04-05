
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Plus, Trash } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const FooterEditor = () => {
  const [aboutInfo, setAboutInfo] = useState({
    logo: "https://d1h96izmtdkx5o.cloudfront.net/-O0Db23L67I9afe9SYhw.jpg?v=2",
    title: "Biswakarma",
    subtitle: "Jewellery Shilpalaya",
    description: "Biswakarma Jewellery Shilpalaya has been crafting exquisite jewelry since 1978, blending tradition with modern design for pieces that transcend time."
  });
  
  const [socialLinks, setSocialLinks] = useState([
    { id: 1, name: "Facebook", url: "https://www.facebook.com/bjs2k/", icon: "Facebook" },
    { id: 2, name: "Instagram", url: "https://www.instagram.com/bjs2k/", icon: "Instagram" },
    { id: 3, name: "YouTube", url: "https://www.youtube.com/@bjs2k/", icon: "Youtube" }
  ]);

  const [quickLinks, setQuickLinks] = useState([
    { id: 1, text: "Home", url: "/" },
    { id: 2, text: "Collections", url: "/collections" },
    { id: 3, text: "Categories", url: "/categories" },
    { id: 4, text: "About Us", url: "/about" },
    { id: 5, text: "Contact", url: "/contact" }
  ]);

  const [categories, setCategories] = useState([
    { id: 1, text: "Rings", url: "/category/1" },
    { id: 2, text: "Necklaces", url: "/category/2" },
    { id: 3, text: "Earrings", url: "/category/3" },
    { id: 4, text: "Bracelets", url: "/category/4" },
    { id: 5, text: "View All", url: "/categories" }
  ]);

  const [contactInfo, setContactInfo] = useState({
    address: "Barasat Near Subhash Maidan\nKolkata 700126\nWest Bengal, India",
    phone: "+919874085669",
    email: "support@biswakarmagold.com"
  });

  const [bottomLinks, setBottomLinks] = useState([
    { id: 1, text: "Terms of Service", url: "/terms" },
    { id: 2, text: "Privacy Policy", url: "/privacy" }
  ]);

  const [editing, setEditing] = useState({
    aboutInfo: false,
    socialLinks: false,
    quickLinks: false,
    categories: false,
    contactInfo: false,
    bottomLinks: false
  });

  const [editingSocial, setEditingSocial] = useState(null);
  const [editingQuickLink, setEditingQuickLink] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingBottomLink, setEditingBottomLink] = useState(null);

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

  const handleDeleteSocial = (id) => {
    setSocialLinks(socialLinks.filter(link => link.id !== id));
  };

  const handleDeleteQuickLink = (id) => {
    setQuickLinks(quickLinks.filter(link => link.id !== id));
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const handleDeleteBottomLink = (id) => {
    setBottomLinks(bottomLinks.filter(link => link.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Footer Content Management</h1>
      </div>
      
      <Tabs defaultValue="about" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="quickLinks">Quick Links</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="bottom">Bottom Links</TabsTrigger>
        </TabsList>
        
        <TabsContent value="about" className="space-y-4 mt-4">
          <Card className="p-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">About Information</h2>
              <Button 
                onClick={() => setEditing({...editing, aboutInfo: !editing.aboutInfo})}
                variant="outline"
              >
                {editing.aboutInfo ? "Save Changes" : "Edit"}
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="footer-logo">Logo URL</Label>
                {editing.aboutInfo ? (
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
                          e.target.src = '/placeholder.svg';
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
                        e.target.src = '/placeholder.svg';
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
                  disabled={!editing.aboutInfo}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="footer-subtitle">Subtitle</Label>
                <Input 
                  id="footer-subtitle" 
                  value={aboutInfo.subtitle} 
                  onChange={(e) => setAboutInfo({...aboutInfo, subtitle: e.target.value})}
                  disabled={!editing.aboutInfo}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="footer-description">Description</Label>
                <Textarea 
                  id="footer-description" 
                  value={aboutInfo.description} 
                  onChange={(e) => setAboutInfo({...aboutInfo, description: e.target.value})}
                  disabled={!editing.aboutInfo}
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="social" className="space-y-4 mt-4">
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
            
            {/* Edit Social Link Modal */}
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
        </TabsContent>
        
        <TabsContent value="quickLinks" className="space-y-4 mt-4">
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
            
            {/* Edit Quick Link Modal */}
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
        </TabsContent>
        
        <TabsContent value="categories" className="space-y-4 mt-4">
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
            
            {/* Edit Category Modal */}
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
        </TabsContent>
        
        <TabsContent value="contact" className="space-y-4 mt-4">
          <Card className="p-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">Contact Information</h2>
              <Button 
                onClick={() => setEditing({...editing, contactInfo: !editing.contactInfo})}
                variant="outline"
              >
                {editing.contactInfo ? "Save Changes" : "Edit"}
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="contact-address">Address</Label>
                <Textarea 
                  id="contact-address" 
                  value={contactInfo.address} 
                  onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})}
                  disabled={!editing.contactInfo}
                  className="mt-1"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="contact-phone">Phone Number</Label>
                <Input 
                  id="contact-phone" 
                  value={contactInfo.phone} 
                  onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                  disabled={!editing.contactInfo}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="contact-email">Email</Label>
                <Input 
                  id="contact-email" 
                  value={contactInfo.email} 
                  onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                  disabled={!editing.contactInfo}
                  className="mt-1"
                />
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="bottom" className="space-y-4 mt-4">
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
            
            {/* Edit Bottom Link Modal */}
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FooterEditor;
