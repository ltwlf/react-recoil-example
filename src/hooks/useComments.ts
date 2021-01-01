import {
  atom,
  atomFamily,
  selector,
  selectorFamily,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { addComment, fetchComments } from "../services";
import { selectedPostIdState, selectedPostRequestIdState } from "./usePosts";

export interface IComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

const postCommentListRequestIdState = atomFamily<number, number>({
  key: "postCommentListRequestIdState",
  default: 0,
});

export const postCommentListState = selectorFamily<IComment[], number>({
  key: "selectedPostCommentListState",
  get: (postId) => ({ get }) => {
    get(postCommentListRequestIdState(postId));
    return fetchComments(postId);
  },
});

export function useComments(postId: number) {
  const comments = useRecoilValue(postCommentListState(postId));
  const postCommentListRequestId = useSetRecoilState(
    postCommentListRequestIdState(postId)
  );
  const refresh = () => postCommentListRequestId((requestID) => requestID + 1);

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
