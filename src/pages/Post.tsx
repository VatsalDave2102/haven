import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "@appwrite/config";
import { Button, Container } from "@components/index";
import parse from "html-react-parser";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import timesago from "timesago";
import { deletePost } from "@store/postSlice";

const Post = () => {
  const posts = useAppSelector((state) => state.post.posts);
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const post = posts?.find((post) => post.$id === slug);

  const userData = useAppSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  const handleDelete = async () => {
    const result = await appwriteService.deletePost(post?.$id as string);
    if (result) {
      dispatch(deletePost(post?.$id as string));
      await appwriteService.deleteFile(post?.featuredImage as string);
      navigate("/");
    }
  };
  return post ? (
    <div className="py-8">
      <Container>
        <div className="p-3 w-full bg-secondary dark:bg-slate-900">
          <p className="pl-1 text-primary dark:text-secondary font-semibold uppercase text-xs md:text-sm">
            {timesago(post.$createdAt)}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-primary dark:text-secondary mb-3 text-pretty">
            {post.title}
          </h1>
          <h4 className="pl-1 font-semibold text-primary dark:text-secondary uppercase mb-3 text-sm md:text-base">
            - {post.userName}
          </h4>
          <div className="w-11/12 mx-auto h-80 mb-4 relative rounded-sm">
            <img
              src={appwriteService
                .getFilePreview(post?.featuredImage as string)
                .toString()}
              loading="lazy"
              alt={post?.title}
              className="rounded-sm w-full h-80 object-cover"
            />
          </div>
          <div className="w-11/12 mb-6 px-1 mx-auto">
            <article className="browser-css text-pretty text-base md:text-xl dark:text-white">
              {parse(post.content)}
            </article>
          </div>
          {isAuthor && (
            <div className="flex gap-2 justify-center">
              <Link to={`/edit-post/${post.$id}`}>
                <Button
                  bgColor="bg-primary"
                  textColor="text-white"
                  className="hover:bg-primary/80 dark:hover:bg-primary/70 duration-300"
                >
                  Edit
                </Button>
              </Link>
              <Button
                textColor="text-white"
                bgColor="bg-red-500"
                className="hover:bg-red-500/80 dark:hover:bg-red-500/70 duration-300"
                onClick={handleDelete}
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
