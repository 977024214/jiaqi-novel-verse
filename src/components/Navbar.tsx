
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, BookOpen } from 'lucide-react';

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="novel-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xl font-serif tracking-tight text-novel-accent transition-opacity hover:opacity-80"
          >
            <BookOpen size={24} strokeWidth={1.5} />
            <span className="font-medium">杰奇</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="nav-link">首页</Link>
            <Link to="/browse" className="nav-link">书库</Link>
            <Link to="/rankings" className="nav-link">排行</Link>
            <Link to="/categories" className="nav-link">分类</Link>
          </nav>

          {/* Search and Menu Button */}
          <div className="flex items-center space-x-3">
            <form onSubmit={handleSearch} className="hidden md:flex relative">
              <input
                type="text"
                placeholder="搜索小说..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 px-3 py-1.5 text-sm rounded-full bg-novel-highlight focus:outline-none focus:ring-1 focus:ring-novel-accent transition-all duration-300 focus:w-64"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-novel-muted"
              >
                <Search size={16} />
              </button>
            </form>
            
            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-700 hover:text-novel-accent transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md animate-slide-down">
          <div className="novel-container py-4 space-y-3">
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                placeholder="搜索小说..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 text-sm rounded-full bg-novel-highlight focus:outline-none focus:ring-1 focus:ring-novel-accent"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-novel-muted"
              >
                <Search size={16} />
              </button>
            </form>
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="mobile-nav-link">首页</Link>
              <Link to="/browse" className="mobile-nav-link">书库</Link>
              <Link to="/rankings" className="mobile-nav-link">排行</Link>
              <Link to="/categories" className="mobile-nav-link">分类</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
