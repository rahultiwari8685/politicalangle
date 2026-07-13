import type { Metadata } from "next";
import SingleNewsClient from "./SingleNewsClient";
import setting from "@/setting.json";

type PageProps = {
  searchParams: Promise<{
    slug?: string;
  }>;
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { slug } = await searchParams;

  if (!slug) {
    return {
      metadataBase: new URL(setting.site),
      title: "Political Angle",
      description: "Latest News",
    };
  }

  try {
    const response = await fetch(`${setting.api}/api/news/slug/${slug}`, {
      cache: "no-store",
    });

    const result = await response.json();

    if (!result.status || !result.data) {
      return {
        metadataBase: new URL(setting.site),
        title: "News Not Found",
        description: "News not found",
      };
    }

    const news = result.data;

    const image =
      news.thumbnail && news.thumbnail !== ""
        ? news.thumbnail.startsWith("http")
          ? news.thumbnail
          : `${setting.api}/uploads/images/${news.thumbnail}`
        : `${setting.site}/assets/imgs/template/logo/Political_Logo.png`;

    const url = `${setting.site}/news?slug=${slug}`;

    return {
      metadataBase: new URL(setting.site),

      title: news.title,
      description: news.subtitle,

      alternates: {
        canonical: url,
      },

      openGraph: {
        title: news.title,
        description: news.subtitle,
        url,
        siteName: "Political Angle",
        locale: "en_US",
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

      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    return {
      metadataBase: new URL(setting.site),
      title: "Political Angle",
      description: "Latest News",
    };
  }
}

export default function Page() {
  return <SingleNewsClient />;
}
