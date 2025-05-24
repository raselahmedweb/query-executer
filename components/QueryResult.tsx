'use client';

import { QueryResponse } from '../types/query';

interface QueryResultProps {
  result: QueryResponse | null;
}

export default function QueryResult({ result }: QueryResultProps) {
  if (!result) return null;

  if (!result.success) {
    return <div className="text-red-500">Error: {result.error}</div>;
  }

  if (result.command === 'SELECT' && result.data && result.data.length > 0) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
          <thead>
            <tr>
              {Object.keys(result.data[0]).map((key) => (
                <th key={key} className="border border-gray-300 dark:border-gray-600 p-2 bg-gray-100 dark:bg-gray-700">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, i) => (
                  <td key={i} className="border border-gray-300 dark:border-gray-600 p-2">
                    {value === null || value === undefined ? 'NULL' : value.toString()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="text-green-500">
      Query executed successfully: {result.command} affected {result.rowCount} row(s)
    </div>
  );
}