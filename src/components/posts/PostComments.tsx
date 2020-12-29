import * as React from "react";
import { useState } from "react";
import { IComment } from "../../types";

export type PostCommentsProps = {
  comments: IComment[];
  onPostComment?: (commentText: string) => void;
};

export const PostComments = ({
  comments,
  onPostComment,
}: PostCommentsProps) => {
  const [commentText, setCommentText] = useState("");

  const handleOnChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) => setCommentText(value);

  const handleSendPost = () => {
    if (onPostComment) {
      onPostComment(commentText);
    }
  };

  return (
    <>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li>{comment.body}</li>
        ))}
      </ul>
      <div>
        <h3>Leave a comment:</h3>
        <div>
          <textarea
            onChange={handleOnChange}
            defaultValue={commentText}
            rows={4}
          />
        </div>
        <button onClick={handleSendPost}>Post</button>
      </div>
    </>
  );
};
