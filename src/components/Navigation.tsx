
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-950 sticky top-0 z-50 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <a href="#" className="font-bold text-xl">
            Srish Sitikhu
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-blue-600 transition-colors">Home</a>
            <a href="#education" className="hover:text-blue-600 transition-colors">Education</a>
            <a href="#projects" className="hover:text-blue-600 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white dark:bg-gray-950 animate-fade-in">
            <div className="flex flex-col space-y-3 py-3">
              <a href="#" className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md" onClick={toggleMenu}>Home</a>
              <a href="#education" className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md" onClick={toggleMenu}>Education</a>
              <a href="#projects" className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md" onClick={toggleMenu}>Projects</a>
              <a href="#contact" className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md" onClick={toggleMenu}>Contact</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
