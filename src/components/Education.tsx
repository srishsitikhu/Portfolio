
import { School } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const educationData = [
  {
    school: "Vedas college",
    degree: "Bachelor of Computer application (TU)",
    period: "2079 - present",
    gpa: null
  },
  {
    school: "Bagiswor Higher Secondary School",
    degree: "NEB science",
    period: "2077 - 2078",
    gpa: "2.6"
  },
  {
    school: "Bagiswori Secondary School",
    degree: "NEB SEE",
    period: "2076",
    gpa: "3.4"
  }
];

const Education = () => {
  return (
    <section id="education" className="section-container">
      <div className="flex items-center gap-2 mb-8">
        <School className="h-6 w-6 text-blue-600" />
        <h2 className="heading-lg">Education</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {educationData.map((edu, index) => (
          <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
            <CardHeader className="pb-2">
              <h3 className="heading-md">{edu.school}</h3>
              <p className="text-muted-foreground">{edu.period}</p>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{edu.degree}</p>
              {edu.gpa && <p className="text-sm text-muted-foreground mt-2">GPA: {edu.gpa}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Education;
