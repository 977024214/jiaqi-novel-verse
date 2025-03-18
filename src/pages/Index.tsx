import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { NovelCard } from "@/components/NovelCard";
import { CategoryList } from "@/components/CategoryList";
import { Footer } from "@/components/Footer";
import { Banner } from "@/components/Banner";
import { RankingList } from "@/components/RankingList";
import { NewBookList } from "@/components/NewBookList";
import {
  getFeaturedNovels,
  getRecentNovels,
  getPopularNovels,
  getNewNovels,
  getRankingNovels,
} from "@/lib/data";

export default function Index() {
  const featuredNovels = getFeaturedNovels();
  const recentNovels = getRecentNovels(6);
  const popularNovels = getPopularNovels(8);
  const newNovels = getNewNovels(6);
  const rankingNovels = getRankingNovels();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Banner区域 */}
      <Banner novels={featuredNovels.slice(0, 5)} />

      <main className="container mx-auto px-4 py-8">
        {/* 分类导航 */}
        <div className="mb-8">
          <CategoryList />
        </div>

        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 左侧内容区 */}
          <div className="lg:col-span-3">
            {/* 编辑推荐 */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-primary">编辑推荐</h2>
                <Link to="/browse" className="text-primary hover:text-primary/80">
                  查看更多 &gt;
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {popularNovels.slice(0, 4).map((novel) => (
                  <NovelCard key={novel.id} novel={novel} />
                ))}
              </div>
            </section>

            {/* 新书速递 */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-primary">新书速递</h2>
                <Link to="/new" className="text-primary hover:text-primary/80">
                  查看更多 &gt;
                </Link>
              </div>
              <NewBookList novels={newNovels} />
            </section>

            {/* 最近更新 */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-primary">最近更新</h2>
                <Link to="/recent" className="text-primary hover:text-primary/80">
                  查看更多 &gt;
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentNovels.map((novel) => (
                  <NovelCard key={novel.id} novel={novel} />
                ))}
              </div>
            </section>
          </div>

          {/* 右侧榜单区域 */}
          <div className="lg:col-span-1">
            <RankingList
              title="推荐榜"
              novels={rankingNovels.slice(0, 10)}
              type="recommend"
            />
            <RankingList
              title="新书榜"
              novels={rankingNovels.slice(0, 10)}
              type="new"
            />
            <RankingList
              title="月票榜"
              novels={rankingNovels.slice(0, 10)}
              type="monthly"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
