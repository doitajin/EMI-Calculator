'use client';

import { useState, useMemo } from 'react';
import { Info } from 'lucide-react';
import { useFinanceStore } from '@/store/useFinanceStore';
import { CalculatorWrapper } from '@/components/CalculatorWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CollegeSavingsCalculator() {
  const { currency } = useFinanceStore();
  const [targetCost, setTargetCost] = useState<number>(100000);
  const [yearsToCollege, setYearsToCollege] = useState<number>(10);
  const [currentSavings, setCurrentSavings] = useState<number>(10000);
  const [expectedReturn, setExpectedReturn] = useState<number>(6);

  const monthlySavingsNeeded = useMemo(() => {
    const rate = expectedReturn / 100 / 12;
    const months = yearsToCollege * 12;
    
    const futureValueCurrent = currentSavings * Math.pow(1 + rate, months);
    const remainingNeeded = targetCost - futureValueCurrent;
    
    const pmt = remainingNeeded / ((Math.pow(1 + rate, months) - 1) / rate);
    return pmt > 0 ? pmt : 0;
  }, [targetCost, yearsToCollege, currentSavings, expectedReturn]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, maximumFractionDigits: 0 }).format(val);

  return (
    <CalculatorWrapper 
      title="College Savings Calculator" 
      description="Estimate monthly savings needed for future education."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="rounded-2xl border-border shadow-sm">
          <CardHeader><CardTitle>College Goal</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label>Target Total Cost</Label>
                <div title="The total estimated cost for education.">
                  <Info className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <Input type="number" value={targetCost} onChange={(e) => setTargetCost(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label>Years Until College</Label>
                <div title="The number of years until you need the funds.">
                  <Info className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <Input type="number" value={yearsToCollege} onChange={(e) => setYearsToCollege(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label>Current Savings</Label>
                <div title="Amount already saved for this goal.">
                  <Info className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <Input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label>Expected Annual Return (%)</Label>
                <div title="Estimated annual investment return rate.">
                  <Info className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <Input type="number" step="0.1" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border shadow-sm bg-muted/10">
          <CardHeader><CardTitle>Result</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-full p-6">
            <div className="text-center p-4 rounded-xl bg-primary/5 border border-primary/10 w-full">
              <p className="text-sm font-medium text-muted-foreground">Required Monthly Savings</p>
              <p className="text-4xl font-bold text-primary mt-1">{formatCurrency(monthlySavingsNeeded)}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </CalculatorWrapper>
  );
}
