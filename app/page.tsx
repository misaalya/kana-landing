'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';

import { faqEntries } from './site';

const installCommand = 'npm install -g kana-alya';
const outlinedTitle = 'かな Hermes,';
const characterTilts = [-1, 2, 0, -2, 1, -1, 2, -1, 3, -2];
const wuiTilts = [-2, 1, 3, -1, 2, 0, -3, 1, -1, 2, -2, 1, 0, -3, 2, -1, 1, 2];

type DraggableCardProps = {
  children: ReactNode;
  className: string;
  floatSeed: number;
  rotation?: number;
  slotClassName?: string;
};

function DraggableCard({
  children,
  className,
  floatSeed,
  rotation = 0,
  slotClassName = '',
}: DraggableCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const floatFrameRef = useRef<number | null>(null);
  const motionRef = useRef({
    dragging: false,
    pointerId: -1,
    pointerX: 0,
    pointerY: 0,
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    rotation: 0,
    velocityX: 0,
    velocityY: 0,
    velocityRotation: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
  });
  const [dragging, setDragging] = useState(false);
  const [motionActive, setMotionActive] = useState(false);

  function renderTransform(x: number, y: number, dragRotation: number, scale = 1) {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--card-x', `${x}px`);
    card.style.setProperty('--card-y', `${y}px`);
    card.style.setProperty('--card-drag-rotation', `${dragRotation}deg`);
    card.style.setProperty('--card-scale', String(scale));
  }

  function stopAnimation() {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }

  function springHome() {
    const motion = motionRef.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      Object.assign(motion, {
        x: 0,
        y: 0,
        rotation: 0,
        velocityX: 0,
        velocityY: 0,
        velocityRotation: 0,
      });
      renderTransform(0, 0, 0);
      setMotionActive(false);
      return;
    }

    let previousTime = performance.now();
    const tick = (time: number) => {
      const state = motionRef.current;
      const delta = Math.min((time - previousTime) / 1000, 0.032);
      previousTime = time;

      const stiffness = 175;
      const damping = 17;
      const rotationStiffness = 210;
      const rotationDamping = 18;

      state.velocityX += (-stiffness * state.x - damping * state.velocityX) * delta;
      state.velocityY += (-stiffness * state.y - damping * state.velocityY) * delta;
      state.velocityRotation +=
        (-rotationStiffness * state.rotation - rotationDamping * state.velocityRotation) * delta;
      state.x += state.velocityX * delta;
      state.y += state.velocityY * delta;
      state.rotation += state.velocityRotation * delta;

      const distance = Math.hypot(state.x, state.y);
      renderTransform(
        state.x,
        state.y,
        state.rotation,
        1 + Math.min(distance / 5000, 0.012),
      );

      const settled =
        distance < 0.2 &&
        Math.abs(state.rotation) < 0.02 &&
        Math.hypot(state.velocityX, state.velocityY) < 7 &&
        Math.abs(state.velocityRotation) < 0.5;

      if (settled) {
        Object.assign(state, {
          x: 0,
          y: 0,
          rotation: 0,
          velocityX: 0,
          velocityY: 0,
          velocityRotation: 0,
        });
        renderTransform(0, 0, 0);
        frameRef.current = null;
        setMotionActive(false);
        return;
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
  }

  function startDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || !event.isPrimary) return;

    stopAnimation();
    const motion = motionRef.current;
    motion.dragging = true;
    motion.pointerId = event.pointerId;
    motion.pointerX = event.clientX;
    motion.pointerY = event.clientY;
    motion.startX = motion.x;
    motion.startY = motion.y;
    motion.lastX = motion.x;
    motion.lastY = motion.y;
    motion.lastTime = performance.now();
    motion.velocityX = 0;
    motion.velocityY = 0;
    motion.velocityRotation = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    setMotionActive(true);
    renderTransform(motion.x, motion.y, motion.rotation, 1.018);
  }

  function moveDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const motion = motionRef.current;
    if (!motion.dragging || event.pointerId !== motion.pointerId) return;

    event.preventDefault();
    const now = performance.now();
    const elapsed = Math.max(now - motion.lastTime, 1);
    const x = motion.startX + event.clientX - motion.pointerX;
    const y = motion.startY + event.clientY - motion.pointerY;
    const nextRotation = Math.max(-7, Math.min(7, x / 36));

    motion.velocityX = motion.velocityX * 0.55 + ((x - motion.lastX) / elapsed) * 450;
    motion.velocityY = motion.velocityY * 0.55 + ((y - motion.lastY) / elapsed) * 450;
    motion.velocityRotation =
      motion.velocityRotation * 0.55 + ((nextRotation - motion.rotation) / elapsed) * 450;
    motion.x = x;
    motion.y = y;
    motion.rotation = nextRotation;
    motion.lastX = x;
    motion.lastY = y;
    motion.lastTime = now;
    renderTransform(x, y, nextRotation, 1.018);
  }

  function endDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const motion = motionRef.current;
    if (!motion.dragging || event.pointerId !== motion.pointerId) return;

    motion.dragging = false;
    motion.velocityX = Math.max(-1800, Math.min(1800, motion.velocityX));
    motion.velocityY = Math.max(-1800, Math.min(1800, motion.velocityY));
    motion.velocityRotation = Math.max(-180, Math.min(180, motion.velocityRotation));
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setDragging(false);
    springHome();
  }

  useEffect(() => () => stopAnimation(), []);

  useEffect(() => {
    const float = floatRef.current;
    if (!float) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compactViewport = window.matchMedia('(max-width: 639px)');
    let randomState = (floatSeed + 1) * 0x9e3779b1;
    const random = () => {
      randomState ^= randomState << 13;
      randomState ^= randomState >>> 17;
      randomState ^= randomState << 5;
      return (randomState >>> 0) / 4294967296;
    };
    const initialAngle = random() * Math.PI * 2;
    const state = {
      x: (random() - 0.5) * 8,
      y: (random() - 0.5) * 8,
      velocityX: Math.cos(initialAngle) * 0.9,
      velocityY: Math.sin(initialAngle) * 0.9,
      targetVelocityX: 0,
      targetVelocityY: 0,
      rotation: 0,
      nextTurn: 0,
    };
    let previousTime = performance.now();

    const chooseDirection = (time: number) => {
      const angle = random() * Math.PI * 2;
      const speed = 0.8 + random() * 1.25;
      state.targetVelocityX = Math.cos(angle) * speed;
      state.targetVelocityY = Math.sin(angle) * speed;
      state.nextTurn = time + 2800 + random() * 4200;
    };

    chooseDirection(previousTime);

    const tick = (time: number) => {
      const delta = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;

      if (reducedMotion.matches) {
        float.style.transform = 'none';
        floatFrameRef.current = requestAnimationFrame(tick);
        return;
      }

      if (!motionRef.current.dragging && frameRef.current === null) {
        if (time >= state.nextTurn) chooseDirection(time);

        const maxRadius = compactViewport.matches ? 14 : 18;
        const softBoundary = compactViewport.matches ? 9 : 12;
        const distance = Math.hypot(state.x, state.y);
        const directionBlend = Math.min(delta * 0.34, 1);
        state.velocityX += (state.targetVelocityX - state.velocityX) * directionBlend;
        state.velocityY += (state.targetVelocityY - state.velocityY) * directionBlend;

        if (distance > softBoundary) {
          const boundaryStrength = ((distance - softBoundary) / (maxRadius - softBoundary)) ** 2;
          state.velocityX -= (state.x / distance) * boundaryStrength * delta * 2.8;
          state.velocityY -= (state.y / distance) * boundaryStrength * delta * 2.8;
        }

        const speed = Math.hypot(state.velocityX, state.velocityY);
        if (speed > 2.2) {
          state.velocityX = (state.velocityX / speed) * 2.2;
          state.velocityY = (state.velocityY / speed) * 2.2;
        }

        state.x += state.velocityX * delta;
        state.y += state.velocityY * delta;

        const nextDistance = Math.hypot(state.x, state.y);
        if (nextDistance > maxRadius) {
          const normalX = state.x / nextDistance;
          const normalY = state.y / nextDistance;
          state.x = normalX * maxRadius;
          state.y = normalY * maxRadius;
          const outwardVelocity = state.velocityX * normalX + state.velocityY * normalY;
          if (outwardVelocity > 0) {
            state.velocityX -= normalX * outwardVelocity * 1.55;
            state.velocityY -= normalY * outwardVelocity * 1.55;
          }
          state.nextTurn = time;
        }

        const targetRotation = Math.max(
          -0.5,
          Math.min(0.5, state.velocityX * 0.16 - state.velocityY * 0.06),
        );
        state.rotation += (targetRotation - state.rotation) * Math.min(delta * 0.7, 1);
        float.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) rotate(${state.rotation}deg)`;
      }

      floatFrameRef.current = requestAnimationFrame(tick);
    };

    floatFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (floatFrameRef.current !== null) {
        cancelAnimationFrame(floatFrameRef.current);
        floatFrameRef.current = null;
      }
    };
  }, [floatSeed]);

  return (
    <div
      className={`kana-card-slot relative ${slotClassName}`}
      data-motion-active={motionActive}
    >
      <div className="kana-card-float h-full" ref={floatRef}>
        <div
          className={`kana-card-drag relative h-full cursor-grab select-none ${className}`}
          data-dragging={dragging}
          onPointerCancel={endDrag}
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          ref={cardRef}
          style={{ '--card-base-rotation': `${rotation}deg` } as CSSProperties}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

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
            className="block w-full rounded-2xl bg-white"
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
          <h2
            className="sr-only m-0"
            id="about-kana"
          >
            About Kana
          </h2>

          <div className="grid gap-5 sm:grid-cols-12 max-sm:grid-cols-1">
            <DraggableCard
              className="rounded-2xl border-2 border-[#e7ebee] bg-white p-6 shadow-[0_3px_0_#e7ebee] transition-[border-color,box-shadow] duration-300 hover:border-[#81d0ff] hover:shadow-[0_3px_0_#81d0ff] max-sm:p-5"
              floatSeed={11}
              rotation={-0.35}
              slotClassName="kana-card-featured sm:col-span-7"
            >
              <h3 className="m-0 text-[15px] tracking-[-0.03em]">
                Every Hermes capability
              </h3>
              <p className="m-0 mt-2.5 text-[13px] font-semibold leading-[1.75] text-[#73787d]">
                Reasoning, web search, terminal and file access, MCP
                servers, subagents, slash commands, approvals, memory,
                sessions, and context management — all still Hermes.
              </p>
            </DraggableCard>

            <DraggableCard
              className="rounded-2xl border-2 border-[#e7ebee] bg-white p-6 shadow-[0_3px_0_#e7ebee] transition-[border-color,box-shadow] duration-300 hover:border-[#81d0ff] hover:shadow-[0_3px_0_#81d0ff] max-sm:p-5"
              floatSeed={23}
              rotation={0.8}
              slotClassName="kana-card-left sm:col-span-5"
            >
              <h3 className="m-0 text-[15px] tracking-[-0.03em]">
                A face and a voice
              </h3>
              <p className="m-0 mt-2.5 text-[13px] font-semibold leading-[1.75] text-[#73787d]">
                Live2D avatars with lip sync, a Japanese-speaking persona,
                multilingual subtitles, and local Qwen3-TTS with optional
                voice cloning or an OpenAI-compatible speech provider.
              </p>
            </DraggableCard>

            <DraggableCard
              className="rounded-2xl border-2 border-[#e7ebee] bg-white p-6 shadow-[0_3px_0_#e7ebee] transition-[border-color,box-shadow] duration-300 hover:border-[#81d0ff] hover:shadow-[0_3px_0_#81d0ff] max-sm:p-5"
              floatSeed={37}
              rotation={-0.7}
              slotClassName="kana-card-right sm:col-span-4"
            >
              <h3 className="m-0 text-[15px] tracking-[-0.03em]">
                Local by default
              </h3>
              <p className="m-0 mt-2.5 text-[13px] font-semibold leading-[1.75] text-[#73787d]">
                History and imported avatar models stay on your machine;
                session tokens and speech credentials stay out of browser
                storage.
              </p>
            </DraggableCard>

            <DraggableCard
              className="rounded-2xl border-2 border-[#e7ebee] bg-white p-6 shadow-[0_3px_0_#e7ebee] transition-[border-color,box-shadow] duration-300 hover:border-[#81d0ff] hover:shadow-[0_3px_0_#81d0ff] max-sm:p-5"
              floatSeed={53}
              rotation={0.25}
              slotClassName="kana-card-bottom sm:col-span-8"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                <div className="sm:w-[min(55%,440px)]">
                  <h3 className="m-0 text-[15px] tracking-[-0.03em]">
                    Install
                  </h3>
                  <p className="m-0 mt-2.5 text-[13px] font-semibold leading-[1.75] text-[#73787d]">
                    <code className="text-[#303438]">npm install -g kana-alya</code>,
                    then run <code className="text-[#303438]">kana</code>. It
                    finds a compatible Hermes service or starts the installed
                    Hermes process automatically.
                  </p>
                </div>
                <div className="flex-1 rounded-xl bg-[#f6f7f8] px-4 py-3 text-xs text-[#9aa1a7] sm:mt-1">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-[#56baf4]">
                    Requirements
                  </span>
                  <ul className="m-0 mt-1.5 list-none p-0 leading-[1.8]">
                    <li>Existing Hermes Agent</li>
                    <li>Linux x64 with glibc</li>
                    <li>Node.js 22.13+</li>
                  </ul>
                </div>
              </div>
            </DraggableCard>
          </div>

          <div className="mt-[clamp(44px,7vw,64px)] grid items-start gap-3 sm:grid-cols-2 max-sm:grid-cols-1">
            {faqEntries.map((entry) => (
              <details
                className="group self-start rounded-2xl border border-[#e7ebee] bg-white p-5 transition-colors duration-200 open:bg-[#fbf9fa] max-sm:p-4"
                key={entry.question}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[clamp(15px,1.7vw,17px)] font-bold tracking-[-0.03em] [&::-webkit-details-marker]:hidden">
                  <h4 className="m-0 leading-snug">{entry.question}</h4>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[#f2faff] text-sm leading-none font-normal text-[#56baf4] transition-transform duration-300 group-open:rotate-45 max-sm:size-5"
                  >
                    +
                  </span>
                </summary>
                <p className="m-0 mt-3 max-w-[520px] text-[13px] font-semibold leading-[1.8] text-[#73787d] max-sm:text-xs">
                  {entry.answer}
                </p>
              </details>
            ))}
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
          Supported by reelva.me
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
            aria-label="Supported by reelva.me"
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
          .kana-label {
            animation: kana-label-wiggle 4s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
          }
        }

        @keyframes kana-label-wiggle {
          0%, 92%, 100% {
            transform: rotate(0deg);
          }
          94% {
            transform: rotate(-1.5deg) scale(1.03);
          }
          97% {
            transform: rotate(1.5deg) scale(1.03);
          }
        }

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

          .kana-card-slot {
            opacity: 0;
            transform: translateY(24px);
            animation: kana-card-pop 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          }

          .kana-card-featured { animation-delay: 0.1s; }
          .kana-card-left { animation-delay: 0.22s; }
          .kana-card-right { animation-delay: 0.34s; }
          .kana-card-bottom { animation-delay: 0.46s; }
        }

        @keyframes kana-card-pop {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .kana-card-slot[data-motion-active='true'] {
          z-index: 30;
        }

        .kana-card-float {
          transform-origin: center;
          will-change: transform;
        }

        .kana-card-drag {
          touch-action: none;
          transform: translate3d(var(--card-x, 0px), var(--card-y, 0px), 0)
            rotate(calc(var(--card-base-rotation, 0deg) + var(--card-drag-rotation, 0deg)))
            scale(var(--card-scale, 1));
          transform-origin: center;
          will-change: transform;
        }

        .kana-card-drag[data-dragging='true'] {
          cursor: grabbing;
        }

        @media (prefers-reduced-motion: no-preference) {
          .kana-card-drag::after {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: inherit;
            pointer-events: none;
            box-shadow: 0 24px 60px -18px rgba(86, 186, 244, 0.18);
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .kana-card-drag:hover::after,
          .kana-card-drag[data-dragging='true']::after {
            opacity: 1;
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
