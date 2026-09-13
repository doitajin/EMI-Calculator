import type {Metadata} from 'next';
import './globals.css';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from '@/components/ThemeProvider';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { PageTransition } from '@/components/PageTransition';

const geist = Geist({
  subsets:['latin'],
  variable:'--font-sans'
});

export const metadata: Metadata = {
  title: 'FinSuite - Financial Calculator Suite',
  description: 'A comprehensive suite of financial calculators for loans, investments, tax, and more.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen bg-background">
            <Sidebar />
            <main className="flex-1 flex flex-col min-w-0 min-h-screen overflow-y-auto">
              <Header />
              <div className="flex-1 p-4 md:p-10">
                <PageTransition>
                  {children}
                </PageTransition>
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
