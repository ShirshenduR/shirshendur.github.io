import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Resume-Maker",
    description: "An AI-powered LaTeX-style resume builder with live preview, Google-auth via Firebase, and Gemini-generated project bullet points.",
    image: "/projects/Resume-Maker.png",
    tags: ["React", "Firebase Authentication (Google OAuth)", "Gemini API", "Node.js"],
    demoUrl: "https://ai-resume-maker-bgo2.onrender.com",
    githubUrl: "https://github.com/ShirshenduR/AI-RESUME-MAKER",
  },
  {
    id: 2,
    title: "Harvard's CS50 Introduction to Computer Science Projects",
    description:
      "All the project of CS50x2023 and CS50x2024 Intrduction to Computer Science, including problem sets and final projects.",
    image: "/projects/CS50.png",
    tags: ["C", "Javascript", "Python", "SQL", "HTML", "CSS", "Flask"],
    demoUrl: "https://github.com/ShirshenduR/CS50-x2023-and-x2024",
    githubUrl: "https://github.com/ShirshenduR/CS50-x2023-and-x2024",
  },
  {
    id: 3,
    title: "Netflix Homepage Clone",
    description:
      "This is a clone of the Netflix homepage. The project also includes images and videos to simulate the Netflix experience.",
    image: "/projects/Netflix-Clone.png",
    tags: ["HTML", "CSS", "JavaScript"],
    demoUrl: "https://github.com/ShirshenduR/Netflix-Homepage-clone",
    githubUrl: "https://github.com/ShirshenduR/Netflix-Homepage-clone",
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Featured <span className="text-primary"> Projects </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1"> {project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/ShirshenduR"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};