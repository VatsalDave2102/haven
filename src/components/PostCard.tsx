import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import timesago from "timesago";

const CardContainer = ({
  children,
  view,
}: {
  children: React.ReactNode;
  view: string;
}) => {
  const cardClasses =
    view === "card"
      ? "h-60"
      : "h-60 sm:h-80 md:h-44 md:flex md:items-center md:gap-3";
  return (
    <div
      className={`card w-full rounded-sm bg-secondary dark:bg-slate-900 transition-all ${cardClasses}`}
    >
      {children}
    </div>
  );
};

const CardImage = ({
  featuredImage,
  view,
  alt,
}: {
  featuredImage: string;
  view: string;
  alt: string;
}) => {
  const imgClasses = view === "card" ? "w-full h-40" : "h-40 sm:h-60 md:h-44";
  return (
    <img
      src={appwriteService.getFilePreview(featuredImage).toString()}
      alt={alt}
      loading="lazy"
      className={`rounded-t-sm object-cover w-full ${imgClasses}`}
    />
  );
};

const CardBody = ({
  children,
  view,
}: {
  children: React.ReactNode;
  view: string;
}) => {
  const cardBodyClasses =
    view === "card" ? "mt-2 mx-2" : "mt-2 mx-2 md:m-0 md:w-2/3 md:pe-2";
  return (
    <div className={`card_body flex flex-col gap-2 ${cardBodyClasses}`}>
      {children}
    </div>
  );
};

interface Props {
  $id: string;
  title: string;
  featuredImage: string;
  createdAt: string;
  author: string;
  view: "card" | "list";
}

const PostCard: React.FC<Props> = ({
  $id,
  title,
  featuredImage,
  createdAt,
  author,
  view,
}) => {
  const cardTitleClasses =
    view === "card"
      ? "text-2xl  truncate"
      : "truncate text-2xl md:text-wrap md:text-3xl md:pb-1";
  return (
    <Link to={`/post/${$id}`}>
      <CardContainer view={view}>
        <div className={view === "card" ? "w-full" : "md:w-1/3 w-full"}>
          <CardImage featuredImage={featuredImage} view={view} alt={title} />
        </div>
        <CardBody view={view}>
          <h3
            className={`card_title font-bold capitalize text-primary dark:text-secondary ${cardTitleClasses}`}
          >
            {title}
          </h3>
          <div className="card_detail flex justify-between items-center">
            <p className="author text-primary dark:text-secondary">
              By {author}
            </p>
            <p className="text-primary dark:text-secondary text-xs text-opacity-80">
              {timesago(createdAt)}
            </p>
          </div>
        </CardBody>
      </CardContainer>
    </Link>
  );
};

export default PostCard;
