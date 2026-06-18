import type { Mood } from '@/types';

export const MOODS: Mood[] = [
  {
    id: 'cry',
    label: '想哭一场',
    icon: 'Droplet',
    description: '找一部催泪佳作，尽情释放情绪',
    color: 'from-blue-400 to-cyan-500',
  },
  {
    id: 'brainy',
    label: '烧脑一晚',
    icon: 'Brain',
    description: '反转不断，挑战你的逻辑推理',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    id: 'laugh',
    label: '笑到抽筋',
    icon: 'Laugh',
    description: '爆笑喜剧，甩掉一周的疲惫',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    id: 'romance',
    label: '怦然心动',
    icon: 'Heart',
    description: '甜蜜爱情片，感受浪漫氛围',
    color: 'from-pink-400 to-rose-500',
  },
  {
    id: 'thriller',
    label: '心惊肉跳',
    icon: 'Ghost',
    description: '恐怖片悬疑片，氛围拉满',
    color: 'from-red-600 to-rose-800',
  },
  {
    id: 'warm',
    label: '治愈一夏',
    icon: 'Sun',
    description: '温情治愈片，温暖你的周末',
    color: 'from-amber-400 to-yellow-500',
  },
  {
    id: 'inspire',
    label: '热血沸腾',
    icon: 'Flame',
    description: '励志佳作，重燃生活斗志',
    color: 'from-red-500 to-orange-600',
  },
  {
    id: 'scifi',
    label: '探索宇宙',
    icon: 'Rocket',
    description: '科幻巨制，开启奇幻冒险',
    color: 'from-blue-600 to-purple-700',
  },
];

export const getMoodById = (id: string): Mood | undefined => {
  return MOODS.find(m => m.id === id);
};
