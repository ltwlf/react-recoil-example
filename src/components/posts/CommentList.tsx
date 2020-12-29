import * as React from "react";
import { IComment } from "../../stores";

export type CommentListProps = {
  comments: IComment[]
};

export const CommentList = ({
  comments,
}: CommentListProps) => {
  
  return (
    <>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li>{comment.body}</li>
        ))}
      </ul>
    </>
  );
};
