'use client';

import { useState, type CSSProperties } from 'react';

const installCommand = 'npm install -g kana-alya';
const outlinedTitle = 'Kana Hermes,';
const characterTilts = [-3, 1, -1, 2, 0, -2, 1, -1, 2, -1, 3, -2];

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
        <div className="hero-heart-deco" aria-hidden="true" />
        <div className="hero-corner hero-corner-tl" aria-hidden="true" />
        <div className="hero-corner hero-corner-br" aria-hidden="true" />
        <span className="pixel-diamond pixel-diamond-1" aria-hidden="true" />
        <span className="pixel-diamond pixel-diamond-2" aria-hidden="true" />
        <span className="pixel-diamond pixel-diamond-3" aria-hidden="true" />
        <h1>
          <span className="hero-title-outline" aria-label={outlinedTitle}>
            {outlinedTitle.split('').map((character, index) =>
              character === ' ' ? (
                <span className="title-heart" key="title-heart" aria-hidden="true" />
              ) : (
                <span
                  className="title-character"
                  key={`${character}-${index}`}
                  aria-hidden="true"
                  style={
                    {
                      '--character-index': index,
                      '--character-tilt': `${characterTilts[index]}deg`,
                    } as CSSProperties
                  }
                >
                  {character}
                </span>
              ),
            )}
          </span>
          <span className="hero-title-solid">waifu user interface</span>
        </h1>

        <p className="hero-copy">
          A web interface for Hermes with a Live2D avatar and Japanese TTS,
          while every response stays in your language.
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

      <section className="video-demo">
        <div className="video-frame">
          <div className="video-poster">
            kana-hermes demo
          </div>
        </div>
      </section>

      <footer>
        <span>© 2026 misaalya · muhammad fikri</span>
        <span className="footer-studio">MIT License</span>
      </footer>

      <div className="toast" data-visible={copied} role="status" aria-live="polite">
        Install command copied
      </div>
    </main>
  );
}
