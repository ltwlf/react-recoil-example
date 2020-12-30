import * as React from "react";
import { usePosts } from "../hooks";

export const Posts = () => {
  const { selected } = usePosts();
  return <div>{selected ? <PostDetails /> : <PostList />}</div>;
};

export const PostDetails = () => {
  const { selected, select, refresh } = usePosts();

  if (!selected) {
    return <h1>Post not found.</h1>;
  }

  return (
    <div role="article">
      <h1>{selected.title}</h1>
      <div>{selected.body}</div>
      <button name="back" onClick={() => select(undefined)} role="button">
        back
      </button>
      <button name="refresh" onClick={refresh} role="button">
        refresh
      </button>
    </div>
  );
};

export const PostList = () => {
  const { posts, select } = usePosts();
  return (
    <>
      <h1>Posts</h1>
      <ul className="posts" role="list">
        {posts.map((post) => (
          <li key={post.id} onClick={() => select(post.id)} role="listitem">
            {post.title}
          </li>
        ))}
      </ul>
    </>
  );
};
