import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center h-full">
      <h2 className="text-4xl font-bold tracking-tight mb-2">404</h2>
      <p className="text-xl text-muted-foreground mb-8">Page not found</p>
      <Link href="/">
        Return Home
      </Link>
    </div>
  );
}
