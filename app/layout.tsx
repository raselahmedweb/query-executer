import './globals.css';
import { Metadata } from 'next';
import Navbar from '../components/Navbar';

export const metadata: Metadata = {
  title: 'PostgreSQL Query Executer App',
  description: 'A PostgreSQL integration',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
          <Navbar />
          {children}
      </body>
    </html>
  );
}