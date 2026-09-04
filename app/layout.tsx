import type { Metadata } from 'next';
import { M_PLUS_Rounded_1c, Quicksand } from 'next/font/google';
import './globals.css';
import { faqEntries, siteDescription, siteName, siteTitle, siteUrl } from './site';

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
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: 'misaalya', url: 'https://github.com/misaalya' }],
  creator: 'misaalya',
  publisher: 'misaalya',
  category: 'technology',
  keywords: [
    'Kana UI',
    'Hermes Agent',
    'Live2D AI avatar',
    'Japanese text to speech',
    'AI agent interface',
    'local AI assistant',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: '/',
    siteName,
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Kana UI running Hermes Agent with a Live2D avatar',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: '/og.png',
        alt: 'Kana UI running Hermes Agent with a Live2D avatar',
      },
    ],
  },
  other: {
    'theme-color': '#56baf4',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      inLanguage: 'en',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${siteUrl}/#software`,
      name: siteName,
      alternateName: 'kana-ui',
      url: siteUrl,
      description: siteDescription,
      applicationCategory: 'DeveloperApplication',
      isAccessibleForFree: true,
      license: 'https://github.com/misaalya/kana-hermes/blob/main/LICENSE',
      codeRepository: 'https://github.com/misaalya/kana-hermes',
      downloadUrl: 'https://www.npmjs.com/package/kana-alya',
      softwareRequirements: 'An existing Hermes Agent installation',
      featureList: [
        'Live2D avatar interface',
        'Japanese text-to-speech',
        'Multilingual responses',
        'Full access to Hermes Agent capabilities and tools',
      ],
      author: {
        '@type': 'Person',
        name: 'misaalya',
        url: 'https://github.com/misaalya',
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${siteUrl}/#faq`,
      mainEntity: faqEntries.map((entry) => ({
        '@type': 'Question',
        name: entry.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: entry.answer,
        },
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${quicksand.variable} ${kanaJapanese.variable} flex h-dvh flex-col overflow-hidden bg-linear-to-b from-[#56baf4] to-[#6fc9ff] p-5 font-[family-name:var(--font-quicksand)] font-bold text-[#17191b] antialiased max-sm:p-[9px]`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
          }}
        />
        {children}
      </body>
    </html>
  );
}
