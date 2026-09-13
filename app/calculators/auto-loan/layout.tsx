import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auto Loan Calculator - Estimate Car Payments & Interest | FinSuite',
  description: 'Calculate monthly auto loan payments, loan amounts, interest rates, and loan terms with our free online car financing calculator.',
  keywords: ['auto loan calculator', 'car payment calculator', 'car loan interest', 'financing estimator', 'FinSuite'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
