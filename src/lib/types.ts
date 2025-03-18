export interface Novel {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  category: string;
  tags: string[];
  status: "连载中" | "已完结" | "暂停更新";
  wordCount: number;
  chapterCount: number;
  views: number;
  monthlyTickets: number;
  recommendTickets: number;
  bookmarks: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  lastChapter: {
    id: string;
    title: string;
    createdAt: Date;
  };
}

export interface Chapter {
  id: string;
  novelId: string;
  title: string;
  content: string;
  wordCount: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  novelCount: number;
}

export interface UserPreferences {
  fontSize: number;
  lineHeight: number;
  font: string;
  theme: string;
}

export interface ReadingProgress {
  novelId: string;
  chapterId: string;
  scrollPosition: number;
  lastReadAt: Date;
}

export interface BookmarkItem {
  novelId: string;
  chapterId: string;
  timestamp: Date;
  note?: string;
}

export interface UserState {
  preferences: UserPreferences;
  readingProgress: ReadingProgress[];
  bookmarks: BookmarkItem[];
  recentNovels: string[]; // 最近阅读的小说ID列表
}
