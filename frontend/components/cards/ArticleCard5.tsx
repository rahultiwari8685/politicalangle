import Link from "next/link";
import Image from "next/image";

type CardProps = {
  card: {
    cornerBgColor: string;
    img: string;
    linkBadge: string;
    linkPost: string;
    badge: string;
    bgBadge: string;
    title: string;
  };
  idx: number;
};

export default function ArticleCard5({ card, idx }: CardProps) {
  return (
    <>
      <div className="article card-5">
        <div className="post-link">
          <div
            className="position-relative card-img-top thumbnail overflow-hidden"
            style={{
              width: "100%",
              height: "230px",
              borderRadius: "16px",
            }}
          >
            <Link href={card.linkPost}>
              <Image
                src={card.img}
                alt={card.title}
                fill
                quality={85}
                sizes="(max-width:768px) 100vw, 25vw"
                style={{
                  objectFit: "cover",
                  borderRadius: "16px",
                }}
              />
            </Link>

            <Link
              href={card.linkBadge}
              className={`badge ${card.bgBadge} fs-8`}
            >
              {card.badge}
            </Link>
          </div>
          <div className={`card-corner ${card.cornerBgColor} no-border`}>
            <Link href={card.linkPost} className="arrow-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M13.75 6.75L19.25 12L13.75 17.25"
                  stroke="#0E0E0F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 12H4.75"
                  stroke="#0E0E0F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <div className="curve-one" />
            <div className="curve-two" />
          </div>
        </div>
        <div className="card-body mt-4">
          <Link href={card.linkPost}>
            <h6 className="card-title mb-0">{card.title}</h6>
          </Link>
        </div>
      </div>
    </>
  );
}
