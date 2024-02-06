import { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import { Models } from "appwrite";
import { PostValues } from "../components/PostForm/PostForm";

type Post = PostValues & Models.Document;

const EditPost = () => {
  const [post, setPost] = useState<Post>();
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post as Post);
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return (
    <div className="py-8">
      <Container>
        <PostForm post={post as Post} />
      </Container>
    </div>
  );
};

export default EditPost;
