import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Savings Goal Calculator - Target Savings Plan | FinSuite',
  description: 'Calculate how much you need to save each month to reach your financial target goal on time.',
  keywords: ['savings goal calculator', 'target savings plan', 'money goal planner', 'FinSuite'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
