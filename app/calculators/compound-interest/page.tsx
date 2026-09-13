'use client';

import { useState, useMemo } from 'react';
import { Info } from 'lucide-react';
import { useFinanceStore } from '@/store/useFinanceStore';
import { CalculatorWrapper } from '@/components/CalculatorWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export default function CompoundInterestCalculator() {
  const { currency } = useFinanceStore();
  const [principal, setPrincipal] = useState<number>(10000);
  const [rate, setRate] = useState<number>(7); // Annual interest rate in %
  const [years, setYears] = useState<number>(10);
  const [compoundsPerYear, setCompoundsPerYear] = useState<number>(12); // Monthly

  const { totalBalance, totalInterest, chartData, schedule } = useMemo(() => {
    const p = principal;
    const r = rate / 100;
    const n = compoundsPerYear;
    const t = years;

    const data = [];
    const schedule = [];
    let currentBalance = p;
    let totalInterestAccrued = 0;

    for (let year = 0; year <= t; year++) {
      const balanceAtYearStart = p * Math.pow(1 + r / n, n * year);
      const balanceAtYearEnd = p * Math.pow(1 + r / n, n * (year + 1));
      
      data.push({ year, balance: Math.round(balanceAtYearStart) });
      
      if (year < t) {
        schedule.push({
          year: year + 1,
          startBalance: balanceAtYearStart,
          interest: balanceAtYearEnd - balanceAtYearStart,
          endBalance: balanceAtYearEnd
        });
      }
      currentBalance = balanceAtYearEnd;
    }

    const finalBalance = p * Math.pow(1 + r / n, n * t);
    const interest = finalBalance - p;

    return { totalBalance: finalBalance, totalInterest: interest, chartData: data, schedule };
  }, [principal, rate, years, compoundsPerYear]);

  const formatCurrency = (val: number, digits = 0) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, maximumFractionDigits: digits }).format(val);

  return (
    <CalculatorWrapper 
      title="Compound Interest Calculator" 
      description="See how your investments grow over time."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="rounded-2xl border-border shadow-sm">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="principal">Initial Investment</Label>
                <div title="The amount you start with.">
                  <Info className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <Input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="rate">Annual Interest Rate (%)</Label>
                <div title="The annual interest rate (APY).">
                  <Info className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="years">Investment Term (Years)</Label>
                <div title="How long you will invest.">
                  <Info className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border shadow-sm bg-muted/10">
          <CardContent className="p-6 space-y-6">
            <div className="text-center p-4 rounded-xl bg-primary/5 border border-primary/10">
              <p className="text-sm font-medium text-muted-foreground">Total Balance</p>
              <p className="text-4xl font-bold text-primary mt-1">{formatCurrency(totalBalance, 2)}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xs text-muted-foreground">Total Interest</p>
                <p className="font-semibold">{formatCurrency(totalInterest, 2)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Initial</p>
                <p className="font-semibold">{formatCurrency(principal)}</p>
              </div>
            </div>
            
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: any) => formatCurrency(Number(value), 0)}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl border-border shadow-sm">
        <CardHeader>
          <CardTitle>Annual Growth Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden max-h-96 overflow-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Year</TableHead>
                  <TableHead>Start Balance</TableHead>
                  <TableHead>Interest Earned</TableHead>
                  <TableHead>End Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedule.map((row) => (
                  <TableRow key={row.year} className="hover:bg-muted/30">
                    <TableCell>{row.year}</TableCell>
                    <TableCell>{formatCurrency(row.startBalance, 2)}</TableCell>
                    <TableCell>{formatCurrency(row.interest, 2)}</TableCell>
                    <TableCell>{formatCurrency(row.endBalance, 2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </CalculatorWrapper>
  );
}
