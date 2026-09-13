import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Income Tax Calculator - Salary & Take-Home Pay Estimator | FinSuite',
  description: 'Estimate your net take-home salary after federal and state income taxes and deductions.',
  keywords: ['income tax calculator', 'salary tax estimator', 'take home pay', 'tax withholding', 'FinSuite'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
