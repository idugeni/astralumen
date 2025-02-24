import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MetadataSetupData } from '@/types/setup';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface MetadataSettingsFormProps {
  data: MetadataSetupData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isLoading?: boolean;
}

export const MetadataSettingsForm: React.FC<MetadataSettingsFormProps> = ({
  data,
  onChange,
  isLoading = false
}) => {
  return (
    <Card className="mb-8 shadow-md transition-all hover:shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Metadata Settings
        </CardTitle>
        <CardDescription>
          Configure your project&apos;s SEO and social media metadata
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MetadataInput
            id="title"
            label="Default Title"
            value={data.title}
            onChange={onChange}
            disabled={isLoading}
            tooltip="Primary title used in browsers and search results"
          />

          <MetadataInput
            id="titleTemplate"
            label="Title Template"
            value={data.titleTemplate}
            onChange={onChange}
            disabled={isLoading}
            tooltip="Template for page titles. %s will be replaced with the page specific title"
          />

          <div className="space-y-2 md:col-span-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label htmlFor="description" className="text-muted-foreground font-medium flex items-center gap-2 cursor-help">
                    Meta Description <Info className="h-4 w-4 text-muted-foreground/70" />
                  </Label>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  A concise summary that appears in search results. Keep it under 160 characters for best SEO results.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Textarea
              id="description"
              name="description"
              value={data.description}
              onChange={onChange}
              className="min-h-[100px] resize-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
              disabled={isLoading}
              maxLength={160}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {data.description.length}/160 characters
            </p>
          </div>

          <MetadataInput
            id="siteUrl"
            label="Site URL"
            value={data.siteUrl}
            onChange={onChange}
            disabled={isLoading}
            tooltip="The full URL to your website (e.g., https://yoursite.com)"
          />

          <MetadataInput
            id="siteName"
            label="Site Name"
            value={data.siteName}
            onChange={onChange}
            disabled={isLoading}
            tooltip="Name of your website used for branding"
          />

          <MetadataInput
            id="imageUrl"
            label="OG Image URL"
            value={data.imageUrl}
            onChange={onChange}
            disabled={isLoading}
            tooltip="Image shown when your site is shared on social media"
          />

          <MetadataInput
            id="imageAlt"
            label="OG Image Alt"
            value={data.imageAlt}
            onChange={onChange}
            disabled={isLoading}
            tooltip="Alternative text for your OG image, important for accessibility"
          />

          <div className="space-y-2 md:col-span-2">
            <MetadataInput
              id="keywords"
              label="Keywords"
              value={data.keywords}
              onChange={onChange}
              disabled={isLoading}
              tooltip="Comma-separated keywords relevant to your site (e.g., 'Next.js, React, Web Development')"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface MetadataInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  tooltip?: string;
}

const MetadataInput: React.FC<MetadataInputProps> = ({
  id,
  label,
  value,
  onChange,
  disabled = false,
  tooltip
}) => (
  <div className="space-y-2">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Label htmlFor={id} className="text-muted-foreground font-medium flex items-center gap-2 cursor-help">
            {label} <Info className="h-4 w-4 text-muted-foreground/70" />
          </Label>
        </TooltipTrigger>
        {tooltip && <TooltipContent className="max-w-xs">{tooltip}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
    <Input
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
      autoComplete="off"
      disabled={disabled}
    />
  </div>
);