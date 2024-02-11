import { Container, PostCard } from "../components";
import { useAppSelector } from "../store/hooks";

const Home = () => {
  const posts = useAppSelector((state) => state.post.posts);

  if (!posts) {
    return (
      <div>
        <Container>
          <div className="flex flex-wrap h-screen">
            <div className="p-2 full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="p-2 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
            >
              <PostCard
                title={post.title}
                $id={post.$id}
                featuredImage={post.featuredImage}
                createdAt={post.$createdAt}
                author={post.userName}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;
