import DefaultNavbar from '@/components/navbar';
import metadataConfig from '@/config/metadata';
import { AppContextProvider } from '@/hooks/AppProvider';
import AuthProvider from '@/hooks/AuthProvider';
import ThemeProvider from '@/hooks/ThemeProvider';
import UiProviders from '@/hooks/UiProvider';
import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: metadataConfig.title,
    template: `%s | ${metadataConfig.title}`,
  },
  description: metadataConfig.description,
  robots: { index: true, follow: true },
  icons: {
    icon: metadataConfig.defaultIcon,
    shortcut: metadataConfig.favIcon,
    apple: metadataConfig.appleIcon,
  },
  // For phones
  // manifest: `/public/favicon/site.webmanifest`,
  // Custom shared links
  openGraph: {
    url: metadataConfig.url,
    title: metadataConfig.title,
    description: metadataConfig.description,
    siteName: metadataConfig.title,
    images: [metadataConfig.siteImg],
    type: 'website',
    locale: 'fr_FR',
  },
  // Shared link on twitter
  twitter: {
    card: 'summary_large_image',
    title: metadataConfig.title,
    description: metadataConfig.description,
    images: [metadataConfig.siteImg],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <AppContextProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
              <UiProviders>
                <DefaultNavbar />
                {children}
              </UiProviders>
            </ThemeProvider>
          </AppContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
