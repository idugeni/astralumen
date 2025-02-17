import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Recommended for development to catch potential issues early.  Set to false in production if needed for performance.
  compiler: {
    // Enable styled-components if you use it.  Removes runtime CSS-in-JS overhead.
    styledComponents: true,  // Or: { displayName: true, ssr: true } for more control
    // Remove react-refresh in production builds
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Optional optimizations - enable as needed and test thoroughly
  // image: {
  //   formats: ['image/avif', 'image/webp'], // Serve modern image formats
  //   remotePatterns: [ // Optimize images from external sources
  //     {
  //       protocol: 'https',
  //       hostname: '**.example.com', // Replace with your hostname(s)
  //       port: '',
  //       pathname: '/images/**',
  //     },
  //   ],
  // },
  // If you use a specific locale:
  // i18n: {
  //   locales: ['en', 'es', 'fr'],
  //   defaultLocale: 'en',
  // },
  // For static site generation (SSG) or static export:
  // output: 'export', // or 'standalone' for a single deployable output
  // Optional: Analyze the bundle size to identify areas for optimization
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   if (!dev) {
  //     config.optimization.minimize = true;
  //     config.optimization.minimizer = [
  //       new TerserWebpackPlugin({ // Or use SWC minifier if you prefer
  //         terserOptions: {
  //           compress: {
  //             drop_console: true, // Remove console.log in production
  //           },
  //         },
  //       }),
  //     ];
  //   }
  //   return config;
  // },
  // Optional: If you have very specific needs, you can customize the Babel configuration:
  // babel: {
  //   presets: ['next/babel'],
  //   plugins: [],
  // },
};

export default nextConfig;