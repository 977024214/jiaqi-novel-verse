
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Star } from 'lucide-react';
import { Novel } from '@/lib/data';

interface FeaturedNovelProps {
  novel: Novel;
}

const FeaturedNovel: React.FC<FeaturedNovelProps> = ({ novel }) => {
  return (
    <div className="relative overflow-hidden rounded-sm group qd-card">
      {/* Background image with overlay gradient */}
      <div className="absolute inset-0 z-0">
        <img 
          src={novel.cover} 
          alt={novel.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80"></div>
      </div>
      
      <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-8">
        <div className="flex items-center space-x-2 mb-2">
          <span className="bg-[var(--qd-primary)] text-white px-3 py-1 rounded-sm text-xs font-medium flex items-center">
            <Star size={12} className="mr-1" />
            精选推荐
          </span>
          {novel.categories.map((category, index) => (
            <span key={index} className="bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-sm text-xs">
              {category}
            </span>
          ))}
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          {novel.title}
        </h2>
        
        <p className="text-white/80 mb-4 text-sm line-clamp-2 max-w-lg">
          {novel.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="text-white/70 text-sm">
            <span className="font-serif mr-2">{novel.author}</span>
            <span className="text-white/50">· {novel.chapters.length} 章</span>
          </div>
          
          <Link 
            to={`/novel/${novel.id}`}
            className="qd-button qd-button-primary"
          >
            <BookOpen size={16} />
            <span>开始阅读</span>
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedNovel;
