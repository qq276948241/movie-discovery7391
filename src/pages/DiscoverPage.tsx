import { useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X, Filter } from 'lucide-react';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { MOVIES } from '@/data/movies';
import { MOODS } from '@/data/moods';
import { GENRES, REGIONS, DECADES } from '@/types';
import MovieCard from '@/components/movie/MovieCard';
import MoodTag from '@/components/common/MoodTag';
import { useAppStore } from '@/store';
import { cn } from '@/utils/format';

export default function DiscoverPage() {
  const { moodId } = useParams<{ moodId: string }>();
  const {
    filterOptions,
    setFilterGenres,
    setFilterYears,
    setFilterRegions,
    setFilterMood,
    resetFilters,
  } = useAppStore();

  useEffect(() => {
    if (moodId) setFilterMood(moodId as any);
  }, [moodId, setFilterMood]);

  const toggleGenre = (g: string) => {
    const has = filterOptions.genres.includes(g as any);
    setFilterGenres(has ? filterOptions.genres.filter(x => x !== g) : [...filterOptions.genres, g as any]);
  };
  const toggleDecade = (d: number) => {
    const has = filterOptions.years.includes(d);
    setFilterYears(has ? filterOptions.years.filter(x => x !== d) : [...filterOptions.years, d]);
  };
  const toggleRegion = (r: string) => {
    const has = filterOptions.regions.includes(r);
    setFilterRegions(has ? filterOptions.regions.filter(x => x !== r) : [...filterOptions.regions, r]);
  };

  const filteredMovies = useMemo(() => {
    return MOVIES.filter(m => {
      if (filterOptions.mood && m.mood !== filterOptions.mood) return false;
      if (filterOptions.genres.length > 0 && !filterOptions.genres.some(g => m.genres.includes(g))) return false;
      if (filterOptions.regions.length > 0 && !filterOptions.regions.some(r => m.regions.includes(r))) return false;
      if (filterOptions.years.length > 0 && !filterOptions.years.some(y => m.year >= y && m.year < y + 10)) return false;
      return true;
    }).sort((a, b) => b.rating - a.rating);
  }, [filterOptions]);

  const activeMood = moodId ? MOODS.find(m => m.id === moodId) : undefined;
  const hasActiveFilters = 
    filterOptions.genres.length > 0 ||
    filterOptions.years.length > 0 ||
    filterOptions.regions.length > 0 ||
    !!filterOptions.mood;

  const FilterChip = ({ active, onClick, children }: any) => (
    <button
      onClick={onClick}
      className={cn(
        'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap',
        active
          ? 'bg-gold-gradient text-cinema-charcoal-950 shadow-gold-glow'
          : 'bg-cinema-charcoal-800/60 border border-cinema-charcoal-700 text-cinema-charcoal-200 hover:border-cinema-gold-500/30 hover:text-cinema-gold-400'
      )}
      style={active ? { backgroundSize: '200% auto' } : {}}
    >
      {children}
    </button>
  );

  return (
    <div className="page-container">
      <div className="container mx-auto px-4 md:px-6">
        {/* Hero */}
        <div className="mb-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-cinema-cream mb-3">
            {activeMood ? (
              <span className="flex items-center gap-4">
                {(() => {
                  const Icon = (Icons as unknown as Record<string, LucideIcon>)[activeMood.icon] || Icons.Heart;
                  return <Icon className="w-10 h-10 text-cinema-gold-500" />;
                })()}
                <span className="bg-gold-gradient bg-clip-text text-transparent" style={{ backgroundSize: '200% auto' }}>
                  {activeMood.label}
                </span>
              </span>
            ) : (
              <>发现<span className="text-gradient-gold ml-3">好电影</span></>
            )}
          </h1>
          <p className="text-cinema-charcoal-400 text-lg">
            {activeMood ? activeMood.description : '按类型、年份、地区筛选，找到最对味的那一部'}
          </p>
        </div>

        {/* Mood Tags */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 rounded-full bg-gold-gradient" style={{ backgroundSize: '200% auto' }} />
            <h3 className="font-display text-xl font-semibold text-cinema-cream">心情</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {MOODS.map(m => (
              <MoodTag key={m.id} moodId={m.id} />
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 md:p-8 rounded-3xl bg-cinema-charcoal-800/40 border border-cinema-gold-500/10 mb-10 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-cinema-gold-500/5 blur-3xl" />
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2 text-cinema-cream">
                <Filter className="w-5 h-5 text-cinema-gold-500" />
                <span className="font-display text-lg font-semibold">筛选条件</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-cinema-charcoal-400 hover:text-cinema-curtain hover:bg-cinema-curtain/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                  清除筛选
                </button>
              )}
            </div>

            <div>
              <p className="text-xs text-cinema-charcoal-400 uppercase tracking-wider mb-3 pl-0.5">类型</p>
              <div className="flex flex-wrap gap-2.5">
                {GENRES.map(g => (
                  <FilterChip
                    key={g}
                    active={filterOptions.genres.includes(g as any)}
                    onClick={() => toggleGenre(g)}
                  >
                    {g}
                  </FilterChip>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-cinema-charcoal-400 uppercase tracking-wider mb-3 pl-0.5">年代</p>
              <div className="flex flex-wrap gap-2.5">
                {DECADES.map(d => (
                  <FilterChip
                    key={d}
                    active={filterOptions.years.includes(d)}
                    onClick={() => toggleDecade(d)}
                  >
                    {d}s
                  </FilterChip>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-cinema-charcoal-400 uppercase tracking-wider mb-3 pl-0.5">地区</p>
              <div className="flex flex-wrap gap-2.5">
                {REGIONS.map(r => (
                  <FilterChip
                    key={r}
                    active={filterOptions.regions.includes(r)}
                    onClick={() => toggleRegion(r)}
                  >
                    {r}
                  </FilterChip>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold text-cinema-cream mb-1">
              {filteredMovies.length} <span className="text-cinema-gold-400">部</span> 电影符合条件
            </h2>
            <p className="text-sm text-cinema-charcoal-500">按评分从高到低排序</p>
          </div>
        </div>

        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">
            {filteredMovies.map((movie, idx) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 rounded-3xl bg-cinema-charcoal-800/30 border border-dashed border-cinema-charcoal-700">
            <Search className="w-16 h-16 text-cinema-charcoal-600 mx-auto mb-4" />
            <h3 className="font-display text-2xl font-semibold text-cinema-charcoal-300 mb-2">没有找到匹配的电影</h3>
            <p className="text-cinema-charcoal-500 mb-6">尝试调整筛选条件或清除筛选</p>
            <button onClick={resetFilters} className="btn-gold inline-flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              重置筛选
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
