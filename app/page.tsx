import type { Metadata } from 'next';
import Link from 'next/link';
import { CATEGORIES, CALCULATORS } from '@/lib/calculators';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calculator } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'FinSuite | Free Online Financial Calculators',
  description: 'Access 15+ free professional financial calculators for loans, retirement, savings, investments, and taxes. Simplify your financial planning with FinSuite.',
  keywords: ['financial calculator', 'loan calculator', 'mortgage calculator', 'retirement planner', 'savings goal', 'investment calculator', 'FinSuite'],
};

export default function Home() {
  return (
    <div className="flex-1 w-full max-w-6xl mx-auto space-y-12">
      <div className="flex flex-col items-center text-center space-y-4 mb-8 pt-8">
        <Badge variant="secondary" className="px-3 py-1 text-[10px] font-bold rounded uppercase tracking-wider text-primary bg-primary/10">
          FinSuite v1.0
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Financial Clarity, <span className="text-primary">Instantly.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A comprehensive suite of professional financial calculators designed to help you make better decisions with loans, investments, and daily banking.
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Popular Calculators</h2>
            <Button variant="ghost" className="gap-2">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CALCULATORS.map((calc) => (
              <Link key={calc.id} href={calc.path}>
                <Card className="h-full group transition-all hover:scale-[1.01]">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="p-3 bg-background rounded-2xl shadow-[4px_4px_8px_#acacac,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0d0d0d,-4px_-4px_8px_#272727] text-primary transition-colors">
                        <Calculator className="h-5 w-5" />
                      </div>
                      <Badge variant="outline" className="capitalize text-[10px] font-bold tracking-wider border-0 bg-background/50 shadow-[inset_2px_2px_4px_#acacac,inset_-2px_-2px_4px_#ffffff] dark:shadow-[inset_2px_2px_4px_#0d0d0d,inset_-2px_-2px_4px_#272727]">
                        {calc.category}
                      </Badge>
                    </div>
                    <CardTitle className="pt-4 text-lg">{calc.name}</CardTitle>
                    <CardDescription className="text-sm">{calc.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link key={cat.id} href={`/category/${cat.id}`}>
                  <Card className="transition-all hover:scale-[1.02]">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-3">
                      <div className="p-4 bg-background rounded-2xl shadow-[4px_4px_8px_#acacac,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0d0d0d,-4px_-4px_8px_#272727]">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <span className="font-medium">{cat.name}</span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
