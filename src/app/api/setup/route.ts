import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { defaultGeneralData, defaultMetadataData } from "@/constants/setup";
import type { SetupFormData } from "@/types/setup";

// Path to the configuration file
const CONFIG_FILE_PATH = path.join(process.cwd(), "src/config/site.json");

// Create config directory if it doesn't exist
async function ensureConfigDir() {
  const configDir = path.join(process.cwd(), "src/config");
  try {
    await fs.access(configDir);
  } catch (error) {
    await fs.mkdir(configDir, { recursive: true });
  }
}

// Load current config or create default
async function loadConfig(): Promise<SetupFormData> {
  try {
    await ensureConfigDir();
    
    try {
      const fileData = await fs.readFile(CONFIG_FILE_PATH, "utf-8");
      const data = JSON.parse(fileData);
      return {
        general: { ...defaultGeneralData, ...data.general },
        metadata: { ...defaultMetadataData, ...data.metadata }
      };
    } catch (error) {
      // If file doesn't exist or is invalid, return defaults
      return {
        general: defaultGeneralData,
        metadata: defaultMetadataData
      };
    }
  } catch (error) {
    console.error("Error loading config:", error);
    throw new Error("Failed to load configuration");
  }
}

// Save config to file
async function saveConfig(data: SetupFormData): Promise<void> {
  try {
    await ensureConfigDir();
    await fs.writeFile(
      CONFIG_FILE_PATH, 
      JSON.stringify(data, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.error("Error saving config:", error);
    throw new Error("Failed to save configuration");
  }
}

// GET handler
export async function GET() {
  try {
    const config = await loadConfig();
    return NextResponse.json(config, { status: 200 });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve configuration" },
      { status: 500 }
    );
  }
}

// POST handler
export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();
    
    // Validate the incoming data
    if (!requestData) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }
    
    // Load current config
    const currentConfig = await loadConfig();
    
    // Merge new data with current config
    const newConfig: SetupFormData = {
      general: {
        ...currentConfig.general,
        ...requestData.general
      },
      metadata: {
        ...currentConfig.metadata,
        ...requestData.metadata
      }
    };
    
    // Save the updated config
    await saveConfig(newConfig);
    
    return NextResponse.json(
      { message: "Configuration updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "Failed to update configuration" },
      { status: 500 }
    );
  }
}