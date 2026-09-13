'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function NetWorthCalculator() {
  const [assets, setAssets] = useState<number>(100000);
  const [liabilities, setLiabilities] = useState<number>(50000);

  const netWorth = assets - liabilities;

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Net Worth Calculator</h1>
        <p className="text-muted-foreground mt-2">Calculate your total assets minus your liabilities.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader><CardTitle>Financial Summary</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Total Assets ($)</Label>
              <Input type="number" value={assets} onChange={(e) => setAssets(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Total Liabilities ($)</Label>
              <Input type="number" value={liabilities} onChange={(e) => setLiabilities(Number(e.target.value))} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/10">
          <CardHeader><CardTitle>Result</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-full">
            <p className="text-sm text-muted-foreground">Your Estimated Net Worth</p>
            <p className="text-5xl font-bold text-primary">{formatCurrency(netWorth)}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
