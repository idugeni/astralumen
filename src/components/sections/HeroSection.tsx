// src/components/sections/HeroSection.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState, useRef } from "react";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center text-center py-16 mb-16">
      {/* Badge */}
      <Badge
        variant="secondary"
        className={`mb-4 transition-all duration-700 ease-in-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
        }`}
        style={{ transitionDelay: "100ms" }}
      >
        Next.js 15 + Shadcn UI
      </Badge>

      {/* Title */}
      <h1
        className={`text-4xl sm:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 transition-all duration-700 ease-in-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
        style={{ transitionDelay: "200ms" }}
      >
        Welcome to AstraLumen
      </h1>

      {/* Description */}
      <p
        className={`text-lg text-muted-foreground mb-8 transition-all duration-700 ease-in-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
        style={{ transitionDelay: "300ms" }}
      >
        AstraLumen is a futuristic Next.js 15 theme that combines cutting-edge design with the elegance of Tailwind CSS and Shadcn UI to create stunning, responsive web experiences.
      </p>

      {/* Buttons */}
      <div
        className={`flex flex-wrap gap-4 justify-center transition-all duration-700 ease-in-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
        style={{ transitionDelay: "400ms" }}
      >
        <Button size="lg" className="rounded-full" asChild>
          <Link href="https://github.com/idugeni/astralumen/blob/main/README.md#astralumen">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button size="lg" variant="outline" className="rounded-full" asChild>
          <Link href="https://github.com/idugeni/astralumen/blob/main/README.md#technical-documentation">
            View Documentation
          </Link>
        </Button>
      </div>
    </div>
  );
}
