import { useState } from "react";

const skills = [
  // Programming Languages
  { name: "JavaScript", level: 80, category: "programming", label: "Advanced" },
  { name: "Python", level: 80, category: "programming", label: "Advanced" },
  { name: "Java", level: 85, category: "programming", label: "Intermediate" },
  { name: "C/C++", level: 85, category: "programming", label: "Intermediate" },

  // Frontend
  { name: "HTML/CSS", level: 95, category: "frontend", label: "Advanced" },
  { name: "React", level: 90, category: "frontend", label: "Advanced" },
  { name: "Tailwind CSS", level: 90, category: "frontend", label: "Advanced" },
  { name: "Bootstrap", level: 85, category: "frontend", label: "Advanced" }, // Bootstrap added here

  // Backend
  { name: "Node.js", level: 85, category: "backend", label: "Advanced" },
  { name: "Express.js", level: 80, category: "backend", label: "Advanced" },
  { name: "MongoDB", level: 75, category: "backend", label: "Intermediate" },
  { name: "PostgreSQL", level: 70, category: "backend", label: "Intermediate" },

  // Tools
  { name: "Git & GitHub", level: 90, category: "tools", label: "Advanced" },
  { name: "Docker", level: 70, category: "tools", label: "Intermediate" },
  { name: "Figma", level: 80, category: "tools", label: "Intermediate" },
  { name: "VS Code", level: 95, category: "tools", label: "Advanced" },
];

const categories = ["all", "programming", "frontend", "backend", "tools"];

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary">Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full transition-colors duration-300 capitalize ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, idx) => (
            <div
              key={idx}
              className="bg-card p-6 rounded-lg shadow-xs card-hover"
            >
              <div className="text-left mb-4">
                <h3 className="font-semibold text-lg">{skill.name}</h3>
                <small className="text-muted-foreground">{skill.label}</small>
              </div>
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]"
                  style={{ width: skill.level + "%" }}
                />
              </div>

              <div className="text-right mt-1">
                <span className="text-sm text-muted-foreground">{skill.level}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
