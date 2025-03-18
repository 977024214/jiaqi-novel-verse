
import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/lib/data';

const CategoryList: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 animate-fade-in">
      <h2 className="text-lg font-medium mb-4">小说分类</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className="group flex flex-col items-center justify-center p-3 rounded-lg bg-novel-highlight hover:bg-novel-accent/10 transition-colors"
          >
            <span className="text-sm font-medium group-hover:text-novel-accent transition-colors">
              {category.name}
            </span>
            <span className="text-xs text-novel-muted mt-1">
              {category.count} 部作品
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
