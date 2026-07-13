"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Marquee from "@/util/Marquee";
import setting from "../../../setting.json";

export default function Section2() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${setting.api}/api/category/getAllCategory`)
      .then((res) => res.json())
      .then((res) => {
        if (res.status) {
          setCategories(res.data || []);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="sec-2-home-1 bg-100 mask-image py-5">
      <div className="carouselTicker carouselTicker-left position-relative z-1 wow img-custom-anim-top">
        <Marquee
          direction="left"
          speed={50}
          pauseOnHover
          className="carouselTicker__list"
        >
          {categories.map((category) => (
            <div className="carouselTicker__item mx-3" key={category._id}>
              <Link href={`/category/${category.slug}`} className="tag-item">
                <span>{category.name}</span>
                <span className="number">{category.newsCount ?? 0}</span>
              </Link>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
