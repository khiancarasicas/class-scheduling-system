import type { Metadata } from "next";
import "@/ui/global.css";
import { inter } from "../ui/fonts";
import { ThemeProvider } from "@/shadcn/theme-provider";

export const metadata: Metadata = {
  title: "Class Scheduling System",
  description: "STI College Legazpi's Class Scheduling System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange> {children}</ThemeProvider>
      </body>
    </html>
  );
}
