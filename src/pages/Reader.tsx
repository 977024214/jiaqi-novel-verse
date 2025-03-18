
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getNovelById, getChapterById } from '@/lib/data';
import { ArrowLeft, ArrowRight, Settings, Home, List, Bookmark } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useUserStore } from '@/lib/store';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ReaderSettings } from '@/components/ReaderSettings';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

const Reader = () => {
  const { novelId, chapterId } = useParams<{ novelId: string, chapterId: string }>();
  const navigate = useNavigate();
  
  const [novel, setNovel] = useState(novelId ? getNovelById(novelId) : undefined);
  const [chapter, setChapter] = useState(
    novelId && chapterId ? getChapterById(novelId, chapterId) : undefined
  );
  
  const { preferences, setReadingProgress, addRecentNovel } = useUserStore();
  const { theme } = useTheme();
  const [showControls, setShowControls] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  
  // Get previous and next chapters
  const currentIndex = novel?.chapters.findIndex(ch => ch.id === chapterId) ?? -1;
  const prevChapter = currentIndex > 0 ? novel?.chapters[currentIndex - 1] : undefined;
  const nextChapter = currentIndex >= 0 && currentIndex < (novel?.chapters.length ?? 0) - 1
    ? novel?.chapters[currentIndex + 1]
    : undefined;
  
  // Handle scroll to show/hide controls
  useEffect(() => {
    const handleScroll = () => {
      // Show controls when scrolling up, hide when scrolling down
      if (window.scrollY < lastScrollY) {
        setShowControls(true);
      } else if (window.scrollY > 100 && window.scrollY > lastScrollY) {
        setShowControls(false);
      }
      
      setLastScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  // Update reading progress
  useEffect(() => {
    if (novelId && chapterId) {
      setReadingProgress({
        novelId,
        chapterId,
        scrollPosition: window.scrollY,
        lastRead: new Date().toISOString(),
      });
      addRecentNovel(novelId);
    }
  }, [novelId, chapterId, setReadingProgress, addRecentNovel]);
  
  // Navigate to chapter
  const goToChapter = (id: string | undefined) => {
    if (id && novelId) {
      navigate(`/novel/${novelId}/chapter/${id}`);
    }
  };
  
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // If novel or chapter not found, redirect to novel page or 404
    if (!novel) {
      navigate('/not-found');
    } else if (!chapter) {
      navigate(`/novel/${novelId}`);
    }
    
    // Update chapter when params change
    if (novelId && chapterId) {
      const ch = getChapterById(novelId, chapterId);
      setChapter(ch);
    }
  }, [novel, chapter, navigate, novelId, chapterId]);
  
  if (!novel || !chapter) {
    return null; // Will redirect in useEffect
  }
  
  return (
      <div className={`min-h-screen bg-background text-foreground page-transition ${
        theme === 'dark' ? 'dark' : ''
      }`}>
      {/* Top navigation - visible on scroll up */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm transition-transform duration-300 ${
          showControls ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to={`/novel/${novel.id}`} className="flex items-center text-novel-muted hover:text-novel-accent">
            <ArrowLeft size={20} className="mr-2" />
            <span className="text-sm font-medium">{novel.title}</span>
          </Link>
          
          <div className="text-sm text-novel-muted">
            {`第 ${chapter.number} 章`}
          </div>
          
          <button className="text-novel-muted hover:text-novel-accent">
            <Bookmark size={20} />
          </button>
        </div>
      </header>
      
      {/* Reading Area */}
      <main className="reader-container" style={{ paddingTop: '4rem' }}>
        <article>
          <h1 className="text-2xl font-bold text-center mb-8">{chapter.title}</h1>
          
          <div 
            className="reader-content prose mx-auto" 
            style={{ fontSize: `${fontSize}px` }}
          >
            <ReactMarkdown>
              {chapter.content || '章节内容加载中...'}
            </ReactMarkdown>
          </div>
          
          {/* Chapter Navigation */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => goToChapter(prevChapter?.id)}
              disabled={!prevChapter}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm ${
                prevChapter 
                  ? 'bg-novel-highlight text-novel-accent hover:bg-novel-accent/10' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              } transition-colors w-full sm:w-auto justify-center`}
            >
              <ArrowLeft size={16} />
              <span>上一章</span>
            </button>
            
            <Link
              to={`/novel/${novel.id}`}
              className="flex items-center space-x-2 bg-white border border-novel-border px-5 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center"
            >
              <List size={16} />
              <span>章节列表</span>
            </Link>
            
            <button
              onClick={() => goToChapter(nextChapter?.id)}
              disabled={!nextChapter}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm ${
                nextChapter 
                  ? 'bg-novel-accent text-white hover:bg-novel-accent/90' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              } transition-colors w-full sm:w-auto justify-center`}
            >
              <span>下一章</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </article>
      </main>
      
      {/* Bottom controls - visible on scroll up */}
      <div 
        className={`fixed bottom-6 left-0 right-0 z-50 flex justify-center transition-transform duration-300 ${
          showControls ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="reader-controls">
          <button 
            onClick={() => changeFontSize(-1)}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100"
            aria-label="减小字号"
          >
            A<span className="text-xs">-</span>
          </button>
          
          <Link 
            to={`/novel/${novel.id}`}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100"
            aria-label="章节列表"
          >
            <List size={18} />
          </Link>
          
          <Link 
            to="/"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100"
            aria-label="返回首页"
          >
            <Home size={18} />
          </Link>
          
          <button 
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100"
            aria-label="设置"
          >
            <Settings size={18} />
          </button>
          
          <button 
            onClick={() => changeFontSize(1)}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100"
            aria-label="增大字号"
          >
            A<span className="text-xs">+</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reader;
