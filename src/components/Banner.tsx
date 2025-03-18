import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Novel } from "@/lib/types";
import { cn } from "@/lib/utils";

interface BannerProps {
  novels: Novel[];
}

export function Banner({ novels }: BannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 自动轮播
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % novels.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [novels.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + novels.length) % novels.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % novels.length);
  };

  return (
    <div className="relative h-[400px] bg-black/5">
      <div className="container mx-auto relative h-full">
        {/* 轮播图片 */}
        <div className="absolute inset-0 overflow-hidden">
          {novels.map((novel, index) => (
            <div
              key={novel.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-500",
                index === currentIndex ? "opacity-100" : "opacity-0"
              )}
            >
              <img
                src={novel.cover}
                alt={novel.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
              
              {/* 小说信息 */}
              <div className="absolute bottom-16 left-8 text-white">
                <h2 className="text-4xl font-bold mb-4">{novel.title}</h2>
                <p className="text-lg mb-4 max-w-xl line-clamp-2">
                  {novel.description}
                </p>
                <Link
                  to={`/novel/${novel.id}`}
                  className="inline-block px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                >
                  立即阅读
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 导航按钮 */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* 指示器 */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {novels.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                index === currentIndex
                  ? "bg-primary"
                  : "bg-white/50 hover:bg-white/75"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
