
import { useState } from 'react';
import { Facebook, Instagram, Youtube, Search, ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative bg-white shadow-md z-50">
      {/* Top bar with social and contact */}
      <div className="hidden md:flex justify-between items-center px-8 py-2 bg-ruby-red text-white">
        <div className="text-sm">
          <span className="mr-4">Call Us: +919874085669</span>
          <span>Email: support@biswakarmagold.com</span>
        </div>
        <div className="flex space-x-4">
          <a href="https://www.facebook.com/bjs2k/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors">
            <Facebook size={18} />
          </a>
          <a href="https://www.instagram.com/bjs2k/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors">
            <Instagram size={18} />
          </a>
          <a href="https://www.youtube.com/@bjs2k/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors">
            <Youtube size={18} />
          </a>
        </div>
      </div>

      {/* Main navigation */}
      <div className="flex justify-between items-center px-4 md:px-8 py-4">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </Button>
          <a href="/" className="flex items-center">
            <img 
              src="https://d1h96izmtdkx5o.cloudfront.net/-O0Db23L67I9afe9SYhw.jpg?v=2" 
              alt="Biswakarma Jewellery Logo" 
              className="h-14 mr-3"
            />
            <div>
              <span className="text-2xl md:text-3xl font-bold font-playfair text-ruby-red">Biswakarma</span>
              <span className="block text-sm md:text-base font-normal tracking-wider text-black">Jewellery Shilpalaya</span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-sm">
          <a href="/" className="hover:text-ruby-red transition-colors font-medium">Home</a>
          <a href="/collections" className="hover:text-ruby-red transition-colors font-medium">Collections</a>
          <a href="/categories" className="hover:text-ruby-red transition-colors font-medium">Categories</a>
          <a href="/about" className="hover:text-ruby-red transition-colors font-medium">About Us</a>
          <a href="/contact" className="hover:text-ruby-red transition-colors font-medium">Contact</a>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Search size={20} />
          </Button>
          <Button variant="ghost" size="icon">
            <ShoppingCart size={20} />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-white h-full w-64 p-6 shadow-lg animate-slide-in">
            <div className="flex justify-between items-center mb-8">
              <span className="font-playfair text-xl font-bold text-ruby-red">Menu</span>
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                <X size={24} />
              </Button>
            </div>
            <nav className="flex flex-col space-y-4">
              <a href="/" className="py-2 hover:text-ruby-red transition-colors">Home</a>
              <a href="/collections" className="py-2 hover:text-ruby-red transition-colors">Collections</a>
              <a href="/categories" className="py-2 hover:text-ruby-red transition-colors">Categories</a>
              <a href="/about" className="py-2 hover:text-ruby-red transition-colors">About Us</a>
              <a href="/contact" className="py-2 hover:text-ruby-red transition-colors">Contact</a>
            </nav>
            <div className="mt-8 pt-4 border-t">
              <div className="flex space-x-4 mt-4">
                <a href="https://www.facebook.com/bjs2k/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-ruby-red transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="https://www.instagram.com/bjs2k/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-ruby-red transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="https://www.youtube.com/@bjs2k/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-ruby-red transition-colors">
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
