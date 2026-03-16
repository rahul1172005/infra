import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
 title: "Zapsters — Command Center",
 description: "Next-generation competitive hacking platform and battle arena.",
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
 <html lang="en"suppressHydrationWarning>
 <head>
 <link rel="preload"href="/adieu-regular.otf"as="font"type="font/otf"crossOrigin="anonymous"/>
 </head>
 <body
 className="antialiased bg-black text-white font-['Adieu']"
 suppressHydrationWarning
 style={{ fontFamily: "'Adieu', sans-serif"}}
 >
 {children}
 </body>
 </html>
 );
}
