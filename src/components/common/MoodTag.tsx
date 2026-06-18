import { Link, useParams } from 'react-router-dom';
import { useAppStore } from '@/store';
import { MOODS } from '@/data/moods';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/utils/format';
import { useMemo } from 'react';

interface MoodTagProps {
  moodId: string;
  active?: boolean;
  size?: 'sm' | 'md';
  onClick?: () => void;
}

export default function MoodTag({ moodId, active, size = 'md', onClick }: MoodTagProps) {
  const mood = MOODS.find(m => m.id === moodId);
  const { mood: routeMood } = useParams();
  const { filterOptions, setFilterMood } = useAppStore();

  const isActive = useMemo(() => {
    if (active !== undefined) return active;
    return routeMood === moodId || filterOptions.mood === moodId;
  }, [active, routeMood, filterOptions.mood, moodId]);

  if (!mood) return null;

  const Icon = (Icons as unknown as Record<string, LucideIcon>)[mood.icon] || Icons.Heart;

  const content = (
    <span
      className={cn(
        'mood-chip',
        isActive && 'mood-chip-active',
        size === 'sm' && 'px-3 py-1.5 text-xs gap-1.5'
      )}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
        if (!onClick) {
          setFilterMood(isActive ? undefined : mood.id);
        }
      }}
    >
      <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
      {mood.label}
    </span>
  );

  if (onClick) return content;

  return (
    <Link to={`/discover/mood/${mood.id}`} onClick={(e) => e.preventDefault()}>
      {content}
    </Link>
  );
}
