import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import './globals.css';

const quicksand = Quicksand({
  variable: '--font-quicksand',
  subsets: ['latin'],
  weight: ['600', '700'],
});

export const metadata: Metadata = {
  title: 'kana-ui',
  description:
    'A playful interface for Hermes Agent. Install kana-alya with npm and bring your agent to life.',
  openGraph: {
    title: 'kana-ui',
    description: 'Your agent, with a little soul.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'kana-ui',
    description: 'Your agent, with a little soul.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={quicksand.variable + ' antialiased'}>{children}</body>
    </html>
  );
}
