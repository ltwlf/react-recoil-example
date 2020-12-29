import * as React from "react";
import { IComment, IPost } from "../../types";
import { PostComments } from "./PostComments";

export type PostDetailsProps = {
  post: IPost;
  comments: IComment[];
  onBackClick?: () => void;
  onRefreshClick?: () => void;
  onPostComment?: (comment: string) => void;
};

export const PostDetails = ({
  post,
  comments,
  onPostComment,
  onBackClick,
  onRefreshClick,
}: PostDetailsProps) => {
  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    }
  };

  const handleRefreshClick = () => {
    if (onRefreshClick) {
      onRefreshClick();
    }
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <div>{post.body}</div>
      <PostComments comments={comments} onPostComment={onPostComment} />
      <button onClick={handleBackClick}>back</button>
      <button onClick={handleBackClick}>refresh</button>
    </div>
  );
};
