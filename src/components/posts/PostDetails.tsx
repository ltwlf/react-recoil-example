import * as React from "react";
import { IPost } from "../../stores";

export type PostDetailsProps = {
  post: IPost;
  onBackClick?: () => void;
  onRefreshClick?: () => void;
};

export const PostDetails = ({
  post,
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
      <button onClick={handleBackClick}>back</button>
      <button onClick={handleRefreshClick}>refresh</button>
    </div>
  );
};
