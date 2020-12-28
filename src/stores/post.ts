import { atom, selector } from "recoil";
import { fetchComments, fetchPosts } from "../services";
import { IComment, IPost } from "../types";

export const postListState = atom<IPost[]>({
  key: "postListState",
  default: fetchPosts(),
});

export const currentPostIdState = atom<number | undefined>({
  key: "currentPostIdState",
  default: undefined,
});

export const currentPostState = selector<IPost | undefined>({
  key: "currentPostState",
  get: ({ get }) => {
    const posts = get(postListState);
    return posts.find((post) => post.id === get(currentPostIdState));
  },
});

export const currentPostCommentListState = selector<IComment[]>({
  key: "currentPostCommentListState",
  get: ({ get }) => {
    const currentPostId = get(currentPostIdState);
    return currentPostId ? fetchComments(currentPostId) : [];
  },
});
