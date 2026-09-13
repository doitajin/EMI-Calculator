import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Financial Unit Converter - Currency & Financial Metrics | FinSuite',
  description: 'Convert financial units, interest compounding periods, and monetary metrics instantly.',
  keywords: ['financial unit converter', 'metric converter', 'currency units', 'FinSuite'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
