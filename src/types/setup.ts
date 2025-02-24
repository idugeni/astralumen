export interface GeneralSetupData {
    projectName: string;
    projectDescription: string;
    githubRepo: string;
    twitterUrl: string;
    linkedinUrl: string;
    websiteUrl: string;
    email: string;
  }
  
  export interface MetadataSetupData {
    title: string;
    titleTemplate: string;
    description: string;
    siteUrl: string;
    siteName: string;
    imageUrl: string;
    imageAlt: string;
    keywords: string;
  }
  
  export interface SetupFormData {
    general: GeneralSetupData;
    metadata: MetadataSetupData;
  }