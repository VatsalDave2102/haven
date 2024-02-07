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
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={String(appwriteService.getFilePreview(featuredImage))}
            alt={title}
          />
        </div>
        <h2>{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
