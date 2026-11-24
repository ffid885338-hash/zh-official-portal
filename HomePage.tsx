import {useState} from 'react';
import {ArrowRight} from 'lucide-react';
import {SITE_CONFIG} from '../config';

interface HomePageProps {
  onVerify: () => void;
}

function TelegramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px] shrink-0 text-[#29B6F6]"
      fill="currentColor"
    >
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px] shrink-0 text-[#FF3D3D]"
      fill="currentColor"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function HomePage({onVerify}: HomePageProps) {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <section
      aria-label="Verification Home"
      className="w-full max-w-[420px] rounded-2xl bg-[#0D1320]/85 border border-white/[0.08] p-7 sm:p-10 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md"
    >
      <div className="flex flex-col items-center text-center">
        {/* Centered Logo Placeholder */}
        <div className="mb-6 flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center overflow-hidden rounded-2xl bg-[#090D16] ring-1 ring-white/12 shadow-[0_12px_32px_-8px_rgba(37,99,235,0.28)]">
          {!logoFailed ? (
            <img
              src={SITE_CONFIG.logoUrl}
              alt={SITE_CONFIG.logoAlt}
              referrerPolicy="no-referrer"
              onError={() => setLogoFailed(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950 text-sky-400">
              <svg
                aria-hidden="true"
                viewBox="0 0 40 40"
                className="h-11 w-11"
                fill="none"
              >
                <path
                  d="M20 4L33 28H7L20 4Z"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 14L27 28H13L20 14Z"
                  fill="currentColor"
                  fillOpacity="0.25"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Title directly below logo */}
        <h1 className="text-2xl sm:text-[28px] font-semibold tracking-tight text-slate-50 leading-snug text-balance">
          {SITE_CONFIG.brandTitle}
        </h1>

        {/* Primary Verify CTA */}
        <div className="mt-7 w-full">
          <button
            type="button"
            onClick={onVerify}
            className="group flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-50 px-6 py-3 text-base font-semibold tracking-[-0.01em] text-[#070A10] shadow-[0_1px_2px_rgba(0,0,0,0.2),0_0_28px_-6px_rgba(56,189,248,0.35)] transition-all duration-150 ease-out hover:bg-white active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 whitespace-nowrap"
          >
            <span>{SITE_CONFIG.verifyButtonLabel}</span>
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
            />
          </button>
        </div>

        {/* Separate Telegram & YouTube Buttons */}
        <div className="mt-6 w-full border-t border-white/[0.08] pt-6">
          <div className="grid grid-cols-2 gap-3">
            <a
              href={SITE_CONFIG.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors duration-150 hover:border-white/[0.16] hover:bg-white/[0.08] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 whitespace-nowrap shrink-0"
            >
              <TelegramIcon />
              <span>Telegram</span>
            </a>

            <a
              href={SITE_CONFIG.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors duration-150 hover:border-white/[0.16] hover:bg-white/[0.08] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 whitespace-nowrap shrink-0"
            >
              <YouTubeIcon />
              <span>YouTube</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
