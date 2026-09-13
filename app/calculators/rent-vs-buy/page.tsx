'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function RentVsBuyCalculator() {
  const [rentAmount, setRentAmount] = useState<number>(2000);
  const [homePrice, setHomePrice] = useState<number>(400000);
  const [years, setYears] = useState<number>(10);
  const [appreciationRate, setAppreciationRate] = useState<number>(3);

  const results = useMemo(() => {
    const rentCost = rentAmount * 12 * years;
    
    // Highly simplified: (Price * (1+Appreciation)^Years) - Price
    const homeValueAfterYears = homePrice * Math.pow(1 + appreciationRate / 100, years);
    const homeGain = homeValueAfterYears - homePrice;

    return {
      totalRentCost: rentCost,
      homeGain
    };
  }, [rentAmount, homePrice, years, appreciationRate]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Rent vs. Buy Calculator</h1>
        <p className="text-muted-foreground mt-2">Compare the financial impact of renting versus buying a home.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader><CardTitle>Scenario Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Monthly Rent ($)</Label>
              <Input type="number" value={rentAmount} onChange={(e) => setRentAmount(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Home Purchase Price ($)</Label>
              <Input type="number" value={homePrice} onChange={(e) => setHomePrice(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Time Horizon (Years)</Label>
              <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Annual Home Appreciation (%)</Label>
              <Input type="number" step="0.1" value={appreciationRate} onChange={(e) => setAppreciationRate(Number(e.target.value))} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/10">
          <CardHeader><CardTitle>Summary</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Cost of Renting</p>
              <p className="text-2xl font-bold">{formatCurrency(results.totalRentCost)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Projected Home Gain</p>
              <p className="text-2xl font-bold text-primary">{formatCurrency(results.homeGain)}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
