'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [connectionString, setConnectionString] = useState<string | null>(null);
  
    useEffect(() => {
      const storedConnection = localStorage.getItem('dbConnection');
      if (storedConnection) {
        setConnectionString(storedConnection);
      }
    }, []);


  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="bg-gray-800 dark:bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="space-x-4">
          <Link href="/" className="hover:text-gray-300">Home</Link>
          <Link href="/practice" className="hover:text-gray-300">Practice Tasks</Link>
          {connectionString&&<button
            onClick={() => {
              setConnectionString(null);
              localStorage.removeItem('dbConnection');
              window.location.reload();
            }}
            className="text-red-600 hover:text-red-300"
          >
            Disconnect
          </button>}
        </div>
      </div>
    </nav>
  );
}