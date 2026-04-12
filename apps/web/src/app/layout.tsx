import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from '@/components/providers/AuthProvider';
import { MusicProvider } from '@/components/providers/MusicProvider';
import { GoogleProvider } from '@/components/providers/GoogleProvider';

export const metadata: Metadata = {
  title: "Zapsters — The Iron Throne",
  description: "A quest for the Seven Kingdoms — Conquer and Rule with Zapsters.",
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/Game of Thrones.ttf" as="font" type="font/ttf" crossOrigin="anonymous"/>
      </head>
      <body className="antialiased bg-black text-white" suppressHydrationWarning>
        <GoogleProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </GoogleProvider>
        <MusicProvider />
      </body>
    </html>
  );
}
