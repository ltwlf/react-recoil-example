import * as React from "react";
import { useState } from "react";
import { useComments } from "../hooks";

export const Comments = () => {
  const { comments, refresh } = useComments();
  return (
    <div>
      <h2>Comments</h2>
      <ul role="list" aria-label="comments">
        {comments.map((comment) => (
          <li key={comment.id} role="comment">
            {comment.body}
          </li>
        ))}
      </ul>
      <button onClick={refresh}>refresh comments</button>
      <AddComment />
    </div>
  );
};

const AddComment = () => {
  const { addComment } = useComments();
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
