import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Debt Payoff Calculator - Avalanche & Snowball Strategy | FinSuite',
  description: 'Plan your debt-free journey and compare debt snowball vs debt avalanche payoff methods to eliminate debt faster.',
  keywords: ['debt payoff calculator', 'debt snowball', 'debt avalanche', 'debt reduction', 'FinSuite'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
