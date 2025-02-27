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
    {
      question: "What browsers are supported?",
      answer:
        "AstraLumen supports all modern browsers for a smooth and reliable experience.",
    },
    {
      question: "How do I contribute to the project?",
      answer:
        "You can fork the repository and submit a pull request for review. We welcome contributions from the community.",
    },
    {
      question: "Is there a community for AstraLumen?",
      answer:
        "Yes, we have an active community forum where you can collaborate, ask questions, and share ideas.",
    },
    {
      question: "Where can I find documentation?",
      answer:
        "All documentation is available on our official website, providing you with comprehensive guides and API references.",
    },
  ];

  const leftItems = faqItems.slice(0, 4);
  const rightItems = faqItems.slice(4);

  return (
    <section className="my-16 py-16 px-4">
      <h2 className="text-3xl font-bold text-center text-foreground mb-8">
        Frequently Asked Questions
      </h2>
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Kolom Kiri */}
        <Accordion type="single" collapsible className="space-y-4">
          {leftItems.map((item, index) => (
            <AnimatedElement key={index} delay={index * 150}>
              <AccordionItem
                value={`left-item-${index}`}
                className="border border-border rounded-md overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-2 text-left text-lg font-medium transition-colors duration-300 hover:bg-muted">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 py-2 transition-all duration-300 ease-in-out text-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </AnimatedElement>
          ))}
        </Accordion>
        {/* Kolom Kanan */}
        <Accordion type="single" collapsible className="space-y-4">
          {rightItems.map((item, index) => (
            <AnimatedElement key={index} delay={index * 150}>
              <AccordionItem
                value={`right-item-${index}`}
                className="border border-border rounded-md overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-2 text-left text-lg font-medium transition-colors duration-300 hover:bg-muted">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 py-2 transition-all duration-300 ease-in-out text-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </AnimatedElement>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
