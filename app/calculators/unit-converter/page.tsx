'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const UNIT_TYPES = {
  length: {
    name: 'Length',
    units: [
      { id: 'm', name: 'Meter (m)', ratio: 1 },
      { id: 'km', name: 'Kilometer (km)', ratio: 1000 },
      { id: 'cm', name: 'Centimeter (cm)', ratio: 0.01 },
      { id: 'mm', name: 'Millimeter (mm)', ratio: 0.001 },
      { id: 'in', name: 'Inch (in)', ratio: 0.0254 },
      { id: 'ft', name: 'Foot (ft)', ratio: 0.3048 },
      { id: 'yd', name: 'Yard (yd)', ratio: 0.9144 },
      { id: 'mi', name: 'Mile (mi)', ratio: 1609.344 },
    ]
  },
  weight: {
    name: 'Weight / Mass',
    units: [
      { id: 'kg', name: 'Kilogram (kg)', ratio: 1 },
      { id: 'g', name: 'Gram (g)', ratio: 0.001 },
      { id: 'mg', name: 'Milligram (mg)', ratio: 0.000001 },
      { id: 'lb', name: 'Pound (lb)', ratio: 0.453592 },
      { id: 'oz', name: 'Ounce (oz)', ratio: 0.0283495 },
    ]
  },
  temperature: {
    name: 'Temperature',
    units: [
      { id: 'c', name: 'Celsius (°C)', isSpecial: true },
      { id: 'f', name: 'Fahrenheit (°F)', isSpecial: true },
      { id: 'k', name: 'Kelvin (K)', isSpecial: true },
    ]
  },
  volume: {
    name: 'Volume',
    units: [
      { id: 'l', name: 'Liter (L)', ratio: 1 },
      { id: 'ml', name: 'Milliliter (mL)', ratio: 0.001 },
      { id: 'gal', name: 'US Gallon (gal)', ratio: 3.78541 },
      { id: 'qt', name: 'US Quart (qt)', ratio: 0.946353 },
      { id: 'pt', name: 'US Pint (pt)', ratio: 0.473176 },
      { id: 'cup', name: 'US Cup', ratio: 0.24 },
      { id: 'fl_oz', name: 'US Fluid Ounce (fl oz)', ratio: 0.0295735 },
    ]
  }
};

export default function UnitConverter() {
  const [activeTab, setActiveTab] = useState('length');
  const [amount, setAmount] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState(UNIT_TYPES.length.units[0].id);
  const [toUnit, setToUnit] = useState(UNIT_TYPES.length.units[1].id);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const units = UNIT_TYPES[tab as keyof typeof UNIT_TYPES].units;
    setFromUnit(units[0].id);
    setToUnit(units[1].id);
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const calculateConversion = () => {
    const numAmount = parseFloat(amount) || 0;
    
    if (activeTab === 'temperature') {
      let c = 0;
      // Convert to Celsius first
      if (fromUnit === 'c') c = numAmount;
      else if (fromUnit === 'f') c = (numAmount - 32) * 5/9;
      else if (fromUnit === 'k') c = numAmount - 273.15;

      // Convert from Celsius to Target
      if (toUnit === 'c') return c.toFixed(2);
      if (toUnit === 'f') return ((c * 9/5) + 32).toFixed(2);
      if (toUnit === 'k') return (c + 273.15).toFixed(2);
    } else {
      const units = UNIT_TYPES[activeTab as keyof typeof UNIT_TYPES].units;
      const from = units.find(u => u.id === fromUnit) as { ratio: number } | undefined;
      const to = units.find(u => u.id === toUnit) as { ratio: number } | undefined;
      
      if (!from || !to) return '0';
      
      const baseValue = numAmount * from.ratio;
      const result = baseValue / to.ratio;
      
      // Format to avoid long decimals but keep precision for small numbers
      if (result === 0) return '0';
      if (result < 0.0001) return result.toExponential(4);
      
      return parseFloat(result.toFixed(6)).toString();
    }
  };

  const convertedValue = calculateConversion();

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">Unit Conversion</div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Unit Converter</h1>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="length">Length</TabsTrigger>
          <TabsTrigger value="weight">Weight / Mass</TabsTrigger>
          <TabsTrigger value="temperature">Temperature</TabsTrigger>
          <TabsTrigger value="volume">Volume</TabsTrigger>
        </TabsList>
        
        {Object.keys(UNIT_TYPES).map((type) => (
          <TabsContent key={type} value={type}>
            <Card className="rounded-2xl border-border shadow-sm">
              <CardContent className="p-6 sm:p-10">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-end">
                  <div className="space-y-3">
                    <Label>From</Label>
                    <div className="flex rounded-md shadow-sm">
                      <Select value={fromUnit} onValueChange={(val) => val && setFromUnit(val)}>
                        <SelectTrigger className="w-[120px] rounded-r-none border-r-0 focus:ring-0 focus:ring-offset-0 bg-muted/50 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {UNIT_TYPES[type as keyof typeof UNIT_TYPES].units.map((u) => (
                            <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input 
                        type="number" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)}
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
                    <Label>To</Label>
                    <div className="flex rounded-md shadow-sm">
                      <Select value={toUnit} onValueChange={(val) => val && setToUnit(val)}>
                        <SelectTrigger className="w-[120px] rounded-r-none border-r-0 focus:ring-0 focus:ring-offset-0 bg-muted/50 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {UNIT_TYPES[type as keyof typeof UNIT_TYPES].units.map((u) => (
                            <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex-1 flex items-center px-3 border border-l-0 rounded-r-md bg-muted/20 overflow-hidden">
                        <span className="text-lg font-bold truncate text-primary">
                          {convertedValue}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
