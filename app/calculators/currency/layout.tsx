import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Currency Converter - Real-Time Exchange Rates | FinSuite',
  description: 'Convert currencies instantly with real-time exchange rates for global travel and international investments.',
  keywords: ['currency converter', 'exchange rates', 'foreign exchange', 'money converter', 'FinSuite'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
