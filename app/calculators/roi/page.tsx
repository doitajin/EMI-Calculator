'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ROICalculator() {
  const [initialInvestment, setInitialInvestment] = useState<number>(10000);
  const [finalValue, setFinalValue] = useState<number>(15000);

  const { roi, netProfit } = useMemo(() => {
    const netProfit = finalValue - initialInvestment;
    const roi = (netProfit / initialInvestment) * 100;
    return { roi, netProfit };
  }, [initialInvestment, finalValue]);

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ROI Calculator</h1>
        <p className="text-muted-foreground mt-2">Calculate your Return on Investment.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="rounded-2xl border-border shadow-sm">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="initial">Initial Investment ($)</Label>
              <Input id="initial" type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="final">Final Value ($)</Label>
              <Input id="final" type="number" value={finalValue} onChange={(e) => setFinalValue(Number(e.target.value))} />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border shadow-sm bg-muted/10">
          <CardContent className="p-6 space-y-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">ROI</p>
              <p className="text-4xl font-bold text-primary">{roi.toFixed(2)}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Net Profit</p>
              <p className="text-2xl font-semibold">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(netProfit)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
