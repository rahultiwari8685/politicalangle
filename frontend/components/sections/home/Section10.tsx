"use client";

import { useEffect, useState } from "react";
import SectionTitle from "@/components/elements/TitleDark";
import ArticleCard11 from "@/components/cards/ArticleCard11";
import ArticleCard6 from "@/components/cards/ArticleCard6";
import setting from "@/setting.json";

export default function Section10() {
  const [featuredNews, setFeaturedNews] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const getYoutubeId = (url: string) => {
    const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = url?.match(regExp);
    return match ? match[1] : "";
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          `${setting.api}/api/news/getAllTextNews?limit=6`,
        );

        const json = await res.json();

        if (json.status !== false) {
          const data = json.data || [];

          const formatted = data.map((item: any, index: number) => {
            const videoId = getYoutubeId(item.youtubeUrl);

            return {
              slug: item.slug,

              linkPost: `/news?slug=${item.slug}`,
              linkBadge: "#",
              linkAuthor: `/page-author/${item.author?._id}`,
              linkComment: "#",

              img: item.thumbnail
                ? item.thumbnail.startsWith("http")
                  ? item.thumbnail
                  : `${setting.api}/uploads/images/${item.thumbnail}`
                : "/assets/imgs/page/img-66.png",

              hasVideo: !!videoId,
              videoUrl: videoId
                ? `https://www.youtube.com/embed/${videoId}`
                : "",

              badge: item.categories?.[0]?.name || "News",
              bgBadge: "bg-2",

              title: item.title,
              description: item.subtitle,

              imgAuthor: "/assets/imgs/template/author/author-1.png",
              author: item.author?.name || "Admin",

              date: new Date(item.createdAt).toDateString(),
              readTime: "5 Min Read",
              comment: "0",
              readNum: "0",

              classList: "col-12",
              cardClass: "",
              cardTitle: "",
              textColor: "",
            };
          });

          setFeaturedNews(formatted.slice(0, 1));
          setLatestNews(formatted.slice(2, 6));
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return null;

  return (
    <section className="sec-10-home-1 sec-padding">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <SectionTitle
              title="Trending News"
              description="Top stories everyone is talking about."
            />
          </div>
        </div>

        <div className="row mt-2 g-4">
          {featuredNews.map((card: any, idx) => (
            <div className="col-lg-6" key={idx}>
              <ArticleCard11 card={card} idx={idx} />
            </div>
          ))}

          <div className="col-lg-6">
            <div className="row g-3">
              {latestNews.map((card: any, idx) => (
                <ArticleCard6 key={idx} card={card} idx={idx} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
