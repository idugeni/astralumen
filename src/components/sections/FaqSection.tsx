// src/components/sections/FaqSection.tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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

export function FaqSection() {
  const faqItems = [
    {
      question: "Is AstraLumen free to use?",
      answer:
        "Yes, AstraLumen is open source and free for both personal and commercial projects. We also offer a premium version with additional features.",
    },
    {
      question: "How do I install AstraLumen?",
      answer:
        "You can clone the repository from GitHub or use our starter template by running: npx create-next-app -e https://github.com/idugeni/astralumen",
    },
    {
      question: "Does AstraLumen support TypeScript?",
      answer:
        "Yes, AstraLumen is built with TypeScript by default, providing enhanced type safety and a better developer experience.",
    },
    {
      question: "How can I customize the theme?",
      answer:
        "You can easily customize the theme via the globals.css file and tailwind.config.js to change colors, fonts, and other design aspects.",
    },
  ];

  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="max-w-2xl mx-auto">
        {faqItems.map((item, i) => (
          <AnimatedElement key={i} delay={i * 150}>
            <AccordionItem value={`item-${i + 1}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          </AnimatedElement>
        ))}
      </Accordion>
    </div>
  );
}
