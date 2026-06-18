import type { Movie } from '@/types';

const generatePosterUrl = (seed: string) => 
  `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(`cinematic movie poster, ${seed}, dramatic lighting, film poster style, high quality, detailed, theatrical release, ${Math.random() > 0.5 ? 'asian cinema' : 'hollywood style'}`)}&image_size=portrait_4_3`;

const generateBackdropUrl = (seed: string) =>
  `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(`cinematic movie scene, ${seed}, wide shot, atmospheric, dramatic lighting, movie still, 4k, moody`)}&image_size=landscape_16_9`;

const generateAvatarUrl = (seed: string) =>
  `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(`professional headshot portrait, ${seed}, actor photo, studio lighting, clean background, realistic`)}&image_size=square`;

export const MOVIES: Movie[] = [
  {
    id: 'm1',
    title: '时间褶皱',
    originalTitle: 'Folds of Time',
    poster: generatePosterUrl('sci-fi time travel thriller, astronaut, dark space, dramatic title'),
    backdrop: generateBackdropUrl('futuristic city at night, neon lights, rain, cinematic'),
    rating: 9.2,
    votes: 458230,
    releaseDate: '2024-03-15',
    year: 2024,
    genres: ['科幻', '悬疑', '剧情'],
    regions: ['美国'],
    director: 'Christopher Nolan',
    cast: [
      { id: 'c1', name: 'Matthew McConaughey', avatar: generateAvatarUrl('middle-aged man, actor, brown hair, serious expression'), role: 'actor', character: '库珀' },
      { id: 'c2', name: 'Anne Hathaway', avatar: generateAvatarUrl('woman, actress, brown hair, elegant, mid-30s'), role: 'actor', character: '布兰德' },
      { id: 'c3', name: 'Jessica Chastain', avatar: generateAvatarUrl('red haired woman, actress, intense expression'), role: 'actor', character: '墨菲' },
    ],
    synopsis: '2067年，地球环境急剧恶化，人类面临灭绝危机。前NASA宇航员库珀被选中执行一项穿越虫洞的星际任务，寻找人类新的家园。在第五维度的空间中，他发现时间不过是可以折叠的维度，而爱，是唯一能够穿越时空的力量。',
    duration: 169,
    mood: 'brainy',
    weeklyRank: 1,
    monthlyRank: 2,
    tags: ['时空', '亲情', '硬科幻', '烧脑'],
  },
  {
    id: 'm2',
    title: '海的尽头是草原',
    originalTitle: 'The End of Sea is Grassland',
    poster: generatePosterUrl('chinese drama film poster, vast grassland, sunset, two children silhouette, emotional'),
    backdrop: generateBackdropUrl('endless grassland at golden hour, horses, distant mountains, nostalgic'),
    rating: 8.7,
    votes: 187520,
    releaseDate: '2022-09-09',
    year: 2022,
    genres: ['剧情'],
    regions: ['中国大陆'],
    director: '尔冬升',
    cast: [
      { id: 'c4', name: '陈宝国', avatar: generateAvatarUrl('chinese senior man, actor, wise expression, gray hair'), role: 'actor', character: '杜思瀚' },
      { id: 'c5', name: '马苏', avatar: generateAvatarUrl('chinese woman, actress, warm smile, natural look'), role: 'actor', character: '萨仁娜' },
      { id: 'c6', name: '阿云嘎', avatar: generateAvatarUrl('mongolian man, singer, strong features, traditional clothing'), role: 'actor', character: '伊德尔' },
    ],
    synopsis: '上世纪五十年代末，新中国遭遇严重自然灾害，大批南方孤儿面临营养不足的危机。内蒙古自治区党委、政府主动请缨，将三千名孤儿接到大草原，牧民们用博大的胸怀接纳并养育了他们。',
    duration: 124,
    mood: 'cry',
    weeklyRank: 5,
    monthlyRank: 8,
    tags: ['亲情', '历史', '温情', '真实改编'],
  },
  {
    id: 'm3',
    title: '疯狂动物乌托邦',
    originalTitle: 'Zootopia: New Dawn',
    poster: generatePosterUrl('animation film poster, colorful city, rabbit and fox police officers, vibrant'),
    backdrop: generateBackdropUrl('animated futuristic cityscape, different climate districts, colorful, cartoon style'),
    rating: 9.0,
    votes: 623890,
    releaseDate: '2024-06-28',
    year: 2024,
    genres: ['动画', '喜剧', '动作'],
    regions: ['美国'],
    director: 'Byron Howard',
    cast: [
      { id: 'c7', name: 'Ginnifer Goodwin', avatar: generateAvatarUrl('woman voice actress, short hair, friendly'), role: 'actor', character: '朱迪' },
      { id: 'c8', name: 'Jason Bateman', avatar: generateAvatarUrl('man actor, charming smile, mid-aged'), role: 'actor', character: '尼克' },
      { id: 'c9', name: 'Idris Elba', avatar: generateAvatarUrl('black man actor, strong jawline, serious'), role: 'actor', character: '牛局长' },
    ],
    synopsis: '兔警官朱迪和狐骗子尼克再度联手，调查动物城一起神秘的"梦境污染"案件。这次，他们将深入隐藏在城市地下的古老部落，揭开动物城建国以来最大的秘密。',
    duration: 118,
    mood: 'laugh',
    weeklyRank: 2,
    monthlyRank: 1,
    tags: ['友情', '冒险', '反歧视', '合家欢'],
  },
  {
    id: 'm4',
    title: '东京爱情物语',
    originalTitle: '東京恋物語',
    poster: generatePosterUrl('japanese romance poster, tokyo street at night, cherry blossoms, couple silhouette, soft focus'),
    backdrop: generateBackdropUrl('tokyo shibuya crossing at night, neon signs, rain, romantic atmosphere'),
    rating: 8.5,
    votes: 98230,
    releaseDate: '2023-11-24',
    year: 2023,
    genres: ['爱情', '剧情'],
    regions: ['日本'],
    director: '是枝裕和',
    cast: [
      { id: 'c10', name: '有村架纯', avatar: generateAvatarUrl('japanese young woman, actress, gentle smile, long black hair'), role: 'actor', character: '水泽彩' },
      { id: 'c11', name: '菅田将晖', avatar: generateAvatarUrl('japanese young man, actor, messy hair, quirky look'), role: 'actor', character: '佐藤健太' },
      { id: 'c12', name: '广濑铃', avatar: generateAvatarUrl('japanese girl, actress, fresh face, short hair'), role: 'actor', character: '美咲' },
    ],
    synopsis: '在东京一家24小时书店打工的彩，每天都在同一个角落遇到来买书的健太。两人因一本旧书结缘，却因为各自藏在心底的秘密迟迟无法靠近。樱花落下的季节，他们终于打开了心扉。',
    duration: 132,
    mood: 'romance',
    weeklyRank: 7,
    hiddenGem: true,
    tags: ['暗恋', '治愈', '东京', '慢节奏'],
  },
  {
    id: 'm5',
    title: '暗夜回响',
    originalTitle: 'Echoes in the Dark',
    poster: generatePosterUrl('horror thriller poster, dark hallway, flickering light, shadow figure, eerie atmosphere'),
    backdrop: generateBackdropUrl('abandoned mansion interior, dark, fog, moonlight through windows'),
    rating: 8.3,
    votes: 156780,
    releaseDate: '2024-10-25',
    year: 2024,
    genres: ['悬疑', '恐怖'],
    regions: ['韩国'],
    director: '罗泓轸',
    cast: [
      { id: 'c13', name: '宋康昊', avatar: generateAvatarUrl('korean middle-aged man, actor, intense gaze'), role: 'actor', character: '金警长' },
      { id: 'c14', name: '全智贤', avatar: generateAvatarUrl('korean woman, actress, elegant, beautiful features'), role: 'actor', character: '徐熙珠' },
      { id: 'c15', name: '崔岷植', avatar: generateAvatarUrl('korean senior actor, weathered face, menacing look'), role: 'actor', character: '神秘人' },
    ],
    synopsis: '首尔市中心一栋老旧公寓内，接连发生无法解释的失踪事件。警长金在调查中发现，所有受害者生前都曾听到同一个声音——那是20年前在这里死去的女子的声音。他越接近真相，越感到一股寒意从背后袭来。',
    duration: 141,
    mood: 'thriller',
    weeklyRank: 3,
    monthlyRank: 4,
    tags: ['心理恐怖', '悬疑', '反转', '东方恐怖'],
  },
  {
    id: 'm6',
    title: '小森来信',
    originalTitle: 'Letter from Komori',
    poster: generatePosterUrl('japanese healing film poster, countryside, rice fields, cottage, warm lighting'),
    backdrop: generateBackdropUrl('japanese countryside village, rice paddies, mountains, autumn foliage, peaceful'),
    rating: 8.9,
    votes: 234560,
    releaseDate: '2022-04-08',
    year: 2022,
    genres: ['剧情'],
    regions: ['日本'],
    director: '森淳一',
    cast: [
      { id: 'c16', name: '桥本爱', avatar: generateAvatarUrl('japanese young woman, natural beauty, short hair, soft'), role: 'actor', character: '市子' },
      { id: 'c17', name: '松冈茉优', avatar: generateAvatarUrl('japanese woman, cheerful, dimpled smile'), role: 'actor', character: '纪子' },
      { id: 'c18', name: '三浦贵大', avatar: generateAvatarUrl('japanese young man, boyish looks, warm smile'), role: 'actor', character: '佑太' },
    ],
    synopsis: '无法适应都市生活的市子，回到了故乡小森村。在这里，她按照季节的节奏耕作、烹饪、和朋友分享美食。每一道菜都承载着母亲留下的回忆，每一天都是治愈心灵的礼物。',
    duration: 120,
    mood: 'warm',
    monthlyRank: 6,
    hiddenGem: true,
    tags: ['美食', '乡村', '治愈', '慢生活'],
  },
  {
    id: 'm7',
    title: '烈火战车',
    originalTitle: 'Chariots of Fire',
    poster: generatePosterUrl('sports film poster, runner on track, stadium, dramatic sunset, motivational'),
    backdrop: generateBackdropUrl('olympic stadium track, sunset, athlete silhouette, crowd cheering'),
    rating: 8.8,
    votes: 87650,
    releaseDate: '2023-08-18',
    year: 2023,
    genres: ['剧情', '动作'],
    regions: ['中国大陆'],
    director: '陈可辛',
    cast: [
      { id: 'c19', name: '易烊千玺', avatar: generateAvatarUrl('chinese young man, popular idol, intense expression'), role: 'actor', character: '程远' },
      { id: 'c20', name: '张译', avatar: generateAvatarUrl('chinese actor, serious, experienced look'), role: 'actor', character: '教练' },
      { id: 'c21', name: '刘昊然', avatar: generateAvatarUrl('chinese young actor, fresh, boy next door'), role: 'actor', character: '队友' },
    ],
    synopsis: '出生于偏远山村的程远，从小就有一个梦想——站在奥运赛道上。为了这个梦想，他用一双破烂的跑鞋，跑过了泥泞的山路，跑过了冷眼和嘲笑，最终跑向了世界之巅。',
    duration: 138,
    mood: 'inspire',
    weeklyRank: 4,
    monthlyRank: 5,
    tags: ['励志', '运动', '梦想', '热血'],
  },
  {
    id: 'm8',
    title: '星际迷航：新纪元',
    originalTitle: 'Star Trek: New Horizon',
    poster: generatePosterUrl('space sci-fi poster, starship, galaxy nebula, epic space adventure'),
    backdrop: generateBackdropUrl('deep space, colorful nebula, planets, starships, 4k epic cinematic'),
    rating: 8.6,
    votes: 345210,
    releaseDate: '2024-05-17',
    year: 2024,
    genres: ['科幻', '动作', '奇幻'],
    regions: ['美国'],
    director: 'Denis Villeneuve',
    cast: [
      { id: 'c22', name: 'Chris Pine', avatar: generateAvatarUrl('handsome american actor, blue eyes, captain look'), role: 'actor', character: '柯克舰长' },
      { id: 'c23', name: 'Zachary Quinto', avatar: generateAvatarUrl('man actor, dark hair, pointed ears, vulcan'), role: 'actor', character: '史波克' },
      { id: 'c24', name: 'Zoe Saldana', avatar: generateAvatarUrl('woman actress, exotic features, strong look'), role: 'actor', character: '乌胡拉' },
    ],
    synopsis: '2387年，联邦星舰企业号在探索银河系边缘时，发现了一个隐藏在虫洞中的古老文明。这个文明掌握着能够改写宇宙法则的技术，但同时也引来了觊觎这份力量的黑暗势力。',
    duration: 152,
    mood: 'scifi',
    weeklyRank: 6,
    monthlyRank: 3,
    tags: ['太空', '探索', '冒险', '史诗'],
  },
  {
    id: 'm9',
    title: '少年的诗',
    originalTitle: 'Poems of Youth',
    poster: generatePosterUrl('chinese coming of age film, school campus, sunset, teenagers, bittersweet nostalgia'),
    backdrop: generateBackdropUrl('chinese high school campus, old building, cherry blossoms, sunset'),
    rating: 8.4,
    votes: 128900,
    releaseDate: '2023-06-22',
    year: 2023,
    genres: ['剧情', '爱情'],
    regions: ['中国大陆', '中国台湾'],
    director: '魏德圣',
    cast: [
      { id: 'c25', name: '周冬雨', avatar: generateAvatarUrl('chinese young actress, innocent look, small eyes'), role: 'actor', character: '苏念' },
      { id: 'c26', name: '林更新', avatar: generateAvatarUrl('chinese tall actor, handsome, warm smile'), role: 'actor', character: '顾城' },
      { id: 'c27', name: '陈都灵', avatar: generateAvatarUrl('chinese girl, campus belle, pure, innocent'), role: 'actor', character: '小雨' },
    ],
    synopsis: '1998年夏天，南方小城的高中里，苏念偷偷喜欢着后座的顾城。他们用诗集传纸条，在晚自习的走廊聊天，约定一起考去北京。然而高考前的一场意外，改变了所有人的轨迹。',
    duration: 118,
    mood: 'cry',
    tags: ['青春', '怀旧', '90年代', '初恋'],
  },
  {
    id: 'm10',
    title: '致命礼物',
    originalTitle: 'The Deadly Gift',
    poster: generatePosterUrl('crime noir poster, detective, rain, neon, femme fatale, moody shadows'),
    backdrop: generateBackdropUrl('1940s noir city, rain soaked streets, neon reflections, smoke'),
    rating: 8.1,
    votes: 67890,
    releaseDate: '2024-01-12',
    year: 2024,
    genres: ['犯罪', '悬疑'],
    regions: ['中国香港'],
    director: '杜琪峰',
    cast: [
      { id: 'c28', name: '古天乐', avatar: generateAvatarUrl('hong kong actor, suave, cool, detective suit'), role: 'actor', character: '陈警官' },
      { id: 'c29', name: '刘青云', avatar: generateAvatarUrl('hong kong veteran actor, tough guy look'), role: 'actor', character: '黑帮老大' },
      { id: 'c30', name: '蔡卓妍', avatar: generateAvatarUrl('hong kong actress, beautiful, mysterious smile'), role: 'actor', character: '神秘女子' },
    ],
    synopsis: '退休警官陈收到一个匿名包裹，里面是20年前一桩悬案的证据。他重新调查此案，却发现所有线索都指向他最好的兄弟，现任黑帮龙头。在兄弟情和正义之间，他必须做出选择。',
    duration: 133,
    mood: 'brainy',
    hiddenGem: true,
    tags: ['警匪', '港片', '兄弟情', '反转'],
  },
  {
    id: 'm11',
    title: '煎饼侠2',
    originalTitle: 'Pancake Man 2',
    poster: generatePosterUrl('chinese comedy poster, superhero parody, silly, colorful, fun'),
    backdrop: generateBackdropUrl('beijing street food market, night, bustling, neon signs, food stalls'),
    rating: 7.9,
    votes: 289340,
    releaseDate: '2024-02-10',
    year: 2024,
    genres: ['喜剧', '动作'],
    regions: ['中国大陆'],
    director: '大鹏',
    cast: [
      { id: 'c31', name: '董成鹏', avatar: generateAvatarUrl('chinese comedian, funny face, regular guy'), role: 'actor', character: '大鹏' },
      { id: 'c32', name: '柳岩', avatar: generateAvatarUrl('chinese actress, sexy, bubbly personality'), role: 'actor', character: '柳小岩' },
      { id: 'c33', name: '岳云鹏', avatar: generateAvatarUrl('chinese comedian, chubby, funny smile'), role: 'actor', character: '小岳岳' },
    ],
    synopsis: '过气演员大鹏终于迎来了事业第二春，但一次意外让他不得不重新披上煎饼侠的战衣。这次他要面对的是来自好莱坞的超级恶棍，同时还要解决自己的中年危机。',
    duration: 112,
    mood: 'laugh',
    monthlyRank: 9,
    tags: ['恶搞', '搞笑', '娱乐圈', '自嘲'],
  },
  {
    id: 'm12',
    title: '雾中风景',
    originalTitle: 'Landscape in the Mist',
    poster: generatePosterUrl('european art house poster, foggy forest, children walking, poetic, melancholic'),
    backdrop: generateBackdropUrl('misty forest at dawn, lone road, sunbeams through fog, cinematic'),
    rating: 8.8,
    votes: 42560,
    releaseDate: '2021-11-05',
    year: 2021,
    genres: ['剧情', '纪录片'],
    regions: ['法国'],
    director: 'Theo Angelopoulos',
    cast: [
      { id: 'c34', name: 'Jean Reno', avatar: generateAvatarUrl('french actor, mature, kind eyes, beard'), role: 'actor', character: '旅途中年人' },
      { id: 'c35', name: 'child actor 1', avatar: generateAvatarUrl('young girl child, sad eyes, braided hair'), role: 'actor', character: '姐姐' },
      { id: 'c36', name: 'child actor 2', avatar: generateAvatarUrl('young boy child, innocent, travel worn'), role: 'actor', character: '弟弟' },
    ],
    synopsis: '一对年幼的姐弟，为了寻找从未谋面的父亲，踏上了穿越欧洲大陆的漫长旅途。在茫茫雾色中，他们遇到了形形色色的人，经历了这个世界的残酷与温柔。',
    duration: 127,
    mood: 'warm',
    hiddenGem: true,
    tags: ['公路', '诗意', '童年', '艺术电影'],
  },
];

