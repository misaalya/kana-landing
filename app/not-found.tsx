export default function NotFound() {
  return (
    <main className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-[28px] bg-[#fbf9fa] px-6 text-center text-[#17191b] shadow-[0_4px_32px_rgb(0_0_0/0.06)] max-sm:rounded-2xl">
      <div className="flex -translate-y-3 flex-col items-center max-sm:-translate-y-1">
        <div className="kana-not-found-content flex flex-col items-center">
        <p
          aria-label="404"
          className="m-0 flex items-center whitespace-nowrap text-[clamp(104px,18vw,210px)] leading-[0.76] tracking-[-0.1em] text-white [paint-order:stroke_fill] [-webkit-text-stroke:10px_#81d0ff] max-sm:[-webkit-text-stroke:7px_#81d0ff]"
        >
          <span aria-hidden="true">4</span>
          <svg
            aria-hidden="true"
            className="kana-title-heart mx-[0.15em] block h-[0.56em] w-[0.68em] shrink-0 origin-center text-[#ff4d67]"
            viewBox="0 0 10 9"
            fill="currentColor"
          >
            <path d="M1 0h3v1h2V0h3v1h1v4H9v1H8v1H7v1H6v1H4V8H3V7H2V6H1V5H0V1h1V0Z" />
          </svg>
          <span aria-hidden="true" className="-translate-x-[0.1em]">4</span>
        </p>

        <h1 className="m-0 mt-8 text-balance text-[clamp(22px,3vw,32px)] leading-tight tracking-[-0.04em] max-sm:mt-7">
          Kana lost the page.
        </h1>
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .kana-not-found-content {
            opacity: 0;
            animation: kana-not-found-arrive 700ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          }

          .kana-title-heart {
            animation: kana-not-found-heartbeat 4s cubic-bezier(0.2, 0.8, 0.2, 1) 500ms infinite;
          }
        }

        @keyframes kana-not-found-arrive {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.98);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes kana-not-found-heartbeat {
          0%,
          18%,
          100% {
            transform: scale(1) rotate(0);
          }

          5% {
            transform: scale(1.16) rotate(-4deg);
          }

          9% {
            transform: scale(0.96) rotate(2deg);
          }

          13% {
            transform: scale(1.08) rotate(-1deg);
          }
        }
      `}</style>
    </main>
  );
}
