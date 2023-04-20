import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Providers } from '@/providers/Providers';
import { Navigation } from '@/components/navigation/Navigation';
import { Footer } from '@/components/navigation/Footer';
import ChatWidget from '@/components/ChatWidget';
import Box from '@mui/material/Box';

const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'WebDev Studio - Building Tomorrow\'s Web Today',
  description: 'Professional web development studio delivering cutting-edge solutions with Next.js, React, and modern technologies. Expert in multilingual, responsive websites.',
  keywords: 'web development, Next.js, React, TypeScript, MUI, i18n, responsive design, professional websites',
  authors: [{ name: 'WebDev Studio' }],
  openGraph: {
    title: 'WebDev Studio - Building Tomorrow\'s Web Today',
    description: 'Professional web development studio delivering cutting-edge solutions',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className} style={{ margin: 0 }}>
        <Providers>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <Navigation />
            <Box component="main" sx={{ flexGrow: 1 }}>
              {children}
            </Box>
            <Footer />
            
            {/* Global Chat Widget - Available on all pages */}
            <ChatWidget />
          </Box>
        </Providers>
      </body>
    </html>
  );
}
