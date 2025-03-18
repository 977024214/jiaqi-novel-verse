import { Link } from "react-router-dom";
import { Novel } from "@/lib/types";
import { formatNumber, getStatusColor } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Eye, ThumbsUp, BookOpen } from "lucide-react";

interface NovelCardProps {
  novel: Novel;
  showStats?: boolean;
}

export function NovelCard({ novel, showStats = true }: NovelCardProps) {
  return (
    <div className="group bg-card rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* 封面图 */}
      <Link to={`/novel/${novel.id}`} className="block relative pt-[125%]">
        <img
          src={novel.cover}
          alt={novel.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* 状态标签 */}
        <span
          className={`absolute top-2 right-2 px-2 py-1 text-xs rounded ${getStatusColor(
            novel.status
          )} bg-black/60`}
        >
          {novel.status}
        </span>
      </Link>

      {/* 信息区域 */}
      <div className="p-3">
        <Link
          to={`/novel/${novel.id}`}
          className="block font-medium text-foreground hover:text-primary truncate mb-1"
        >
          {novel.title}
        </Link>
        <div className="text-sm text-muted-foreground mb-2">
          <span>{novel.author}</span>
          <span className="mx-2">·</span>
          <span>{novel.category}</span>
        </div>

        {/* 标签 */}
        <div className="flex flex-wrap gap-1 mb-2">
          {novel.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* 统计信息 */}
        {showStats && (
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              <span>{formatNumber(novel.views)}</span>
            </div>
            <div className="flex items-center">
              <ThumbsUp className="w-3 h-3 mr-1" />
              <span>{formatNumber(novel.recommendTickets)}</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="w-3 h-3 mr-1" />
              <span>{formatNumber(novel.wordCount)}字</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
