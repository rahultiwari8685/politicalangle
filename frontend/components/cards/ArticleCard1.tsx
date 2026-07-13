import Link from "next/link";
import Image from "next/image";

type CardProps = {
  card: {
    img: string;
    linkBadge: string;
    linkPost: string;
    linkComment: string;
    linkRead: string;
    badge: string;
    bgBadge: string;
    date: string;
    readTime: string;
    readNum: string;
    title: string;
    description: string;
    comment: string;
  };
  idx: number;
};

export default function ArticleCard1({ card, idx }: CardProps) {
  return (
    <>
      <div className="article card-1" key={idx}>
        <Link
          href={card.linkPost}
          className="card-img-top d-block overflow-hidden"
          style={{
            height: "250px",
            position: "relative",
          }}
        >
          <Image
            src={card.img}
            alt={card.title}
            fill
            className="object-fit-cover"
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            priority
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
          />
        </Link>
        <div className="card-body">
          <div className="card-corner">
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
            <div className="curve-one"></div>
            <div className="curve-two"></div>
          </div>
          <div>
            <div className="card-info gap-2 d-flex flex-wrap align-items-center mb-3">
              <Link
                href={card.linkBadge}
                className={`badge ${card.bgBadge} fs-8`}
              >
                {card.badge}
              </Link>
              <ul className="d-flex align-items-center gap-4 text-600 m-0 ps-4">
                <li>
                  <p className="fs-8 fw-medium m-0">{card.date}</p>
                </li>
                <li>
                  <p className="fs-8 fw-medium m-0">{card.readTime}</p>
                </li>
              </ul>
            </div>
            <Link href={card.linkPost}>
              <h4
                className="card-title mb-0"
                style={{
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  width: "100%",
                }}
              >
                {card.title}
              </h4>
            </Link>
            <p
              className="card-text text-600 fs-7 mb-0"
              style={{
                whiteSpace: "normal",
                wordBreak: "break-word",
                width: "100%",
              }}
            >
              {card.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
