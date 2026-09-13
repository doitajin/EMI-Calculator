'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useFinanceStore } from '@/store/useFinanceStore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CALCULATORS } from '@/lib/calculators';
import { ThemeToggle } from './ThemeToggle';
import { MobileNav } from './MobileNav';
import { X, Search } from 'lucide-react';

export function Header() {
  const { currency, setCurrency } = useFinanceStore();

  const [search, setSearch] = useState('');
  const filteredCalculators = CALCULATORS.filter(calc => 
    calc.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 md:px-8 flex-shrink-0 sticky top-0 z-10">
      <MobileNav />
      <div className="relative w-full max-w-sm hidden sm:block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
          <Search className="h-4 w-4" />
        </span>
        <input 
          type="text" 
          placeholder="Search 100+ calculators..." 
          className="w-full pl-10 pr-10 py-2 bg-background border-0 rounded-[18px] text-sm shadow-[inset_4px_4px_8px_#acacac,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0d0d0d,inset_-4px_-4px_8px_#272727] focus:outline-none transition-all" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {search && (
          <div className="absolute top-full left-0 w-full mt-2 bg-background border-0 rounded-2xl shadow-[8px_8px_16px_#acacac,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0d0d0d,-8px_-8px_16px_#272727] max-h-60 overflow-y-auto z-50">
            {filteredCalculators.map(calc => (
              <Link key={calc.id} href={calc.path} className="block px-4 py-2 text-sm hover:bg-background/80 transition-colors" onClick={() => setSearch('')}>
                {calc.name}
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="hidden md:flex items-center space-x-4 ml-auto">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Base</span>
          <Select value={currency} onValueChange={(val) => val && setCurrency(val)}>
            <SelectTrigger className="w-[80px] h-9 bg-background border-0 rounded-[14px] shadow-[inset_2px_2px_4px_#acacac,inset_-2px_-2px_4px_#ffffff] dark:shadow-[inset_2px_2px_4px_#0d0d0d,inset_-2px_-2px_4px_#272727] text-sm font-medium focus:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
              <SelectItem value="JPY">JPY</SelectItem>
              <SelectItem value="CAD">CAD</SelectItem>
              <SelectItem value="AUD">AUD</SelectItem>
              <SelectItem value="INR">INR</SelectItem>
              <SelectItem value="CHF">CHF</SelectItem>
              <SelectItem value="CNY">CNY</SelectItem>
              <SelectItem value="SGD">SGD</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ThemeToggle />
      </div>

      {/* Mobile Right Controls */}
      <div className="flex md:hidden items-center space-x-2">
        <Select value={currency} onValueChange={(val) => val && setCurrency(val)}>
          <SelectTrigger className="w-[70px] h-8 bg-background border-0 rounded-[12px] shadow-[inset_2px_2px_4px_#acacac,inset_-2px_-2px_4px_#ffffff] dark:shadow-[inset_2px_2px_4px_#0d0d0d,inset_-2px_-2px_4px_#272727] text-xs font-medium focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="EUR">EUR</SelectItem>
            <SelectItem value="GBP">GBP</SelectItem>
            <SelectItem value="INR">INR</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </header>
  );
}
