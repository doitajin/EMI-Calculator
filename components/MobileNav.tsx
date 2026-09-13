'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CATEGORIES, CALCULATORS } from '@/lib/calculators';
import { cn } from '@/lib/utils';
import { Calculator, Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { motion, AnimatePresence } from 'motion/react';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const activeCategories = CATEGORIES.filter(cat => CALCULATORS.find(calc => calc.category === cat.id));

  return (
    <div className="flex md:hidden items-center justify-between w-full">
      <Link href="/" className="flex items-center tracking-tight text-base font-bold">
        <div className="h-9 w-9 rounded-2xl bg-background shadow-[4px_4px_8px_#acacac,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0d0d0d,-4px_-4px_8px_#272727] flex items-center justify-center mr-2.5 text-primary">
          <Calculator className="h-4 w-4" />
        </div>
        FinSuite
      </Link>

      <button
        onClick={() => setIsOpen(true)}
        className="p-2.5 rounded-2xl bg-background shadow-[4px_4px_8px_#acacac,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0d0d0d,-4px_-4px_8px_#272727] text-primary transition-all active:scale-95"
        aria-label="Open Menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 z-50 backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-background z-50 shadow-2xl p-6 flex flex-col border-r border-border/40"
            >
              <div className="flex items-center justify-between pb-6 border-b border-border/40">
                <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center tracking-tight text-lg font-bold">
                  <div className="h-10 w-10 rounded-2xl bg-background shadow-[4px_4px_8px_#acacac,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0d0d0d,-4px_-4px_8px_#272727] flex items-center justify-center mr-3 text-primary">
                    <Calculator className="h-5 w-5" />
                  </div>
                  FinSuite
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-background shadow-[3px_3px_6px_#acacac,-3px_-3px_6px_#ffffff] dark:shadow-[3px_3px_6px_#0d0d0d,-3px_-3px_6px_#272727] text-muted-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 space-y-2">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-2xl transition-all",
                    pathname === '/' 
                      ? "bg-background shadow-[inset_3px_3px_6px_#acacac,inset_-3px_-3px_6px_#ffffff] dark:shadow-[inset_3px_3px_6px_#0d0d0d,inset_-3px_-3px_6px_#272727] text-primary" 
                      : "text-muted-foreground hover:text-foreground"
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
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-2xl transition-all",
                        isActive
                          ? "bg-background shadow-[inset_3px_3px_6px_#acacac,inset_-3px_-3px_6px_#ffffff] dark:shadow-[inset_3px_3px_6px_#0d0d0d,inset_-3px_-3px_6px_#272727] text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {category.name}
                    </Link>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Appearance</span>
                <ThemeToggle />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
