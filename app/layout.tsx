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
    'A web interface for Hermes with a Live2D avatar and Japanese TTS, while every response stays in your language.',
  openGraph: {
    title: 'kana-ui',
    description: 'Meet Hermes, with a face and voice.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'kana-ui',
    description: 'Meet Hermes, with a face and voice.',
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
