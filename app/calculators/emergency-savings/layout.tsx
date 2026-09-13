import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Emergency Fund Calculator - 3 to 6 Months Safety Net | FinSuite',
  description: 'Calculate your ideal emergency savings fund based on your essential monthly living expenses and financial safety goals.',
  keywords: ['emergency fund calculator', 'emergency savings', 'financial safety net', 'living expenses', 'FinSuite'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
