import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";
import { fetchPost, fetchPosts } from "../api";

export interface IPost {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const postListState = atom<IPost[]>({
  key: "postListState",
  default: fetchPosts(),
});

export const selectedPostIdState = atom<number | undefined>({
  key: "selectedPostIdInternalState",
  default: undefined,
});

export const selectedPostRequestIdState = atom<number>({
  key: "selectedPostRequestIdState",
  default: 0,
});

const selectedPostState = selector<IPost | undefined>({
  key: "selectedPostState",
  get: async ({ get }) => {
    get(selectedPostRequestIdState);
    const postId = get(selectedPostIdState);
    return postId ? await fetchPost(postId) : undefined;
  },
});

export function usePosts() {
  const setPostId = useSetRecoilState(selectedPostIdState);
  const selected = useRecoilValue(selectedPostState);
  const posts = useRecoilValue(postListState);

  const setSelectedPostRequestId = useSetRecoilState(
    selectedPostRequestIdState
  );
  const refresh = () => setSelectedPostRequestId((requestID) => requestID + 1);

  return {
    posts,
    selected,
    refresh,
    select: (id: number | undefined) => setPostId(id),
  };
}
