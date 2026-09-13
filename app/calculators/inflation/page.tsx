'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function InflationCalculator() {
  const [amount, setAmount] = useState<number>(10000);
  const [years, setYears] = useState<number>(10);
  const [inflationRate, setInflationRate] = useState<number>(3);

  const futureValue = useMemo(() => {
    // PV * (1 + inflation)^years
    return amount * Math.pow(1 + inflationRate / 100, years);
  }, [amount, years, inflationRate]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Inflation Calculator</h1>
        <p className="text-muted-foreground mt-2">See how inflation impacts purchasing power over time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader><CardTitle>Inflation Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Amount ($)</Label>
              <Input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Years</Label>
              <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Annual Inflation Rate (%)</Label>
              <Input type="number" step="0.1" value={inflationRate} onChange={(e) => setInflationRate(Number(e.target.value))} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/10">
          <CardHeader><CardTitle>Result</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-full">
            <p className="text-sm text-muted-foreground">Future Equivalent Value</p>
            <p className="text-5xl font-bold text-primary">{formatCurrency(futureValue)}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
