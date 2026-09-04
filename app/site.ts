export const siteName = 'Kana UI';
export const siteUrl = 'https://kana.reelva.me';
export const siteTitle = 'Kana UI | Live2D Interface for Hermes Agent';
export const siteDescription =
  'Meet Kana UI, a local Live2D interface for Hermes Agent with Japanese TTS, multilingual replies, and access to every Hermes capability and tool.';

export const faqEntries = [
  {
    question: 'Is Kana a different agent from Hermes?',
    answer:
      'No. Hermes remains the only agent and keeps owning reasoning, web search, terminal and file access, MCP servers, subagents, slash commands, approvals, memory, sessions, and context management. Kana is the presentation layer in front of it.',
  },
  {
    question: 'What does Kana add on top of Hermes?',
    answer:
      'A game-style conversation surface: responsive Live2D avatars with lip sync, a Japanese-speaking persona, multilingual subtitles, local Qwen3-TTS with optional voice cloning, and support for OpenAI-compatible speech providers.',
  },
  {
    question: 'Where do my conversations and data live?',
    answer:
      'On your machine. Conversation history and imported avatar models stay local, Kana connects to the official hermes serve runtime, and Hermes session tokens and speech credentials stay out of browser storage.',
  },
  {
    question: 'Is Kana free and open source?',
    answer:
      'Yes. Kana is MIT-licensed open source, and the prebuilt kana-alya package is published on npm. The official Live2D sample avatars are used under the Live2D Inc. sample model terms.',
  },
  {
    question: 'How do I install and start Kana?',
    answer:
      'Install the prebuilt npm package globally, then run kana. It can find a compatible Hermes service or start the installed Hermes process automatically. The current release supports Linux x64 with glibc and Node.js 22.13 or newer.',
  },
  {
    question: 'What does it look like in practice?',
    answer:
      'Scroll back to the demo on this page, or read the full setup guide on GitHub for installation paths, voice configuration, and Live2D model sources.',
  },
];
