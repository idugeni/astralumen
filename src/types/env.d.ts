// This file ensures TypeScript recognizes the Next.js 
// server components environment properly

declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }