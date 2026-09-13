'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function EmergencySavingsCalculator() {
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(3000);
  const [monthsOfCoverage, setMonthsOfCoverage] = useState<number>(6);

  const targetSavings = monthlyExpenses * monthsOfCoverage;

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Emergency Savings Calculator</h1>
        <p className="text-muted-foreground mt-2">Determine how much you should save for emergencies.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader><CardTitle>Setup</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Monthly Essential Expenses ($)</Label>
              <Input type="number" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Months of Coverage Desired</Label>
              <Input type="number" value={monthsOfCoverage} onChange={(e) => setMonthsOfCoverage(Number(e.target.value))} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/10">
          <CardHeader><CardTitle>Target Savings</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-full">
            <p className="text-sm text-muted-foreground">Recommended Emergency Fund</p>
            <p className="text-5xl font-bold text-primary">{formatCurrency(targetSavings)}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
