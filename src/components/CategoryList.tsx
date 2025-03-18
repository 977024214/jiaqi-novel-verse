
import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/lib/data';

const CategoryList: React.FC = () => {
  return (
    <div className="qd-card p-5 animate-fade-in">
      <h2 className="qd-title mb-4">小说分类</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className="group flex flex-col items-center justify-center p-3 rounded-sm bg-[var(--qd-bg)] hover:bg-[var(--qd-primary-light)] transition-colors"
          >
            <span className="text-sm font-medium group-hover:text-[var(--qd-primary)] transition-colors">
              {category.name}
            </span>
            <span className="text-xs text-[var(--qd-text-light)] mt-1">
              {category.count} 部作品
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
