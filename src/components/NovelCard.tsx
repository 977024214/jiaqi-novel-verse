
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
      className={`novel-card group hover-lift ${className}`}
    >
      <div className="novel-card-cover">
        <img 
          src={novel.cover} 
          alt={novel.title} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex items-center bg-black/50 text-white rounded-full px-2 py-0.5 text-xs">
          <Eye size={12} className="mr-1" />
          <span>{formatViewCount(novel.viewCount)}</span>
        </div>
        
        {novel.status === 'completed' && (
          <div className="absolute top-2 left-2 novel-chip">
            已完结
          </div>
        )}
      </div>
      <div className="novel-card-info">
        <h3 className="novel-card-title">{novel.title}</h3>
        <p className="novel-card-author">{novel.author}</p>
      </div>
    </Link>
  );
};

export default NovelCard;
