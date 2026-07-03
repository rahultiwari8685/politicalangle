import type { Metadata } from "next";
import Layout from "@/components/layout/Layout";
import SingleNewsClient from "./SingleNewsClient";
import setting from "@/setting.json";

type PageProps = {
  searchParams: {
    slug?: string;
  };
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const slug = searchParams.slug;

  if (!slug) {
    return {
      title: "Political Angle",
      description: "Latest News",
    };
  }

  try {
    const res = await fetch(`${setting.api}/api/news/slug/${slug}`, {
      cache: "no-store",
    });

    const result = await res.json();
    const news = result.data;

    if (!news) {
      return {
        title: "News Not Found",
        description: "News not found",
      };
    }

    const image = news.thumbnail
      ? news.thumbnail.startsWith("http")
        ? news.thumbnail
        : `${setting.api}/uploads/images/${news.thumbnail}`
      : "https://politicalangle.in/assets/imgs/template/logo/Political_Logo.png";

    const url = `https://politicalangle.in/news?slug=${slug}`;

    return {
      title: news.title,
      description: news.subtitle,

      openGraph: {
        title: news.title,
        description: news.subtitle,
        url,
        siteName: "Political Angle",
        type: "article",
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: news.title,
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title: news.title,
        description: news.subtitle,
        images: [image],
      },
    };
  } catch (error) {
    return {
      title: "Political Angle",
      description: "Latest News",
    };
  }
}

export default function Page() {
  return <SingleNewsClient />;
}
