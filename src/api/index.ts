import { IComment, IPost } from "../types";

const baseUrl = `https://jsonplaceholder.typicode.com`;

export const fetchPosts = async () => {
  const resp = await fetch(`${baseUrl}/posts`);
  return ((await resp.json()) as IPost[]).slice(0, 15);
};

export const fetchPost = async (id: number) => {
  const resp = await fetch(`${baseUrl}/posts/${id}`);
  return (await resp.json()) as IPost;
};

export const fetchComments = async (postId: number) => {
  const resp = await fetch(`${baseUrl}/posts/${postId}/comments`);
  return (await resp.json()) as IComment[];
};

export const addComment = async (json: any) => {
  await fetch(`${baseUrl}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  });
};
