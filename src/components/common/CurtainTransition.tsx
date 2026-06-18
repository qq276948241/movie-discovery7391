import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function CurtainTransition() {
  const location = useLocation();
  const [showCurtains, setShowCurtains] = useState(false);
  const [routeKey, setRouteKey] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname === routeKey) return;

    setShowCurtains(true);
    const timer = setTimeout(() => {
      setRouteKey(location.pathname);
      setTimeout(() => setShowCurtains(false), 100);
    }, 400);

    return () => clearTimeout(timer);
  }, [location.pathname, routeKey]);

  return (
    <AnimatePresence>
      {showCurtains && (
        <>
          <motion.div
            key="curtain-left"
            className="curtain-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            key="curtain-right"
            className="curtain-right"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            key="curtain-gold-bar"
            className="fixed top-0 left-0 right-0 h-2 z-[10000] bg-gold-gradient shadow-gold-glow"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0, transition: { delay: 0.15 } }}
            transition={{ duration: 0.3 }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
