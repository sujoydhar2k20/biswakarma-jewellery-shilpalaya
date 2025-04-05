
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Use effect to show the button after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href="https://wa.me/919874085669"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-xl hover:bg-green-600 transition-all duration-300 z-50 flex items-center justify-center hover:scale-110 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
};

export default WhatsAppButton;
