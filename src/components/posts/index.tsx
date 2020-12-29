import * as React from "react";
import { PostList } from "./PostList";
import { PostDetails } from "./PostDetails";
import { usePostStore } from "../../stores";

export const Posts = () => {
  const {
    allPosts,
    selectPost,
    selectedPost,
    addComment,
    refreshPost,
  } = usePostStore();

  const handlePostClick = (postId: number) => selectPost(postId);
  const handleBackClick = () => selectPost(undefined);
  const handlePostComment = (comment: string) => addComment(comment);
  const handleRefreshClick = () => refreshPost();

  return (
    <div>
      {selectedPost ? (
        <PostDetails
          post={selectedPost}
          comments={selectedPost.comments}
          onBackClick={handleBackClick}
          onRefreshClick={handleRefreshClick}
          onPostComment={handlePostComment}
        />
      ) : (
        <PostList posts={allPosts} onClick={handlePostClick} />
      )}
    </div>
  );
};
