import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ROI Calculator - Return on Investment & Profitability | FinSuite',
  description: 'Calculate return on investment (ROI), net profit, and annualized percentage return on business or portfolio investments.',
  keywords: ['ROI calculator', 'return on investment', 'profitability calculator', 'investment yield', 'FinSuite'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
