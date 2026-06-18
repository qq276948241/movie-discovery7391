import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Heart, ListPlus, Share2, ArrowLeft, ChevronRight, Star, Users, Calendar, Clock, MapPin } from 'lucide-react';
import { getMovieById, getSimilarMovies } from '@/data/movies';
import RatingRing from '@/components/movie/RatingRing';
import MovieCard from '@/components/movie/MovieCard';
import { useAppStore } from '@/store';
import { formatDuration, formatVotes, cn } from '@/utils/format';

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movie = id ? getMovieById(id) : undefined;
  const { toggleFavorite, isFavorite, playlists, addMovieToPlaylist, addToWatchHistory } = useAppStore();

  if (!movie) {
    return (
      <div className="page-container flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-4xl font-bold text-cinema-cream mb-4">影片未找到</h2>
          <p className="text-cinema-charcoal-400 mb-8">找不到你要找的电影</p>
          <button onClick={() => navigate(-1)} className="btn-outline">返回上一页</button>
        </div>
      </div>
    );
  }

  const favorited = isFavorite(movie.id);
  const similarMovies = getSimilarMovies(movie, 8);

  const handleWatch = () => {
    addToWatchHistory(movie.id);
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[100vh] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cinema-charcoal-950/80 via-cinema-charcoal-950/50 to-cinema-charcoal-900" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-cinema-charcoal-950 to-transparent" />
        </motion.div>

        <div className="relative container mx-auto px-4 md:px-6 pt-24 pb-16">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-cinema-cream hover:bg-cinema-gold-500/15 hover:border-cinema-gold-500/30 transition-all mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            返回
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-10 lg:gap-14 items-start">
            {/* Poster */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex-shrink-0 max-w-xs mx-auto lg:mx-0"
            >
              <div className="film-border gold-corner sticky top-28">
                <div className="relative aspect-[2/3] pl-6 pr-6 pt-4 pb-4">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover rounded-sm"
                  />
                </div>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="flex flex-wrap items-start gap-3 mb-4">
                {movie.genres.map(g => (
                  <span key={g} className="px-3 py-1 rounded-lg bg-cinema-gold-500/10 border border-cinema-gold-500/25 text-cinema-gold-400 text-sm font-medium">
                    {g}
                  </span>
                ))}
                {movie.weeklyRank && (
                  <span className="px-3 py-1 rounded-lg bg-cinema-curtain/20 border border-cinema-curtain/40 text-cinema-gold-300 text-sm font-medium flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    周榜 NO.{movie.weeklyRank}
                  </span>
                )}
              </div>

              <h1 className="font-display text-4xl md:text-6xl font-bold text-cinema-cream leading-tight mb-3">
                {movie.title}
              </h1>
              <p className="text-cinema-charcoal-300 italic text-xl mb-8 font-display opacity-80">
                {movie.originalTitle}
              </p>

              <div className="flex flex-wrap items-center gap-8 mb-8 pb-8 border-b border-cinema-charcoal-800">
                <div className="flex items-center gap-4">
                  <RatingRing rating={movie.rating} size="lg" />
                  <div>
                    <p className="text-cinema-charcoal-400 text-sm mb-1">共 <span className="text-cinema-gold-400 font-semibold">{formatVotes(movie.votes)}</span> 人评分</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star
                          key={i}
                          className={cn(
                            'w-4 h-4',
                            i <= Math.round(movie.rating / 2)
                              ? 'text-cinema-gold-500 fill-cinema-gold-500'
                              : 'text-cinema-charcoal-600'
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                {[
                  { icon: Calendar, label: '上映', value: movie.releaseDate },
                  { icon: Clock, label: '片长', value: formatDuration(movie.duration) },
                  { icon: MapPin, label: '地区', value: movie.regions.join('/') },
                  { icon: Users, label: '导演', value: movie.director },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="p-4 rounded-xl bg-cinema-charcoal-800/40 border border-cinema-charcoal-700/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-cinema-gold-500" />
                      <span className="text-xs text-cinema-charcoal-400 uppercase tracking-wider">{label}</span>
                    </div>
                    <p className="font-medium text-cinema-cream text-sm line-clamp-2">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <h3 className="font-display text-xl font-semibold text-cinema-cream mb-4 flex items-center gap-3">
                  <span className="w-1 h-6 rounded-full bg-gold-gradient" />
                  剧情简介
                </h3>
                <p className="text-cinema-charcoal-200 leading-loose text-lg">
                  {movie.synopsis}
                </p>
              </div>

              <div className="mb-8">
                <h3 className="font-display text-xl font-semibold text-cinema-cream mb-4 flex items-center gap-3">
                  <span className="w-1 h-6 rounded-full bg-gold-gradient" />
                  标签关键词
                </h3>
                <div className="flex flex-wrap gap-2">
                  {movie.tags.map(tag => (
                    <span key={tag} className="px-4 py-2 rounded-full bg-cinema-charcoal-800/60 border border-cinema-charcoal-700 text-sm text-cinema-charcoal-200 hover:border-cinema-gold-500/40 hover:text-cinema-gold-400 cursor-pointer transition-all">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button onClick={handleWatch} className="btn-gold flex items-center gap-2.5 px-8 py-3.5 text-base">
                  <Play className="w-5 h-5 fill-current" />
                  开始观影
                </button>
                <button
                  onClick={() => toggleFavorite(movie.id)}
                  className={cn(
                    'btn-outline flex items-center gap-2.5 px-6 py-3.5',
                    favorited && '!bg-cinema-gold-500/15 !border-cinema-gold-500 !text-cinema-gold-400'
                  )}
                >
                  <Heart className={cn('w-5 h-5', favorited && 'fill-current')} />
                  {favorited ? '已收藏' : '收藏'}
                </button>
                {playlists.length > 0 && (
                  <button
                    onClick={() => addMovieToPlaylist(playlists[0].id, movie.id)}
                    className="btn-outline flex items-center gap-2.5 px-6 py-3.5"
                  >
                    <ListPlus className="w-5 h-5" />
                    加入片单
                  </button>
                )}
                <button className="w-12 h-12 rounded-xl border-2 border-cinema-gold-500/30 text-cinema-gold-400 hover:bg-cinema-gold-500/10 flex items-center justify-center transition-all hover:scale-110">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cast Section */}
      <section className="container mx-auto px-4 md:px-6 py-16">
        <h2 className="section-title">演职员阵容</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {movie.cast.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              className="group text-center"
            >
              <div className="relative w-28 h-28 md:w-32 md:h-32 mx-auto mb-4 rounded-full overflow-hidden ring-2 ring-cinema-gold-500/20 ring-offset-4 ring-offset-cinema-charcoal-900 group-hover:ring-cinema-gold-500/50 transition-all">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cinema-charcoal-950/80 to-transparent" />
                <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full bg-cinema-gold-500/90 text-[10px] font-bold text-cinema-charcoal-950">
                  {member.role === 'director' ? '导演' : '演员'}
                </div>
              </div>
              <h4 className="font-display font-semibold text-cinema-cream group-hover:text-cinema-gold-400 transition-colors">
                {member.name}
              </h4>
              {member.character && (
                <p className="text-sm text-cinema-charcoal-400 mt-0.5">饰 {member.character}</p>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Similar Movies */}
      <section className="container mx-auto px-4 md:px-6 pb-20">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <h2 className="section-title !mb-0">相似推荐</h2>
          <Link
            to="/discover"
            className="text-sm text-cinema-gold-400 hover:text-cinema-gold-300 flex items-center gap-1.5 transition-colors"
          >
            发现更多
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">
          {similarMovies.map(m => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      </section>
    </div>
  );
}
