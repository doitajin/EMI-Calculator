import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Retirement Calculator - Nest Egg & Pension Savings Planner | FinSuite',
  description: 'Plan your retirement savings, estimate future nest egg growth, and calculate required retirement contributions.',
  keywords: ['retirement calculator', 'nest egg planner', 'pension calculator', 'retirement savings', 'FinSuite'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
