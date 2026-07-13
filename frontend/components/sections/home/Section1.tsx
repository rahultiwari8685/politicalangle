"use client";

import { useEffect, useState } from "react";
import setting from "../../../setting.json";

import ArticleCard1 from "@/components/cards/ArticleCard1";
import SwiperDynamic from "@/components/shared/SwiperDynamic";

export default function Section1() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`${setting.api}/api/news/getAllTextNews?limit=10`)
      .then((res) => res.json())
      .then((u) => {
        if (u.status !== false) {
          const formattedData = (u.data || []).map((item: any) => ({
            img: item.thumbnail
              ? item.thumbnail.startsWith("http")
                ? item.thumbnail
                : `${setting.api}/uploads/images/${item.thumbnail}`
              : "/assets/imgs/page/img-66.png",

            linkBadge: "#",
            linkPost: `/news?slug=${item.slug}`,
            linkComment: "#",
            linkRead: "#",

            badge: item.categories?.[0]?.name || "News",
            bgBadge: "bg-2",

            date: new Date(item.createdAt).toDateString(),

            readTime: "5 Min Read",
            readNum: "0",

            title: item.title,
            description: item.subtitle,

            comment: "0",
          }));

          setBlogs(formattedData);
        } else {
          setBlogs([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setBlogs([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return (
    <section
      className="sec-1-home-1"
      data-background="/assets/imgs/page/bg-home1-sec1.png"
    >
      {/* <div className="container d-none d-md-block">
        <div className="row mb-1">
          <div className="col-12">
            <div className="text-center">
              <h1 className="ds-2 lh-0 mb-0 text-anime-style-2">
                Your Gateway to Global News
              </h1>
            </div>
          </div>
        </div>
      </div> */}

      <div className="container-fluid">
        <SwiperDynamic
          className="swiper swiper-card-hero py-2"
          autoplay={{ delay: 5000 }}
          loop
          spaceBetween={30}
          centeredSlides
          breakpoints={{
            1200: { slidesPerView: 3 },
            992: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            576: { slidesPerView: 1 },
            0: { slidesPerView: 1 },
          }}
        >
          {blogs.map((card, idx) => (
            <div key={idx}>
              <ArticleCard1 card={card} idx={idx} />
            </div>
          ))}
        </SwiperDynamic>
      </div>
    </section>
  );
}
