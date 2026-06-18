import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Info, TrendingUp, Sparkles } from 'lucide-react';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { MOVIES, getWeeklyRanking } from '@/data/movies';
import { MOODS } from '@/data/moods';
import MovieCard from '@/components/movie/MovieCard';
import RatingRing from '@/components/movie/RatingRing';
import { useAppStore } from '@/store';
import { cn } from '@/utils/format';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const heroMovies = getWeeklyRanking().slice(0, 5);
  const { setFilterMood } = useAppStore();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroMovies.length);
  }, [heroMovies.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroMovies.length) % heroMovies.length);
  }, [heroMovies.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const handleMoodClick = (moodId: string) => {
    setFilterMood(moodId as any);
    navigate(`/discover/mood/${moodId}`);
  };

  const trending = MOVIES.filter(m => m.weeklyRank).slice(0, 8);
  const featured = [...MOVIES].sort((a, b) => b.rating - a.rating).slice(0, 10);

  return (
    <div className="relative">
      {/* Hero Carousel */}
      <section className="relative h-[92vh] min-h-[640px] overflow-hidden">
        <AnimatePresence mode="wait">
          {heroMovies[currentSlide] && (
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              <img
                src={heroMovies[currentSlide].backdrop}
                alt={heroMovies[currentSlide].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-hero-gradient" />
              <div className="absolute inset-0 bg-gradient-to-r from-cinema-charcoal-950 via-cinema-charcoal-950/70 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative h-full container mx-auto px-4 md:px-6 flex items-end pb-24 md:pb-32">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              {heroMovies[currentSlide] && (
                <motion.div
                  key={`content-${currentSlide}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cinema-gold-500/15 backdrop-blur-md border border-cinema-gold-500/30">
                      <TrendingUp className="w-3.5 h-3.5 text-cinema-gold-400" />
                      <span className="text-xs font-medium text-cinema-gold-300">本周热映 NO.{currentSlide + 1}</span>
                    </div>
                    <span className="text-sm text-cinema-charcoal-300">{heroMovies[currentSlide].year}</span>
                  </div>

                  <h1 className="font-display text-5xl md:text-7xl font-bold text-cinema-cream leading-tight mb-5">
                    {heroMovies[currentSlide].title}
                  </h1>
                  <p className="text-cinema-charcoal-100 italic text-lg md:text-xl mb-3 font-display">
                    {heroMovies[currentSlide].originalTitle}
                  </p>

                  <div className="flex items-center gap-6 mb-6">
                    <RatingRing rating={heroMovies[currentSlide].rating} size="md" />
                    <div className="flex flex-wrap gap-2">
                      {heroMovies[currentSlide].genres.map(g => (
                        <span key={g} className="px-3 py-1 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-cinema-cream/90">
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-cinema-charcoal-200 leading-relaxed mb-8 max-w-xl line-clamp-3">
                    {heroMovies[currentSlide].synopsis}
                  </p>

                  <div className="flex items-center gap-4">
                    <Link
                      to={`/movie/${heroMovies[currentSlide].id}`}
                      className="btn-gold flex items-center gap-2.5 px-8 py-3.5 text-base"
                    >
                      <Play className="w-5 h-5 fill-current" />
                      立即观看
                    </Link>
                    <Link
                      to={`/movie/${heroMovies[currentSlide].id}`}
                      className="btn-outline flex items-center gap-2.5 px-8 py-3.5 text-base"
                    >
                      <Info className="w-5 h-5" />
                      影片详情
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute bottom-8 md:bottom-12 right-4 md:right-6 flex flex-col gap-4 items-end">
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-cinema-cream hover:bg-cinema-gold-500/20 hover:border-cinema-gold-500/40 transition-all hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-cinema-cream hover:bg-cinema-gold-500/20 hover:border-cinema-gold-500/40 transition-all hover:scale-110"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-2">
              {heroMovies.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-500',
                    idx === currentSlide
                      ? 'w-10 bg-gold-gradient shadow-gold-glow'
                      : 'w-4 bg-white/20 hover:bg-white/40'
                  )}
                  style={idx === currentSlide ? { backgroundSize: '200% auto' } : {}}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-cinema-charcoal-900 pointer-events-none" />
      </section>

      {/* Mood Categories */}
      <section className="container mx-auto px-4 md:px-6 -mt-4 relative z-20 mb-20">
        <div className="bg-cinema-charcoal-800/50 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-cinema-gold-500/10 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
            <div>
              <h2 className="section-title !mb-2">
                <Sparkles className="w-8 h-8 text-cinema-gold-500" />
                按心情选片
              </h2>
              <p className="text-cinema-charcoal-300 ml-5 md:ml-6 pl-2 border-l-2 border-cinema-charcoal-700">
                还在纠结？让当下的心情替你做决定
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5">
            {MOODS.map((mood, idx) => {
              const Icon = (Icons as unknown as Record<string, LucideIcon>)[mood.icon] || Icons.Heart;
              return (
                <motion.button
                  key={mood.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => handleMoodClick(mood.id)}
                  className="group relative overflow-hidden rounded-2xl p-5 md:p-6 text-left bg-cinema-charcoal-900/60 border border-cinema-gold-500/10 hover:border-cinema-gold-500/40 transition-all duration-500 hover:-translate-y-1.5"
                >
                  <div className={cn(
                    'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500',
                    mood.color
                  )} />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-cinema-gold-500/10 border border-cinema-gold-500/20 flex items-center justify-center mb-4 group-hover:bg-cinema-gold-500 group-hover:border-cinema-gold-500 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="w-6 h-6 text-cinema-gold-400 group-hover:text-cinema-charcoal-950 transition-colors" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-cinema-cream mb-1.5 group-hover:text-cinema-gold-400 transition-colors">
                      {mood.label}
                    </h3>
                    <p className="text-sm text-cinema-charcoal-400 leading-relaxed line-clamp-2">
                      {mood.description}
                    </p>
                  </div>
                  <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-cinema-gold-500/5 blur-2xl group-hover:bg-cinema-gold-500/15 transition-all duration-500" />
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Weekly Trending */}
      <section className="container mx-auto px-4 md:px-6 mb-20">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <h2 className="section-title !mb-0">
            本周热映榜单
          </h2>
          <Link
            to="/ranking"
            className="text-sm text-cinema-gold-400 hover:text-cinema-gold-300 flex items-center gap-1.5 transition-colors"
          >
            查看完整榜单
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">
          {trending.map((movie, idx) => (
            <MovieCard key={movie.id} movie={movie} rank={idx + 1} />
          ))}
        </div>
      </section>

      {/* Featured Scrolling */}
      <section className="container mx-auto px-4 md:px-6 mb-20">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <h2 className="section-title !mb-0">
            编辑精选推荐
          </h2>
        </div>

        <div className="relative">
          <div className="overflow-x-auto pb-4 -mx-4 px-4 md:-mx-6 md:px-6 [scrollbar-width:thin]">
            <div className="flex gap-5 md:gap-6" style={{ width: 'max-content' }}>
              {featured.map((movie) => (
                <div key={movie.id} className="w-56 md:w-64 flex-shrink-0">
                  <MovieCard movie={movie} rank={undefined} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
