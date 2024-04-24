import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import connectMongo from "@/lib/mongoose";
import { ThemeProvider } from "@/context/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const lexend = Lexend({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nidu",
  description: "Organiza tus finanzas",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connectMongo();
  return (
    <html lang="es">
      <head>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className="flex h-full flex-col min-h-screen bg-background font-sans antialiased">
        <main className={lexend.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div>{children}</div>
            <Toaster />
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
