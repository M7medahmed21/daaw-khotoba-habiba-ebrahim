import { useEffect, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { CalendarDays, MapPin, MoveDown, Sparkle } from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const [coverState, setCoverState] = useState<'closed' | 'opening' | 'open'>('closed');
  const [countdown, setCountdown] = useState({ days: '٠٠٠', hours: '٠٠', minutes: '٠٠', seconds: '٠٠' });
  const [eventPassed, setEventPassed] = useState(false);

  useEffect(() => {
    if (coverState === 'open') return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [coverState]);

  useEffect(() => {
    // Cairo is UTC+03:00 on 12 October 2026.
    const eventMoment = Date.UTC(2026, 9, 12, 16, 0, 0);
    const format = (value: number, length: number) => String(value).padStart(length, '0').replace(/\d/g, (digit) => '٠١٢٣٤٥٦٧٨٩'[Number(digit)]);
    const update = () => {
      const remaining = eventMoment - Date.now();
      if (remaining <= 0) {
        setEventPassed(true);
        setCountdown({ days: '٠٠٠', hours: '٠٠', minutes: '٠٠', seconds: '٠٠' });
        return;
      }
      const totalSeconds = Math.floor(remaining / 1000);
      setCountdown({
        days: format(Math.floor(totalSeconds / 86400), 3),
        hours: format(Math.floor((totalSeconds % 86400) / 3600), 2),
        minutes: format(Math.floor((totalSeconds % 3600) / 60), 2),
        seconds: format(totalSeconds % 60, 2),
      });
    };
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <main
        className={`invitation-page ${coverState === 'open' ? 'invitation-page--revealed' : 'invitation-page--covered'}`}
        dir="rtl"
        lang="ar"
        aria-hidden={coverState !== 'open'}
      >
        <div className="mx-auto flex min-h-[100dvh] max-w-[1440px] flex-col px-5 pb-8 pt-7 sm:px-10 sm:pt-10">
        <header className="intro mx-auto flex w-full max-w-6xl items-center justify-between border-b border-[#8a6257]/20 pb-4">
          <a href="#home" aria-label="بداية الدعوة" className="text-xl font-bold tracking-wide text-[#765449]">حبيبة وإبراهيم</a>
          <p className="text-sm text-[#826d61]">دعوة من القلب</p>
          <a href="#التفاصيل" className="rounded-full border border-[#8a6257]/25 px-4 py-2 text-sm text-[#765449] transition hover:bg-[#8a6257]/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8a6257]">تفاصيل اليوم</a>
        </header>

        <section id="home" className="intro relative mx-auto flex w-full max-w-6xl flex-1 items-center justify-center py-14 sm:py-20">
          <div className="paper-card relative w-full max-w-[820px] px-7 py-14 text-center sm:px-16 sm:py-[4.8rem]">
            <div className="absolute -left-8 top-1/2 hidden -translate-y-1/2 text-[#ad8b71]/65 md:block" aria-hidden="true">
              <Ornament />
            </div>
            <div className="absolute -right-8 top-1/2 hidden -translate-y-1/2 -scale-x-100 text-[#ad8b71]/65 md:block" aria-hidden="true">
              <Ornament />
            </div>
            <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#ae9078]/45 text-[#8a6257]">
              <Sparkle size={17} strokeWidth={1.25} aria-hidden="true" />
            </div>
            <p className="mb-5 text-base tracking-wide text-[#8c7568]">بكل الحب والفرح</p>
            <h1 className="font-names text-[clamp(3.3rem,11vw,6.5rem)] font-bold leading-[1.25] text-[#765449]" data-testid="text-couple-names">
              حبيبة <span className="mx-1 text-[.66em] font-normal text-[#b28d70]">و</span> إبراهيم
            </h1>
            <div className="mx-auto my-7 flex max-w-[320px] items-center gap-4">
              <span className="fine-rule flex-1" />
              <span className="flourish" aria-hidden="true">
                <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
                  <path d="M2 9C6 2 11 2 12 9C13 16 18 16 22 9M6 9C8 6 10 6 12 9C14 12 16 12 18 9" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
                </svg>
              </span>
              <span className="fine-rule flex-1" />
            </div>
            <p className="mx-auto max-w-[490px] text-[1.25rem] leading-[2] text-[#5d4c42] sm:text-[1.45rem]">
              يسعدنا أن تشاركونا فرحتنا،<br className="hidden sm:block" /> وتكونوا معنا في يومٍ سيبقى من أجمل حكاياتنا.
            </p>
            <p className="mt-7 text-[1.1rem] text-[#8a6257]">ننتظركم بكل شوق لنحتفل معًا بهذه المناسبة الغالية</p>
            <a href="#التفاصيل" className="mx-auto mt-10 flex w-fit flex-col items-center gap-2 text-[#9a7c69] transition hover:text-[#765449]">
              <span className="text-sm">اكتشفوا تفاصيل اليوم</span>
              <MoveDown size={17} strokeWidth={1.3} aria-hidden="true" />
            </a>
          </div>
          <span className="pointer-events-none absolute bottom-5 left-1/2 hidden h-10 w-px bg-gradient-to-b from-[#a88670]/60 to-transparent md:block" aria-hidden="true" />
        </section>

        <section id="التفاصيل" className="reveal mx-auto w-full max-w-4xl pb-12 pt-4 text-center sm:pb-20">
          <p className="mb-5 text-sm tracking-wide text-[#987b68]">موعد فرحتنا</p>
          <h2 className="font-names text-3xl font-bold text-[#765449] sm:text-4xl" data-testid="text-event-date">الاثنين 12 أكتوبر 2026</h2>
          <p className="mt-3 text-xl text-[#625147]" data-testid="text-event-time">الساعة 7 مساءً</p>
          <a
            href="https://maps.app.goo.gl/WpbsipRGAumHbqVs5"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="عرض موقع الاحتفال على خرائط Google"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#8a6257]/25 px-5 py-2.5 text-[#765449] transition hover:-translate-y-0.5 hover:bg-[#8a6257]/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8a6257]"
          >
            <MapPin size={17} strokeWidth={1.5} aria-hidden="true" />
            <span>الموقع على الخريطة</span>
          </a>
          <div className="mx-auto my-9 flex max-w-[490px] items-center gap-5">
            <span className="fine-rule flex-1" />
            <CalendarDays size={18} strokeWidth={1.35} className="text-[#987b68]" aria-hidden="true" />
            <span className="fine-rule flex-1" />
          </div>
          <p className="mb-6 text-base text-[#8b7568]">{eventPassed ? 'كان يومًا أجمل بوجودكم' : 'باقٍ على لقائنا'}</p>
          <div className="mx-auto flex max-w-[450px] items-start justify-center gap-3 sm:gap-6" dir="rtl" aria-label="الوقت المتبقي حتى موعد الاحتفال">
            <TimeUnit value={countdown.days} label="يوم" />
            <span className="mt-1 text-2xl text-[#bc9d83]">:</span>
            <TimeUnit value={countdown.hours} label="ساعة" />
            <span className="mt-1 text-2xl text-[#bc9d83]">:</span>
            <TimeUnit value={countdown.minutes} label="دقيقة" />
            <span className="mt-1 text-2xl text-[#bc9d83]">:</span>
            <TimeUnit value={countdown.seconds} label="ثانية" />
          </div>
          <p className="mt-3 text-sm text-[#8b7568]">احفظوا الموعد في تقويمكم، وسنكون بانتظاركم</p>
        </section>

        <footer className="reveal mx-auto w-full max-w-6xl border-t border-[#8a6257]/20 py-6 text-center">
          <p className="font-names text-2xl font-bold text-[#765449]">حبيبة وإبراهيم</p>
          <p className="mt-1 text-sm text-[#8b7568]">فرحتنا تكتمل بوجودكم</p>
        </footer>
        </div>
      </main>

      {coverState !== 'open' && (
        <div className={`invitation-cover ${coverState === 'opening' ? 'is-opening' : ''}`} dir="rtl" lang="ar">
          <button
            type="button"
            className="invitation-cover__card"
            aria-label="افتح دعوة خطوبة حبيبة وإبراهيم"
            disabled={coverState === 'opening'}
            onClick={() => setCoverState('opening')}
            onAnimationEnd={(event) => {
              if (event.target === event.currentTarget && coverState === 'opening') {
                setCoverState('open');
              }
            }}
          >
            <span className="invitation-cover__paper">
              <span className="invitation-cover__seal" aria-hidden="true">
                <Sparkle size={19} strokeWidth={1.2} />
              </span>
              <span className="invitation-cover__eyebrow">دعوة خطوبة</span>
              <span className="invitation-cover__names font-names">
                حبيبة <span className="invitation-cover__and">و</span> إبراهيم
              </span>
              <span className="invitation-cover__date">الاثنين 12 أكتوبر 2026</span>
              <span className="invitation-cover__open">
                <span>اضغطوا لفتح الدعوة</span>
                <MoveDown size={16} strokeWidth={1.3} aria-hidden="true" />
              </span>
            </span>
          </button>
        </div>
      )}
    </>
  );
}

function TimeUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-[56px] sm:min-w-[76px]">
      <span className="font-names block text-3xl font-bold tabular-nums text-[#765449] sm:text-4xl" data-testid={`countdown-${label}`}>{value}</span>
      <span className="mt-1 block text-sm text-[#8b7568]">{label}</span>
    </div>
  );
}

function Ornament() {
  return (
    <svg width="58" height="220" viewBox="0 0 58 220" fill="none" aria-hidden="true">
      <path d="M43 218C10 186 12 151 38 129C57 113 52 87 30 81C8 75 6 51 24 40C39 31 41 17 30 3" stroke="currentColor" strokeWidth="1.15" />
      <path d="M29 177C44 177 51 166 47 154C34 156 27 165 29 177ZM28 145C14 145 8 135 12 124C24 125 31 134 28 145ZM31 105C44 105 50 96 47 86C35 87 28 95 31 105ZM22 69C11 67 6 58 11 49C21 52 26 60 22 69Z" stroke="currentColor" strokeWidth="1" />
      <circle cx="29" cy="190" r="2" fill="currentColor" />
      <path d="M19 205C27 199 34 200 40 206C32 212 25 212 19 205Z" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
