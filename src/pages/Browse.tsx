
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import NovelCard from '@/components/NovelCard';
import { Filter, ChevronDown, RefreshCcw } from 'lucide-react';
import { novels, categories } from '@/lib/data';

const Browse = () => {
  const [filteredNovels, setFilteredNovels] = useState(novels);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string>('latest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter novels when filters change
  useEffect(() => {
    let result = [...novels];
    
    // Apply category filter
    if (selectedCategory) {
      const category = categories.find(c => c.id === selectedCategory);
      if (category) {
        result = result.filter(novel => novel.categories.includes(category.name));
      }
    }
    
    // Apply status filter
    if (selectedStatus) {
      result = result.filter(novel => novel.status === selectedStatus);
    }
    
    // Apply sorting
    if (sortOrder === 'latest') {
      result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    } else if (sortOrder === 'popular') {
      result.sort((a, b) => b.viewCount - a.viewCount);
    } else if (sortOrder === 'chapters') {
      result.sort((a, b) => b.chapters.length - a.chapters.length);
    }
    
    setFilteredNovels(result);
  }, [selectedCategory, selectedStatus, sortOrder]);

  // Reset filters
  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedStatus(null);
    setSortOrder('latest');
  };

  // Toggle filters on mobile
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-novel-bg page-transition">
      <Navbar />
      
      {/* Main Content with padding for navbar */}
      <main className="pt-16">
        <section className="py-8">
          <div className="novel-container">
            <div className="mb-8">
              <h1 className="text-3xl font-medium mb-2">小说书库</h1>
              <p className="text-novel-muted">发现最好的小说作品，开始您的阅读之旅</p>
            </div>
            
            {/* Filters */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <button 
                  onClick={toggleFilter}
                  className="md:hidden flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm"
                >
                  <Filter size={16} />
                  <span>筛选</span>
                  <ChevronDown size={16} className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <div className="hidden md:flex items-center space-x-4">
                  {/* Category Filter */}
                  <div className="filter-group">
                    <span className="text-sm text-novel-muted mr-2">分类:</span>
                    <select
                      value={selectedCategory || ''}
                      onChange={(e) => setSelectedCategory(e.target.value || null)}
                      className="bg-white border border-novel-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-novel-accent"
                    >
                      <option value="">全部</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Status Filter */}
                  <div className="filter-group">
                    <span className="text-sm text-novel-muted mr-2">状态:</span>
                    <select
                      value={selectedStatus || ''}
                      onChange={(e) => setSelectedStatus(e.target.value || null)}
                      className="bg-white border border-novel-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-novel-accent"
                    >
                      <option value="">全部</option>
                      <option value="ongoing">连载中</option>
                      <option value="completed">已完结</option>
                    </select>
                  </div>
                </div>
                
                {/* Sort Order */}
                <div className="filter-group">
                  <span className="text-sm text-novel-muted mr-2 hidden md:inline">排序:</span>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="bg-white border border-novel-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-novel-accent"
                  >
                    <option value="latest">最近更新</option>
                    <option value="popular">人气优先</option>
                    <option value="chapters">章节数量</option>
                  </select>
                </div>
              </div>
              
              {/* Mobile Filters */}
              {isFilterOpen && (
                <div className="md:hidden bg-white rounded-lg shadow-sm p-4 mb-4 animate-slide-down">
                  <div className="space-y-4">
                    {/* Category Filter */}
                    <div className="filter-group">
                      <span className="text-sm text-novel-muted block mb-1">分类:</span>
                      <select
                        value={selectedCategory || ''}
                        onChange={(e) => setSelectedCategory(e.target.value || null)}
                        className="w-full bg-white border border-novel-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-novel-accent"
                      >
                        <option value="">全部</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Status Filter */}
                    <div className="filter-group">
                      <span className="text-sm text-novel-muted block mb-1">状态:</span>
                      <select
                        value={selectedStatus || ''}
                        onChange={(e) => setSelectedStatus(e.target.value || null)}
                        className="w-full bg-white border border-novel-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-novel-accent"
                      >
                        <option value="">全部</option>
                        <option value="ongoing">连载中</option>
                        <option value="completed">已完结</option>
                      </select>
                    </div>
                    
                    {/* Reset Button */}
                    <button
                      onClick={resetFilters}
                      className="w-full flex items-center justify-center space-x-2 bg-novel-highlight text-novel-accent rounded-md px-4 py-2 hover:bg-novel-accent/10 transition-colors"
                    >
                      <RefreshCcw size={16} />
                      <span>重置筛选</span>
                    </button>
                  </div>
                </div>
              )}
              
              {/* Active Filters */}
              {(selectedCategory || selectedStatus) && (
                <div className="flex items-center flex-wrap gap-2">
                  <span className="text-sm text-novel-muted">已筛选:</span>
                  
                  {selectedCategory && (
                    <div className="bg-novel-highlight text-novel-accent rounded-full px-3 py-1 text-xs flex items-center">
                      分类: {categories.find(c => c.id === selectedCategory)?.name}
                    </div>
                  )}
                  
                  {selectedStatus && (
                    <div className="bg-novel-highlight text-novel-accent rounded-full px-3 py-1 text-xs flex items-center">
                      状态: {selectedStatus === 'ongoing' ? '连载中' : '已完结'}
                    </div>
                  )}
                  
                  <button
                    onClick={resetFilters}
                    className="text-xs text-novel-muted hover:text-novel-accent flex items-center"
                  >
                    <RefreshCcw size={12} className="mr-1" />
                    重置
                  </button>
                </div>
              )}
            </div>
            
            {/* Novel Grid */}
            {filteredNovels.length > 0 ? (
              <div className="novel-grid">
                {filteredNovels.map(novel => (
                  <NovelCard key={novel.id} novel={novel} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <p className="text-novel-muted">没有找到符合条件的小说</p>
                <button
                  onClick={resetFilters}
                  className="mt-4 flex items-center justify-center space-x-2 bg-novel-highlight text-novel-accent rounded-md px-4 py-2 hover:bg-novel-accent/10 transition-colors mx-auto"
                >
                  <RefreshCcw size={16} />
                  <span>重置筛选</span>
                </button>
              </div>
            )}
          </div>
        </section>
        
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

export default Browse;
