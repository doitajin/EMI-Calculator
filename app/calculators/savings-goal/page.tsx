'use client';

import { useState, useMemo } from 'react';
import { useFinanceStore } from '@/store/useFinanceStore';
import { CalculatorWrapper } from '@/components/CalculatorWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SavingsGoalCalculator() {
  const { currency } = useFinanceStore();
  const [targetAmount, setTargetAmount] = useState<number>(100000);
  const [years, setYears] = useState<number>(10);
  const [currentSavings, setCurrentSavings] = useState<number>(10000);
  const [expectedReturn, setExpectedReturn] = useState<number>(5);

  const monthlyContribution = useMemo(() => {
    const rate = expectedReturn / 100 / 12;
    const months = years * 12;
    
    // Future Value of Current Savings: PV * (1+r)^n
    const futureValueCurrent = currentSavings * Math.pow(1 + rate, months);
    
    // Remaining amount needed: Target - FutureValueCurrent
    const remainingNeeded = targetAmount - futureValueCurrent;
    
    // Annuity Formula: PMT = FV / [((1+r)^n - 1) / r]
    const pmt = remainingNeeded / ((Math.pow(1 + rate, months) - 1) / rate);
    
    return pmt > 0 ? pmt : 0;
  }, [targetAmount, years, currentSavings, expectedReturn]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, maximumFractionDigits: 0 }).format(val);

  return (
    <CalculatorWrapper 
      title="Savings Goal Calculator" 
      description="Determine your required monthly savings to reach your target."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader><CardTitle>Goal Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Target Amount</Label>
              <Input type="number" value={targetAmount} onChange={(e) => setTargetAmount(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Time Horizon (Years)</Label>
              <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Current Savings</Label>
              <Input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Expected Annual Return (%)</Label>
              <Input type="number" step="0.1" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/10">
          <CardHeader><CardTitle>Result</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-full">
            <p className="text-sm text-muted-foreground">Required Monthly Savings</p>
            <p className="text-5xl font-bold text-primary">{formatCurrency(monthlyContribution)}</p>
          </CardContent>
        </Card>
      </div>
    </CalculatorWrapper>
  );
}
