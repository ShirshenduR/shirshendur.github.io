import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

const greetings = [
  "Hi, I'm",
  "नमस्ते, मैं हूँ",
  "Hola, soy",
  "Oi, sou",
  "Nǐ hǎo",
];

export const HeroSection = () => {
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentGreetingIndex((prev) => (prev + 1) % greetings.length);
        setFade(true);
      }, 500);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16"
    >
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight flex flex-wrap justify-center items-center gap-x-2 leading-tight">
            <span
              className={`transition-opacity duration-500 ${
                fade ? "opacity-100" : "opacity-0"
              }`}
            >
              {greetings[currentGreetingIndex]}
            </span>
            <span className="text-primary whitespace-nowrap">Shirshendu</span>
            <span className="text-gradient ml-1 whitespace-nowrap">R Tripathi</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-100 leading-relaxed">
            I’m a developer who loves building smooth, scalable, and meaningful
            digital experiences. I focus on writing clean code, solving real
            problems, and always learning something new along the way. I focus
            on building tech that’s both practical and impactful.
          </p>

          <div className="pt-4">
            <a href="#projects" className="cosmic-button">
              View My Work
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2">Scroll</span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};
