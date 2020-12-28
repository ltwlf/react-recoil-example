import * as React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { PostList } from "../components";
import { PostDetails } from "../components/PostDetails";
import {
  postListState,
  currentPostIdState,
  currentPostState,
  currentPostCommentListState,
} from "../stores";

export const Posts = () => {
  const posts = useRecoilValue(postListState);
  const currentPost = useRecoilValue(currentPostState);
  const setCurrentPostId = useSetRecoilState(currentPostIdState);
  const currentPostComments = useRecoilValue(currentPostCommentListState);

  const handlePostClick = (postId: number) => setCurrentPostId(postId);
  const handleBackClick = () => setCurrentPostId(undefined);

  return (
    <div>
      {currentPost ? (
        <PostDetails
          post={currentPost}
          comments={currentPostComments}
          onBackClick={handleBackClick}
        />
      ) : (
        <PostList posts={posts} onClick={handlePostClick} />
      )}
    </div>
  );
};
