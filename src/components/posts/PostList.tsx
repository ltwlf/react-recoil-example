import * as React from "react";
import { IPost } from "../../types";

export type PostListProps = {
  posts: IPost[];
  onClick?: (postId: number) => void;
};

export const PostList = ({ posts, onClick }: PostListProps) => {
  const handleClick = (id: number) => {
    if (onClick) {
      onClick(id);
    }
  };
  return (
    <>
      <h1>Posts</h1>
      <ul className="posts">
        {posts.map((post) => (
          <li key={post.id} onClick={() => handleClick(post.id)}>
            {post.title}
          </li>
        ))}
      </ul>
    </>
  );
};
