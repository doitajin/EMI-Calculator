'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
} from 'recharts';

export default function PaymentCalculator() {
  const [principal, setPrincipal] = useState<number>(250000);
  const [interestRate, setInterestRate] = useState<number>(5);
  const [loanTerm, setLoanTerm] = useState<number>(30); // years
  const [extraPayment, setExtraPayment] = useState<number>(0);

  const { standardMonthly, totalMonths, totalInterest, totalPayment, schedule, annualSchedule } = useMemo(() => {
    const p = principal;
    const r = interestRate / 100 / 12;
    const n = loanTerm * 12;

    const monthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    
    let balance = p;
    let months = 0;
    let totalInterest = 0;
    const schedule = [];
    const annualSchedule = [];
    
    let annualInterest = 0;
    let annualPrincipal = 0;
    
    while (balance > 0 && months < n * 2) {
      months++;
      const interest = balance * r;
      const principalPaid = Math.min(balance, monthlyPayment - interest + extraPayment);
      totalInterest += interest;
      balance -= principalPaid;
      
      annualInterest += interest;
      annualPrincipal += principalPaid;
      
      schedule.push({
        month: months,
        principal: principalPaid,
        interest: interest,
        balance: Math.max(0, balance)
      });
      
      if (months % 12 === 0 || balance <= 0) {
        annualSchedule.push({
          year: Math.ceil(months / 12),
          principal: annualPrincipal,
          interest: annualInterest,
          balance: Math.max(0, balance)
        });
        annualInterest = 0;
        annualPrincipal = 0;
      }
      if (balance <= 0) break;
    }

    return {
      standardMonthly: monthlyPayment,
      totalMonths: months,
      totalInterest: totalInterest,
      totalPayment: p + totalInterest,
      schedule,
      annualSchedule
    };
  }, [principal, interestRate, loanTerm, extraPayment]);

  const formatCurrency = (val: number, digits = 0) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: digits }).format(val);

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payment Calculator</h1>
        <p className="text-muted-foreground mt-2">See how extra payments can reduce your loan term and interest.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="rounded-2xl border-border shadow-sm">
          <CardHeader>
            <CardTitle>Loan Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="principal">Loan Amount ($)</Label>
              <Input id="principal" type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate">Interest Rate (%)</Label>
              <Input id="rate" type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="term">Loan Term (Years)</Label>
              <Input id="term" type="number" value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="extra">Extra Monthly Payment ($)</Label>
              <Input id="extra" type="number" value={extraPayment} onChange={(e) => setExtraPayment(Number(e.target.value))} />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border shadow-sm bg-muted/10">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Standard Monthly Payment</p>
              <p className="text-3xl font-bold">{formatCurrency(standardMonthly, 2)}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xs text-muted-foreground">Time to Pay Off</p>
                <p className="font-semibold">{(totalMonths / 12).toFixed(1)} Years</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Interest</p>
                <p className="font-semibold">{formatCurrency(totalInterest, 2)}</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={schedule.filter((_, i) => i % Math.ceil(totalMonths / 20) === 0)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(val: any) => formatCurrency(Number(val), 0)} />
                  <Area type="monotone" dataKey="balance" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Amortization Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="annual">
            <TabsList>
              <TabsTrigger value="annual">Annual</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
            <TabsContent value="annual">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Year</TableHead>
                    <TableHead>Principal Paid</TableHead>
                    <TableHead>Interest Paid</TableHead>
                    <TableHead>Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {annualSchedule.map((row) => (
                    <TableRow key={row.year}>
                      <TableCell>{row.year}</TableCell>
                      <TableCell>{formatCurrency(row.principal, 2)}</TableCell>
                      <TableCell>{formatCurrency(row.interest, 2)}</TableCell>
                      <TableCell>{formatCurrency(row.balance, 2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="monthly">
              <div className="max-h-96 overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Principal</TableHead>
                      <TableHead>Interest</TableHead>
                      <TableHead>Balance</TableHead>
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
