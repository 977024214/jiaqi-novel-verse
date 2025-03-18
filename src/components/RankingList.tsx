import { Link } from "react-router-dom";
import { Novel } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

interface RankingListProps {
  title: string;
  novels: Novel[];
  type: "recommend" | "new" | "monthly";
}

export function RankingList({ title, novels, type }: RankingListProps) {
  return (
    <div className="bg-card rounded-lg p-4 mb-6 shadow-sm">
      <h3 className="text-lg font-bold text-primary mb-4">{title}</h3>
      <div className="space-y-4">
        {novels.map((novel, index) => (
          <Link
            key={novel.id}
            to={`/novel/${novel.id}`}
            className="flex items-start space-x-3 group"
          >
            {/* 排名 */}
            <div
              className={`flex-shrink-0 w-6 h-6 rounded flex items-center justify-center text-sm font-bold ${
                index < 3
                  ? "bg-primary text-white"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {index + 1}
            </div>

            {/* 小说信息 */}
            <div className="flex-grow min-w-0">
              <h4 className="text-foreground font-medium truncate group-hover:text-primary">
                {novel.title}
              </h4>
              <div className="text-sm text-muted-foreground">
                {type === "recommend" && (
                  <span>{formatNumber(novel.views)}人气</span>
                )}
                {type === "new" && (
                  <span>{formatNumber(novel.wordCount)}字</span>
                )}
                {type === "monthly" && (
                  <span>{formatNumber(novel.monthlyTickets)}月票</span>
                )}
              </div>
            </div>

            {/* 封面（仅显示前三名） */}
            {index < 3 && (
              <div className="flex-shrink-0 w-16 h-20 overflow-hidden rounded">
                <img
                  src={novel.cover}
                  alt={novel.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
