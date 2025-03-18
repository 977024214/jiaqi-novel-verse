
import React, { useEffect } from 'react';
import FeaturedNovel from '@/components/FeaturedNovel';
import NovelCard from '@/components/NovelCard';
import CategoryList from '@/components/CategoryList';
import Navbar from '@/components/Navbar';
import { ArrowRight, Sparkles, Clock, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getFeaturedNovels, getRecentNovels, getPopularNovels } from '@/lib/data';

const Index = () => {
  const featuredNovels = getFeaturedNovels();
  const recentNovels = getRecentNovels(6);
  const popularNovels = getPopularNovels(6);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-novel-bg page-transition">
      <Navbar />
      
      {/* Main Content with padding for navbar */}
      <main className="pt-16">
        {/* Hero Section with Featured Novel */}
        <section className="pt-8 pb-12 md:pt-12 md:pb-16">
          <div className="novel-container">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredNovels.map((novel, index) => (
                <div 
                  key={novel.id} 
                  className={index === 0 ? "md:col-span-2 lg:col-span-2 aspect-[16/9] md:aspect-[21/9]" : "aspect-[3/4] md:aspect-[3/4]"}
                >
                  <FeaturedNovel novel={novel} />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Category Grid */}
        <section className="py-8">
          <div className="novel-container">
            <CategoryList />
          </div>
        </section>
        
        {/* Recent Updates Section */}
        <section className="py-8">
          <div className="novel-container">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Clock size={20} className="text-novel-accent" />
                <h2 className="text-xl font-medium">最近更新</h2>
              </div>
              <Link 
                to="/browse" 
                className="flex items-center text-sm text-novel-muted hover:text-novel-accent transition-colors"
              >
                查看更多
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="novel-grid">
              {recentNovels.map(novel => (
                <NovelCard key={novel.id} novel={novel} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Popular Novels Section */}
        <section className="py-8 pb-16">
          <div className="novel-container">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <BarChart2 size={20} className="text-novel-accent" />
                <h2 className="text-xl font-medium">热门小说</h2>
              </div>
              <Link 
                to="/rankings" 
                className="flex items-center text-sm text-novel-muted hover:text-novel-accent transition-colors"
              >
                查看排行榜
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="novel-grid">
              {popularNovels.map(novel => (
                <NovelCard key={novel.id} novel={novel} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-6 bg-white border-t border-novel-border">
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

export default Index;
