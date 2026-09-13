import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rent vs Buy Calculator - Homeownership Financial Analysis | FinSuite',
  description: 'Compare the long-term financial pros and cons of renting versus buying a home with real estate appreciation.',
  keywords: ['rent vs buy calculator', 'homeownership analysis', 'renting or buying house', 'FinSuite'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
