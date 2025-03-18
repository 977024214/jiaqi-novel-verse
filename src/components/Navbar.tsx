
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, BookOpen } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle scroll to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, you would navigate to search results
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out qd-navbar ${
        isScrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="qd-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xl font-serif tracking-tight text-[var(--qd-primary)] transition-opacity hover:opacity-80"
          >
            <BookOpen size={24} strokeWidth={1.5} />
            <span className="font-medium">杰奇</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="px-4 py-2 text-[var(--qd-text)] hover:text-[var(--qd-primary)] transition-colors">首页</Link>
            <Link to="/browse" className="px-4 py-2 text-[var(--qd-text)] hover:text-[var(--qd-primary)] transition-colors">书库</Link>
            <Link to="/rankings" className="px-4 py-2 text-[var(--qd-text)] hover:text-[var(--qd-primary)] transition-colors">排行</Link>
            <Link to="/categories" className="px-4 py-2 text-[var(--qd-text)] hover:text-[var(--qd-primary)] transition-colors">分类</Link>
          </nav>

          {/* Search and Menu Button */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <form onSubmit={handleSearch} className="hidden md:flex relative">
              <input
                type="text"
                placeholder="搜索小说..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 px-3 py-1.5 text-sm rounded-sm bg-[var(--qd-bg)] border border-[var(--qd-border)] focus:outline-none focus:border-[var(--qd-primary)] transition-all duration-300 focus:w-64"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[var(--qd-text-light)]"
              >
                <Search size={16} />
              </button>
            </form>
            
            <button
              onClick={toggleMenu}
              className="md:hidden text-[var(--qd-text)] hover:text-[var(--qd-primary)] transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[var(--qd-card)] border-t border-[var(--qd-border)] animate-slide-down">
          <div className="novel-container py-4 space-y-3">
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                placeholder="搜索小说..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 text-sm rounded-sm bg-[var(--qd-bg)] border border-[var(--qd-border)] focus:outline-none focus:border-[var(--qd-primary)]"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--qd-text-light)]"
              >
                <Search size={16} />
              </button>
            </form>
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="block px-4 py-2 text-[var(--qd-text)] hover:text-[var(--qd-primary)] hover:bg-[var(--qd-hover)] transition-colors">首页</Link>
              <Link to="/browse" className="block px-4 py-2 text-[var(--qd-text)] hover:text-[var(--qd-primary)] hover:bg-[var(--qd-hover)] transition-colors">书库</Link>
              <Link to="/rankings" className="block px-4 py-2 text-[var(--qd-text)] hover:text-[var(--qd-primary)] hover:bg-[var(--qd-hover)] transition-colors">排行</Link>
              <Link to="/categories" className="block px-4 py-2 text-[var(--qd-text)] hover:text-[var(--qd-primary)] hover:bg-[var(--qd-hover)] transition-colors">分类</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
