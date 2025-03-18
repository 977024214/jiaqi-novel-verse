
import React from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { Novel } from '@/lib/data';

interface NovelCardProps {
  novel: Novel;
  className?: string;
}

const NovelCard: React.FC<NovelCardProps> = ({ novel, className = '' }) => {
  // Format view count
  const formatViewCount = (count: number): string => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  return (
    <Link 
      to={`/novel/${novel.id}`} 
      className={`qd-card group p-3 ${className}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-3">
        <img 
          src={novel.cover} 
          alt={novel.title} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex items-center bg-black/60 text-white rounded-sm px-2 py-0.5 text-xs backdrop-blur-sm">
          <Eye size={12} className="mr-1" />
          <span>{formatViewCount(novel.viewCount)}</span>
        </div>
        
        {novel.status === 'completed' && (
          <div className="absolute top-2 left-2 bg-[var(--qd-primary)] text-white text-xs px-2 py-0.5 rounded-sm">
            已完结
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-bold leading-tight line-clamp-2 group-hover:text-[var(--qd-primary)] transition-colors">
          {novel.title}
        </h3>
        <p className="text-sm text-[var(--qd-text-secondary)]">{novel.author}</p>
        <div className="flex items-center space-x-2 text-xs text-[var(--qd-text-light)]">
          {novel.categories.slice(0, 2).map((category, index) => (
            <span key={index} className="qd-tag">{category}</span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default NovelCard;
