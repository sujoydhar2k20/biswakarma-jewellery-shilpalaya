
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16">
      {/* Main Footer */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-6 border-b border-gold pb-3">About Us</h3>
            <p className="text-gray-300 mb-4">
              Biswakarma Jewellery Shilpalaya has been crafting exquisite jewelry since 1978, blending tradition with modern design for pieces that transcend time.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://facebook.com" className="bg-gold/20 hover:bg-gold transition-colors p-2 rounded-full">
                <Facebook size={18} />
              </a>
              <a href="https://instagram.com" className="bg-gold/20 hover:bg-gold transition-colors p-2 rounded-full">
                <Instagram size={18} />
              </a>
              <a href="https://youtube.com" className="bg-gold/20 hover:bg-gold transition-colors p-2 rounded-full">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-6 border-b border-gold pb-3">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-gray-300 hover:text-gold transition-colors">Home</a></li>
              <li><a href="/collections" className="text-gray-300 hover:text-gold transition-colors">Collections</a></li>
              <li><a href="/categories" className="text-gray-300 hover:text-gold transition-colors">Categories</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-gold transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-gold transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-6 border-b border-gold pb-3">Categories</h3>
            <ul className="space-y-3">
              <li><a href="/category/1" className="text-gray-300 hover:text-gold transition-colors">Rings</a></li>
              <li><a href="/category/2" className="text-gray-300 hover:text-gold transition-colors">Necklaces</a></li>
              <li><a href="/category/3" className="text-gray-300 hover:text-gold transition-colors">Earrings</a></li>
              <li><a href="/category/4" className="text-gray-300 hover:text-gold transition-colors">Bracelets</a></li>
              <li><a href="/categories" className="text-gray-300 hover:text-gold transition-colors">View All</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-6 border-b border-gold pb-3">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="text-gold mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  123 Jewelry Lane<br />
                  Diamond District<br />
                  City, State 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-gold mr-3 flex-shrink-0" />
                <span className="text-gray-300">+123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-gold mr-3 flex-shrink-0" />
                <span className="text-gray-300">info@biswakarma.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-700 my-8" />
        
        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center pb-8">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Biswakarma Jewellery Shilpalaya. All Rights Reserved.
          </p>
          <div className="flex space-x-6">
            <a href="/terms" className="text-gray-400 text-sm hover:text-gold transition-colors">Terms of Service</a>
            <a href="/privacy" className="text-gray-400 text-sm hover:text-gold transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
