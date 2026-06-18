import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Home, Compass, Trophy, List, User, Search, X, Menu } from 'lucide-react';
import { cn } from '@/utils/format';

const navItems = [
  { to: '/', icon: Home, label: '首页' },
  { to: '/discover', icon: Compass, label: '发现' },
  { to: '/ranking', icon: Trophy, label: '排行榜' },
  { to: '/playlists', icon: List, label: '片单' },
  { to: '/profile', icon: User, label: '我的' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-cinema-charcoal-950/90 backdrop-blur-xl border-b border-cinema-gold-500/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]'
            : 'bg-gradient-to-b from-cinema-charcoal-950/80 via-cinema-charcoal-950/40 to-transparent'
        )}
      >
        <nav className="container mx-auto flex items-center justify-between h-20 px-4 md:px-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center shadow-gold-glow group-hover:scale-110 transition-transform">
                <Film className="w-5 h-5 text-cinema-charcoal-950" strokeWidth={2.5} />
              </div>
              <div className="absolute -inset-1 rounded-xl bg-cinema-gold-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-2xl font-bold bg-gold-gradient bg-clip-text text-transparent" style={{ backgroundSize: '200% auto' }}>
                CineScope
              </span>
              <p className="text-[10px] text-cinema-gold-600/70 tracking-[0.25em] -mt-1">CINEMA DISCOVERY</p>
            </div>
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => cn(
                    'relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300',
                    isActive
                      ? 'text-cinema-charcoal-950 bg-gold-gradient shadow-gold-glow'
                      : 'text-cinema-charcoal-200 hover:text-cinema-gold-400 hover:bg-cinema-gold-500/5'
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <AnimatePresence mode="wait">
              {searchOpen ? (
                <motion.div
                  key="search-open"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center gap-2 bg-cinema-charcoal-800/80 rounded-xl px-4 py-2 border border-cinema-gold-500/20 w-56 md:w-72">
                    <Search className="w-4 h-4 text-cinema-gold-500 flex-shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="搜索电影、演员、导演..."
                      autoFocus
                      className="flex-1 bg-transparent outline-none text-sm text-cinema-cream placeholder-cinema-charcoal-400"
                    />
                    <button
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="text-cinema-charcoal-400 hover:text-cinema-cream transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.button
                  key="search-closed"
                  onClick={() => setSearchOpen(true)}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="w-11 h-11 rounded-xl bg-cinema-charcoal-800/50 hover:bg-cinema-charcoal-700/80 border border-cinema-gold-500/15 flex items-center justify-center text-cinema-gold-400 hover:text-cinema-gold-300 transition-all hover:shadow-[0_0_20px_rgba(212,162,76,0.2)]"
                >
                  <Search className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-11 h-11 rounded-xl bg-cinema-charcoal-800/50 border border-cinema-gold-500/15 flex items-center justify-center text-cinema-gold-400"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-cinema-charcoal-900 border-l border-cinema-gold-500/10 z-50 lg:hidden pt-24 px-6"
            >
              <ul className="space-y-2">
                {navItems.map((item, idx) => (
                  <motion.li
                    key={item.to}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.06 }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) => cn(
                        'flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all',
                        isActive
                          ? 'text-cinema-charcoal-950 bg-gold-gradient shadow-gold-glow'
                          : 'text-cinema-charcoal-200 hover:text-cinema-gold-400 hover:bg-cinema-gold-500/5 border border-transparent hover:border-cinema-gold-500/20'
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
