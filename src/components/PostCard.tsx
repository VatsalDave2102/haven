import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

interface Props {
  $id: string;
  title: string;
  featuredImage: string;
}

const PostCard: React.FC<Props> = ({ $id, title, featuredImage }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="card relative w-full h-60 rounded-sm bg-secondary">
        <div className="w-full">
          <img
            src={String(appwriteService.getFilePreview(featuredImage))}
            alt={title}
            className="rounded-t-sm object-cover w-full h-40"
          />
        </div>
        <div className="card_body">
          <h3 className="card_title mt-2 ml-2 font-bold capitalize text-2xl text-primary">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
