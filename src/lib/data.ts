
export interface Novel {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  categories: string[];
  status: 'ongoing' | 'completed';
  updatedAt: string;
  viewCount: number;
  chapters: Chapter[];
  isFeatured?: boolean;
}

export interface Chapter {
  id: string;
  novelId: string;
  title: string;
  number: number;
  createdAt: string;
  wordCount: number;
  content?: string;
}

export const categories = [
  { id: '1', name: '玄幻', count: 1245 },
  { id: '2', name: '武侠', count: 856 },
  { id: '3', name: '都市', count: 1823 },
  { id: '4', name: '历史', count: 643 },
  { id: '5', name: '科幻', count: 472 },
  { id: '6', name: '奇幻', count: 538 },
  { id: '7', name: '军事', count: 314 },
  { id: '8', name: '竞技', count: 267 },
  { id: '9', name: '灵异', count: 389 },
  { id: '10', name: '古言', count: 721 }
];

// Sample content for a chapter
const sampleChapterContent = `
# 第一章：命运的开始

"命运从来不会敲响你的门，它只会悄悄地推开它，然后坐在你的床边，等待你醒来。"

李阳站在高耸的山峰上，俯瞰着下方云雾缭绕的山谷。他的长发被山风吹起，眼神中透露着坚定与决心。自从十年前踏入修行之路，他从未想过自己会走到今天这一步。

"师兄，时间到了。"身后传来一个清脆的声音。

他转过身，看到了师妹小月。她的眼中带着担忧，但更多的是信任。

"我知道。"李阳点了点头，"不管结果如何，这是我的选择。"

小月递给他一个古朴的木盒，"师父说，只有到了生死关头才能打开它。"

李阳接过木盒，感受到了一股奇特的能量波动。他知道，下山之后等待他的将是一场前所未有的挑战。

"小心一点，师兄。"小月低声说道，"门派中有些人对你不怀好意。"

李阳微微一笑，"放心吧，这些年的修行不是白费的。"

他深吸一口气，感受着体内流动的真气。十年寒窗，不是为了权力或名声，而是为了在这个日渐混乱的世界中寻找真相。

随着第一缕阳光穿透云层，李阳知道是时候出发了。他将木盒小心地放入怀中，向山下走去。

命运的齿轮已经开始转动，而他，只是这个庞大棋局中的一枚棋子。

但有时候，一枚棋子也能改变整个棋局。
`;

// Generate chapters for a novel
const generateChapters = (novelId: string, count: number): Chapter[] => {
  return Array.from({ length: count }).map((_, index) => ({
    id: `${novelId}-chapter-${index + 1}`,
    novelId,
    title: `第${index + 1}章：${index === 0 ? '命运的开始' : `未知的旅程 ${index + 1}`}`,
    number: index + 1,
    createdAt: new Date(Date.now() - index * 86400000).toISOString(),
    wordCount: 2000 + Math.floor(Math.random() * 1000),
    content: index === 0 ? sampleChapterContent : undefined
  }));
};

