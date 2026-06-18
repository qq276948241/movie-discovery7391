import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Plus, Trash2, Edit2, GripVertical, X, Check,
  FolderOpen, Film, Clock, Star, Play, ChevronRight
} from 'lucide-react';
import { useAppStore } from '@/store';
import { getMovieById } from '@/data/movies';
import RatingRing from '@/components/movie/RatingRing';
import { cn, formatDate, formatDuration } from '@/utils/format';
import type { Playlist } from '@/types';
import { Link } from 'react-router-dom';

interface SortableMovieProps {
  movieId: string;
  index: number;
  playlistId: string;
  onRemove: (playlistId: string, movieId: string) => void;
}

function SortableMovieItem({ movieId, index, playlistId, onRemove }: SortableMovieProps) {
  const movie = getMovieById(movieId);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: movieId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (!movie) return null;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      className={cn(
        'group relative flex items-center gap-4 p-4 rounded-2xl bg-cinema-charcoal-800/40 border transition-all',
        isDragging
          ? 'border-cinema-gold-500/60 shadow-[0_10px_40px_rgba(212,162,76,0.2)] z-10 scale-[1.02]'
          : 'border-cinema-charcoal-700/50 hover:border-cinema-gold-500/30 hover:bg-cinema-charcoal-800/70'
      )}
    >
      <button
        {...attributes}
        {...listeners}
        className="flex-shrink-0 w-8 h-8 rounded-lg bg-cinema-charcoal-700/60 flex items-center justify-center text-cinema-charcoal-400 hover:text-cinema-gold-400 hover:bg-cinema-charcoal-700 cursor-grab active:cursor-grabbing transition-all"
      >
        <GripVertical className="w-4 h-4" />
      </button>

      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cinema-charcoal-900 overflow-hidden flex items-center justify-center">
        <span className="font-display font-bold text-lg text-cinema-gold-400/80">{index + 1}</span>
      </div>

      <Link to={`/movie/${movie.id}`} className="flex-shrink-0 w-14 h-20 rounded-lg overflow-hidden relative">
        <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
      </Link>

      <div className="flex-1 min-w-0">
        <Link to={`/movie/${movie.id}`}>
          <h4 className="font-display font-semibold text-cinema-cream group-hover:text-cinema-gold-400 transition-colors truncate">
            {movie.title}
          </h4>
        </Link>
        <div className="flex items-center gap-3 mt-1 text-xs text-cinema-charcoal-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDuration(movie.duration)}
          </span>
          <span>{movie.year}</span>
          <span>{movie.genres[0]}</span>
        </div>
      </div>

      <div className="flex-shrink-0">
        <RatingRing rating={movie.rating} size="sm" showLabel={false} />
      </div>

      <button
        onClick={() => onRemove(playlistId, movieId)}
        className="flex-shrink-0 w-9 h-9 rounded-lg bg-cinema-charcoal-700/40 flex items-center justify-center text-cinema-charcoal-400 hover:bg-cinema-curtain/20 hover:text-cinema-curtain transition-all opacity-0 group-hover:opacity-100"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

function PlaylistCard({
  playlist,
  active,
  onClick,
  onDelete,
  onRename,
}: {
  playlist: Playlist;
  active: boolean;
  onClick: () => void;
  onDelete: () => void;
  onRename: (name: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(playlist.name);
  const cover = playlist.movieIds.length > 0 ? getMovieById(playlist.movieIds[0])?.poster : undefined;

  const handleSave = () => {
    if (name.trim()) onRename(name.trim());
    setEditing(false);
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative p-4 rounded-2xl cursor-pointer transition-all border',
        active
          ? 'bg-cinema-gold-500/10 border-cinema-gold-500/40 shadow-[0_0_30px_rgba(212,162,76,0.1)]'
          : 'bg-cinema-charcoal-800/40 border-cinema-charcoal-700/50 hover:border-cinema-gold-500/20 hover:bg-cinema-charcoal-800/70'
      )}
    >
      <div className="flex items-start gap-4">
        <div className="relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-cinema-charcoal-900">
          {cover ? (
            <img src={cover} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FolderOpen className="w-7 h-7 text-cinema-charcoal-600" />
            </div>
          )}
          <div className={cn(
            'absolute inset-0 flex items-center justify-center',
            active ? 'bg-cinema-gold-500/30' : 'bg-black/0 group-hover:bg-black/30',
            'transition-colors'
          )}>
            {active && <Star className="w-6 h-6 text-cinema-gold-400 fill-cinema-gold-400" />}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          {editing ? (
            <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') { setEditing(false); setName(playlist.name); } }}
                className="flex-1 px-2 py-1 rounded bg-cinema-charcoal-900 border border-cinema-gold-500/40 text-sm text-cinema-cream outline-none"
                autoFocus
              />
              <button onClick={handleSave} className="p-1.5 text-cinema-gold-400 hover:bg-cinema-gold-500/20 rounded">
                <Check className="w-4 h-4" />
              </button>
              <button onClick={() => { setEditing(false); setName(playlist.name); }} className="p-1.5 text-cinema-charcoal-400 hover:bg-cinema-charcoal-700 rounded">
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <h3 className="font-display font-semibold text-cinema-cream truncate">
              {playlist.name}
            </h3>
          )}
          <p className="text-xs text-cinema-charcoal-400 mt-1.5 flex items-center gap-1.5">
            <Film className="w-3 h-3" />
            {playlist.movieIds.length} 部电影
          </p>
          <p className="text-[10px] text-cinema-charcoal-500 mt-1">
            创建于 {formatDate(playlist.createdAt)}
          </p>
        </div>
      </div>

      <div className={cn(
        'absolute top-3 right-3 flex items-center gap-1 transition-opacity',
        active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      )}>
        <button
          onClick={e => { e.stopPropagation(); setEditing(true); }}
          className="w-7 h-7 rounded-lg bg-cinema-charcoal-700/60 flex items-center justify-center text-cinema-charcoal-300 hover:text-cinema-gold-400 hover:bg-cinema-charcoal-700 transition-all"
        >
          <Edit2 className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={e => { e.stopPropagation(); if (confirm('确定删除此片单？')) onDelete(); }}
          className="w-7 h-7 rounded-lg bg-cinema-charcoal-700/60 flex items-center justify-center text-cinema-charcoal-300 hover:text-cinema-curtain hover:bg-cinema-curtain/20 transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function PlaylistsPage() {
  const {
    playlists,
    createPlaylist,
    deletePlaylist,
    renamePlaylist,
    reorderPlaylistMovies,
    removeMovieFromPlaylist,
  } = useAppStore();

  const [activePlaylistId, setActivePlaylistId] = useState<string>(playlists[0]?.id || '');
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const activePlaylist = playlists.find(p => p.id === activePlaylistId);

  const handleCreate = () => {
    if (!newName.trim()) return;
    createPlaylist(newName.trim(), newDesc.trim());
    setNewName('');
    setNewDesc('');
    setShowCreate(false);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!activePlaylist || !over || active.id === over.id) return;

    const oldIndex = activePlaylist.movieIds.indexOf(active.id as string);
    const newIndex = activePlaylist.movieIds.indexOf(over.id as string);
    if (oldIndex < 0 || newIndex < 0) return;

    const newOrder = arrayMove(activePlaylist.movieIds, oldIndex, newIndex);
    reorderPlaylistMovies(activePlaylist.id, newOrder);
  };

  return (
    <div className="page-container">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-cinema-cream mb-3">我的片单</h1>
          <p className="text-cinema-charcoal-400">收藏喜欢的电影，打造专属观影清单，可拖拽自由排序</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
          {/* Playlist List */}
          <aside>
            <div className="sticky top-28">
              <button
                onClick={() => setShowCreate(true)}
                className="w-full btn-gold flex items-center justify-center gap-2 mb-5 py-3"
              >
                <Plus className="w-5 h-5" />
                新建片单
              </button>

              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 [scrollbar-width:thin]">
                <AnimatePresence>
                  {playlists.map((playlist) => (
                    <PlaylistCard
                      key={playlist.id}
                      playlist={playlist}
                      active={playlist.id === activePlaylistId}
                      onClick={() => setActivePlaylistId(playlist.id)}
                      onDelete={() => {
                        deletePlaylist(playlist.id);
                        if (playlist.id === activePlaylistId) {
                          const remaining = playlists.filter(p => p.id !== playlist.id);
                          setActivePlaylistId(remaining[0]?.id || '');
                        }
                      }}
                      onRename={(name) => renamePlaylist(playlist.id, name)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </aside>

          {/* Playlist Content */}
          <main>
            <AnimatePresence mode="wait">
              {activePlaylist ? (
                <motion.div
                  key={activePlaylist.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="p-8 rounded-3xl bg-cinema-charcoal-800/40 border border-cinema-gold-500/10 mb-8 relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-cinema-gold-500/5 blur-3xl" />
                    <div className="relative z-10 flex items-start justify-between gap-6 flex-wrap">
                      <div>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-cinema-cream mb-2">
                          {activePlaylist.name}
                        </h2>
                        {activePlaylist.description && (
                          <p className="text-cinema-charcoal-400 mb-4 max-w-xl">{activePlaylist.description}</p>
                        )}
                        <div className="flex items-center gap-6 text-sm text-cinema-charcoal-400">
                          <span className="flex items-center gap-2">
                            <Film className="w-4 h-4 text-cinema-gold-500" />
                            <span className="text-cinema-cream font-medium">{activePlaylist.movieIds.length}</span> 部电影
                          </span>
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-cinema-gold-500" />
                            共 <span className="text-cinema-cream font-medium">
                              {formatDuration(activePlaylist.movieIds.reduce((sum, id) => sum + (getMovieById(id)?.duration || 0), 0))}
                            </span>
                          </span>
                        </div>
                      </div>
                      {activePlaylist.movieIds.length > 0 && (
                        <button className="btn-outline flex items-center gap-2 shrink-0">
                          <Play className="w-4 h-4 fill-current" />
                          连续播放
                        </button>
                      )}
                    </div>
                  </div>

                  {activePlaylist.movieIds.length > 0 ? (
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext
                        items={activePlaylist.movieIds}
                        strategy={verticalListSortingStrategy}
                      >
                        <div className="space-y-3">
                          {activePlaylist.movieIds.map((mid, idx) => (
                            <SortableMovieItem
                              key={mid}
                              movieId={mid}
                              index={idx}
                              playlistId={activePlaylist.id}
                              onRemove={removeMovieFromPlaylist}
                            />
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>
                  ) : (
                    <div className="text-center py-20 rounded-3xl bg-cinema-charcoal-800/30 border border-dashed border-cinema-charcoal-700">
                      <FolderOpen className="w-16 h-16 text-cinema-charcoal-600 mx-auto mb-4" />
                      <h3 className="font-display text-xl font-semibold text-cinema-charcoal-300 mb-2">片单是空的</h3>
                      <p className="text-cinema-charcoal-500 mb-6">去发现页或排行榜收藏电影，添加到这个片单吧</p>
                      <Link to="/discover" className="btn-gold inline-flex items-center gap-2">
                        去发现电影
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-24 rounded-3xl bg-cinema-charcoal-800/30 border border-dashed border-cinema-charcoal-700"
                >
                  <FolderOpen className="w-20 h-20 text-cinema-charcoal-600 mx-auto mb-5" />
                  <h3 className="font-display text-2xl font-semibold text-cinema-charcoal-300 mb-2">还没有片单</h3>
                  <p className="text-cinema-charcoal-500 mb-6">创建你的第一个片单，开启收藏之旅</p>
                  <button onClick={() => setShowCreate(true)} className="btn-gold inline-flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    立即创建
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Create Modal */}
      <AnimatePresence>
        {showCreate && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              onClick={() => setShowCreate(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 p-6 rounded-3xl bg-cinema-charcoal-800 border border-cinema-gold-500/20 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-2xl font-bold text-cinema-cream">创建片单</h3>
                <button onClick={() => setShowCreate(false)} className="w-9 h-9 rounded-xl bg-cinema-charcoal-700/60 flex items-center justify-center text-cinema-charcoal-400 hover:text-cinema-cream transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-cinema-charcoal-300 mb-2">片单名称</label>
                  <input
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    placeholder="为你的片单起个名字..."
                    className="w-full px-4 py-3 rounded-xl bg-cinema-charcoal-900/80 border border-cinema-charcoal-700 text-cinema-cream placeholder-cinema-charcoal-500 outline-none focus:border-cinema-gold-500/50 transition-colors"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm text-cinema-charcoal-300 mb-2">描述（可选）</label>
                  <textarea
                    value={newDesc}
                    onChange={e => setNewDesc(e.target.value)}
                    rows={3}
                    placeholder="简单介绍一下这个片单..."
                    className="w-full px-4 py-3 rounded-xl bg-cinema-charcoal-900/80 border border-cinema-charcoal-700 text-cinema-cream placeholder-cinema-charcoal-500 outline-none focus:border-cinema-gold-500/50 transition-colors resize-none"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setShowCreate(false)} className="flex-1 btn-outline py-3">
                    取消
                  </button>
                  <button onClick={handleCreate} disabled={!newName.trim()} className="flex-1 btn-gold py-3 disabled:opacity-50">
                    创建
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
