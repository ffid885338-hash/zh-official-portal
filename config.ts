export interface SiteConfig {
  brandTitle: string;
  logoUrl: string;
  logoAlt: string;
  verifyButtonLabel: string;
  redirectHeading: string;
  redirectSubtext: string;
  redirectDelaySeconds: number;
  /**
   * Paste your actual BP Link URL here.
   * After the 3-second animation on Page 2, visitors are automatically redirected to this URL.
   */
  bpLinkUrl: string;
  /**
   * Paste your Telegram channel/group/profile URL here.
   */
  telegramUrl: string;
  /**
   * Paste your YouTube channel/video URL here.
   */
  youtubeUrl: string;
}

export const SITE_CONFIG: SiteConfig = {
  brandTitle: 'Official Verification Portal',
  logoUrl: '/src/assets/images/brand_logo_emblem_1795528040923.jpg',
  logoAlt: 'Brand Logo',
  verifyButtonLabel: 'Verify',
  redirectHeading: 'Redirecting...',
  redirectSubtext: 'Taking you to the next step',
  redirectDelaySeconds: 3,
  bpLinkUrl: 'https://example.com',
  telegramUrl: 'https://t.me/+GcXG_5v9JWU3MGNl',
  youtubeUrl: 'https://youtube.com/@rxs10k-w1t?si=Bu34YL7XMoDSwMUU',
};
