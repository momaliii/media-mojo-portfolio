
// Global TypeScript declarations

// Window interface extension for Google Analytics
interface Window {
  gtag: (
    command: string,
    action: string,
    params?: Record<string, string | number | boolean> | string
  ) => void;
  dataLayer: any[];
}

// AdScreenshot type (complementing existing type)
interface AdScreenshot {
  url: string;
  client: string;
  platform: string;
  industry: string;
  details?: string;
}

// Form submission status
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

// Media platform types
type MediaPlatform = 'META' | 'LinkedIn' | 'TikTok' | 'Snapchat' | 'Google' | 'Twitter' | 'Analytics' | 'Lightfunnel';
