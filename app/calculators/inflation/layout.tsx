import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inflation Calculator - Future Purchasing Power Estimator | FinSuite',
  description: 'Calculate the impact of inflation on the future purchasing power of your money over years.',
  keywords: ['inflation calculator', 'purchasing power', 'cost of living', 'economic inflation', 'FinSuite'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
