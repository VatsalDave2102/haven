import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import timesago from "timesago";

interface Props {
  $id: string;
  title: string;
  featuredImage: string;
  createdAt: string;
  author: string;
}

const PostCard: React.FC<Props> = ({
  $id,
  title,
  featuredImage,
  createdAt,
  author,
}) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="card relative w-full h-64 rounded-sm bg-secondary">
        <div className="w-full">
          <img
            src={appwriteService.getFilePreview(featuredImage).toString()}
            alt={title}
            loading="lazy"
            className="rounded-t-sm object-cover w-full h-40"
          />
        </div>
        <div className="card_body mt-2 mx-2">
          <h3 className="card_title font-bold capitalize text-2xl text-primary truncate">
            {title}
          </h3>
          <p className="author text-primary">By {author}</p>
          <p className="text-primary text-xs text-opacity-80">
            {timesago(createdAt)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
