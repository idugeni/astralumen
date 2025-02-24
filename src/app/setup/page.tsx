'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { GeneralSettingsForm } from '@/components/setup/GeneralSettingsForm';
import { MetadataSettingsForm } from '@/components/setup/MetadataSettingsForm';
import { defaultGeneralData, defaultMetadataData } from '@/constants/setup';
import { fetchCurrentSettings, updateSettings } from '@/services/setupService';
import type { GeneralSetupData, MetadataSetupData } from '@/types/setup';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function SetupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [generalData, setGeneralData] = useState<GeneralSetupData>(defaultGeneralData);
  const [metadataData, setMetadataData] = useState<MetadataSetupData>(defaultMetadataData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCurrentSettings = async () => {
      setIsFetching(true);
      try {
        const data = await fetchCurrentSettings();
        setGeneralData(data.general);
        setMetadataData(data.metadata);
        setError(null);
      } catch (err) {
        setError('Failed to load current settings. Using default values instead.');
        console.error(err);
      } finally {
        setIsFetching(false);
      }
    };

    loadCurrentSettings();
  }, []);

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGeneralData(prev => ({ ...prev, [name]: value }));
  };

  const handleMetadataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMetadataData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {

      // Always send complete current data
      const success = await updateSettings({
        general: generalData,
        metadata: metadataData
      });

      if (!success) throw new Error('Failed to update content');

      toast.success('Setup completed', {
        description: 'Your project content has been updated successfully.',
        duration: 5000
      });

      router.push('/');
      router.refresh();
    } catch {
      setError('Failed to update settings. Please try again.');
      toast.error('Error', {
        description: 'Failed to update content. Please try again.',
        duration: 5000
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg text-muted-foreground">Loading your current settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 px-4 max-w-3xl py-10">
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent mb-2">
          Project Configuration
        </h1>
        <p className="text-muted-foreground">
          Customize your AstraLumen project settings. These changes will be applied globally across your site.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <GeneralSettingsForm
          data={generalData}
          onChange={handleGeneralChange}
          isLoading={isLoading}
        />

        <MetadataSettingsForm
          data={metadataData}
          onChange={handleMetadataChange}
          isLoading={isLoading}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/')}
            disabled={isLoading}
            className="cursor-pointer hover:bg-secondary"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer bg-primary hover:bg-primary/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              'Update Content'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}