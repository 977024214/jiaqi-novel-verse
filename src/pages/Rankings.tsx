
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Novel, getPopularNovels, novels } from '@/lib/data';
import { ArrowUp, Trophy, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Rankings = () => {
  const { toast } = useToast();
  const [weeklyRankings, setWeeklyRankings] = useState<Novel[]>([]);

  useEffect(() => {
    // For now, we'll just use popular novels as a placeholder
    // In a real app, this would be based on recommendation tickets
    setWeeklyRankings(getPopularNovels(10));
  }, []);

  const handleRecommend = (novelId: string) => {
    // In a real app, this would interact with a backend
    toast({
      title: "推荐成功",
      description: "感谢您的推荐票！",
    });
  };

  return (
    <div className="min-h-screen bg-novel-bg page-transition">
      <Navbar />
      
      <main className="pt-16">
        <section className="py-8">
          <div className="novel-container">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Trophy className="text-novel-accent" size={24} />
                <h2 className="text-xl font-medium">本周强推榜</h2>
              </div>
              
              <div className="space-y-4">
                {weeklyRankings.map((novel, index) => (
                  <div
                    key={novel.id}
                    className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-shrink-0 w-8">
                      <span className={`text-lg font-bold ${
                        index < 3 ? 'text-novel-accent' : 'text-gray-400'
                      }`}>
                        {index + 1}
                      </span>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <img
                        src={novel.cover}
                        alt={novel.title}
                        className="w-16 h-24 object-cover rounded"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <Link 
                        to={`/novel/${novel.id}`}
                        className="font-medium hover:text-novel-accent transition-colors"
                      >
                        {novel.title}
                      </Link>
                      <p className="text-sm text-novel-muted mt-1">{novel.author}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Clock size={14} className="text-novel-muted" />
                        <span className="text-xs text-novel-muted">
                          最近更新: {new Date(novel.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <Button
                        onClick={() => handleRecommend(novel.id)}
                        className="flex items-center space-x-1"
                      >
                        <ArrowUp size={16} />
                        <span>推荐</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Rankings;
