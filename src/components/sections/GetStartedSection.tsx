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
    <div
      id="get-started"
      className="py-16 px-4 md:px-8 lg:px-16 bg-background text-foreground rounded-lg shadow-md"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Kolom Kiri */}
        <div className="flex flex-col items-center justify-center">
          <AnimatedElement delay={100}>
            <QrCode className="h-12 w-12 text-primary mb-4" />
          </AnimatedElement>
          <AnimatedElement delay={200}>
            <h2 className="text-2xl md:text-3xl font-bold">Get Started</h2>
          </AnimatedElement>
          <AnimatedElement delay={300}>
            <div className="mt-8">
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
            </div>
          </AnimatedElement>
        </div>
        {/* Kolom Kanan */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <AnimatedElement delay={100}>
            <ol className="list-decimal pl-6 space-y-6 text-sm md:text-base font-mono">
              <li>
                Edit <code className="bg-muted px-2 py-1 rounded-md">src/app/page.tsx</code> to customize this page
              </li>
              <li>
                Explore the components in <code className="bg-muted px-2 py-1 rounded-md">src/components</code>
              </li>
              <li>Deploy your site to Vercel for the best experience</li>
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
  );
}
