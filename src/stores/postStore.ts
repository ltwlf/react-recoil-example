import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { addComment, fetchComments, fetchPost, fetchPosts } from "../api";
import { IComment, IPost } from "../types";

const postListState = atom<IPost[]>({
  key: "postListState",
  default: fetchPosts(),
});

const currentPostIdState = atom<number | undefined>({
  key: "currentPostIdInternalState",
  default: undefined,
});

const currentPostRequestIdState = atom<number>({
  key: "currentPostCommentListStateRequestId",
  default: 0,
});

const currentPostState = selector<IPost | undefined>({
  key: "currentPostState",
  get: async ({ get }) => {
    get(currentPostRequestIdState);
    const postId = get(currentPostIdState);
    return postId ? await fetchPost(postId) : undefined;
  },
});

const currentPostCommentListState = selector<IComment[]>({
  key: "currentPostCommentListState",
  get: async ({ get }) => {
    get(currentPostRequestIdState);
    const postId = get(currentPostIdState);
    return postId ? await fetchComments(postId!) : [];
  },
});

export function usePostStore() {
  const [postId, setPostId] = useRecoilState(currentPostIdState);
  const current = useRecoilValue(currentPostState);
  const allPosts = useRecoilValue(postListState);
  const comments = useRecoilValue(currentPostCommentListState);
  const setCurrentPostRequestId = useSetRecoilState(currentPostRequestIdState);
  const refreshPost = () =>
    setCurrentPostRequestId((requestID) => requestID + 1);

  return {
    allPosts,
    selectedPost: current ? { ...current, comments } : undefined,
    refreshPost,
    selectPost: (id: number | undefined) => setPostId(id),
    addComment: (commentText: string) => {
      addComment({
        postId: postId,
        body: commentText,
      }).then(() => refreshPost());
    },
  };
}
