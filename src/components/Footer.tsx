
import { Github, Mail, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-xl font-bold">Srish Sitikhu</h2>
            <p className="text-primary-foreground/70">Software Developer</p>
          </div>
          
          <div className="flex gap-4">
            <a href="https://github.com/srishsitikhu" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">
              <Github />
            </a>
            <a href="mailto:srishsitikhu07@gmail.com" className="hover:text-white/80 transition-colors">
              <Mail />
            </a>
            <a href="tel:+9779861040603" className="hover:text-white/80 transition-colors">
              <Phone />
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-6 pt-6 text-center text-primary-foreground/60 text-sm">
          <p>&copy; {currentYear} Srish Sitikhu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
