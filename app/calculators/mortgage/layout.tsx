import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mortgage Calculator - Home Loan & Monthly Payment Estimator | FinSuite',
  description: 'Estimate your comprehensive monthly mortgage payment including principal, interest, taxes, insurance, HOA, and amortization.',
  keywords: ['mortgage calculator', 'home loan calculator', 'monthly mortgage payment', 'amortization schedule', 'FinSuite'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
