'use client';

import { useState, useMemo } from 'react';
import { useFinanceStore } from '@/store/useFinanceStore';
import { CalculatorWrapper } from '@/components/CalculatorWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function RetirementCalculator() {
  const { currency } = useFinanceStore();
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [currentSavings, setCurrentSavings] = useState<number>(50000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [expectedReturn, setExpectedReturn] = useState<number>(7);

  const results = useMemo(() => {
    const years = retirementAge - currentAge;
    const months = years * 12;
    const rate = expectedReturn / 100 / 12;
    
    let balance = currentSavings;
    const chartData = [{ year: 0, balance: Math.round(balance) }];

    for (let i = 1; i <= months; i++) {
      balance = balance * (1 + rate) + monthlyContribution;
      if (i % 12 === 0) {
        chartData.push({ year: i / 12, balance: Math.round(balance) });
      }
    }

    return {
      finalBalance: balance,
      chartData
    };
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, expectedReturn]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, maximumFractionDigits: 0 }).format(val);

  return (
    <CalculatorWrapper 
      title="Retirement Calculator" 
      description="Plan your retirement nest egg."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader><CardTitle>Retirement Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Current Age</Label>
              <Input type="number" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Retirement Age</Label>
              <Input type="number" value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Current Savings</Label>
              <Input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Monthly Contribution</Label>
              <Input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Expected Annual Return (%)</Label>
              <Input type="number" step="0.1" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/10">
          <CardHeader><CardTitle>Summary</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Projected Balance at Retirement</p>
              <p className="text-4xl font-bold text-primary">{formatCurrency(results.finalBalance)}</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={results.chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(val: any) => formatCurrency(Number(val))} />
                  <Line type="monotone" dataKey="balance" stroke="#3b82f6" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </CalculatorWrapper>
  );
}
