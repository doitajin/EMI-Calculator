'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CATEGORIES, CALCULATORS } from '@/lib/calculators';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calculator } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Sidebar() {
  const pathname = usePathname();
  const activeCategories = CATEGORIES.filter(cat => CALCULATORS.find(calc => calc.category === cat.id));

  return (
    <aside className="w-64 border-r border-border bg-card hidden md:block h-screen sticky top-0 flex-shrink-0">
      <div className="flex flex-col h-full">
        <div className="flex h-16 items-center justify-between px-6 border-b border-border/40">
          <Link href="/" className="flex items-center tracking-tight text-lg font-bold">
            <div className="h-10 w-10 rounded-2xl bg-background shadow-[4px_4px_8px_#acacac,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0d0d0d,-4px_-4px_8px_#272727] flex items-center justify-center mr-3 text-primary">
              <Calculator className="h-5 w-5" />
            </div>
            FinSuite
          </Link>
          <ThemeToggle />
        </div>
        <ScrollArea className="flex-1 py-4">
          <nav className="p-4 space-y-2">
            <Link
              href="/"
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-2xl transition-all",
                pathname === '/' 
                  ? "bg-background shadow-[inset_3px_3px_6px_#acacac,inset_-3px_-3px_6px_#ffffff] dark:shadow-[inset_3px_3px_6px_#0d0d0d,inset_-3px_-3px_6px_#272727] text-primary" 
                  : "text-muted-foreground hover:shadow-[3px_3px_6px_#acacac,-3px_-3px_6px_#ffffff] dark:hover:shadow-[3px_3px_6px_#0d0d0d,-3px_-3px_6px_#272727] hover:text-foreground"
              )}
            >
              <Calculator className="h-4 w-4" />
              All Calculators
            </Link>
            <div className="pt-4 pb-2 px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Categories
            </div>
            {activeCategories.map((category) => {
              const Icon = category.icon;
              const isActive = pathname === `/category/${category.id}`;
              return (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-2xl transition-all",
                    isActive
                      ? "bg-background shadow-[inset_3px_3px_6px_#acacac,inset_-3px_-3px_6px_#ffffff] dark:shadow-[inset_3px_3px_6px_#0d0d0d,inset_-3px_-3px_6px_#272727] text-primary"
                      : "text-muted-foreground hover:shadow-[3px_3px_6px_#acacac,-3px_-3px_6px_#ffffff] dark:hover:shadow-[3px_3px_6px_#0d0d0d,-3px_-3px_6px_#272727] hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {category.name}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>
        
      </div>
    </aside>
  );
}
