import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Play, Bookmark } from 'lucide-react';
import RatingRing from './RatingRing';
import { useAppStore } from '@/store';
import type { Movie } from '@/types';
import { cn } from '@/utils/format';

interface MovieCardProps {
  movie: Movie;
  size?: 'sm' | 'md' | 'lg';
  showRating?: boolean;
  showFavorite?: boolean;
  rank?: number;
  onClick?: () => void;
  className?: string;
}

export default function MovieCard({
  movie,
  size = 'md',
  showRating = true,
  showFavorite = true,
  rank,
  onClick,
  className,
}: MovieCardProps) {
  const { toggleFavorite, isFavorite } = useAppStore();
  const favorited = isFavorite(movie.id);

  const rankBadgeClass = rank === 1 ? 'badge-gold' : rank === 2 ? 'badge-silver' : rank === 3 ? 'badge-bronze' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className={cn('group relative', className)}
      onClick={onClick}
    >
      <Link to={`/movie/${movie.id}`}>
        <div className="film-border gold-corner">
          <div className="relative aspect-[2/3] overflow-hidden pl-6 pr-6 pt-4 pb-4">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover rounded-sm transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pl-6 pr-6 pt-4 pb-4" />
            
            <div className="absolute inset-x-6 bottom-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
              <div className="flex items-center gap-2 mb-3">
                <button 
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gold-gradient text-cinema-charcoal-950 font-medium text-sm hover:shadow-gold-glow transition-all"
                  style={{ backgroundSize: '200% auto' }}
                >
                  <Play className="w-4 h-4 fill-current" />
                  立即观看
                </button>
              </div>
              <p className="text-cinema-cream/90 text-xs line-clamp-2 leading-relaxed">
                {movie.synopsis}
              </p>
            </div>

            {showRating && (
              <div className="absolute top-6 right-8 z-10">
                <RatingRing rating={movie.rating} size="sm" showLabel={false} />
              </div>
            )}

            {showFavorite && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(movie.id);
                }}
                className="absolute top-6 left-8 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-cinema-gold-500/30 border border-white/10 hover:border-cinema-gold-500/50"
              >
                <Heart
                  className={cn(
                    'w-4 h-4 transition-colors',
                    favorited ? 'fill-cinema-gold-500 text-cinema-gold-500' : 'text-white'
                  )}
                />
              </button>
            )}

            {rank !== undefined && (
              <div className="absolute -top-3 -left-3 z-20 flex items-center gap-2">
                {rank <= 3 ? (
                  <div className={rankBadgeClass}>{rank}</div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-cinema-charcoal-800 border-2 border-cinema-gold-500/40 flex items-center justify-center font-display text-xl font-bold text-cinema-gold-400">
                    {rank}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 px-1">
          <h3 className="font-display text-lg font-semibold text-cinema-cream group-hover:text-cinema-gold-400 transition-colors line-clamp-1">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 mt-1.5 text-sm text-cinema-charcoal-300">
            <span>{movie.year}</span>
            <span className="w-1 h-1 rounded-full bg-cinema-charcoal-500" />
            <span>{movie.genres.slice(0, 2).join(' · ')}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
