import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/lib/theme-context";

export const metadata: Metadata = {
  title: "Veyra",
  description: "Veyra - Your AI-Powered Conversation Partner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#f87171",
          colorBackground: "#fef7f7",
          colorInputBackground: "#ffffff",
          colorInputText: "#1f2937",
          fontFamily: "inherit",
        },
        elements: {
          formButtonPrimary:
            "bg-coral-500 hover:bg-coral-600 text-white font-medium rounded-xl",
          card: "shadow-xl rounded-2xl border border-coral-200",
          headerTitle: "text-gray-900 font-bold",
          headerSubtitle: "text-coral-600",
        },
      }}
    >
      <html lang="en">
        <body className="antialiased coral-gradient-subtle text-gray-900 dark:text-white transition-all duration-300">
          <ThemeProvider>
            {children}
            <Toaster position="top-center" richColors />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
