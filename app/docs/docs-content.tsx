'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Section = {
  id: string;
  label: string;
  guide?: { href: string; label: string };
};

const sections: Section[] = [
  { id: 'overview', label: 'Overview' },
  {
    id: 'installation',
    label: 'Installation',
    guide: {
      href: 'https://github.com/misaalya/kana-hermes#installation',
      label: 'Full install guide',
    },
  },
  {
    id: 'hermes',
    label: 'Connecting to Hermes',
    guide: {
      href: 'https://github.com/misaalya/kana-hermes#connect-to-hermes',
      label: 'Full connection guide',
    },
  },
  {
    id: 'commands',
    label: 'Slash commands',
    guide: {
      href: 'https://github.com/misaalya/kana-hermes#hermes-slash-commands',
      label: 'Full command guide',
    },
  },
  {
    id: 'voice',
    label: 'Voice providers',
    guide: {
      href: 'https://github.com/misaalya/kana-hermes/blob/main/docs/CONFIGURATION.md#tts-providers',
      label: 'Full voice guide',
    },
  },
  {
    id: 'live2d',
    label: 'Live2D avatars',
    guide: {
      href: 'https://github.com/misaalya/kana-hermes#live2d-models',
      label: 'Full avatar guide',
    },
  },
  {
    id: 'configuration',
    label: 'Configuration',
    guide: {
      href: 'https://github.com/misaalya/kana-hermes/blob/main/docs/CONFIGURATION.md',
      label: 'CONFIGURATION.md',
    },
  },
  {
    id: 'security',
    label: 'Security',
    guide: {
      href: 'https://github.com/misaalya/kana-hermes/blob/main/docs/SECURITY.md',
      label: 'SECURITY.md',
    },
  },
  {
    id: 'deployment',
    label: 'VPS deployment',
    guide: {
      href: 'https://github.com/misaalya/kana-hermes/blob/main/docs/SUPPORTED_ENVIRONMENT.md#vps-deploy-checklist',
      label: 'Deploy checklist',
    },
  },
  {
    id: 'limits',
    label: 'Limitations & channels',
    guide: {
      href: 'https://github.com/misaalya/kana-hermes/blob/main/docs/COMPATIBILITY_POLICY.md',
      label: 'Compatibility policy',
    },
  },
];

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-[4px] bg-[#eef4f8] px-[5px] py-[2px] text-[0.9em] font-bold text-[#303438]">
      {children}
    </code>
  );
}

function Pre({ children }: { children: React.ReactNode }) {
  return (
    <pre className="mt-4 overflow-x-auto rounded-lg border border-[#e7ebee] bg-[#17191b] p-4 text-[12.5px] leading-[1.75] text-[#f2faff] max-sm:p-3.5 max-sm:text-xs">
      <code>{children}</code>
    </pre>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="m-0 mt-4 text-[15px] font-semibold leading-[1.8] text-[#5c6268] first:mt-0 max-sm:text-[14px]">
      {children}
    </p>
  );
}

function SectionHeader({
  id,
  title,
  guide,
}: {
  id: string;
  title: string;
  guide?: Section['guide'];
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
      <h2
        className="m-0 scroll-mt-28 text-[clamp(22px,2.2vw,28px)] leading-tight tracking-[-0.04em] text-[#17191b]"
        id={id}
      >
        {title}
      </h2>
      {guide && (
        <a
          className="shrink-0 text-[12px] font-bold text-[#56baf4] no-underline transition-colors hover:text-[#389dd4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#56baf4]"
          href={guide.href}
          target="_blank"
          rel="noreferrer"
        >
          {guide.label} ↗
        </a>
      )}
    </div>
  );
}

