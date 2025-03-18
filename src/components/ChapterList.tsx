
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { List, ChevronDown, ChevronUp, Clock, BookOpen } from 'lucide-react';
import { Chapter } from '@/lib/data';

interface ChapterListProps {
  novelId: string;
  chapters: Chapter[];
}

const ChapterList: React.FC<ChapterListProps> = ({ novelId, chapters }) => {
  const [expanded, setExpanded] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);
  
  const toggleExpanded = () => setExpanded(!expanded);
  const toggleSort = () => setSortAsc(!sortAsc);
  
  // Format date to human readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Sort chapters by number
  const sortedChapters = [...chapters].sort((a, b) => {
    return sortAsc ? a.number - b.number : b.number - a.number;
  });
  
  // Limit displayed chapters unless expanded
  const displayedChapters = expanded ? sortedChapters : sortedChapters.slice(0, 10);

  return (
    <div className="bg-white rounded-xl shadow-sm animate-fade-in">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <List size={18} className="text-novel-accent" />
          <h3 className="font-medium">章节列表</h3>
          <span className="text-xs text-novel-muted">({chapters.length})</span>
        </div>
        
        <div className="flex items-center">
          <button 
            onClick={toggleSort} 
            className="flex items-center space-x-1 text-xs text-novel-muted hover:text-novel-accent mr-4"
          >
            <Clock size={14} />
            <span>{sortAsc ? '正序' : '倒序'}</span>
            {sortAsc ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>
      
      <div className="divide-y divide-gray-50">
        {displayedChapters.map((chapter) => (
          <Link
            key={chapter.id}
            to={`/novel/${novelId}/chapter/${chapter.id}`}
            className="flex items-center justify-between p-4 hover:bg-novel-highlight transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <BookOpen size={16} className="text-novel-muted group-hover:text-novel-accent transition-colors" />
              <div>
                <h4 className="text-sm group-hover:text-novel-accent transition-colors">
                  {chapter.title}
                </h4>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-novel-muted">
                    {formatDate(chapter.createdAt)}
                  </span>
                  <span className="mx-2 text-gray-300">·</span>
                  <span className="text-xs text-novel-muted">
                    {chapter.wordCount} 字
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {chapters.length > 10 && (
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={toggleExpanded}
            className="w-full flex items-center justify-center space-x-1 text-sm text-novel-muted hover:text-novel-accent"
          >
            <span>{expanded ? '收起章节' : '查看更多章节'}</span>
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      )}
    </div>
  );
};

export default ChapterList;
