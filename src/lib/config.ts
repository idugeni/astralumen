import fs from 'fs';
import path from 'path';
import { defaultGeneralData, defaultMetadataData } from '@/constants/setup';
import type { SetupFormData } from '@/types/setup';

// Path to the configuration file
const CONFIG_FILE_PATH = path.join(process.cwd(), "src/config/site.json");

/**
 * Loads site configuration from file or returns defaults if not found
 */
export function getSiteConfig(): SetupFormData {
  try {
    if (fs.existsSync(CONFIG_FILE_PATH)) {
      const fileData = fs.readFileSync(CONFIG_FILE_PATH, "utf-8");
      const data = JSON.parse(fileData);
      return {
        general: { ...defaultGeneralData, ...data.general },
        metadata: { ...defaultMetadataData, ...data.metadata }
      };
    }
  } catch (error) {
    console.error("Error loading site config:", error);
  }
  
  // Return defaults if file doesn't exist or there's an error
  return {
    general: defaultGeneralData,
    metadata: defaultMetadataData
  };
}

/**
 * Use this in your metadata.ts file to get the metadata config
 */
export function getSiteMetadata() {
  const { metadata } = getSiteConfig();
  return metadata;
}

/**
 * Use this to get general site configuration
 */
export function getGeneralConfig() {
  const { general } = getSiteConfig();
  return general;
}