import {useEffect, useState} from 'react';
import {ArrowLeft, ExternalLink} from 'lucide-react';
import {SITE_CONFIG} from '../config';

interface RedirectPageProps {
  onBack: () => void;
}

const TOTAL_DURATION_MS = SITE_CONFIG.redirectDelaySeconds * 1000;
const RING_RADIUS = 38;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export function RedirectPage({onBack}: RedirectPageProps) {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [redirectTriggered, setRedirectTriggered] = useState(false);

  useEffect(() => {
    const startTime = performance.now();

    const intervalId = window.setInterval(() => {
      const elapsed = Math.min(performance.now() - startTime, TOTAL_DURATION_MS);
      setElapsedMs(elapsed);

      if (elapsed >= TOTAL_DURATION_MS) {
        window.clearInterval(intervalId);
      }
    }, 40);

    const redirectTimer = window.setTimeout(() => {
      setRedirectTriggered(true);
      try {
        window.location.assign(SITE_CONFIG.bpLinkUrl);
      } catch {
        // Fallback link remains visible below if navigation is restricted
      }
    }, TOTAL_DURATION_MS);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(redirectTimer);
    };
  }, []);

  const progress = Math.min(elapsedMs / TOTAL_DURATION_MS, 1);
  const strokeDashoffset = RING_CIRCUMFERENCE * (1 - progress);
  const secondsLeft = Math.max(
    0,
    Math.ceil((TOTAL_DURATION_MS - elapsedMs) / 1000)
  );

  return (
    <section
      aria-label="Redirecting"
      className="w-full max-w-[420px] rounded-2xl bg-[#0D1320]/85 border border-white/[0.08] p-8 sm:p-10 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md text-center"
    >
      <div className="flex flex-col items-center">
        {/* 3-Second Loading Animation */}
        <div
          role="progressbar"
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Redirect countdown"
          className="relative mb-6 flex h-24 w-24 items-center justify-center"
        >
          {/* Ambient Rotating Spinner Arc */}
          <div
            aria-hidden="true"
            className="animate-spin-smooth absolute inset-0 rounded-full border-2 border-transparent border-t-sky-400/70"
          />

          {/* SVG Progress Ring */}
          <svg
            aria-hidden="true"
            viewBox="0 0 96 96"
            className="h-24 w-24 -rotate-90"
          >
            <circle
              cx="48"
              cy="48"
              r={RING_RADIUS}
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="4"
            />
            <circle
              cx="48"
              cy="48"
              r={RING_RADIUS}
              fill="none"
              stroke="#38BDF8"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={RING_CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>

          {/* Tabular Countdown Number */}
          <span className="absolute font-mono text-xl font-semibold tabular-nums text-slate-100">
            {secondsLeft}s
          </span>
        </div>

        {/* Redirecting Heading */}
        <h1 className="text-2xl sm:text-[28px] font-semibold tracking-tight text-slate-50">
          {SITE_CONFIG.redirectHeading}
        </h1>

        {/* Subtext */}
        <p className="mt-2 text-sm text-slate-400">
          {SITE_CONFIG.redirectSubtext}
        </p>

        {/* Fallback manual link if automatic redirect is blocked by browser/iframe */}
        {redirectTriggered && (
          <div className="mt-6 w-full space-y-3 border-t border-white/[0.08] pt-5">
            <a
              href={SITE_CONFIG.bpLinkUrl}
              target="_top"
              rel="noopener noreferrer"
              className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-slate-50 px-5 py-2.5 text-sm font-semibold text-[#070A10] transition-colors duration-150 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 whitespace-nowrap"
            >
              <span>Continue to destination</span>
              <ExternalLink aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        )}

        <button
          type="button"
          onClick={onBack}
          className="mt-6 inline-flex min-h-[40px] cursor-pointer items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-400 transition-colors duration-150 hover:text-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 whitespace-nowrap"
        >
          <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
          <span>Back to Home</span>
        </button>
      </div>
    </section>
  );
}
