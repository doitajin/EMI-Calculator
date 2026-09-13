'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function DebtPayoffCalculator() {
  const [balance, setBalance] = useState<number>(20000);
  const [interestRate, setInterestRate] = useState<number>(15);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(500);
  const [extraPayment, setExtraPayment] = useState<number>(100);

  const results = useMemo(() => {
    let currentBalance = balance;
    const rate = interestRate / 100 / 12;
    const totalMonthly = monthlyPayment + extraPayment;
    let months = 0;
    let totalInterest = 0;

    if (totalMonthly <= balance * rate) return { months: -1, totalInterest: -1 };

    while (currentBalance > 0 && months < 600) {
      const interest = currentBalance * rate;
      const principal = totalMonthly - interest;
      
      currentBalance -= principal;
      totalInterest += interest;
      months++;
    }

    return { months, totalInterest };
  }, [balance, interestRate, monthlyPayment, extraPayment]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Accelerated Debt Payoff</h1>
        <p className="text-muted-foreground mt-2">See how extra payments reduce your debt time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader><CardTitle>Loan Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Total Balance ($)</Label>
              <Input type="number" value={balance} onChange={(e) => setBalance(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Interest Rate (%)</Label>
              <Input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Minimum Payment ($)</Label>
              <Input type="number" value={monthlyPayment} onChange={(e) => setMonthlyPayment(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Extra Payment ($)</Label>
              <Input type="number" value={extraPayment} onChange={(e) => setExtraPayment(Number(e.target.value))} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/10">
          <CardHeader><CardTitle>Results</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {results.months === -1 ? (
              <p className="text-red-500">Payment too low to cover interest.</p>
            ) : (
              <>
                <div>
                  <p className="text-sm text-muted-foreground">Time to Payoff</p>
                  <p className="text-3xl font-bold text-primary">{results.months} months</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Interest Paid</p>
                  <p className="text-3xl font-bold">{formatCurrency(results.totalInterest)}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
