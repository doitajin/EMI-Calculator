import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface CalculatorWrapperProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export function CalculatorWrapper({ children, title, description }: CalculatorWrapperProps) {
  return (
    <div className="flex-1 w-full max-w-5xl mx-auto space-y-8 p-6 md:p-8">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Link>
      
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="space-y-8">
        {children}
      </div>
    </div>
  );
}
