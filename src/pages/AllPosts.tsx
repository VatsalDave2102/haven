import { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import Loader from "../components/Loader";
import { useAppSelector } from "../store/hooks";

const AllPosts = () => {
  const posts = useAppSelector((state) => state.post.posts);
  const [view, setView] = useState<"card" | "list">("card");

  const changeView = () => {
    if (view === "card") {
      setView("list");
      localStorage.setItem("viewMode", "list");
    } else if (view === "list") {
      setView("card");
      localStorage.setItem("viewMode", "card");
    }
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("viewMode");
    if (savedMode) {
      setView(savedMode as "card" | "list");
    }
  }, []);

  if (!posts) {
    return (
      <div className="h-screen">
        <Loader />
      </div>
    );
  } else {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="p-2 flex items-center gap-2">
            <span
              className={`material-symbols-outlined  text-primary dark:text-pink-400 ${
                view === "card"
                  ? "text-primary dark:text-pink-400"
                  : "text-primary/50 dark:text-pink-400/50"
              } `}
            >
              grid_view
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={view === "list"}
                className="sr-only peer"
                onChange={changeView}
              />
              <div
                className="w-11 h-6 bg-primary dark:bg-slate-900 rounded-sm peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pink-400 dark:peer-focus:ring-pink-400 peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white dark:after:bg-pink-400 after:border-gray-300 after:border after:rounded-sm after:h-5 after:w-5 after:transition-all dark:peer-checked:after:bg-pink-400
             peer-checked:bg-primary dark:peer-checked:bg-slate-900"
              ></div>
            </label>
            <span
              className={`material-symbols-outlined  text-primary dark:text-pink-400 ${
                view === "list"
                  ? "text-primary dark:text-pink-400"
                  : "text-primary/50 dark:text-pink-400/50"
              } `}
            >
              list
            </span>
          </div>
          <div className="flex flex-wrap">
            {posts.map((post) => {
              return (
                <div
                  key={post.$id}
                  className={
                    view === "card"
                      ? "p-2 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
                      : "p-2 w-full"
                  }
                >
                  <PostCard
                    title={post.title}
                    $id={post.$id}
                    featuredImage={post.featuredImage}
                    createdAt={post.$createdAt}
                    author={post.userName}
                    view={view}
                  />
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    );
  }
};

export default AllPosts;
