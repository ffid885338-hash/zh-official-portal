import {useEffect, useState} from 'react';
import {AnimatePresence, MotionConfig, motion} from 'motion/react';
import {HomePage} from './components/HomePage';
import {RedirectPage} from './components/RedirectPage';

type PageRoute = 'home' | 'redirect';

function getInitialRoute(): PageRoute {
  if (typeof window !== 'undefined' && window.location.hash === '#redirect') {
    return 'redirect';
  }
  return 'home';
}

export default function App() {
  const [page, setPage] = useState<PageRoute>(getInitialRoute);

  useEffect(() => {
    const handleHashChange = () => {
      setPage(window.location.hash === '#redirect' ? 'redirect' : 'home');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const goToRedirect = () => {
    if (window.location.hash !== '#redirect') {
      window.location.hash = 'redirect';
    }
    setPage('redirect');
  };

  const goToHome = () => {
    if (window.location.hash === '#redirect') {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
    setPage('home');
  };

  return (
    <MotionConfig reducedMotion="user">
      <main className="portal-gradient-bg relative flex min-h-dvh w-full items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
        <AnimatePresence mode="wait">
          {page === 'home' ? (
            <motion.div
              key="home-page"
              initial={{opacity: 0, y: 8}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -8}}
              transition={{duration: 0.18, ease: [0.16, 1, 0.3, 1]}}
              className="flex w-full justify-center"
            >
              <HomePage onVerify={goToRedirect} />
            </motion.div>
          ) : (
            <motion.div
              key="redirect-page"
              initial={{opacity: 0, y: 8}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -8}}
              transition={{duration: 0.18, ease: [0.16, 1, 0.3, 1]}}
              className="flex w-full justify-center"
            >
              <RedirectPage onBack={goToHome} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </MotionConfig>
  );
}
