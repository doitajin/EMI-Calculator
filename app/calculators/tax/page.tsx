'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useFinanceStore } from '@/store/useFinanceStore';

export default function TaxCalculator() {
  const [income, setIncome] = useState<number>(85000);
  const [filingStatus, setFilingStatus] = useState<string>('single');
  const [state, setState] = useState<string>('ca');

  const {
    federalTax,
    stateTax,
    ficaTax,
    totalTax,
    takeHome,
    effectiveRate
  } = useMemo(() => {
    // Highly simplified mock brackets for demonstration
    // Federal
    let fed = 0;
    if (filingStatus === 'single') {
      fed = income * 0.15; // Mock 15% effective flat for single
    } else {
      fed = income * 0.12; // Mock 12% effective flat for married
    }

    // State
    let st = 0;
    if (state === 'ca') st = income * 0.08;
    if (state === 'tx') st = 0;
    if (state === 'ny') st = income * 0.06;

    // FICA (Social Security & Medicare) ~7.65%
    const fica = income * 0.0765;

    const total = fed + st + fica;
    const net = income - total;
    const rate = (total / income) * 100;

    return {
      federalTax: fed,
      stateTax: st,
      ficaTax: fica,
      totalTax: total,
      takeHome: net,
      effectiveRate: rate || 0
    };
  }, [income, filingStatus, state]);

  const { currency } = useFinanceStore();
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(val);

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">Tax &gt; Estimation</div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Salary & Income Tax Estimator</h1>
        </div>
        <div className="hidden sm:flex space-x-2">
          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold rounded uppercase tracking-wider">Updated 2024</span>
          <span className="px-2 py-1 bg-muted text-muted-foreground text-[10px] font-bold rounded uppercase tracking-wider">v1.0.0</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        <Card className="xl:col-span-5 rounded-2xl border-border shadow-sm">
          <CardHeader>
            <CardTitle>Income Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Annual Gross Income</Label>
              <Input 
                type="number" 
                value={income} 
                onChange={(e) => setIncome(Number(e.target.value))}
                className="text-lg font-medium"
              />
            </div>

            <div className="space-y-3">
              <Label>Filing Status</Label>
              <Select value={filingStatus} onValueChange={(val) => val && setFilingStatus(val)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married Filing Jointly</SelectItem>
                  <SelectItem value="separate">Married Filing Separately</SelectItem>
                  <SelectItem value="head">Head of Household</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>State</Label>
              <Select value={state} onValueChange={(val) => val && setState(val)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ca">California</SelectItem>
                  <SelectItem value="tx">Texas</SelectItem>
                  <SelectItem value="ny">New York</SelectItem>
                  <SelectItem value="wa">Washington</SelectItem>
                  <SelectItem value="fl">Florida</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <p className="text-xs text-muted-foreground">
              * Note: This is a simplified estimation using standard deductions and average tax brackets. Actual tax liability may vary.
            </p>
          </CardContent>
        </Card>

        <Card className="xl:col-span-7 rounded-2xl border-border shadow-sm">
          <CardHeader>
            <CardTitle>Your Estimated Take-Home Pay</CardTitle>
            <CardDescription>Based on the details provided</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center p-8 bg-primary text-primary-foreground rounded-2xl shadow-lg shadow-primary/20">
              <p className="text-xs font-bold opacity-80 uppercase tracking-wider mb-1">Estimated Annual Net Pay</p>
              <p className="text-5xl font-bold mt-2">{formatCurrency(takeHome)}</p>
              <div className="mt-4 inline-flex items-center space-x-2 bg-primary-foreground/10 px-3 py-1 rounded-full text-sm font-medium">
                <span>Monthly:</span>
                <span className="font-bold">{formatCurrency(takeHome / 12)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold tracking-tight">Tax Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center py-1">
                  <span className="text-muted-foreground">Gross Pay</span>
                  <span className="font-medium">{formatCurrency(income)}</span>
                </div>
                <div className="flex justify-between items-center py-1 text-red-500/80">
                  <span>Federal Income Tax</span>
                  <span>- {formatCurrency(federalTax)}</span>
                </div>
                <div className="flex justify-between items-center py-1 text-red-500/80">
                  <span>State Income Tax</span>
                  <span>- {formatCurrency(stateTax)}</span>
                </div>
                <div className="flex justify-between items-center py-1 text-red-500/80">
                  <span>FICA (Social Security & Medicare)</span>
                  <span>- {formatCurrency(ficaTax)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between items-center py-1 font-semibold text-base">
                  <span>Total Taxes</span>
                  <span>{formatCurrency(totalTax)}</span>
                </div>
                <div className="flex justify-between items-center py-1 text-muted-foreground">
                  <span>Effective Tax Rate</span>
                  <span>{effectiveRate.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
