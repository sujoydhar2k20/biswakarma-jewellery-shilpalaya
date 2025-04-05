
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash, Plus, Upload, ArrowUp, ArrowDown } from "lucide-react";

const PaymentMethodsEditor = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      name: "Credit Card",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Debit Card",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "UPI",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Bank Transfer",
      image: "/placeholder.svg"
    }
  ]);

  const [sectionTitle, setSectionTitle] = useState("Payment Methods");
  const [sectionDescription, setSectionDescription] = useState("We offer a variety of secure payment options for your convenience");
  const [sectionFooter, setSectionFooter] = useState("* All transactions are secure and encrypted.");
  
  const [editingMethod, setEditingMethod] = useState(null);

  const handleEditMethod = (method) => {
    setEditingMethod({...method});
  };

  const handleAddMethod = () => {
    setEditingMethod({
      id: Date.now(),
      name: "",
      image: "/placeholder.svg"
    });
  };

  const handleSaveMethod = () => {
    if (editingMethod) {
      const existing = paymentMethods.find(m => m.id === editingMethod.id);
      if (existing) {
        setPaymentMethods(paymentMethods.map(m => m.id === editingMethod.id ? editingMethod : m));
      } else {
        setPaymentMethods([...paymentMethods, editingMethod]);
      }
      setEditingMethod(null);
    }
  };

  const handleDeleteMethod = (id) => {
    if (confirm("Are you sure you want to delete this payment method?")) {
      setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    }
  };

  const moveMethod = (id, direction) => {
    const index = paymentMethods.findIndex(method => method.id === id);
    if ((direction === 'up' && index > 0) || (direction === 'down' && index < paymentMethods.length - 1)) {
      const newMethods = [...paymentMethods];
      const swap = direction === 'up' ? index - 1 : index + 1;
      
      [newMethods[index], newMethods[swap]] = [newMethods[swap], newMethods[index]];
      setPaymentMethods(newMethods);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Payment Methods Section</h1>
        <Button onClick={handleAddMethod} className="flex items-center gap-2">
          <Plus size={16} />
          Add Payment Method
        </Button>
      </div>
      
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Section Content</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="section-title">Section Title</Label>
            <Input 
              id="section-title" 
              value={sectionTitle} 
              onChange={(e) => setSectionTitle(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="section-description">Section Description</Label>
            <Textarea 
              id="section-description" 
              value={sectionDescription} 
              onChange={(e) => setSectionDescription(e.target.value)}
              className="mt-1"
              rows={2}
            />
          </div>
          
          <div>
            <Label htmlFor="section-footer">Footer Text</Label>
            <Textarea 
              id="section-footer" 
              value={sectionFooter} 
              onChange={(e) => setSectionFooter(e.target.value)}
              className="mt-1"
              rows={2}
            />
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {paymentMethods.map(method => (
          <Card key={method.id} className="relative">
            <div className="absolute top-2 right-2 flex gap-2 z-10">
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-8 w-8 p-0 bg-white/80"
                onClick={() => handleEditMethod(method)}
              >
                <Edit size={16} />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 bg-white/80"
                onClick={() => handleDeleteMethod(method.id)}
              >
                <Trash size={16} />
              </Button>
            </div>
            
            <CardContent className="p-4 flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                <img src={method.image} alt={method.name} className="w-10 h-10" />
              </div>
              <span className="text-sm text-gray-600">{method.name}</span>
              
              <div className="flex gap-2 mt-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-0 h-8 w-8"
                  onClick={() => moveMethod(method.id, 'up')}
                >
                  <ArrowUp size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-0 h-8 w-8"
                  onClick={() => moveMethod(method.id, 'down')}
                >
                  <ArrowDown size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Edit Payment Method Modal */}
      {editingMethod && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">
                {paymentMethods.some(m => m.id === editingMethod.id) ? 'Edit Payment Method' : 'Add Payment Method'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="method-image">Method Icon</Label>
                  <div className="mt-2 border-2 border-dashed rounded-md p-4 text-center">
                    {editingMethod.image && editingMethod.image !== '/placeholder.svg' ? (
                      <div className="relative">
                        <img 
                          src={editingMethod.image} 
                          alt="Method preview"
                          className="mx-auto h-24 object-contain"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => setEditingMethod({...editingMethod, image: '/placeholder.svg'})}
                        >
                          Remove Image
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-1 text-sm text-gray-500">
                          Drop an icon here or click to upload
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
                          id="method-image" 
                          className="sr-only"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const fakeUrl = URL.createObjectURL(file);
                              setEditingMethod({...editingMethod, image: fakeUrl});
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="method-name">Method Name</Label>
                  <Input 
                    id="method-name" 
                    value={editingMethod.name} 
                    onChange={(e) => setEditingMethod({...editingMethod, name: e.target.value})}
                    className="mt-1"
                  />
                </div>
                
                <div className="flex justify-end gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setEditingMethod(null)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveMethod}>
                    Save Method
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

export default PaymentMethodsEditor;
