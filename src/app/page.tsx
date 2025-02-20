"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Moon, Sun, ArrowRight, QrCode, Github, Twitter, Linkedin, Mail, Globe } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils"

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-background to-muted dark:from-zinc-900 dark:to-background">
      <header className="border-b border-border/40 backdrop-blur-sm fixed w-full z-50 bg-background/80 dark:bg-zinc-900/80">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-primary" />
            </div>
            <span className="font-bold text-xl">AstraLumen</span>
          </div>
          <nav className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button
              variant="outline"
              className="hidden sm:flex"
              asChild
            >
              <Link
                href="https://github.com/idugeni/astralumen"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-32 pb-16 flex-grow">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Next.js 15 + Shadcn UI
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Welcome to AstraLumen
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            AstraLumen is a futuristic Next.js 15 theme that combines cutting-edge design with the elegance of Tailwind CSS and Shadcn UI to create stunning, responsive web experiences.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              className="rounded-full"
              asChild
            >
              <Link href="https://github.com/idugeni/astralumen/blob/main/README.md#astralumen">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full"
              asChild
            >
              <Link href="https://github.com/idugeni/astralumen/blob/main/README.md#technical-documentation">
                View Documentation
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: "Modern Stack",
              description: "Built with Next.js 15, TypeScript, Tailwind CSS, and Shadcn UI for a powerful development experience."
            },
            {
              title: "Dark Mode Ready",
              description: "Seamless dark mode integration with Next Themes for a comfortable viewing experience."
            },
            {
              title: "Responsive Design",
              description: "Fully responsive layout that looks great on all devices, from mobile to desktop."
            }
          ].map((feature, i) => (
            <Card key={i} className="backdrop-blur-sm border-border/40">
              <CardContent className="p-6">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div id="get-started" className="bg-card border border-border/40 rounded-2xl p-8 backdrop-blur-sm scroll-mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center justify-center">
              <QrCode className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold">Get Started</h2>
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
            </div>
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <ol className="list-decimal pl-6 space-y-6 text-sm md:text-base font-mono">
                <li>
                  Edit <code className="bg-muted px-2 py-1 rounded-md">src/app/page.tsx</code> to customize this page
                </li>
                <li>Explore the components in <code className="bg-muted px-2 py-1 rounded-md">src/components</code></li>
                <li>Deploy your site to Vercel for the best experience</li>
              </ol>
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
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/40">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 AstraLumen. Built with Next.js and Shadcn UI.
            </p>
            <div className="flex items-center gap-6">
              <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={cn("transition-colors duration-200 hover:text-primary")}>
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <Link href="https://github.com/idugeni/astralumen" target="_blank" rel="noopener noreferrer" className={cn("transition-colors duration-200 hover:text-primary")}>
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <Link href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className={cn("transition-colors duration-200 hover:text-primary")}>
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <Link href="mailto:officialelsa21@gmail.com" className={cn("transition-colors duration-200 hover:text-primary")}>
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Email</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <Link href="/" target="_blank" rel="noopener noreferrer" className={cn("transition-colors duration-200 hover:text-primary")}>
                  <Globe className="h-4 w-4" />
                  <span className="sr-only">Website</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}