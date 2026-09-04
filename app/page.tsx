'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, type CSSProperties } from 'react';

import { faqEntries } from './site';

const installCommand = 'npm install -g kana-alya';
const outlinedTitle = 'かな Hermes,';
const characterTilts = [-1, 2, 0, -2, 1, -1, 2, -1, 3, -2];
const wuiTilts = [-2, 1, 3, -1, 2, 0, -3, 1, -1, 2, -2, 1, 0, -3, 2, -1, 1, 2];

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [footerHidden, setFooterHidden] = useState(false);

  async function copyInstallCommand() {
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  useEffect(() => {
    const scroller = document.getElementById('home');
    if (!scroller) return;
    let lastTop = scroller.scrollTop;
    function onScroll() {
      if (!scroller) return;
      const top = scroller.scrollTop;
      const atBottom = top + scroller.clientHeight >= scroller.scrollHeight - 4;
      const atTop = top <= 0;
      if (atBottom) setFooterHidden(true);
      else if (atTop) setFooterHidden(false);
      else if (top > lastTop) setFooterHidden(true);
      else if (top < lastTop) setFooterHidden(false);
      lastTop = top;
    }
    scroller.addEventListener('scroll', onScroll, { passive: true });
    return () => scroller.removeEventListener('scroll', onScroll);
  }, []);


  return (
    <main className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[28px] bg-[#fbf9fa] text-[#17191b] shadow-[0_4px_32px_rgb(0_0_0/0.06)] max-sm:rounded-2xl">
        <header className="absolute inset-x-0 top-0 z-20 mx-auto flex h-[88px] w-full items-center justify-between px-[max(24px,calc((100%_-_1180px)/2))] pt-2 [@media(max-height:720px)]:h-[74px] max-sm:h-[76px] max-sm:px-4 max-sm:pt-1.5">
          <a
            className="inline-flex items-center text-[19px] tracking-[-0.03em] no-underline transition-colors hover:text-[#56baf4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#56baf4] max-sm:text-[17px]"
            href="#home"
            aria-label="kana-ui home"
          >
            kana-ui
          </a>

          <nav className="flex items-center gap-2.5 max-sm:gap-1.5">
            <Link
              className="inline-flex items-center rounded-full px-[15px] py-2.5 text-[13px] font-bold text-[#73787d] no-underline transition-colors duration-200 hover:text-[#56baf4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#56baf4] max-sm:px-2.5 max-sm:text-xs"
              href="/docs"
            >
              Docs
            </Link>

            <a
              className="inline-flex items-center gap-2 rounded-full border border-[#389dd4] bg-[#56baf4] px-[15px] py-2.5 text-[13px] text-white no-underline shadow-sm transition-colors duration-200 hover:bg-[#6fc9ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#56baf4] max-sm:pr-1.5"
              href="https://github.com/misaalya/kana-hermes"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
              <span aria-hidden="true">↗</span>
            </a>
          </nav>
        </header>

      <section
        className="relative flex min-h-0 flex-1 flex-col overflow-y-auto pt-[88px] [mask-image:linear-gradient(to_bottom,transparent_0px,#000_88px,#000_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0px,#000_88px,#000_100%)] [@media(max-height:720px)]:pt-[74px] [@media(max-height:720px)]:[mask-image:linear-gradient(to_bottom,transparent_0px,#000_74px,#000_100%)] [@media(max-height:720px)]:[-webkit-mask-image:linear-gradient(to_bottom,transparent_0px,#000_74px,#000_100%)] max-sm:pt-[76px] max-sm:[mask-image:linear-gradient(to_bottom,transparent_0px,#000_76px,#000_100%)] max-sm:[-webkit-mask-image:linear-gradient(to_bottom,transparent_0px,#000_76px,#000_100%)]"
        id="home"
      >

        <div className="relative z-10 mx-auto mt-[clamp(78px,13vh,140px)] flex w-[min(850px,calc(100%_-_40px))] flex-col items-center text-center [@media(max-height:720px)]:mt-[68px] max-sm:mt-[clamp(72px,11vh,96px)]">
          <h1
            aria-label="Kana UI: a waifu user interface for Hermes Agent"
            className="m-0 text-balance text-[clamp(48px,6vw,78px)] leading-[0.98] tracking-[-0.065em] max-sm:text-[clamp(43px,13vw,62px)]"
          >
            <span
              aria-hidden="true"
              className="isolate block tracking-[-0.075em] text-white [paint-order:stroke_fill] [-webkit-text-stroke:9px_#81d0ff] max-sm:[-webkit-text-stroke:6px_#81d0ff]"
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
            <span aria-hidden="true" className="block pt-0.5">
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

          <p className="kana-reveal kana-reveal-copy mx-auto mt-[23px] max-w-[620px] text-balance text-[clamp(14px,1.5vw,17px)] font-semibold leading-[1.65] tracking-[-0.015em] text-[#73787d] [@media(max-height:720px)]:mt-[17px] max-sm:mt-5 max-sm:max-w-[430px] max-sm:text-sm">
            A web interface for Hermes with a Live2D avatar and Japanese TTS,
            while every response stays in your language.
          </p>

          <p className="kana-reveal kana-reveal-parity m-0 mt-[13px] text-balance text-[clamp(15px,1.8vw,20px)] font-bold leading-[1.5] tracking-[-0.02em] text-[#303438] [@media(max-height:720px)]:mt-[11px] max-sm:mt-2.5 max-sm:text-[15px]">
            Full parity with Hermes: every{' '}
            <span className="text-[#56baf4]">capability</span>, every{' '}
            <span className="text-[#56baf4]">tool</span>, every{' '}
            <span className="text-[#56baf4]">agent</span> skill.
          </p>

          <div className="kana-reveal kana-reveal-actions mt-[29px] flex w-full items-stretch justify-center gap-2.5 [@media(max-height:720px)]:mt-[21px] max-sm:flex-col max-sm:items-center">
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

        <div className="kana-reveal kana-reveal-demo relative z-10 mx-auto mt-[clamp(40px,6vh,64px)] mb-14 w-[min(880px,calc(100%_-_40px))] max-sm:mt-9 max-sm:mb-10">
          <Image
            alt="Kana UI running Hermes Agent with a Live2D avatar"
            className="block w-full rounded-2xl bg-white transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_14px_40px_rgb(86_186_244/0.18)]"
            height={495}
            src="/demo.gif"
            unoptimized
            width={880}
          />
        </div>

        <section
          aria-labelledby="about-kana"
          className="relative z-10 mx-auto mb-20 w-[min(1060px,calc(100%_-_48px))] pt-[clamp(48px,7vw,80px)] max-sm:mb-14 max-sm:w-[calc(100%_-_32px)] max-sm:pt-10"
        >
          <div className="grid gap-x-16 gap-y-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
            <div className="md:sticky md:top-[110px] md:self-start">
              <p className="m-0 text-[10px] font-bold uppercase tracking-[0.18em] text-[#56baf4]">
                Kana × Hermes
              </p>
              <h2
                className="m-0 mt-5 max-w-[420px] text-balance text-[clamp(34px,4.6vw,56px)] leading-[1.04] tracking-[-0.055em] max-sm:max-w-none"
                id="about-kana"
              >
                A different face for
                the same intelligence.
              </h2>
              <p className="mt-6 max-w-[360px] text-[14px] font-semibold leading-[1.8] text-[#73787d] max-sm:max-w-[560px]">
                Kana is a local visual-novel interface for an existing Hermes
                Agent installation, not a second agent.
              </p>
              <a
                className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-[12px] border border-[#389dd4] bg-[#56baf4] px-4 text-xs text-white no-underline shadow-sm transition-colors duration-200 hover:bg-[#6fc9ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#56baf4]"
                href="https://github.com/misaalya/kana-hermes#installation"
                target="_blank"
                rel="noreferrer"
              >
                Read the setup guide
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div>
              <p className="m-0 text-[15px] font-semibold leading-[1.85] text-[#73787d] max-sm:text-sm max-sm:leading-[1.8]">
                Hermes keeps owning reasoning, web search, terminal and file
                access, MCP servers, subagents, slash commands, approvals,
                memory, sessions, and context management. Kana wraps that
                engine in a game-style conversation surface: responsive
                Live2D avatars with lip sync, a Japanese-speaking persona,
                multilingual subtitles, and local Qwen3-TTS with optional
                voice cloning or an OpenAI-compatible speech provider.
              </p>

              <dl className="m-0 mt-10 border-t border-[#e7ebee]">
                <div className="grid grid-cols-[140px_minmax(0,1fr)] gap-8 border-b border-[#e7ebee] py-6 max-sm:grid-cols-1 max-sm:gap-2">
                  <dt className="text-[11px] uppercase tracking-[0.12em] text-[#56baf4]">
                    Local data
                  </dt>
                  <dd className="m-0 text-[13px] font-semibold leading-[1.8] text-[#73787d]">
                    Conversation history and imported avatar models stay on
                    your machine. Session tokens and speech credentials stay
                    out of browser storage.
                  </dd>
                </div>

                <div className="grid grid-cols-[140px_minmax(0,1fr)] gap-8 border-b border-[#e7ebee] py-6 max-sm:grid-cols-1 max-sm:gap-2">
                  <dt className="text-[11px] uppercase tracking-[0.12em] text-[#56baf4]">
                    Install
                  </dt>
                  <dd className="m-0 text-[13px] font-semibold leading-[1.8] text-[#73787d]">
                    <code className="text-[#303438]">npm install -g kana-alya</code>,
                    then run <code className="text-[#303438]">kana</code>. It
                    finds a compatible Hermes service or starts the installed
                    Hermes process automatically.
                  </dd>
                </div>

                <div className="grid grid-cols-[140px_minmax(0,1fr)] gap-8 py-6 max-sm:grid-cols-1 max-sm:gap-2">
                  <dt className="text-[11px] uppercase tracking-[0.12em] text-[#56baf4]">
                    Requires
                  </dt>
                  <dd className="m-0 text-[13px] font-semibold leading-[1.8] text-[#73787d]">
                    An existing Hermes Agent installation. The current release
                    supports Linux x64 with glibc and Node.js 22.13 or newer.
                  </dd>
                </div>
              </dl>

              <h3 className="mt-12 text-[clamp(22px,2.6vw,30px)] leading-tight tracking-[-0.045em]">
                Questions about{' '}
                <span className="text-[#56baf4]">Kana</span>
              </h3>

              <div className="mt-5">
                {faqEntries.map((entry, index) => (
                  <details
                    className={`group open:pb-6 ${index === faqEntries.length - 1 ? 'border-y' : 'border-t'} border-[#e7ebee]`}
                    name="kana-faq"
                    key={entry.question}
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[clamp(15px,1.8vw,18px)] font-bold tracking-[-0.03em] transition-colors hover:text-[#56baf4] [&::-webkit-details-marker]:hidden max-sm:py-4">
                      <h4 className="m-0 text-inherit">{entry.question}</h4>
                      <span
                        aria-hidden="true"
                        className="grid size-7 shrink-0 place-items-center rounded-full bg-[#f2faff] text-lg leading-none font-normal text-[#56baf4] transition-transform duration-300 group-open:rotate-45 max-sm:size-6"
                      >
                        +
                      </span>
                    </summary>
                    <p className="m-0 max-w-[600px] pb-1 text-[13px] font-semibold leading-[1.8] text-[#73787d] max-sm:text-xs">
                      {entry.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>

      <div
        className="grid shrink-0 grid-rows-[1fr] overflow-hidden transition-[grid-template-rows] duration-300 ease-out data-[hidden=true]:grid-rows-[0fr]"
        data-hidden={footerHidden}
      >
      <footer
        className="mx-auto flex min-h-0 w-[min(1180px,calc(100%_-_48px))] flex-wrap items-center justify-between gap-x-6 gap-y-2 overflow-hidden border-t border-[#eef1f3] py-2 text-[11px] text-[#9aa1a7] transition-[transform,opacity,padding,border-width] duration-300 ease-out data-[hidden=true]:pointer-events-none data-[hidden=true]:translate-y-full data-[hidden=true]:border-t-0 data-[hidden=true]:py-0 data-[hidden=true]:opacity-0 max-sm:w-[calc(100%_-_32px)] max-sm:justify-center max-sm:text-center"
        data-hidden={footerHidden}
      >
        <span className="max-sm:hidden">© 2026 misaalya</span>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 max-sm:hidden">
          <span>
            Art{' '}
            <a
              className="text-[#73787d] no-underline transition-colors hover:text-[#56baf4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#56baf4]"
              href="https://x.com/koahri1"
              target="_blank"
              rel="noreferrer"
            >
              @koahri1
            </a>
          </span>
          <span>
            Live2D{' '}
            <a
              className="text-[#73787d] no-underline transition-colors hover:text-[#56baf4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#56baf4]"
              href="https://x.com/MedL2D"
              target="_blank"
              rel="noreferrer"
            >
              @MedL2D
            </a>
          </span>
        </div>
        <a
          className="inline-flex items-center gap-1.5 text-[#73787d] no-underline transition-colors hover:text-[#56baf4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#56baf4] max-sm:hidden"
          href="https://reelva.me"
          target="_blank"
          rel="noreferrer"
        >
          Built by reelva.me
          <span aria-hidden="true">↗</span>
        </a>
        <nav
          aria-label="Credits"
          className="hidden w-full items-center justify-center gap-2 whitespace-nowrap text-[9px] max-sm:flex"
        >
          <span>© misaalya</span>
          <span aria-hidden="true" className="text-[#d5dade]">·</span>
          <a
            aria-label="Art by @koahri1"
            className="text-[#73787d] no-underline transition-colors hover:text-[#56baf4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#56baf4]"
            href="https://x.com/koahri1"
            target="_blank"
            rel="noreferrer"
            title="Art by @koahri1"
          >
            Art ↗
          </a>
          <span aria-hidden="true" className="text-[#d5dade]">·</span>
          <a
            aria-label="Live2D by @MedL2D"
            className="text-[#73787d] no-underline transition-colors hover:text-[#56baf4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#56baf4]"
            href="https://x.com/MedL2D"
            target="_blank"
            rel="noreferrer"
            title="Live2D by @MedL2D"
          >
            Live2D ↗
          </a>
          <span aria-hidden="true" className="text-[#d5dade]">·</span>
          <a
            aria-label="Built by reelva.me"
            className="text-[#73787d] no-underline transition-colors hover:text-[#56baf4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#56baf4]"
            href="https://reelva.me"
            target="_blank"
            rel="noreferrer"
          >
            reelva ↗
          </a>
        </nav>
      </footer>
      </div>

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

          .kana-reveal {
            opacity: 0;
            transform: translateY(14px);
            animation: kana-reveal-rise 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          }

          .kana-reveal-copy {
            animation-delay: 0.15s;
          }

          .kana-reveal-parity {
            animation-delay: 0.25s;
          }

          .kana-reveal-actions {
            animation-delay: 0.35s;
          }

          .kana-reveal-demo {
            animation-delay: 0.5s;
          }
        }

        @keyframes kana-reveal-rise {
          to {
            opacity: 1;
            transform: translateY(0);
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
