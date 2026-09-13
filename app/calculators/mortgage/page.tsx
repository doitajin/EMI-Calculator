'use client';

import { useState, useMemo } from 'react';
import { Info } from 'lucide-react';
import { useFinanceStore } from '@/store/useFinanceStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

export default function MortgageCalculator() {
  const { currency } = useFinanceStore();
  const [homePrice, setHomePrice] = useState<number>(400000);
  const [downPayment, setDownPayment] = useState<number>(80000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTerm, setLoanTerm] = useState<number>(30); // years
  const [annualTaxes, setAnnualTaxes] = useState<number>(4800);
  const [annualInsurance, setAnnualInsurance] = useState<number>(1200);
  const [monthlyHOA, setMonthlyHOA] = useState<number>(0);

  const { 
    monthlyPI, 
    monthlyTaxes, 
    monthlyInsurance, 
    totalMonthlyPayment, 
    schedule, 
    annualSchedule 
  } = useMemo(() => {
    const p = homePrice - downPayment;
    const r = interestRate / 100 / 12;
    const n = loanTerm * 12;

    const pi = r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const taxes = annualTaxes / 12;
    const insurance = annualInsurance / 12;
    
    let balance = p;
    const schedule = [];
    const annualSchedule = [];
    
    let annualInterest = 0;
    let annualPrincipal = 0;
    
    for (let i = 1; i <= n; i++) {
      const interest = balance * r;
      const principalPaid = pi - interest;
      balance -= principalPaid;
      
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
      monthlyPI: pi,
      monthlyTaxes: taxes,
      monthlyInsurance: insurance,
      totalMonthlyPayment: pi + taxes + insurance + monthlyHOA,
      schedule,
      annualSchedule
    };
  }, [homePrice, downPayment, interestRate, loanTerm, annualTaxes, annualInsurance, monthlyHOA]);

  const pieData = [
    { name: 'Principal & Interest', value: monthlyPI },
    { name: 'Taxes', value: monthlyTaxes },
    { name: 'Insurance', value: monthlyInsurance },
    { name: 'HOA', value: monthlyHOA },
  ];

  const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#8b5cf6'];

  const formatCurrency = (val: number, digits = 0) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, maximumFractionDigits: digits }).format(val);

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mortgage Calculator</h1>
        <p className="text-muted-foreground mt-2">Estimate your comprehensive monthly mortgage payment.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="rounded-2xl border-border shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="price">Home Price</Label>
                  <div title="The total purchase price of the home.">
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <Input type="number" value={homePrice} onChange={(e) => setHomePrice(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="down">Down Payment</Label>
                  <div title="The amount you pay upfront, reducing the total loan amount.">
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <Input type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="rate">Interest Rate (%)</Label>
                  <div title="The annual interest rate for your mortgage loan.">
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <Input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="term">Loan Term (Years)</Label>
                  <div title="The duration of the mortgage loan in years.">
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <Input type="number" value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="taxes">Annual Taxes</Label>
                <Input type="number" value={annualTaxes} onChange={(e) => setAnnualTaxes(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ins">Annual Insurance</Label>
                <Input type="number" value={annualInsurance} onChange={(e) => setAnnualInsurance(Number(e.target.value))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hoa">Monthly HOA Fee</Label>
              <Input type="number" value={monthlyHOA} onChange={(e) => setMonthlyHOA(Number(e.target.value))} />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border shadow-sm bg-muted/10">
          <CardContent className="p-6 space-y-6">
            <div className="text-center p-4 rounded-xl bg-primary/5 border border-primary/10">
              <p className="text-sm font-medium text-muted-foreground">Total Monthly Payment</p>
              <p className="text-4xl font-bold text-primary mt-1">{formatCurrency(totalMonthlyPayment, 2)}</p>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => formatCurrency(Number(value), 2)} 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
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
    </div>
  );
}
