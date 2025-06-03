import { Mail, Linkedin, Github, Twitter } from "lucide-react";

export const Contactme = () => {
  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary">Touch</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out.
          I'm always open to discussing new opportunities.
        </p>

        <div className="bg-card p-8 rounded-lg shadow-sm flex flex-col items-center space-y-6">
          <h3 className="text-2xl font-semibold mb-2">Connect With Me</h3>

          <div className="flex justify-center gap-6">
            <a
              href="mailto:shirsh8924@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 text-primary" />
            </a>
            <a
              href="https://www.linkedin.com/in/shirshendur/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-primary" />
            </a>
            <a
              href="https://github.com/ShirshenduR"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 text-primary" />
            </a>
            <a
              href="https://x.com/Shirshendu_R"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition"
              aria-label="X (Twitter)"
            >
              <Twitter className="w-5 h-5 text-primary" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
