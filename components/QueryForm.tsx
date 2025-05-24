'use client';

import { useState, FormEvent } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-sql';
import 'prismjs/themes/prism.css';

interface QueryFormProps {
  onQueryResult: (result: any) => void;
  connectionString: string;
}

const sqlKeywords = [
  'SELECT', 'FROM', 'WHERE', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET',
  'DELETE', 'CREATE', 'TABLE', 'DROP', 'ALTER', 'JOIN', 'INNER', 'LEFT', 'RIGHT',
  'GROUP', 'BY', 'ORDER', 'ASC', 'DESC', 'AND', 'OR', 'NOT'
];

export default function QueryForm({ onQueryResult, connectionString }: QueryFormProps) {
  const [sql, setSql] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleChange = (code: string) => {
    setSql(code);
    const lastWord = code.split(/\s+/).pop()?.toUpperCase() || '';
    if (lastWord) {
      const matches = sqlKeywords.filter(keyword => 
        keyword.startsWith(lastWord) && keyword !== lastWord
      );
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }

    // Auto-close brackets
    if (code.endsWith('(')) {
      setSql(code + ')');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab' || e.key === 'Enter' && suggestions.length > 0) {
      e.preventDefault();
      const lastWord = sql.split(/\s+/).pop() || '';
      const suggestion = suggestions[0];
      setSql(sql.replace(new RegExp(`${lastWord}$`), suggestion));
      setSuggestions([]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sql, connectionString }),
      });
      const result = await response.json();
      onQueryResult(result);
      setSuggestions([]);
    } catch (error) {
      onQueryResult({ success: false, error: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <Editor
        value={sql}
        onValueChange={handleChange}
        onKeyDown={handleKeyDown}
        highlight={code => highlight(code, languages.sql, 'sql')}
        padding={10}
        className="w-full p-2 h-auto border-0 outline-none rounded text-black dark:text-white font-mono"
        placeholder="Enter your SQL query"
      />
      {suggestions.length > 0 && (
        <div className="border rounded mt-1 p-2 bg-gray-100 dark:bg-gray-700">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600" 
                 onClick={() => {
                   const lastWord = sql.split(/\s+/).pop() || '';
                   setSql(sql.replace(new RegExp(`${lastWord}$`), suggestion));
                   setSuggestions([]);
                 }}>
              {suggestion}
            </div>
          ))}
        </div>
      )}
      {sql !== "" && <button disabled={sql === ""} type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Execute Query
      </button>}
    </form>
  );
}