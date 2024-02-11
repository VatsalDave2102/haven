import { Container, PostForm } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { Post } from "../store/postSlice";
import { useAppSelector } from "../store/hooks";

const EditPost = () => {
  const posts = useAppSelector((state) => state.post.posts);
  const { slug } = useParams();
  const navigate = useNavigate();

  const post = posts?.find((post) => post.$id === slug);
  const userData = useAppSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  if (!isAuthor) {
    navigate("/");
  }
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post as Post} />
      </Container>
    </div>
  ) : null;
};

export default EditPost;
