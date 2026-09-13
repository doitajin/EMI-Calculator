import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Net Worth Calculator - Track Assets & Liabilities | FinSuite',
  description: 'Calculate your personal net worth by summing all your assets and subtracting total liabilities.',
  keywords: ['net worth calculator', 'assets and liabilities', 'personal wealth', 'balance sheet', 'FinSuite'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
