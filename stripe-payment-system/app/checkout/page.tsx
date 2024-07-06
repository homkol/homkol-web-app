'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PayPalButton from '../components/PayPalButton';

interface Package {
  id: string;
  name: string;
  minutes: number;
  price: number;
}

function CheckoutPage() {
  const searchParams = useSearchParams();
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  useEffect(() => {
    const packageParam = searchParams.get('package');
    if (packageParam) {
      try {
        const decodedPackage = JSON.parse(decodeURIComponent(packageParam));
        setSelectedPackage(decodedPackage);
      } catch (error) {
        console.error('Error parsing package data:', error);
      }
    }
  }, [searchParams]);

  if (!selectedPackage) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <p className="mb-2">Package: {selectedPackage.name}</p>
        <p className="mb-2">Minutes: {selectedPackage.minutes}</p>
        <p className="mb-4">Total: ${selectedPackage.price.toFixed(2)}</p>
        <PayPalButton amount={selectedPackage.price.toString()} />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutPage />
    </Suspense>
  );
}
