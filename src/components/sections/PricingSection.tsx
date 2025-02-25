// src/components/sections/PricingSection.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-2">Choose Your Plan</h2>
      <p className="text-muted-foreground text-center mb-8">Solutions for every need and budget</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingPlans.map((plan, i) => (
          <AnimatedElement key={i} delay={i * 150}>
            <Card className={`backdrop-blur-sm border-border/40 overflow-hidden ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
              {plan.popular && (
                <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-2">{plan.title}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.price !== "Contact Us" && plan.price !== "Free" && (
                    <span className="text-muted-foreground">/year</span>
                  )}
                </div>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                <Button variant={plan.popular ? "default" : "outline"} className="w-full mb-6 cursor-pointer">
                  {plan.buttonText}
                </Button>
                <ul className="space-y-2">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
