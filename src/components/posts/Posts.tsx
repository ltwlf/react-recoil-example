import * as React from "react";
import { usePostStore } from "../../stores";
import { AddComment } from "./AddComment";
import { CommentList } from "./CommentList";
import { PostDetails } from "./PostDetails";
import { PostList } from "./PostList";

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
        <>
          <PostDetails
            post={selectedPost}
            onBackClick={handleBackClick}
            onRefreshClick={handleRefreshClick}
          />
          <CommentList comments={selectedPost.comments} />
          <AddComment onAddComment={handlePostComment} />
        </>
      ) : (
        <PostList posts={allPosts} onClick={handlePostClick} />
      )}
    </div>
  );
};
