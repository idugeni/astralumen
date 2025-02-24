import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Github, Mail, Globe, Twitter, Linkedin } from 'lucide-react';
import { GeneralSetupData } from '@/types/setup';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface GeneralSettingsFormProps {
  data: GeneralSetupData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isLoading?: boolean;
}

export const GeneralSettingsForm: React.FC<GeneralSettingsFormProps> = ({
  data,
  onChange,
  isLoading = false
}) => {
  return (
    <Card className="mb-8 shadow-md transition-all hover:shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          General Settings
        </CardTitle>
        <CardDescription>
          Update your project&apos;s basic information and social links
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="projectName" className="text-muted-foreground font-medium">
              Project Name
            </Label>
            <Input
              id="projectName"
              name="projectName"
              value={data.projectName}
              onChange={onChange}
              className="transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
              autoComplete="off"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="projectDescription" className="text-muted-foreground font-medium">
              Project Description
            </Label>
            <Textarea
              id="projectDescription"
              name="projectDescription"
              value={data.projectDescription}
              onChange={onChange}
              className="min-h-[100px] resize-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
              disabled={isLoading}
            />
          </div>

          <SocialInput
            id="githubRepo"
            label="GitHub Repository"
            icon={<Github className="h-4 w-4" />}
            value={data.githubRepo}
            onChange={onChange}
            disabled={isLoading}
            tooltip="Link to your GitHub repository"
          />

          <SocialInput
            id="twitterUrl"
            label="Twitter URL"
            icon={<Twitter className="h-4 w-4" />}
            value={data.twitterUrl}
            onChange={onChange}
            disabled={isLoading}
            tooltip="Your Twitter/X profile URL"
          />

          <SocialInput
            id="linkedinUrl"
            label="LinkedIn URL"
            icon={<Linkedin className="h-4 w-4" />}
            value={data.linkedinUrl}
            onChange={onChange}
            disabled={isLoading}
            tooltip="Your LinkedIn profile URL"
          />

          <SocialInput
            id="websiteUrl"
            label="Website URL"
            icon={<Globe className="h-4 w-4" />}
            value={data.websiteUrl}
            onChange={onChange}
            disabled={isLoading}
            tooltip="Your personal or company website"
          />

          <SocialInput
            id="email"
            label="Contact Email"
            icon={<Mail className="h-4 w-4" />}
            value={data.email}
            onChange={onChange}
            disabled={isLoading}
            type="email"
            tooltip="Primary contact email address"
          />
        </div>
      </CardContent>
    </Card>
  );
};

interface SocialInputProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  type?: string;
  tooltip?: string;
}

const SocialInput: React.FC<SocialInputProps> = ({
  id,
  label,
  icon,
  value,
  onChange,
  disabled = false,
  type = "text",
  tooltip
}) => (
  <div className="space-y-2">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Label htmlFor={id} className="text-muted-foreground flex items-center gap-2 font-medium cursor-help">
            {icon} {label}
          </Label>
        </TooltipTrigger>
        {tooltip && <TooltipContent>{tooltip}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
    <Input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      className="transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
      autoComplete="off"
      disabled={disabled}
    />
  </div>
);