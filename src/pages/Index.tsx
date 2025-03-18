
import React, { useEffect } from 'react';
import '@/lib/theme.css';
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
    <div className="min-h-screen bg-[var(--qd-bg)] text-[var(--qd-text)] page-transition">
      <Navbar />
      
      {/* Main Content with padding for navbar */}
      <main className="pt-16">
        {/* Hero Section with Featured Novel */}
        <section className="pt-8 pb-12 md:pt-12 md:pb-16 bg-[var(--qd-card)]">
          <div className="qd-container">
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
        <section className="py-8 bg-[var(--qd-card)]">
          <div className="qd-container">
            <CategoryList />
          </div>
        </section>
        
        {/* Recent Updates Section */}
        <section className="py-8 bg-[var(--qd-card)] mt-4">
          <div className="qd-container">
            <div className="flex items-center justify-between mb-6">
              <div className="qd-title">
                <Clock size={20} className="mr-2" />
                最近更新
              </div>
              <Link 
                to="/browse" 
                className="qd-button qd-button-primary"
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
        <section className="py-8 pb-16 bg-[var(--qd-card)] mt-4">
          <div className="qd-container">
            <div className="flex items-center justify-between mb-6">
              <div className="qd-title">
                <BarChart2 size={20} className="mr-2" />
                热门小说
              </div>
              <Link 
                to="/rankings" 
                className="qd-button qd-button-primary"
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
        <footer className="py-6 bg-[var(--qd-card)] border-t border-[var(--qd-border)]">
          <div className="qd-container">
            <div className="text-center text-sm text-[var(--qd-text-light)]">
              <p>&copy; {new Date().getFullYear()} 杰奇小说. 版权所有.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
