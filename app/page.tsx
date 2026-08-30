'use client';

import { useState } from 'react';

const installCommand = 'npm install -g kana-alya';

export default function Home() {
  const [copied, setCopied] = useState(false);

  async function copyInstallCommand() {
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="kana-ui home">
          <span>kana-ui</span>
        </a>

        <a
          className="github-link"
          href="https://github.com/misaalya/kana-hermes"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
          <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero" id="home">
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
              disabled={copied}
              aria-label={copied ? 'Install command copied' : 'Copy npm install command'}
              title={copied ? 'Copied' : 'Copy'}
            >
              <span
                className={copied ? 'check-icon' : 'copy-icon'}
                aria-hidden="true"
              />
            </button>
          </div>

          <a
            className="primary-link"
            href="https://github.com/misaalya/kana-hermes"
            target="_blank"
            rel="noreferrer"
          >
            View on GitHub
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <footer>
        <span className="footer-name">misaalya · muhammad fikri</span>
        <span className="footer-studio">
          <span>VVO Labs</span>
          <span aria-hidden="true">/</span>
          <span>Hagoi Teknologi</span>
        </span>
      </footer>

      <div className="toast" data-visible={copied} role="status" aria-live="polite">
        Install command copied
      </div>
    </main>
  );
}
