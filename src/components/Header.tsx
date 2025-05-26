
import { useState, useEffect, useRef } from "react";
import { Code, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && 
          menuRef.current && 
          !menuRef.current.contains(event.target as Node) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target as Node)
         ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);
  return (
    <header className="fixed top-0 w-full bg-slate-900/90 backdrop-blur-sm border-b border-slate-800 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold text-white">angusgee.dev</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-slate-300 hover:text-white transition-colors">
              Services
            </a>
            <a href="#hosting" className="text-slate-300 hover:text-white transition-colors">
              Hosting
            </a>
            <a href="#contact" className="text-slate-300 hover:text-white transition-colors">
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="hidden md:flex border-blue-600 text-slate-900 font-bold hover:bg-slate-800 hover:text-blue-400"
            >
              Get Started
            </Button>
            <Button ref={buttonRef} size="sm" className="md:hidden" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <nav ref={menuRef} className="md:hidden bg-slate-900/95 border-t border-slate-800">
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            <a href="#services" className="text-slate-300 hover:text-white transition-colors" onClick={toggleMobileMenu}>
              Services
            </a>
            <a href="#hosting" className="text-slate-300 hover:text-white transition-colors" onClick={toggleMobileMenu}>
              Hosting
            </a>
            <a href="#contact" className="text-slate-300 hover:text-white transition-colors" onClick={toggleMobileMenu}>
              Contact
            </a>
            <Button 
              variant="outline" 
              className="w-full border-blue-600 text-slate-900 font-bold hover:bg-slate-800 hover:text-blue-400"
              onClick={() => { /* Add navigation or action */ toggleMobileMenu(); }}
            >
              Get Started
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
