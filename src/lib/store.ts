import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Chapter, Novel } from './data'

interface UserPreferences {
  fontSize: number
  lineHeight: number
  fontFamily: string
}

interface ReadingProgress {
  novelId: string
  chapterId: string
  scrollPosition: number
  lastRead: string
}

interface BookmarkItem {
  novelId: string
  chapterId: string
  timestamp: string
  note?: string
}

interface UserState {
  readingHistory: ReadingProgress[]
  bookmarks: BookmarkItem[]
  preferences: UserPreferences
  recentNovels: string[] // Novel IDs
  setReadingProgress: (progress: ReadingProgress) => void
  addBookmark: (bookmark: BookmarkItem) => void
  removeBookmark: (novelId: string, chapterId: string) => void
  updatePreferences: (preferences: Partial<UserPreferences>) => void
  addRecentNovel: (novelId: string) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      readingHistory: [],
      bookmarks: [],
      recentNovels: [],
      preferences: {
        fontSize: 16,
        lineHeight: 1.6,
        fontFamily: 'system-ui',
      },
      setReadingProgress: (progress) =>
        set((state) => ({
          readingHistory: [
            progress,
            ...state.readingHistory.filter((p) => p.novelId !== progress.novelId),
          ].slice(0, 50), // Keep last 50 records
        })),
      addBookmark: (bookmark) =>
        set((state) => ({
          bookmarks: [bookmark, ...state.bookmarks],
        })),
      removeBookmark: (novelId, chapterId) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter(
            (b) => !(b.novelId === novelId && b.chapterId === chapterId)
          ),
        })),
      updatePreferences: (preferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...preferences },
        })),
      addRecentNovel: (novelId) =>
        set((state) => ({
          recentNovels: [
            novelId,
            ...state.recentNovels.filter((id) => id !== novelId),
          ].slice(0, 10), // Keep last 10 records
        })),
    }),
    {
      name: 'user-storage',
    }
  )
)