
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ChapterList from '@/components/ChapterList';
import { getNovelById } from '@/lib/data';
import { Eye, Calendar, BookOpen, ListChecks, ArrowLeft, BookMarked, ChevronRight } from 'lucide-react';

const NovelDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [novel, setNovel] = useState(id ? getNovelById(id) : undefined);
  const navigate = useNavigate();

  // Format date to human readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format view count
  const formatViewCount = (count: number): string => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // If novel not found, redirect to 404
    if (!novel) {
      navigate('/not-found');
    }
  }, [novel, navigate]);

  if (!novel) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-novel-bg page-transition">
      <Navbar />
      
      {/* Main Content with padding for navbar */}
      <main className="pt-16">
        <section className="py-8">
          <div className="novel-container">
            {/* Back button */}
            <Link 
              to="/browse" 
              className="inline-flex items-center text-sm text-novel-muted hover:text-novel-accent transition-colors mb-6"
            >
              <ArrowLeft size={16} className="mr-1" />
              返回书库
            </Link>
            
            {/* Novel Header */}
            <div className="bg-white rounded-xl shadow-sm p-5 md:p-8 mb-8 animate-fade-in">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Cover Image */}
                <div className="w-full md:w-48 lg:w-64 mx-auto md:mx-0">
                  <div className="novel-cover-lg">
                    <img 
                      src={novel.cover} 
                      alt={novel.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Novel Info */}
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">{novel.title}</h1>
                  
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="text-novel-muted">{novel.author}</span>
                    <span className="text-gray-300">|</span>
                    <span className={`novel-chip ${novel.status === 'completed' ? 'bg-green-100 text-green-600' : ''}`}>
                      {novel.status === 'completed' ? '已完结' : '连载中'}
                    </span>
                    {novel.categories.map((category, index) => (
                      <span key={index} className="novel-chip">
                        {category}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-novel-muted mb-6">
                    <div className="flex items-center">
                      <Eye size={16} className="mr-1" />
                      <span>{formatViewCount(novel.viewCount)} 阅读</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen size={16} className="mr-1" />
                      <span>{novel.chapters.length} 章</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      <span>更新于 {formatDate(novel.updatedAt)}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-6 leading-relaxed">
                    {novel.description}
                  </p>
                  
                  <div className="flex items-center gap-3">
                    {novel.chapters.length > 0 && (
                      <Link
                        to={`/novel/${novel.id}/chapter/${novel.chapters[0].id}`}
                        className="flex items-center space-x-1 bg-novel-accent text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-novel-accent/90 transition-colors shadow-sm hover:shadow"
                      >
                        <BookOpen size={16} />
                        <span>开始阅读</span>
                      </Link>
                    )}
                    
                    <button
                      className="flex items-center space-x-1 bg-novel-highlight text-novel-accent px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-novel-accent/10 transition-colors"
                    >
                      <BookMarked size={16} />
                      <span>加入书架</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Chapters Section */}
            <ChapterList novelId={novel.id} chapters={novel.chapters} />
          </div>
        </section>
        
        {/* Similar Novels - Would be implemented with real data in production */}
        
        {/* Footer */}
        <footer className="py-6 bg-white border-t border-novel-border mt-8">
          <div className="novel-container">
            <div className="text-center text-sm text-novel-muted">
              <p>&copy; {new Date().getFullYear()} 杰奇小说. 版权所有.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default NovelDetail;
