'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft, TrendingUp, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'CHF', name: 'Swiss Franc' },
  { code: 'CNY', name: 'Chinese Yuan' },
  { code: 'INR', name: 'Indian Rupee' },
];

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(1000);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchRates() {
      try {
        const response = await fetch('/api/currency');
        if (!response.ok) throw new Error('Failed to fetch rates');
        const data = await response.json();
        setRates(data);
      } catch (err) {
        setError('Failed to load live rates. Using default values.');
      } finally {
        setLoading(false);
      }
    }
    fetchRates();
  }, []);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const convertedAmount = useMemo(() => {
    if (!rates) return 0;
    const fromRate = rates[fromCurrency] || 1;
    const toRate = rates[toCurrency] || 1;
    const inUSD = amount / fromRate;
    return inUSD * toRate;
  }, [amount, fromCurrency, toCurrency, rates]);

  const exchangeRate = useMemo(() => {
    if (!rates) return 1;
    return rates[toCurrency] / rates[fromCurrency];
  }, [fromCurrency, toCurrency, rates]);

  const formatCurrency = (val: number, curr: string) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: curr }).format(val);

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">Currency &gt; Exchange</div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Currency Converter</h1>
        </div>
        <div className="hidden sm:flex space-x-2">
          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold rounded uppercase tracking-wider">Live Rates</span>
        </div>
      </div>
      
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="rounded-2xl border-border shadow-sm">
        <CardContent className="p-6 sm:p-10">
          {loading ? (
            <div className="text-center py-20 text-muted-foreground">Loading rates...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-end">
                <div className="space-y-3">
                  <Label>Amount</Label>
                  <div className="flex rounded-md shadow-sm">
                    <Select value={fromCurrency} onValueChange={(val) => val && setFromCurrency(val)}>
                      <SelectTrigger className="w-[100px] rounded-r-none border-r-0 focus:ring-0 focus:ring-offset-0 bg-muted/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CURRENCIES.map((c) => (
                          <SelectItem key={c.code} value={c.code}>{c.code}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input 
                      type="number" 
                      value={amount} 
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="rounded-l-none text-lg font-medium shadow-none focus-visible:ring-1"
                    />
                  </div>
                </div>

                <div className="flex justify-center pb-1">
                  <Button variant="outline" size="icon" className="rounded-full shadow-sm" onClick={handleSwap}>
                    <ArrowRightLeft className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <Label>Converted To</Label>
                  <div className="flex rounded-md shadow-sm">
                    <Select value={toCurrency} onValueChange={(val) => val && setToCurrency(val)}>
                      <SelectTrigger className="w-[100px] rounded-r-none border-r-0 focus:ring-0 focus:ring-offset-0 bg-muted/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CURRENCIES.map((c) => (
                          <SelectItem key={c.code} value={c.code}>{c.code}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex-1 flex items-center px-3 border border-l-0 rounded-r-md bg-muted/20">
                      <span className="text-lg font-medium truncate">
                        {formatCurrency(convertedAmount, toCurrency).replace(/^[^\d]+/, '')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-3xl sm:text-4xl font-bold tracking-tight">
                    {formatCurrency(convertedAmount, toCurrency)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 font-medium">
                    1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 dark:bg-green-950/30 px-3 py-1.5 rounded-full font-medium">
                  <TrendingUp className="h-4 w-4" />
                  Live Rates
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
        <Card className="bg-muted/30 border-0 shadow-none">
          <CardContent className="p-4 flex gap-3">
            <div className="p-2 bg-background rounded-md h-fit shadow-sm"><TrendingUp className="h-4 w-4" /></div>
            <div>
              <p className="font-medium text-foreground">Mid-market rate</p>
              <p>We use the mid-market rate for our converter. This is for informational purposes only.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
