import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compound Interest Calculator - Investment & Wealth Growth | FinSuite',
  description: 'Calculate compound interest on investments over time with regular contributions and flexible compounding frequencies.',
  keywords: ['compound interest calculator', 'investment calculator', 'wealth growth', 'savings interest', 'FinSuite'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
