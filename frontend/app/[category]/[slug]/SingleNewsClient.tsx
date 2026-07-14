"use client";

import { useEffect, useState } from "react";

import Layout from "@/components/layout/Layout";
import Section1 from "@/components/sections/single-2/Section1";
import Ads_sm from "@/components/elements/ads_sm";
import ArticleCard5 from "@/components/cards/ArticleCard5";

import setting from "@/setting.json";

type RelatedArticleType = {
  cornerBgColor: string;
  img: string;
  linkBadge: string;
  linkPost: string;
  badge: string;
  bgBadge: string;
  title: string;
};

type Props = {
  slug: string;
  category: string;
};

export default function Single_2({ slug, category }: Props) {
  const [relatedArticles, setRelatedArticles] = useState<RelatedArticleType[]>(
    [],
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(`${setting.api}/api/news/getAllTextNews?limit=4`)
      .then((res) => res.json())
      .then((u) => {
        if (u.status !== false) {
          const textNews = u.data;
          const formattedData = textNews
            .slice(0, 8)
            .map((item: any, idx: number) => ({
              linkPost: `/${item.categories?.[0]?.slug || item.categories?.[0]?._id}/${item.slug}`,
              linkBadge: "#",
              linkAuthor: `/page-author/${item.author?._id}`,
              linkComment: "#",

              img: item.thumbnail
                ? item.thumbnail.startsWith("http")
                  ? item.thumbnail
                  : `${setting.api}/uploads/images/${item.thumbnail}`
                : "/assets/imgs/page/img-66.png",

              badge: item.categories?.[0]?.name || "News",
              bgBadge: `bg-${(idx % 5) + 1}`,
              title: item.title || "No Title",
              description: item.subtitle || "No Description",
              imgAuthor: "/assets/imgs/template/author/author-1.png",
              author: item.author?.name || "Admin",
              date: new Date(item.createdAt).toDateString(),

              comment: "0",
              readNum: "0",
            }));

          setBlogs(formattedData);
        } else {
          setBlogs([]);
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
        setBlogs([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Layout headerStyle={2} footerStyle={2}>
        <Section1 slug={slug} category={category} />

        <section className="related-post sec-padding bg-white">
          <div className="container">
            <div className="row g-4">
              <div className="col-12">
                <h5 className="mb-0">Related Articles</h5>
              </div>

              {relatedArticles.map((card, idx) => (
                <div className="col-6 col-md-4 col-lg-3" key={idx}>
                  <ArticleCard5 card={card} idx={idx} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="row">
          <div className="col-lg-8 col-12 mx-lg-auto">
            <Ads_sm />
          </div>
        </div>
      </Layout>
    </>
  );
}
