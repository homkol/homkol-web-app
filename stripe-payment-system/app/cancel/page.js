import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-4xl font-bold text-secondary mb-4">Payment Cancelled</h1>
      <p className="text-secondary mb-8">Your payment was cancelled. No charges were made.</p>
      <Link href="/" className="bg-primary text-white px-4 py-2 rounded hover:bg-tertiary transition-colors">
        Return to Home
      </Link>
    </div>
  );
}