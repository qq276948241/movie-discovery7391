import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, TrendingUp, Calendar, Sparkles, Crown, Star, Medal } from 'lucide-react';
import { getWeeklyRanking, getMonthlyRanking, getHiddenGems } from '@/data/movies';
import MovieCard from '@/components/movie/MovieCard';
import RatingRing from '@/components/movie/RatingRing';
import { Link } from 'react-router-dom';
import { cn, formatVotes } from '@/utils/format';
import type { Movie } from '@/types';

type TabType = 'weekly' | 'monthly' | 'hidden';

const TABS: { id: TabType; label: string; icon: typeof Trophy; desc: string }[] = [
  { id: 'weekly', label: '周榜', icon: TrendingUp, desc: '本周热度飙升的电影' },
  { id: 'monthly', label: '月榜', icon: Calendar, desc: '本月口碑最佳的电影' },
  { id: 'hidden', label: '冷门佳作', icon: Sparkles, desc: '评分高但少有人知的宝藏' },
];

export default function RankingPage() {
  const [activeTab, setActiveTab] = useState<TabType>('weekly');

  const rankings = {
    weekly: getWeeklyRanking(),
    monthly: getMonthlyRanking(),
    hidden: getHiddenGems(),
  }[activeTab];

  const top3 = rankings.slice(0, 3);
  const rest = rankings.slice(3);

  return (
    <div className="page-container">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-3 mb-4 px-5 py-2 rounded-full bg-cinema-gold-500/10 border border-cinema-gold-500/20">
            <Trophy className="w-5 h-5 text-cinema-gold-500" />
            <span className="text-sm font-medium text-cinema-gold-400 tracking-wider">OFFICIAL RANKING</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-cinema-cream mb-4">
            电影<span className="text-gradient-gold ml-2">排行榜</span>
          </h1>
          <p className="text-cinema-charcoal-400 text-lg max-w-xl">
            基于评分、热度、口碑综合计算，每周一更新
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-12 p-2 rounded-2xl bg-cinema-charcoal-800/40 border border-cinema-charcoal-700/50 w-fit mx-auto md:mx-0 mb-12">
          {TABS.map(tab => {
            const active = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'group relative px-6 py-3.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2.5',
                  active
                    ? 'bg-gold-gradient text-cinema-charcoal-950 shadow-gold-glow'
                    : 'text-cinema-charcoal-300 hover:text-cinema-cream hover:bg-cinema-charcoal-700/40'
                )}
                style={active ? { backgroundSize: '200% auto' } : {}}
              >
                <Icon className={cn('w-5 h-5 transition-transform', active && 'scale-110')} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Top 3 Podium */}
            {top3.length > 0 && (
              <section className="mb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-end max-w-5xl mx-auto">
                  {/* 2nd */}
                  {top3[1] && (
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="order-2 md:order-1"
                    >
                      <PodiumCard movie={top3[1]} rank={2} />
                    </motion.div>
                  )}
                  {/* 1st */}
                  {top3[0] && (
                    <motion.div
                      initial={{ opacity: 0, y: 60 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0 }}
                      className="order-1 md:order-2 md:-mt-8 relative z-10"
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
                        <motion.div
                          animate={{ y: [0, -4, 0], rotate: [-5, 5, -5] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                          className="flex flex-col items-center"
                        >
                          <Crown className="w-12 h-12 text-cinema-gold-500 drop-shadow-[0_0_15px_rgba(212,162,76,0.6)]" fill="url(#crownGrad)" />
                          <svg width="0" height="0">
                            <defs>
                              <linearGradient id="crownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FFE55C" />
                                <stop offset="50%" stopColor="#D4A24C" />
                                <stop offset="100%" stopColor="#A87232" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </motion.div>
                      </div>
                      <PodiumCard movie={top3[0]} rank={1} />
                    </motion.div>
                  )}
                  {/* 3rd */}
                  {top3[2] && (
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="order-3"
                    >
                      <PodiumCard movie={top3[2]} rank={3} />
                    </motion.div>
                  )}
                </div>
              </section>
            )}

            {/* Rest of List */}
            {rest.length > 0 && (
              <section>
                <h2 className="section-title">完整榜单</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">
                  {rest.map((movie, idx) => (
                    <MovieCard key={movie.id} movie={movie} rank={idx + 4} />
                  ))}
                </div>
              </section>
            )}

            {rankings.length === 0 && (
              <div className="text-center py-24 rounded-3xl bg-cinema-charcoal-800/30 border border-dashed border-cinema-charcoal-700">
                <Sparkles className="w-16 h-16 text-cinema-charcoal-600 mx-auto mb-4" />
                <h3 className="font-display text-2xl font-semibold text-cinema-charcoal-300 mb-2">暂无榜单数据</h3>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function PodiumCard({ movie, rank }: { movie: Movie; rank: number }) {
  const badgeClass = rank === 1 ? 'badge-gold' : rank === 2 ? 'badge-silver' : 'badge-bronze';
  const podiumHeight = rank === 1 ? 'h-28' : rank === 2 ? 'h-20' : 'h-16';

  return (
    <Link to={`/movie/${movie.id}`} className="block group">
      <div className="film-border gold-corner mb-0 rounded-b-none">
        <div className="relative aspect-[2/3] overflow-hidden pl-6 pr-6 pt-4 pb-4">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover rounded-sm transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pl-6 pr-6 pt-4 pb-4" />
          
          <div className="absolute top-8 left-10 right-10 flex justify-center">
            <div className={cn(badgeClass, 'w-14 h-14 text-2xl shadow-2xl')}>
              {rank === 1 && <Star className="w-6 h-6 absolute -top-2" fill="currentColor" />}
              {rank === 1 ? '1' : rank === 2 ? '2' : '3'}
            </div>
          </div>

          <div className="absolute top-8 right-14">
            <RatingRing rating={movie.rating} size="sm" showLabel={false} />
          </div>

          <div className="absolute bottom-6 left-10 right-10">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {movie.genres.slice(0, 2).map(g => (
                <span key={g} className="px-2 py-0.5 rounded bg-white/10 backdrop-blur text-[10px] text-white/80 border border-white/10">
                  {g}
                </span>
              ))}
            </div>
            <h3 className="font-display font-bold text-cinema-cream text-lg line-clamp-1 group-hover:text-cinema-gold-400 transition-colors">
              {movie.title}
            </h3>
            <p className="text-xs text-cinema-charcoal-300 mt-0.5 flex items-center gap-1.5">
              <Star className="w-3 h-3 text-cinema-gold-500 fill-cinema-gold-500" />
              {formatVotes(movie.votes)} 人评价
            </p>
          </div>
        </div>
      </div>

      {/* Podium Base */}
      <div className={cn(
        'relative rounded-b-xl overflow-hidden transition-all duration-300 group-hover:h-32',
        podiumHeight,
        rank === 1 
          ? 'bg-gradient-to-b from-cinema-gold-600 via-cinema-gold-500 to-cinema-gold-700 shadow-[0_20px_60px_rgba(212,162,76,0.35)]'
          : rank === 2
          ? 'bg-gradient-to-b from-zinc-400 via-zinc-500 to-zinc-600'
          : 'bg-gradient-to-b from-amber-700 via-amber-800 to-amber-900'
      )}>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(0,0,0,0.25) 8px, rgba(0,0,0,0.25) 16px)'
        }} />
        <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Medal className={cn(
            'w-8 h-8 transition-all duration-500',
            rank === 1 ? 'text-yellow-900/60' : rank === 2 ? 'text-zinc-700/60' : 'text-amber-950/60'
          )} strokeWidth={1.5} />
        </div>
      </div>
    </Link>
  );
}
