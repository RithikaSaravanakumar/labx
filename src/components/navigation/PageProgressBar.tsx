/**
 * PageProgressBar
 *
 * A YouTube / Linear-style thin progress bar that "strikes" across the very
 * top of the viewport on every route navigation (and on initial page load).
 *
 * - Starts immediately at 0 → rushes to ~80% while the page loads
 * - Completes to 100% when the route settles
 * - Fades out smoothly after completing
 * - Stacked above the fixed navbar (z-[9999])
 */
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageProgressBar() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isFirstMount = useRef(true);

  const clearTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const startProgress = () => {
    clearTimers();
    setProgress(0);
    setVisible(true);

    let current = 0;
    // Advance quickly to ~75% then slow down (simulating async work)
    intervalRef.current = setInterval(() => {
      current += current < 30 ? 8 : current < 60 ? 4 : current < 75 ? 1.5 : 0.4;
      if (current >= 85) {
        clearInterval(intervalRef.current!);
        current = 85;
      }
      setProgress(current);
    }, 40);

    // After a short delay, complete and hide
    timerRef.current = setTimeout(() => {
      clearInterval(intervalRef.current!);
      setProgress(100);
      // Fade out after bar reaches 100%
      timerRef.current = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 400);
    }, 500);
  };

  // Fire on every route change (and on first mount)
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      // Slight delay on first mount so it's noticeable but not intrusive
      timerRef.current = setTimeout(startProgress, 80);
      return () => clearTimers();
    }
    startProgress();
    return () => clearTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="progress-bar"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none"
          style={{ height: '3px' }}
        >
          {/* The striking bar */}
          <div
            className="h-full bg-gradient-to-r from-[#00FF87] via-[#10B981] to-[#34D399]"
            style={{
              width: `${progress}%`,
              transition: progress === 100
                ? 'width 0.25s ease-out'
                : 'width 0.04s linear',
              boxShadow: '0 0 12px rgba(0, 255, 135, 0.85), 0 0 4px rgba(0, 255, 135, 1)',
            }}
          />

          {/* Glowing tip dot at the leading edge */}
          {progress > 0 && progress < 100 && (
            <div
              className="absolute top-1/2 -translate-y-1/2 w-5 h-5 -translate-x-1/2"
              style={{ left: `${progress}%` }}
            >
              <div className="w-2 h-2 rounded-full bg-[#00FF87] shadow-[0_0_10px_#00FF87,0_0_20px_rgba(0,255,135,0.7)] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
