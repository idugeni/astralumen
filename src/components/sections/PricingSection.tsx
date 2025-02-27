// src/components/sections/PricingSection.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

export function PricingSection() {
  const pricingPlans = [
    {
      title: "Starter",
      price: "Free",
      description: "For personal projects and experiments",
      features: ["Basic components", "Dark mode", "Responsive", "Basic documentation"],
      buttonText: "Get Started for Free",
      popular: false,
    },
    {
      title: "Pro",
      price: "Rp 499,000",
      description: "For professional websites and applications",
      features: [
        "All Starter features",
        "50+ premium components",
        "Priority support",
        "Access to templates",
        "Lifetime updates",
      ],
      buttonText: "Buy Now",
      popular: true,
    },
    {
      title: "Enterprise",
      price: "Contact Us",
      description: "For large enterprise needs",
      features: [
        "All Pro features",
        "24/7 support",
        "Whitelabel customization",
        "Team training",
        "Deployment assistance",
      ],
      buttonText: "Contact Us",
      popular: false,
    },
  ];

  return (
    <div className="mx-auto my-16 py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-2 text-foreground">Choose Your Plan</h2>
      <p className="text-muted-foreground text-center mb-8">Solutions for every need and budget</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingPlans.map((plan, i) => (
          <AnimatedElement key={i} delay={i * 150}>
            <Card className="flex flex-col h-full backdrop-blur-sm border border-border overflow-hidden">
              {plan.popular && (
                <div className="bg-secondary text-secondary-foreground text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <CardContent className="p-8 flex flex-col h-full">
                {/* Plan Title Badge */}
                <Badge className="self-center bg-primary text-primary-foreground rounded-full px-4 py-1 mb-4">
                  {plan.title}
                </Badge>
                <div className="mb-6 text-center">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  {plan.price !== "Contact Us" && plan.price !== "Free" && (
                    <span className="text-muted-foreground ml-2">/year</span>
                  )}
                </div>
                <p className="text-muted-foreground text-center mb-6">{plan.description}</p>
                <Button variant={plan.popular ? "default" : "outline"} className="w-full mb-6">
                  {plan.buttonText}
                </Button>
                <ul className="space-y-2 mt-auto">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center text-foreground">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-primary mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </AnimatedElement>
        ))}
      </div>
    </div>
  );
}
