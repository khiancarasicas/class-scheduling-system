import type { Metadata } from "next";
import "@/ui/global.css";
import { inter } from "../ui/fonts";
import { ThemeProvider } from "@/shadcn/theme-provider";
import { SidebarInset, SidebarProvider } from "@/shadcn/components/ui/sidebar";
import { SiteHeader } from "@/shadcn/components/site-header";
import { AppSidebar } from "@/shadcn/components/app-sidebar";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="[--header-height:calc(--spacing(14))]">
            <SidebarProvider className="flex flex-col border-l">
              <div className="h-1 bg-primary" />
              <SiteHeader />
              <div className="flex flex-1">
                <AppSidebar />
                <SidebarInset className="py-4 px-6 w-full overflow-hidden">
                  {children}
                </SidebarInset>
              </div>
            </SidebarProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
