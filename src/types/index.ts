export type MoodType = 
  | 'cry' | 'brainy' | 'laugh' | 'romance'
  | 'thriller' | 'warm' | 'inspire' | 'scifi';

export type RankingType = 'weekly' | 'monthly' | 'hidden';
export type GenreType = 
  | '剧情' | '喜剧' | '动作' | '科幻' | '爱情'
  | '悬疑' | '动画' | '犯罪' | '奇幻' | '战争'
  | '恐怖' | '纪录片';

export interface CastMember {
  id: string;
  name: string;
  avatar: string;
  role: 'director' | 'actor';
  character?: string;
}

export interface Movie {
  id: string;
  title: string;
  originalTitle: string;
  poster: string;
  backdrop: string;
  rating: number;
  votes: number;
  releaseDate: string;
  year: number;
  genres: GenreType[];
  regions: string[];
  director: string;
  cast: CastMember[];
  synopsis: string;
  duration: number;
  mood: MoodType;
  weeklyRank?: number;
  monthlyRank?: number;
  hiddenGem?: boolean;
  tags: string[];
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  cover: string;
  movieIds: string[];
  createdAt: string;
}

export interface WatchRecord {
  id: string;
  movieId: string;
  watchedAt: string;
  userRating?: number;
}

export interface Mood {
  id: MoodType;
  label: string;
  icon: string;
  description: string;
  color: string;
}

export interface FilterOptions {
  genres: GenreType[];
  years: number[];
  regions: string[];
  mood?: MoodType;
  keyword?: string;
}

export const GENRES: GenreType[] = [
  '剧情', '喜剧', '动作', '科幻', '爱情', '悬疑',
  '动画', '犯罪', '奇幻', '战争', '恐怖', '纪录片'
];

export const REGIONS: string[] = [
  '中国大陆', '中国香港', '中国台湾',
  '美国', '日本', '韩国', '法国', '其他'
];

export const DECADES: number[] = [
  2020, 2010, 2000, 1990, 1980, 1970
];
