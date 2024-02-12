import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import timesago from "timesago";

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
  const cardClasses =
    view === "card" ? "h-60" : "h-80 md:h-44 md:flex md:items-center md:gap-3";
  const imgClasses = view === "card" ? "w-full h-40" : "h-60 md:h-44";
  const cardBodyClasses =
    view === "card" ? "mt-2 mx-2" : "mt-2 mx-2 md:m-0 md:w-2/3 md:pe-2";
  const cardTitleClasses =
    view === "card"
      ? "text-2xl  truncate"
      : "truncate text-2xl md:text-wrap md:text-3xl md:pb-1";
  return (
    <Link to={`/post/${$id}`}>
      <div
        className={`card w-full rounded-sm bg-secondary transition-all ${cardClasses}`}
      >
        <div className={view === "card" ? "w-full" : "md:w-1/3 w-full"}>
          <img
            src={appwriteService.getFilePreview(featuredImage).toString()}
            alt={title}
            loading="lazy"
            className={`rounded-t-sm object-cover w-full ${imgClasses}`}
          />
        </div>
        <div className={`card_body flex flex-col gap-2 ${cardBodyClasses}`}>
          <h3
            className={`card_title font-bold capitalize text-primary ${cardTitleClasses}`}
          >
            {title}
          </h3>
          <div className="card_detail flex justify-between items-center">
            <p className="author text-primary">By {author}</p>
            <p className="text-primary text-xs text-opacity-80">
              {timesago(createdAt)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
