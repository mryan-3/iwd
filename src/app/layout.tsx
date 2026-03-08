import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "International Women's Day",
  description: "Send a beautiful letter to someone special",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Jost:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-warm-white text-purple-600 selection:bg-purple-100 selection:text-purple-500">
        {children}

      </body>
    </html>
  );
}

