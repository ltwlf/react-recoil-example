import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";
import { addComment, fetchComments } from "../services";
import { selectedPostIdState, selectedPostRequestIdState } from "./usePosts";

export interface IComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

const selectedPostCommentListRequestIdState = atom<number>({
  key: "selectedPostCommentListRequestIdState",
  default: 0,
});

export const selectedPostCommentListState = selector<IComment[]>({
  key: "selectedPostCommentListState",
  get: async ({ get }) => {
    get(selectedPostRequestIdState);
    get(selectedPostCommentListRequestIdState);
    const postId = get(selectedPostIdState);
    return postId ? await fetchComments(postId!) : [];
  },
});

export function useComments() {
  const postId = useRecoilValue(selectedPostIdState);
  const comments = useRecoilValue(selectedPostCommentListState);
  const selectedPostCommentListRequestId = useSetRecoilState(
    selectedPostCommentListRequestIdState
  );
  const refresh = () =>
    selectedPostCommentListRequestId((requestID) => requestID + 1);

  return {
    comments,
    refresh,
    addComment: (body: string) => {
      addComment({
        postId,
        body,
      }).then(() => refresh());
    },
  };
}
