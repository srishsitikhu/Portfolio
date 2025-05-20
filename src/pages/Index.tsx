
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Projects from "@/components/Projects";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Header />
      <main>
        <Education />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
