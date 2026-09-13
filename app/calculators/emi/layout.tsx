import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EMI Calculator - Equated Monthly Installment for Loans | FinSuite',
  description: 'Calculate loan EMI, total interest payable, and amortization breakdown for personal, home, and auto loans.',
  keywords: ['EMI calculator', 'loan installment calculator', 'monthly payment', 'amortization', 'FinSuite'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
