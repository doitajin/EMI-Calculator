'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTenure, setLoanTenure] = useState<number>(5); // years

  const { monthlyEMI, totalInterest, totalPayment, schedule } = useMemo(() => {
    const p = loanAmount;
    const r = interestRate / 100 / 12;
    const n = loanTenure * 12;

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emi * n;
    
    let outstanding = p;
    const schedule = [];
    for (let i = 1; i <= n; i++) {
      const interest = outstanding * r;
      const principal = emi - interest;
      outstanding -= principal;
      schedule.push({
        month: i,
        principal: principal,
        interest: interest,
        balance: Math.max(0, outstanding)
      });
    }

    return {
      monthlyEMI: emi,
      totalInterest: total - p,
      totalPayment: total,
      schedule
    };
  }, [loanAmount, interestRate, loanTenure]);

  const data = [
    { name: 'Principal Amount', value: loanAmount },
    { name: 'Interest Amount', value: totalInterest },
  ];

  const COLORS = ['#3b82f6', '#f59e0b'];

  const formatCurrency = (val: number, fractionDigits = 0) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: fractionDigits }).format(val);

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">EMI Calculator</h1>
        <p className="text-muted-foreground mt-2">Calculate your Equated Monthly Installment (EMI) for your loan.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="rounded-2xl border-border shadow-sm">
          <CardContent className="p-6 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label htmlFor="amount">Loan Amount ($)</Label>
                <span className="font-mono font-bold text-primary">{formatCurrency(loanAmount)}</span>
              </div>
              <Slider id="amount" min={1000} max={5000000} step={1000} value={[loanAmount]} onValueChange={(val: number | readonly number[]) => setLoanAmount(Array.isArray(val) ? val[0] : val)} />
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label htmlFor="rate">Interest Rate (%)</Label>
                <span className="font-mono font-bold text-primary">{interestRate}%</span>
              </div>
              <Slider id="rate" min={1} max={30} step={0.1} value={[interestRate]} onValueChange={(val: number | readonly number[]) => setInterestRate(Array.isArray(val) ? val[0] : val)} />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label htmlFor="tenure">Loan Tenure (Years)</Label>
                <span className="font-mono font-bold text-primary">{loanTenure} Years</span>
              </div>
              <Slider id="tenure" min={1} max={30} step={1} value={[loanTenure]} onValueChange={(val: number | readonly number[]) => setLoanTenure(Array.isArray(val) ? val[0] : val)} />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border shadow-sm bg-muted/10">
          <CardContent className="p-6 space-y-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Monthly EMI</p>
              <p className="text-4xl font-bold text-primary">{formatCurrency(monthlyEMI, 2)}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xs text-muted-foreground">Total Interest</p>
                <p className="font-semibold">{formatCurrency(totalInterest)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Payment</p>
                <p className="font-semibold">{formatCurrency(totalPayment)}</p>
              </div>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => formatCurrency(Number(value))} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl border-border shadow-sm">
        <CardHeader>
          <CardTitle>Amortization Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-96 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Principal</TableHead>
                  <TableHead>Interest</TableHead>
                  <TableHead>Outstanding Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedule.map((row) => (
                  <TableRow key={row.month}>
                    <TableCell>{row.month}</TableCell>
                    <TableCell>{formatCurrency(row.principal, 2)}</TableCell>
                    <TableCell>{formatCurrency(row.interest, 2)}</TableCell>
                    <TableCell>{formatCurrency(row.balance, 2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
