import './globals.css';
import { Metadata } from 'next';
import Navbar from '../components/Navbar';

export const metadata: Metadata = {
  title: 'Next.js PostgreSQL App',
  description: 'A Next.js app with PostgreSQL integration',
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