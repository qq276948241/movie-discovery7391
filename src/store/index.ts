import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Playlist, WatchRecord, FilterOptions, MoodType, GenreType } from '@/types';

interface AppState {
  playlists: Playlist[];
  watchHistory: WatchRecord[];
  filterOptions: FilterOptions;
  favorites: string[];
  
  createPlaylist: (name: string, description?: string) => void;
  deletePlaylist: (id: string) => void;
  renamePlaylist: (id: string, name: string) => void;
  reorderPlaylistMovies: (playlistId: string, movieIds: string[]) => void;
  addMovieToPlaylist: (playlistId: string, movieId: string) => void;
  removeMovieFromPlaylist: (playlistId: string, movieId: string) => void;
  
  addToWatchHistory: (movieId: string, userRating?: number) => void;
  removeFromWatchHistory: (id: string) => void;
  
  toggleFavorite: (movieId: string) => void;
  isFavorite: (movieId: string) => boolean;
  
  setFilterGenres: (genres: GenreType[]) => void;
  setFilterYears: (years: number[]) => void;
  setFilterRegions: (regions: string[]) => void;
  setFilterMood: (mood?: MoodType) => void;
  setFilterKeyword: (keyword?: string) => void;
  resetFilters: () => void;
}

const initialPlaylists: Playlist[] = [
  {
    id: 'p1',
    name: '周末必看经典',
    description: '精选周末不容错过的高分电影',
    cover: '',
    movieIds: ['m1', 'm3', 'm6', 'm8'],
    createdAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: 'p2',
    name: '深夜独酌',
    description: '适合一个人静静品味的佳片',
    cover: '',
    movieIds: ['m4', 'm6', 'm9', 'm12'],
    createdAt: new Date('2024-03-02').toISOString(),
  },
];

const initialHistory: WatchRecord[] = [
  { id: 'h1', movieId: 'm1', watchedAt: '2026-06-15T20:30:00', userRating: 9 },
  { id: 'h2', movieId: 'm3', watchedAt: '2026-06-12T19:00:00', userRating: 8.5 },
  { id: 'h3', movieId: 'm5', watchedAt: '2026-06-08T22:15:00', userRating: 8 },
  { id: 'h4', movieId: 'm7', watchedAt: '2026-06-05T21:00:00', userRating: 9 },
  { id: 'h5', movieId: 'm2', watchedAt: '2026-06-01T15:30:00', userRating: 8.8 },
  { id: 'h6', movieId: 'm6', watchedAt: '2026-05-28T20:00:00', userRating: 9.2 },
  { id: 'h7', movieId: 'm8', watchedAt: '2026-05-24T19:30:00', userRating: 8.5 },
  { id: 'h8', movieId: 'm11', watchedAt: '2026-05-20T21:45:00', userRating: 7.5 },
  { id: 'h9', movieId: 'm9', watchedAt: '2026-05-15T19:00:00', userRating: 8 },
  { id: 'h10', movieId: 'm10', watchedAt: '2026-05-10T22:00:00', userRating: 8.2 },
];

const initialFavorites = ['m1', 'm3', 'm6', 'm8', 'm12'];

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      playlists: initialPlaylists,
      watchHistory: initialHistory,
      filterOptions: {
        genres: [],
        years: [],
        regions: [],
      },
      favorites: initialFavorites,

      createPlaylist: (name, description = '') => {
        const newPlaylist: Playlist = {
          id: `p_${Date.now()}`,
          name,
          description,
          cover: '',
          movieIds: [],
          createdAt: new Date().toISOString(),
        };
        set(s => ({ playlists: [newPlaylist, ...s.playlists] }));
      },

      deletePlaylist: (id) => {
        set(s => ({ playlists: s.playlists.filter(p => p.id !== id) }));
      },

      renamePlaylist: (id, name) => {
        set(s => ({
          playlists: s.playlists.map(p => p.id === id ? { ...p, name } : p),
        }));
      },

      reorderPlaylistMovies: (playlistId, movieIds) => {
        set(s => ({
          playlists: s.playlists.map(p =>
            p.id === playlistId ? { ...p, movieIds } : p
          ),
        }));
      },

      addMovieToPlaylist: (playlistId, movieId) => {
        set(s => ({
          playlists: s.playlists.map(p =>
            p.id === playlistId && !p.movieIds.includes(movieId)
              ? { ...p, movieIds: [...p.movieIds, movieId] }
              : p
          ),
        }));
      },

      removeMovieFromPlaylist: (playlistId, movieId) => {
        set(s => ({
          playlists: s.playlists.map(p =>
            p.id === playlistId
              ? { ...p, movieIds: p.movieIds.filter(id => id !== movieId) }
              : p
          ),
        }));
      },

      addToWatchHistory: (movieId, userRating) => {
        const record: WatchRecord = {
          id: `h_${Date.now()}`,
          movieId,
          watchedAt: new Date().toISOString(),
          userRating,
        };
        set(s => ({ watchHistory: [record, ...s.watchHistory] }));
      },

      removeFromWatchHistory: (id) => {
        set(s => ({ watchHistory: s.watchHistory.filter(h => h.id !== id) }));
      },

      toggleFavorite: (movieId) => {
        set(s => {
          const exists = s.favorites.includes(movieId);
          return {
            favorites: exists
              ? s.favorites.filter(id => id !== movieId)
              : [...s.favorites, movieId],
          };
        });
      },

      isFavorite: (movieId) => get().favorites.includes(movieId),

      setFilterGenres: (genres) => {
        set(s => ({ filterOptions: { ...s.filterOptions, genres } }));
      },

      setFilterYears: (years) => {
        set(s => ({ filterOptions: { ...s.filterOptions, years } }));
      },

      setFilterRegions: (regions) => {
        set(s => ({ filterOptions: { ...s.filterOptions, regions } }));
      },

      setFilterMood: (mood) => {
        set(s => ({ filterOptions: { ...s.filterOptions, mood } }));
      },

      setFilterKeyword: (keyword) => {
        set(s => ({ filterOptions: { ...s.filterOptions, keyword } }));
      },

      resetFilters: () => {
        set({
          filterOptions: { genres: [], years: [], regions: [] },
        });
      },
    }),
    {
      name: 'cinescope-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        playlists: s.playlists,
        watchHistory: s.watchHistory,
        favorites: s.favorites,
      }),
    }
  )
);
