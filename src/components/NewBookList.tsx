import { Link } from "react-router-dom";
import { Novel } from "@/lib/types";
import { formatNumber, formatDate } from "@/lib/utils";

interface NewBookListProps {
  novels: Novel[];
}

export function NewBookList({ novels }: NewBookListProps) {
  return (
    <div className="bg-card rounded-lg shadow-sm">
      <div className="divide-y divide-border">
        {novels.map((novel) => (
          <div key={novel.id} className="p-4 flex items-start space-x-4 group">
            {/* 封面 */}
            <Link
              to={`/novel/${novel.id}`}
              className="flex-shrink-0 w-20 h-24 overflow-hidden rounded"
            >
              <img
                src={novel.cover}
                alt={novel.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </Link>

            {/* 信息 */}
            <div className="flex-grow min-w-0">
              <Link
                to={`/novel/${novel.id}`}
                className="block text-lg font-medium text-foreground hover:text-primary truncate mb-1"
              >
                {novel.title}
              </Link>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {novel.description}
              </p>
              <div className="flex items-center text-sm text-muted-foreground space-x-4">
                <span>{novel.author}</span>
                <span>{novel.category}</span>
                <span>{formatNumber(novel.wordCount)}字</span>
                <span>更新于 {formatDate(novel.updatedAt)}</span>
              </div>
            </div>

            {/* 状态标签 */}
            <div className="flex-shrink-0">
              <span className="inline-block px-2 py-1 text-xs rounded bg-accent text-accent-foreground">
                {novel.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