export const novels: Novel[] = [
  {
    id: '1',
    title: '天域苍穹',
    author: '陈天行',
    cover: 'https://images.unsplash.com/photo-1517976384346-3136801d605d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZhbnRhc3klMjBjaGluZXNlfGVufDB8fDB8fHww',
    description: '在这个世界上，有着无尽的天域，每一个天域都有着不同的法则与力量。主角李阳意外获得了穿梭天域的能力，从此踏上了一条充满未知与挑战的修行之路。',
    categories: ['玄幻', '修真'],
    status: 'ongoing',
    updatedAt: new Date().toISOString(),
    viewCount: 15780950,
    chapters: [],
    isFeatured: true
  },
  {
    id: '2',
    title: '剑踪侠影',
    author: '风清扬',
    cover: 'https://images.unsplash.com/photo-1464037042649-4a0d7ef7f25b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1vdW50YWluJTIwY2hpbmVzZXxlbnwwfHwwfHx8MA%3D%3D',
    description: '一把古剑，一段传说，一个少年从边远山村走出，凭借着惊人的武学天赋，游历江湖，经历了无数磨难与考验，最终成为一代剑宗。',
    categories: ['武侠', '古风'],
    status: 'ongoing',
    updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    viewCount: 12567432,
    chapters: []
  },
  {
    id: '3',
    title: '都市之巅',
    author: '李都市',
    cover: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2l0eXxlbnwwfHwwfHx8MA%3D%3D',
    description: '一个普通白领意外获得了商业预见能力，从此在都市商战中纵横捭阖，同时也卷入了一连串的商业阴谋与家族争斗中。',
    categories: ['都市', '商战'],
    status: 'ongoing',
    updatedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    viewCount: 9876543,
    chapters: []
  },
  {
    id: '4',
    title: '明朝那些事',
    author: '历史客',
    cover: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNoaW5lc2UlMjBoaXN0b3J5fGVufDB8fDB8fHww',
    description: '从朱元璋到崇祯，重现明朝三百年风云变幻，帝王将相、文臣武将，在大历史背景下演绎着各自的命运。',
    categories: ['历史', '朝代'],
    status: 'completed',
    updatedAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    viewCount: 20156789,
    chapters: [],
    isFeatured: true
  },
  {
    id: '5',
    title: '星际迷航',
    author: '星际旅人',
    cover: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNwYWNlfGVufDB8fDB8fHww',
    description: '人类文明进入星际时代后，主角作为一名星际探索舰队的舰长，带领着他的船员探索未知的宇宙，遭遇各种神秘文明与危险。',
    categories: ['科幻', '太空'],
    status: 'ongoing',
    updatedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    viewCount: 7865432,
    chapters: []
  },
  {
    id: '6',
    title: '龙族崛起',
    author: '东方奇幻',
    cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJhZ29ufGVufDB8fDB8fHww',
    description: '在一个奇幻世界中，传说中已经灭绝的龙族突然再现，人类、精灵、矮人等种族因此陷入了一场前所未有的大动荡。',
    categories: ['奇幻', '种族'],
    status: 'ongoing',
    updatedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    viewCount: 6543219,
    chapters: []
  },
  {
    id: '7',
    title: '战火纷飞',
    author: '军事专家',
    cover: 'https://images.unsplash.com/photo-1510500954907-e2b82fdd6c74?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2FyfGVufDB8fDB8fHww',
    description: '二战时期，一个普通士兵从入伍到成长为军事指挥官的传奇经历，见证了战争的残酷与人性的光辉。',
    categories: ['军事', '历史'],
    status: 'completed',
    updatedAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    viewCount: 8765432,
    chapters: []
  },
  {
    id: '8',
    title: '篮球之神',
    author: '篮球迷',
    cover: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmFza2V0YmFsbHxlbnwwfHwwfHx8MA%3D%3D',
    description: '一个天赋异禀的年轻球员从高中到职业联赛的成长历程，面对各种挑战与诱惑，最终成为一代传奇。',
    categories: ['竞技', '体育'],
    status: 'ongoing',
    updatedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    viewCount: 4567890,
    chapters: []
  },
  {
    id: '9',
    title: '诡异档案',
    author: '灵异见闻',
    cover: 'https://images.unsplash.com/photo-1505506874110-6a7a69069a08?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bXlzdGVyeXxlbnwwfHwwfHx8MA%3D%3D',
    description: '一名特殊部门的调查员负责处理各种离奇事件，在调查过程中逐渐揭开了一个隐藏在现实背后的超自然世界。',
    categories: ['灵异', '恐怖'],
    status: 'ongoing',
    updatedAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    viewCount: 7654321,
    chapters: []
  },
  {
    id: '10',
    title: '凤鸣九天',
    author: '古风词客',
    cover: 'https://images.unsplash.com/photo-1490604001847-b712b0c2f967?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2hpbmVzZSUyMHBhbGFjZXxlbnwwfHwwfHx8MA%3D%3D',
    description: '乱世之中，一位落魄千金从深宫步步为营，凭借过人的智慧与勇气，最终成为一代女皇，开创了历史上最辉煌的朝代。',
    categories: ['古言', '宫廷'],
    status: 'ongoing',
    updatedAt: new Date(Date.now() - 6 * 86400000).toISOString(),
    viewCount: 8765432,
    chapters: [],
    isFeatured: true
  }
];

// Add chapters to each novel
novels.forEach(novel => {
  novel.chapters = generateChapters(novel.id, 20 + Math.floor(Math.random() * 80));
});

// Helper functions to get novel data
export const getNovelById = (id: string): Novel | undefined => {
  return novels.find(novel => novel.id === id);
};

export const getChapterById = (novelId: string, chapterId: string): Chapter | undefined => {
  const novel = getNovelById(novelId);
  if (!novel) return undefined;
  return novel.chapters.find(chapter => chapter.id === chapterId);
};

export const getFeaturedNovels = (): Novel[] => {
  return novels.filter(novel => novel.isFeatured);
};

export const getRecentNovels = (limit: number = 6): Novel[] => {
  return [...novels].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  ).slice(0, limit);
};

export const getPopularNovels = (limit: number = 6): Novel[] => {
  return [...novels].sort((a, b) => b.viewCount - a.viewCount).slice(0, limit);
};

export const getNovelsInCategory = (categoryId: string): Novel[] => {
  const category = categories.find(c => c.id === categoryId);
  if (!category) return [];
  return novels.filter(novel => novel.categories.includes(category.name));
};
