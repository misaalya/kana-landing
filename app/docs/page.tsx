import type { Metadata } from 'next';

import DocsContent from './docs-content';

export const metadata: Metadata = {
  title: 'Docs | Kana UI',
  description:
    'Kana documentation: installation, connecting to Hermes Agent, slash commands, Qwen3-TTS voice providers, Live2D avatars, configuration, security, and VPS deployment.',
  alternates: {
    canonical: '/docs',
  },
  openGraph: {
    title: 'Docs | Kana UI',
    description:
      'Installation, Hermes connection, voice providers, Live2D avatars, configuration, security, and deployment for Kana.',
    url: '/docs',
  },
};

export default function DocsPage() {
  return <DocsContent />;
}
