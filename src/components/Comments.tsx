import * as React from "react";
import { useState } from "react";
import { useComments } from "../hooks";

export type CommentsProps = { postId: number };

export const Comments = ({ postId }: CommentsProps) => {
  const { comments, refresh } = useComments(postId);
  return (
    <div>
      <h2>Comments</h2>
      <ul aria-label="comments">
        {comments.map((comment) => (
          <li key={comment.id}>{comment.body}</li>
        ))}
      </ul>
      <button onClick={refresh}>refresh comments</button>
      <AddComment postId={postId} />
    </div>
  );
};

const AddComment = ({ postId }: CommentsProps) => {
  const { addComment } = useComments(postId);
  const [text, setText] = useState("");

  const handleOnChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) => setText(value);

  const handlePostClick = () => {
    addComment(text);
    setText("");
  };
  return (
    <div>
      <h3>Leave a comment:</h3>
      <div>
        <textarea onChange={handleOnChange} value={text} rows={4} />
      </div>
      <button onClick={handlePostClick}>Post</button>
    </div>
  );
};
