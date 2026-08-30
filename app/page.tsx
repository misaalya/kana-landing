'use client';

import { useState } from 'react';

const installCommand = 'npm install -g kana-ui';

export default function Home() {
  const [copied, setCopied] = useState(false);

  async function copyInstallCommand() {
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <main className="site-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="signal-grid" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#home" aria-label="Hermes Waifu home">
          <span className="brand-mark" aria-hidden="true">
            <span />
          </span>
          <span>hermes waifu</span>
        </a>

        <a
          className="github-link"
          href="https://github.com/misaalya/hermes-kana-ui"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
          <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero" id="home">
        <div className="eyebrow">
          <span className="status-dot" aria-hidden="true" />
          UI for Hermes Agent
        </div>

        <h1>
          Your agent,
          <span>with a little soul.</span>
        </h1>

        <p className="hero-copy">
          A playful interface for Hermes Agent. Install it once, then make
          every conversation feel a little more alive.
        </p>

        <div className="actions">
          <div className="install-box">
            <span className="prompt" aria-hidden="true">$</span>
            <code>{installCommand}</code>
            <button
              type="button"
              onClick={copyInstallCommand}
              aria-label="Copy npm install command"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <a
            className="primary-link"
            href="https://github.com/misaalya/hermes-kana-ui"
            target="_blank"
            rel="noreferrer"
          >
            View on GitHub
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <div className="orbital" aria-hidden="true">
        <span className="orbit orbit-one" />
        <span className="orbit orbit-two" />
        <span className="orbit orbit-three" />
        <span className="core">H</span>
      </div>

      <div className="giant-word" aria-hidden="true">HERMES</div>

      <footer>
        <span>Open source · built for Hermes</span>
        <span className="footer-mark" aria-hidden="true">✦</span>
      </footer>

      <div className="toast" data-visible={copied} role="status" aria-live="polite">
        Install command copied
      </div>
    </main>
  );
}
