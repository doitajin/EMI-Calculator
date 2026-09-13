import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'College Savings Calculator - 529 & Tuition Planning | FinSuite',
  description: 'Plan for higher education expenses and calculate how much to save monthly for college tuition with compound growth.',
  keywords: ['college savings calculator', '529 plan calculator', 'tuition planner', 'education fund', 'FinSuite'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
