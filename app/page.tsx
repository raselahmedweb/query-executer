'use client';

import { useState, useEffect } from 'react';
import ConnectionForm from '../components/ConnectionForm';
import QueryForm from '../components/QueryForm';
import QueryResult from '../components/QueryResult';
import { QueryResponse } from '../types/query';

export default function Home() {
  const [connectionString, setConnectionString] = useState<string | null>(null);
  const [queryResult, setQueryResult] = useState<QueryResponse | null>(null);

  useEffect(() => {
    const storedConnection = localStorage.getItem('dbConnection');
    if (storedConnection) {
      setConnectionString(storedConnection);
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      {!connectionString ? (
        <ConnectionForm onConnect={setConnectionString} />
      ) : (
        <>
          <QueryForm onQueryResult={setQueryResult} connectionString={connectionString} />
          <QueryResult result={queryResult} />
        </>
      )}
    </div>
  );
}