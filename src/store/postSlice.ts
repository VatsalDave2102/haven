import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Models } from "appwrite";

export interface PostValues {
  title: string;
  slug: string;
  content: string;
  imageFile: FileList;
  featuredImage: string;
  status: string;
  userId: string;
  userName: string;
}
export type Post = PostValues & Models.Document;

interface InitialState {
  status: boolean;
  posts: Post[] | null;
}
const initialState: InitialState = {
  status: false,
  posts: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.status = true;
      state.posts = action.payload;
    },
    removePosts: (state) => {
      state.status = false;
      state.posts = null;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts?.push(action.payload);
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      if (state.posts) {
        const postIndex = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );

        state.posts[postIndex] = action.payload;
      }
    },
    deletePost: (state, action: PayloadAction<string>) => {
      if (state.posts) {
        state.posts = state.posts?.filter(
          (post) => post.$id !== action.payload
        );
      }
    },
  },
});

export const { setPosts, removePosts, updatePost, addPost, deletePost } =
  postSlice.actions;
export default postSlice.reducer;
