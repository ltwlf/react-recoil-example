import * as React from "react";
import { IComment, IPost } from "../types";

export type PostDetailsProps = {
  post: IPost;
  comments: IComment[];
  onBackClick?: () => void;
};

export const PostDetails = ({ post, comments, onBackClick }: PostDetailsProps) => {

    const handleBackClick = () => {
        if(onBackClick){
            onBackClick()
        }
    }

  return (
    <div>
      <h1>{post.title}</h1>
      <div>{post.body}</div>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li>{comment.body}</li>
        ))}
      </ul>
      <button onClick={handleBackClick}>back</button>
    </div>
  );
};
