import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  User, Film, Clock, Heart, Trophy, Calendar, Star,
  ChevronRight, Eye, Award, TrendingUp
} from 'lucide-react';
import { useAppStore } from '@/store';
import { MOVIES, getMovieById } from '@/data/movies';
import RatingRing from '@/components/movie/RatingRing';
import MovieCard from '@/components/movie/MovieCard';
import { Link } from 'react-router-dom';
import {
  formatRelativeDate, formatMonthYear, getMonthKey,
  groupBy, cn, formatDuration
} from '@/utils/format';

export default function ProfilePage() {
  const { watchHistory, favorites } = useAppStore();

  // Stats
  const stats = useMemo(() => {
    const totalMinutes = watchHistory.reduce((sum, r) => sum + (getMovieById(r.movieId)?.duration || 0), 0);
    const avgRating = watchHistory.length > 0
      ? watchHistory.reduce((sum, r) => sum + (r.userRating || 0), 0) / watchHistory.filter(r => r.userRating).length
      : 0;
    
    // Genre preference
    const genreCount: Record<string, number> = {};
    watchHistory.forEach(r => {
      const m = getMovieById(r.movieId);
      if (m) m.genres.forEach(g => genreCount[g] = (genreCount[g] || 0) + 1);
    });
    const topGenres = Object.entries(genreCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([genre]) => genre);

    return {
      total: watchHistory.length,
      hours: Math.round(totalMinutes / 60),
      avgRating: avgRating.toFixed(1),
      topGenres,
      favCount: favorites.length,
    };
  }, [watchHistory, favorites]);

  // Tag cloud data
  const tagCloud = useMemo(() => {
    const tagCount: Record<string, number> = {};
    watchHistory.forEach(r => {
      const m = getMovieById(r.movieId);
      if (m) {
        m.genres.forEach(g => tagCount[g] = (tagCount[g] || 0) + 2);
        m.tags.forEach(t => tagCount[t] = (tagCount[t] || 0) + 1);
        m.regions.forEach(reg => tagCount[reg] = (tagCount[reg] || 0) + 1);
      }
    });
    // ensure minimum tags
    if (Object.keys(tagCount).length < 6) {
      ['剧情', '科幻', '经典', '高分', '文艺', '治愈'].forEach(t => {
        if (!tagCount[t]) tagCount[t] = Math.floor(Math.random() * 4) + 1;
      });
    }
    return Object.entries(tagCount).map(([tag, count]) => ({ tag, count }));
  }, [watchHistory]);

  // Group history by month
  const groupedHistory = useMemo(() => {
    const groups = groupBy(watchHistory, r => getMonthKey(r.watchedAt));
    return Object.entries(groups)
      .sort((a, b) => (a[0] < b[0] ? 1 : -1));
  }, [watchHistory]);

  const favoriteMovies = favorites.slice(0, 8).map(id => getMovieById(id)).filter(Boolean) as any[];

  const tagColors = [
    'bg-cinema-gold-500/20 text-cinema-gold-400 border-cinema-gold-500/30',
    'bg-blue-500/15 text-blue-400 border-blue-500/30',
    'bg-purple-500/15 text-purple-400 border-purple-500/30',
    'bg-rose-500/15 text-rose-400 border-rose-500/30',
    'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  ];

  return (
    <div className="page-container">
      <div className="container mx-auto px-4 md:px-6">
        {/* Profile Header */}
        <section className="mb-12">
          <div className="relative rounded-3xl overflow-hidden border border-cinema-gold-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-cinema-gold-500/10 via-transparent to-cinema-curtain/10" />
            <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-cinema-gold-500/10 blur-3xl" />
            <div className="absolute -left-20 bottom-0 w-80 h-80 rounded-full bg-cinema-curtain/10 blur-3xl" />
            
            <div className="relative p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-10">
                <div className="relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-cinema-gold-500 via-cinema-gold-600 to-cinema-gold-800 flex items-center justify-center shadow-[0_0_60px_rgba(212,162,76,0.3)] ring-4 ring-cinema-gold-500/30 ring-offset-4 ring-offset-cinema-charcoal-900">
                    <User className="w-16 h-16 md:w-20 md:h-20 text-cinema-charcoal-950/80" strokeWidth={1.5} />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gold-gradient shadow-gold-glow flex items-center justify-center border-4 border-cinema-charcoal-900">
                    <Award className="w-5 h-5 text-cinema-charcoal-950" fill="currentColor" />
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h1 className="font-display text-3xl md:text-5xl font-bold text-cinema-cream mb-2">
                    电影<span className="text-gradient-gold">发烧友</span>
                  </h1>
                  <p className="text-cinema-charcoal-400 mb-5">
                    CineScope 资深影迷 · 加入 128 天
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    {stats.topGenres.map((g, idx) => (
                      <span
                        key={g}
                        className="px-4 py-1.5 rounded-full text-sm font-medium bg-cinema-charcoal-800/60 border border-cinema-gold-500/20 text-cinema-gold-300"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      >
                        偏爱 · {g}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-10 border-t border-cinema-charcoal-700/50">
                {[
                  { icon: Eye, label: '看过电影', value: stats.total, unit: '部', color: 'from-cinema-gold-500 to-cinema-gold-700' },
                  { icon: Clock, label: '观影时长', value: stats.hours, unit: '小时', color: 'from-blue-500 to-cyan-600' },
                  { icon: Heart, label: '收藏电影', value: stats.favCount, unit: '部', color: 'from-rose-500 to-pink-600' },
                  { icon: Star, label: '平均评分', value: stats.avgRating, unit: '分', color: 'from-purple-500 to-violet-600' },
                ].map((s, idx) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="relative p-5 rounded-2xl bg-cinema-charcoal-800/40 border border-cinema-charcoal-700/50 overflow-hidden group"
                  >
                    <div className={cn('absolute top-0 left-0 w-1 h-full bg-gradient-to-b opacity-70', s.color)} />
                    <s.icon className="w-5 h-5 text-cinema-charcoal-400 mb-3" />
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="font-display text-3xl font-bold text-cinema-cream">{s.value}</span>
                      <span className="text-xs text-cinema-charcoal-500">{s.unit}</span>
                    </div>
                    <p className="text-sm text-cinema-charcoal-400">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Tag Cloud */}
          <aside className="lg:col-span-1 space-y-8">
            <section>
              <h2 className="section-title !mb-5 !text-2xl">
                <Trophy className="w-6 h-6 text-cinema-gold-500" />
                口味标签云
              </h2>
              <div className="p-6 rounded-2xl bg-cinema-charcoal-800/40 border border-cinema-charcoal-700/50 min-h-[280px]">
                <div className="flex flex-wrap gap-2.5 items-center justify-center">
                  {tagCloud.map((item, idx) => {
                    const size = item.count >= 4 ? 'text-lg px-5 py-2.5' : item.count >= 2 ? 'text-base px-4 py-2' : 'text-sm px-3 py-1.5';
                    const anim = idx % 3 === 0 ? 'animate-float-slow' : idx % 3 === 1 ? 'animate-float-medium' : 'animate-float-fast';
                    return (
                      <span
                        key={item.tag}
                        className={cn(
                          'tag-cloud-item border font-medium',
                          size,
                          anim,
                          tagColors[idx % tagColors.length]
                        )}
                        style={{ animationDelay: `${(idx % 7) * 0.3}s` }}
                      >
                        #{item.tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Favorite Movies */}
            {favoriteMovies.length > 0 && (
              <section>
                <div className="flex items-end justify-between mb-5">
                  <h2 className="section-title !mb-0 !text-2xl">
                    <Heart className="w-6 h-6 text-cinema-gold-500" />
                    我的收藏
                  </h2>
                  <Link to="/playlists" className="text-xs text-cinema-gold-400 hover:text-cinema-gold-300 flex items-center gap-1">
                    管理 <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="grid grid-cols-4 gap-2.5">
                  {favoriteMovies.slice(0, 8).map(m => (
                    <Link key={m.id} to={`/movie/${m.id}`} className="group aspect-[2/3] rounded-lg overflow-hidden relative">
                      <img src={m.poster} alt={m.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </aside>

          {/* Right: Watch History */}
          <section className="lg:col-span-2">
            <h2 className="section-title !mb-6">
              <Calendar className="w-7 h-7 text-cinema-gold-500" />
              观影足迹
            </h2>

            <div className="space-y-10">
              {groupedHistory.length > 0 ? groupedHistory.map(([monthKey, records]) => (
                <div key={monthKey}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gold-gradient/20 border border-cinema-gold-500/30 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-cinema-gold-400" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-cinema-cream">
                        {formatMonthYear(records[0].watchedAt)}
                      </h3>
                      <p className="text-xs text-cinema-charcoal-500">
                        共观看 {records.length} 部 · 总时长 {formatDuration(records.reduce((s, r) => s + (getMovieById(r.movieId)?.duration || 0), 0))}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {records.map((record, idx) => {
                      const movie = getMovieById(record.movieId);
                      if (!movie) return null;
                      return (
                        <motion.div
                          key={record.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="timeline-dot"
                        >
                          <Link
                            to={`/movie/${movie.id}`}
                            className="block group p-4 rounded-2xl bg-cinema-charcoal-800/40 border border-cinema-charcoal-700/50 hover:border-cinema-gold-500/30 hover:bg-cinema-charcoal-800/70 transition-all"
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-20 h-28 rounded-lg overflow-hidden relative">
                                <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-3 mb-2">
                                  <div>
                                    <h4 className="font-display font-semibold text-lg text-cinema-cream group-hover:text-cinema-gold-400 transition-colors line-clamp-1">
                                      {movie.title}
                                    </h4>
                                    <p className="text-xs text-cinema-charcoal-500">{movie.originalTitle}</p>
                                  </div>
                                  <RatingRing rating={movie.rating} size="sm" showLabel={false} />
                                </div>
                                <div className="flex flex-wrap items-center gap-3 text-xs text-cinema-charcoal-400 mb-2.5">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {formatDuration(movie.duration)}
                                  </span>
                                  <span>{movie.year}</span>
                                  <span>{movie.genres.slice(0, 2).join(' / ')}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-cinema-charcoal-500 flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" />
                                    {formatRelativeDate(record.watchedAt)}
                                  </span>
                                  {record.userRating && (
                                    <div className="flex items-center gap-1 text-cinema-gold-400">
                                      <Star className="w-3.5 h-3.5 fill-current" />
                                      <span className="text-sm font-semibold">{record.userRating.toFixed(1)}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )) : (
                <div className="text-center py-16 rounded-2xl bg-cinema-charcoal-800/30 border border-dashed border-cinema-charcoal-700">
                  <Clock className="w-16 h-16 text-cinema-charcoal-600 mx-auto mb-4" />
                  <h3 className="font-display text-xl font-semibold text-cinema-charcoal-300 mb-2">还没有观影记录</h3>
                  <p className="text-cinema-charcoal-500 mb-6">看一部喜欢的电影，记录你的观影足迹</p>
                  <Link to="/discover" className="btn-gold inline-flex items-center gap-2">
                    去发现电影
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
