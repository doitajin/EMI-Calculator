import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CATEGORIES, CALCULATORS } from '@/lib/calculators';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    id: category.id,
  }));
}

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = CATEGORIES.find(c => c.id === id);
  
  if (!category) {
    notFound();
  }

  const categoryCalculators = CALCULATORS.filter(c => c.category === id);
  const Icon = category.icon;

  return (
    <div className="flex-1 px-4 py-8 md:px-8 max-w-6xl mx-auto w-full">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-primary/10 rounded-xl text-primary">
          <Icon className="h-8 w-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{category.name} Calculators</h1>
          <p className="text-muted-foreground mt-1">
            {categoryCalculators.length} {categoryCalculators.length === 1 ? 'calculator' : 'calculators'} available
          </p>
        </div>
      </div>

      {categoryCalculators.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryCalculators.map((calc) => (
            <Link key={calc.id} href={calc.path}>
              <Card className="h-full hover:border-primary/50 transition-colors group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Calculator className="h-5 w-5" />
                    </div>
                  </div>
                  <CardTitle className="pt-4">{calc.name}</CardTitle>
                  <CardDescription>{calc.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-muted/20 rounded-2xl border border-dashed">
          <Calculator className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
          <h3 className="text-xl font-semibold">Coming Soon</h3>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            We are actively building the calculators for the {category.name} category. Check back soon for updates.
          </p>
        </div>
      )}
    </div>
  );
}
