import { useEffect, useState } from "react";
import "./App.css";
import authService from "./appwrite/auth";
// import appwriteService from "./appwrite/config";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { useAppDispatch } from "./store/hooks";
import { Outlet } from "react-router-dom";
// import { Post, setPosts } from "./store/postSlice";
import Loader from "./components/Loader";
import appwriteService from "./appwrite/config";
import { Post, setPosts } from "./store/postSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchUser();
  }, [dispatch]);

  useEffect(() => {
    let ignore = false;
    async function fetchPosts() {
      const posts = await appwriteService.getPosts([]);
      if (posts && !ignore) {
        dispatch(setPosts(posts.documents as Post[]));
      }
    }
    fetchPosts();
    return () => {
      ignore = true;
    };
  }, [dispatch]);

  if (loading)
    return (
      <div className="h-screen w-full">
        <Loader />
      </div>
    );

  return (
    <div className="h-screen flex flex-wrap content-between bg-white overflow-x-auto">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
