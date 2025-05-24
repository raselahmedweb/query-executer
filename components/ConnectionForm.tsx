'use client';

import { useState, FormEvent } from 'react';

interface ConnectionFormProps {
  onConnect: (connectionString: string) => void;
}

export default function ConnectionForm({ onConnect }: ConnectionFormProps) {
  const [server, setServer] = useState('localhost'); // Replace with your remote host
  const [database, setDatabase] = useState('postgres');
  const [port, setPort] = useState('5432'); // Use 5432 for remote database
  const [username, setUsername] = useState('postgres');
  const [password, setPassword] = useState('');
  const [connectionResult, setConnectionResult] = useState<{ success: boolean; message?: string; error?: string } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setConnectionResult(null);
    // Add sslmode=require for remote connections
    const connectionString = `postgres://${username}:${password}@${server}:${port}/${database}?${server === 'localhost' ? "":"sslmode=require"}`;
    try {
      const response = await fetch('/api/query/connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(connectionString),
      });

      const text = await response.text();
      console.log('Raw response:', text);

      let result;
      try {
        result = JSON.parse(text);
      } catch (jsonError) {
        throw new Error(`Failed to parse JSON response: ${jsonError instanceof Error ? jsonError.message : 'Unknown error'}`);
      }

      setConnectionResult(result);
      if (result.success) {
        localStorage.setItem('dbConnection', connectionString);
        onConnect(connectionString);
        window.location.reload();
      }
    } catch (error) {
      console.error('Connection error:', error);
      setConnectionResult({ success: false, error: error instanceof Error ? error.message : 'Failed to connect' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded bg-gray-50 dark:bg-gray-800">
      <h2 className="text-xl font-semibold mb-2">Database Connection</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          value={server}
          onChange={(e) => setServer(e.target.value)}
          placeholder="Server"
          className="p-2 outline-none rounded bg-white dark:bg-black text-black dark:text-white"
          defaultValue="remote-host"
        />
        <input
          type="text"
          value={database}
          onChange={(e) => setDatabase(e.target.value)}
          placeholder="Database"
          className="p-2 outline-none rounded bg-white dark:bg-black text-black dark:text-white"
          defaultValue="postgres"
        />
        <input
          type="text"
          value={port}
          onChange={(e) => setPort(e.target.value)}
          placeholder="Port"
          className="p-2 outline-none rounded bg-white dark:bg-black text-black dark:text-white"
          defaultValue="5432"
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="p-2 outline-none rounded bg-white dark:bg-black text-black dark:text-white"
          defaultValue="postgres"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-2 outline-none rounded bg-white dark:bg-black text-black dark:text-white"
        />
      </div>
      <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Connect
      </button>
      {connectionResult && (
        <div className={`mt-4 p-2 rounded ${connectionResult.success ? 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200'}`}>
          {connectionResult.success ? connectionResult.message : connectionResult.error}
        </div>
      )}
    </form>
  );
}