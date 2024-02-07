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
    let ignore = false;

    async function fetchPost() {
      if (slug) {
        const post = await appwriteService.getPost(slug);

        if (post && !ignore) {
          setPost(post as Post);
        }
      } else {
        navigate("/");
      }
    }
    fetchPost();

    return () => {
      ignore = true;
    };
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post as Post} />
      </Container>
    </div>
  ) : null;
};

export default EditPost;
