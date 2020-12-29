import * as React from "react";
import { useState } from "react";

export type AddCommentProps = {
  onAddComment: (text: string) => void;
};

export const AddComment = ({ onAddComment }: AddCommentProps) => {
  const [text, setText] = useState("");
  const handleOnChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) => setText(value);

  const handlePostClick = () => {
    onAddComment(text);
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
