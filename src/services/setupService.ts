import { SetupFormData } from '@/types/setup';
import { defaultGeneralData, defaultMetadataData } from '@/constants/setup';

export async function fetchCurrentSettings(): Promise<SetupFormData> {
  try {
    const response = await fetch('/api/setup', { 
      method: 'GET',
      headers: { 'Cache-Control': 'no-cache' }
    });
    
    if (!response.ok) throw new Error('Failed to fetch settings');
    
    const data = await response.json();
    return {
      general: { ...defaultGeneralData, ...data.general },
      metadata: { ...defaultMetadataData, ...data.metadata }
    };
  } catch (error) {
    console.error('Error fetching settings:', error);
    // Return defaults if fetch fails
    return {
      general: defaultGeneralData,
      metadata: defaultMetadataData
    };
  }
}

export async function updateSettings(data: {
  general: Partial<typeof defaultGeneralData>;
  metadata: Partial<typeof defaultMetadataData>;
}): Promise<boolean> {
  try {
    const response = await fetch('/api/setup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) throw new Error('Failed to update settings');
    return true;
  } catch (error) {
    console.error('Error updating settings:', error);
    return false;
  }
}