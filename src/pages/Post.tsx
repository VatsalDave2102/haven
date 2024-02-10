import { Models } from "appwrite";
import { PostValues } from "../components/PostForm/PostForm";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useAppSelector } from "../store/hooks";
import timesago from "timesago";

type Post = PostValues & Models.Document;

const Post = () => {
  const [post, setPost] = useState<Post>();
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useAppSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post as Post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = async () => {
    const result = await appwriteService.deletePost(post?.$id as string);
    if (result) {
      await appwriteService.deleteFile(post?.featuredImage as string);
      navigate("/");
    }
  };
  return post ? (
    <div className="py-8">
      <Container>
        <div className="p-3 w-full bg-secondary">
          <p className="pl-1 text-primary font-semibold uppercase text-xs md:text-sm">
            {timesago(post.$createdAt)}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-3 text-pretty">
            {post.title}
          </h1>
          <h4 className="pl-1 font-semibold text-primary uppercase mb-3 text-sm md:text-base">
            - {post.userName}
          </h4>
          <div className="w-11/12 mx-auto h-80 mb-4 relative rounded-sm">
            <img
              src={appwriteService
                .getFilePreview(post.featuredImage)
                .toString()}
              alt={post?.title}
              className="rounded-sm w-full h-80 object-cover"
            />
          </div>
          <div className="w-11/12 mb-6 px-1 mx-auto">
            <article className="browser-css text-pretty text-base md:text-xl">
              {parse(post.content)}
            </article>
          </div>
          {isAuthor && (
            <div className="flex gap-2 justify-center">
              <Link to={`/edit-post/${post.$id}`}>
                <Button
                  bgColor="bg-primary"
                  textColor="text-white"
                  className="hover:bg-primary/90"
                >
                  Edit
                </Button>
              </Link>
              <Button
                textColor="text-white"
                bgColor="bg-red-500"
                className="hover:bg-red-500/90"
                onClick={deletePost}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  ) : null;
};

export default Post;
