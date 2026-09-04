import type { Metadata } from 'next';
import { M_PLUS_Rounded_1c, Quicksand } from 'next/font/google';
import './globals.css';

const quicksand = Quicksand({
  variable: '--font-quicksand',
  subsets: ['latin'],
  weight: ['600', '700'],
});

const kanaJapanese = M_PLUS_Rounded_1c({
  variable: '--font-kana-jp',
  weight: ['700'],
  preload: false,
  display: 'swap',
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
    <html lang="en" className="h-full">
      <body
        className={`${quicksand.variable} ${kanaJapanese.variable} min-h-dvh overflow-x-hidden bg-linear-to-b from-[#56baf4] to-[#6fc9ff] p-5 font-[family-name:var(--font-quicksand)] font-bold text-[#17191b] antialiased max-sm:p-[9px]`}
      >
        {children}
      </body>
    </html>
  );
}
