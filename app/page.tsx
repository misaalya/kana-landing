'use client';

import { useState, type CSSProperties } from 'react';

const installCommand = 'npm install -g kana-alya';
const outlinedTitle = 'かな Hermes,';
const characterTilts = [-1, 2, 0, -2, 1, -1, 2, -1, 3, -2];
const wuiTilts = [-2, 1, 3, -1, 2, 0, -3, 1, -1, 2, -2, 1, 0, -3, 2, -1, 1, 2];

export default function Home() {
  const [copied, setCopied] = useState(false);

  async function copyInstallCommand() {
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <main className="relative min-h-[calc(100dvh-40px)] overflow-hidden rounded-[28px] bg-[#fbf9fa] text-[#17191b] shadow-[0_4px_32px_rgb(0_0_0/0.06)] max-sm:min-h-[calc(100dvh-18px)] max-sm:rounded-2xl">
      <section
        className="relative min-h-[calc(100svh-40px)] max-sm:min-h-[calc(100svh-18px)]"
        id="home"
      >
        <header className="relative z-20 mx-auto flex h-[82px] w-[min(1180px,calc(100%_-_48px))] items-center justify-between [@media(max-height:720px)]:h-[68px] max-sm:h-[70px] max-sm:w-[calc(100%_-_32px)]">
          <a
            className="inline-flex items-center text-[19px] tracking-[-0.03em] no-underline transition-colors hover:text-[#56baf4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#56baf4] max-sm:text-[17px]"
            href="#home"
            aria-label="kana-ui home"
          >
            kana-ui
          </a>

          <a
            className="inline-flex items-center gap-2 rounded-full border border-[#389dd4] bg-[#56baf4] px-[15px] py-2.5 text-[13px] text-white no-underline shadow-sm transition-colors duration-200 hover:bg-[#6fc9ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#56baf4] max-sm:pr-1.5"
            href="https://github.com/misaalya/kana-hermes"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
            <span aria-hidden="true">↗</span>
          </a>
        </header>

        <div className="relative z-10 mx-auto mt-[clamp(78px,13vh,140px)] flex w-[min(850px,calc(100%_-_40px))] flex-col items-center text-center [@media(max-height:720px)]:mt-[68px] max-sm:mt-[clamp(72px,11vh,96px)]">
          <h1 className="m-0 text-balance text-[clamp(48px,6vw,78px)] leading-[0.98] tracking-[-0.065em] max-sm:text-[clamp(43px,13vw,62px)]">
            <span
              className="isolate block tracking-[-0.075em] text-white [paint-order:stroke_fill] [-webkit-text-stroke:9px_#81d0ff] max-sm:[-webkit-text-stroke:6px_#81d0ff]"
              aria-label={outlinedTitle}
            >
              {outlinedTitle.split('').map((character, index) =>
                character === ' ' ? (
                  <svg
                    className="kana-title-heart mx-[0.15em] inline-block h-[0.56em] w-[0.68em] origin-center align-[-0.035em] text-[#ff4d67]"
                    viewBox="0 0 10 9"
                    fill="currentColor"
                    key="title-heart"
                    aria-hidden="true"
                  >
                    <path d="M1 0h3v1h2V0h3v1h1v4H9v1H8v1H7v1H6v1H4V8H3V7H2V6H1V5H0V1h1V0Z" />
                  </svg>
                ) : (
                  <span
                    className={`kana-title-character relative z-10 inline-block origin-[50%_68%] rotate-[var(--character-tilt)] ${/[\u3040-\u30ff]/.test(character) ? 'font-[family-name:var(--font-kana-jp)]' : ''}`}
                    key={`${character}-${index}`}
                    aria-hidden="true"
                    style={
                      {
                        '--character-index': String(index),
                        '--character-tilt': `${characterTilts[index]}deg`,
                      } as CSSProperties
                    }
                  >
                    {character}
                  </span>
                ),
              )}
            </span>
            <span className="block pt-0.5">
  {(() => {
    const words = 'waifu user interface'.split(' ');
    return words.map((word, wi) => {
      const offset = words.slice(0, wi).reduce((sum, w) => sum + w.length, 0);
      return (
        <span key={`wiu-${wi}`} className="inline-block ml-2 first:ml-0">
          {word.split('').map((c, ci) => (
            <span
              key={`wiu-${wi}-${ci}`}
              className="inline-block text-[#56baf4] [paint-order:stroke_fill] [-webkit-text-stroke:4px_#fff]"
              style={{
                transform: `rotate(${wuiTilts[offset + ci]}deg)`,
              } as CSSProperties}
            >
              {c}
            </span>
          ))}
        </span>
      );
    });
  })()}
</span>
          </h1>

          <p className="mx-auto mt-[23px] max-w-[620px] text-balance text-[clamp(14px,1.5vw,17px)] font-semibold leading-[1.65] tracking-[-0.015em] text-[#73787d] [@media(max-height:720px)]:mt-[17px] max-sm:mt-5 max-sm:max-w-[430px] max-sm:text-sm">
            A web interface for Hermes with a Live2D avatar and Japanese TTS.{' '}
            <span className="text-[#303438]">Anything Hermes can do, Kana can do too</span>{' '}
            — while every response stays in your language.
          </p>

          <div className="mt-[29px] flex w-full items-stretch justify-center gap-2.5 [@media(max-height:720px)]:mt-[21px] max-sm:flex-col max-sm:items-center">
            <div className="flex min-h-[52px] w-[min(365px,100%)] items-center rounded-[14px] border border-[#e4e8eb] bg-[#f6f7f8] py-[5px] pr-[5px] pl-[17px] shadow-[inset_0_1px_#fff]">
              <span
                className="mr-2.5 grid size-[23px] shrink-0 place-items-center rounded-[7px] bg-[#e7eaec] text-[13px] text-[#626a70]"
                aria-hidden="true"
              >
                $
              </span>
              <code className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-left font-[family-name:var(--font-quicksand)] text-[13px] font-bold text-[#303438]">
                {installCommand}
              </code>
              <button
                className="grid min-w-[42px] self-stretch place-items-center rounded-[10px] border-0 bg-[#e7eaec] text-[#626a70] transition-colors duration-200 enabled:cursor-pointer enabled:hover:bg-[#dce1e4] enabled:hover:text-[#41474c] disabled:cursor-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#56baf4]"
                type="button"
                onClick={copyInstallCommand}
                disabled={copied}
                aria-label={copied ? 'Install command copied' : 'Copy npm install command'}
                title={copied ? 'Copied' : 'Copy'}
              >
                {copied ? (
                  <svg
                    className="size-4"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="m3 8 3 3 7-7" />
                  </svg>
                ) : (
                  <svg
                    className="size-4"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    aria-hidden="true"
                  >
                    <rect x="2.5" y="2.5" width="8" height="8" rx="1.5" />
                    <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" fill="#e7eaec" />
                  </svg>
                )}
              </button>
            </div>

            <a
              className="inline-flex min-h-[52px] items-center justify-center gap-[9px] rounded-[14px] border border-[#389dd4] bg-[#56baf4] px-[21px] text-xs text-white no-underline shadow-sm transition-colors duration-200 hover:bg-[#6fc9ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#56baf4] max-sm:w-[min(365px,100%)]"
              href="https://github.com/misaalya/kana-hermes"
              target="_blank"
              rel="noreferrer"
            >
              View on GitHub
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-[clamp(40px,6vh,64px)] mb-14 w-[min(880px,calc(100%_-_40px))] max-sm:mt-9 max-sm:mb-10">
          <img
            alt="kana-ui demo"
            className="block w-full rounded-2xl bg-white"
            src="/demo.gif"
          />
        </div>
      </section>

      <footer className="mx-auto flex w-[min(1180px,calc(100%_-_48px))] flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-[#eef1f3] pb-8 pt-6 text-[11px] text-[#9aa1a7] max-sm:w-[calc(100%_-_32px)] max-sm:justify-center max-sm:text-center">
        <span>© 2026 misaalya</span>
        <a
          className="inline-flex items-center gap-1.5 text-[#73787d] no-underline transition-colors hover:text-[#56baf4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#56baf4]"
          href="https://reelva.me"
          target="_blank"
          rel="noreferrer"
        >
          Built by reelva.me
          <span aria-hidden="true">↗</span>
        </a>
      </footer>

      <div
        className="pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 translate-y-[18px] rounded-full border border-[#dfe4e7] bg-[#f6f7f8] px-[13px] py-[9px] text-[10px] text-[#25292c] opacity-0 shadow-sm transition-[opacity,transform] duration-200 data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100"
        data-visible={copied}
        role="status"
        aria-live="polite"
      >
        Install command copied
      </div>

      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .kana-title-character {
            animation: kana-title-character-hop 6.5s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
            animation-delay: calc(var(--character-index) * 26ms);
          }

          .kana-title-heart {
            animation: kana-title-heartbeat 6.5s cubic-bezier(0.2, 0.8, 0.2, 1) 104ms infinite;
          }
        }

        @keyframes kana-title-character-hop {
          0%,
          15%,
          100% {
            transform: translateY(0) rotate(var(--character-tilt));
          }

          4% {
            transform: translateY(-0.12em) rotate(calc(var(--character-tilt) * -0.55));
          }

          7% {
            transform: translateY(0.025em) rotate(var(--character-tilt));
          }
        }

        @keyframes kana-title-heartbeat {
          0%,
          15%,
          100% {
            transform: scale(1) rotate(0);
          }

          4% {
            transform: scale(1.2) rotate(-5deg);
          }

          7% {
            transform: scale(0.94) rotate(3deg);
          }

          10% {
            transform: scale(1.1) rotate(-2deg);
          }
        }
      `}</style>
    </main>
  );
}
