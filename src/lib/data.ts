import { Novel, Chapter, Category } from "./types";

// 分类数据
export const categories: Category[] = [
  { id: "xuanhuan", name: "玄幻", description: "玄幻小说", novelCount: 12345 },
  { id: "qihuan", name: "奇幻", description: "奇幻小说", novelCount: 8765 },
  { id: "wuxia", name: "武侠", description: "武侠小说", novelCount: 6543 },
  { id: "xianxia", name: "仙侠", description: "仙侠小说", novelCount: 9876 },
  { id: "dushi", name: "都市", description: "都市小说", novelCount: 15432 },
  { id: "junshi", name: "军事", description: "军事小说", novelCount: 3456 },
  { id: "lishi", name: "历史", description: "历史小说", novelCount: 5678 },
  { id: "youxi", name: "游戏", description: "游戏小说", novelCount: 7890 },
  { id: "kehuan", name: "科幻", description: "科幻小说", novelCount: 4321 },
  { id: "lingyi", name: "灵异", description: "灵异小说", novelCount: 2345 },
];

// 生成示例小说数据
function generateNovel(id: string, category: Category): Novel {
  const now = new Date();
  const createdAt = new Date(now.getTime() - Math.random() * 365 * 24 * 60 * 60 * 1000);
  const updatedAt = new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000);
  
  return {
    id,
    title: `${category.name}小说${id}`,
    author: `作者${id}`,
    cover: `https://picsum.photos/seed/${id}/400/600`,
    description: `这是一部精彩的${category.name}小说，讲述了一个关于成长与冒险的故事...`,
    category: category.name,
    tags: ["热血", "爽文", "升级"],
    status: Math.random() > 0.3 ? "连载中" : "已完结",
    wordCount: Math.floor(100000 + Math.random() * 1000000),
    chapterCount: Math.floor(100 + Math.random() * 900),
    views: Math.floor(10000 + Math.random() * 1000000),
    monthlyTickets: Math.floor(100 + Math.random() * 10000),
    recommendTickets: Math.floor(1000 + Math.random() * 100000),
    bookmarks: Math.floor(100 + Math.random() * 10000),
    rating: 7 + Math.random() * 3,
    createdAt,
    updatedAt,
    lastChapter: {
      id: "latest",
      title: "最新章节标题",
      createdAt: updatedAt,
    },
  };
}

// 生成示例章节数据
function generateChapter(novelId: string, order: number): Chapter {
  const now = new Date();
  const createdAt = new Date(now.getTime() - (1000 - order) * 24 * 60 * 60 * 1000);
  
  return {
    id: `${novelId}-${order}`,
    novelId,
    title: `第${order}章 章节标题`,
    content: `这是第${order}章的内容，包含了精彩的故事情节...\n\n`.repeat(10),
    wordCount: Math.floor(2000 + Math.random() * 1000),
    order,
    createdAt,
    updatedAt: createdAt,
  };
}

// 生成所有小说数据
const novels: Novel[] = [];
categories.forEach((category) => {
  for (let i = 0; i < 10; i++) {
    novels.push(generateNovel(`${category.id}-${i}`, category));
  }
});

// 数据访问函数
export function getNovelById(id: string): Novel | undefined {
  return novels.find((novel) => novel.id === id);
}

export function getChapterById(novelId: string, chapterId: string): Chapter | undefined {
  const [, order] = chapterId.split("-");
  return generateChapter(novelId, parseInt(order));
}

export function getFeaturedNovels(): Novel[] {
  return novels.filter((novel) => novel.rating > 9).slice(0, 5);
}

export function getRecentNovels(limit: number = 6): Novel[] {
  return [...novels].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()).slice(0, limit);
}

export function getPopularNovels(limit: number = 8): Novel[] {
  return [...novels].sort((a, b) => b.views - a.views).slice(0, limit);
}

export function getNewNovels(limit: number = 6): Novel[] {
  return [...novels].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, limit);
}

export function getRankingNovels(): Novel[] {
  return [...novels].sort((a, b) => b.monthlyTickets - a.monthlyTickets);
}

export function getNovelsInCategory(categoryId: string): Novel[] {
  return novels.filter((novel) => novel.category === categories.find((c) => c.id === categoryId)?.name);
}

export function getRecommendedNovels(limit: number = 4): Novel[] {
  return [...novels].sort((a, b) => b.recommendTickets - a.recommendTickets).slice(0, limit);
}
