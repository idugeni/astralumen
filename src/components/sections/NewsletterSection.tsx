// src/components/sections/NewsletterSection.tsx
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef, ReactNode } from "react";

function AnimatedElement({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      {children}
    </div>
  );
}

export function NewsletterSection() {
  return (
    <div className="py-16 bg-primary/5 rounded-2xl backdrop-blur-sm">
      <div className="max-w-2xl mx-auto text-center px-4">
        <AnimatedElement delay={100}>
          <h2 className="text-3xl font-bold mb-4">Stay Updated with AstraLumen</h2>
        </AnimatedElement>
        <AnimatedElement delay={200}>
          <p className="text-muted-foreground mb-6">
            Get the latest updates, tips, and tricks delivered straight to your inbox.
          </p>
        </AnimatedElement>
        <AnimatedElement delay={300}>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your Email"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button type="submit" className="shrink-0 cursor-pointer">
              Subscribe
            </Button>
          </div>
        </AnimatedElement>
      </div>
    </div>
  );
}
