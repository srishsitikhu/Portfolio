
import { Briefcase, Github } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const projectsData = [
  {
    title: "Bachelor project (JUJU Dhau)",
    description: "PHP Ecommerce project",
    link: "https://github.com/srishsitikhu/juju-dhau",
    delay: 0
  },
  {
    title: "Weather App",
    description: "Application for weather forecasting",
    link: "https://github.com/srishsitikhu/weather_app",
    delay: 150
  },
  {
    title: "To Do List",
    description: "Task management application",
    link: "https://github.com/srishsitikhu/To-Do-List",
    delay: 300
  },
  {
    title: "Games",
    description: "Rock Paper Scissors & Tic-Tac-Toe games",
    links: [
      "https://github.com/srishsitikhu/RockPaperScissors",
      "https://github.com/srishsitikhu/Tick-Tac-Toe"
    ],
    delay: 450
  },
  {
    title: "Ongoing Project Vortexis (Ecommere)",
    description: "E-commerce platform with frontend and backend",
    links: [
      "https://github.com/krish28-nep/Vortexis",
      "https://github.com/krish28-nep/Vortexis-backend"
    ],
    delay: 600
  }
];

const Projects = () => {
  return (
    <section id="projects" className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="section-container">
        <div className="flex items-center gap-2 mb-8">
          <Briefcase className="h-6 w-6 text-blue-600" />
          <h2 className="heading-lg">Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.map((project, index) => (
            <Card key={index} className="animate-fade-in hover:shadow-md transition-all duration-300" style={{ animationDelay: `${project.delay}ms` }}>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{project.description}</p>
              </CardContent>
              <CardFooter className="flex flex-col items-start space-y-2">
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="github-link">
                    <Github size={16} />
                    <span>GitHub Repository</span>
                  </a>
                )}
                
                {project.links && project.links.map((link, i) => (
                  <a key={i} href={link} target="_blank" rel="noopener noreferrer" className="github-link">
                    <Github size={16} />
                    <span>GitHub Repository {i + 1}</span>
                  </a>
                ))}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
