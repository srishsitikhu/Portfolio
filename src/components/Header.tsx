
import { Github, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground py-12">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Srish Sitikhu</h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80">Software Developer</p>
          </div>
          <div className="space-y-3 animate-slide-up">
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-primary-foreground/70" />
              <span>+977 9861040603</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-primary-foreground/70" />
              <span>srishsitikhu07@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-primary-foreground/70" />
              <span>Libali - 8, Bhaktapur, Nepal</span>
            </div>
            <div className="flex items-center gap-2">
              <Github size={16} className="text-primary-foreground/70" />
              <a href="https://github.com/srishsitikhu" target="_blank" rel="noopener noreferrer" className="hover:underline">
                github.com/srishsitikhu
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 flex gap-3">
          <Button asChild variant="secondary">
            <a href="https://www.reallygreatsite.com" target="_blank" rel="noopener noreferrer">View Portfolio</a>
          </Button>
          <Button asChild variant="outline">
            <a href="mailto:srishsitikhu07@gmail.com">Contact Me</a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