export const getMovieById = (id: string): Movie | undefined => {
  return MOVIES.find(m => m.id === id);
};

export const getMoviesByMood = (mood: string): Movie[] => {
  return MOVIES.filter(m => m.mood === mood);
};

export const getWeeklyRanking = (): Movie[] => {
  return MOVIES
    .filter(m => m.weeklyRank !== undefined)
    .sort((a, b) => (a.weeklyRank || 99) - (b.weeklyRank || 99));
};

export const getMonthlyRanking = (): Movie[] => {
  return MOVIES
    .filter(m => m.monthlyRank !== undefined)
    .sort((a, b) => (a.monthlyRank || 99) - (b.monthlyRank || 99));
};

export const getHiddenGems = (): Movie[] => {
  return MOVIES.filter(m => m.hiddenGem === true);
};

export const getSimilarMovies = (movie: Movie, limit = 6): Movie[] => {
  const scored = MOVIES
    .filter(m => m.id !== movie.id)
    .map(m => {
      let score = 0;
      m.genres.forEach(g => { if (movie.genres.includes(g)) score += 3; });
      m.regions.forEach(r => { if (movie.regions.includes(r)) score += 1; });
      if (m.mood === movie.mood) score += 5;
      m.tags.forEach(t => { if (movie.tags.includes(t)) score += 2; });
      return { movie: m, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  return scored.map(s => s.movie);
};
