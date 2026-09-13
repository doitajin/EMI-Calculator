'use client';

import { CalculatorWrapper } from '@/components/CalculatorWrapper';
import { useState, useMemo } from 'react';
import { Info } from 'lucide-react';
import { useFinanceStore } from '@/store/useFinanceStore';
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

export default function AutoLoanCalculator() {
  const { currency } = useFinanceStore();
  const [loanAmount, setLoanAmount] = useState<number>(25000);
  const [interestRate, setInterestRate] = useState<number>(5.5);
  const [loanTerm, setLoanTerm] = useState<number>(60);

  const { monthlyPayment, totalPayment, totalInterest, schedule, annualSchedule } = useMemo(() => {
    const p = loanAmount;
    const r = interestRate / 100 / 12;
    const n = loanTerm;

    const payment = (p * r * Math.pow(1 + r, n)) / 
                    (Math.pow(1 + r, n) - 1);
    
    let balance = p;
    let totalInterest = 0;
    const schedule = [];
    const annualSchedule = [];
    
    let annualInterest = 0;
    let annualPrincipal = 0;
    
    for (let i = 1; i <= n; i++) {
      const interest = balance * r;
      const principalPaid = payment - interest;
      balance -= principalPaid;
      totalInterest += interest;
      
      annualInterest += interest;
      annualPrincipal += principalPaid;
      
      schedule.push({
        month: i,
        principal: principalPaid,
        interest: interest,
        balance: Math.max(0, balance)
      });
      
      if (i % 12 === 0 || balance <= 0) {
        annualSchedule.push({
          year: Math.ceil(i / 12),
          principal: annualPrincipal,
          interest: annualInterest,
          balance: Math.max(0, balance)
        });
        annualInterest = 0;
        annualPrincipal = 0;
      }
    }

    return { 
      monthlyPayment: payment, 
      totalPayment: p + totalInterest, 
      totalInterest,
      schedule,
      annualSchedule 
    };
  }, [loanAmount, interestRate, loanTerm]);

  const formatCurrency = (val: number, digits = 0) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, maximumFractionDigits: digits }).format(val);

  return (
    <CalculatorWrapper 
      title="Auto Loan Calculator" 
      description="Calculate your monthly auto loan payments."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="neu-card">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="amount">Loan Amount</Label>
                  <div title="The total amount you are borrowing for the vehicle.">
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </div>
              </div>
              <Input className="neu-input" type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="rate">Interest Rate (%)</Label>
                <div title="The annual percentage rate (APR) of the loan.">
                  <Info className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <Input className="neu-input" type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="term">Loan Term (Months)</Label>
                <div title="The total duration of the loan in months.">
                  <Info className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <Input className="neu-input" type="number" value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} />
            </div>
          </CardContent>
        </Card>

        <Card className="neu-card bg-muted/10">
          <CardContent className="p-6 space-y-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Monthly Payment</p>
              <p className="text-4xl font-bold">{formatCurrency(monthlyPayment, 2)}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xs text-muted-foreground">Total Payment</p>
                <p className="font-semibold">{formatCurrency(totalPayment, 2)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Interest</p>
                <p className="font-semibold">{formatCurrency(totalInterest, 2)}</p>
              </div>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={schedule.filter((_, i) => i % Math.ceil(loanTerm / 20) === 0)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                   <Tooltip 
                    formatter={(val: any) => formatCurrency(Number(val), 0)}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="balance" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                </AreaChart>
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
          <Tabs defaultValue="annual">
            <TabsList className="mb-4">
              <TabsTrigger value="annual" className="px-6 py-2">Annual</TabsTrigger>
              <TabsTrigger value="monthly" className="px-6 py-2">Monthly</TabsTrigger>
            </TabsList>
            <TabsContent value="annual">
              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead>Year</TableHead>
                      <TableHead>Principal Paid</TableHead>
                      <TableHead>Interest Paid</TableHead>
                      <TableHead>Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {annualSchedule.map((row) => (
                      <TableRow key={row.year} className="hover:bg-muted/30">
                        <TableCell>{row.year}</TableCell>
                        <TableCell>{formatCurrency(row.principal, 2)}</TableCell>
                        <TableCell>{formatCurrency(row.interest, 2)}</TableCell>
                        <TableCell>{formatCurrency(row.balance, 2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="monthly">
              <div className="rounded-lg border border-border overflow-hidden max-h-96 overflow-auto">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Principal</TableHead>
                      <TableHead>Interest</TableHead>
                      <TableHead>Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schedule.map((row) => (
                      <TableRow key={row.month} className="hover:bg-muted/30">
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
    </CalculatorWrapper>
  );
}
