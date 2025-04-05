
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AboutTabContent from '@/components/footer/AboutTabContent';
import SocialTabContent from '@/components/footer/SocialTabContent';
import QuickLinksTabContent from '@/components/footer/QuickLinksTabContent';
import CategoriesTabContent from '@/components/footer/CategoriesTabContent';
import ContactTabContent from '@/components/footer/ContactTabContent';
import BottomLinksTabContent from '@/components/footer/BottomLinksTabContent';

const FooterEditor = () => {
  // About section state
  const [aboutInfo, setAboutInfo] = useState({
    logo: "https://d1h96izmtdkx5o.cloudfront.net/-O0Db23L67I9afe9SYhw.jpg?v=2",
    title: "Biswakarma",
    subtitle: "Jewellery Shilpalaya",
    description: "Biswakarma Jewellery Shilpalaya has been crafting exquisite jewelry since 1978, blending tradition with modern design for pieces that transcend time."
  });
  
  // Social links state
  const [socialLinks, setSocialLinks] = useState([
    { id: 1, name: "Facebook", url: "https://www.facebook.com/bjs2k/", icon: "Facebook" },
    { id: 2, name: "Instagram", url: "https://www.instagram.com/bjs2k/", icon: "Instagram" },
    { id: 3, name: "YouTube", url: "https://www.youtube.com/@bjs2k/", icon: "Youtube" }
  ]);

  // Quick links state
  const [quickLinks, setQuickLinks] = useState([
    { id: 1, text: "Home", url: "/" },
    { id: 2, text: "Collections", url: "/collections" },
    { id: 3, text: "Categories", url: "/categories" },
    { id: 4, text: "About Us", url: "/about" },
    { id: 5, text: "Contact", url: "/contact" }
  ]);

  // Categories state
  const [categories, setCategories] = useState([
    { id: 1, text: "Rings", url: "/category/1" },
    { id: 2, text: "Necklaces", url: "/category/2" },
    { id: 3, text: "Earrings", url: "/category/3" },
    { id: 4, text: "Bracelets", url: "/category/4" },
    { id: 5, text: "View All", url: "/categories" }
  ]);

  // Contact info state
  const [contactInfo, setContactInfo] = useState({
    address: "Barasat Near Subhash Maidan\nKolkata 700126\nWest Bengal, India",
    phone: "+919874085669",
    email: "support@biswakarmagold.com"
  });

  // Bottom links state
  const [bottomLinks, setBottomLinks] = useState([
    { id: 1, text: "Terms of Service", url: "/terms" },
    { id: 2, text: "Privacy Policy", url: "/privacy" }
  ]);

  // Editing states
  const [editing, setEditing] = useState({
    aboutInfo: false,
    contactInfo: false
  });

  // Toggle editing functions
  const toggleAboutEditing = () => setEditing({...editing, aboutInfo: !editing.aboutInfo});
  const toggleContactEditing = () => setEditing({...editing, contactInfo: !editing.contactInfo});

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
          <AboutTabContent 
            aboutInfo={aboutInfo} 
            setAboutInfo={setAboutInfo} 
            editing={editing.aboutInfo} 
            toggleEditing={toggleAboutEditing} 
          />
        </TabsContent>
        
        <TabsContent value="social" className="space-y-4 mt-4">
          <SocialTabContent 
            socialLinks={socialLinks} 
            setSocialLinks={setSocialLinks} 
          />
        </TabsContent>
        
        <TabsContent value="quickLinks" className="space-y-4 mt-4">
          <QuickLinksTabContent 
            quickLinks={quickLinks} 
            setQuickLinks={setQuickLinks} 
          />
        </TabsContent>
        
        <TabsContent value="categories" className="space-y-4 mt-4">
          <CategoriesTabContent 
            categories={categories} 
            setCategories={setCategories} 
          />
        </TabsContent>
        
        <TabsContent value="contact" className="space-y-4 mt-4">
          <ContactTabContent 
            contactInfo={contactInfo} 
            setContactInfo={setContactInfo} 
            editing={editing.contactInfo} 
            toggleEditing={toggleContactEditing} 
          />
        </TabsContent>
        
        <TabsContent value="bottom" className="space-y-4 mt-4">
          <BottomLinksTabContent 
            bottomLinks={bottomLinks} 
            setBottomLinks={setBottomLinks} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FooterEditor;
