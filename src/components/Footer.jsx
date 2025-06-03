import { ArrowUp } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-8 px-4 bg-card relative border-t border-border mt-12 flex flex-col items-center gap-4 text-center">
      <p className="text-sm text-muted-foreground">
        Made with <span className="text-red-500">💙</span> by <strong>Shirshendu R Tripathi</strong>
      </p>
      <a
        href="#hero"
        className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </a>
    </footer>
  );
};
