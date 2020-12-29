import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { addComment, fetchComments, fetchPost, fetchPosts } from "../api";

export interface IPost {
  id: number;
  userId: number;
  title: string;
  body: string;
  comments: IComment[];
}

export interface IComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

const postListState = atom<IPost[]>({
  key: "postListState",
  default: fetchPosts(),
});

const selectedPostIdState = atom<number | undefined>({
  key: "selectedPostIdInternalState",
  default: undefined,
});

const selectedPostRequestIdState = atom<number>({
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

const selectedPostCommentListState = selector<IComment[]>({
  key: "selectedPostCommentListState",
  get: async ({ get }) => {
    get(selectedPostRequestIdState);
    const postId = get(selectedPostIdState);
    return postId ? await fetchComments(postId!) : [];
  },
});

export function usePostStore() {
  const [postId, setPostId] = useRecoilState(selectedPostIdState);
  const selectedPost = useRecoilValue(selectedPostState);
  const allPosts = useRecoilValue(postListState);
  const comments = useRecoilValue(selectedPostCommentListState);
  const setSelectedPostRequestId = useSetRecoilState(
    selectedPostRequestIdState
  );
  const refreshPost = () =>
    setSelectedPostRequestId((requestID) => requestID + 1);

  return {
    allPosts,
    selectedPost: selectedPost ? { ...selectedPost, comments } : undefined,
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
