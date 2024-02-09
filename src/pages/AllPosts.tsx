import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { Models } from "appwrite";

const AllPosts = () => {
  const [posts, setPosts] = useState<Models.Document[]>([]);

  useEffect(() => {
    let ignore = false;
    async function fetchPosts() {
      const posts = await appwriteService.getPosts([]);
      if (posts && !ignore) {
        setPosts(posts.documents);
      }
    }
    fetchPosts();
    return () => {
      ignore = true;
    };
  }, []);

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

export default AllPosts;
