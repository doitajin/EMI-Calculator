import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Loan Payment Calculator - Principal & Interest Estimator | FinSuite',
  description: 'Calculate loan installment payments, total interest, and amortization schedule for any loan amount.',
  keywords: ['loan payment calculator', 'installment calculator', 'principal and interest', 'FinSuite'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
