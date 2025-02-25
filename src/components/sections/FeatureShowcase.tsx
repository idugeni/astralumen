// src/components/sections/FeatureShowcase.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect, useRef } from "react";

interface Feature {
  title: string;
  description: string;
  align: "left" | "right";
  link: string;
}

function FeatureItem({ feature, delayBase }: { feature: Feature; delayBase: number }) {
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
    <div ref={ref}>
      <div className={`flex flex-col ${feature.align === "left" ? "md:flex-row-reverse" : "md:flex-row"} gap-8 items-center`}>
        {/* Bagian Gambar / Visual */}
        <div
          className={`flex-1 w-full transition-all duration-700 ease-in-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: `${delayBase}ms` }}
        >
          {!hasBeenVisible ? (
            <Skeleton className="h-64 rounded-xl animate-pulse" />
          ) : (
            <div className="h-64 w-full bg-primary/10 rounded-xl flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                <div className="h-8 w-8 rounded-full bg-primary" />
              </div>
            </div>
          )}
        </div>
        {/* Bagian Konten Teks */}
        <div className="flex-1">
          <h3
            className={`text-2xl font-bold mb-4 transition-all duration-700 ease-in-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: `${delayBase + 100}ms` }}
          >
            {!hasBeenVisible ? <Skeleton className="h-8 w-3/4 animate-pulse" /> : feature.title}
          </h3>
          <p
            className={`text-muted-foreground mb-4 transition-all duration-700 ease-in-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: `${delayBase + 150}ms` }}
          >
            {!hasBeenVisible ? <Skeleton className="h-4 w-5/6 animate-pulse" /> : feature.description}
          </p>
          <div
            className={`transition-all duration-700 ease-in-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: `${delayBase + 200}ms` }}
          >
            {!hasBeenVisible ? (
              <Skeleton className="h-10 w-1/2 animate-pulse" />
            ) : (
              <Button variant="outline" className="rounded-full" asChild>
                <Link href={feature.link}>Learn More</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeatureShowcase() {
  const features: Feature[] = [
    {
      title: "Comprehensive UI Components",
      description:
        "Dive into a rich library of over 30 meticulously crafted, ready-to-use UI components. These components are designed to streamline your development process, allowing you to build sophisticated and responsive user interfaces rapidly, without the need to reinvent the wheel.",
      align: "right",
      link: "/components",
    },
    {
      title: "Optimal Performance",
      description:
        "Experience lightning-fast performance and superior SEO capabilities, thanks to our implementation of the latest Next.js 15 features. We've optimized every aspect to ensure your applications load quickly, rank higher in search results, and provide an exceptional user experience, setting you apart from the competition.",
      align: "left",
      link: "/performance",
    },
    {
      title: "Easy Customization",
      description:
        "Tailor your application's look and feel effortlessly with our intuitive customization options. Leverage the power of Tailwind CSS for rapid styling adjustments, and take advantage of Shadcn UI's component variables for deeper, more granular design control. Achieve a unique, brand-aligned aesthetic with minimal effort.",
      align: "right",
      link: "/customization",
    },
  ];

  return (
    <div className="py-16 mb-16 px-4 md:px-8 lg:px-16 bg-background text-foreground rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
      <div className="space-y-12">
        {features.map((feature: Feature, i) => (
          <FeatureItem key={i} feature={feature} delayBase={i * 150} />
        ))}
      </div>
    </div>
  );
}
