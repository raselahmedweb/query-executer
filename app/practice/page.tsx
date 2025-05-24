'use client';

import { useState, useEffect } from 'react';
import PracticeTasks from '../../components/PracticeTasks';

export default function Practice() {
  const [connectionString, setConnectionString] = useState<string | null>(null);

  useEffect(() => {
    const storedConnection = localStorage.getItem('dbConnection');
    if (storedConnection) {
      setConnectionString(storedConnection);
    }
  }, []);

  if (!connectionString) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Practice Tasks</h1>
        <p>Please connect to a database from the home page to access practice tasks.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Practice Tasks</h1>
      <PracticeTasks connectionString={connectionString} />
    </div>
  );
}