function TableOfContents({
  activeId,
  mobileOpen,
  setMobileOpen,
}: {
  activeId: string;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}) {
  return (
    <nav aria-label="Docs sections" className="md:sticky md:top-[118px] md:self-start">
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-xl border border-[#e7ebee] bg-white px-4 py-3 text-left text-[13px] font-bold text-[#17191b] md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-expanded={mobileOpen}
      >
        <span>On this page</span>
        <span aria-hidden="true" className="text-[#56baf4]">
          {mobileOpen ? '−' : '+'}
        </span>
      </button>

      <div
        className={`mt-2 overflow-hidden rounded-xl border border-[#e7ebee] bg-white transition-[max-height,opacity] duration-300 md:mt-0 md:max-h-none md:overflow-visible md:rounded-none md:border-0 md:bg-transparent ${
          mobileOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0 md:opacity-100'
        }`}
      >
        <p className="m-0 hidden text-[10px] font-bold uppercase tracking-[0.14em] text-[#9aa1a7] md:block">
          On this page
        </p>
        <ul className="m-0 flex flex-col gap-0.5 p-2 md:mt-3 md:border-l md:border-[#e7ebee] md:p-0 md:pl-0">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                className={`block rounded-lg px-3 py-2 text-[13px] font-bold no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#56baf4] md:rounded-none md:py-1.5 md:pl-4 md:pr-2 ${
                  activeId === section.id
                    ? 'bg-[#f2faff] text-[#56baf4] md:bg-transparent md:pl-[13px] md:shadow-[inset_2px_0_#56baf4]'
                    : 'text-[#73787d] hover:bg-[#f8fafb] hover:text-[#56baf4] md:hover:bg-transparent md:hover:text-[#56baf4] md:hover:shadow-[inset_2px_0_#c8ecff]'
                }`}
                href={`#${section.id}`}
                onClick={() => setMobileOpen(false)}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default function DocsContent() {
  const [activeId, setActiveId] = useState('overview');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const scroller = document.getElementById('docs');
    if (!scroller) return;

    function update() {
      if (!scroller) return;
      let current = sections[0].id;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top - scroller.getBoundingClientRect().top;
        if (top <= 140) current = section.id;
      }
      setActiveId(current);
    }

    update();
    scroller.addEventListener('scroll', update, { passive: true });
    return () => scroller.removeEventListener('scroll', update);
  }, []);

  return (
    <main className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[28px] bg-[#fbf9fa] text-[#17191b] shadow-[0_4px_32px_rgb(0_0_0/0.06)] max-sm:rounded-2xl">
      <header className="absolute inset-x-0 top-0 z-[100] mx-auto flex h-[88px] w-full items-center justify-between px-[max(24px,calc((100%_-_1180px)/2))] pt-2 max-sm:h-[76px] max-sm:px-4 max-sm:pt-1.5">
        <nav className="flex items-center gap-2.5">
          <Link
            className="inline-flex items-center text-[19px] tracking-[-0.03em] text-[#17191b] no-underline transition-colors hover:text-[#56baf4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#56baf4] max-sm:text-[17px]"
            href="/"
          >
            kana-ui
          </Link>
          <span aria-hidden="true" className="text-[#d5dade]">
            /
          </span>
          <span
            aria-current="page"
            className="text-[15px] font-bold tracking-[-0.02em] text-[#56baf4]"
          >
            docs
          </span>
        </nav>

        <Link
          className="inline-flex items-center gap-2 rounded-full border border-[#389dd4] bg-[#56baf4] px-[15px] py-2.5 text-[13px] text-white no-underline shadow-sm transition-colors duration-200 hover:bg-[#6fc9ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#56baf4] max-sm:pr-1.5"
          href="https://github.com/misaalya/kana-hermes"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
          <span aria-hidden="true">↗</span>
        </Link>
      </header>

      <section
        className="relative flex min-h-0 flex-1 flex-col overflow-y-auto pt-[88px] [mask-image:linear-gradient(to_bottom,transparent_0px,#000_88px,#000_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0px,#000_88px,#000_100%)] max-sm:pt-[76px] max-sm:[mask-image:linear-gradient(to_bottom,transparent_0px,#000_76px,#000_100%)] max-sm:[-webkit-mask-image:linear-gradient(to_bottom,transparent_0px,#000_76px,#000_100%)]"
        id="docs"
      >
        <div className="mx-auto w-[min(1100px,calc(100%_-_48px))] max-sm:w-[calc(100%_-_32px)]">
          <div className="mt-[clamp(40px,6vw,60px)] grid gap-x-12 gap-y-10 md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)]">
            <TableOfContents activeId={activeId} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

            <div className="min-w-0 pb-24 max-sm:pb-14">
              <section aria-labelledby="docs-overview">
                <SectionHeader id="overview" title="Overview" />
                <div className="mt-4">
                  <P>
                    Kana adds a game-style visual-novel conversation surface on
                    top of an existing Hermes Agent installation: a pastel sky
                    stage, a centered Live2D avatar, and a named speech bubble.
                    Hermes keeps owning reasoning, tools, terminal access, files,
                    MCP, subagents, memory, sessions, and context management.
                    Kana never executes shell commands, filesystem actions, MCP
                    calls, or model requests itself.
                  </P>
                  <P>
                    Everything stays on your machine: conversation history lives
                    in the browser, the Hermes session token is held only in
                    Kana&apos;s server process memory, and the optional Qwen3-TTS
                    model cache lives under a single data directory.
                  </P>
                </div>
              </section>

              <section
                aria-labelledby="docs-installation"
                className="mt-[clamp(48px,7vw,72px)] border-t border-[#e7ebee] pt-[clamp(48px,7vw,72px)]"
              >
                <SectionHeader
                  guide={sections[1].guide}
                  id="installation"
                  title="Installation"
                />
                <div className="mt-4">
                  <P>
                    Two production paths exist: the npm global install for normal
                    users, and the source build for contributors and VPS operators.{' '}
                    <Code>npm run dev</Code> is a development server only and must
                    not be deployed behind Nginx.
                  </P>
                  <Pre>{`npm install -g kana-alya
kana`}</Pre>
                  <P>
                    The package installs a thin launcher plus the prebuilt
                    standalone web runtime. Running <Code>kana</Code> binds to{' '}
                    <Code>127.0.0.1</Code>, opens the browser, and tries to
                    connect to or start the installed Hermes service. The npm
                    install writes no user configuration; the first launch
                    creates an owner-only <Code>config.json</Code> and a
                    persistent JWT secret, never overwriting existing files.
                  </P>
                  <Pre>{`kana setup        # configure optional Qwen3-TTS voice
kana config      # open/print the advanced JSON path
kana doctor      # check Hermes/uv availability and data locations
kana --port 4000 # choose the local web port`}</Pre>
                  <P>
                    To build from source instead: <Code>npm ci</Code>,{' '}
                    <Code>npm run package:local</Code>, then run{' '}
                    <Code>node .next/standalone/server.js</Code>.
                  </P>
                </div>
              </section>

              <section
                aria-labelledby="docs-hermes"
                className="mt-[clamp(48px,7vw,72px)] border-t border-[#e7ebee] pt-[clamp(48px,7vw,72px)]"
              >
                <SectionHeader
                  guide={sections[2].guide}
                  id="hermes"
                  title="Connecting to Hermes"
                />
                <div className="mt-4">
                  <P>
                    Kana first tries an existing compatible local service; if
                    none is usable, it starts <Code>hermes serve</Code>{' '}
                    automatically. Discovery checks an explicit override,{' '}
                    <Code>PATH</Code>, Hermes-managed homes,{' '}
                    <Code>~/.local/bin</Code>, Termux&apos;s prefix, and standard
                    system locations. If discovery fails, set the absolute{' '}
                    <Code>hermes.executable</Code> in the config printed by{' '}
                    <Code>kana doctor</Code>.
                  </P>
                  <P>
                    Advanced users may start Hermes separately with an explicit
                    session token so Kana can adopt it server-side:
                  </P>
                  <Pre>{`HERMES_DASHBOARD_SESSION_TOKEN="replace-with-a-long-local-token" \\
hermes serve --host 127.0.0.1 --port 9119`}</Pre>
                  <P>
                    The token is minted and kept in server memory only; it never
                    reaches browser preferences, storage, URLs, or forms. Kana
                    never edits the Hermes installation.
                  </P>
                </div>
              </section>

              <section
                aria-labelledby="docs-commands"
                className="mt-[clamp(48px,7vw,72px)] border-t border-[#e7ebee] pt-[clamp(48px,7vw,72px)]"
              >
                <SectionHeader
                  guide={sections[3].guide}
                  id="commands"
                  title="Slash commands"
                />
                <div className="mt-4">
                  <P>
                    Type <Code>/</Code> in the composer to browse the connected
                    Hermes installation&apos;s live command and skill catalog,
                    search it, and receive argument suggestions. Kana reads
                    Hermes&apos;s <Code>commands.catalog</Code> and{' '}
                    <Code>complete.slash</Code> data and executes through the
                    official RPCs, so new commands remain discoverable without
                    updating Kana.
                  </P>
                  <P>
                    <Code>/approve</Code>, <Code>/deny</Code>, <Code>/title</Code>,{' '}
                    <Code>/branch</Code>, <Code>/save</Code>, <Code>/status</Code>,{' '}
                    <Code>/compress</Code>, <Code>/steer</Code>, and{' '}
                    <Code>/handoff</Code> use dedicated Hermes control RPCs;{' '}
                    <Code>/undo</Code> uses the rewind directive. Protected input
                    (sudo passwords, tool secrets) uses ephemeral password fields
                    sent directly through Hermes&apos;s response RPCs; values never
                    enter history, diagnostics, or browser storage.
                  </P>
                </div>
              </section>

              <section
                aria-labelledby="docs-voice"
                className="mt-[clamp(48px,7vw,72px)] border-t border-[#e7ebee] pt-[clamp(48px,7vw,72px)]"
              >
                <SectionHeader
                  guide={sections[4].guide}
                  id="voice"
                  title="Voice providers"
                />
                <div className="mt-4">
                  <P>
                    <Code>tts.provider</Code> selects the server-side audio
                    generator. The default <Code>qwen3-local</Code> runs the
                    official pinned <Code>Qwen3-TTS-12Hz-0.6B-Base</Code> model in
                    an isolated CPU-only Python service: roughly 4 GB of disk, a
                    lazy first start, and about a 2.3 GB download. Zero-shot
                    voice cloning from consented reference audio happens
                    entirely on your machine.
                  </P>
                  <P>
                    Alternatively, use any OpenAI-compatible{' '}
                    <Code>POST /v1/audio/speech</Code> provider. Pollinations is
                    the first built-in preset:
                  </P>
                  <Pre>{`"tts": {
  "provider": "openai-compatible",
  "openAiCompatible": {
    "preset": "pollinations",
    "apiKey": "YOUR_POLLINATIONS_API_KEY",
    "model": "qwen-tts-instruct",
    "voice": "Serena"
  }
}`}</Pre>
                  <P>
                    API keys stay in the owner-only server{' '}
                    <Code>config.json</Code> and never enter the browser. Remote
                    providers require HTTPS and an API key.
                  </P>
                </div>
              </section>

              <section
                aria-labelledby="docs-live2d"
                className="mt-[clamp(48px,7vw,72px)] border-t border-[#e7ebee] pt-[clamp(48px,7vw,72px)]"
              >
                <SectionHeader
                  guide={sections[5].guide}
                  id="live2d"
                  title="Live2D avatars"
                />
                <div className="mt-4">
                  <P>
                    Kana uses <Code>pixi.js</Code> v6 and{' '}
                    <Code>pixi-live2d-display</Code> for the Cubism Web runtime.
                    Haru and Mao, the official free sample avatars, load remotely
                    from Live2D&apos;s sample repository. The official Cubism Core
                    script loads only from Live2D&apos;s host.
                  </P>
                  <P>
                    Switch avatars in Settings by choosing Haru/Mao, entering a
                    hosted URL ending in <Code>.model3.json</Code>, or importing a
                    model folder. Folder assets use IndexedDB and survive
                    reloads. The per-model binding editor maps mouth parameters,
                    emotion expressions, and motion groups for each imported
                    model.
                  </P>
                  <P>
                    Sample-data notice: Live2D sample data is owned and copyrighted
                    by Live2D Inc. and used under its official sample model terms.
                  </P>
                </div>
              </section>

              <section
                aria-labelledby="docs-configuration"
                className="mt-[clamp(48px,7vw,72px)] border-t border-[#e7ebee] pt-[clamp(48px,7vw,72px)]"
              >
                <SectionHeader
                  guide={sections[6].guide}
                  id="configuration"
                  title="Configuration"
                />
                <div className="mt-4">
                  <P>
                    Optional overrides live in one server-owned file:{' '}
                    <Code>$KANA_DATA_DIR/config.json</Code>, opened with{' '}
                    <Code>kana config</Code>. Creating the file never overwrites
                    existing data; restart Kana after manual edits.
                  </P>
                  <Pre>{`{
  "deployment": { "mode": "local" },
  "tts": {
    "provider": "qwen3-local",
    "qwen3Local": {
      "port": 7860,
      "model": "Qwen/Qwen3-TTS-12Hz-0.6B-Base",
      "device": "cpu"
    }
  }
}`}</Pre>
                  <P>
                    Key environment variables: <Code>KANA_DATA_DIR</Code> (data
                    root), <Code>KANA_DEPLOYMENT_MODE</Code> (local vs deployment),{' '}
                    <Code>KANA_HERMES_BIN</Code> (Hermes override). TTS settings
                    have no environment override; edit this JSON instead.
                    Deployment mode is independent from <Code>NODE_ENV</Code>:{' '}
                    <Code>deployment</Code> mode requires authentication for
                    process controls.
                  </P>
                </div>
              </section>

              <section
                aria-labelledby="docs-security"
                className="mt-[clamp(48px,7vw,72px)] border-t border-[#e7ebee] pt-[clamp(48px,7vw,72px)]"
              >
                <SectionHeader
                  guide={sections[7].guide}
                  id="security"
                  title="Security"
                />
                <div className="mt-4">
                  <P>
                    Kana displays sensitive agent activity in a browser, so
                    &quot;localhost&quot; is not treated as automatically trusted.
                    Hermes is the only agent and executes every tool. React text
                    nodes render transcript and tool status; response HTML is
                    never injected. Cubism Core is executable only from Live2D&apos;s
                    official HTTPS host.
                  </P>
                  <P>
                    Do not use passwordless mode for a VPS, shared machine, or
                    reverse proxy. Those deployments must set{' '}
                    <Code>deployment</Code> mode and configure an access password.
                    In local mode the auth guard additionally rejects API
                    requests whose Host/Origin is not loopback.
                  </P>
                </div>
              </section>

              <section
                aria-labelledby="docs-deployment"
                className="mt-[clamp(48px,7vw,72px)] border-t border-[#e7ebee] pt-[clamp(48px,7vw,72px)]"
              >
                <SectionHeader
                  guide={sections[8].guide}
                  id="deployment"
                  title="VPS deployment"
                />
                <div className="mt-4">
                  <P>
                    Run the standalone server on loopback behind Nginx with an
                    explicit persistent data directory, and terminate HTTPS at the
                    proxy:
                  </P>
                  <Pre>{`KANA_DATA_DIR=/var/lib/kana \\
KANA_DEPLOYMENT_MODE=deployment \\
KANA_ACCESS_PASSWORD='REPLACE_WITH_A_STRONG_PASSWORD' \\
HOSTNAME=127.0.0.1 \\
PORT=3000 \\
node .next/standalone/server.js`}</Pre>
                  <P>
                    Run it through a service manager such as systemd. The proxy
                    must preserve <Code>Host</Code> and{' '}
                    <Code>X-Forwarded-Proto</Code>, disable buffering for{' '}
                    <Code>/api/hermes/events</Code> (long-lived SSE), and allow a
                    long read timeout for speech generation.
                  </P>
                </div>
              </section>

              <section
                aria-labelledby="docs-limits"
                className="mt-[clamp(48px,7vw,72px)] border-t border-[#e7ebee] pt-[clamp(48px,7vw,72px)]"
              >
                <SectionHeader
                  guide={sections[9].guide}
                  id="limits"
                  title="Limitations & channels"
                />
                <div className="mt-4">
                  <P>
                    Kana 0.2.x is an alpha release. The prebuilt target is Linux
                    x64 with glibc and Node.js 22.13 or newer, tested with Hermes
                    Agent 0.20.1. Other current Chromium browsers should work;
                    Firefox and Safari need a future CI target.
                  </P>
                  <P>
                    Known limitations: CPU Qwen3-TTS is slower than realtime on
                    low-end hardware; history and imported avatars are
                    browser-local with no cloud sync; the launcher remains a
                    local launcher, not an OS-native signed desktop binary.
                  </P>
                  <P>
                    Channel policy: alpha may retain documented limitations; beta
                    requires one week of dogfood and no unresolved P0/P1 issue.
                    Kana updates never modify Hermes — rolling Kana backward
                    means restoring a Kana package and browser backup.
                  </P>
                </div>
              </section>

              <footer className="mt-[clamp(60px,10vw,88px)] border-t border-[#e7ebee] pt-8 text-center">
                <p className="m-0 text-[13px] font-semibold text-[#9aa1a7]">
                  Kana is MIT-licensed open source. Full guides, ADRs, and
                  acceptance procedures live on{' '}
                  <a
                    className="font-bold text-[#56baf4] no-underline transition-colors hover:text-[#389dd4]"
                    href="https://github.com/misaalya/kana-hermes"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                  .
                </p>
              </footer>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
