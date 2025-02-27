// src/components/sections/GetStartedSection.tsx
import Image from "next/image";
import Link from "next/link";
import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef, ReactNode } from "react";

function AnimatedElement({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
          if (entry.isIntersecting && !hasBeenVisible) {
            setHasBeenVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasBeenVisible]);

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

export function GetStartedSection() {
  return (
    <div id="get-started" className="relative my-16">
      {/* Decorative Full-Width Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg shadow-md -z-10" />
      <div className="relative py-16 bg-background text-foreground rounded-lg shadow-md w-full">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Column: Call to Action */}
          <div className="md:w-1/2 flex flex-col items-start justify-center p-8 space-y-6">
            <AnimatedElement delay={100}>
              <div className="flex items-center space-x-3">
                <QrCode className="h-12 w-12 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold">Get Started</h2>
              </div>
            </AnimatedElement>
            <AnimatedElement delay={200}>
              <p className="text-base md:text-lg text-muted-foreground">
                Begin your journey with our modern, professional platform designed for seamless deployment and outstanding performance.
              </p>
            </AnimatedElement>
            <AnimatedElement delay={300}>
              <Button asChild className="rounded-lg">
                <Link
                  href="https://vercel.com/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Image
                    src="/vercel.svg"
                    alt="Vercel Logo"
                    width={20}
                    height={20}
                    className="mr-2 dark:invert"
                  />
                  Deploy to Vercel
                </Link>
              </Button>
            </AnimatedElement>
          </div>
          {/* Vertical Divider for Medium Screens and Above */}
          <div className="hidden md:block w-px bg-border h-48 mx-8" />
          {/* Right Column: Step-by-Step Guide */}
          <div className="md:w-1/2 p-8">
            <AnimatedElement delay={100}>
              <ol className="list-decimal pl-6 space-y-4 text-sm md:text-base font-mono">
                <li>
                  Edit <code className="bg-muted px-2 py-1 rounded-md">src/app/page.tsx</code> to customize this page.
                </li>
                <li>
                  Explore components in <code className="bg-muted px-2 py-1 rounded-md">src/components</code>.
                </li>
                <li>Deploy your site to Vercel for the ultimate experience.</li>
              </ol>
            </AnimatedElement>
            <AnimatedElement delay={200}>
              <div className="mt-8 flex justify-center">
                <Button asChild variant="outline" className="rounded-lg">
                  <Link
                    href="https://nextjs.org/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    Documentation
                  </Link>
                </Button>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </div>
    </div>
  );
}
