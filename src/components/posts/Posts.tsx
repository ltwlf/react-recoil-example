import * as React from "react";
import { Comments } from "./Comments";
import { usePosts } from "../../hooks";

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
    <div>
      <h1>{selected.title}</h1>
      <div>{selected.body}</div>
      <button onClick={() => select(undefined)}>back</button>
      <button onClick={refresh}>refresh</button>
      <React.Suspense fallback={<h3>loading comments...</h3>}>
        <Comments />
      </React.Suspense>
    </div>
  );
};

export const PostList = () => {
  const { posts, select } = usePosts();
  return (
    <>
      <h1>Posts</h1>
      <ul className="posts">
        {posts.map((post) => (
          <li key={post.id} onClick={() => select(post.id)}>
            {post.title}
          </li>
        ))}
      </ul>
    </>
  );
};
