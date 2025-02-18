import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen w-screen bg-zinc-900 text-zinc-300 font-sans flex flex-col">
      <main className="container mx-auto px-4 py-16 flex-grow flex flex-col items-center justify-center">
        <div className="mb-12">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={300}
            height={60}
            priority
          />
        </div>

        <div className="bg-zinc-800 rounded-2xl shadow-lg p-8 w-full max-w-2xl backdrop-blur-md">
          <div className="prose prose-invert max-w-none mb-8">
            <ol className="list-inside list-decimal text-sm font-mono">
              <li className="mb-4">
                Get started by editing{" "}
                <code className="bg-zinc-700 px-2 py-1 rounded-sm font-semibold">
                  src/app/page.tsx
                </code>
                .
              </li>
              <li>Save and see your changes instantly.</li>
            </ol>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Button asChild className="w-full rounded-lg shadow-sm hover:shadow-md transition-all bg-blue-500 hover:bg-blue-600">
              <Link
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center" // className dipindahkan ke Link
              >
                <Image
                  className="dark:invert mr-2"
                  src="/vercel.svg"
                  alt="Vercel logomark"
                  width={20}
                  height={20}
                />
                Deploy now
              </Link>
            </Button>

            <Button asChild className="w-full rounded-lg shadow-sm hover:shadow-md transition-all bg-transparent border border-zinc-600 hover:border-zinc-500">
              <Link
                href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center" // className dipindahkan ke Link
              >
                Read our docs
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 text-center text-sm">
        <div className="flex flex-wrap justify-center gap-6">
          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            className="hover:underline text-zinc-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn
          </a>
          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            className="hover:underline text-zinc-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            Examples
          </a>
          <a
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            className="hover:underline text-zinc-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to nextjs.org →
          </a>
        </div>
      </footer>
    </div>
  );
}