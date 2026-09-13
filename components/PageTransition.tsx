'use client';

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 pb-12">
      {children}
    </div>
  );
}

