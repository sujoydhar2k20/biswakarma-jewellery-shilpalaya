
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}

interface ContactTabContentProps {
  contactInfo: ContactInfo;
  setContactInfo: (info: ContactInfo) => void;
  editing: boolean;
  toggleEditing: () => void;
}

const ContactTabContent = ({ contactInfo, setContactInfo, editing, toggleEditing }: ContactTabContentProps) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">Contact Information</h2>
        <Button 
          onClick={toggleEditing}
          variant="outline"
        >
          {editing ? "Save Changes" : "Edit"}
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="contact-address">Address</Label>
          <Textarea 
            id="contact-address" 
            value={contactInfo.address} 
            onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})}
            disabled={!editing}
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
            disabled={!editing}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="contact-email">Email</Label>
          <Input 
            id="contact-email" 
            value={contactInfo.email} 
            onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
            disabled={!editing}
            className="mt-1"
          />
        </div>
      </div>
    </Card>
  );
};

export default ContactTabContent;
